import React from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Importation des hooks useDispatch et useSelector de Redux
import { clearCart } from '../../redux/features/cart/cartSlice'; // Importation de l'action pour vider le panier
import { loadStripe } from "@stripe/stripe-js";
import { getBaseUrl } from "../../utils/baseURL";
import { useNavigate } from 'react-router-dom'; // Hook pour rediriger l'utilisateur

const OrderSummary = () => {
  const dispatch = useDispatch(); // Hook pour obtenir la fonction dispatch de Redux
  const navigate = useNavigate(); // Hook pour rediriger
  const { user } = useSelector((state) => state.auth); // Vérifie si l'utilisateur est connecté
  const products = useSelector((store) => store.cart.products); // Récupération des produits dans le panier à partir du store Redux
  const { selectedItems, totalPrice, tax, taxRate, grandTotal } = useSelector((store) => store.cart); // Récupération des informations liées au panier

  // Fonction pour vider le panier en appelant l'action clearCart
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  // Intégration paiement
  const makePayment = async (e) => {
    e.stopPropagation(); // Empêche l'événement de se propager

  // Vérifie si l'utilisateur est connecté
  if (!user) {
    alert('Vous devez être connecté pour passer au paiement. Redirection vers la page de connexion...');
    navigate('/login'); 
    return;
  }

    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PK);
    const body = {
      products: products,
      userId: user._id,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    // Requête pour créer une session de paiement
    const response = await fetch(`${getBaseUrl()}/api/orders/create-checkout-session`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    // Conversion de la réponse en JSON
    const session = await response.json();

    // Redirection vers Stripe Checkout
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    console.log('result: ', result);

    if (result.error) {
      console.log("error: ", result.error);
    }
  };

  return (
    <div className='bg-gray-200 mt-5 rounded text-base'>
      <div className='px-6 py-4 space-y-5'>
        <h2 className='text-xl text-text-dark text-center font-semibold'>Récapitulatif des commandes</h2>

        {/* Affichage du nombre d'articles sélectionnés */}
        <p className='text-text-dark mt-2'>Articles sélectionnés: {selectedItems}</p>

        {/* Affichage du prix total */}
        <div className='flex justify-between'>
          <span>Prix Total:</span>
          <span>{totalPrice.toFixed(2)} €</span>
        </div>

        {/* Affichage de la TVA */}
        <div className='flex justify-between'>
          <span>TVA ({((taxRate - 1) * 100).toFixed(1)}%):</span>
          <span>{tax.toFixed(2)} €</span>
        </div>

        {/* Affichage du total TTC */}
        <div className='flex justify-between font-bold'>
          <span>Total TTC:</span>
          <span>{grandTotal.toFixed(2)} €</span>
        </div>

        {/* Section des boutons pour vider le panier ou passer au paiement */}
        <div className='px-4 mb-6 flex flex-col gap-4'>
          {/* Bouton pour vider le panier */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClearCart();
            }}
            className='w-full bg-red-500 px-3 py-1.5 text-white rounded-md'>
            <span className='mr-2'>Vider le panier</span>
            <i className="ri-delete-bin-5-fill"></i>
          </button>

          {/* Bouton pour passer au paiement */}
          <button
            onClick={(e) => {
              makePayment(e);
            }}
            className='w-full bg-green-500 px-3 py-1.5 text-white rounded-md'>
            <span className='mr-2'>Passer au paiement</span>
            <i className="ri-bank-card-fill"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;

