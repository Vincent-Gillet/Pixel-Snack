import React from 'react';
import repice1 from '../../../assets/image/recettes/ramen-ghibli-studio.webp';
import element1 from '../../../assets/element/assieteriz.svg';
import element2 from '../../../assets/element/fouetsaladier.svg';
import CategoryCard from './cards/category_card/category_card'; 

function Categories() {
  const categories = [
    { title: 'Entrée', image: repice1 },
    { title: 'Plat', image: repice1 },
    { title: 'Dessert', image: repice1 },
    { title: 'Série', image: repice1 },
    { title: 'Film', image: repice1 },
    { title: 'Anime', image: repice1 },
  ];

  return (
    <div className="App-Categories container">
      <img className='element_background plat' src={element1} alt="plat" />
      <img className='element_background salad_bowl' src={element2} alt="plat" />
      <div className='title'>
        <h2>Categories</h2>
      </div>
      <div className='container_Categories'>
        {categories.map((category, index) => (
          <CategoryCard key={index} title={category.title} image={category.image} />
        ))}
      </div>
      <button className='main_button' onClick={() => window.location.href='#'}>Voir plus</button>
    </div>
  );
}

export default Categories;