import React, {useState} from 'react';
import SearchBar from '../../search_bar';
import recipes from '../../data/recipes'; 
import Pagination from '../../Pagination';
import FilterBloc from './filter_recipes/filter_recipes';

const RECIPES_PER_PAGE = 9;

function RecipesBloc() {

    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastRecipe = currentPage * RECIPES_PER_PAGE;
    const indexOfFirstRecipe = indexOfLastRecipe - RECIPES_PER_PAGE;
    const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  
    const totalPages = Math.ceil(recipes.length / RECIPES_PER_PAGE);
  
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
    <div className="App-RecipesBloc container">
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
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-regular fa-star"></i>
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


    </div>
  );
}

export default RecipesBloc;