import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom';

function RegisterBloc() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({}); 

  const navigate = useNavigate();

  const translateError = (error) => {
    const translations = {
      "The name field is required.": "Le champ pseudo est obligatoire.",
      "The email field is required.": "Le champ email est obligatoire.",
      "The password field is required.": "Le champ mot de passe est obligatoire.",
      "The terms accepted field must be accepted.": "Vous devez accepter les conditions générales d'utilisation.",
      // Ajoutez d'autres traductions ici si nécessaire
    };
    return translations[error] || error;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});

    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/register`, {
        name,
        email,
        password,
        termsAccepted,
      });

      console.log('Inscription réussie:', response.data);
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const translatedErrors = {};
        for (const [key, value] of Object.entries(error.response.data.errors)) {
          translatedErrors[key] = value.map(translateError);
        }
        setErrors(translatedErrors);
      } else {
        console.error('Erreur lors de l\'inscription:', error);
      }
    }
  };

  return (
<div className="App-login container">
      <form onSubmit={handleSubmit}>
        {errors.message && <div className="error-message">{errors.message}</div>}
        <label htmlFor="name">Pseudo</label>
        <input
          type="name"
          id="name"
          placeholder="Pseudo"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <div className="error-message">{errors.name[0]}</div>}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <div className="error-message">{errors.email[0]}</div>}
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
        {errors.password && <div className="error-message">{errors.password[0]}</div>}
        <div className="cgu">
          <input
            type="checkbox"
            id="terms"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
          />
          <label htmlFor="terms">
            J’accepte les Conditions Générales d'Utilisation et reconnais avoir été informé que mes données personnelles seront utilisées tel que décrit ci-dessous et détaillé
          </label>
        </div>
        {errors.termsAccepted && <div className="error-message">{errors.termsAccepted[0]}</div>}
        <button type="submit">S'inscrire</button>
        <p className='switch_register_login'>Vous avez déjà un compte ? <NavLink to="/login" >Se connecter</NavLink></p>
      </form>
    </div>
  );
}

export default RegisterBloc;