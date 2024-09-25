import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FilterBloc = ({ setRecipes }) => {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState('');
  const [diets, setDiets] = useState([]);
  const [selectedDiet, setSelectedDiet] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

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

    fetchIngredients();
    fetchDiets();
  }, []);

  const fetchRecipes = async (ingredient, diet, query) => {
    try {
      const params = {};
      if (ingredient) params.ingredient = ingredient;
      if (diet) params.diet = diet;
      if (query) params.title = query;

      const response = await axios.get('http://127.0.0.1:8000/api/v1/recipes/filter/recipes', { params });
      setRecipes(response.data.recipes);
    } catch (error) {
      console.error('Erreur lors de la récupération des recettes:', error);
    }
  };

  const handleIngredientChange = (e) => {
    const ingredient = e.target.value;
    setSelectedIngredient(ingredient === '' ? null : ingredient);
    fetchRecipes(ingredient === '' ? null : ingredient, selectedDiet, searchQuery);
  };

  const handleDietChange = (e) => {
    const diet = e.target.value;
    setSelectedDiet(diet === '' ? null : diet);
    fetchRecipes(selectedIngredient, diet === '' ? null : diet, searchQuery);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    fetchRecipes(selectedIngredient, selectedDiet, query);
  };

  return (
    <div className='App-RecipesBloc-Filter'>
      <form className='filters'>
        <div className='container_filters'>
          <div className='filter'>
            <label htmlFor="search">Recherche</label>
            <input
              type="text"
              id="search"
              placeholder="Rechercher une recette"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
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
          <div className='filter'>
            <label htmlFor="diets">Régimes</label>
            <select name="diets" id="diets" onChange={handleDietChange}>
              <option value="">Tous les régimes</option>
              {diets.map((diet) => (
                <option key={diet.id} value={diet.name}>
                  {diet.name}
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