import React from 'react';
import repice from '../../../assets/image/recettes/Onigiri.jpg';
import logo from '../../../assets/logo/crunchyroll-2.svg';

function Reference() {



  return (
    <div className="App-Reference container">
      <div className='container_reference'>
        <div className='container_text'>
          <h3>Food Wars</h3>
          <div className='contenu_reference'>
            <h4>(saison 1 épisode 6)</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea</p>
            <span>
              <p>Disponible sur :</p>
              <a target='_blank' rel='noreferrer' alt='' href='https://www.crunchyroll.com/fr/series/G6GG91P26/food-wars-shokugeki-no-soma?srsltid=AfmBOooBUJoZuftzrdhQewZsF3xI6Wdrbd5yRC77xDPVrGC0ZVYx3KS_' >
                <img src={logo} alt="logo" />
              </a>
            </span>            
          </div>

            
        </div>
        <div className='image'>
          <img src={repice} alt="plat" />
        </div>        
      </div>



    </div>
  );
}

export default Reference;