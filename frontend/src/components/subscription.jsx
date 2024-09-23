import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom';

function SubscriptionBloc() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // const [termsAccepted, setTermsAccepted] = useState(false);

  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/register', {
        name,
        email,
        password,
        // termsAccepted,
      });

      console.log('Inscription réussie:', response.data);
      navigate('/login');
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
    }
  };

  return (
<div className="App-login container">
      <form onSubmit={handleSubmit}>
        <h2>Inscription</h2>
        <label htmlFor="name">Pseudo</label>
        <input
          type="name"
          id="name"
          placeholder="Pseudo"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          id="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="confirmPassword">Confirmez le mot de passe</label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="Confirmez le mot de passe"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {/* <div className="cgu">
          <input
            type="checkbox"
            id="terms"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
          />
          <label htmlFor="terms">
            J’accepte les Conditions Générales d'Utilisation et reconnais avoir été informé que mes données personnelles seront utilisées tel que décrit ci-dessous et détaillé
          </label>
        </div> */}
        <button type="submit">S'inscrire</button>
        <p className=''>Vous avez déjà un compte ? <NavLink to="/login" >Se connecter</NavLink></p>
      </form>
    </div>
  );
}

export default SubscriptionBloc;