import React from 'react';
import FirstSlider from '../components/first_slider/first_slider';
import SearchBar from '../components/searchbar/searchbar';
import Categories from '../components/pages/homepage/categories/categories';
import SecondSlider from '../components/pages/homepage/second_slider/second_slider';
import BestRecipe from '../components/pages/homepage/best_recipe/best_recipe';
import LastRecipes from '../components/last_recipes/last_recipes';
import BestRecipes from '../components/best_recipes/best_recipes';
import Separator from '../components/separator/separator';
import Parternship from '../components/pages/homepage/partnership/partnership';
import Newsletter from '../components/newsletter/newsletter';

function Home() {
  return (
    <div className="App container">
      <FirstSlider />
      <SearchBar />    
      <Categories />
      <SecondSlider />
      <BestRecipe />
      <LastRecipes />
      <Separator />
      <BestRecipes />
      <Parternship />
      <Newsletter />  
    </div>       

  );
}

export default Home;