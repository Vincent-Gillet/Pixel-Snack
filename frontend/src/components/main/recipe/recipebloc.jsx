import React, { useState } from 'react';
import repice from '../../../assets/image/recettes/20969525.webp';
import start from '../../../assets/element/PlayButtonCircled.svg';
import Reference from './reference';

function RecipeBloc() {

  const [showVideo, setShowVideo] = useState(false);

  const handleVideoClick = () => {
    setShowVideo(true);
  };

  const handleOverlayClick = (e) => {
    if (e.target.className === 'video_overlay') {
      setShowVideo(false);
    }
  };

  return (
    <div className="App-RecipeBloc container">
      <div className='title'>
        <h2>RecipesBloc</h2>
        <div className='reviews'>
          <div className='stars'>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-regular fa-star"></i>
          </div>
          <p>340 avis</p>
        </div>
      </div>
      <div className='container_ingredients'>
          <div className='image'>
            <img src={repice} alt='' />
          </div>
          <div className='text'>
            <h3>Ingrédients</h3>
          
            <ul>
              <li>1 pâte brisée</li>
              <li>3 grosses pommes</li>
              <li>100 g de sucre en poudre</li>
              <li>50 g de beurre</li>
              <li>1 sachet de sucre vanillé</li>
              <li>1 cuillère à soupe de cannelle</li>
            </ul>
          </div>
      </div>


      <div className='container_timer'>
        <h3>Préparation</h3>
        <div className='bloc_timer'>
          <h4><b>Total : </b>40 min</h4>
          <div className='all_timer'>
            <div className='timer'>
              <h4><b>Préparation :</b></h4>
              <p>20 min</p>
            </div>
            <div className='timer'>
              <h4><b>Repos :</b></h4>
              <p>-</p>
            </div>
            <div className='timer'>
              <h4><b>Cuisson :</b></h4>
              <p>20 min</p>
            </div>
          </div>
        </div>
      </div>

      <div className='container_video'>
        <div className='video' onClick={handleVideoClick} style={{ cursor: 'pointer', background: `url(${repice})` }}>
          <img className='start' src={start} alt='' />


        </div>
        {showVideo && (
          <div className='video_overlay' onClick={handleOverlayClick}>
            <div className='iframe_container'>
              <iframe className='responsive_iframe' src="https://www.youtube.com/embed/ozJ_qHdtFkQ?si=q1jmMZL1leZoJUjQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
            {/* <iframe src="https://www.youtube.com/embed/ozJ_qHdtFkQ?si=q1jmMZL1leZoJUjQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */}
          </div>
        )}


        {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/9kP0zZd6Y6c" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
      </div>

      <div className='container_preparation'>
        <div className='step'>
          <h4>Etape 1</h4>
          <p>Préchauffer le four à 180°C (thermostat 6).</p>
        </div>
        <div className='step'>
          <h4>Etape 2</h4>
          <p>Étaler la pâte brisée dans un moule à tarte.</p>
        </div>
        <div className='step'>
          <h4>Etape 3</h4>
          <p>Piquer le fond de tarte avec une fourchette.</p>
        </div>
        <div className='step'>
          <h4>Etape 4</h4>
          <p>Éplucher les pommes, les couper en quartiers puis en fines lamelles.</p>
        </div>
        <div className='step'>
          <h4>Etape 5</h4>
          <p>Disposer les lamelles de pommes sur le fond de tarte.</p>
        </div>
        <div className='step'>
          <h4>Etape 6</h4>
          <p>Parsemer de sucre en poudre, de sucre vanillé et de cannelle.</p>
        </div>
        <div className='step'>
          <h4>Etape 7</h4>
          <p>Parsemer de noisettes de beurre.</p>
        </div>


        {/* <ol>
          <li>Préchauffer le four à 180°C (thermostat 6).</li>
          <li>Étaler la pâte brisée dans un moule à tarte.</li>
          <li>Piquer le fond de tarte avec une fourchette.</li>
          <li>Éplucher les pommes, les couper en quartiers puis en fines lamelles.</li>
          <li>Disposer les lamelles de pommes sur le fond de tarte.</li>
          <li>Parsemer de sucre en poudre, de sucre vanillé et de cannelle.</li>
          <li>Parsemer de noisettes de beurre.</li>
          <li>Enfourner pour 20 minutes.</li>
        </ol> */}
      </div>

      <Reference />

    </div>
  );
}

export default RecipeBloc;