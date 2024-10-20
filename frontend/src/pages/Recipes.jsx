import React, { useState } from 'react';
import Banner from '../components/banner/banner';
import RecipesBloc from '../components/pages/recipes/recipes_bloc';
import Newsletter from '../components/newsletter/newsletter';
import FilterBloc from '../components/filter_recipes/filter_recipes';
import customImage from '../assets/image/recettes/foodwars.jpeg';

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  
  return (
    <div className="App container">
      <Banner title="Recettes" image={customImage} altText="plat d'un animé" />
      <FilterBloc setRecipes={setRecipes} />
      <RecipesBloc recipes={recipes} setRecipes={setRecipes} />
      <Newsletter />
    </div>
  );
}

export default Recipes;