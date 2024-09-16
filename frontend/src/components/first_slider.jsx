import React from 'react';
import backgroundFood from '../assets/image/recettes/foodwars.jpeg';
import backgroundFood2 from '../assets/image/recettes/foodwarsterrinedelégumes.png';
import backgroundFood3 from '../assets/image/recettes/foodwarsplat.png';


import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

import 'swiper/css/pagination';

import { Pagination, Autoplay, Navigation} from 'swiper/modules';

import 'swiper/css/navigation';





function FirstSlider() {

  const backgroundLastRecipes = {
    background: `url(${backgroundFood})`,
  };
  const backgroundLastRecipes2 = {
    background: `url(${backgroundFood2})`,
  };
  const backgroundLastRecipes3 = {
    background: `url(${backgroundFood3})`,
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
        <SwiperSlide className='slide'>
          <div className='filter'>
          </div>            
          <div class="background" style={backgroundLastRecipes}></div>
          <div className='title'>
            <h2>Oeuf pané 1</h2>
            <button className='main_button' onClick={() => window.location.href='#'}>Découvrir</button>
          </div>
        </SwiperSlide>
        <SwiperSlide className='slide'>
          <div className='filter'>
          </div>            
          <div class="background" style={backgroundLastRecipes2}></div>
          <div className='title'>
            <h2>Oeuf pané 1</h2>
            <button className='main_button' onClick={() => window.location.href='#'}>Découvrir</button>
          </div>
        </SwiperSlide>
        <SwiperSlide className='slide'>
          <div className='filter'>
          </div>            
          <div class="background" style={backgroundLastRecipes3}></div>
          <div className='title'>
            <h2>Oeuf pané 1</h2>
            <button className='main_button' onClick={() => window.location.href='#'}>Découvrir</button>
          </div>
        </SwiperSlide>
      </Swiper>
      {/* <div className='title'>
        <h2>Oeuf pané</h2>
        <h3>Étape 1</h3>
        <p>Lorem ipsum dolor sit amet, ullamco laboris nisi ut aliquip ex ea...</p>
        <button className='main_button' onClick={() => window.location.href='#'}>Lire la suite</button>
      </div> */}


    </div>
  );
}

export default FirstSlider;