import React from 'react';

const RecipeInfo = ({ recipe, setIsEditing, handleDeleteRecipe }) => {
  return (
    <>
      <h1>Info Recette</h1>
      <div className='form_dashboard'>
        <h2>Recette</h2>
        <span><h2>Nom :</h2><p>{recipe.title}</p></span>
        <span><h2>Image :</h2><p>{recipe.image}</p></span>
        <img src={recipe.image} alt={recipe.title} />
        <span><h2>Ingrédients :</h2>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>
                <p>
                  {ingredient.name}: {ingredient.pivot.quantity} {ingredient.pivot.unit}
                </p>
              </li>
            ))}
          </ul>
        </span>
        <span><h2>Temps total :</h2><p>{recipe.total_time}</p></span>
        <span><h2>Temps de préparation :</h2><p>{recipe.preparation_time}</p></span>
        <span><h2>Temps de repos :</h2><p>{recipe.rest_time}</p></span>
        <span><h2>Temps de cuisson :</h2><p>{recipe.cooking_time}</p></span>
        <span><h2>Vidéo :</h2><p><a href={recipe.video} target="_blank" rel="noopener noreferrer">Voir la vidéo</a></p></span>
        <h2>Oeuvre lier</h2>
        <span><h2>Titre :</h2><p>{recipe.title_reference}</p></span>
        <span><h2>Apparition de la recette:</h2><p>{recipe.episode_reference}</p></span>
        <span><h2>Description :</h2><p>{recipe.description_reference}</p></span>
        <span><h2>Image de la recette :</h2><p>{recipe.image_repice_reference}</p></span>
        <img src={recipe.image_repice_reference} alt="Image de la recette" />
        <span><h2>Logo de la Platforme de visionnage:</h2><p>{recipe.logo_platform_reference}</p></span>
        <img src={recipe.logo_platform_reference} alt="Logo de la platforme" />
        <span><h2>URL de la platforme :</h2><p>{recipe.logo_platform_url_reference}</p></span>
        <div className='button_dashboard'>
          <button onClick={() => setIsEditing(true)}>Modifier</button>
          <button onClick={handleDeleteRecipe}>Supprimer</button>
        </div>
      </div>
    </>
  );
};

export default RecipeInfo;