import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function RecipePost() {
  const navigate = useNavigate();
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
    logo_platform_url_reference: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('accessToken');
      await axios.post('http://127.0.0.1:8000/api/v1/recipes', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
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
          <label>les Ingredients :</label>
          <textarea name="ingredient" value={formData.ingredient} onChange={handleInputChange}></textarea>
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
          <button type="submit">Ajouter</button>
        </div>
      </form>
    </div>
  );
}

export default RecipePost;