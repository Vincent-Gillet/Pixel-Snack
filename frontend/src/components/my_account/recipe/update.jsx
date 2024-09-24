import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import RecipeInfo from './informations_recipe';

function UpdateRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newIngredient, setNewIngredient] = useState({ name: '', quantity: '', unit: '' });
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    ingredient: '',
    total_time: '',
    preparation_time: '',
    rest_time: '',
    cooking_time: '',
    video: '',
    steps: [],
    reviews: '',
    rating: '',
    title_reference: '',
    episode_reference: '',
    description_reference: '',
    image_repice_reference: '',
    logo_platform_reference: '',
    logo_platform_url_reference: '',
    ingredients: []
  });

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const token = localStorage.getItem('accessToken'); // Supposons que le jeton est stocké dans le localStorage
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/recipes/${id}`);
        setRecipe(response.data.recipe);
        setFormData(response.data.recipe);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleIngredientChange = (index, e) => {
    const { name, value } = e.target;
    const updatedIngredients = formData.ingredients.map((ingredient, i) => 
      i === index ? { ...ingredient, pivot: { ...ingredient.pivot, [name]: value } } : ingredient
    );
    setFormData({
      ...formData,
      ingredients: updatedIngredients
    });
  };

  const handleAddIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, { ...newIngredient, pivot: { quantity: newIngredient.quantity, unit: newIngredient.unit } }]
    });
    setNewIngredient({ name: '', quantity: '', unit: '' });
  };

  const handleRemoveIngredient = (index) => {
    const updatedIngredients = formData.ingredients.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      ingredients: updatedIngredients
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('accessToken');
      await axios.put(`http://127.0.0.1:8000/api/v1/recipes/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setRecipe(formData);
      setIsEditing(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteRecipe = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.delete(`http://127.0.0.1:8000/api/v1/recipes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      navigate('/recipes'); // Redirige vers la page des recettes après la suppression
    } catch (error) {
      setError(error.message);
    }
  };

  if (error) {
    return <p className="error">Erreur: {error}</p>;
  }

  if (!recipe) {
    return <p>Chargement...</p>;
  }

  return (
    <div className="App-UpdateRecipe container">
      {isEditing ? (
        <>
          <h1>Modifier la recette</h1>
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
              <h3>Ingredients</h3>
              <ul>
                {formData.ingredients && formData.ingredients.map((ingredient, index) => (
                  <li key={index}>
                    <input
                      type="text"
                      name="name"
                      value={ingredient.name}
                      onChange={(e) => handleIngredientChange(index, e)}
                    />
                    <input
                      type="number"
                      name="quantity"
                      value={ingredient.pivot.quantity}
                      onChange={(e) => handleIngredientChange(index, e)}
                    />
                    <input
                      type="text"
                      name="unit"
                      value={ingredient.pivot.unit}
                      onChange={(e) => handleIngredientChange(index, e)}
                    />
                    <button type="button" onClick={() => handleRemoveIngredient(index)}>Remove</button>
                  </li>
                ))}
              </ul>
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Ingredient Name"
                  value={newIngredient.name}
                  onChange={(e) => setNewIngredient({ ...newIngredient, name: e.target.value })}
                />
                <input
                  type="number"
                  name="quantity"
                  placeholder="Quantity"
                  value={newIngredient.quantity}
                  onChange={(e) => setNewIngredient({ ...newIngredient, quantity: e.target.value })}
                />
                <input
                  type="text"
                  name="unit"
                  placeholder="Unit"
                  value={newIngredient.unit}
                  onChange={(e) => setNewIngredient({ ...newIngredient, unit: e.target.value })}
                />
                <button type="button" onClick={handleAddIngredient}>Add Ingredient</button>
              </div>
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
            <h3>Oeuvre lier</h3>
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
              <input type="text" name="image_repice_reference" value={formData.image_repice_reference} onChange={handleInputChange} />
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
        </>

      ) : (
        <RecipeInfo
          recipe={recipe}
          setIsEditing={setIsEditing}
          handleDeleteRecipe={handleDeleteRecipe}
        />
      )}
    </div>
  );
}

export default UpdateRecipe;