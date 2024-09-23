import React from 'react';
import PropTypes from 'prop-types';

const DashboardCategoryCard = ({ title, image, onView, onDelete }) => {
  return (
    <div className='card_dashboard card'>
      {/* <div className='card_image'>
        <img src={image} alt={title} />
      </div> */}
      <div className='card_content'>
        <h3>{title}</h3>
        <div className='button_card'>
          <button className='dashboard_button' onClick={onView}>Voir</button>
          <button className='dashboard_button' onClick={onDelete}>Supprimer</button>
        </div>
      </div>
    </div>
  );
};

DashboardCategoryCard.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  onView: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DashboardCategoryCard;