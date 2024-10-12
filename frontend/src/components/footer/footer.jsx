import { React, useEffect } from 'react';
import logo from '../../assets/logo/logo_pixel_snack.svg';
import { NavLink, useLocation } from 'react-router-dom';

function Footer() {
    const location = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);    
    }, [location]);

  return (
    <footer className="App-footer container">
        <div className="top-footer">
            <NavLink to="/" className='footer-logo'>
                <img src={logo} className="App-logo" alt="logo" />
            </NavLink>
            <nav>
                <h3>Navigation</h3>
                <ul>
                <li>
                    <NavLink to="/recettes">Recettes</NavLink>
                </li>
                <li>
                    <NavLink to="/categories">Catégories</NavLink>
                </li>
                <li>
                    <NavLink to="/contact">Contact</NavLink>
                </li>
                <li>
                    <NavLink to="/cgu">C.G.U.</NavLink>
                </li>
                </ul>
            </nav>
            <div className='social_network'>
                <a href="#youtube" target='_blank'>
                    <i className="fa-brands fa-youtube"></i>
                </a>
                <a href="#instagram" target='_blank'>
                    <i className="fa-brands fa-instagram"></i>
                </a>
                <a href="#printerest" target='_blank'>
                    <i className="fa-brands fa-pinterest"></i>
                </a>
                <a href="#facebook" target='_blank'>
                    <i className="fa-brands fa-facebook"></i>
                </a>
                <a href="#x" target='_blank'>
                    <i className="fa-brands fa-x-twitter"></i>
                </a>
            </div>
        </div>
        <div className='bottom-footer'>
            <p>© 2021 Pixel Snack - Tous droits réservés</p>
        </div>


    </footer>
  );
}

export default Footer;