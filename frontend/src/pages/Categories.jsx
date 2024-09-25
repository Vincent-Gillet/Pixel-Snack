import React, { useState } from 'react';
import Banner from '../components/banner/banner';
import CategoriesBloc from '../components/pages/categories/categories_bloc';
import Newsletter from '../components/newsletter/newsletter';
import customImage from '../assets/image/recettes/foodwarsplat.png';

function Categories() {
  const [categories, setCategories] = useState([]);

  return (
    <div className="App container">
        <Banner title="Catégories" image={customImage} />
        <CategoriesBloc categories={categories} setCategories={setCategories} />
        <Newsletter />
    </div>

  );
}

export default Categories;