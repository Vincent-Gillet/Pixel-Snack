import React from 'react';
import ramen from '../../../assets/image/recettes/ramen-poulet.jpg';


function BestRecipe() {
  return (
    <div className="App-bestRecipe container">
        <h2>Notre coup de coeur</h2>
        <div className='bestRecipe'>
            <div className='text_bestRecipe'>
            
                <h3>Ramen</h3>

                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>

                <button 
                className='main_button' >
                    Lire la suite
                </button>
                

            </div>
            <div className='image_recipe'>
                <img src={ramen} alt="ramen" />
            </div>

        </div>

    </div>
  );
}

export default BestRecipe;