import React from 'react';
import PropTypes from 'prop-types';

const CategoryCard = ({ title, image }) => {
  return (
    <div className='card_recipe card'>
      <div className='card_image'>
        <img src={image} alt={title} />
      </div>
      <div className='card_content'>
        <h3>{title}</h3>
      </div>
    </div>
  );
};

CategoryCard.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default CategoryCard;