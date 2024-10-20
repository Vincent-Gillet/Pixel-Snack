import React, { useState } from 'react';
import axios from 'axios';

function ContactBloc() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [status, setStatus] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrors({});

    const newErrors = {};
    if (!firstname) newErrors.firstname = 'Veuillez entrer votre prénom.';
    if (!lastname) newErrors.lastname = 'Veuillez entrer votre nom.';
    if (!email) newErrors.email = 'Veuillez entrer votre email.';
    if (!message) newErrors.message = 'Veuillez entrer votre message.';
    if (!termsAccepted) newErrors.terms = 'Vous devez accepter les termes et conditions.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/send-email`, {
        firstname,
        lastname,
        email,
        message,
      });

      if (response.status === 200) {
        setStatus('Message envoyé avec succès!');
      } else {
        setStatus('Erreur lors de l\'envoi du message.');
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      setStatus('Erreur lors de l\'envoi du message.');
    }
  };

  return (
    <div className="App-ContactBloc container">
      <form onSubmit={handleSubmit}>
        <div className='Name_Username'>
          <div className='label_input'>
            <label htmlFor="firstname">Prénom</label>
            <input
              type="text"
              id="firstname"
              placeholder="Prénom"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              aria-describedby="firstname-desc"
              aria-label="Prénom"
            />
            <span id="firstname-desc" className="sr-only">Entrez votre prénom.</span>
            {errors.firstname && <span className="error-message" aria-live="assertive">{errors.firstname}</span>}
          </div>
          <div className='label_input'>
            <label htmlFor="lastname">Nom</label>
            <input
              type="text"
              id="lastname"
              placeholder="Nom"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              aria-describedby="lastname-desc"
              aria-label="Nom"
            />
            <span id="lastname-desc" className="sr-only">Entrez votre nom.</span>
            {errors.lastname && <span className="error-message" aria-live="assertive">{errors.lastname}</span>}
          </div>
        </div>
        <div className='label_input_solo'>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-describedby="email-desc"
            aria-label="Email"
          />
          <span id="email-desc" className="sr-only">Entrez votre adresse email.</span>
          {errors.email && <span className="error-message" aria-live="assertive">{errors.email}</span>}
        </div>
        <div className='label_input_solo'>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            placeholder="Votre message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            aria-describedby="message-desc"
            aria-label="Message"
          />
          <span id="message-desc" className="sr-only">Entrez votre message.</span>
          {errors.message && <span className="error-message" aria-live="assertive">{errors.message}</span>}
        </div>
        <div className="cgu">
          <input
            type="checkbox"
            id="terms"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            aria-describedby="terms-desc"
            aria-label="Accepter les termes et conditions"
          />
          <label htmlFor="terms">
            J’accepte que les informations renseignées ci-dessus soient exploitées dans le cadre de mes échanges avec Pixel Snack. *
          </label>
          <span id="terms-desc" className="sr-only">Vous devez accepter les conditions générales d'utilisation pour soumettre le formulaire.</span>
          {errors.terms && <span className="error-message" aria-live="assertive">{errors.terms}</span>}
        </div>
        <button type="submit">Envoyer</button>
        {status && <p aria-live="polite">{status}</p>}
      </form>

      <div className='information'>
        <a href="tel:0123456789" className='phone' aria-label="Téléphone : 01 23 45 67 89">
          <i className="fa-solid fa-phone"></i>
          <p>01 23 45 67 89</p>
        </a>
        <a href="mailto:pixel-snack@vincentgillet.fr" className='mail' aria-label="Email : pixel-snack@vincentgillet.fr">
          <i className="fa-solid fa-envelope"></i>
          <p>pixel-snack@vincentgillet.fr</p>
        </a>
        <a href="https://goo.gl/maps/1bZ8L6QV6j2vNf6w9" className='adress' aria-label="Adresse : 1 rue de la Paix, 75000 Paris">
          <i className="fa-solid fa-map-marker-alt"></i>
          <p>1 rue de la Paix, 75000 Paris</p>
        </a>
      </div>
    </div>
  );
}

export default ContactBloc;