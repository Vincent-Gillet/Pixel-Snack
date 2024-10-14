import React from 'react';
import LoginBloc from '../components/login';
import Newsletter from '../components/newsletter/newsletter';
import Banner from '../components/banner/banner';
import customImage from '../assets/image/recettes/20969525.webp';

function Login() {
  return (
    <div className="App container">
        <Banner title="Connexion" image={customImage} />
        <LoginBloc />
        <Newsletter />
    </div>

  );
}

export default Login;