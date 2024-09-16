import React from 'react';

const UserCard = ({ name, email, onView, onDelete }) => {
  return (
    <div className='card_user card'>
      <div className='card_content'>
        <h3>{name}</h3>
        <p>{email}</p>
        <div className='button_card'>
          <button className='user_button' onClick={onView}>Voir</button>
          <button className='user_button' onClick={onDelete}>Supprimer</button>          
        </div>
      </div>
    </div>
  );
};

export default UserCard;