import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import RecipeInfo from './informations_recipe';
import FormUpdate from './form_update';
import Banner from '../../../banner/banner';
import customImage from '../../../../assets/image/recettes/foodwarsterrinedelégumes.png';

function UpdateRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [diets, setDiets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    ingredients: [],
    diets: [],
    categories: [],
    total_time: '',
    preparation_time: '',
    rest_time: '',
    cooking_time: '',
    video: '',
    title_reference: '',
    episode_reference: '',
    description_reference: '',
    image_recipe_reference: '',
    logo_platform_reference: '',
    logo_platform_url_reference: ''
  });
  const [newIngredient, setNewIngredient] = useState({ name: '', quantity: '', unit: '' });

  const fetchRecipe = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/recipes/${id}`);
      console.log('Recipe data:', response.data); 
      setRecipe(response.data);
      setFormData({
        title: response.data.title,
        image: response.data.image,
        ingredients: response.data.ingredients,
        diets: response.data.diets,
        categories: response.data.categories,
        total_time: response.data.total_time,
        preparation_time: response.data.preparation_time,
        rest_time: response.data.rest_time,
        cooking_time: response.data.cooking_time,
        video: response.data.video,
        title_reference: response.data.title_reference,
        episode_reference: response.data.episode_reference,
        description_reference: response.data.description_reference,
        image_recipe_reference: response.data.image_recipe_reference,
        logo_platform_reference: response.data.logo_platform_reference,
        logo_platform_url_reference: response.data.logo_platform_url_reference
      });
    } catch (error) {
      console.error('Erreur lors de la récupération de la recette:', error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchRecipe();
    const fetchIngredients = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/ingredients`);
        console.log('Ingredients data:', response.data.ingredients);
        setIngredients(response.data.ingredients);
      } catch (error) {
        console.error('Erreur lors de la récupération des ingrédients:', error);
      }
    };

    const fetchDiets = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/diets`);
        console.log('Diets data:', response.data.diets);
        setDiets(response.data.diets);
      } catch (error) {
        console.error('Erreur lors de la récupération des régimes:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/categories`);
        console.log('Categories data:', response.data.categories);
        setCategories(response.data.categories);
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories:', error);
      }
    };

    fetchIngredients();
    fetchDiets();
    fetchCategories();
  }, [id]);

  const handleDeleteRecipe = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.delete(`${import.meta.env.VITE_API_URL}/recipes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      navigate('/recipes'); 
    } catch (error) {
      setError(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleIngredientChange = (index, e) => {
    const { name, value } = e.target;
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients[index] = { ...updatedIngredients[index], [name]: value };
    setFormData({ ...formData, ingredients: updatedIngredients });
  };

  const handleAddIngredient = () => {
    setFormData({ ...formData, ingredients: [...formData.ingredients, newIngredient] });
    setNewIngredient({ name: '', quantity: '', unit: '' });
  };

  const handleRemoveIngredient = (index) => {
    const updatedIngredients = formData.ingredients.filter((_, i) => i !== index);
    setFormData({ ...formData, ingredients: updatedIngredients });
  };

  const handleDietChange = (e) => {
    const selectedDiet = diets.find(diet => diet.id === parseInt(e.target.value));
    setFormData({ ...formData, diets: selectedDiet ? [selectedDiet] : [] });
  };

  const handleCategoryChange = (e) => {
    const selectedCategories = Array.from(e.target.selectedOptions, option => {
      return categories.find(category => category.id === parseInt(option.value));
    });
    setFormData({ ...formData, categories: selectedCategories });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Formulaire soumis:', formData);
  
      const categoryIds = formData.categories.map(category => category.id);
      const dietIds = formData.diets.map(diet => diet.id);
  
      console.log('Category IDs:', categoryIds);
      console.log('Diet IDs:', dietIds);
  
      const ingredientsData = formData.ingredients.map(ingredient => ({
        id: ingredient.id,
        quantity: ingredient.quantity,
        unit: ingredient.unit,
      }));
  
      console.log('Ingredients Data:', ingredientsData);
  
      const dataToSend = {
        title: formData.title,
        description: formData.description,
        image: formData.image,
        video: formData.video,
        category_ids: categoryIds,
        total_time: formData.total_time ? Number(formData.total_time) : null,
        preparation_time: formData.preparation_time ? Number(formData.preparation_time) : null,
        rest_time: formData.rest_time ? Number(formData.rest_time) : null,
        cooking_time: formData.cooking_time ? Number(formData.cooking_time) : null,
        title_reference: formData.title_reference,
        episode_reference: formData.episode_reference,
        description_reference: formData.description_reference,
        logo_platform_reference: formData.logo_platform_reference,
        logo_platform_url_reference: formData.logo_platform_url_reference,
        image_recipe_reference: formData.image_recipe_reference,
        ingredients: ingredientsData,
        diets: dietIds.map(id => ({ id })),
      };
  
      console.log('ID', id);

      console.log('Data to Send:', dataToSend);
  
      const token = localStorage.getItem('accessToken');
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/recipes/${id}`, dataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      console.log('Response data:', response.data);
      setIsEditing(false);
      fetchRecipe(); 
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la recette:', error);
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
          <Banner title="Modifier la recette" image={customImage} />
          <FormUpdate
            formData={formData}
            ingredients={ingredients}
            diets={diets}
            categories={categories}
            newIngredient={newIngredient}
            handleInputChange={handleInputChange}
            handleIngredientChange={handleIngredientChange}
            handleAddIngredient={handleAddIngredient}
            handleRemoveIngredient={handleRemoveIngredient}
            handleFormSubmit={handleFormSubmit}
            setNewIngredient={setNewIngredient}
            setIsEditing={setIsEditing}
            handleDietChange={handleDietChange}
            handleCategoryChange={handleCategoryChange}
          />
        </>
      ) : (
        <>
          <Banner title="Recette" image={customImage} />
          <RecipeInfo
            recipe={recipe}
            setIsEditing={setIsEditing}
            handleDeleteRecipe={handleDeleteRecipe}
            diet={diets}
            categories={categories}
          />
        </>
      )}
    </div>
  );
}

export default UpdateRecipe;