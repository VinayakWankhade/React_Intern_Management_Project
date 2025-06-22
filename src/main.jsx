import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Create the root element for the React application
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

// Render the main App component into the root element
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);