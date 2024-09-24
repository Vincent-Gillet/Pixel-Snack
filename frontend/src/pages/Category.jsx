import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import FirstSlider from '../components/first_slider/first_slider';
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
        const categoryResponse = await axios.get(`http://127.0.0.1:8000/api/v1/categories/${id}`);
        setCategory(categoryResponse.data.category);

        const recipesResponse = await axios.get(`http://127.0.0.1:8000/api/v1/categories/${id}/recipes`);
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

  return (
    <div className="App container">
      {error && <div className="error">{error}</div>}
      <FirstSlider />
      {category && <h1 className='category_title'>{category.title}</h1>}
      <RecipesBloc recipes={recipes} setRecipes={setRecipes} categoryId={id} />
      <Newsletter />
    </div>
  );
}

export default Category;