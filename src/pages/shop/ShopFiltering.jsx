import React from 'react';

const ShopFiltering = ({ filters, filtersState, setFiltersState, clearFilters }) => {
    return (
        <div className="space-y-5 flex-shrink-0">
            {/* Titre de la section de filtres */}
            <h3>Filtres</h3>

            {/* Filtre par catégories */}
            <div className="flex flex-col space-y-2">
                <h4 className="font-medium text-lg">Catégories</h4>
                <hr /> {/* Séparateur visuel */}
                {/* Parcours des catégories disponibles et crée un input radio pour chaque catégorie */}
                {filters.categories.map((category) => (
                    <label key={category} className="capitalize cursor-pointer">
                        <input
                            type="radio" // Type radio pour les choix exclusifs
                            name="category" // Nom commun pour regrouper les radios de catégorie
                            id={`category-${category}`} // ID unique pour chaque catégorie
                            value={category} // Valeur de la catégorie
                            checked={filtersState.category === category} // Vérifie si la catégorie est sélectionnée
                            onChange={(e) =>
                                // Mise à jour de l'état des filtres lorsque l'utilisateur change le choix
                                setFiltersState({
                                    ...filtersState, // Garde les autres filtres inchangés
                                    category: e.target.value // Modifie la catégorie sélectionnée
                                })
                            }
                        />
                        <span className="ml-1">{category}</span> {/* Affichage de la catégorie */}
                    </label>
                ))}
            </div>

            {/* Filtre par gamme */}
            <div className="flex flex-col space-y-2">
                <h4 className="font-medium text-lg">Gamme</h4>
                <hr /> {/* Séparateur visuel */}
                {/* Parcours des gammes disponibles et crée un input radio pour chaque gamme */}
                {filters.gamme.map((gamme) => (
                    <label key={gamme} className="capitalize cursor-pointer">
                        <input
                            type="radio"
                            name="gamme" // Nom commun pour regrouper les radios de gamme
                            id={`gamme-${gamme}`} // ID unique pour chaque gamme
                            value={gamme} // Valeur de la gamme
                            checked={filtersState.gamme === gamme} // Vérifie si la gamme est sélectionnée
                            onChange={(e) =>
                                // Mise à jour de l'état des filtres lorsque l'utilisateur change le choix
                                setFiltersState({
                                    ...filtersState,
                                    gamme: e.target.value // Modifie la gamme sélectionnée
                                })
                            }
                        />
                        <span className="ml-1">{gamme}</span> {/* Affichage de la gamme */}
                    </label>
                ))}
            </div>

            {/* Filtre par plage de prix */}
            <div className="flex flex-col space-y-2">
                <h4 className="font-medium text-lg">Plage de Prix</h4>
                <hr /> {/* Séparateur visuel */}
                {/* Parcours des plages de prix disponibles et crée un input radio pour chaque plage */}
                {filters.priceRanges.map((range) => (
                    <label key={range.label} className="capitalize cursor-pointer">
                        <input
                            type="radio"
                            name="priceRange" // Nom commun pour regrouper les radios de plage de prix
                            id={`priceRange-${range.min}-${range.max}`} // ID unique pour chaque plage de prix
                            value={`${range.min}-${range.max}`} // Valeur de la plage de prix
                            checked={filtersState.priceRange === `${range.min}-${range.max}`} // Vérifie si la plage est sélectionnée
                            onChange={(e) =>
                                // Mise à jour de l'état des filtres lorsque l'utilisateur change la plage de prix
                                setFiltersState({
                                    ...filtersState,
                                    priceRange: e.target.value // Modifie la plage de prix sélectionnée
                                })
                            }
                        />
                        <span className="ml-1">{range.label}</span> {/* Affichage de la plage de prix */}
                    </label>
                ))}
            </div>

            {/* Bouton pour réinitialiser les filtres */}
            <button
                onClick={clearFilters} // Appel de la fonction de réinitialisation des filtres
                className={`py-1 px-4 rounded ${filtersState.category === 'Tout' && filtersState.gamme === 'Tout' && !filtersState.priceRange ? 'bg-gray-400' : 'bg-primary text-white'}`} 
                // Applique un style différent en fonction des filtres sélectionnés
                disabled={filtersState.category === 'Tout' && filtersState.gamme === 'Tout' && !filtersState.priceRange} // Désactive le bouton si aucun filtre n'est sélectionné
            >
                Réinitialiser les filtres {/* Texte du bouton */}
            </button>
        </div>
    );
};

export default ShopFiltering;
