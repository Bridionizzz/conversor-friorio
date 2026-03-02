// components/Footer.js
import styles from '../styles/Footer.module.css';

export default function Footer() {
  const ano = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <p>&copy; {ano} Conversor FRIORIO. Todos os direitos reservados.</p>
        <div className={styles.links}>
          <a href="https://github.com/seu-usuario/projeto-web" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="mailto:seu-email@example.com">Contato</a>
          <a href="#privacy">Privacidade</a>
        </div>
      </div>
      <p className={styles.tech}>
        Feito com ❤️ usando Next.js + Vercel + Supabase
      </p>
    </footer>
  );
}
