import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo/logo_pixel_snack.svg';

function HeaderDisplay({ isUserLoggedIn, handleLogout }) {
  return (
    <header className="App-header container">
      <NavLink to="/">
        <img src={logo} className="App-logo" alt="logo" />
      </NavLink>
      <nav className='navigation'>
        <ul>
          <li>
            <NavLink to="/recettes" className=''>Recettes</NavLink>
          </li>
          <li>
            <NavLink to="/categories" className=''>Catégories</NavLink>
          </li>
          <li>
            <NavLink to="/contact" className=''>Contact</NavLink>
          </li>
          {isUserLoggedIn && (
            <li className="dashboard-menu">
              <NavLink to="/dashboard" className=''>Dashboard</NavLink>
            </li>
          )}
        </ul>
      </nav>
      <div>
        {isUserLoggedIn ? (
          <button onClick={handleLogout} className='connexion normal_button'>
            Déconnexion
            <i className="fa-solid fa-user"></i>
          </button>
        ) : (
          <NavLink to="/login" className='connexion normal_button'>
            Connexion
            <i className="fa-solid fa-user"></i>
          </NavLink>
        )}
      </div>
    </header>
  );
}

export default HeaderDisplay;