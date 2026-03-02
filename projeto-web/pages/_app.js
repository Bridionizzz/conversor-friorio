import '../styles/globals.css';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const isDark = localStorage.getItem('tema-escuro') === 'true';
    if (isDark) {
      document.body.classList.add('dark');
    }
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
