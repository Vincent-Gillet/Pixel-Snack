import React from 'react';

const RecipeInfo = ({ recipe, setIsEditing, handleDeleteRecipe }) => {
  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className='form_dashboard'>
        <span><h2>Nom :</h2><p>{recipe.title}</p></span>
        <span className='url'><h2>Image :</h2><p>{recipe.image}</p></span>
        {recipe.image && <img src={recipe.image} alt={recipe.title} />}
        <span><h2>Ingrédients :</h2>
          <ul>
            {recipe.ingredients && recipe.ingredients.length > 0 ? (
              recipe.ingredients.map((ingredient, index) => (
                <li key={index}>
                  <p>{ingredient.name}</p>
                  {ingredient.quantity !== null && ingredient.quantity !== 0 && (
                    <p>: {ingredient.quantity} {ingredient.unit}</p>
                  )}
                </li>
              ))
            ) : (
              <li>Aucun ingrédient spécifié</li>
            )}
          </ul>
        </span>
        <span><h2>Régime alimentaire :</h2>
          <ul>
            {recipe.diets && recipe.diets.length > 0 ? (
              recipe.diets.map((diet, index) => (
                <li key={index}><p>{diet.name}</p></li>
              ))
            ) : (
              <li>Aucun régime spécifié</li>
            )}
          </ul>
        </span>
        <span><h2>Catégories :</h2>
          <ul>
            {recipe.categories && recipe.categories.length > 0 ? (
              recipe.categories.map((category, index) => (
                <li key={index}>
                  <p>{category.title}</p>
                </li>
              ))
            ) : (
              <li>Aucune catégorie spécifiée</li>
            )}
          </ul>
        </span>
        <span><h2>Temps total :</h2><p>{recipe.total_time} minutes</p></span>
        <span><h2>Temps de préparation :</h2><p>{recipe.preparation_time} minutes</p></span>
        <span><h2>Temps de repos :</h2><p>{recipe.rest_time} minutes</p></span>
        <span><h2>Temps de cuisson :</h2><p>{recipe.cooking_time} minutes</p></span>
        <span className='url'><h2>Vidéo :</h2><p>{recipe.video}</p></span>
        <h3>Oeuvre liée</h3>
        <span><h2>Titre :</h2><p>{recipe.title_reference}</p></span>
        <span><h2>Apparition de la recette :</h2><p>{recipe.episode_reference}</p></span>
        <span><h2>Description :</h2><p>{recipe.description_reference}</p></span>
        <span className='url'><h2>Image :</h2><p>{recipe.image_recipe_reference}</p></span>
        {recipe.image_recipe_reference && <img src={recipe.image_recipe_reference} alt={recipe.title_reference} />}
        <span className='url'><h2>Logo de la Platforme de visionnage :</h2><p>{recipe.logo_platform_reference}</p></span>
        <span className='url'><h2>URL du logo de la platforme :</h2><p>{recipe.logo_platform_url_reference}</p></span>
        <div className='button_dashboard'>
          <button onClick={() => setIsEditing(true)}>Modifier</button>
          <button onClick={handleDeleteRecipe}>Supprimer</button>
        </div>
      </div>
    </>
  );
};

export default RecipeInfo;