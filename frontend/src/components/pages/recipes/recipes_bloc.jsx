import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../pagination';
import RecipeCard from '../../cards/recipe_card/recipe_card';

const RECIPES_PER_PAGE = 9;

function RecipesBloc({ recipes, setRecipes, categoryId }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const url = categoryId 
          ? `${import.meta.env.VITE_API_URL}/categories/${categoryId}/recipes`
          : `${import.meta.env.VITE_API_URL}/recipes`;

        const response = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        console.log('Réponse complète:', response);
        console.log('Données récupérées:', response.data);
        setRecipes(response.data);
      } catch (error) {
        setError('Erreur lors de la récupération des recettes');
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, [setRecipes, categoryId]);

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

  return (
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
                <RecipeCard
                  key={index}
                  title={truncatedTitle}
                  image={recipe.image}
                  reviews={Math.floor(Math.random() * 5) + 1}
                  reviewCount={Math.floor(Math.random() * 100)}
                  link={`/recipes/${recipe.id}`}
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
  );
}

export default RecipesBloc;