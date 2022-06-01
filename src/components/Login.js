import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef } from 'react';
import { auth } from '../utils/firebase.config';

const Login = () => {
  const loginEmail = useRef();
  const LoginPassword = useRef();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(
        auth,
        loginEmail.current.value,
        LoginPassword.current.value,
      );
    } catch (error) {
      console.log(error);
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
      <form onSubmit={(e) => handleLogin(e)}>
        <input
          type="email"
          className="loginInput"
          placeholder="your email ..."
          required
          ref={loginEmail}
        />
        <input
          type="password"
          className="loginInput"
          placeholder="password ..."
          required
          ref={LoginPassword}
        />
        <input
          type="submit"
          value="Se connecter"
        />
      </form>
    </div>
  );
};

export default Login;
