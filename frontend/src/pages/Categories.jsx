import React from 'react';
import FirstSlider from '../components/first_slider';
import CategoriesBloc from '../components/main/categories/categoriesbloc';
import Newsletter from '../components/newsletter';


function Categories() {

  return (
    <div className="App container">
        <FirstSlider />
        <CategoriesBloc />
        <Newsletter />
    </div>

  );
}

export default Categories;