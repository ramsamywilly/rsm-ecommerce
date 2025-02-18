import React from "react";
import { useFetchAllBlogsQuery, useLikeBlogMutation, useUnlikeBlogMutation } from '../../redux/features/blogs/blogApi';
import { Link } from "react-router-dom"; 

const Blogs = () => {
  const { data, isLoading, isError, refetch } = useFetchAllBlogsQuery();
  const [likeBlog] = useLikeBlogMutation();
  const [unlikeBlog] = useUnlikeBlogMutation();

  const blogs = data?.posts || [];

  if (isLoading) return <p>Chargement des articles en cours...</p>;
  if (isError) return <p>Une erreur s'est produite lors du chargement des articles. Veuillez réessayer plus tard.</p>;

  const lastPagePosts = blogs.slice(0, 4);

  // Fonction pour gérer le like
  const handleLike = async (blog) => {
    try {
      if (blog.liked) {
        await unlikeBlog(blog._id);
      } else {
        await likeBlog(blog._id);
      }
      refetch(); // 🔄 Recharge les données après le like/unlike
    } catch (error) {
      console.error("Erreur lors du like", error);
    }
  };

  return (
    <section className="section__container blog__container">
      <h2 className="section__header">Actualités & nouveautés : Découvrez Nos Derniers Articles</h2>
      <p className="section__subheader">
        Découvrez nos dernières actualités, nouveautés produits et innovations. Restez informé de l’évolution de notre entreprise et des offres exclusives.
      </p>

      {/* Grille de blogs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-12">
        {lastPagePosts.map((blog, index) => (
          <div key={index} className="blog__card cursor-pointer hover:scale-105 transition-all duration-300 flex flex-col justify-between">
            <Link to={`/blog/${blog._id}`} className="flex-grow">
              <img src={blog.imageUrl} alt={`Illustration de l'article : ${blog.title}`} className="rounded-lg w-full" />
              <div className="blog__card__content p-4">
                <h6 className="text-sm text-gray-500">{blog.subtitle}</h6>
                <h4 className="text-lg font-bold text-gray-800">{blog.title}</h4>
                <p className="text-sm text-gray-400">{new Date(blog.createdAt).toLocaleDateString()}</p>
              </div>
            </Link>

            {/* Bouton Like fixé en bas */}
            <div className="p-4 flex items-center justify-between border-t border-gray-200">
              <button 
                onClick={() => handleLike(blog)}
                className={`flex items-center space-x-2 px-3 py-1 rounded-md transition-all duration-300 bg-blue-500 hover:bg-blue-600 text-white`}
              >
                <i className={`ri-thumb-up-${blog.liked ? "fill" : "line"} text-lg text-white`}></i>
                <span>{blog.likes} J'aime{blog.likes !== 1 ? "s" : ""}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bouton Voir tous les posts */}
      <div className="mt-8 text-center">
        <Link to="/BlogAll">
          <button className="btn">
            Explorer tous nos articles
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Blogs;

