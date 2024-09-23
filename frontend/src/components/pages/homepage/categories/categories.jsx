import React, { useState, useEffect } from 'react';
import axios from 'axios';
import element1 from '../../../../assets/element/assieteriz.svg';
import element2 from '../../../../assets/element/fouetsaladier.svg';
import CategoryCard from '../../../cards/category_card/category_card'; 
import { Link } from 'react-router-dom';

function CategoriesBloc() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const url = 'http://127.0.0.1:8000/api/v1/categories';

        const response = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setCategories(response.data.categories);
      } catch (error) {
        setError('Erreur lors de la récupération des catégories');
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="App-Categories container">
      <img className='element_background plat' src={element1} alt="plat" />
      <img className='element_background salad_bowl' src={element2} alt="plat" />
      <div className='title'>
        <h2>Categories</h2>
      </div>
      {error && <div className="error">{error}</div>}
      <div className="App-Categories-Categories">
        <div className="container_Categories">
          {categories.length > 0 ? (
            categories.slice(0, 6).map((category) => (
              <CategoryCard
                key={category.id}
                id={category.id}
                title={category.title}
                image={category.image}
              />
            ))
          ) : (
            <div>Aucune catégorie trouvée</div>
          )}
        </div>
      </div>
      <Link to="/categories" className='main_button'>Voir plus</Link>
    </div>
  );
}

export default CategoriesBloc;