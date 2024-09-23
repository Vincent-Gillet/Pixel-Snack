import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function BestRecipe() {
  const [bestRecipe, setBestRecipe] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/v1/recipes')
      .then(response => {
        if (response.data && response.data.length > 0) {
          setBestRecipe(response.data[0]); 
        }
      })
      .catch(error => console.error('Error fetching best recipe:', error));
  }, []);

  const handleReadMore = () => {
    if (bestRecipe && bestRecipe.id) {
      window.scrollTo(0, 0); 
      navigate(`/recipes/${bestRecipe.id}`);
    }
  };

  if (!bestRecipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App-bestRecipe container">
        <h2>Notre coup de coeur</h2>
        <div className='bestRecipe'>
            <div className='text_bestRecipe'>
                <h3>{bestRecipe.title}</h3>
                <p>{bestRecipe.description}</p>
                <button className='main_button' onClick={handleReadMore}>
                    Lire la suite
                </button>
            </div>
            {bestRecipe.image && (
              <div className='image_recipe'>
                  <img src={bestRecipe.image} alt={bestRecipe.title} />
              </div>
            )}
        </div>
    </div>
  );
}

export default BestRecipe;