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
    steps: [],
    reviews: '',
    rating: '',
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
        const token = localStorage.getItem('accessToken'); // Supposons que le jeton est stocké dans le localStorage
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/recipes/${id}`);
        setRecipe(response.data.recipe);
        setFormData(response.data.recipe);
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
      i === index ? { ...ingredient, [name]: value } : ingredient
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

  const diet = recipe.diets && recipe.diets.length > 0 ? recipe.diets[0].name : 'Aucun régime spécifié';

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
          diet={diet}  
        />
      ) : (
        <RecipeInfo
          recipe={recipe}
          setIsEditing={setIsEditing}
          handleDeleteRecipe={handleDeleteRecipe}
          diet={diet}
        />
      )}
    </div>
  );
}

export default UpdateRecipe;