import React, { useEffect, useState } from 'react';
import axios from 'axios';
import backgroundFood from '../../assets/image/fonds/background_food.svg';
import RecipeCard from '../cards/recipe_card/recipe_card'; 

function LastRecipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/v1/recipes')
      .then(response => setRecipes(response.data))
      .catch(error => console.error('Error fetching recipes:', error));
  }, []);

  const backgroundLastRecipes = {
    background: `url(${backgroundFood})`,
  };

  return (
    <div className="App-lastRecipes container">
      <div className="background" style={backgroundLastRecipes}></div>
      <div className='title'>
        <h2>Dernières Recettes</h2>
        <button className='main_button' onClick={() => window.location.href='#'}>Voir plus</button>
      </div>
      <div className='container_lastRecipes'>
      {recipes.slice(-4).reverse().map((recipe, index) => {
          const truncatedTitle = recipe.title.length > 40 
            ? recipe.title.slice(0, 40) + '...' 
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
        })}
      </div>
    </div>
  );
}

export default LastRecipes;