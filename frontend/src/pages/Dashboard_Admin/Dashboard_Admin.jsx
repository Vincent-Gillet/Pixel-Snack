import React, { useState } from 'react';
import DashboardRecipes from '../../components/dashboard/my_recipes';
import DashboardCategories from '../../components/dashboard/categories';
import DashboardUsers from '../../components/dashboard/users/users';

function DashboardAdmin() {
  const [activeComponent, setActiveComponent] = useState('recipes');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'recipes':
        return <DashboardRecipes />;
      case 'categories':
        return <DashboardCategories />;
      case 'users':
        return <DashboardUsers />;
      default:
        return <DashboardRecipes />;
    }
  };

  return (
    <>
      <div className="App container dashboard">
        <nav className='nav_dashboard'>
          <ul>
            <li>
              <button 
                className={activeComponent === 'recipes' ? 'active' : ''}
                onClick={() => setActiveComponent('recipes')}
              >
                Recettes
              </button>
            </li>
            <li>
            <button
                className={activeComponent === 'categories' ? 'active' : ''}
                onClick={() => setActiveComponent('categories')}
              >
                Catégories
              </button>
            </li>
            <li>
              <button 
                className={activeComponent === 'users' ? 'active' : ''}
                onClick={() => setActiveComponent('users')}
              >
                Utilisateurs
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

export default DashboardAdmin;