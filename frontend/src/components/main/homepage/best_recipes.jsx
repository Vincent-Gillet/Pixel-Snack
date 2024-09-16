import React from 'react';
import RecipeCard from './cards/recipe_card/recipe_card'; 


const BestRecipes = () => {
  const recipes = [
    {
      title: 'Titre de la recette 1',
      image: 'path/to/image1.jpg',
      reviews: 4,
      reviewCount: 340,
      link: 'https://example.com',
    },
    {
      title: 'Titre de la recette 2',
      image: 'path/to/image2.jpg',
      reviews: 5,
      reviewCount: 123,
      link: 'https://example.com',
    },
    // Ajoutez d'autres recettes ici
  ];

  return (
    <div className="App-bestRecipes container">
      <div className='title'>
        <h2>Recettes Préférées</h2>
        <button className='main_button' onClick={() => window.location.href='#'}>Voir plus</button>
      </div>
      <div className='container_bestRecipes'>
        {recipes.map((recipe, index) => (
          <RecipeCard
            key={index}
            title={recipe.title}
            image={recipe.image}
            reviews={recipe.reviews}
            reviewCount={recipe.reviewCount}
            link={recipe.link}
          />
        ))}
      </div>
    </div>
  );
};

export default BestRecipes;