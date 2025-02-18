import React, { useState, useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { useEditProfileMutation } from '../../../redux/features/auth/authApi';
import avatarImg from '../../../assets/avatar.png';
import { setUser } from '../../../redux/features/auth/authSlice';

const UserProfile = () => {
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.auth);
  const [editProfile, {isLoading, isError, error, isSuccess}] = useEditProfileMutation()
  
  const [formData, setFormData] = useState({
    username: '',
    profileImage: '',
    adresse: '',
    telephone: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if(user) {
      setFormData({
        username: user?.username || '',
        profileImage: user?.profileImage || '',
        adresse: user?.adresse || '',
        telephone: user?.telephone || '',
        userId: user?._id || ''
      })
    }
  }, [user])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

    const handleSubmit = async (e) => {
      e.preventDefault();
      const updatedUser = {
        username: formData.username,
        profileImage: formData.profileImage,
        adresse: formData.adresse,
        telephone: formData.telephone,
        userId: formData.userId
      }
      try {
        const response = await editProfile(updatedUser).unwrap();
        dispatch(setUser(response.user));
        localStorage.setItem('user', JSON.stringify(response.user))
        alert("Mise à jour du profil réussie!")

      } catch (error) {
        console.error('Échec de la mise à jour du profil', error);
        alert('Échec de la mise à jour du profil. Veuillez réessayer !')
      }
      setIsModalOpen(false)
  }


  return (
  <div className='container mx-auto p-4 sm:p-6'>
      <div className= 'bg-white shadow-md rounded-lg p-6'>
            <div className='flex flex-wrap items-center mb-4'>
                <img src={formData?.profileImage || avatarImg} alt= '' className='w-32 h-32 sm:w-32 sm:h-32 object-cover rounded-full' />
                <div className='ml-4 sm:ml-6'>
                    <h3 className= 'text-2x1 font-semibold'>Nom : {formData?.username || 'N/A'}</h3>
                    <p className= 'text-gray-700'>Adresse de livraison : {formData.adresse || 'N/A'}</p>
                    <p className= 'text-gray-700'>N° Téléphone : {formData.telephone || 'N/A'}</p>
                </div>
                <button 
                onClick={() => setIsModalOpen(true)}
                className='mt-4 sm:ml-auto sm:mt-0 text-blue-500 hover:text-blue-700'>
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 4c3 0 5 1 7 1V19c-2 0-4-1-7-1s-5 1-7 1V5c2 0 4-1 7-1zM12 4v15"
                        />
                      </svg>
                </button>
            </div>
      </div>
      {/* ouvrir fenetre profile */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white p-4 sm:p-6 rounded-lg w-full md:w-96 max-w-xl mx-auto relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <i className="ri-close-line text-lg p-2 bg-red-500 text-white "></i>
            </button>
            <h3 className="text-xl sm:text-2xl font-bold mb-4">Modifier votre profil</h3>
            <hr className= 'my-2'/>
            <form onSubmit={handleSubmit}>
              {/* Form fields */}
              <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Nom
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData?.username}
                  onChange={handleChange}
                  placeholder="Nom Prénom"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700">
                  Profil Image URL
                </label>
                <input
                  type="text"
                  name="profileImage"
                  value={formData?.profileImage}
                  onChange={handleChange}
                  placeholder="Adresse URL"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>

              {formData?.profileImage && (
                <div className="mt-4">
                  <img
                    src={formData.profileImage}
                    alt="Image de profil"
                    className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-full"
                  />
                </div>
              )}

              <div className="mb-4">
                <label htmlFor="adresse" className="block text-sm font-medium text-gray-700">
                  Adresse de livraison
                </label>
                <textarea
                  name="adresse"
                  rows="3"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
                  value={formData?.adresse || ''}
                  onChange={handleChange}
                  placeholder="Ajoutez une adresse de livraison (Rue, Ville, Code postal)"
                  required
                ></textarea>
                <small className="text-gray-500">
                  Exemple : 123 Rue de Paris, 97400 St-Denis, Réunion
                </small>
              </div>

              <div className="mb-4">
                <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">
                  N° Téléphone
                </label>
                <input
                  type="telephone"
                  name="telephone"
                  value={formData?.telephone}
                  onChange={handleChange}
                  placeholder="N° Téléphone"
                  pattern="^\+?[0-9]{10,15}$"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
                  required
                />
                <small className="text-gray-500">
                  Exemple : 
                  <span>(+262)</span>
                  <span className="text-red-900 font-bold">692456789</span> 
                  (10 à 15 chiffres)
                </small>
              </div>

              <button
                className={`mt-4 w-full bg-blue-500 text-white py-2 px-2 rounded-md ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Sauvegarder'}
              </button>

              {isError && (
                <p className="mt-2 text-red-500">
                  Échec de la mise à jour du profil. Veuillez réessayer!
                </p>
              )}
              {isSuccess && (
                <p className="mt-2 text-green-500">
                  Mise à jour du profil réussie!
                </p>
              )}
            </form>
          </div>
        </div>
      )}


  </div>
  )
}

export default UserProfile;