import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice';
import authApi from './features/auth/authApi';
import authReducer from './features/auth/authSlice';
import productsApi from './features/products/productsApi';
import reviewApi from './features/reviews/reviewsApi';
import statsApi from './features/stats/statsApi';
import orderApi from './features/orders/orderApi';
import blogApi from './features/blogs/blogApi';
import occasionApi from './features/occasion/occasionApi';

// Configuration du store Redux
export const store = configureStore({
  reducer: {
    cart: cartReducer, // Réducteur pour la gestion du panier
    [authApi.reducerPath]: authApi.reducer, // Réducteur généré automatiquement pour les API d'authentification
    auth: authReducer, // Réducteur pour la gestion des utilisateurs
    [productsApi.reducerPath]: productsApi.reducer, // Réducteur pour les API de produits
    [reviewApi.reducerPath]: reviewApi.reducer, // Réducteur pour les API d'avis
    [statsApi.reducerPath]: statsApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [blogApi.reducerPath]: blogApi.reducer,
    [occasionApi.reducerPath]: occasionApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    // Ajout des middlewares nécessaires pour les APIs générées avec Redux Toolkit
    getDefaultMiddleware().concat(
      authApi.middleware,
      productsApi.middleware,
      reviewApi.middleware,
      statsApi.middleware,
      orderApi.middleware,
      blogApi.middleware,
      occasionApi.middleware,
    ),
});
