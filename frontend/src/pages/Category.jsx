import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Banner from '../components/banner/banner';
import RecipesBloc from '../components/pages/recipes/recipes_bloc';
import Newsletter from '../components/newsletter/newsletter';

function Category() {
  const { id } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [category, setCategory] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryAndRecipes = async () => {
      try {
        const categoryResponse = await axios.get(`${import.meta.env.VITE_API_URL}/categories/${id}`);
        setCategory(categoryResponse.data.category);

        const recipesResponse = await axios.get(`${import.meta.env.VITE_API_URL}/categories/${id}/recipes`);
        setRecipes(recipesResponse.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setError('Catégorie non trouvée');
        } else {
          setError('Erreur lors de la récupération des données');
        }
        console.error('Error fetching data:', error);
      }
    };

    fetchCategoryAndRecipes();
  }, [id]);

  const categoryImage = category?.image;

  return (
    <div className="App container">
      {error && <div className="error">{error}</div>}
      <Banner title={category?.title || 'Catégorie'} image={categoryImage} />
      <RecipesBloc recipes={recipes} setRecipes={setRecipes} categoryId={id} />
      <Newsletter />
    </div>
  );
}

export default Category;