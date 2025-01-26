// src/components/LoginPage.jsx
import "./../styles/LoginPage.css";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/StudentsList");
    } catch (err) {
      setError("Failed to login: " + err.message);
    }
  };

  return (
    <div className="login">
      <form className="login__form" onSubmit={handleLogin}>
        <h2 className="login__title">Login</h2>
        <div className="login__inputs">
          <input
            type="email"
            className="login__input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="login__input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="login__error">{error}</p>}
        <button type="submit" className="login__button">
          Login
        </button>
        <p className="login__register">
          Don't have an account? <a href="/RegisterPage">Register</a>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
