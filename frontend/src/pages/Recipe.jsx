import React from 'react';
import SearchBar from '../components/search_bar';
import RecipeBloc from '../components/main/recipe/recipebloc';
import Newsletter from '../components/newsletter';
import FirstSlider from '../components/first_slider';
import LastRecipes from '../components/main/homepage/last_recipes';
import Separator from '../components/main/homepage/separator';
import BestRecipes from '../components/main/homepage/best_recipes';

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