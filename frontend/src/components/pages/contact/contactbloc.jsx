import React from 'react';


function ContactBloc() {

  return (
    <div className="App-ContactBloc container">
      <form>
        <div className='Name_Username'>
          <div className='firstname'>
            <label for="username">Nom</label>
            <input type="text" placeholder="Nom" />            
          </div>
          <div className='lastname'>
            <label for="username">Prénom</label>
            <input type="text" placeholder="Prénom" />          
          </div>            

        </div>



        <label for="username">Email</label>
        <input type="text" placeholder="Nom d'utilisateur" />
        <label for="textarea">Message</label>
        <textarea placeholder="Votre message"></textarea>

        <div className="cgu">
          <input type="checkbox" id="terms" />
          <label htmlFor="terms">
            J’accepte que les informations renseignées ci-dessus soient exploitées dans le cadre de mes échanges avec Pixel Snack. *
          </label>
        </div>        
        <button type="submit">Envoyer</button>
      </form>

      <div className='information'>
        <a href="tel:0123456789" className='phone'>
          <i className="fa-solid fa-phone"></i>
          <p>01 23 45 67 89</p>
        </a>
        <a href="mailto:pixelsnack@contact.fr" className='mail'>
          <i className="fa-solid fa-envelope"></i>
          <p>pixelsnack@contact.fr</p>
        </a>
        <a href="https://goo.gl/maps/1bZ8L6QV6j2vNf6w9" className='adress'>
          <i className="fa-solid fa-map-marker-alt"></i>
          <p>1 rue de la Paix, 75000 Paris</p>
        </a>
      </div>
    </div>
  );
}

export default ContactBloc;