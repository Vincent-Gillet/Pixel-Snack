import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import backgroundFood from '../../assets/image/fonds/background_food.svg';
import RecipeCard from '../cards/recipe_card/recipe_card'; 
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function LastRecipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/recipes`)
      .then(response => setRecipes(response.data))
      .catch(error => console.error('Error fetching recipes:', error));
  }, []);

  const backgroundLastRecipes = {
    background: `url(${backgroundFood})`,
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1350,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div className="App-lastRecipes container">
      <div className="background" style={backgroundLastRecipes}></div>
      <div className='title'>
        <h2>Dernières Recettes</h2>
        <button className='main_button' onClick={() => window.location.href='/recettes'}>Voir plus</button>
      </div>
      <div className='container_lastRecipes'>
        <Slider {...settings}>
          {recipes.slice(-4).reverse().map((recipe, index) => {
            const truncatedTitle = recipe.title.length > 40 
              ? recipe.title.slice(0, 40) + '...' 
              : recipe.title;

            return (
              <div key={index}>
                <RecipeCard
                  title={truncatedTitle}
                  image={recipe.image}
                  reviews={Math.floor(Math.random() * 5) + 1}
                  reviewCount={Math.floor(Math.random() * 100)}
                  link={`/recipes/${recipe.id}`}
                />
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
}

export default LastRecipes;