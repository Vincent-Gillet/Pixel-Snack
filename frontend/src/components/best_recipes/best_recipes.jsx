import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RecipeCard from '../cards/recipe_card/recipe_card'; 

const BestRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/v1/recipes')
      .then(response => {
        const recipesWithFakeRatings = response.data.map(recipe => ({
          ...recipe,
          rating: Math.floor(Math.random() * 5) + 1,
          reviewCount: Math.floor(Math.random() * 100) 
        }));
        setRecipes(recipesWithFakeRatings);
      })
      .catch(error => console.error('Error fetching recipes:', error));
  }, []);

  const sortedRecipes = recipes.sort((a, b) => b.rating - a.rating);

  return (
    <div className="App-bestRecipes container">
      <div className='title'>
        <h2>Recettes Préférées</h2>
        <button className='main_button' onClick={() => window.location.href='#'}>Voir plus</button>
      </div>
      <div className='container_bestRecipes'>
        {sortedRecipes.slice(0, 4).map((recipe, index) => {
          const truncatedTitle = recipe.title.length > 20 
            ? recipe.title.slice(0, 20) + '...' 
            : recipe.title;

          return (
            <RecipeCard
              key={index}
              title={truncatedTitle}
              image={recipe.image}
              reviews={recipe.rating} 
              reviewCount={recipe.reviewCount} 
              link={`/recipes/${recipe.id}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BestRecipes;