import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseUrl } from '../../../utils/baseURL';

// Création d'une API avec Redux Toolkit Query
export const reviewApi = createApi({
    // Définition d'un chemin pour identifier cet API dans le store Redux
    reducerPath: 'reviewApi',

    // Configuration de la requête de base
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/reviews`, // URL de base pour toutes les requêtes de cet API
        credentials: 'include', // Inclure les cookies dans les requêtes
    }),

    // Types de tags pour gérer la mise en cache et l'invalidation
    tagTypes: ['Reviews'],

    // Définition des endpoints
    endpoints: (builder) => ({
        // Endpoint pour poster un avis
        postReview: builder.mutation({
            query: (reviewData) => ({
                url: "/post-review", // URL pour poster un avis
                method: "POST", // Méthode HTTP
                body: reviewData, // Données envoyées dans la requête
            }),
            // Invalidation des tags associés à l'ID du post après un succès ou une erreur
            invalidatesTags: (result, error, { postId }) => [{ type: "Reviews", id: postId }],
        }),

        // Endpoint pour récupérer le nombre total d'avis
        getReviewsCount: builder.query({
            query: () => ({
                url: "/total-reviews", // URL pour récupérer le total des avis
            }),
        }),

        // Endpoint pour récupérer les avis par ID utilisateur
        getReviewsByUserId: builder.query({
            query: (userId) => ({
                url: `/${userId}`, // URL avec interpolation de l'ID utilisateur
            }),
            // Fournit un tag basé sur l'email du premier résultat si disponible
            providesTags: (result) =>
                result ? [{ type: "Reviews", id: result[0]?.email }] : [],
        }),
    }),
});

// Export des hooks générés automatiquement pour interagir avec les endpoints
export const { usePostReviewMutation, useGetReviewsCountQuery, useGetReviewsByUserIdQuery } = reviewApi;

// Export par défaut de l'API
export default reviewApi;

