import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RecipeCard from '../../../cards/recipe_card/recipe_card'; 

function SecondSlider() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/v1/recipes')
      .then(response => setRecipes(response.data))
      .catch(error => console.error('Error fetching recipes:', error));
  }, []);

  const firstRecipe = recipes[0] || {};

  const backgroundLastRecipes = {
    background: `url(${firstRecipe.image})`,
  };

  return (
    <div className="App-secondSlider container">
      <div className='filter'></div>            
      <div className="background" style={backgroundLastRecipes}></div>
      <div className='title'>
        <h2>{firstRecipe.title || ''}</h2>
        <h3>{firstRecipe.step || 'Étape 1'}</h3>
        <p>{firstRecipe.description || ''}</p>
        <button className='main_button' onClick={() => window.location.href=`/recipes/${firstRecipe.id}`}>Lire la suite</button>
      </div>
      <div className='container_lastRecipes'>
        {recipes.slice(0, 4).map((recipe, index) => {
          const truncatedTitle = recipe.title.length > 40 
            ? recipe.title.slice(0, 40) + '...' 
            : recipe.title;

          return (
            <RecipeCard
              key={index}
              title={truncatedTitle}
              image={recipe.image}
              reviews={Math.floor(Math.random() * 5) + 1} // Génère des avis aléatoires pour l'exemple
              reviewCount={Math.floor(Math.random() * 100)} // Génère un nombre d'avis aléatoire pour l'exemple
              link={`/recipes/${recipe.id}`}
            />
          );
        })}
      </div>
    </div>
  );
}

export default SecondSlider;