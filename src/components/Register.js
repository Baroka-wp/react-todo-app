/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import Login from './Login';
import SignUp from './Signup';

const Register = () => {
  const [signUp, setSignUp] = useState('register');

  return (
    <div className="container register">
      {
        signUp === 'register' ? (
          <>
            <h2
              style={{
                fontSize: '6rem',
                fontWeight: '600',
                marginBottom: '2rem',
                lineHeight: '1em',
                color: '#ececec',
                textTransform: 'lowercase',
                textAlign: 'center',
                padding: '0 40px',
              }}
            >
              Change your Life Now !
            </h2>
            <div>
              <button
                type="button"
                className="btn btn-success"
                onClick={() => setSignUp('login')}
              >
                Login
              </button>
              <button
                type="button"
                className="btn btn-info"
                onClick={() => setSignUp('logout')}
              >
                SignUp
              </button>
            </div>
          </>
        ) : signUp === 'login' ? (
          <Login />
        ) : (
          <SignUp />
        )

      }

    </div>
  );
};

export default Register;
