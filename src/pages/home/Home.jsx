import React from 'react'; // Importation de React pour pouvoir utiliser JSX
import Banner from './Banner'; // Importation du composant Banner
import Categories from './Categories'; // Importation du composant Categories
import HeroSection from './HeroSection'; // Importation du composant HeroSection
import TrendingProducts from '../shop/TrendingProducts'; // Importation des produits tendance
import DealsSection from './DealsSection'; // Importation de la section des offres
import PromoBanner from './PromoBanner'; // Importation du composant PromoBanner
import Blogs from '../blogs/Blogs'; // Importation des blogs


const Home = () => {
  return (
      <>
        {/* Affichage de la bannière principale */}
        <Banner/>

        {/* Affichage des catégories de produits */}
        <Categories/>

        {/* Affichage de la section Hero (accueil) */}
        <HeroSection/>

        {/* Affichage des produits tendance */}
        <TrendingProducts/>

        {/* Affichage des offres promotionnelles */}
        <DealsSection/>

        {/* Affichage de la bannière des promotions */}
        <PromoBanner/>

        {/* Affichage des blogs */}
        <Blogs/>
      </>
  );
}

export default Home; // Exportation du composant Home pour l'utiliser dans d'autres parties de l'application


