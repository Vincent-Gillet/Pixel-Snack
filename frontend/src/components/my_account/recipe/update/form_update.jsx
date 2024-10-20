import React from 'react';

function FormUpdate({
  formData,
  ingredients,
  diets,
  categories,
  newIngredient,
  handleInputChange,
  handleIngredientChange,
  handleAddIngredient,
  handleRemoveIngredient,
  handleFormSubmit,
  setNewIngredient,
  setIsEditing,
  handleDietChange,
  handleCategoryChange
}) {

  if (!formData) {
    return <div>Chargement...</div>;
  }

  return (
    <form className='form_dashboard' onSubmit={handleFormSubmit}>
      <div className='dashboard_input'>
        <label htmlFor="title">Titre :</label>
        <input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} aria-label="Titre de la recette" />
      </div>
      <div className='dashboard_input'>
        <label htmlFor="image">URL de l'image principale :</label>
        <input type="text" id="image" name="image" value={formData.image} onChange={handleInputChange} aria-label="URL de l'image principale" />
      </div>
      <div className='dashboard_input'>
        <h3>Ingrédients</h3>
        <ul>
          {formData.ingredients && formData.ingredients.map((ingredient, index) => (
            <li key={index}>
              <select
                id={`ingredient-${index}`}
                name="name"
                value={ingredient.name}
                onChange={(e) => handleIngredientChange(index, e)}
                aria-label={`Sélectionnez l'ingrédient ${index + 1}`}
              >
                {ingredients.map((ing) => (
                  <option key={ing.id} value={ing.name}>
                    {ing.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                id={`quantity-${index}`}
                name="quantity"
                value={ingredient.quantity}
                onChange={(e) => handleIngredientChange(index, e)}
                aria-label={`Quantité de l'ingrédient ${index + 1}`}
              />
              <input
                type="text"
                id={`unit-${index}`}
                name="unit"
                value={ingredient.unit}
                onChange={(e) => handleIngredientChange(index, e)}
                aria-label={`Unité de l'ingrédient ${index + 1}`}
              />
              <button type="button" onClick={() => handleRemoveIngredient(index)} aria-label={`Supprimer l'ingrédient ${index + 1}`}>
                Supprimer
              </button>
            </li>
          ))}
        </ul>
        <div className='add_data'>
          <div>
            <label htmlFor="new-ingredient-name">Nouvel ingrédient :</label>
            <select
              id="new-ingredient-name"
              name="name"
              value={newIngredient.name}
              onChange={(e) => setNewIngredient({ ...newIngredient, name: e.target.value })}
              aria-label="Sélectionnez un nouvel ingrédient"
            >
              <option value="">Sélectionner</option>
              {ingredients.map((ing) => (
                <option key={ing.id} value={ing.name}>
                  {ing.name}
                </option>
              ))}
            </select>            
          </div>
          <div>
            <label htmlFor="new-ingredient-quantity">Quantité :</label>
            <input
              type="number"
              id="new-ingredient-quantity"
              name="quantity"
              placeholder="Quantité"
              value={newIngredient.quantity}
              onChange={(e) => setNewIngredient({ ...newIngredient, quantity: e.target.value })}
              aria-label="Quantité du nouvel ingrédient"
            />
          </div>
          <div>
            <label htmlFor="new-ingredient-unit">Unité :</label>
            <input
              type="text"
              id="new-ingredient-unit"
              name="unit"
              placeholder="Unité"
              value={newIngredient.unit}
              onChange={(e) => setNewIngredient({ ...newIngredient, unit: e.target.value })}
              aria-label="Unité du nouvel ingrédient"
            />
          </div>
          <button type="button" onClick={handleAddIngredient} aria-label="Ajouter un nouvel ingrédient">Ajouter</button>
        </div>
      </div>
      <div className='dashboard_input'>
        <label htmlFor="diet">Régime :</label>
        <select id="diet" name="diet" value={formData.diets.length > 0 ? formData.diets[0].id : ''} onChange={handleDietChange} aria-label="Sélectionnez un régime">
          <option value="">Aucun</option>
          {diets.map((diet) => (
            <option key={diet.id} value={diet.id}>
              {diet.name}
            </option>
          ))}
        </select>
      </div>
      <div className='dashboard_input'>
        <label htmlFor="categories">Catégories :</label>
        <select id="categories" multiple name="categories" value={formData.categories.map(cat => cat.id)} onChange={handleCategoryChange} aria-label="Sélectionnez des catégories">
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </select>
      </div>
      <div className='dashboard_input'>
        <label htmlFor="total_time">Temps total :</label>
        <input type="text" id="total_time" name="total_time" value={formData.total_time} onChange={handleInputChange} aria-label="Temps total de la recette" />
      </div>
      <div className='dashboard_input'>
        <label htmlFor="preparation_time">Temps de préparation :</label>
        <input type="text" id="preparation_time" name="preparation_time" value={formData.preparation_time} onChange={handleInputChange} aria-label="Temps de préparation de la recette" />
      </div>
      <div className='dashboard_input'>
        <label htmlFor="rest_time">Temps de repos :</label>
        <input type="text" id="rest_time" name="rest_time" value={formData.rest_time} onChange={handleInputChange} aria-label="Temps de repos de la recette" />
      </div>
      <div className='dashboard_input'>
        <label htmlFor="cooking_time">Temps de cuisson :</label>
        <input type="text" id="cooking_time" name="cooking_time" value={formData.cooking_time} onChange={handleInputChange} aria-label="Temps de cuisson de la recette" />
      </div>
      <div className='dashboard_input'>
        <label htmlFor="video">URL de la vidéo :</label>
        <input type="text" id="video" name="video" value={formData.video} onChange={handleInputChange} aria-label="URL de la vidéo de la recette" />
      </div>
      <h3>Oeuvre liée</h3>
      <div className='dashboard_input'>
        <label htmlFor="title_reference">Titre :</label>
        <input type="text" id="title_reference" name="title_reference" value={formData.title_reference} onChange={handleInputChange} aria-label="Titre de l'oeuvre liée" />
      </div>
      <div className='dashboard_input'>
        <label htmlFor="episode_reference">Apparition de la recette :</label>
        <input type="text" id="episode_reference" name="episode_reference" value={formData.episode_reference} onChange={handleInputChange} aria-label="Épisode de l'apparition de la recette" />
      </div>
      <div className='dashboard_input'>
        <label htmlFor="description_reference">Description :</label>
        <textarea id="description_reference" name="description_reference" value={formData.description_reference} onChange={handleInputChange} aria-label="Description de l'oeuvre liée"></textarea>
      </div>
      <div className='dashboard_input'>
        <label htmlFor="image_recipe_reference">URL de l'Image :</label>
        <input type="text" id="image_recipe_reference" name="image_recipe_reference" value={formData.image_recipe_reference} onChange={handleInputChange} aria-label="URL de l'image de l'oeuvre liée" />
      </div>
      <div className='dashboard_input'>
        <label htmlFor="logo_platform_reference">Logo de la Platforme de visionnage :</label>
        <input type="text" id="logo_platform_reference" name="logo_platform_reference" value={formData.logo_platform_reference} onChange={handleInputChange} aria-label="Logo de la plateforme de visionnage" />
      </div>
      <div className='dashboard_input'>
        <label htmlFor="logo_platform_url_reference">Logo de la platforme :</label>
        <input type="text" id="logo_platform_url_reference" name="logo_platform_url_reference" value={formData.logo_platform_url_reference} onChange={handleInputChange} aria-label="URL du logo de la plateforme de visionnage" />
      </div>
      <div className='button_dashboard'>
        <button type="submit" aria-label="Enregistrer les modifications">Enregistrer</button>
        <button type="button" onClick={() => setIsEditing(false)} aria-label="Annuler les modifications">Annuler</button>
      </div>
    </form>
  );
}

export default FormUpdate;