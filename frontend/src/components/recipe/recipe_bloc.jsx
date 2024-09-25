import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import repice from '../../assets/image/recettes/20969525.webp';
import start from '../../assets/element/PlayButtonCircled.svg';
import Reference from './reference';

function RecipeBloc({ setRecipeTitle, setRecipeImage }) {
  const { id } = useParams(); 
  const [showVideo, setShowVideo] = useState(false);
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/recipes/${id}`);
        setRecipe(response.data);
        setRecipeTitle(response.data.recipe.title); 
        setRecipeImage(response.data.recipe.image || repice); // Utilisez une image par défaut si l'image est manquante
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    fetchRecipe();
  }, [id, setRecipeTitle, setRecipeImage]);

  const handleVideoClick = () => {
    setShowVideo(true);
  };

  const handleOverlayClick = (e) => {
    if (e.target.className === 'video_overlay') {
      setShowVideo(false);
    }
  };

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App-RecipeBloc container">
      <div className='title'>
        <h2>{recipe.recipe.title}</h2>
        <div className='reviews'>
          <div className='stars'>
            {[...Array(5)].map((_, i) => (
              <i key={i} className={`fa-star ${i < recipe.rating ? 'fa-solid' : 'fa-regular'}`}></i>
            ))}
          </div>
          <p>{recipe.recipe.reviews} avis</p>
        </div>
      </div>
      <div className='container_ingredients'>
        <div className='image'>
          <img src={recipe.recipe.image || repice} alt={recipe.recipe.title} />
        </div>
        <div className='text'>
          <h3>Ingrédients</h3>
          <ul>
            {recipe.recipe.ingredients.map((ingredient, index) => (
              <li key={index}>
                <p>
                  - {ingredient.name} : {ingredient.quantity} {ingredient.unit}                  
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className='container_timer'>
        <h3>Préparation</h3>
        <div className='bloc_timer'>
          <h4><b>Total : </b>{recipe.recipe.total_time ? `${recipe.recipe.total_time} min` : '-'}</h4>
          <div className='all_timer'>
            <div className='timer'>
              <h4><b>Préparation :</b></h4>
              <p>{recipe.recipe.preparation_time ? `${recipe.recipe.preparation_time} min` : '-'}</p>
            </div>
            <div className='timer'>
              <h4><b>Repos :</b></h4>
              <p>{recipe.recipe.rest_time ? `${recipe.recipe.rest_time} min` : '-'}</p>
            </div>
            <div className='timer'>
              <h4><b>Cuisson :</b></h4>
              <p>{recipe.recipe.cooking_time ? `${recipe.recipe.cooking_time} min` : '-'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className='container_video'>
        <div className='video' onClick={handleVideoClick} style={{ cursor: 'pointer', background: `url(${recipe.recipe.image || repice})` }}>
          <img className='start' src={start} alt='Play' />
        </div>
        {showVideo && (
          <div className='video_overlay' onClick={handleOverlayClick}>
            <div className='iframe_container'>
              <iframe className='responsive_iframe' src={recipe.recipe.video} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </div>
          </div>
        )}
      </div>

      <div className='container_preparation'>
        <h3>Étapes</h3>
        <p>{recipe.recipe.description}</p>
      </div>

      <Reference 
        title_reference={recipe.recipe.title_reference}
        episode_reference={recipe.recipe.episode_reference}
        description_reference={recipe.recipe.description_reference}
        repice_reference={recipe.recipe.image_repice_reference}
        link_platform_reference={recipe.recipe.logo_platform_url_reference}
        logo_platform_reference={recipe.recipe.logo_platform_reference}
      />
      
    </div>
  );
}

export default RecipeBloc;