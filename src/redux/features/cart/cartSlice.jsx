import { createSlice } from '@reduxjs/toolkit';

// État initial du panier
const initialState = {
  products: [],
  selectedItems: 0, // Nombre total d'articles sélectionnés
  totalPrice: 0, // Prix total des articles
  tax: 0, // Montant de la taxe
  taxRate: 1.085, // Taux de taxe (8,5%)
  grandTotal: 0, // Total général (TTC)
};

const cartSlice = createSlice({
  name: 'cart', // Nom du slice Redux
  initialState, // État initial
  reducers: {
    // Ajouter un produit au panier
    addToCart: (state, action) => {
      const isExist = state.products.some(
        (product) => product._id === action.payload._id
      );

      if (!isExist) {
        // Si le produit n'existe pas encore dans le panier, l'ajouter avec une quantité initiale de 1
        state.products.push({ ...action.payload, quantity: 1 });
      }

      // Mettre à jour les totaux
      state.selectedItems = setSelectedItems(state);
      state.totalPrice = setTotalPrice(state);
      state.tax = setTax(state);
      state.grandTotal = setGrandTotal(state);
    },

    // Mettre à jour la quantité d'un produit
    updateQuantity: (state, action) => {
      state.products = state.products.map((product) => {
        if (product._id === action.payload.id) {
          if (action.payload.type === 'increment') {
            product.quantity += 1; // Incrémenter la quantité
          } else if (action.payload.type === 'decrement' && product.quantity > 1) {
            product.quantity -= 1; // Décrémenter la quantité si elle est supérieure à 1
          }
        }
        return product;
      });

      // Mettre à jour les totaux après modification des quantités
      state.selectedItems = setSelectedItems(state);
      state.totalPrice = setTotalPrice(state);
      state.tax = setTax(state);
      state.grandTotal = setGrandTotal(state);
    },

    // Supprimer un produit du panier
    removeFromCart: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload.id
      );

      // Mettre à jour les totaux après suppression
      state.selectedItems = setSelectedItems(state);
      state.totalPrice = setTotalPrice(state);
      state.tax = setTax(state);
      state.grandTotal = setGrandTotal(state);
    },

    // Vider complètement le panier
    clearCart: (state) => {
      state.products = [];
      state.selectedItems = 0;
      state.totalPrice = 0;
      state.tax = 0;
      state.taxRate = 1.085; // Réinitialisation au taux par défaut
      state.grandTotal = 0;
    },
  },
});

// Fonction pour calculer le prix total des produits dans le panier
const setTotalPrice = (state) => {
  return state.products.reduce(
    (total, product) => total + product.quantity * product.price,
    0
  );
};

// Fonction pour calculer le nombre total d'articles dans le panier
const setSelectedItems = (state) => {
  return state.products.reduce((total, product) => total + product.quantity, 0);
};

// Fonction pour calculer le montant de la taxe
const setTax = (state) => {
  return state.totalPrice * (state.taxRate - 1);
};

// Fonction pour calculer le total général (prix total + taxe)
const setGrandTotal = (state) => {
  return state.totalPrice + state.tax;
};

// Export des actions pour utilisation dans l'application
export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;

// Export du reducer pour configuration dans le store Redux
export default cartSlice.reducer;

