import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetchBlogByIdQuery, useLikeBlogMutation, useUnlikeBlogMutation } from "../../redux/features/blogs/blogApi";

const SingleBlog = () => {
  const { id } = useParams();
  const { data: blog, isLoading, isError, refetch } = useFetchBlogByIdQuery(id);
  const [likeBlog] = useLikeBlogMutation();
  const [unlikeBlog] = useUnlikeBlogMutation();
  
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (blog) {
      setLikes(blog.likes);
      setLiked(blog.liked);
    }
  }, [blog]);

  const handleLike = async () => {
    try {
      if (!liked) {
        await likeBlog(id);
        setLikes((prev) => prev + 1);
      } else {
        await unlikeBlog(id);
        setLikes((prev) => Math.max(prev - 1, 0));
      }
      setLiked(!liked);
      refetch();
    } catch (error) {
      console.error("Erreur lors du like/unlike", error);
    }
  };

  if (isLoading) return <p className="text-center text-gray-500 mt-10">Chargement des détails du blog...</p>;
  if (isError || !blog) return <p className="text-center text-red-500 mt-10">Erreur : impossible de charger les détails du blog.</p>;

  return (
  <>
    {/* Section du titre et de la catégorie */}
    <section className="section__container bg-primary-beige">
      <h2 className="section__header capitalize">Blog</h2>
      <p className="section__subheader">Poste</p>
    </section>

    {/* Vérification si l'article existe avant de l'afficher */}
    {blog ? (
      <div className="section__container blog__container min-h-screen flex justify-center items-center px-4 py-10">
        <section className="max-w-3xl w-full bg-white shadow-md rounded-xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">{blog.title}</h1>
          <p className="text-md text-gray-500 mb-4">{blog.subtitle}</p>
          <p className="text-sm text-gray-400 mb-4">
            Publié le : {new Date(blog.createdAt).toLocaleDateString()}
          </p>

          <img
            src={blog.imageUrl}
            alt={`Illustration de l'article : ${blog.title}`}
            className="w-full rounded-lg shadow-sm mb-6 hover:scale-105 transition-transform duration-300"
          />

          <div className="text-md text-gray-700 leading-relaxed">
            {blog.article}
          </div>

          {/* Section Like */}
          <div className="mt-6 flex items-center justify-between border-t pt-4 border-gray-200">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-300 
                ${liked ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"} text-white`}
            >
              <i className={`ri-thumb-up-${liked ? "fill" : "line"} text-lg text-white`}></i>
              <span>{liked ? "Retirer le like" : "J'aime"}</span>
            </button>
            <span className="text-gray-600 text-md">
              {likes} like{likes !== 1 ? "s" : ""}
            </span>
          </div>
        </section>
      </div>
    ) : (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-gray-500">L'article n'existe pas ou a été supprimé.</p>
      </div>
    )}
  </>
);

};

export default SingleBlog;
