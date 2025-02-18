import React from 'react';
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({children, role}) => {
  const {user} = useSelector((state) => state.auth);
  const location = useLocation(); 

  // Si l'utilisateur n'est pas connecté, on le redirige vers la page de login
  if (!user) {
    alert('Vous devez être connecté');
    return <Navigate to="/login" state={{from: location}} replace />;
  }

  // Si un rôle spécifique est défini et que l'utilisateur n'a pas ce rôle
  if (role && !['admin', 'manager'].includes(user.role) && user.role !== role) {
    alert('Vous n’êtes pas autorisé à accéder à ces pages');
    return <Navigate to="/login" state={{from: location}} replace />;
  }

  return children; // Si tout est OK, on affiche les enfants (contenu de la route)
};

export default PrivateRoute;
