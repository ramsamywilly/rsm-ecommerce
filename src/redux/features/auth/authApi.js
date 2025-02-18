import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseUrl } from '../../../utils/baseURL';

const authApi = createApi({
 reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/auth`,
    credentials: 'include',
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    // Mutation pour enregistrer un utilisateur
    registerUser: builder.mutation({
      query: (newUser) => ({
        url: '/register',
        method: 'POST',
        body: newUser,
      }),
    }),

    // Mutation pour se connecter
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),

    // Mutation pour se déconnecter
    logoutUser: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
    }),

    // Query pour récupérer les utilisateurs
    getUser: builder.query({
      query: () => ({
        url: '/users',
        method: 'GET',
      }),
      refetchOnMountOrArgChange: true, // Corrige la gestion du rafraîchissement
      providesTags: ['User'], // Cohérence des tags
    }),

    // Mutation pour supprimer un utilisateur
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'], // Corrige les tags invalidés
    }),

    // Mutation pour mettre à jour le rôle d'un utilisateur
    updateUserRole: builder.mutation({
      query: ({ userId, role }) => ({
        url: `/users/${userId}`,
        method: 'PUT',
        body: { role },
      }),
      refetchOnMount: true,
      invalidatesTags: ['User'],
    }),

    // Mutation pour modifier un profil utilisateur
    editProfile: builder.mutation({
      query: (profileData) => ({
        url: '/edit-profile',
        method: 'PATCH',
        body: profileData,
      }),
    }),
  }),
});

// Export des hooks générés automatiquement
export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useDeleteUserMutation,
  useUpdateUserRoleMutation,
  useEditProfileMutation,
  useGetUserQuery,
} = authApi;

export default authApi;
