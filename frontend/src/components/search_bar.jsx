import React from 'react';


function SearchBar() {


  return (

    <div className="App-SearchBar container">
      <div className="searchbar_form">
      <input type="text" placeholder="Je recherche une recette, un ingrédient, un thème,..." />
      <button className='normal_button'>Rechercher</button>
      </div>
    </div>

);
}

export default SearchBar;