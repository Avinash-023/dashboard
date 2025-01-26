// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // Global styles (optional)
import App from './App';  // The main App component

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
