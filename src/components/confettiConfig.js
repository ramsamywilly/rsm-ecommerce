import { useState, useEffect } from "react";

// Hook pour détecter les petits écrans
export const useIsSmallScreen = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const updateSize = () => setIsSmallScreen(window.innerWidth < 768);
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return isSmallScreen;
};

// Fonction pour obtenir la configuration des confettis
export const getConfettiConfig = (confettiPosition, isSmallScreen) => {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
    recycle: false,
    numberOfPieces: isSmallScreen ? 100 : 150, // Moins de confettis pour petits écrans
    initialVelocityY: 20,
    colors: ["#FFD700", "#FF4500", "#1E90FF", "#32CD32"],
    confettiSource: {
      x: confettiPosition.x,
      y: confettiPosition.y,
      w: 10,
      h: 10,
    },
  };
};

// Logique pour gérer l'animation des confettis lors de l'ajout au panier
export const handleAddToCartLogic = (buttonRef, setConfettiPosition, setIsAddedToCart) => {
  // Vérifier si la référence du bouton est disponible
  if (buttonRef.current) {
    const rect = buttonRef.current.getBoundingClientRect();
    setConfettiPosition({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
  }
  // Déclencher les confettis
  setIsAddedToCart(true);

  // Désactiver les confettis après 1,5 seconde
  setTimeout(() => setIsAddedToCart(false), 1500);
};
