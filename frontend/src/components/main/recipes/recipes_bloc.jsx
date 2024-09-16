// src/components/RecipeList.jsx
import React from 'react';
import Pagination from '../../Pagination';

const RecipeList = ({ currentRecipes, currentPage, totalPages, handlePreviousPage, handleNextPage, handlePageClick }) => {
  return (
    <div className='App-RecipesBloc-Repices'>
      <div className='container_Categories'>
        {currentRecipes.map(recipe => (
          <div key={recipe.id} className='recipe-card card_recipe card'>
            <div className='card_image'>
              <img src={recipe.image} alt={recipe.title} />
            </div>
            <h3>{recipe.title}</h3>
            <div className='reviews'>
              <div className='stars'>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-regular fa-star"></i>
              </div>
              <p>340 avis</p>
            </div>
          </div>
        ))}
        
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
          handlePageClick={handlePageClick}
        />
      </div>        
    </div>
  );
};

export default RecipeList;