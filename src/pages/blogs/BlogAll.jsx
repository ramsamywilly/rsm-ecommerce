import React, { useState } from "react";
import { useFetchAllBlogsWithPaginationQuery, useLikeBlogMutation, useUnlikeBlogMutation } from "../../redux/features/blogs/blogApi";
import { Link } from "react-router-dom";

const BlogAll = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 12;

  const { data, isLoading, isError, refetch } = useFetchAllBlogsWithPaginationQuery({
    page: currentPage,
    limit: blogsPerPage,
  });

  const [likeBlog] = useLikeBlogMutation();
  const [unlikeBlog] = useUnlikeBlogMutation();

  const blogs = data?.posts || [];
  const totalPages = data?.totalPages || 1;

  if (isLoading) return <p>Chargement des blogs...</p>;
  if (isError) return <p>Une erreur est survenue lors du chargement des blogs.</p>;

  const sortedBlogs = [...blogs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

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
  <>
    {/* Section du titre et de la catégorie */}
    <section className="section__container bg-primary-beige">
      <h2 className="section__header capitalize">Blog</h2>
      <p className="section__subheader">Actualités</p>
    </section>

    {/* Section principale des articles de blog */}
    <section className="section__container blog__container">
      <h2 className="section__header">Tous les articles du blog</h2>
      <p className="section__subheader">
        Découvrez nos articles classés du plus récent au plus ancien.
      </p>

      {/* Grille des articles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-12">
        {sortedBlogs.map((blog, index) => (
          <div
            key={index}
            className="blog__card cursor-pointer hover:scale-105 transition-transform duration-300 flex flex-col justify-between"
          >
            <Link to={`/blog/${blog._id}`} className="flex-grow">
              <img
                src={blog.imageUrl}
                alt={`Illustration de l'article: ${blog.title}`}
                className="rounded-lg w-full"
              />
              <div className="blog__card__content p-4">
                <h6 className="text-sm text-gray-500">{blog.subtitle}</h6>
                <h4 className="text-lg font-bold text-gray-800">{blog.title}</h4>
                <p className="text-sm text-gray-400">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </p>
              </div>
            </Link>

            {/* Bouton Like en bas de carte */}
            <div className="p-4 flex items-center justify-between border-t border-gray-200">
              <button
                onClick={() => handleLike(blog)}
                className="flex items-center space-x-2 px-3 py-1 rounded-md transition-all duration-300 bg-blue-500 hover:bg-blue-600 text-white"
              >
                <i className={`ri-thumb-up-${blog.liked ? "fill" : "line"} text-lg text-white`}></i>
                <span>
                  {blog.likes} Like{blog.likes !== 1 ? "s" : ""}
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Section de pagination */}
      <div className="mt-6 flex justify-center">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="px-4 py-1 bg-gray-300 text-gray-700 rounded-md mr-2 disabled:opacity-50"
          aria-label="Page précédente"
        >
          Précédent
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-1 mx-1 rounded-md ${
              currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"
            }`}
            aria-label={`Page ${index + 1}`}
          >
            {index + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-4 py-1 bg-gray-300 text-gray-700 rounded-md ml-2 disabled:opacity-50"
          aria-label="Page suivante"
        >
          Suivant
        </button>
      </div>
    </section>
  </>
);

};

export default BlogAll;
