import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';  // Importation des outils nécessaires pour créer une API avec Redux Toolkit
import { getBaseUrl } from '../../../utils/baseURL';  // Importation d'une fonction pour obtenir l'URL de base de l'API

// Création de l'API avec Redux Toolkit
const productsApi = createApi({
  reducerPath: 'productsApi',  // Nom du réducteur dans le store
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/products`,  // URL de base pour l'API, dynamiquement obtenue via getBaseUrl()
    credentials: 'include',  // Assure que les informations d'authentification sont incluses dans les requêtes (ex: cookies)
  }),
  tagTypes: ["Products"],  // Spécifie les tags utilisés pour la gestion du cache de l'API (ici, "Products")
  endpoints: (builder) => ({  // Définition des différents "endpoints" (requêtes disponibles)
    
    // Endpoint pour récupérer tous les produits, avec des options de filtrage
    fetchAllProducts: builder.query({
      query: ({  // Cette fonction prend plusieurs paramètres qui seront utilisés pour construire la requête
        category,  // Catégorie des produits
        gamme,     // Gamme des produits
        minPrice,  // Prix minimum
        maxPrice,  // Prix maximum
        page = 1,  // Page de résultats (par défaut à 1)
        limit = 12, // Nombre de produits à afficher par page (par défaut à 8)
       } = {}) => {
        // Création d'une chaîne de requête avec les paramètres fournis
        const queryParams = new URLSearchParams({
          category: category || '',  // Si category est undefined, on le remplace par une chaîne vide
          gamme: gamme || '',        // Si gamme est undefined, on le remplace par une chaîne vide
          minPrice: minPrice || 0,   // Si minPrice est undefined, on le remplace par 0
          maxPrice: maxPrice || '',  // Si maxPrice est undefined, on le remplace par une chaîne vide
          page: page.toString(),     // Conversion de la page en chaîne de caractères
          limit: limit.toString(),   // Conversion du limit en chaîne de caractères
        }).toString();  // Transformation de l'objet queryParams en une chaîne URL-encoded

        return `/?${queryParams}`;  // Retourne l'URL complète de la requête API
      },
      providesTags: ["Products"],  // Tag pour indiquer que cette requête est liée aux produits
    }),

    // Endpoint pour récupérer un produit par son ID
    fetchProductById: builder.query({
      query: (id) => `/${id}`,  // Construction de l'URL en utilisant l'ID du produit
      providesTags: (result, error, id) => [{ type: "Products", id }],  // Tag pour gérer le cache spécifique à ce produit
    }),

    // Endpoint pour ajouter un produit
    addProduct: builder.mutation({
      query: (newProduct) => ({
        url: "/create-product",  // URL pour créer un produit
        method: 'POST',          // Méthode HTTP utilisée (POST pour créer)
        body: newProduct,        // Corps de la requête contenant les données du nouveau produit
        credentials: "include",  // Inclure les informations d'authentification (comme les cookies)
      }),
      invalidatesTags: ["Products"],  // Invalidation du cache pour les produits après ajout
    }),

    // Endpoint pour récupérer des produits associés à un produit donné
    fetchRelatedProducts: builder.query({
      query: (id) => `/related/${id}`,  // URL pour récupérer les produits associés
    }),

    // Endpoint pour mettre à jour un produit
    updateProduct: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/update-product/${id}`,  // URL pour mettre à jour un produit en utilisant son ID
        method: "PATCH",               // Méthode HTTP utilisée (PATCH pour une mise à jour partielle)
        body: rest,                    // Corps de la requête contenant les données à mettre à jour
        credentials: 'include',        // Inclure les informations d'authentification (comme les cookies)
      }),
      invalidatesTags: ["Products"],  // Invalidation du cache pour les produits après mise à jour
    }),

    // Endpoint pour supprimer un produit
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/${id}`,  // URL pour supprimer un produit en utilisant son ID
        method: "DELETE",  // Méthode HTTP utilisée (DELETE pour supprimer)
        credentials: 'include',  // Inclure les informations d'authentification (comme les cookies)
      }),
      invalidatesTags: (result, error, id) => [{ type: "Products", id }],  // Invalidation du cache pour le produit supprimé
    }),
    fetchProductByIdManually: builder.mutation({
    query: (id) => ({
        url: `/${id}`,
        method: 'GET',
        credentials: 'include',
    }),
}),

  }),
});


// Exportation des hooks pour chaque endpoint afin qu'ils soient utilisés dans les composants React
export const { 
  useFetchAllProductsQuery,  // Hook pour récupérer tous les produits
  useFetchProductByIdQuery,  // Hook pour récupérer un produit par son ID
  useAddProductMutation,     // Hook pour ajouter un produit
  useUpdateProductMutation,  // Hook pour mettre à jour un produit
  useDeleteProductMutation,  // Hook pour supprimer un produit
  useFetchRelatedProductsQuery,  // Hook pour récupérer les produits associés
  useFetchProductByIdManuallyMutation,
} = productsApi;

// Exportation de l'API pour l'ajouter au store Redux
export default productsApi;
