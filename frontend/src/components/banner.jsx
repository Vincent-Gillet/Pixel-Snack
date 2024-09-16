import React from 'react';
import background from '../assets/image/recettes/ramen-ghibli-studio.webp';

function Banner() {

  const backgroundBanner = {
    background: `url(${background})`,
  };

  return (
    <div className="App-banner container" style={backgroundBanner}>
      <h1>Banner</h1>
      <div className='filter'></div>
    </div>
  );
}

export default Banner;