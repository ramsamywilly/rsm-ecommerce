import React, { useState } from 'react';
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi'; // Importation du hook pour récupérer les produits depuis l'API
import ProductCards from './ProductCards'; // Importation des composants de cartes de produits

const TrendingProducts = () => {
  const [visibleProducts, setVisibleProducts] = useState(8);

  // Récupération des produits via le hook personnalisé
  const { data: { products = [] } = {}, error, isLoading } = useFetchAllProductsQuery({
    limit: visibleProducts, // Limite les produits récupérés en fonction du nombre de produits visibles
  });

  // Fonction pour charger plus de produits
  const loadMoreProducts = () => {
    setVisibleProducts(prevCount => prevCount + 4); // Charge 4 produits supplémentaires
  };

  // Affichage en cas de chargement
  if (isLoading) return <div>Chargement...</div>;

  // Affichage en cas d'erreur de chargement
  if (error) return <div>Erreur de chargement des produits.</div>;

  return (
    <section className="section__container product__container">
      <h2 className="section__header">Nos meilleures ventes</h2>
      <p className="section__subheader mb-12">
        Découvrez les articles les plus populaires auprès de nos clients, sélectionnés pour leur qualité et leur performance.
      </p>

      {/* Cartes des produits */}
      <div className='mt-12'>
        <ProductCards products={products.slice(0, visibleProducts)} /> {/* Affiche les produits */}
      </div>

      {/* Bouton pour charger plus de produits */}
<div className="product__btn">
  {!isLoading && products.length > 0 && (
    <button className='btn' onClick={loadMoreProducts}>Plus de produits</button>
  )}
</div>
    </section>
  );
};

export default TrendingProducts;








