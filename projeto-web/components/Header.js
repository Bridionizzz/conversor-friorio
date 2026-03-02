// components/Header.js
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/Header.module.css';

export default function Header() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const dark = localStorage.getItem('tema-escuro') === 'true';
    setIsDark(dark);
    if (dark) document.body.classList.add('dark');
  }, []);

  const toggleTema = () => {
    const novoTema = !isDark;
    setIsDark(novoTema);
    localStorage.setItem('tema-escuro', novoTema);

    if (novoTema) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  };

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        🔄 FRIORIO
      </Link>

      <nav className={styles.nav}>
        <Link href="/">Home</Link>
        <Link href="/termo">TERMO</Link>
        <Link href="/caged">CAGED</Link>
        <Link href="/config">Config</Link>
      </nav>

      <button className={styles.btnTema} onClick={toggleTema} title="Alternar tema">
        {isDark ? '☀️' : '🌙'}
      </button>
    </header>
  );
}
