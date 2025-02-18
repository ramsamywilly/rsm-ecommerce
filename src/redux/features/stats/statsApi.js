import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../utils/baseURL";

const statsApi = createApi({
  reducerPath: "statsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/stats`, // Utilisation des backticks
    credentials: "include",
  }),
  tagTypes: ["Stats"],
  endpoints: (builder) => ({
    getUserStats: builder.query({
      query: (email) => `/user-stats/${email}`, // Utilisation des backticks
      providesTags: ["Stats"],
    }),
    getAdminStats: builder.query({
      query: () => "/admin-stats",
      providesTags: ["Stats"],
    }),
    // Nouvel endpoint pour les ventes mensuelles de produits
    getMonthlyProductSales: builder.query({
      query: () => "/monthly-product-sales", // Nouvelle route pour récupérer les ventes mensuelles
      providesTags: ["Stats"],
    }),
  }),
});

export const { useGetUserStatsQuery, useGetAdminStatsQuery, useGetMonthlyProductSalesQuery } = statsApi;

export default statsApi;

