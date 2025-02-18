import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Permet d'accéder aux paramètres de l'URL
import ProductCards from '../shop/ProductCards'; // Composant pour afficher les cartes produits
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi'; // Hook pour récupérer les produits

/**
 * Composant CategoryPage - Affiche une liste de produits filtrés par catégorie
 */
const CategoryPage = () => {
  const { categoryName } = useParams(); // Récupère le nom de la catégorie depuis l'URL
  const [filteredProducts, setFilteredProducts] = useState([]); // État pour stocker les produits filtrés

  // Récupération des produits en fonction de la catégorie sélectionnée
  const { data: products, isLoading, isError } = useFetchAllProductsQuery({
    category: categoryName, // Filtrer par catégorie
    gamme: '',
    minPrice: 0,
    maxPrice: 1000,
    page: 1,
    limit: 8,
  });

  // Filtrer les produits reçus selon la catégorie
  useEffect(() => {
    if (products) {
      setFilteredProducts(products.products); // Mise à jour de l'état avec les produits filtrés
    }
  }, [products]);

  return (
    <>
      {/* En-tête de la catégorie */}
      <section className="section__container bg-primary-beige">
        <h2 className="section__header capitalize">{categoryName}</h2>
        <p className="section__subheader">Produits disponibles</p>
      </section>

      {/* Affichage des cartes produits */}
      <div className="section__container">
        {isLoading && <p>Chargement des produits...</p>}
        {isError && <p>Erreur lors du chargement des produits.</p>}

        <ProductCards products={filteredProducts} />
      </div>
    </>
  );
};

export default CategoryPage;


 