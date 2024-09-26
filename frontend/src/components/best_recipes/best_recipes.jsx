import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import RecipeCard from '../cards/recipe_card/recipe_card'; 
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const BestRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/v1/recipes')
      .then(response => {
        const recipesWithFakeRatings = response.data.map(recipe => ({
          ...recipe,
          rating: Math.floor(Math.random() * 5) + 1,
          reviewCount: Math.floor(Math.random() * 100) 
        }));
        setRecipes(recipesWithFakeRatings);
      })
      .catch(error => console.error('Error fetching recipes:', error));
  }, []);

  const sortedRecipes = recipes.sort((a, b) => b.rating - a.rating);

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
    <div className="App-bestRecipes container">
      <div className='title'>
        <h2>Recettes Préférées</h2>
        <button className='main_button' onClick={() => window.location.href='/recettes'}>Voir plus</button>
      </div>
      <div className='container_bestRecipes'>
        <Slider {...settings}>
          {sortedRecipes.slice(0, 4).map((recipe, index) => {
            const truncatedTitle = recipe.title.length > 20 
              ? recipe.title.slice(0, 20) + '...' 
              : recipe.title;

            return (
              <div key={index}>
                <RecipeCard
                  title={truncatedTitle}
                  image={recipe.image}
                  reviews={recipe.rating} 
                  reviewCount={recipe.reviewCount} 
                  link={`/recipes/${recipe.id}`}
                />
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default BestRecipes;