import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function RecipePost() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [diets, setDiets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    total_time: '',
    preparation_time: '',
    rest_time: '',
    cooking_time: '',
    video: '',
    description: '',
    title_reference: '',
    episode_reference: '',
    description_reference: '',
    image_recipe_reference: '',
    logo_platform_reference: '',
    logo_platform_url_reference: '',
    ingredients: [],
    diet: '',
    category_ids: [] 
  });
  const [newIngredient, setNewIngredient] = useState({ name: '', quantity: '', unit: '' });

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/ingredients');
        setIngredients(response.data.ingredients);
      } catch (error) {
        console.error('Erreur lors de la récupération des ingrédients:', error);
      }
    };

    const fetchDiets = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/diets');
        setDiets(response.data.diets);
      } catch (error) {
        console.error('Erreur lors de la récupération des régimes:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/categories');
        setCategories(response.data.categories);
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories:', error);
      }
    };

    fetchIngredients();
    fetchDiets();
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCategoryChange = (e) => {
    const { options } = e.target;
    const selectedCategories = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedCategories.push(options[i].value);
      }
    }
    setFormData({ ...formData, category_ids: selectedCategories });
  };

  const handleIngredientChange = (index, e) => {
    const { name, value } = e.target;
    const updatedIngredients = formData.ingredients.map((ingredient, i) => 
      i === index ? { ...ingredient, [name]: name === 'quantity' ? Number(value) : String(value) } : ingredient
    );

    setFormData({
      ...formData,
      ingredients: updatedIngredients
    });
  };

  const handleAddIngredient = () => {
    const selectedIngredient = ingredients.find(ing => ing.name === newIngredient.name);
    if (selectedIngredient) {
      setFormData({
        ...formData,
        ingredients: [...formData.ingredients, { 
          id: selectedIngredient.id, 
          name: newIngredient.name, 
          quantity: newIngredient.quantity, 
          unit: newIngredient.unit 
        }]
      });
      setNewIngredient({ name: '', quantity: '', unit: '' });
    } else {
      console.error('Ingrédient sélectionné non trouvé');
    }
  };

  const handleRemoveIngredient = (index) => {
    const updatedIngredients = formData.ingredients.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      ingredients: updatedIngredients
    });
  };

  const handleDietChange = (event) => {
    const { value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      diet: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('accessToken');
  
      const dataToSend = {
        ...formData,
        total_time: formData.total_time ? Number(formData.total_time) : null,
        preparation_time: formData.preparation_time ? Number(formData.preparation_time) : null,
        rest_time: formData.rest_time ? Number(formData.rest_time) : null,
        cooking_time: formData.cooking_time ? Number(formData.cooking_time) : null,
        ingredients: formData.ingredients.map(ingredient => ({
          id: ingredient.id ? ingredient.id : null, 
          quantity: ingredient.quantity ? Number(ingredient.quantity) : 0, 
          unit: ingredient.unit ? String(ingredient.unit) : '' 
        })),
        diets: formData.diet ? [{ id: formData.diet }] : [],
        category_ids: formData.category_ids.map(id => Number(id))
      };
  
      console.log('dataToSend:', dataToSend);
    
      await axios.post('http://127.0.0.1:8000/api/v1/recipes', dataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      navigate('/dashboard');
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'Erreur lors de l\'ajout de la recette');
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <div className="App-PostRecipe container">
      <h1>Ajouter une nouvelle recette</h1>
      {error && <p className="error">Erreur: {error}</p>}
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
            {formData.ingredients.map((ingredient, index) => (
              <li key={index}>
                <input
                  type="text"
                  name="name"
                  value={ingredient.name}
                  onChange={(e) => handleIngredientChange(index, e)}
                  placeholder="Ingredient Name"
                />
                <input
                  type="number"
                  name="quantity"
                  value={ingredient.quantity}
                  onChange={(e) => handleIngredientChange(index, e)}
                  placeholder="Quantity"
                />
                <input
                  type="text"
                  name="unit"
                  value={ingredient.unit}
                  onChange={(e) => handleIngredientChange(index, e)}
                  placeholder="Unit"
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
            <button type="button" onClick={handleAddIngredient}>Ajouter</button>
          </div>
        </div>
        <h3>Régime alimentaire</h3>
        <select
          name="diet"
          value={formData.diet}
          onChange={handleDietChange}
        >
          <option value="">Sélectionner un régime</option>
          {diets.map(diet => (
            <option key={diet.id} value={diet.id}>
              {diet.name}
            </option>
          ))}
        </select>
        <div className='dashboard_input'>
          <label>Catégories :</label>
          <select multiple={true} value={formData.category_ids} onChange={handleCategoryChange}>
            {categories.map(category => (
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
          <label>Description :</label>
          <textarea name="description" value={formData.description} onChange={handleInputChange}></textarea>
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
          <label>Description référence :</label>
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
          <label>URL du logo de la platforme :</label>
          <input type="text" name="logo_platform_url_reference" value={formData.logo_platform_url_reference} onChange={handleInputChange} />
        </div>
        <div className='button_dashboard'>
          <button type="submit">Ajouter</button>
        </div>
      </form>
    </div>
  );
}

export default RecipePost;