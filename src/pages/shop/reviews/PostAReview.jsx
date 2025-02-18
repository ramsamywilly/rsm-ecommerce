import { useState } from 'react'; // Importation de useState pour gérer l'état local
import { useSelector } from 'react-redux'; // Importation de useSelector pour accéder aux données de Redux
import { useParams } from 'react-router-dom'; // Importation de useParams pour accéder aux paramètres de l'URL
import { useFetchProductByIdQuery } from '../../../redux/features/products/productsApi'; // Hook pour récupérer un produit par son ID
import { usePostReviewMutation } from '../../../redux/features/reviews/reviewsApi'; // Hook pour envoyer une revue

const PostAReview = ({ isModalOpen, handleClose }) => {
  const { id } = useParams(); // Récupération de l'ID du produit depuis l'URL
  const { user } = useSelector((state) => state.auth); // Accès aux données de l'utilisateur connecté depuis Redux
  const [rating, setRating] = useState(0); // État pour gérer la note (de 1 à 5)
  const [comment, setComment] = useState(''); // État pour gérer le commentaire

  const { refetch } = useFetchProductByIdQuery(id, { skip: !id }); // Hook pour récupérer les détails du produit, skip si l'ID est absent
  const [PostAReview] = usePostReviewMutation(); // Mutation pour envoyer une revue

  // Fonction pour mettre à jour la note en fonction de la valeur cliquée
  const handleRating = (value) => {
    setRating(value); // Mise à jour de la note avec la valeur sélectionnée
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page lors de la soumission

    // Création de l'objet de la revue à envoyer
    const newComment = {
      comment: comment, // Le commentaire de l'utilisateur
      rating: rating, // La note de l'utilisateur
      userId: user?._id, // L'ID de l'utilisateur
      productId: id, // L'ID du produit
    };

    try {
      // Appel de la mutation pour envoyer la revue
      const response = await PostAReview(newComment).unwrap();
      alert('Commentaire posté avec succès !'); // Message de succès
      setComment(''); // Réinitialisation du commentaire
      setRating(0); // Réinitialisation de la note
      refetch(); // Rafraîchissement des données du produit
      handleClose(); // Fermeture du modal
    } catch (error) {
      // Gestion des erreurs si la soumission échoue
      alert(error.message); // Affichage de l'erreur
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black/90 flex items-center justify-center z-40 px-2 ${
        isModalOpen ? 'block' : 'hidden'
      }`} // Modal centré sur l'écran, avec une opacité de fond
    >
      <div className="bg-white p-6 rounded-md shadow-lg w-96 z-50">
        <h2 className="text-lg font-medium mb-4 text-center">Ajouter un commentaire</h2> {/* Titre du modal */}
        
        {/* Section pour afficher les étoiles de notation */}
        <div className="flex items-center mb-4">
          { 
            [1, 2, 3, 4, 5].map((star) => (
              <span 
                key={star} 
                onClick={() => handleRating(star)} // Met à jour la note lorsque l'utilisateur clique sur une étoile
                className="cursor-pointer text-yellow-500 text-lg"
              >
                {rating >= star ? (
                  <i className="ri-star-fill"></i> // Affiche une étoile pleine si la note est égale ou supérieure à l'étoile
                ) : (
                  <i className="ri-star-line"></i> // Affiche une étoile vide sinon
                )}
              </span>
            ))
          }
        </div>

        {/* Champ de texte pour entrer un commentaire */}
        <textarea
          value={comment} // Valeur du commentaire
          onChange={(e) => setComment(e.target.value)} // Mise à jour du commentaire à chaque saisie
          rows="4"
          className="w-full border border-gray-300 p-2 rounded-md mb-4 focus:outline-none"
        ></textarea>
        
        {/* Section avec les boutons pour fermer ou soumettre la revue */}
        <div className="flex justify-end gap-2">
          <button 
            onClick={handleClose} // Ferme le modal
            className="px-4 py-2 bg-gray-300 rounded-md"
          >
            Fermer
          </button>
          <button 
            onClick={handleSubmit} // Soumet la revue
            className="px-4 py-2 bg-primary text-white rounded-md"
          >
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostAReview;


