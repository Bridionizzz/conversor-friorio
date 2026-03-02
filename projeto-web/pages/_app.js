// pages/_app.js
import '../styles/globals.css';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Aplicar tema salvo
    const isDark = localStorage.getItem('tema-escuro') === 'true';
    if (isDark) {
      document.body.classList.add('dark');
    }
  }, []);

  return (
    <>
      <Component {...pageProps} />
      <Toaster position="top-right" />
    </>
  );
}

export default MyApp;
