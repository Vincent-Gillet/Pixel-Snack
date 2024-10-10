import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Pagination from '../pagination';
import DashboardRecipeCard from '../cards/recipe_card/recipe_dashboard/recipe_dashboard';

const RECIPES_PER_PAGE = 9;

function DashboardRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/user`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setUser(response.data.user);
      } catch (error) {
        console.error('Erreur lors de la récupération des informations de l\'utilisateur:', error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        let url = '';

        if (user && user.role === 'admin') {
          url = `${import.meta.env.VITE_API_URL}/recipes`;
        } else {
          url = `${import.meta.env.VITE_API_URL}/my-recipes`;
        }

        const response = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        console.log('Réponse complète:', response);
        console.log('Données récupérées:', response.data);

        if (user && user.role === 'admin') {
          setRecipes(response.data);
        } else {
          setRecipes(response.data.recipes);
        }
      } catch (error) {
        setError('Erreur lors de la récupération des recettes');
        console.error('Error fetching recipes:', error);
      }
    };

    if (user !== null) {
      fetchRecipes();
    }
  }, [user]);

  const indexOfLastRecipe = currentPage * RECIPES_PER_PAGE;
  const indexOfFirstRecipe = indexOfLastRecipe - RECIPES_PER_PAGE;
  const currentRecipes = Array.isArray(recipes) ? recipes.slice(indexOfFirstRecipe, indexOfLastRecipe) : [];

  const totalPages = Array.isArray(recipes) ? Math.ceil(recipes.length / RECIPES_PER_PAGE) : 0;

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/recipes/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setRecipes(recipes.filter(recipe => recipe.id !== id));
        console.log(`Recette avec l'ID: ${id} supprimée`);
      } else {
        console.error('Erreur lors de la suppression de la recette:', response.data);
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de la recette:', error);
    }
  };

  const handleView = (id) => {
    navigate(`/recipes/${id}/edit`);
  };

  return (
    <div className="App container">
      <button onClick={() => navigate('/recipe/create')} className='main_button'>Créer une recette</button>
      <div className="App-Recipes_Categorie_Bloc container">
        {error && <div className="error">{error}</div>}
        <div className="sub_bloc">
          <div className="container_cards">
            {currentRecipes.length > 0 ? (
              currentRecipes.map((recipe, index) => {
                const truncatedTitle = recipe.title && recipe.title.length > 20 
                  ? recipe.title.slice(0, 20) + '...' 
                  : recipe.title;

                return (
                  <DashboardRecipeCard
                    key={index}
                    title={truncatedTitle}
                    image={recipe.image}
                    link={`/recipes/${recipe.id}`}
                    onView={() => handleView(recipe.id)}
                    onDelete={() => handleDelete(recipe.id)}
                  />
                );
              })
            ) : (
              <div>Aucune recette trouvée</div>
            )}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              handlePreviousPage={handlePreviousPage}
              handleNextPage={handleNextPage}
              handlePageClick={handlePageClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardRecipes;