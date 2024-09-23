import React from 'react';
import netflix from '../../../../assets/logo/paternship/netflix.png';
import amazon from '../../../../assets/logo/paternship/Amazon_Prime_Video_logo.svg';
import marmiton from '../../../../assets/logo/paternship/marmiton.png';
import gastronogeek from '../../../../assets/image/gastronogeek.jpeg';
import book from '../../../../assets/image/livre gastronogeek.jpeg';


function Parternship() {
  return (
    <div className="App-parternship container">
        <h2>Partenaires</h2>
        <div className='container_logo'>
            <p>Ils nous font condiance</p>
            <div className='box_hidden'>
                <div className='box_logo'>
                <div className='logo_carrousel'>
                    <div className='card_logo'>
                        <img src={marmiton} alt="Logo de Marmiton" />
                    </div>
                    <div className='card_logo'>
                        <img src={netflix} alt="Logo de Netflix" />
                    </div>
                    <div className='card_logo'>
                        <img src={amazon} alt="Logo d'Amazon Prime Video" />
                    </div>
                </div>                
                <div className='logo_carrousel'>
                    <div className='card_logo'>
                        <img src={marmiton} alt="Logo de Marmiton" />
                    </div>
                    <div className='card_logo'>
                        <img src={netflix} alt="Logo de Netflix" />
                    </div>
                    <div className='card_logo'>
                        <img src={amazon} alt="Logo d'Amazon Prime Video" />
                    </div>
                </div>                
            </div>
            </div>
        </div>
        <div className='influencer'>
            <div className='image_influencer'>
                <img src={gastronogeek} alt="Gastronogreek" />
            </div>
            <div className='text_influencer'>
                <h3>Gastronogeek</h3>
                <p>
                    Thibaud Villanova, aussi connu comme Gastronogeek, est un cuisinier, écrivain et créateur de contenus français. Sa cuisine s'inspire des cultures de l’imaginaire et de la pop culture.
                </p>

                <div className='book'>
                    <img src={book} alt="livre de cuisine Gastronogeek" />
                </div>

                <div className='social_network'>
                    <a href="#youtube" target='_blank'>
                        <i className="fa-brands fa-youtube"></i>
                    </a>
                    <a href="#instagram" target='_blank'>
                        <i class="fa-brands fa-instagram"></i>
                    </a>
                    <a href="#x" target='_blank'>
                        <i className="fa-brands fa-x-twitter"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Parternship;