import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Initialize EmailJS (replace with your actual public key)
import emailjs from 'emailjs-com';
emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your EmailJS public key

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);