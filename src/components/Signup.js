import React, { useRef } from 'react';
import { auth } from '../utils/firebase.config';

const SignUp = () => {
  const registerEmail = useRef();
  const registerPassword = useRef();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      auth.createUserWithEmailAndPassword(
        registerEmail.current.value,
        registerPassword.current.value,
      );
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="loginForm">
      <h1 style={{
        fontSize: '3rem',
        fontWeight: '600',
        color: '#ececec',
      }}
      >
        SIGN UP
      </h1>
      <form onSubmit={(e) => handleSignUp(e)}>
        <input
          type="email"
          className="loginInput"
          placeholder="your email ..."
          required
          ref={registerEmail}
        />
        <input
          type="password"
          className="loginInput"
          placeholder="password ..."
          required
          ref={registerPassword}
        />
        <input
          type="submit"
          value="Se connecter"
        />
      </form>
    </div>
  );
};

export default SignUp;
