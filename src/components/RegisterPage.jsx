// src/components/RegisterPage.jsx

import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useNavigate } from 'react-router-dom';
import "./../styles/LoginPage.css"; // Reuse the same styles

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/loginPage'); // Redirect to login page after successful registration
    } catch (err) {
      setError('Failed to register: ' + err.message);
    }
  };

  return (
    <div className="login"> {/* Use the same container class */}
      <form className="login__form" onSubmit={handleRegister}>
        <h2 className="login__title">Register</h2>
        <div className="login__inputs">
          <input
            className="login__input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="login__input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="login__error">{error}</p>}
        <button className="login__button" type="submit">Register</button>
        <p className="login__register">
          Already have an account? <a href="/LoginPage">Login</a>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
