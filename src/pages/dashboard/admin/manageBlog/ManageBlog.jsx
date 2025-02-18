import React, { useState } from 'react';
import { useFetchAllBlogsWithPaginationQuery, useDeleteBlogMutation } from '../../../../redux/features/blogs/blogApi';
import { Link } from 'react-router-dom';
import { formatDate } from '../../../../utils/formateDate';

const ManageBlog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(12);
  
  const { data, isLoading, error, refetch } = useFetchAllBlogsWithPaginationQuery({
    page: currentPage,
    limit: blogsPerPage,
  });

  const blogs = data?.posts || [];
  const totalPages = data?.totalPages || 0;
  const totalPosts = data?.totalPosts || 0;

  const [deleteBlog] = useDeleteBlogMutation();

  const handleDeleteBlog = async (id) => {
    try {
      await deleteBlog(id).unwrap();
      alert("Blog supprimé avec succès!");
      await refetch();
    } catch (error) {
      console.error('Erreur lors de la suppression du blog', error);
    }
  };

  const startBlog = blogs.length > 0 ? (currentPage - 1) * blogsPerPage + 1 : 0;
  const endBlog = blogs.length > 0 ? startBlog + blogs.length - 1 : 0;

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Limite le nombre de boutons de pagination affichés
  const maxButtons = 5;
  const half = Math.floor(maxButtons / 2);
  let startPage = Math.max(1, currentPage - half);
  let endPage = Math.min(totalPages, currentPage + half);

  if (currentPage <= half) {
    endPage = Math.min(totalPages, maxButtons);
  } else if (currentPage + half >= totalPages) {
    startPage = Math.max(1, totalPages - maxButtons + 1);
  }

  // Gestion du chargement et des erreurs
  if (isLoading) {
    return <div className="text-center py-3">Chargement des blogs...</div>;
  }

  if (error) {
    return <div className="text-center py-3 text-red-500">Erreur lors du chargement des blogs.</div>;
  }

  return (
    <section className="py-1 bg-blueGray-50">
      <div className="w-full mb-12 xl:mb-0 px-4 mx-auto">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-base text-blueGray-700">Gestion des blogs</h3>
              </div>
            </div>
            <h3 className='my-4 text-sm'>Affichage de {startBlog} à {endBlog} sur {totalPosts} blogs</h3>
          </div>
        <hr/>
          <div className="block w-full overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg ">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-xs uppercase font-semibold text-left text-sm">N°</th>
                  <th className="px-4 py-2 text-xs uppercase font-semibold text-left text-sm">Titre</th>
                  <th className="px-4 py-2 text-xs uppercase font-semibold text-left text-sm">Date de Maj</th>
                  <th className="px-4 py-2 text-xs uppercase font-semibold text-left text-sm">Likes</th>
                  <th className="px-4 py-2 text-xs uppercase font-semibold text-left text-sm">Modifier</th>
                  <th className="px-4 py-2 text-xs uppercase font-semibold text-left text-sm">Action</th>
                </tr>
             
              </thead>
              <tbody>
                {blogs.map((blog, index) => (
                  <tr key={blog._id}>
                    <td className="px-4 font-bold py-2 text-left text-sm">{startBlog + index}</td>
                    <td className="px-4 py-2 text-sm">{blog.title}</td>
                    <td className="px-4 py-2 text-sm">{formatDate(blog.updatedAt)}</td>
                    <td className="px-4 py-2 text-center text-sm">{blog.likes || 0}</td>
                    <td className="px-4 py-2 cursor-pointer hover:text-primary text-sm">
                      <Link to={`/dashboard/update-blog/${blog._id}`}><i className="ri-edit-2-line"></i>Edite</Link>
                    </td>
                    <td className="px-4 py-2 text-sm">
                      <button onClick={() => handleDeleteBlog(blog._id)} className="bg-red-600 text-white px-2 py-1 rounded">
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <div className='mt-6 flex items-center justify-center'>
        <button 
          disabled={currentPage === 1} 
          className="px-4 py-1 bg-gray-300 text-gray-700 rounded-md mr-2 text-sm" 
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Précédent
        </button>

        {[...Array(endPage - startPage + 1)].map((_, index) => {
          const pageNumber = startPage + index;
          return (
            <button 
              key={pageNumber} 
              onClick={() => handlePageChange(pageNumber)} 
              className={`px-4 py-1 ${currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} rounded-md mx-1 text-sm`}
            >
              {pageNumber}
            </button>
          );
        })}

        <button 
          disabled={currentPage === totalPages} 
          className="px-4 py-1 bg-gray-300 text-gray-700 rounded-md ml-2 text-sm" 
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Suivant
        </button>
      </div>
    </section>
  );
};

export default ManageBlog;


