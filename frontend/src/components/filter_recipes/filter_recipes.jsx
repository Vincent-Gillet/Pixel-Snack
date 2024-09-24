import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FilterBloc = ({ setRecipes }) => {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState('');

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/ingredients');
        setIngredients(response.data.ingredients);
      } catch (error) {
        console.error('Erreur lors de la récupération des ingrédients:', error);
      }
    };

    fetchIngredients();
  }, []);

  const handleIngredientChange = async (e) => {
    const ingredient = e.target.value;
    setSelectedIngredient(ingredient);

    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/v1/recipes/filter/ingredient?ingredient=${ingredient}`);
      setRecipes(response.data.recipes);
    } catch (error) {
      console.error('Erreur lors de la récupération des recettes:', error);
    }
  };

  return (
    <div className='App-RecipesBloc-Filter'>
      <form className='filters'>
        <div className='container_filters'>
          <div className='filter'>
            <label htmlFor="ingredients">Ingrédients</label>
            <select name="ingredients" id="ingredients" onChange={handleIngredientChange}>
              <option value="">Tous les ingrédients</option>
              {ingredients.map((ingredient) => (
                <option key={ingredient.id} value={ingredient.name}>
                  {ingredient.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FilterBloc;