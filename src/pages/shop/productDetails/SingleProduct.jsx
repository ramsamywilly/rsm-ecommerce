import React, { useState, useRef, useEffect } from 'react'; // Ajout de useEffect
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFetchProductByIdQuery } from '../../../redux/features/products/productsApi';
import { addToCart } from '../../../redux/features/cart/cartSlice';
import RatingStars from '../../../components/RatingStars.jsx';
import ReviewsCard from '../reviews/ReviewsCard';
import Confetti from 'react-confetti';
import { useIsSmallScreen, getConfettiConfig, handleAddToCartLogic } from '../../../components/confettiConfig';

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, error, isLoading } = useFetchProductByIdQuery(id);

  // Récupération des informations du produit et des avis depuis l'API
  const SingleProduct = data?.product || {};
  const productReviews = data?.reviews || [];

  // États locaux pour gérer l'animation des confettis et la position des confettis
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [confettiPosition, setConfettiPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef(null);

  const isSmallScreen = useIsSmallScreen();

  // Fonction pour gérer l'ajout au panier
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    handleAddToCartLogic(buttonRef, setConfettiPosition, setIsAddedToCart);
    setTimeout(() => setIsAddedToCart(false), 1500);
  };

  // Ajout du useEffect pour scroller la page vers le haut
  useEffect(() => {
    window.scrollTo(0, 0); // Défiler vers le haut lorsque le composant est monté
  }, []); // Le tableau vide assure que l'effet s'exécute seulement une fois, au premier montage

  // Chargement et gestion des erreurs de l'API
  if (isLoading) return <div className="text-center mt-6">Chargement des détails du produit...</div>;
  if (error) return (
    <div className="text-center mt-6 text-red-500">
      Une erreur s'est produite lors du chargement des détails du produit.
    </div>
  );

  // Configuration des confettis en fonction de la position et de la taille de l'écran
  const confettiConfig = getConfettiConfig(confettiPosition, isSmallScreen);

  return (
    <>
      <section className="section__container bg-primary-beige">
        <h2 className="section__header capitalize">Détail du produit</h2>
        <div className="section__subheader space-x-2">
          <span className="hover-text-primary"><Link to="/">Accueil</Link></span>
          <i className="ri-arrow-right-s-line"></i>
          <span className="hover-text-primary"><Link to="/shop">Boutique</Link></span>
          <i className="ri-arrow-right-s-line"></i>
          <span className="hover-text-primary">{SingleProduct.name}</span>
        </div>
      </section>

      <section className="section__container mt-8">
        <div className="flex flex-col items-center md:flex-row gap-8">
          <div className="md:w-1/2 w-full">
            <img
              src={SingleProduct?.image || "https://via.placeholder.com/400"}
              alt={SingleProduct?.name || "Image produit indisponible"}
              className="rounded-md w-full h-auto"
            />
          </div>

          <div className="md:w-1/2 w-full">
            <h3 className="text-2xl font-semibold mb-4">{SingleProduct?.name}</h3>
            <p className="text-xl text-primary mb-4">
              {SingleProduct?.price}€
              {SingleProduct?.oldPrice && <s className="ml-5"> {SingleProduct?.oldPrice}€</s>}
            </p>
            <p className="text-gray-400 mb-4">{SingleProduct?.description || "Description non disponible."}</p>

            <div className="flex flex-col space-y-2">
              <p><strong>Catégorie :</strong> {SingleProduct?.category || "Non spécifiée"}</p>
              <p><strong>Gamme :</strong> {SingleProduct?.gamme || "Non spécifiée"}</p>
              <div className="flex gap-1 items-center">
                <strong>Évaluation :</strong>
                <RatingStars rating={SingleProduct?.rating} />
              </div>
            </div>

            <button
              ref={buttonRef}
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(SingleProduct);
              }}
              className="mt-6 px-6 py-3 bg-primary text-white rounded-md"
            >
              Ajouter au Panier
            </button>
          </div>
        </div>
      </section>

      {isAddedToCart && (
        <Confetti {...confettiConfig} />
      )}

      <section className="section__container mt-8">
        <ReviewsCard produitReviews={productReviews} />
      </section>
    </>
  );
};

export default SingleProduct;


