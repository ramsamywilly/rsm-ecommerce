import React from 'react';
import OrderSummary from './OrderSummary.jsx'; // Importation du composant pour afficher le récapitulatif du panier
import { useDispatch } from 'react-redux'; // Importation du hook useDispatch de Redux
import { removeFromCart, updateQuantity } from '../../redux/features/cart/cartSlice'; // Importation des actions Redux pour supprimer un produit et mettre à jour la quantité

const CartModal = ({ products, isOpen, onClose }) => {
  const dispatch = useDispatch(); // Hook pour obtenir la fonction dispatch de Redux

  // Fonction pour gérer la mise à jour de la quantité d'un produit (augmentation ou diminution)
  const handleQuantity = (type, id) => {
    const payload = { type, id }; // Crée un objet payload avec le type de l'action et l'ID du produit
    dispatch(updateQuantity(payload)); // Envoie l'action updateQuantity avec le payload
  };

  // Fonction pour gérer la suppression d'un produit du panier
  const handleRemove = (e, id) => {
    e.preventDefault(); // Empêche l'événement de se propager
    dispatch(removeFromCart({ id })); // Envoie l'action removeFromCart pour supprimer le produit du panier
  };

  return (
    <div 
      className={`fixed z-[1000] inset-0 bg-black bg-opacity-80 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} // Modal en arrière-plan avec opacité
      style={{ transition: 'opacity 300ms' }} // Transition de l'opacité
    >
      <div 
        className={`fixed right-0 top-0 md:w-1/3 w-full bg-white h-full overflow-y-auto transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`} // Contenu du modal avec transition
        style={{ transition: 'transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)' }} // Transition de l'apparition du modal
      >
        <div className='p-4 mt-4'>
          <div className='flex justify-between items-center mb-4'>
            <h4 className='text-xl font-semibold'>
              Votre panier <i className="ri-shopping-cart-2-line"></i> {/* Titre du modal */}
            </h4>
            {/* Bouton de fermeture du modal */}
            <button 
              onClick={() => onClose()} // Appel de la fonction onClose pour fermer le modal
              className="text-gray-600 hover:text-gray-900"
            >
              <i className="ri-close-fill bg-primary p-1 text-white hover:bg-black"></i>
            </button>
          </div>

          {/* Détail du panier */}
          <div className='cart-items'>
            {products.length === 0 ? (
              <div>Votre panier est vide</div> // Affiche ce message si le panier est vide
            ) : (
              // Si le panier contient des produits, on les affiche
              products.map((item, index) => (
                <div
                  key={index} // Chaque élément du panier a une clé unique basée sur l'index
                  className='flex flex-col md:flex-row md:items-center md:justify-between shadow-md md:p-5 p-2 mb-4'
                >
                  {/* Informations sur l'article */}
                  <div className='flex items-center'>
                    <span className='mr-4 px-1 bg-primary text-white rounded-full'>
                      0{index + 1} {/* Affichage de l'index de l'item avec un zéro devant pour le format */}
                    </span>
                    <img
                      src={item.image} // Image du produit
                      alt='' // Description de l'image (vide dans ce cas)
                      className='size-12 object-cover mr-4' // Classe pour gérer la taille et l'apparence de l'image
                    />
                    <div>
                      <h5 className='text-lg font-medium'>{item.name}</h5> {/* Nom du produit */}
                      <p className='text-gray-600 text-sm'>
                        {Number(item.price).toFixed(2)} € {/* Affichage du prix avec 2 décimales */}
                      </p>
                    </div>
                  </div>

                  {/* Boutons de contrôle de la quantité et de suppression */}
                  <div className='flex items-center justify-end mt-2 md:mt-0'>
                    {/* Bouton pour diminuer la quantité */}
                    <button
                      onClick={() => handleQuantity('decrement', item._id)} // Appel de la fonction pour diminuer la quantité
                      className="size-6 flex items-center justify-center px-1.5 rounded-full bg-gray-200 text-gray-700 hover:bg-primary hover:text-white ml-4"
                      disabled={item.quantity <= 1} // Désactivation du bouton si la quantité est déjà 1
                    >
                      -
                    </button>
                    <span className="px-2 text-center mx-1">{item.quantity}</span> {/* Affichage de la quantité actuelle */}
                    {/* Bouton pour augmenter la quantité */}
                    <button
                      onClick={() => handleQuantity('increment', item._id)} // Appel de la fonction pour augmenter la quantité
                      className="size-6 flex items-center justify-center px-1.5 rounded-full bg-gray-200 text-gray-700 hover:bg-primary hover:text-white ml-2"
                    >
                      +
                    </button>
                    {/* Bouton pour supprimer l'élément du panier */}
                    <button
                      onClick={(e) => handleRemove(e, item._id)} // Appel de la fonction pour supprimer l'article
                      className='text-red-500 hover:text-red-800 ml-5'
                    >
                      <i className="ri-delete-bin-5-fill"></i> {/* Icône de suppression */}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Affichage du récapitulatif du panier si des produits sont présents */}
          {products.length > 0 && (
            <OrderSummary /> // Affiche le composant OrderSummary pour le récapitulatif du panier
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal;


