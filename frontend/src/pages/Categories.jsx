import React, { useState } from 'react';
import FirstSlider from '../components/first_slider/first_slider';
import CategoriesBloc from '../components/pages/categories/categories_bloc';
import Newsletter from '../components/newsletter/newsletter';


function Categories() {
  const [categories, setCategories] = useState([]);

  return (
    <div className="App container">
        <FirstSlider />
        <CategoriesBloc categories={categories} setCategories={setCategories} />
        <Newsletter />
    </div>

  );
}

export default Categories;