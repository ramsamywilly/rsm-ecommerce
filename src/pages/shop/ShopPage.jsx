import React, { useState } from 'react';
import productsData from '../../data/products.json'; // Importation des données des produits
import ProductCards from '../shop/ProductCards'; // Importation des composants de cartes de produits
import ShopFiltering from './ShopFiltering'; // Importation du composant de filtrage
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi'; // Hook pour récupérer les produits depuis l'API

// Définition des filtres disponibles
const filters = {
    categories: ['Tout', 'materiel', 'accessoire', 'manutention', 'outillage'], // Catégories des produits
    gamme: ['Tout', 'agricole', 'btp', 'industrie'], // Gammes de produits
    priceRanges: [ // Plages de prix des produits
        { label: 'Moins de 50€', min: 0, max: 50 },
        { label: '50€ - 100€', min: 50, max: 100 },
        { label: '100€ - 300€', min: 100, max: 300 },
        { label: '300€ - 600€', min: 300, max: 600 },
        { label: '600€ - 1200€', min: 600, max: 1200 },
        { label: '1200€ - 2500€', min: 1200, max: 2500 },
        { label: '2500€ - 5000€', min: 2500, max: 5000 },
        { label: '5000€ et plus', min: 5000, max: Infinity },
    ],
};

const ShopPage = () => {
    // Gestion de l'état des filtres
    const [filtersState, setFiltersState] = useState({
        category: 'Tout', // Catégorie par défaut
        gamme: 'Tout', // Gamme par défaut
        priceRange: '', // Plage de prix vide par défaut
    });

    // Gestion de l'état de la page courante et du nombre de produits par page
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(8);

    // Déstructure les filtres de l'état
    const { category, gamme, priceRange } = filtersState;

    // Conversion de la plage de prix en deux valeurs min et max
    const [minPrice, maxPrice] = priceRange && priceRange.includes('-')
        ? priceRange.split('-').map(Number) // Si une plage de prix est sélectionnée, la séparer en min et max
        : [undefined, undefined]; // Si aucune plage n'est sélectionnée, mettre min et max à undefined

    // Récupération des produits via le hook personnalisé
    const { data: { products = [], totalPages, totalProducts } = {}, error, isLoading } = useFetchAllProductsQuery({
        category: category !== 'Tout' ? category : '', // Applique le filtre de catégorie si différent de 'Tout'
        gamme: gamme !== 'Tout' ? gamme : '', // Applique le filtre de gamme si différent de 'Tout'
        minPrice: isNaN(minPrice) ? '' : minPrice, // Applique le filtre de prix minimum si défini
        maxPrice: isNaN(maxPrice) ? '' : maxPrice, // Applique le filtre de prix maximum si défini
        page: currentPage, // Page actuelle pour la pagination
        limit: productsPerPage, // Nombre de produits à afficher par page
    });

    // Fonction pour réinitialiser les filtres
    const clearFilters = () => {
        setFiltersState({
            category: 'Tout', // Réinitialise la catégorie à 'Tout'
            gamme: 'Tout', // Réinitialise la gamme à 'Tout'
            priceRange: '', // Réinitialise la plage de prix à vide
        });
    };

    // Fonction pour changer de page dans la pagination
    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) { // Assure que la page est valide
            setCurrentPage(pageNumber); // Met à jour la page actuelle
        }
    };

    // Affichage en cas de chargement des produits
    if (isLoading) return <div>Chargement....</div>;

    // Affichage en cas d'erreur de chargement
    if (error) return <div>Error loading products.</div>;

    // Calcul des indices de début et de fin des produits affichés pour la pagination
    const startProduct = (currentPage - 1) * productsPerPage + 1;
    const endProduct = startProduct + products.length - 1;

    return (
        <>
            {/* Section principale de la page avec un fond coloré */}
           <section className="section__container bg-primary-beige">
                <h2 className="section__header capitalize">Boutique</h2> 
                <p className="section__subheader">category 0002</p> {/* Sous-titre de la page */}
            </section>

            {/* Section contenant les filtres et les produits */}
            <section className="section__container">
                <div className="flex flex-col md:flex-row md:gap-12 gap-8">
                    {/* Composant de filtrage avec les options définies */}
                    <ShopFiltering
                        filters={filters} // Passe les filtres définis
                        filtersState={filtersState} // Passe l'état des filtres
                        setFiltersState={setFiltersState} // Fonction pour mettre à jour l'état des filtres
                        clearFilters={clearFilters} // Fonction pour réinitialiser les filtres
                    />

                    <div className="flex flex-col w-full">
                        {/* Vérifie si des produits sont présents */}
                        {products.length === 0 ? (
                            <p className="text-center">Aucun produit trouvé pour les filtres sélectionnés.</p> // Message si aucun produit n'est trouvé
                        ) : (
                            <>
                                {/* Affiche le nombre de produits affichés */}
                                <h3 className="text-xl font-medium mb-4">
                                    Affichage de {startProduct} à {endProduct} sur {totalProducts} produits
                                </h3>
                                {/* Composant pour afficher les produits sous forme de cartes */}
                                <ProductCards products={products} />
                            </>
                        )}

                        {/* Section de pagination */}
                        <div className="mt-6 flex justify-center">
                            {/* Bouton pour la page précédente */}
                            <button
                                disabled={currentPage === 1} // Désactive le bouton si nous sommes à la première page
                                className="px-4 py-1 bg-gray-300 text-gray-700 rounded-md mr-2"
                                onClick={() => handlePageChange(currentPage - 1)}
                            >
                                Précédent
                            </button>

                            {/* Création dynamique des boutons de page */}
                            {
                                [...Array(totalPages)].map((_, index) => (
                                    <button
                                        key={index} // Clé unique pour chaque bouton
                                        onClick={() => handlePageChange(index + 1)} // Change la page au clic
                                        className={`px-4 py-1 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}
                                        rounded-md mx-1`}
                                    >
                                        {index + 1} {/* Affiche le numéro de la page */}
                                    </button>
                                ))
                            }

                            {/* Bouton pour la page suivante */}
                            <button
                                disabled={currentPage === totalPages} // Désactive le bouton si nous sommes à la dernière page
                                className="px-4 py-1 bg-gray-300 text-gray-700 rounded-md ml-2"
                                onClick={() => handlePageChange(currentPage + 1)}
                            >
                                Suivant
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ShopPage;








