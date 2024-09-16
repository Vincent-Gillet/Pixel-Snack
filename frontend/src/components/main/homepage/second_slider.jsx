import React from 'react';
import backgroundFood from '../../../assets/image/recettes/foodwars.jpeg';
import repice1 from '../../../assets/image/recettes/ramen-ghibli-studio.webp';



function SecondSlider() {

    const backgroundLastRecipes = {
        background: `url(${backgroundFood})`,
      };

  return (
    <div className="App-secondSlider container">
        <div className='filter'>
        </div>            
        <div class="background" style={backgroundLastRecipes}></div>
        <div className='title'>
            <h2>Oeuf pané</h2>
            <h3>Étape 1</h3>
            <p>Lorem ipsum dolor sit amet, ullamco laboris nisi ut aliquip ex ea...</p>
            <button className='main_button' onClick={() => window.location.href='#'}>Lire la suite</button>
            </div>
        <div className='container_lastRecipes'>
            <div className='card_recipe card'>
                <div className='card_image'>
                    <img src={repice1} alt="plat" />
                </div>
                <div className='card_content'>
                    <h3>Titre de la recette</h3>
                    <div className='reviews'>
                        <div className='stars'>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <p>340 avis</p>
                    </div>
                </div>
            </div>
            <div className='card_recipe card'>
                <div className='card_image'>
                    <img src={repice1} alt="plat" />
                </div>
                <div className='card_content'>
                    <h3>Titre de la recette</h3>
                    <div className='reviews'>
                        <div className='stars'>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <p>340 avis</p>
                    </div>
                </div>
            </div>
            <div className='card_recipe card'>
                <div className='card_image'>
                    <img src={repice1} alt="plat" />
                </div>
                <div className='card_content'>
                    <h3>Titre de la recette</h3>
                    <div className='reviews'>
                        <div className='stars'>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <p>340 avis</p>
                    </div>
                </div>
            </div>
            <div className='card_recipe card'>
                <div className='card_image'>
                    <img src={repice1} alt="plat" />
                </div>
                <div className='card_content'>
                    <h3>Titre de la recette</h3>
                    <div className='reviews'>
                        <div className='stars'>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <p>340 avis</p>
                    </div>
                </div>
            </div>

        </div>


    </div>
  );
}

export default SecondSlider;