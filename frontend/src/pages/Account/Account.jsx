import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardRecipes from '../../components/my_account/my_recipes';
import DashboardCategories from '../../components/my_account/categories';
import DashboardUsers from '../../components/my_account/users/users';
import DashboardMyRecipes from '../../components/my_account/my_recipes';
import UserGet from '../../components/my_account/user/get';

function Account() {
  const [activeComponent, setActiveComponent] = useState('recipes');
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/user`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setRole(response.data.user.role);
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    fetchUserRole();
  }, []);

  const renderComponent = () => {
    switch (activeComponent) {
      case 'recipes':
        return <DashboardRecipes />;
      case 'categories':
        return role === 'admin' ? <DashboardCategories /> : null;
      case 'users':
        return role === 'admin' ? <DashboardUsers /> : null;
      case 'account':
        return <UserGet />;
      default:
        return role === 'admin' ? <DashboardRecipes /> : <DashboardMyRecipes />;
    }
  };

  return (
    <>
      <div className="container dashboard">
        <nav className='nav_dashboard'>
          <ul>
            <li>
              <button 
                className={activeComponent === 'recipes' ? 'active' : ''}
                onClick={() => setActiveComponent('recipes')}
              >
                {role === 'admin' ? 'Recettes' : 'Mes Recettes'}
              </button>
            </li>
            {role === 'admin' && (
              <li>
                <button
                  className={activeComponent === 'categories' ? 'active' : ''}
                  onClick={() => setActiveComponent('categories')}
                >
                  Catégories
                </button>
              </li>
            )}
            {role === 'admin' && (
              <li>
                <button 
                  className={activeComponent === 'users' ? 'active' : ''}
                  onClick={() => setActiveComponent('users')}
                >
                  Utilisateurs
                </button>
              </li>
            )}
            <li>
              <button 
                className={activeComponent === 'account' ? 'active' : ''}
                onClick={() => setActiveComponent('account')}
              >
                Mon Compte
              </button>
            </li>
          </ul>
        </nav>

        <div className="dashboard-content">
          {renderComponent()}
        </div>
      </div>
    </>
  );
}

export default Account;