import React, { useState } from 'react';
import ramenImage from '../../assets/image/recettes/ramen-ghibli-studio.webp';

function Newsletter() {
  const [email, setEmail] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/newsletter/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, accepted_terms: acceptedTerms }),
      });
      if (response.ok) {
        setMessage('Inscription réussie à la newsletter');
        setEmail('');
        setAcceptedTerms(false);
        setTimeout(() => {
          setMessage('');
        }, 2000); 
      } else {
        const data = await response.json();
        setMessage(data.message || 'Erreur lors de l\'inscription à la newsletter');
      }
    } catch (error) {
      setMessage('Erreur lors de l\'inscription à la newsletter');
    }
  };

  const newletterStyle = {
    backgroundImage: `url(${ramenImage})`,
  };

  return (
    <div className="App-newsletter container" style={newletterStyle}>
      <div className="newsletter_content">
        <h2>Newsletter</h2>
        <p>Inscrivez-vous à notre Newsletter pour découvrir nos dernières recettes !!!</p>
        <form className="newsletter_form" onSubmit={handleSubmit}>
            <div className='email_submit'>
                <input
                    type="email"
                    placeholder="Votre adresse mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit" className="normal_button">S'inscrire</button>            
            </div>
            <label>
                <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                required
                />
                J'accepte l'utilisation de mon email pour recevoir la newsletter.
            </label>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default Newsletter;