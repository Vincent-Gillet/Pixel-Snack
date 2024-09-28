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
        const recipeData = response.data;
        if (recipeData) {
          setRecipe(recipeData);
          setRecipeTitle(recipeData.title); 
          setRecipeImage(recipeData.image);
        } else {
          console.error('Recipe data is undefined');
        }
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

  const { ingredients, title, reviews, image, total_time, preparation_time, rest_time, cooking_time, video, description, title_reference, episode_reference, description_reference, image_recipe_reference, logo_platform_url_reference, logo_platform_reference } = recipe;

  if (!ingredients) {
    return <div>Recipe details are not available</div>;
  }

  return (
    <div className="App-RecipeBloc container">
      <div className='title'>
        <h2>{title}</h2>
        <div className='reviews'>
          <div className='stars'>
            {[...Array(5)].map((_, i) => (
              <i key={i} className={`fa-star ${i < recipe.rating ? 'fa-solid' : 'fa-regular'}`}></i>
            ))}
          </div>
          <p>{reviews} avis</p>
        </div>
      </div>
      <div className='container_ingredients'>
        <div className='image'>
          <img src={image || repice} alt={title} />
        </div>
        <div className='text'>
          <h3>Ingrédients</h3>
          <ul>
              {ingredients.map((ingredient, index) => (
                  <li key={index}>
                      <p>
                          - {ingredient.name}
                          {ingredient.quantity !== null && ingredient.quantity !== 0 && (
                              <> : {ingredient.quantity} {ingredient.unit}</>
                          )}
                      </p>
                  </li>
              ))}
          </ul>
        </div>
      </div>

      <div className='container_timer'>
        <h3>Préparation</h3>
        <div className='bloc_timer'>
          <h4><b>Total : </b>{total_time ? `${total_time} min` : '-'}</h4>
          <div className='all_timer'>
            <div className='timer'>
              <h4><b>Préparation :</b></h4>
              <p>{preparation_time ? `${preparation_time} min` : '-'}</p>
            </div>
            <div className='timer'>
              <h4><b>Repos :</b></h4>
              <p>{rest_time ? `${rest_time} min` : '-'}</p>
            </div>
            <div className='timer'>
              <h4><b>Cuisson :</b></h4>
              <p>{cooking_time ? `${cooking_time} min` : '-'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className='container_video'>
        <div className='video' onClick={handleVideoClick} style={{ cursor: 'pointer', background: `url(${image || repice})` }}>
          <img className='start' src={start} alt='Play' />
        </div>
        {showVideo && (
          <div className='video_overlay' onClick={handleOverlayClick}>
            <div className='iframe_container'>
              <iframe className='responsive_iframe' src={video} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </div>
          </div>
        )}
      </div>

      <div className='container_preparation'>
        <h3>Préparation</h3>
        <p>{description}</p>
      </div>

      <Reference 
        title_reference={title_reference}
        episode_reference={episode_reference}
        description_reference={description_reference}
        repice_reference={image_recipe_reference}
        link_platform_reference={logo_platform_url_reference}
        logo_platform_reference={logo_platform_reference}
      />
      
    </div>
  );
}

export default RecipeBloc;