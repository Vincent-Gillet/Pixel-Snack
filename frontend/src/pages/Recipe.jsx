import React, { useState } from 'react';
import Banner from '../components/banner/banner';
import RecipeBloc from '../components/recipe/recipe_bloc';
import Newsletter from '../components/newsletter/newsletter';
import LastRecipes from '../components/last_recipes/last_recipes';
import Separator from '../components/separator/separator';
import BestRecipes from '../components/best_recipes/best_recipes';

function Recipe() {
  const [recipeTitle, setRecipeTitle] = useState('');
  const [recipeImage, setRecipeImage] = useState('');

  return (
    <div className="App container">
        <Banner title={recipeTitle} image={recipeImage} />
        <RecipeBloc setRecipeTitle={setRecipeTitle} setRecipeImage={setRecipeImage} />
        <LastRecipes />
        <Separator />
        <BestRecipes />
        <Newsletter />
    </div>
  );
}

export default Recipe;