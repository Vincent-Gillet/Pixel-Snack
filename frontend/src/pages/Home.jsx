import React from 'react';
import FirstSlider from '../components/first_slider';
import SearchBar from '../components/search_bar';
import Categories from '../components/main/homepage/categories';
import SecondSlider from '../components/main/homepage/second_slider';
import BestRecipe from '../components/main/homepage/best_recipe';
import LastRecipes from '../components/main/homepage/last_recipes';
import BestRecipes from '../components/main/homepage/best_recipes';
import Separator from '../components/main/homepage/separator';
import Parternship from '../components/main/homepage/partnership';
import Newsletter from '../components/newsletter';

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