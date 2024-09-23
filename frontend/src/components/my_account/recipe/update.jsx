import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UpdateRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
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
              <button type="submit">Enregistrer</button>
              <button type="button" onClick={() => setIsEditing(false)}>Annuler</button>
            </div>
          </form>          
        </>

      ) : (
        <>
          <h1>Info Recette</h1>
          <div className='form_dashboard'>
            <h2>Recette</h2>
            <span><h2>Nom :</h2><p>{recipe.title}</p></span>
            <span><h2>Image :</h2><p>{recipe.image}</p></span>
            <img src={recipe.image} alt={recipe.title} />            
            <span><h2>Ingrédients :</h2><p>{recipe.ingredient}</p></span>
            <span><h2>Temps total :</h2><p>{recipe.total_time}</p></span>
            <span><h2>Temps de préparation :</h2><p>{recipe.preparation_time}</p></span>
            <span><h2>Temps de repos :</h2><p>{recipe.rest_time}</p></span>
            <span><h2>Temps de cuisson :</h2><p>{recipe.cooking_time}</p></span>
            <span><h2>Vidéo :</h2><p><a href={recipe.video} target="_blank" rel="noopener noreferrer">Voir la vidéo</a></p></span>
            <a href={recipe.video} target="_blank" rel="noopener noreferrer">Voir la vidéo</a>
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
      )}
    </div>
  );
}

export default UpdateRecipe;