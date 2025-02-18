import React, { useState } from 'react';
import { useAddBlogMutation } from '../../../../redux/features/blogs/blogApi';
import { useNavigate } from 'react-router-dom';
import TextInput from '../addProduct/TextInput';
import UploadImage from '../addProduct/UploadImage';

const AddBlog = () => {
  const navigate = useNavigate();
  const [addBlog, { isLoading }] = useAddBlogMutation(); // ✅ Correction du nom

  const [blog, setBlog] = useState({
    title: '',
    subtitle: '',
    article: '',
    imageUrl: '', // L'image sera mise à jour après le téléchargement
    date: new Date().toISOString().split('T')[0], // Date du jour au format YYYY-MM-DD
    likes: 0, // Initialisation des likes à 0
  });

  const [image, setImage] = useState('');

  // Fonction pour gérer les changements des champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog((prevBlog) => ({
      ...prevBlog,
      [name]: value,
    }));
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Vérification des champs avant l'envoi
    if (!blog.title || !blog.subtitle || !blog.article || !image) {
      alert("Tous les champs doivent être remplis !");
      return;
    }

    const newBlog = { ...blog, imageUrl: image };

    try {
      await addBlog(newBlog).unwrap(); // Envoi de la requête pour créer le blog
      alert('Blog ajouté avec succès !');
      navigate('/blogAll'); // Redirection après ajout
    } catch (error) {
      console.error('Erreur lors de l\'ajout du blog', error);
      alert(error?.data?.message || 'Une erreur est survenue lors de l\'ajout du blog.');
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6">Ajout de Nouveau Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Champ pour le titre du blog */}
        <TextInput
          label="Titre"
          name="title"
          value={blog.title}
          onChange={handleChange}
          type="text"
          placeholder="Titre du Blog"
        />

        {/* Champ pour le sous-titre du blog */}
        <TextInput
          label="Sous-Titre"
          name="subtitle"
          value={blog.subtitle}
          onChange={handleChange}
          type="text"
          placeholder="Sous-Titre du Blog"
        />

        {/* Champ pour télécharger une image */}
        <UploadImage
          name="image"
          id="image"
          value={image}
          setImage={setImage} // Fonction pour mettre à jour l'état de l'image
          placeholder="Choisir une image"
        />

        {/* Champ pour l'article du blog */}
        <div>
          <label htmlFor="article" className="block text-sm font-medium text-gray-700">
            Article du blog
          </label>
          <textarea
            name="article"
            id="article"
            className="add-product-InputCSS"
            value={blog.article}
            placeholder="Rédiger un article pour le blog"
            onChange={handleChange}
            style={{ height: "90px" }}
          ></textarea>
        </div>

        {/* Affichage de la date (non modifiable) */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="text"
            name="date"
            value={blog.date}
            disabled
            className="add-product-InputCSS"
          />
        </div>

        {/* Bouton pour soumettre le formulaire */}
        <button type="submit" className="add-product-btn" disabled={isLoading}>
          {isLoading ? 'Ajout en cours...' : 'Ajouter un blog'}
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
