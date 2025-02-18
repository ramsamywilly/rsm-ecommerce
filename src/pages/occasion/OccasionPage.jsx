import React, { useState } from "react";
import { useFetchAllOccasionsWithPaginationQuery } from "../../redux/features/occasion/occasionApi";
import { Link } from "react-router-dom";

const OccasionPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const occasionsPerPage = 8; // Nombre d'occasions par page

  const { data, isLoading, isError } = useFetchAllOccasionsWithPaginationQuery({
    page: currentPage,
    limit: occasionsPerPage,
  });

  const occasions = data?.occasions || [];
  const totalPages = data?.totalPages || 1;

  if (isLoading) return <p className="text-center py-10 text-lg">Chargement des occasions...</p>;
  if (isError) return <p className="text-center py-10 text-red-500">Une erreur est survenue lors du chargement des occasions.</p>;

  // Trier les occasions par date (les plus récentes en premier)
  const sortedOccasions = [...occasions].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <>
      {/* Section du titre et de la catégorie */}
      <section className="section__container bg-primary-beige text-center py-6">
        <h2 className="section__header text-2xl font-bold capitalize">Vente d'occasion</h2>
        <p className="section__subheader text-gray-600">Découvrez nos meilleures offres</p>
      </section>

      {/* Section principale des occasions */}
      <section className="section__container py-10">
        <h2 className="section__header text-xl font-bold">Toutes les occasions disponibles</h2>
        <p className="section__subheader text-gray-500">Trouvez l’occasion idéale parmi nos annonces.</p>

        {/* Affichage si aucune occasion n'est disponible */}
        {sortedOccasions.length === 0 ? (
          <p className="text-center text-gray-500 mt-10 text-lg">Aucune occasion disponible pour le moment.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-12">
            {sortedOccasions.map((occasion) => (
              <div 
                key={occasion._id} 
                className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer flex flex-col justify-between"
              >
                <Link to={`/occasion/${occasion._id}`} className="flex-grow">
                  <img 
                    src={occasion.imageUrl || 'https://via.placeholder.com/300'} 
                    alt={occasion.title} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="text-lg font-bold text-gray-800">{occasion.title}</h4>
                    <p className="text-sm text-gray-500">{occasion.description?.substring(0, 60)}...</p>
                    <p className="text-red-500 font-bold mt-2">{occasion.price} €</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="px-4 py-1 bg-gray-300 text-gray-700 rounded-md mr-2 disabled:opacity-50"
              aria-label="Page précédente"
            >
              Précédent
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-4 py-1 mx-1 rounded-md ${
                  currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"
                }`}
                aria-label={`Page ${index + 1}`}
              >
                {index + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-4 py-1 bg-gray-300 text-gray-700 rounded-md ml-2 disabled:opacity-50"
              aria-label="Page suivante"
            >
              Suivant
            </button>
          </div>
        )}
      </section>
    </>
  );
};

export default OccasionPage;
