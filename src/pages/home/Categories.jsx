import React from 'react';
import category1 from '../../assets/categorie1.png'; // Importation des images des catégories
import category2 from '../../assets/categorie2.png';
import category3 from '../../assets/categorie3.png';
import category4 from '../../assets/categorie4.png';

import { Link } from 'react-router-dom'; // Importation de Link pour la navigation entre pages

/**
 * Composant Categories
 * Affiche une grille de cartes représentant différentes catégories avec des liens correspondants.
 */
const Categories = () => {
  // Tableau contenant les informations des catégories (nom, chemin, image associée)
  const categories = [
    { name: 'Matériel', path: 'materiel', image: category1 },
    { name: 'Accessoire', path: 'accessoire', image: category2 },
    { name: 'Manutention', path: 'manutention', image: category3 },
    { name: 'Outillage', path: 'outillage', image: category4 },
  ];

  return (
    <>
      {/* Grille principale contenant les cartes des catégories */}
      <div className="product__grid">
        {/* Parcours du tableau de catégories pour créer une carte par catégorie */}
        {categories.map((category) => (
          <Link
            key={category.name} // Utilisation du nom de la catégorie comme clé unique
            to={`/categories/${category.path}`} // Génération dynamique du lien vers la catégorie
            className="categories__card" // Classe CSS pour styliser les cartes
          >
            {/* Affichage de l'image de la catégorie */}
            <img src={category.image} alt={category.name} />
            {/* Nom de la catégorie */}
            <h4>{category.name}</h4>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Categories;

