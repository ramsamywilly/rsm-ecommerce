import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CartModal from '../pages/shop/CartModal';
import { useLogoutUserMutation } from '../redux/features/auth/authApi';
import { logout } from '../redux/features/auth/authSlice';
import avatarImg from '../assets/avatar.png';
import logo from '../assets/log.png';

const Navbar = () => {
  // Récupère les produits dans le panier
  const products = useSelector((state) => state.cart.products);
  
  // État pour ouvrir/fermer le modal du panier
  const [isCartOpen, setIsCartOpen] = useState(false);
  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  // Gérer l'état de la déconnexion
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [logoutUser] = useLogoutUserMutation();
  const navigate = useNavigate();

  // Gérer l'ouverture/fermeture du menu déroulant de l'utilisateur
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const handleDropDownToggle = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };




  // État du menu mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);


  // Menus pour l'administrateur
  const adminDropDownMenus = [
    { label: "Tableau de bord", path: "/dashboard/admin" },
    { label: "Profil", path: "/dashboard/profile" },
    { label: "Ajout de Produits", path: "/dashboard/add-new-product" },
    { label: "Gestion produits", path: "/dashboard/manage-products" },  
    { label: 'Gestion livraison', path: '/dashboard/manage-orders'},
  ];
  // Menus pour l'administrateur
  const managerDropDownMenus = [
    { label: "Tableau de bord", path: "/dashboard/manager" },
    { label: "Profil", path: "/dashboard/profile" },
    { label: "Ajout de Produits", path: "/dashboard/add-new-product" },
    { label: "Gestion produits", path: "/dashboard/manage-products" },  
    { label: 'Gestion livraison', path: '/dashboard/manage-orders'},
  ];  


  // Menus pour l'utilisateur
  const userDropDownMenus = [
    { label: "Tableau de bord", path: "/dashboard" }, 
    { label: "Profil", path: "/dashboard/profile" },
    { label: "Commandes", path: "/dashboard/orders" },
    { label: "Paiements", path: "/dashboard/payments" },
    
  ];



   // Choisir les menus en fonction du rôle de l'utilisateur
  const dropdownMenus = user?.role === 'admin' 
    ? adminDropDownMenus 
    : user?.role === 'manager' 
      ? managerDropDownMenus 
      : userDropDownMenus;

  // Fonction pour gérer la déconnexion
  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout()); // Déconnecter l'utilisateur de Redux
      navigate('/'); // Rediriger vers la page d'accueil
    } catch (error) {
      console.error('Échec de la déconnexion', error); 
    }
  };

  return (
    <header className='fixed-nav-bar w-nav h-20'>
      <nav className='max-w-screen-2xl mx-auto px-4 py-3 flex justify-between items-center'>
        <ul className='nav__links'>
          <li className='Link'>
            <Link to='/'>Accueil</Link>
          </li>
          <li className='Link'>
            <Link to='/shop'>Boutique</Link>
          </li>
          <li className='Link'>
            <Link to='/occasion'>Occasion</Link>
          </li>
          <li className='Link'>
            <Link to='/contact'>Contact</Link>
          </li>
        </ul>
       {/* Menu Burger (visible uniquement sur mobile) */}
        <button className="text-3xl lg:hidden border-2 border-gray-300 p-3 w-12 h-12 flex items-center justify-center rounded-md" onClick={toggleMenu} aria-label="Toggle menu">
          ☰
        </button>
        {/* Logo du site */}
        <div className="nav__logo">
          <Link to="/">
            <img src={logo} alt="." className="w-40 h-15 cursor-pointer" />
          </Link>
        </div>
        {/* Icônes de la barre de navigation */}
        <div className='nav__icons relative'>
          <span>
            <Link to='/search'>
              <i className="ri-search-line"></i>
            </Link>
          </span>

          <span>
            <button onClick={handleCartToggle} className='hover:text-primary'>
              <i className="ri-shopping-bag-line"></i>
              <sup className='text-sm inline-block px-1.5 text-white rounded-full bg-primary text-center'>{products.length}</sup>
            </button>
          </span>

          <span>
            {
              user ? (
                <>
                  <img
                    onClick={handleDropDownToggle}
                    src={user?.profileImage || avatarImg}
                    alt="Avatar"
                    className='size-6 rounded-full cursor-pointer'
                  />
                  {
                    isDropDownOpen && (
                      <div className='absolute -right-4 mt-3 p-4 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50'>
                        <ul className='font-medium space-y-4 p-2'>
                          {dropdownMenus.map((menu, index) => (
                            <li key={index}>
                              <Link
                                onClick={() => setIsDropDownOpen(false)} 
                                className='dropdown-items' to={menu.path}>{menu.label}</Link>
                            </li>
                          ))}
                          <li><Link onClick={handleLogout} className='dropdown-items'>Déconnexion</Link></li>
                        </ul>
                      </div>
                    )
                  }
                </>
              ) : (
                <Link to='/login'>
                  <i className="ri-user-line"></i>
                </Link>
              )
            }
          </span>
        </div>
      </nav>

      {/* Menu Mobile (Slide-in) */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out lg:hidden`}>
        <button className="absolute top-4 right-4 text-3xl" onClick={toggleMenu} aria-label="Close menu">×</button>
        <ul className="mt-16 space-y-6 text-center text-lg">
          <li><Link to="/" onClick={toggleMenu}>Accueil</Link></li>
          <li><Link to="/shop" onClick={toggleMenu}>Boutique</Link></li>
          <li><Link to="/occasion" onClick={toggleMenu}>Occasion</Link></li>
          <li><Link to="/contact" onClick={toggleMenu}>Contact</Link></li>
        </ul>
      </div>

      {/* Modal du panier, affiché si isCartOpen est true */}
      {
        isCartOpen && <CartModal products={products} isOpen={isCartOpen} onClose={handleCartToggle} />
      }

    </header>
  );
};

export default Navbar;


