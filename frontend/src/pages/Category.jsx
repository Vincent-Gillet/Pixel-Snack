import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import FirstSlider from '../components/first_slider/first_slider';
import SearchBar from '../components/searchbar/searchbar';
import FilterBloc from '../components/filter_recipes/filter_recipes';
import RecipesBloc from '../components/pages/recipes/recipes_bloc';
import Newsletter from '../components/newsletter/newsletter';

function Category() {
  const { id } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/v1/categories/${id}/recipes`)
      .then(response => {
        setRecipes(response.data);
      })
      .catch(error => {
        setError('Erreur lors de la récupération des recettes');
        console.error('Error fetching recipes:', error);
      });
  }, [id]);

  return (
    <div className="App container">
      {error && <div className="error">{error}</div>}
      <FirstSlider />
      <SearchBar setRecipes={setRecipes} />
      <FilterBloc />
      <RecipesBloc recipes={recipes} setRecipes={setRecipes} categoryId={id} />
      <Newsletter />
    </div>
  );
}

export default Category;