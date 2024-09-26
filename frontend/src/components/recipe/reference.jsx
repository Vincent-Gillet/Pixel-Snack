import React from 'react';

function Reference({ title_reference, episode_reference, description_reference, repice_reference, link_platform_reference, logo_platform_reference }) {
  return (
    <div className="App-Reference container">
      <div className='container_reference'>
        <div className='container_text'>
          <h3>{title_reference}</h3>
          <div className='contenu_reference'>
            <h4>{episode_reference}</h4>
            <p>{description_reference}</p>
            <span>
              <p>Disponible sur :</p>
              <a target='_blank' rel='noreferrer' href={link_platform_reference}>
                <img src={logo_platform_reference} alt="logo" />
              </a>
            </span>            
          </div>
        </div>
        <div className='image'>
          <img src={repice_reference} alt="plat" />
        </div>        
      </div>
    </div>
  );
}

export default Reference;