import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/logo/logo_pixel_snack.svg';
// import DashboardRecipes from '../components/dashboard/my_recipes';
// import DashboardCategories from '../components/dashboard/categories';
// import DashboardUsers from '../components/dashboard/users';

function HeaderDisplay() {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleMouseEnter = () => {
    setIsSubMenuOpen(true);
  };

  const handleMouseLeave = () => {
    setIsSubMenuOpen(false);
  };

  const handleClick = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsAuthenticated(false);
    navigate('/login');
  };

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
            <NavLink to="/catégories" className=''>Catégories</NavLink>
          </li>
          <li>
            <NavLink to="/contact" className=''>Contact</NavLink>
          </li>
          <li
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            className="dashboard-menu"
          >
            <NavLink to="/dashboard" className=''>Dashboard</NavLink>
            {isSubMenuOpen && (
              <ul className="sub-menu">
                <li>
                  <NavLink to="/dashboard/recipes" className=''>Recettes</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/categories" className=''>Catégories</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/users" className=''>Utilisateurs</NavLink>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
      <div>
        {isAuthenticated ? (
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