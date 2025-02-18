import React from 'react';

const RatingStars = ({ rating }) => {
  // Tableau pour stocker les étoiles à afficher
  const stars = [];

  // Boucle pour créer les 5 étoiles en fonction de la note
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span 
        key={i} 
        className={`ri-star${i <= rating ? '-fill' : '-line'}`} 
      ></span>
    );
  }

  return (
    <div className='product__rating'>
      {stars} {/* Affiche les étoiles */}
    </div>
  );
};

export default RatingStars; // exportation du composant
