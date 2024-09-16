import React from 'react';
import RecipesBloc from '../components/main/recipes/recipesbloc';
import Newsletter from '../components/newsletter';
import FirstSlider from '../components/first_slider';
import SearchBar from '../components/search_bar';
import FilterBloc from '../components/main/recipes/filter_recipes/filter_recipes';

function Recipes() {
  return (
    <div className="App container">
        <FirstSlider />
        <SearchBar />
        <FilterBloc />
        <RecipesBloc />
        <Newsletter />
    </div>

  );
}

export default Recipes;