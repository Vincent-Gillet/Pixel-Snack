import React, { useState } from 'react';
import axios from 'axios';

function SearchBar({ setRecipes }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get(`http://127.0.0.1:8000/api/v1/recipes/search`, {
        params: { query: searchQuery },
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setRecipes(response.data.recipes);
    } catch (error) {
      console.error('Erreur lors de la recherche des recettes:', error);
    }
  };

  return (
    <div className="App-SearchBar container">
      <div className="searchbar_form">
        <input
          type="text"
          placeholder="Je recherche une recette, un ingrédient, un thème,..."
          value={searchQuery}
          onChange={handleInputChange}
        />
        <button className='normal_button' onClick={handleSearch}>Rechercher</button>
      </div>
    </div>
  );
}

export default SearchBar;