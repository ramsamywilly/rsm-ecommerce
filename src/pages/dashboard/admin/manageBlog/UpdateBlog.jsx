import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFetchBlogByIdQuery, useUpdateBlogMutation } from "../../../../redux/features/blogs/blogApi";
import TextInput from "../addProduct/TextInput";
import UploadImg from "../addBlog/UploadImg"; // ✅ Utilisation du nouveau composant d'upload

const UpdateBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
 
  const { data: blogData, isLoading: isFetching, isError } = useFetchBlogByIdQuery(id);
  const [updateBlog, { isLoading }] = useUpdateBlogMutation();

  const [blog, setBlog] = useState({
    title: "",
    subtitle: "",
    article: "",
    imageUrl: "",
    date: new Date().toISOString().split("T")[0], // Date par défaut
  });

  // Remplit les champs avec les données actuelles du blog
  useEffect(() => {
    if (blogData) {
      setBlog({
        title: blogData.title,
        subtitle: blogData.subtitle,
        article: blogData.article,
        imageUrl: blogData.imageUrl,
        date: new Date(blogData.createdAt).toISOString().split("T")[0],
      });
    }
  }, [blogData]);

  // Gère les changements des champs texte
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog((prevBlog) => ({
      ...prevBlog,
      [name]: value,
    }));
  };

  // Gère la mise à jour de l'image après upload
  const handleImageUpdate = (imageUrl) => {
    setBlog((prevBlog) => ({
      ...prevBlog,
      imageUrl, // ✅ Mise à jour de l'URL de l'image dans le blog
    }));
  };

  // Soumission du formulaire pour la mise à jour
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!blog.title || !blog.subtitle || !blog.article) {
      alert("Tous les champs doivent être remplis !");
      return;
    }

    try {
      const response = await updateBlog({ id, ...blog }).unwrap();
      alert(response.message || "Blog mis à jour avec succès !");
      navigate("/dashboard/manage-blog");
    } catch (error) {
      console.error("Erreur lors de la mise à jour", error);
      alert(error?.data?.message || "Une erreur est survenue.");
    }
  };


  if (isFetching) return <p className="text-center text-gray-500 mt-10">Chargement du blog...</p>;
  if (isError) return <p className="text-center text-red-500 mt-10">Erreur : impossible de charger le blog.</p>;

  return (
    <div className="container mx-auto mt-8 bg-white shadow-md rounded-xl p-6 max-w-2xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Modifier le Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Titre */}
        <TextInput
          label="Titre"
          name="title"
          value={blog.title}
          onChange={handleChange}
          type="text"
          placeholder="Titre du Blog"
        />

        {/* Sous-Titre */}
        <TextInput
          label="Sous-Titre"
          name="subtitle"
          value={blog.subtitle}
          onChange={handleChange}
          type="text"
          placeholder="Sous-Titre du Blog"
        />

        {/* Image */}
        <UploadImg setBlog={setBlog} /> {/* ✅ Nouveau composant d'upload d'image */}

        {/* Article */}
        <div>
          <label htmlFor="article" className="block text-sm font-medium text-gray-700">
            Article du blog
          </label>
          <textarea
            name="article"
            id="article"
            className="add-product-InputCSS"
            value={blog.article}
            placeholder="Modifier le contenu de l'article"
            onChange={handleChange}
            style={{ height: "90px" }}
          ></textarea>
        </div>

        {/* Date (non modifiable) */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input type="text" name="date" value={blog.date} disabled className="add-product-InputCSS" />
        </div>

        {/* Bouton de mise à jour */}
        <button type="submit" className="add-product-btn" disabled={isLoading}>
          {isLoading ? "Mise à jour en cours..." : "Mettre à jour"}
        </button>
      </form>
    </div>
  );
};

export default UpdateBlog;
