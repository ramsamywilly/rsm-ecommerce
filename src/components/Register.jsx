import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useRegisterUserMutation } from '../redux/features/auth/authApi';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  // États pour les champs de saisie
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState(''); // Message d'erreur ou de succès
  const [email, setEmail] = useState('');
  const [adresse, setAddress] = useState('');
  const [telephone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  // Variables pour les méthodes de l'API
  const dispatch = useDispatch();
  const [registerUser, { isLoading: registerLoading }] = useRegisterUserMutation();
  const navigate = useNavigate();

  // Fonction pour gérer l'inscription
  const handleRegister = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    const data = {
      username,
      email,
      password,
      adresse,
      telephone,
    };

    try {
      // Envoie les données d'inscription à l'API
      const response = await registerUser(data).unwrap();

      // Si l'inscription réussie, afficher un message et rediriger vers la page de connexion
      alert("Enregistrement réussi!");
      navigate("/login");
    } catch (error) {
      // En cas d'erreur, afficher un message d'échec
      setMessage("Votre enregistrement a échoué !");
    }
  };

  return (
  <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center ">  
    <section className='h-screen flex items-center justify-center'>
      <div className='max-w-sm border shadow bg-white mx-auto p-8'>
        <h2 className='text-2xl text-center font-semibold pt-5'>Inscription</h2>
        <hr className= 'my-2'/>
        <form onSubmit={handleRegister} className='space-y-5 max-w-sm mx-auto pt-8'>
          {/* Champ pour l'email */}
          <input
            type='email'
            name='email'
            id='email'
            onChange={(e) => setEmail(e.target.value)} // Met à jour l'email
            placeholder='Adresse email'
            autoComplete="email"
            required
            className='w-full bg-gray-100 focus:outline-none px-5 py-3'
          />
          {/* Champ pour le nom d'utilisateur */}
          <input
            type='text'
            name='username'
            id='username'
            onChange={(e) => setUsername(e.target.value)} // Met à jour le nom d'utilisateur
            placeholder='Nom et Prénom'
            autoComplete="username"
            required
            className='w-full bg-gray-100 focus:outline-none px-5 py-3'
          />
          {/* Champ pour le mot de passe */}
          <input
            type='password'
            name='password'
            id='password'
            onChange={(e) => setPassword(e.target.value)} // Met à jour le mot de passe
            placeholder='Mot de passe'
            autoComplete="current-password"
            required
            className='w-full bg-gray-100 focus:outline-none px-5 py-3'
          />
            <input
              type='text'
              name='address'
              id='address'
              onChange={(e) => setAddress(e.target.value)}
              placeholder='Adresse de livraison'
              required
              className='w-full bg-gray-100 focus:outline-none px-5 py-3'
            />
            <input
              type='tel'
              name='phone'
              id='phone'
              onChange={(e) => setPhone(e.target.value)}
              placeholder='Téléphone'
              required
              className='w-full bg-gray-100 focus:outline-none px-5 py-3'
            />          

          {/* Affichage du message d'erreur, s'il existe */}
          {message && <p className='text-red-500'>{message}</p>}

          {/* Bouton pour soumettre le formulaire */}
          <button
            type='submit'
            className='w-full mt-5 bg-primary text-white hover:bg-indigo-500 font-medium py-3 rounded-md'
          >
            S'inscrire
          </button>
        </form>

        {/* Lien vers la page de connexion si l'utilisateur a déjà un compte */}
        <p className='my-5 italic text-sm text-center'>
          Vous avez déjà un compte ? Connectez-vous{' '}
          <Link className='text-red-700 px-1 underline' to='/login'>
            ici
          </Link>
        </p>
      </div>
    </section>
  </div>  
  );
};

export default Register;
