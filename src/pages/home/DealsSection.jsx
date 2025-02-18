import React from 'react';
import DealsImg from '../../assets/img-0.png';
import { Link } from 'react-router-dom';


const DealsSection = () => {
  return (
    // Section principale présentant les offres promotionnelles
    <section className="section__container deals__container">
      {/* Image représentant les offres en cours */}
      <div className="deals__image">
        {/* Ajout d'un texte alternatif pour améliorer l'accessibilité */}
        <img src={DealsImg} alt="Illustration des offres promotionnelles en cours" />
      </div>

      {/* Contenu textuel présentant les offres et le compte à rebours */}
      <div className="deals__content">
        <h5 className="font-bold">Des solutions de location flexibles, adaptées à vos besoins</h5> {/* Sous-titre plus explicite */}
           <h4>Location de matériel : BTP et Agricole</h4> {/* Titre principal clarifié */}
             <p>
              Nous vous proposons une large gamme de matériel, disponible à la location (courte et longue durée) ainsi qu'à la vente, adaptée aux besoins des secteurs du BTP, de l'industrie et de l'agriculture.  
              Découvrez également notre sélection de matériel d'occasion, rigoureusement vérifié et contrôlé dans nos ateliers, garantissant qualité, fiabilité et performance, le tout à des prix compétitifs.  
              Chaque équipement est minutieusement inspecté et testé pour vous assurer des performances optimales sur le long terme.  
              Pour plus d'informations ou pour connaître nos conditions d'achat, n'hésitez pas à contacter notre équipe commerciale.  
                <Link to="/occasion" className="text-blue-700 px-2 py-1 inline underline hover:text-white">
                   <span>.  Voir les occasions</span>
              </Link>
             </p>

        {/* Section de compte à rebours pour l'offre promotionnelle */}
        <div className="deals__countdown flex-wrap space-x-4">
          {[ 
            // Données statiques pour le compte à rebours (jours, heures, etc.)
            { label: 'Jours', value: 14 },
            { label: 'Heures', value: 34 },
            { label: 'Min', value: 23 },
            { label: 'Sec', value: 12 },
          ].map((item, index) => (
            // Génération dynamique des cartes du compte à rebours
            <div
              key={index}
              className="deals__countdown__card transition-transform duration-300 ease-in-out hover:scale-110"
              role="region" // Ajout du rôle ARIA pour chaque carte
              aria-label={`${item.value} ${item.label}`} // Description ARIA pour les lecteurs d'écran
            >
              <h4>{item.value}</h4> {/* Valeur (ex : 14 jours) */}
              <p>{item.label}</p> {/* Libellé (jours, heures, etc.) */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DealsSection;

