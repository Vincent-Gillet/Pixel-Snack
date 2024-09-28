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
      <h2>Recette</h2>
      <div className='dashboard_input'>
        <label>Titre :</label>
        <input type="text" name="title" value={formData.title} onChange={handleInputChange} />
      </div>
      <div className='dashboard_input'>
        <label>URL de l'image prinicpale :</label>
        <input type="text" name="image" value={formData.image} onChange={handleInputChange} />
      </div>
      <div className='dashboard_input'>
        <h3>Ingrédients</h3>
        <ul>
          {formData.ingredients && formData.ingredients.map((ingredient, index) => (
            <li key={index}>
              <select
                name="name"
                value={ingredient.name}
                onChange={(e) => handleIngredientChange(index, e)}
              >
                {ingredients.map((ing) => (
                  <option key={ing.id} value={ing.name}>
                    {ing.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                name="quantity"
                value={ingredient.quantity}
                onChange={(e) => handleIngredientChange(index, e)}
              />
              <input
                type="text"
                name="unit"
                value={ingredient.unit}
                onChange={(e) => handleIngredientChange(index, e)}
              />
              <button type="button" onClick={() => handleRemoveIngredient(index)}>Supprimer</button>
            </li>
          ))}
        </ul>
        <div className='add_data'>
          <select
            name="name"
            value={newIngredient.name}
            onChange={(e) => setNewIngredient({ ...newIngredient, name: e.target.value })}
          >
            <option value="">Sélectionner</option>
            {ingredients.map((ing) => (
              <option key={ing.id} value={ing.name}>
                {ing.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            name="quantity"
            placeholder="Quantité"
            value={newIngredient.quantity}
            onChange={(e) => setNewIngredient({ ...newIngredient, quantity: e.target.value })}
          />
          <input
            type="text"
            name="unit"
            placeholder="Unité"
            value={newIngredient.unit}
            onChange={(e) => setNewIngredient({ ...newIngredient, unit: e.target.value })}
          />
          <button type="button" onClick={handleAddIngredient}>Ajouter</button>
        </div>
      </div>
      <div className='dashboard_input'>
        <label>Régime :</label>
        <select name="diet" value={formData.diets.length > 0 ? formData.diets[0].id : ''} onChange={handleDietChange}>
          <option value="">Aucun</option>
          {diets.map((diet) => (
            <option key={diet.id} value={diet.id}>
              {diet.name}
            </option>
          ))}
        </select>
      </div>
      <div className='dashboard_input'>
        <label>Catégories :</label>
        <select multiple name="categories" value={formData.categories.map(cat => cat.id)} onChange={handleCategoryChange}>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </select>
      </div>
      <div className='dashboard_input'>
        <label>Temps total :</label>
        <input type="text" name="total_time" value={formData.total_time} onChange={handleInputChange} />
      </div>
      <div className='dashboard_input'>
        <label>Temps de préparation :</label>
        <input type="text" name="preparation_time" value={formData.preparation_time} onChange={handleInputChange} />
      </div>
      <div className='dashboard_input'>
        <label>Temps de repos :</label>
        <input type="text" name="rest_time" value={formData.rest_time} onChange={handleInputChange} />
      </div>
      <div className='dashboard_input'>
        <label>Temps de cuisson :</label>
        <input type="text" name="cooking_time" value={formData.cooking_time} onChange={handleInputChange} />
      </div>
      <div className='dashboard_input'>
        <label>URL de la vidéo :</label>
        <input type="text" name="video" value={formData.video} onChange={handleInputChange} />
      </div>
      <h3>Oeuvre liée</h3>
      <div className='dashboard_input'>
        <label>Titre :</label>
        <input type="text" name="title_reference" value={formData.title_reference} onChange={handleInputChange} />
      </div>
      <div className='dashboard_input'>
        <label>Apparition de la recette :</label>
        <input type="text" name="episode_reference" value={formData.episode_reference} onChange={handleInputChange} />
      </div>
      <div className='dashboard_input'>
        <label>Description :</label>
        <textarea name="description_reference" value={formData.description_reference} onChange={handleInputChange}></textarea>
      </div>
      <div className='dashboard_input'>
        <label>URL de l'Image :</label>
        <input type="text" name="image_recipe_reference" value={formData.image_recipe_reference} onChange={handleInputChange} />
      </div>
      <div className='dashboard_input'>
        <label>Logo de la Platforme de visionnage :</label>
        <input type="text" name="logo_platform_reference" value={formData.logo_platform_reference} onChange={handleInputChange} />
      </div>
      <div className='dashboard_input'>
        <label>Logo de la platforme :</label>
        <input type="text" name="logo_platform_url_reference" value={formData.logo_platform_url_reference} onChange={handleInputChange} />
      </div>
      <div className='button_dashboard'>
        <button type="submit">Enregistrer</button>
        <button type="button" onClick={() => setIsEditing(false)}>Annuler</button>
      </div>
    </form>
  );
}

export default FormUpdate;