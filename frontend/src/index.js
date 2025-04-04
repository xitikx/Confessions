import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot instead of render
import App from './App';
import './App.css';

const container = document.getElementById('root');
const root = createRoot(container); // Create a root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);