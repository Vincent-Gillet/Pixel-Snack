import React from 'react';
import ramenImage from '../../assets/image/recettes/ramen-ghibli-studio.webp';

function Newsletter() {

    const newletterStyle = {
        backgroundImage: `url(${ramenImage})`,
      };

  return (
    <div className="App-newsletter container" style={newletterStyle}>
        <div className="newsletter_content">
            <h2>Newsletter</h2>
            <p>Inscrivez-vous à notre Newsletter pour découvrir nos dernières recette !!!</p>
            <div className="newsletter_form">
                <input type="text" placeholder="Votre adresse mail" />
                <button className='normal_button'>S'inscrire</button>
            </div>
        </div>
    </div>
  );
}

export default Newsletter;