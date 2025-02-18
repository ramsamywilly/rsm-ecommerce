import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseUrl } from '../../../utils/baseURL'; // Fonction pour obtenir l'URL de base de l'API

// Création de l'API pour les blogs
const blogApi = createApi({
  reducerPath: 'blogApi', // Nom du réducteur dans le store
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/blogs`, // URL de base pour l'API
    credentials: 'include', // Inclure les informations d'authentification dans les requêtes (comme les cookies)
  }),
  tagTypes: ["Blogs"], // Tag pour la gestion du cache
  endpoints: (builder) => ({
    // Endpoint pour récupérer tous les blogs
    fetchAllBlogs: builder.query({
      query: () => '/', // URL pour récupérer tous les blogs
      providesTags: ["Blogs"], // Tag pour indiquer que cette requête est liée aux blogs
    }),


    // Endpoint pour récupérer un blog par ID
    fetchBlogById: builder.query({
      query: (id) => `/${id}`, // URL pour récupérer un blog via son ID
      providesTags: (result, error, id) => [{ type: "Blogs", id }], // Gestion du cache spécifique à ce blog
    }),

    // Endpoint pour ajouter un nouveau blog
    addBlog: builder.mutation({
      query: (newBlog) => ({
        url: "/create-post", // URL pour créer un blog
        method: 'POST', // Méthode HTTP utilisée
        body: newBlog, // Corps de la requête contenant les données du nouveau blog
        credentials: "include", // Inclure les informations d'authentification
      }),
      invalidatesTags: ["Blogs"], // Invalidation du cache pour les blogs après ajout
    }),

    // Endpoint pour mettre à jour un blog
    updateBlog: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/update-post/${id}`, // 
        method: "PATCH",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Blogs"],
    }),

    // Endpoint pour supprimer un blog
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/${id}`, // URL pour supprimer un blog via son ID
        method: "DELETE", // Méthode HTTP utilisée
        credentials: 'include', // Inclure les informations d'authentification
      }),
      invalidatesTags: (result, error, id) => [{ type: "Blogs", id }], // Invalidation du cache pour le blog supprimé
    }),

    // Endpoint pour récupérer tous les blogs avec pagination
    fetchAllBlogsWithPagination: builder.query({
      query: ({ page = 1, limit = 12 }) => `/blog/all?page=${page}&limit=${limit}`, // Envoie les paramètres de pagination
      providesTags: ["Blogs"], // Tag pour indiquer que cette requête est liée aux blogs
    }),

    // Endpoint pour liker un blog
    likeBlog: builder.mutation({
      query: (id) => ({
        url: `/like/${id}`, // URL pour liker un blog
        method: 'PUT', // Méthode HTTP utilisée
      }),
      // Invalidation du cache pour ce blog après un like
      invalidatesTags: (result, error, id) => [{ type: "Blogs", id }],
    }),

    // Endpoint pour unliker un blog
    unlikeBlog: builder.mutation({
      query: (id) => ({
        url: `/unlike/${id}`, // URL pour unliker un blog
        method: 'PUT', // Méthode HTTP utilisée
      }),
      // Invalidation du cache pour ce blog après un un-like
      invalidatesTags: (result, error, id) => [{ type: "Blogs", id }],
    }),
  }),
});

// Exportation des hooks pour chaque endpoint afin qu'ils soient utilisés dans les composants React
export const {
  useFetchAllBlogsQuery, // Hook pour récupérer tous les blogs
  useFetchAllBlogsWithPaginationQuery, // Hook pour récupérer tous les blogs avec pagination
  useFetchBlogByIdQuery, // Hook pour récupérer un blog par son ID
  useAddBlogMutation, // Hook pour ajouter un blog
  useUpdateBlogMutation, // Hook pour mettre à jour un blog
  useDeleteBlogMutation, // Hook pour supprimer un blog
  useLikeBlogMutation, // Hook pour liker un blog
  useUnlikeBlogMutation, // Hook pour unliker un blog
} = blogApi;

// Exportation de l'API pour l'ajouter au store Redux
export default blogApi;




