import React from 'react';
import { useFetchAllBlogsQuery } from '../redux/features/blogs/blogApi';
import { Link } from "react-router-dom"; 

const Footer = () => {
  const { data, isLoading, isError } = useFetchAllBlogsQuery();

  const blogs = data?.posts || [];

  if (isLoading) return <p>Chargement des blogs...</p>;
  if (isError) return <p>Une erreur est survenue lors du chargement des blogs.</p>;

  return (
    <>
      {/* Conteneur principal du pied de page */}
      <footer className="section__container footer__container">
        {/* Colonne contenant les coordonnées */}
        <div className="footer__col">
          <h4>COORDONNÉES</h4>
          <p>
            <span>
              <i className="ri-map-pin-fill"></i>
            </span>
            2157 Chemin Lefaguyes 97440 Saint-André
          </p>
          <p>
            <span>
              <i className="ri-mail-fill"></i>
            </span>
            rsmtradecorporation@gmail.com
          </p>
          <p>
            <span>
              <i className="ri-phone-fill"></i>
            </span>
            (+262) 06 92 71 48 48
          </p>
        </div>

        {/* Colonne contenant les liens sur la société */}
        <div className="footer__col">
          <h4>SOCIÉTÉ</h4>
          <Link to='/'>Domicile</Link>
          <Link to='/'>Qui sommes-nous</Link>
          <Link to='/'>Travaillez avec nous</Link>
          <Link to='/'>Nos blogs</Link>
          <Link to='/'>Conditions générales</Link>
        </div>

        {/* Colonne contenant les liens utiles */}
        <div className="footer__col">
          <h4>LIENS UTILES</h4>
          <Link to='/'>Aide</Link>
          <Link to='/'>Suivez votre commande</Link>
          <Link to='/'>Agriculture</Link>
          <Link to='/'>BTP</Link>
          <Link to='/'>Industrie</Link>
        </div>

        {/* Colonne contenant les icônes de réseaux sociaux et les images des blogs */}
        <div className="footer__col">
          {/* Section des réseaux sociaux */}
          <h4>SUIVEZ-NOUS</h4>
          <div className="flex space-x-8  justify-center">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="ri-instagram-fill text-4xl text-[#E1306C]"></i>
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="ri-facebook-box-fill text-4xl text-[#1877F2]"></i>
            </a>
            <a href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer">
              <i className="ri-whatsapp-fill text-4xl text-[#25D366]"></i>
            </a>
          </div>

          {/* Section Blog */}
          <h4 className="mt-1">BLOG</h4>
          <div className="flex space-x-4 mt-1">
            {blogs.slice(0, 3).map((blog) => (
              <Link to={`/blog/${blog._id}`} key={blog._id}>
                <img
                  src={blog.imageUrl}
                  alt={`Image de ${blog.title}`}
                  className="rounded-lg w-24 h-20 object-cover"
                />
              </Link>
            ))}
          </div>
        </div>
      </footer>

      {/* Barre de pied de page */}
      <div className='footer__bar'>
        Copyright © 2025 RSM (Rugged Site Machinery). Tous droits réservés.
      </div>
    </>
  );
};

export default Footer;
