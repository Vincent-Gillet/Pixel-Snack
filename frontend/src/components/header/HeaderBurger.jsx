import React, { useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import logo from '../../assets/logo/logo_pixel_snack.svg';
import { NavLink } from 'react-router-dom';

function HeaderBurger({ isUserLoggedIn, handleLogout }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleStateChange = (state) => {
        setIsMenuOpen(state.isOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className="App-header container">
            <NavLink to="/">
                <img src={logo} className="App-logo" alt="logo" />
            </NavLink>
            <Menu 
                isOpen={isMenuOpen}
                onStateChange={(state) => handleStateChange(state)}
                right
            >
                <NavLink to="/recettes" onClick={closeMenu}>Recettes</NavLink>
                <NavLink to="/categories" onClick={closeMenu}>Catégories</NavLink>
                <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
                {isUserLoggedIn && (
                    <NavLink to="/dashboard" onClick={closeMenu}>Mon Compte</NavLink>
                )}
                <div>
                    {isUserLoggedIn ? (
                        <button onClick={handleLogout} className='connexion normal_button' aria-label="Déconnexion">
                            Déconnexion
                            <i className="fa-solid fa-user" aria-hidden="true"></i>
                        </button>
                    ) : (
                        <NavLink to="/login" className='connexion normal_button' onClick={closeMenu} aria-label="Connexion">
                            Connexion
                            <i className="fa-solid fa-user" aria-hidden="true"></i>
                        </NavLink>
                    )}
                </div>
            </Menu>
        </header>
    );
}

export default HeaderBurger;