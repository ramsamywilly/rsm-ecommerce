import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetchOccasionByIdQuery } from "../../redux/features/occasion/occasionApi";

const SingleOccasion = () => {
  const { id } = useParams();
  const { data: occasion, isLoading, isError } = useFetchOccasionByIdQuery(id);
  
  if (isLoading) return <p className="text-center text-gray-500 mt-10">Chargement des détails de l'occasion...</p>;
  if (isError || !occasion) return <p className="text-center text-red-500 mt-10">Erreur : impossible de charger les détails de l'occasion.</p>;

  return (
    <>
      {/* Section du titre */}
      <section className="section__container bg-primary-beige text-center py-6">
        <h2 className="section__header text-2xl font-bold capitalize">Détail de l'occasion</h2>
        <p className="section__subheader text-gray-600">{occasion.category}</p>
      </section>

      {/* Vérification si l'article existe avant de l'afficher */}
      {occasion ? (
        <div className="section__container flex justify-center items-center px-4 py-10">
          <section className="max-w-3xl w-full bg-white shadow-md rounded-xl p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-3">{occasion.title}</h1>
            <p className="text-md text-gray-500 mb-4">{occasion.description}</p>
            <p className="text-sm text-gray-400 mb-4">
              Publié le : {new Date(occasion.createdAt).toLocaleDateString()}
            </p>

            <img
              src={occasion.imageUrl || "https://via.placeholder.com/300"}
              alt={`Illustration de l'occasion : ${occasion.title}`}
              className="w-full rounded-lg shadow-sm mb-6 hover:scale-105 transition-transform duration-300"
            />

            <div className="text-md text-gray-700 leading-relaxed space-y-2">
              <p><strong>Prix :</strong> <span className="text-red-500 font-bold">{occasion.price} €</span></p>
              <p><strong>État :</strong> {occasion.condition}</p>
              <p><strong>Catégorie :</strong> {occasion.category}</p>
            </div>
          </section>
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-lg text-gray-500">L'occasion n'existe pas ou a été supprimée.</p>
        </div>
      )}
    </>
  );
};

export default SingleOccasion;
