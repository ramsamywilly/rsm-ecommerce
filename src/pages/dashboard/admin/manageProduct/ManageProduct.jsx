import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { useFetchAllProductsQuery, useDeleteProductMutation } from '../../../../redux/features/products/productsApi';
import { formatDate } from '../../../../utils/formateDate';


const ManageProduct = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const { data: {products = [], totalPages, totalProducts}={}, isLoading, error, refetch } = useFetchAllProductsQuery({
    category: '',
    gamme: '',
    minPrice: '',
    maxPrice: '',
    page: currentPage,
    limit: productsPerPage,
  });

 const startProduct = (currentPage -1) * productsPerPage + 1;
 const endProduct = startProduct + products.length - 1;
 const handlePageChange = (pageNumber) => {
    if(pageNumber > 0 && pageNumber <= totalPages) {
        setCurrentPage(pageNumber)
    }
 }
const [deleteProduct] = useDeleteProductMutation()
const handleDeleteProduct = async(id) => {
    try {
      const response = await deleteProduct(id).unwrap();
      alert("Produit supprimé avec succès!"); 
      await refetch()
    } catch (error) {
      console.error('Erreur lors de la suppression du produit', error);
    }

}

  return (
    <>
    {isLoading && <div>Chargement...</div>}
    {error && <div>Erreur de chargement du produit </div>}  
<section className="py-1 bg-blueGray-50">
<div className="w-full mb-12 xl:mb-0 px-4 mx-auto">
  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
    <div className="rounded-t mb-0 px-4 py-3 border-0">
      <div className="flex flex-wrap items-center">
        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3 className="font-semibold text-base text-blueGray-700">Gestion des produits</h3>
        </div>
        <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
          <button className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">Voir tout</button>
        </div>
      </div>
      <h3 className= 'my-4 text-sm'>Affichage de {startProduct} à {endProduct} sur {totalProducts} produits</h3>
    </div>

    <div className="block w-full overflow-x-auto">
      <table className="items-center bg-transparent w-full border-collapse ">
        <thead className="bg-gray-100">
            <tr>
              <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-2 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                N°
              </th>
              <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-2 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Désignation du produit
              </th>
              <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-2 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Date de mise à jour
              </th>
              <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-2 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Modifier ou gérer
              </th>
              <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-2 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {products && products.map((product, index) => (
              <tr key={index}>
                <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-2 text-left text-blueGray-700">
                  {index + 1}
                </th>
                <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-2">
                  {product?.name}
                </td>
                <td className="border-t-0 px-4 align-center border-l-0 border-r-0 text-xs whitespace-nowrap py-2">
                  {formatDate(product?.createdAt)}
                </td>
                <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-2 cursor-pointer hover:text-primary">
                  <i className="ri-edit-2-line"></i>
                  <Link to={`/dashboard/update-product/${product._id}`}>Edite</Link>
                </td>
                <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-2">
                  <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="bg-red-600 text-white px-2 py-1"
                  >
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
<div className= 'mt-6 flex items-center justify-center'>
  <button disabled={currentPage === 1}
  className="px-4 py-1 bg-gray-300 text-gray-700 rounded-md mr-2"
  onClick={() => handlePageChange(currentPage - 1)}
  >Précédent</button>
   {[...Array(totalPages)].map((_, index) => (
      <button 
      key={index} 
      onClick={() => handlePageChange(index + 1)} 
      className={`px-4 py-1 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}
      rounded-md mx-1`}
      >{index + 1}
      </button>
    ))} 
  <button disabled={currentPage === totalPages} 
  className="px-4 py-1 bg-gray-300 text-gray-700 rounded-md ml-2"
  onClick={() => handlePageChange(currentPage + 1)}
  >Suivant</button>
</div>
<footer className="relative pt-8 pb-6 mt-16">
  <div className="container mx-auto px-4">
    <div className="flex flex-wrap items-center md:justify-between justify-center">
      <div className="w-full md:w-6/12 px-4 mx-auto text-center">
        <div className="text-sm text-blueGray-500 font-semibold py-1">
          Réalisé avec <a href="https://www.creative-tim.com/product/notus-js" className="text-blueGray-500 hover:text-gray-800" target="_blank">Notus JS</a> par <a href="https://www.creative-tim.com" className="text-blueGray-500 hover:text-blueGray-800" target="_blank"> Creative Tim</a>.
        </div>
      </div>
    </div>
  </div>
</footer>
</section>
    </>
  )
}

export default ManageProduct;