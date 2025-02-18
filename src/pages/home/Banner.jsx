import React from 'react';
import { Link } from 'react-router-dom';
import bannerImg from '../../assets/hero.png'; // Image utilisée pour la bannière

/**
 * Composant Banner - Affiche une section de bannière avec un message et une image
 */
const Banner = () => {
  return (
    <div className="section__container header__container">
      {/* Contenu textuel de la bannière */}
      <div className="header__content z-30">
        {/* Sous-titre en majuscules */}
        <h4 className="uppercase">Vente & Location de Matériel BTP, Industriel et Agricole</h4>
        
        {/* Titre principal */}
        <h1>Vente Location</h1>
        
        {/* Description de l'entreprise */}
        <p>
          RSM est votre partenaire de confiance pour l'achat et la location de matériel spécialisé dans les secteurs du BTP, de l'industrie et de l'agriculture. Grâce à notre expertise et à notre réseau de proximité, nous vous garantissons des équipements performants et un accompagnement sur mesure pour répondre à vos besoins professionnels.
        </p>
        
        {/* Bouton avec lien vers la page "shop" */}
        <button className="btn">
          <Link to="/shop">DÉCOUVRIR NOS PRODUITS</Link>
        </button>
      </div>

      {/* Image illustrant la bannière */}
      <div className="droite">
        <img src={bannerImg} alt="Solutions professionnelles pour votre activité" />
        <div className="effets">
          <div className="cercle"></div>
          <div className="cercle"></div>
          <div className="cercle"></div>
        </div>
      </div>    
    </div>
  );
};

export default Banner;

