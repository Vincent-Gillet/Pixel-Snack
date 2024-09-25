import React from 'react';

function Banner({ title, image }) {

  const backgroundBanner = {
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="App-banner container" style={backgroundBanner}>
      <h1>{title}</h1>
      <div className='filter'></div>
    </div>
  );
}

export default Banner;