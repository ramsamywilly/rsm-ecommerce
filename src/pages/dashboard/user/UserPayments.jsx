import React from 'react'; 
import { useSelector } from 'react-redux';
import { useGetOrdersByEmailQuery } from '../../../redux/features/orders/orderApi';



const UserPayments = () => {
  const {user} = useSelector((state) => state.auth);
  const {data: ordersdata, error, isLoading} = useGetOrdersByEmailQuery(user?.email);

  if(isLoading) return <div>Chargement...</div>
  if(error) return <div>Aucune commande trouvée!</div>
    const orders = ordersdata.orders || {};
    const totalPayment = orders?.reduce((acc, order) => acc + order.amount, 0).toFixed(2);
 
  return (
  <div className= 'py-6 px-4'>
    <h3 className= 'text-xl font-semibold mb-4'>Total des Paiements</h3>
      <div className="shadow-lg rounded p-4">
        <p className= 'italic text-lg text-gray-800 font-medium mb-5'>Dépenses totales: {totalPayment ? totalPayment : 0} €</p>
        <hr className= 'my-2'/>
        <ul className= 'text-xs'>
          {
              orders && orders.map((item, index) =>(
                  <li key={index}>
                    <h5 className='font-medium text-gray-800 mb-2'>Commande N° {index + 1}</h5>
                    <div>
                        <span className= 'text-gray-600'>Montant: {item?.amount.toFixed(2)}€</span>
                    </div>
                    <div className= 'flex md:flex-row items-center space-x-2'>
                        <span className= 'text-gray-600'>Date: {new Date(item?.createdAt).toLocaleString()}</span>
                        <p className="text-gray-600">
                      | Status: 
                      <span
                        className={`ml-2 py-[2px] px-2 text-sm rounded ${
                          item?.status === 'completed'
                            ? 'bg-green-200 text-green-700'
                            : item?.status === 'pending'
                            ? 'bg-red-200 text-red-700'
                            : item?.status === 'processing'
                            ? 'bg-yellow-100 text-yellow-600'
                            : 'bg-indigo-100 text-indigo-600'
                        }`}
                      >
                        {item?.status}
                      </span>
                    </p>
                    </div>
                    <hr className= 'my-2'/>
                  </li>
                ))
          }
        </ul>
      </div>
  </div>
  )
}

export default UserPayments;