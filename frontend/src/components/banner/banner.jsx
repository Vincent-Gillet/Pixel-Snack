import React from 'react';

function Banner({ title, image, altText }) {

  const backgroundBanner = {
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="App-banner container" style={backgroundBanner} role="img" aria-label={altText}>
      <h1>{title}</h1>
      <div className='filter'></div>
    </div>
  );
}

export default Banner;