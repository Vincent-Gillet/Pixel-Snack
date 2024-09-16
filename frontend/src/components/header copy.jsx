import React, { useState, useEffect } from 'react';


import logo from '../assets/logo/logo_pixel_snack.svg';




function Header() {

    const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1000);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        isMobile ? (
            <header className="App-header">
                <a href="#accueil">
                    <img src={logo} className="App-logo" alt="logo" />
                </a>
                <nav className='navigation_buger'>
                    <button className="burger-menu-button" aria-label="Menu">
                        <div class="burger-line"></div>
                        <div class="burger-line"></div>
                        <div class="burger-line"></div>
                    </button>
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
                        <li>
                            <a href="#login">Connexion</a>
                        </li>
                        <div>
                            <button href="#login" className='connexion'>
                                Connexion
                                <img src={logo} className="App-logo" alt="logo" />
                            </button>
                        </div>
                    </ul>
                </nav>
            </header>
        ) : (
            <header className="App-header">
            <a href="#accueil">
                <img src={logo} className="App-logo" alt="logo" />
            </a>
            <nav className='navigation'>
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
            <div>
                <button href="#login" className='connexion'>
                    Connexion
                    <img src={logo} className="App-logo" alt="logo" />
                </button>
            </div>
            </header>

            )

    );



}

export default Header;



document.addEventListener('DOMContentLoaded', function() {
    // Sélectionnez les éléments
    let burgerMenuButton = document.querySelector('.burger-menu-button');
    let menus = document.querySelectorAll('.navigation_buger');
    let burgerLine = document.querySelectorAll('.burger-line');
  
    // Réinitialisez l'état au chargement de la page
    menus.forEach(menu => {
      menu.classList.remove('open');
    });
  
    burgerLine.forEach(line => {
      line.classList.remove('open');
    });
  
    // Ajoutez l'événement de clic au bouton burger menu
    burgerMenuButton.addEventListener('click', function() {
      menus.forEach(menu => {
        menu.classList.toggle('open');
      });
  
      burgerLine.forEach(line => {
        line.classList.toggle('open');
      });
    });
  });
  