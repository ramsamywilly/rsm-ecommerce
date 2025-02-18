import { createSlice } from '@reduxjs/toolkit';

// Fonction pour charger les données utilisateur depuis le localStorage
const loadUserFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('user'); // Récupère les données utilisateur
        if (serializedState == null) return { user: null }; // Retourne un état initial si aucune donnée trouvée
        return { user: JSON.parse(serializedState) }; // Parse et retourne les données utilisateur
    } catch (error) {
        // En cas d'erreur lors de la récupération ou du parsing, retourne un état initial
        return { user: null };
    }
};

// État initial basé sur les données du localStorage
const initialState = loadUserFromLocalStorage();

// Création du slice auth avec Redux Toolkit
const authSlice = createSlice({
    name: 'auth', // Nom du slice
    initialState, // État initial
    reducers: {
        // Action pour définir un utilisateur
        setUser: (state, action) => {
            state.user = action.payload.user; // Met à jour l'utilisateur dans l'état
            localStorage.setItem('user', JSON.stringify(state.user)); // Sauvegarde les données utilisateur dans le localStorage
        },
        // Action pour déconnecter l'utilisateur
        logout: (state) => {
            state.user = null; // Réinitialise l'état utilisateur
            localStorage.removeItem('user'); // Supprime les données utilisateur du localStorage
        },
    },
});

// Export des actions pour utilisation dans l'application
export const { setUser, logout } = authSlice.actions;

// Export du reducer pour configuration dans le store Redux
export default authSlice.reducer;
