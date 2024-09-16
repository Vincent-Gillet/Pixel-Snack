import React from 'react';
import { Link } from 'react-router-dom';
import './NavDashboard.scss';

const NavDashboard = () => {
  return (
    <nav className="nav-dashboard">
      <ul>
        <li>
          <Link to="/dashboard/recipes">Recettes</Link>
        </li>
        <li>
          <Link to="/dashboard/categories">Catégories</Link>
        </li>
        <li>
          <Link to="/dashboard/users">Utilisateurs</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavDashboard;