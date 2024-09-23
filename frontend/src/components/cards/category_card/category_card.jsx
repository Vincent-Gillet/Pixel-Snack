import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const CategoryCard = ({ id, title, image }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/categorie/${id}`);
  };

  return (
    <div className='card_recipe card' onClick={handleCardClick}>
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
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default CategoryCard;