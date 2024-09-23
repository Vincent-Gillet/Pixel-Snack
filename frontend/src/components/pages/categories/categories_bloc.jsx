import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../pagination';
import CategoryCard from '../../cards/category_card/category_card';

const CATEGORIES_PER_PAGE = 9;

function CategoriesBloc({ categories, setCategories }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
  }, [setCategories]);

  const indexOfLastCategory = currentPage * CATEGORIES_PER_PAGE;
  const indexOfFirstCategory = indexOfLastCategory - CATEGORIES_PER_PAGE;
  const currentCategories = Array.isArray(categories) ? categories.slice(indexOfFirstCategory, indexOfLastCategory) : [];

  const totalPages = Array.isArray(categories) ? Math.ceil(categories.length / CATEGORIES_PER_PAGE) : 0;

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="App-Recipes_Categorie_Bloc container">
      {error && <div className="error">{error}</div>}
      <div className="sub_bloc">
        <div className="container_cards">
          {currentCategories.length > 0 ? (
            currentCategories.map((category) => (
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
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePreviousPage={handlePreviousPage}
            handleNextPage={handleNextPage}
            handlePageClick={handlePageClick}
          />
        </div>
      </div>
    </div>
  );
}

export default CategoriesBloc;