import React from 'react';
import { Link } from 'react-router-dom'; // Importation de la fonctionnalité Link pour la navigation
import RatingStars from '../../components/RatingStars.jsx'; // Importation du composant d'étoiles de notation
import { useDispatch } from 'react-redux'; // Importation du hook useDispatch pour interagir avec Redux
import { addToCart } from '../../redux/features/cart/cartSlice'; // Importation de l'action pour ajouter un produit au panier

const ProductCards = ({ products }) => {
  const dispatch = useDispatch(); // Hook pour obtenir la fonction dispatch de Redux

  // Fonction pour gérer l'ajout d'un produit au panier
  const handleAddToCart = (product) => {
    dispatch(addToCart(product)); // Déclenche l'action pour ajouter le produit au panier avec ses informations
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.length > 0 ? (
        // Si des produits sont présents, on les affiche
        products.map((product) => (
          <div key={product._id} className="product__card">
            <div className="relative">
              {/* Lien vers la page de détails du produit */}
              <Link to={`/shop/${product._id}`}>
                <img
                  src={product.image || '/default-image.jpg'} // Image du produit, ou image par défaut si aucune image n'est fournie
                  alt={product.name ? `${product.name} - ${product.price} €` : 'Image du produit'} // Texte alternatif pour l'image, améliore l'accessibilité
                  className="max-h-96 md:h-64 w-full object-cover hover:scale-105 transition-all duration-300"
                />
              </Link>
              <div className="hover:block absolute top-3 right-3">
                {/* Bouton d'ajout au panier */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Empêche l'événement de se propager, pour ne pas déclencher le lien
                    handleAddToCart(product); // Appel de la fonction pour ajouter le produit au panier
                  }}
                >
                  <i className="ri-shopping-cart-2-line bg-primary p-1.5 text-white hover:bg-primary-dark"></i> {/* Icône d'ajout au panier */}
                </button>
              </div>
            </div>
            {/* Section contenant les informations du produit */}
            <div className="product__card__content">
              <h4>{product.name || 'Nom du produit non disponible'}</h4> {/* Affiche le nom du produit, avec un fallback en cas d'absence */}
              <p>
                {product.price ? `${product.price} €` : 'Prix non disponible'} {/* Affichage du prix du produit, avec un fallback en cas d'absence */}
                {product.oldPrice && <s>{product.oldPrice} €</s>} {/* Si un ancien prix est présent, l'affiche barré */}
              </p>
              {/* Affichage des étoiles de notation du produit */}
              <RatingStars rating={product.rating} />
            </div>
          </div>
        ))
      ) : (
        <p>Aucun produit disponible</p> // Message affiché si la liste de produits est vide
      )}
    </div>
  );
};

export default ProductCards;

