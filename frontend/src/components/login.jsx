import React, { useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function LoginBloc() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/login', {
        email,
        password,
      });

      console.log('Connexion réussie:', response.data);
      const accessToken = response.data.accessToken;
      const refreshToken = response.data.refreshToken;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      navigate('/dashboard');
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
    }
  };

  return (
    <div className="App-login container">
      <form onSubmit={handleSubmit}>
        <h2>Connexion</h2>
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
        <button type="submit">Connexion</button>
        <p className=''>Vous n’avez pas de compte ? <NavLink to="/subscription" >S'Inscrire</NavLink></p>
      </form>
    </div>
  );
}

export default LoginBloc;