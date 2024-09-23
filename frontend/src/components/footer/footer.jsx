import React from 'react';
import logo from '../../assets/logo/logo_pixel_snack.svg';

function Footer() {
  return (
    <footer className="App-footer container">
        <div className="top-footer">
            <a href="#accueil" className='footer-logo'>
                <img src={logo} className="App-logo" alt="logo" />
            </a>
            <nav>
                <h3>Navigation</h3>
                <ul>
                <li>
                    <a href="#recettes">Recettes</a>
                </li>
                <li>
                    <a href="#categories">Catégories</a>
                </li>
                <li>
                    <a href="#contact">Contact</a>
                </li>
                </ul>
            </nav>
            <div className='social_network'>
                <a href="#youtube" target='_blank'>
                    <i className="fa-brands fa-youtube"></i>
                </a>
                <a href="#instagram" target='_blank'>
                    <i class="fa-brands fa-instagram"></i>
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
            <a href="#LegalesMentions">Mentions Légales</a>
            <a href="#CGU">Conditions Générales d'Utilisation</a>
            <a href="#RGPD">Politique de protection des données personnelles</a>
            <a href="#CoohiesChoice">Vos choix concernant l'utilisation de cookies</a>
        </div>


    </footer>
  );
}

export default Footer;