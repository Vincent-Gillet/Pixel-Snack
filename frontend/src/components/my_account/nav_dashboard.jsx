import React from 'react';
import { Link } from 'react-router-dom';
import './NavDashboard.scss';

const NavDashboard = () => {
  const role = localStorage.getItem('role');

  return (
    <nav className="nav-dashboard">
      <ul>
        {role === 'admin' ? (
          <>
            <li>
              <Link to="/dashboard/recipes">Recettes</Link>
            </li>
            <li>
              <Link to="/dashboard/categories">Catégories</Link>
            </li>
            <li>
              <Link to="/dashboard/users">Utilisateurs</Link>
            </li>
            <li>
              <Link to="/dashboard/account">Mon Compte</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/dashboard/my-recipes">Mes Recettes</Link>
            </li>
            <li>
              <Link to="/dashboard/account">Mon Compte</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavDashboard;