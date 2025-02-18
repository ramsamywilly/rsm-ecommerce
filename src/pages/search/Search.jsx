import React, { useState, useEffect } from 'react'; // Importation de React, useState, et useEffect
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi'; // Importation du hook pour récupérer les produits depuis l'API
import ProductCards from '../shop/ProductCards'; // Importation du composant ProductCards pour afficher les produits

const Search = () => {
  const [searchQuery, setSearchQuery] = useState(''); // État pour stocker la requête de recherche
  const [filteredProducts, setFilteredProducts] = useState([]); // État pour stocker les produits filtrés

  // Récupération des produits via l'API
  const { data: productsData, isLoading, error } = useFetchAllProductsQuery();

  // Met à jour la liste des produits filtrés lorsque les données de l'API changent
  useEffect(() => {
    if (productsData && productsData.products) {
      setFilteredProducts(productsData.products); // Initialisation avec tous les produits récupérés
    }
  }, [productsData]);

  // Gestion des états de chargement et d'erreur
  if (isLoading) return <div>Chargement des produits...</div>;
  if (error) return <div>Erreur lors du chargement des produits.</div>;

  // Fonction pour filtrer les produits en fonction de la recherche
  const handleSearch = () => {
    const query = searchQuery.toLowerCase(); // Conversion de la requête en minuscules pour une recherche insensible à la casse

    // Vérification que les produits sont disponibles avant de les filtrer
    if (productsData && productsData.products) {
      const filtered = productsData.products.filter(product =>
        product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query)
      );

      setFilteredProducts(filtered); // Mise à jour des produits filtrés
    }
  };

  return (
    <>
      {/* Section contenant le titre et la catégorie */}
      <section className='section__container bg-primary-beige'>
        <h2 className='section__header capitalize'>Recherche de produits</h2> {/* Titre de la section */}
        <p className='section__subheader'>Catégorie 0001</p> {/* Sous-titre indiquant la catégorie */}
      </section>

      {/* Section contenant la barre de recherche et le bouton */}
      <section className='section__container'>
        <div className='w-full mb-12 flex flex-col md:flex-row items-center justify-center gap-4'>
          {/* Champ de recherche */}
          <input
            type='text'
            value={searchQuery} // Valeur liée à l'état `searchQuery`
            onChange={(e) => setSearchQuery(e.target.value)} // Mise à jour de `searchQuery` lors de la saisie
            className='search-bar w-full max-w-4xl p-2 border rounded'
            placeholder='Recherche un produit...' // Texte affiché avant que l'utilisateur ne saisisse quelque chose
          />

          {/* Bouton de recherche */}
          <button
            onClick={handleSearch} // Appel à la fonction `handleSearch` lorsqu'on clique sur le bouton
            className='search-button w-full md:w-auto py-2 px-8 bg-primary text-white rounded'
          >
            Recherche
          </button>
        </div>

        {/* Affichage des cartes produits filtrées */}
        <ProductCards products={filteredProducts} />
      </section>
    </>
  );
};

export default Search;

