import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import RecipeCard from '../../../cards/recipe_card/recipe_card'; 
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function SecondSlider() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/v1/recipes')
      .then(response => {
        console.log(response.data); // Vérifiez les données de la réponse
        // Trier les recettes par date de publication décroissante
        const sortedRecipes = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setRecipes(sortedRecipes);
        setSelectedRecipe(sortedRecipes[0]); // Initialiser avec la première recette
      })
      .catch(error => console.error('Error fetching recipes:', error));
  }, []);

  const handleCardClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    beforeChange: (current, next) => setSelectedRecipe(recipes[next]),
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

  const backgroundLastRecipes = selectedRecipe
    ? {
        background: `url(${selectedRecipe.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : {};

  return (
    <div className="App-secondSlider container">
      <div className='filter'></div>            
      <div className="background" style={backgroundLastRecipes}></div>
      <div className='title'>
        <h2>{selectedRecipe ? (selectedRecipe.title.length > 15 ? selectedRecipe.title.slice(0, 15) + '...' : selectedRecipe.title) : 'Sélectionnez une recette'}</h2>
        <h3>Préparation</h3>
        <p>{selectedRecipe ? (selectedRecipe.description.length > 60 ? selectedRecipe.description.slice(0, 60) + '...' : selectedRecipe.description) : ''}</p>
        {selectedRecipe && (
          <button className='main_button' onClick={() => window.location.href=`/recipes/${selectedRecipe.id}`}>Lire la suite</button>
        )}
      </div>
      <div className='container_lastRecipes'>
        <Slider {...settings}>
          {recipes.slice(0, 6).map((recipe, index) => {
            const truncatedTitle = recipe.title.length > 20 
              ? recipe.title.slice(0, 20) + '...' 
              : recipe.title;

            return (
              <div key={index} onClick={() => handleCardClick(recipe)}>
                <RecipeCard
                  title={truncatedTitle}
                  image={recipe.image}
                  reviews={Math.floor(Math.random() * 5) + 1} // Génère des avis aléatoires pour l'exemple
                  reviewCount={Math.floor(Math.random() * 100)} // Génère un nombre d'avis aléatoire pour l'exemple
                />
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
}

export default SecondSlider;