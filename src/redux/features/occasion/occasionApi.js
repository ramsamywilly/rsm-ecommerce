import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseUrl } from '../../../utils/baseURL'; // Fonction pour obtenir l'URL de base de l'API

// Création de l'API pour les occasions
const occasionApi = createApi({
  reducerPath: 'occasionApi', // Nom du réducteur dans le store
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/occasions`, // URL de base pour l'API des occasions
    credentials: 'include', // Inclure les informations d'authentification dans les requêtes (comme les cookies)
  }),
  tagTypes: ["Occasions"], // Tag pour la gestion du cache
  endpoints: (builder) => ({
    // Endpoint pour récupérer toutes les occasions
    fetchAllOccasions: builder.query({
      query: () => '/', // URL pour récupérer toutes les occasions
      providesTags: ["Occasions"], // Tag pour indiquer que cette requête est liée aux occasions
    }),

    // Endpoint pour récupérer une occasion par ID
    fetchOccasionById: builder.query({
      query: (id) => `/${id}`, // URL pour récupérer une occasion via son ID
      providesTags: (result, error, id) => [{ type: "Occasions", id }], // Gestion du cache spécifique à cette occasion
    }),

    // Endpoint pour ajouter une nouvelle occasion
    addOccasion: builder.mutation({
      query: (newOccasion) => ({
        url: "/create-occasion", // URL pour créer une occasion
        method: 'POST', // Méthode HTTP utilisée
        body: newOccasion, // Corps de la requête contenant les données de la nouvelle occasion
        credentials: "include", // Inclure les informations d'authentification
      }),
      invalidatesTags: ["Occasions"], // Invalidation du cache pour les occasions après ajout
    }),

    // Endpoint pour mettre à jour une occasion
    updateOccasion: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/update-occasion/${id}`, // URL pour mettre à jour une occasion via son ID
        method: "PATCH",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Occasions"], // Invalidation du cache après mise à jour
    }),

    // Endpoint pour supprimer une occasion
    deleteOccasion: builder.mutation({
      query: (id) => ({
        url: `/${id}`, // URL pour supprimer une occasion via son ID
        method: "DELETE", // Méthode HTTP utilisée
        credentials: 'include', // Inclure les informations d'authentification
      }),
      invalidatesTags: (result, error, id) => [{ type: "Occasions", id }], // Invalidation du cache pour l'occasion supprimée
    }),

    // Endpoint pour récupérer toutes les occasions avec pagination
    fetchAllOccasionsWithPagination: builder.query({
      query: ({ page = 1, limit = 12 }) => `/occasion/all?page=${page}&limit=${limit}`, // Paramètres de pagination
      providesTags: ["Occasions"], // Tag pour indiquer que cette requête est liée aux occasions
    }),
  }),
});

// Exportation des hooks pour chaque endpoint afin qu'ils soient utilisés dans les composants React
export const {
  useFetchAllOccasionsQuery, // Hook pour récupérer toutes les occasions
  useFetchAllOccasionsWithPaginationQuery, // Hook pour récupérer toutes les occasions avec pagination
  useFetchOccasionByIdQuery, // Hook pour récupérer une occasion par son ID
  useAddOccasionMutation, // Hook pour ajouter une occasion
  useUpdateOccasionMutation, // Hook pour mettre à jour une occasion
  useDeleteOccasionMutation, // Hook pour supprimer une occasion
} = occasionApi;

// Exportation de l'API pour l'ajouter au store Redux
export default occasionApi;
