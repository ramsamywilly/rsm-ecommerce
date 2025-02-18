import React from 'react'; 



const AdminStats = ({stats}) => {

  return (
      <div className= 'my-5 space-y-4'>
        <div className= 'grid gap-4 md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 grid-col-1'>
          <div className= 'bg-white shadow-md rounded-lg p-6 border border-gray-300 
          hover:border-primary cursor-pointer hover:scale-105 transition-all duration-200'>
              <h2 className= 'text-1xl text-center font-semibold mb-2'>Total des Gain</h2>
              <p className= 'text-2x1 text-center font-bold'>{stats?.totalEarnings}€</p>
          </div>
          <div className= 'bg-white shadow-md rounded-lg p-6 border border-gray-300 
          hover:border-primary cursor-pointer hover:scale-105 transition-all duration-200'>
              <h2 className= 'text-1xl text-center font-semibold mb-2'>Total des commandes</h2>
              <p className= 'text-2x1 text-center font-bold'>{stats?.totalOrders}</p>
          </div>
          <div className= 'bg-white shadow-md rounded-lg p-6 border border-gray-300 
          hover:border-primary cursor-pointer hover:scale-105 transition-all duration-200'>
              <h2 className= 'text-1xl text-center font-semibold mb-2'>Nombre total d’utilisateurs</h2>
              <p className= 'text-2x1 text-center font-bold'>{stats?.totalUsers}</p>
          </div>
          <div className= 'bg-white shadow-md rounded-lg p-6 border border-gray-300 
          hover:border-primary cursor-pointer hover:scale-105 transition-all duration-200'>
              <h2 className= 'text-1xl text-center font-semibold mb-2'>Total Produits achetés</h2>
              <p className= 'text-2x1 text-center font-bold'>{stats?.totalProducts}</p>
          </div>
        </div>
      </div>
  );
}

export default AdminStats;