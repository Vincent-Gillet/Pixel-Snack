import React from 'react';
import RegisterBloc from '../components/register';
import Newsletter from '../components/newsletter/newsletter';

function Register() {
  return (
    <div className="App container">
        <RegisterBloc />
        <Newsletter />
    </div>

  );
}

export default Register;