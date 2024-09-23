import React from 'react';
import SearchBar from '../components/searchbar/searchbar';
import RecipeBloc from '../components/recipe/recipe_bloc';
import Newsletter from '../components/newsletter/newsletter';
import FirstSlider from '../components/first_slider/first_slider';
import LastRecipes from '../components/last_recipes/last_recipes';
import Separator from '../components/separator/separator';
import BestRecipes from '../components/best_recipes/best_recipes';

function Recipe() {
  return (
    <div className="App container">
        <FirstSlider />
        <SearchBar />
        <RecipeBloc />
        <LastRecipes />
        <Separator />
        <BestRecipes />
        <Newsletter />
    </div>

  );
}

export default Recipe;