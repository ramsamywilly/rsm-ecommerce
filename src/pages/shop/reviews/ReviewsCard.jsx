import React, { useState } from 'react'; // Importation de React et useState
import commentorIcon from '../../../assets/avatar.png'; // Image d'avatar pour l'auteur du commentaire
import { formatDate } from '../../../utils/formateDate'; // Fonction pour formater la date
import RatingStars from '../../../components/RatingStars.jsx'; // Composant pour afficher les étoiles de notation
import PostAReview from './PostAReview'; // Composant pour ajouter un commentaire

const ReviewsCard = ({ produitReviews }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // État pour contrôler l'ouverture/fermeture du modal

  const reviews = produitReviews || []; // Récupération des avis, ou tableau vide si pas d'avis

  // Fonction pour ouvrir le modal d'ajout d'avis
  const handleOpenReviewModal = () => {
    setIsModalOpen(true); // Ouvre le modal
  };

  // Fonction pour fermer le modal d'ajout d'avis
  const handleCloseReviewModal = () => {
    setIsModalOpen(false); // Ferme le modal
  };

  return (
    <div className='my-6 bg-white p-8'> {/* Section contenant les avis */}
      <div>
        {reviews.length > 0 ? ( // Si des avis sont présents
          <div>
            <h3 className='text-lg font-medium'>Tous les commentaires...</h3> {/* Titre des avis */}
            <div>
              {/* Affichage des avis de produit */}
              {reviews.map((review, index) => (
                <div key={index} className='mt-4'> {/* Parcours de chaque avis */}
                  <div className='flex gap-4 items-center'>
                    <img src={commentorIcon} alt="" className='size-14' /> {/* Avatar de l'auteur */}
                    <div className='space-y-1'>
                      <p className='text-lg font-medium underline capitalize underline-offset-4 text-blue-400'>
                        {review?.userId?.username} {/* Nom de l'utilisateur */}
                      </p>
                      <p className='text-[12px] italic'>{formatDate(review?.updatedAt)}</p> {/* Date de l'avis */}
                      <RatingStars rating={review?.rating} /> {/* Affichage des étoiles */}
                    </div>
                  </div>
                  <div className='text-gray-600 mt-5 border p-8'>
                    <p className='md:w-4/5'>{review?.comment}</p> {/* Commentaire de l'utilisateur */}
                  </div>                      
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>Pas encore d’avis !</p> // Message si aucun avis n'est présent
        )}
      </div>
      <div className='mt-12'>
        <button 
          onClick={handleOpenReviewModal} // Ouvre le modal pour ajouter un commentaire
          className='px-6 py-3 bg-primary text-white rounded-md'>
          Ajouter un commentaire
        </button>
      </div>
      {/* Modal pour ajouter un commentaire */}
      <PostAReview isModalOpen={isModalOpen} handleClose={handleCloseReviewModal} />
    </div>
  );
};

export default ReviewsCard;

