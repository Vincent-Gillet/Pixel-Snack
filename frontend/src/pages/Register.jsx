import React from 'react';
import RegisterBloc from '../components/register';
import Newsletter from '../components/newsletter/newsletter';
import Banner from '../components/banner/banner';
import customImage from '../assets/image/recettes/foodwarsterrinedelégumes.png';

function Register() {
  return (
    <div className="App container">
        <Banner title="Inscription" image={customImage} />
        <RegisterBloc />
        <Newsletter />
    </div>

  );
}

export default Register;