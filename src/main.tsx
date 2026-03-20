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

// 🔹 iPhone/iOS Debug Logging
if (/iPhone|iPad/.test(navigator.userAgent)) {
  console.log('iOS device detected - HeroCover auto-open enabled');
  console.log('Check for ErrorBoundary logs in sessionStorage.errorBoundary');
}

// Global error handler for iOS
window.onerror = function(msg, url, line, col, error) {
  console.error('Global error:', msg, 'at', url, line, col, error);
  sessionStorage.setItem('globalError', JSON.stringify({msg, url, line, col, error: error?.message}));
};

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  sessionStorage.setItem('unhandledRejection', JSON.stringify({reason: event.reason}));
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
