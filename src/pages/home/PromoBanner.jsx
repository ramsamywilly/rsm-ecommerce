import React from 'react'; // Importation de React pour pouvoir utiliser JSX

const PromoBanner = () => {
  return (
      <section className="section__container banner__container"> {/* Section contenant la bannière promotionnelle */}
          
          {/* Carte 1 - Service Global */}
          <div className="banner__card">
              <span><i className="ri-user-voice-fill"></i></span> {/* Icône de camion de livraison */}
              <h4>Un Service Global & Personnalisé</h4> {/* Titre de la carte */}
              <p>Nous vous accompagnons à chaque étape : diagnostic, conseils sur-mesure, démonstration, et un service après-vente réactif pour garantir votre satisfaction.</p> {/* Description */}
          </div>
          
          {/* Carte 2 - Paiement Sécurisé */}
          <div className="banner__card">
              <span><i className="ri-money-euro-box-fill"></i></span> {/* Icône représentant un paiement */}
              <h4>Paiement Sécurisé & Transparence</h4> {/* Titre de la carte */}
              <p>Bénéficiez d'un paiement sécurisé et d'une totale transparence sur vos transactions. Nos conditions sont claires et sans frais cachés, vous assurant une gestion financière sereine pour vos locations.</p> {/* Description */}
          </div>
          
          {/* Carte 3 - Livraison Rapide & Fiable */}
          <div className="banner__card">
              <span><i className="ri-truck-fill"></i></span> {/* Icône représentant une voix (ou un support client) */}
              <h4>Livraison Rapide & Engagement Fiable</h4> {/* Titre de la carte */}
              <p>Profitez d’un service de livraison garanti et adapté à vos impératifs. Nous assurons un suivi rigoureux pour que vos équipements arrivent en parfait état et dans les délais impartis.</p> {/* Description */}
          </div>          

      </section>
  );
}

export default PromoBanner; // Exportation du composant pour qu'il soit utilisé ailleurs
