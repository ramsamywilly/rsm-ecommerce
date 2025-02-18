import React, { useState, useEffect } from 'react';
import { useGetAllOrdersQuery, useGetOrdersByEmailQuery, useGetOrdersByIdQuery } from '../../../../redux/features/orders/orderApi';
import { useDeleteOrderMutation } from '../../../../redux/features/orders/orderApi';
import { formatDate } from '../../../../utils/formateDate';
import { Link } from 'react-router-dom';
import UpdateOrderModal from './UpdateOrderModal';
import { useFetchProductByIdManuallyMutation } from '../../../../redux/features/products/productsApi';

const ManageOrders = () => {
    const { data, error, isLoading, refetch } = useGetAllOrdersQuery();
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [emailModalOpen, setEmailModalOpen] = useState(false);
    const [viewOrderModalOpen, setViewOrderModalOpen] = useState(false);
    const [deleteOrder] = useDeleteOrderMutation();

    const [productsDetails, setProductsDetails] = useState([]);  // Détails produits (modification)
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [orderToDelete, setOrderToDelete] = useState(null);
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [userData, setUserData] = useState(null);

    const orders = data?.orders || [];

    const { data: userDataApi, error: userError, isLoading: userLoading } = useGetOrdersByEmailQuery(selectedEmail, {
        skip: !selectedEmail
    });

    const { data: orderDetails, error: orderDetailsError, isLoading: orderDetailsLoading } = useGetOrdersByIdQuery(selectedOrder?._id, {
        skip: !selectedOrder
    });

    // Effect to set userData when it's available
    useEffect(() => {
        if (userDataApi?.orders?.[0]) {
            setUserData(userDataApi.orders[0]);
        }
    }, [userDataApi]);

    const [fetchProductByIdManually] = useFetchProductByIdManuallyMutation();

    const handleOpenViewModal = async (order) => {
        console.log('Order:', order);
        setSelectedOrder(order);
        setViewOrderModalOpen(true);

        // Utilisation directe des produits présents dans la commande sans appel API supplémentaire
        if (order.products) {
            // Remise à zéro du tableau des détails de produits
            setProductsDetails(order.products);
        }
    };

    const handleCloseViewModal = () => {
        setViewOrderModalOpen(false);
        setProductsDetails([]);  // Réinitialiser les détails des produits
    };

    const handleEditOrder = (order) => {
        setSelectedOrder(order);
        setEditModalOpen(true);
    };

    const handleOpenEmailModal = (email) => {
        setSelectedEmail(email);
        setEmailModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setEditModalOpen(false);
    };

    const handleCloseEmailModal = () => {
        setEmailModalOpen(false);
        setUserData(null);
    };

    const handleDeleteOrder = async (orderId) => {
        try {
            await deleteOrder(orderId).unwrap();
            alert('Commande supprimée avec succès!');
            refetch();
            setDeleteConfirmationOpen(false);
        } catch (error) {
            console.error('Échec de la suppression de la commande', error);
        }
    };

    const openDeleteConfirmation = (orderId) => {
        setOrderToDelete(orderId);
        setDeleteConfirmationOpen(true);
    };

    const closeDeleteConfirmation = () => {
        setDeleteConfirmationOpen(false);
    };

    if (isLoading) return <div>Chargement...</div>;
    if (error) return <div>Erreur de chargement des commandes</div>;

    return (
        <div className="section__container p-6">
            <h2 className="text-1xl font-semibold mb-4">Gestion des commandes</h2>
            <div className="block w-full overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-4 border-b">N°</th>
                            <th className="py-2 px-4 border-b">Client</th>
                            <th className="py-2 px-4 border-b">Status</th>
                            <th className="py-2 px-4 border-b">Date</th>
                            <th className="py-2 px-4 border-b">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-xs">
                        {orders.length > 0 ? (
                            orders.map((order, index) => (
                                <tr key={index}>
                                    <td className="py-3 px-4 border-b">{order?.orderId}</td>
                                    <td className="py-3 px-4 border-b">
                                        <a
                                            href="#"
                                            onClick={() => handleOpenEmailModal(order?.email)}
                                            className="text-blue-500 hover:underline"
                                        >
                                            {order?.email || 'Client inconnu'}
                                        </a>
                                    </td>
                                    <td className="py-3 px-4 border-b">
                                        <span className={`inline-block px-2 py-1 text-xs text-white rounded-full ${getStatusColor(order?.status)}`}>
                                            {order?.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 border-b">
                                        {order?.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'Date inconnue'}
                                    </td>
                                    <td className="py-3 px-3 border-b flex items-center space-x-4">
                                        <Link 
                                            to="#" 
                                            className="text-blue-500 hover:underline"
                                            onClick={(e) => {
                                                e.preventDefault(); // Empêche le comportement par défaut du lien
                                                console.log("View button clicked");
                                                handleOpenViewModal(order);
                                            }}
                                        >
                                            <i className="ri-eye-line"></i> View
                                        </Link>
                                        <button className="text-green-500 hover:underline" onClick={() => handleEditOrder(order)}>
                                            <i className="ri-edit-2-line"></i>Edit
                                        </button>
                                        <button className="text-red-500 hover:underline" onClick={() => openDeleteConfirmation(order?._id)}>
                                            <i className="ri-delete-bin-2-line"></i>Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="py-3 px-4 border-b text-center">Aucune commande trouvée</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modale de vue des produits de la commande */}
            {viewOrderModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center">
                    <div className="bg-white p-4 rounded shadow-lg mx-auto">
                        <h3 className="text-xl font-semibold mb-4">Détails de la commande</h3>
                        {orderDetailsLoading ? (
                            <div>Chargement des détails de la commande...</div>
                        ) : orderDetailsError ? (
                            <div>Erreur lors de la récupération des détails de la commande</div>
                        ) : (
                            <div>
                                <p><strong>Email :</strong> {orderDetails?.email}</p>
                                <p><strong>Status :</strong> {orderDetails?.status}</p>
                                <p><strong>Date :</strong> {new Date(orderDetails?.createdAt).toLocaleDateString()}</p>
                                <h4 className="mt-4">Produits :</h4>
                                {loadingProducts ? (
                                    <p>Chargement des produits...</p>
                                ) : productsDetails.length > 0 ? (
                                    <ul className="space-y-2">
                                        {productsDetails.map((product, index) => (
                                            <li key={index} className="border p-2 rounded">
                                                <p><strong>Nom :</strong> {product.productName}</p> {/* Affichage direct du nom */}
                                                <p><strong>Quantité :</strong> {product.quantity}</p>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>Aucun produit trouvé pour cette commande.</p>
                                )}
                            </div>
                        )}
                        <button
                            className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
                            onClick={handleCloseViewModal}
                        >
                            Fermer
                        </button>
                    </div>
                </div>
            )}

            {/* Modale d'édition de commande */}
            {selectedOrder && (
                <UpdateOrderModal
                    order={selectedOrder}
                    isOpen={editModalOpen}
                    onClose={handleCloseEditModal}
                />
            )}

            {/* Modal de confirmation de suppression */}
            {deleteConfirmationOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center">
                    <div className="bg-white p-4 rounded shadow-lg mx-auto">
                        <h3 className="text-xl font-semibold mb-4">Confirmer la suppression</h3>
                        <p>Êtes-vous sûr de vouloir supprimer cette commande ?</p>
                        <div className="flex justify-end space-x-4 mt-4">
                            <button
                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
                                onClick={closeDeleteConfirmation}
                            >
                                Non
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded"
                                onClick={() => handleDeleteOrder(orderToDelete)}
                            >
                                Oui
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal pour afficher les informations utilisateur */}
            {emailModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center">
                    <div className="bg-white p-4 rounded shadow-lg mx-auto">
                        <h3 className="text-xl font-semibold mb-4">Informations utilisateur</h3>
                        {userLoading ? (
                            <div>Chargement des informations...</div>
                        ) : userError ? (
                            <div>Erreur lors de la récupération des informations utilisateur</div>
                        ) : (
                            <>
                                <p><strong>Email :</strong> {userData?.email || 'Email non fourni'}</p>
                                <p><strong>Adresse :</strong> {userData?.adresse || 'Adresse non fournie'}</p>
                                <p><strong>Téléphone :</strong> {userData?.telephone || 'Téléphone non fourni'}</p>
                            </>
                        )}
                        <button
                            className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
                            onClick={handleCloseEmailModal}
                        >
                            Fermer
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const getStatusColor = (status) => {
    switch (status) {
        case 'pending':
            return 'bg-yellow-500';
        case 'processing':
            return 'bg-blue-500';
        case 'shipped':
            return 'bg-red-500';
        case 'completed':
            return 'bg-gray-500';
        default:
            return 'bg-gray-300';
    }
};

export default ManageOrders;
