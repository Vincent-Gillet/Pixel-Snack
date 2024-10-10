import React from 'react';
import PropTypes from 'prop-types';
import placeholderImage from '../../../assets/logo/placeholder.png';

const RecipeCard = ({ title, image, reviews, reviewCount, link }) => {
  
  const imageUrl = (!image || image === "" || image === "image_url") ? placeholderImage : image;

  return (
    <a href={link} className='card_recipe card'>
      <div className='card_image'>
        <img src={imageUrl} alt={title} />
      </div>
      <div className='card_content'>
        <h3>{title}</h3>
        <div className='reviews'>
          <div className='stars'>
            {Array.from({ length: reviews }, (_, i) => (
              <i key={i} className="fa-solid fa-star"></i>
            ))}
            {Array.from({ length: 5 - reviews }, (_, i) => (
              <i key={i} className="fa-regular fa-star"></i>
            ))}
          </div>
          <span>{reviewCount} avis</span>
        </div>
      </div>
    </a>
  );
};

RecipeCard.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  reviews: PropTypes.number.isRequired,
  reviewCount: PropTypes.number.isRequired,
  link: PropTypes.string.isRequired,
};

export default RecipeCard;