import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DashboardCategoryCard from '../cards/category_card/category_dashboard/category_dashboard';
import Pagination from '../pagination';

const CATEGORIES_PER_PAGE = 9;

function DashboardCategories() {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = 'accessToken'; 
        const response = await axios.get('http://127.0.0.1:8000/api/v1/categories', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.data && Array.isArray(response.data.categories)) {
          setCategories(response.data.categories);
        } else {
          console.error('API response does not contain categories array:', response.data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const indexOfLastCategory = currentPage * CATEGORIES_PER_PAGE;
  const indexOfFirstCategory = indexOfLastCategory - CATEGORIES_PER_PAGE;
  const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);

  const totalPages = Math.ceil(categories.length / CATEGORIES_PER_PAGE);

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

  const handleView = (id) => {
    navigate(`/categories/${id}/edit`);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.delete(`http://127.0.0.1:8000/api/v1/admin/categories/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setCategories(categories.filter(category => category.id !== id));
        console.log(`Catégorie avec l'ID: ${id} supprimée`);
      } else {
        console.error('Erreur lors de la suppression de la catégorie:', response.data);
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de la catégorie:', error);
    }
  };

  return (
    <div className="App container">
      <div className="container_dashboard">
        {Array.isArray(currentCategories) && currentCategories.map(category => (
          <div key={category.id} className="category-card">
            <DashboardCategoryCard
              title={category.title}
              image={category.image}
              onView={() => handleView(category.id)}
              onDelete={() => handleDelete(category.id)}
            />
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
        handlePageClick={handlePageClick}
      />
    </div>
  );
}

export default DashboardCategories;