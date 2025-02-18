import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'; 
import { useLoginUserMutation } from '../redux/features/auth/authApi';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../redux/features/auth/authSlice';

const Login = () => {
    const [message, setMessage] = useState(''); // État pour afficher un message d'erreur ou de succès
    const [email, setEmail] = useState(''); // État pour stocker l'email de l'utilisateur
    const [password, setPassword] = useState(''); // État pour stocker le mot de passe de l'utilisateur

    // Variables nécessaires pour utiliser Redux et naviguer entre les pages
    const dispatch = useDispatch();
    const [loginUser, { isLoading: loginLoading }] = useLoginUserMutation();
    const navigate = useNavigate();

    // Fonction pour gérer la soumission du formulaire de connexion
    const handleLogin = async (e) => {
        e.preventDefault(); // Empêche le rechargement de la page
        const data = { email, password }; // Préparation des données à envoyer à l'API

        try {
            const response = await loginUser(data).unwrap(); // Envoi de la requête de connexion
            const { token, user } = response; // Extraction du token et des informations utilisateur
            dispatch(setUser({ user })); // Mise à jour de l'état utilisateur dans Redux
            alert("Connexion réussie!"); // Message de confirmation
            navigate("/"); // Redirection vers la page d'accueil
        } catch (error) {
            setMessage("Votre email ou mot de passe n'est pas valide!"); // Affichage d'un message d'erreur en cas d'échec
        }
    };

    return ( 
      <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center ">  
        <section className='h-screen flex items-center justify-center'>
            {/* Conteneur principal du formulaire */}
            <div className='max-w-sm border shadow bg-white mx-auto p-8'>
                <h2 className='text-2xl text-center font-semibold pt-5'>Connexion</h2>
                <hr className= 'my-2'/>
                {/* Formulaire de connexion */}
                <form onSubmit={handleLogin} className='space-y-5 max-w-sm mx-auto pt-8'>
                    {/* Champ pour l'adresse email */}
                    <input
                        type='email'
                        name='email'
                        id='email'
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Adresse email'
                        required 
                        autoComplete="email"
                        className='w-full bg-gray-100 focus:outline-none px-5 py-3'
                    />

                    {/* Champ pour le mot de passe */}
                    <input
                        type='password'
                        name='password'
                        id='password'
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Mot de passe'
                        required 
                        autoComplete="current-password"
                        className='w-full bg-gray-100 focus:outline-none px-5 py-3'
                    />

                    {/* Affichage d'un message en cas d'erreur */}
                    {message && <p className='text-red-500'>{message}</p>}

                    {/* Bouton de soumission */}
                    <button
                        type='submit'
                        className='w-full mt-5 bg-primary text-white hover:bg-indigo-500 font-medium py-3 rounded-md'
                    >
                        Connectez-vous
                    </button>
                </form>

                {/* Lien vers la page d'inscription */}
                <p className='my-5 italic text-sm text-center'>
                    Vous n’avez pas de compte ? Inscrivez-vous {' '}
                    <Link className='text-red-700 px-1 underline' to='/Register'>
                        ici
                    </Link>
                </p>
            </div>
        </section>
    </div>  
    );
};

export default Login;
