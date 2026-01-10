import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// 🔹 Solución para GitHub Pages (redirección 404 preservando la URL)
const redirect = sessionStorage.redirect;
if (redirect) {
  delete sessionStorage.redirect;
  const base = import.meta.env.BASE_URL || '';
  window.history.replaceState(null, '', base + redirect);
}



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
