import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SearchBar({ setRecipes, selectedIngredient, selectedDiet }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      if (searchQuery.trim() === '') {
        setRecipes([]);
        return;
      }

      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/recipes/search`, {
          params: { query: searchQuery, ingredient: selectedIngredient, diet: selectedDiet },
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setRecipes(response.data.recipes);
      } catch (error) {
        console.error('Erreur lors de la recherche des recettes:', error);
      }
    };

    fetchRecipes();
  }, [searchQuery, selectedIngredient, selectedDiet, setRecipes]);

  return (
    <div className="App-SearchBar container">
      <div className="searchbar_form">
        <input
          type="text"
          placeholder="Rechercher une recette"
          value={searchQuery}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}

export default SearchBar;