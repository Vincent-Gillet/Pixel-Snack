import React from 'react';

const FilterBloc = () => {
  return (
    <div className='App-RecipesBloc-Filter'>
      <form className='filters'>
        <div className='container_filters'>
          <div className='filter'>
            <label htmlFor="genre">Genre</label>
            <select name="genre" id="genre">
              <option value="action">Action</option>
              <option value="drame">Drame</option>
              <option value="horreur">Horreur</option>
            </select>
          </div>
          <div className='filter'>
            <label htmlFor="type">Type</label>
            <select name="type" id="type">
              <option value="action">Action</option>
              <option value="drame">Drame</option>
              <option value="horreur">Horreur</option>
            </select>
          </div>
          <div className='filter'>
            <label htmlFor="ingredients">Ingrédients</label>
            <select name="ingredients" id="ingredients">
              <option value="action">Action</option>
              <option value="drame">Drame</option>
              <option value="horreur">Horreur</option>
            </select>
          </div>
        </div>
        <div className='container_filters'>
          <div className='filter'>
            <label htmlFor="diet">Régime</label>
            <select name="diet" id="diet">
              <option value="action">Action</option>
              <option value="drame">Drame</option>
              <option value="horreur">Horreur</option>
            </select>
          </div>
          <div className='filter'>
            <label htmlFor="format">Format</label>
            <select name="format" id="format">
              <option value="action">Action</option>
              <option value="drame">Drame</option>
              <option value="horreur">Horreur</option>
            </select>
          </div>
          <div className='filter'>
            <label htmlFor="genre">Ingrédients</label>
            <select name="pets" id="pet-select">
              <option value="action">Action</option>
              <option value="drame">Drame</option>
              <option value="horreur">Horreur</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FilterBloc;