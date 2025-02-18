import React from 'react';

// Importation des images utilisées pour les cartes
import card1 from '../../assets/card-1.png';
import card2 from '../../assets/card-2.png';
import card3 from '../../assets/card-3.png';

// Tableau contenant les informations pour chaque carte
const cards = [
    {
      id: 1, 
      image: card1, 
      trend: 'Matériel et équipements performants et durables pour optimiser vos travaux agricoles.', 
      title: 'Agricole', 
    },
    {
      id: 2,
      image: card2,
      trend: 'Solutions robustes, fiables et adaptées aux exigences du bâtiment et des travaux public.', 
      title: 'BTP', 
    },
    {
      id: 3,
      image: card3,
      trend: 'Machines et outillages industriels pour une production efficace et sécurisée.', 
      title: 'Industrie', 
    },
];



const HeroSection = () => {
  return (
    // Section principale contenant les cartes
    <section className='section__container hero__container'>
      {
        // Boucle sur chaque carte pour générer les éléments de la section
        cards.map((card) => (
          <div key={card.id} className='hero__card'> {/* Affichage de la carte */}
            <img src={card.image} alt={card.title} /> {/* Affichage de l'image de la carte */}
            <div className='hero__content'>
              <h4>{card.title}</h4> {/* Titre de la carte */}
              <p>{card.trend}</p> {/* Description de la tendance ou catégorie */}
              <a href='#' className='text-blue-700 px-2 py-1 inline underline hover:text-red-500'>
              En savoir plus
            </a> {/* Lien vers plus d'informations (à définir selon le projet) */}
            </div>
          </div>
        ))
      }
    </section>
  );
}

export default HeroSection; // Exportation du composant HeroSection pour pouvoir l'utiliser ailleurs
