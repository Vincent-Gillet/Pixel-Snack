import React from 'react';
import backgroundFood from '../assets/image/recettes/foodwars.jpeg';

function FirstSlider() {

  const backgroundLastRecipes = {
    background: `url(${backgroundFood})`,
  };


  return (
    <div className="App-first_slider container">
      <div className='filter'>
      </div>            
      <div class="background" style={backgroundLastRecipes}></div>
      <div className='title'>
          <h2>Oeuf pané</h2>
          <h3>Étape 1</h3>
          <p>Lorem ipsum dolor sit amet, ullamco laboris nisi ut aliquip ex ea...</p>
          <button className='main_button' onClick={() => window.location.href='#'}>Lire la suite</button>
          </div>


    </div>
  );
}

export default FirstSlider;