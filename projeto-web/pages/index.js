// pages/index.js
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Head>
        <title>Conversor FRIORIO - Portal</title>
        <meta name="description" content="Portal de conversão de TERMO e CAGED" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className={styles.main}>
        <section className={styles.hero}>
          <h1>🔄 Conversor FRIORIO</h1>
          <p className={styles.subtitle}>Plataforma web para conversão de TERMO e CAGED</p>
          <p className={styles.version}>v2.0.0 - Rodando em Vercel ✨</p>
        </section>

        <section className={styles.cards}>
          <Link href="/termo" className={styles.card}>
            <div className={styles.icon}>📄</div>
            <h2>Conversor TERMO</h2>
            <p>Converta arquivos PDF/REM para CSV com validação GIX</p>
            <span className={styles.cta}>Acessar →</span>
          </Link>

          <Link href="/caged" className={styles.card}>
            <div className={styles.icon}>📊</div>
            <h2>Conversor CAGED</h2>
            <p>Processe arquivos CAGED com filtros avançados</p>
            <span className={styles.cta}>Acessar →</span>
          </Link>

          <Link href="/config" className={styles.card}>
            <div className={styles.icon}>⚙️</div>
            <h2>Configurações</h2>
            <p>Gerencie profissões, estados e municípios</p>
            <span className={styles.cta}>Acessar →</span>
          </Link>
        </section>

        <section className={styles.features}>
          <h2>✨ Recursos</h2>
          <ul>
            <li>✅ Processamento em tempo real</li>
            <li>✅ Validação com banco GIX</li>
            <li>✅ Exportação para CSV/XLSX</li>
            <li>✅ Interface responsiva</li>
            <li>✅ Modo escuro/claro</li>
            <li>✅ 100% na nuvem - Sem instalação</li>
          </ul>
        </section>

        <section className={styles.tech}>
          <h2>🛠️ Stack Tecnológico</h2>
          <div className={styles.techStack}>
            <div className={styles.techItem}>
              <strong>Frontend</strong>
              <p>Next.js 14 + React 18</p>
            </div>
            <div className={styles.techItem}>
              <strong>Hosting</strong>
              <p>Vercel (Serverless)</p>
            </div>
            <div className={styles.techItem}>
              <strong>Banco de Dados</strong>
              <p>Supabase (PostgreSQL)</p>
            </div>
            <div className={styles.techItem}>
              <strong>Deploy</strong>
              <p>Auto-deploy via GitHub</p>
            </div>
          </div>
        </section>

        <section className={styles.status}>
          <h2>📊 Status do Sistema</h2>
          <div className={styles.statusGrid}>
            <StatusCard icon="✅" title="Frontend" status="Online" color="#10b981" />
            <StatusCard icon="✅" title="API" status="Online" color="#10b981" />
            <StatusCard icon="⏳" title="Banco GIX" status="Configurando" color="#f59e0b" />
            <StatusCard icon="✅" title="Supabase" status="Online" color="#10b981" />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function StatusCard({ icon, title, status, color }) {
  return (
    <div className={styles.statusCard} style={{ borderLeftColor: color }}>
      <div className={styles.statusIcon}>{icon}</div>
      <div>
        <h3>{title}</h3>
        <p>{status}</p>
      </div>
    </div>
  );
}
