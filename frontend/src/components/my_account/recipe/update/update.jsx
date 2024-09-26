import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import RecipeInfo from './informations_recipe';
import FormUpdate from './form_update';

function UpdateRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newIngredient, setNewIngredient] = useState({ name: '', quantity: '', unit: '' });
  const [error, setError] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [diets, setDiets] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    ingredient: '',
    total_time: '',
    preparation_time: '',
    rest_time: '',
    cooking_time: '',
    video: '',
    title_reference: '',
    episode_reference: '',
    description_reference: '',
    image_repice_reference: '',
    logo_platform_reference: '',
    logo_platform_url_reference: '',
    ingredients: [],
    diet: ''
  });

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/recipes/${id}`);
        setRecipe(response.data.recipe);
        setFormData({
          ...response.data.recipe,
          ingredients: response.data.recipe.ingredients.map(ingredient => ({
            ...ingredient,
            pivot: ingredient.pivot || { quantity: '', unit: '' }
          })),
          diet: response.data.recipe.diets.length > 0 ? response.data.recipe.diets[0].id : ''
        });
      } catch (error) {
        setError(error.message);
      }
    };
  
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
  
    fetchRecipe();
    fetchIngredients();
    fetchDiets();
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
      i === index ? { ...ingredient, [name]: name === 'quantity' ? Number(value) : String(value) } : ingredient
    );

    console.log('updatedIngredients:', updatedIngredients);
  
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
      setNewIngredient({ id: '', name: '', quantity: '', unit: '' });
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
    const selectedDiet = diets.find(diet => diet.id === parseInt(value));
    setFormData((prevFormData) => ({
      ...prevFormData,
      diets: selectedDiet ? [selectedDiet] : []
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('accessToken');
  
      const dataToSend = {
        ...formData,
        ingredients: formData.ingredients.map(ingredient => ({
          id: ingredient.id ? ingredient.id : null, 
          quantity: ingredient.quantity ? Number(ingredient.quantity) : 0, 
          unit: ingredient.unit ? String(ingredient.unit) : '' 
        })),
        diets: formData.diets.map(diet => ({ id: diet.id }))
      };
  
      console.log('dataToSend:', dataToSend);
  
      await axios.put(`http://127.0.0.1:8000/api/v1/recipes/${id}`, dataToSend, {
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
      navigate('/recipes'); 
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
        <FormUpdate
          formData={formData}
          ingredients={ingredients}
          diets={diets}
          newIngredient={newIngredient}
          handleInputChange={handleInputChange}
          handleIngredientChange={handleIngredientChange}
          handleAddIngredient={handleAddIngredient}
          handleRemoveIngredient={handleRemoveIngredient}
          handleFormSubmit={handleFormSubmit}
          setNewIngredient={setNewIngredient}
          setIsEditing={setIsEditing}
          handleDietChange={handleDietChange}
        />
      ) : (
        <RecipeInfo
          recipe={recipe}
          setIsEditing={setIsEditing}
          handleDeleteRecipe={handleDeleteRecipe}
          diet={recipe.diets} 
        />
      )}
    </div>
  );
}

export default UpdateRecipe;