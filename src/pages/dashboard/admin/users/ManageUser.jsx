import React, { useState } from 'react';
import UpdateUserModal from './UpdateUserModal';
import { useDeleteUserMutation, useGetUserQuery } from '../../../../redux/features/auth/authApi';

const ManageUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const { data: users = [], error, isLoading, refetch } = useGetUserQuery();
  const [deleteUser] = useDeleteUserMutation();

  const totalUsers = users.length;
  const totalPages = Math.ceil(totalUsers / usersPerPage);
  const startUser = (currentPage - 1) * usersPerPage + 1;
  const endUser = Math.min(startUser + usersPerPage - 1, totalUsers);

  const handleDelete = async (id) => {
    try {
      await deleteUser(id).unwrap();
      alert("Utilisateur supprimé avec succès!");
      refetch();
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur", error);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <>
      {isLoading && <div>Chargement...</div>}
      {error && <div>Erreur de chargement des utilisateurs</div>}
      <section className="py-1 bg-blueGray-50">
        <div className="w-full mb-12 xl:mb-0 px-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-blueGray-700">Tous les utilisateurs</h3>
                </div>
              </div>
              <h3 className="my-4 text-sm">
                Affichage de {startUser} à {endUser} sur {totalUsers} utilisateurs
              </h3>
            </div>
            <div className="block w-full overflow-x-auto">
              <table className="items-center bg-transparent w-full border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-2 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      N°
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-2 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Adresse e-mail
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-2 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Rôle
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-2 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Modifier
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-2 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.slice(startUser - 1, endUser).map((user, index) => (
                    <tr key={user._id}>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs font-bold whitespace-nowrap py-2">
                        {startUser + index}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-2">
                        {user?.email || 'N/A'}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-2">
                        <span
                          className={`rounded-full py-[2px] px-3 ${
                            user?.role === 'admin' 
                              ? 'bg-indigo-500 text-white' 
                              : user?.role === 'manager'
                              ? 'bg-red-500 text-white' 
                              : 'bg-amber-300'
                          }`}
                        >
                          {user?.role}
                        </span>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-2">
                        <button
                          onClick={() => handleEdit(user)}
                          className="cursor-pointer hover:text-primary"
                        >
                          <i className="ri-edit-2-line"></i>
                          Modifier
                        </button>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-2">
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="bg-red-500 text-white px-2 py-1 rounded"
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
        <div className="flex justify-center mt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2"
          >
            Précédent
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 mx-1 ${
                currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
              } rounded-md`}
            >
              {index + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md ml-2"
          >
            Suivant
          </button>
        </div>
      </section>
      {isModalOpen && <UpdateUserModal user={selectedUser} onClose={handleCloseModal} onRoleUpdate={refetch} />}
    </>
  );
};

export default ManageUser;
