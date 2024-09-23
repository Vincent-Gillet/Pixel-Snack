import React from 'react';
import LoginBloc from '../components/login';
import Newsletter from '../components/newsletter/newsletter';

function Login() {
  return (
    <div className="App container">
        <LoginBloc />
        <Newsletter />
    </div>

  );
}

export default Login;