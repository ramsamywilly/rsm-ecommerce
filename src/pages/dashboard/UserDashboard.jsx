import React from 'react' 
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useLogoutUserMutation } from '../../redux/features/auth/authApi'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/features/auth/authSlice' // Import de logout manquant

const navItems = [
    {path: '/dashboard', label: 'Tableau de bord'},
    {path: '/dashboard/profile', label: 'Profil'},
    {path: '/dashboard/orders', label: 'Commandes'},
    {path: '/dashboard/payments', label: 'Paiements'},
    {path: '/dashboard/reviews', label: 'Commentaires'},
];

const UserDashboard = () => {
  const [logoutUser] = useLogoutUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();        
      dispatch(logout()); // Appel à logout corrigé
      navigate('/');
    } catch (error) {
      console.error('Échec de la déconnexion', error);
    }
  };

  return (
      <div className='space-y-5 bg-white p-8 md:h-screen flex flex-col justify-between'>
          <div>
              <div className='nav__logo'>
                  <Link to="/">RSM<span>.</span></Link>
                  <p className='text-xs italic'>Tableau de bord utilisateur</p>
              </div>
              <hr className='mt-5'/>
              <ul className='space-y-5 pt-5'>
                {
                  navItems.map((item) => (
                      <li key={item.path}>
                          <NavLink 
                          className={
                            ({isActive}) => isActive ? 'text-blue-600 font-bold' :
                            'text-black'} 
                          end  
                          to={item.path}
                          >
                            {item.label}
                          </NavLink>
                      </li>
                    ))
                }
              </ul>
          </div> 

          <div className='mb-3'>
             <hr className='mb-3'/>
             <button 
             onClick={handleLogout}
             className='text-white bg-primary font-medium px-5 py-1 rounded-sm'
             >
             déconnexion
             </button>
          </div>  
      </div>
  );
};

export default UserDashboard;
