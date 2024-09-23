import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function FirstSlider() {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/recipes');
        setRecipes(response.data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  const handleDiscoverClick = (id) => {
    navigate(`/recipes/${id}`);
  };

  return (
    <div className="App-first_slider container">
      <Swiper 
        pagination={true} 
        modules={[Pagination, Autoplay, Navigation]}         
        autoplay={{ delay: 3000, disableOnInteraction: false }}         
        loop={true}
        navigation={true}
        className="mySwiper">
        {recipes.slice(0, 3).map((recipe) => (
          <SwiperSlide key={recipe.id} className='slide'>
            <div className='filter'></div> 
            <div className="background" style={{ backgroundImage: `url(${recipe.image})` }}></div>
            <div className="title">
              <h2>{recipe.title.length > 30 ? `${recipe.title.slice(0, 30)}...` : recipe.title}</h2>
              <button onClick={() => handleDiscoverClick(recipe.id)} className='main_button'>Découvrir</button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default FirstSlider;