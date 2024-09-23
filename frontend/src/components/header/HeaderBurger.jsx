import React, { useState, useEffect } from 'react';

import logo from '../../assets/logo/logo_pixel_snack.svg';

import { NavLink } from 'react-router-dom';

function HeaderBurger() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            const burgerMenuButton = document.querySelector('.burger-menu-button');
            const menus = document.querySelectorAll('.navigation_burger');
            const burgerLines = document.querySelectorAll('.burger-line');

            const handleClick = () => {
                menus.forEach(menu => {
                    menu.classList.toggle('open');
                });

                burgerLines.forEach(line => {
                    line.classList.toggle('open');
                });
            };

            if (window.innerWidth < 1000) {
                if (burgerMenuButton) {
                    burgerMenuButton.addEventListener('click', handleClick);
                }
            } else {
                if (burgerMenuButton) {
                    burgerMenuButton.removeEventListener('click', handleClick);
                }
            }

            return () => {
                if (burgerMenuButton) {
                    burgerMenuButton.removeEventListener('click', handleClick);
                }
            };
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return (
        <header className="App-header container">
            <NavLink to="/">
                <img src={logo} className="App-logo" alt="logo" />
            </NavLink>
            <nav className={`navigation_burger ${isMenuOpen ? 'open' : ''}`}>
                <button className="burger-menu-button" aria-label="Menu" onClick={toggleMenu}>                        
                    <span className={`burger-line ${isMenuOpen ? 'open' : ''}`}></span>
                    <span className={`burger-line ${isMenuOpen ? 'open' : ''}`}></span>
                    <span className={`burger-line ${isMenuOpen ? 'open' : ''}`}></span>
                </button>
                <ul>
                    <li>                                                    
                        <NavLink to="/recettes" className=''>Recettes</NavLink>
                    </li>
                    <li>
                        <NavLink to="/catégories" className=''>Catégories</NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact" className=''>Contact</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard" className=''>Dashboard</NavLink>
                    </li>
                    <li>
                        <NavLink to="/connexion" className='normal_button'>Connexion</NavLink>
                    </li>
                    <div>
                        <NavLink to="/connexion" className='connexion normal_button'>
                            Connexion
                            <i className="fa-solid fa-user"></i>
                        </NavLink>
                    </div>
                </ul>
            </nav>
        </header>

    );

}

export default HeaderBurger;



  