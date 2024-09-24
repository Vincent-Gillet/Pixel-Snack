import React, { useState } from 'react';
import RecipesBloc from '../components/pages/recipes/recipes_bloc';
import Newsletter from '../components/newsletter/newsletter';
import FirstSlider from '../components/first_slider/first_slider';
import SearchBar from '../components/searchbar/searchbar';
import FilterBloc from '../components/filter_recipes/filter_recipes';

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  
  return (
    <div className="App container">
      <FirstSlider />
      <SearchBar setRecipes={setRecipes} />
      <FilterBloc setRecipes={setRecipes} />
      <RecipesBloc recipes={recipes} setRecipes={setRecipes} />
      <Newsletter />
    </div>
  );
}

export default Recipes;