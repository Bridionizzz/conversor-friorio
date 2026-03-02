// pages/index.js
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Conversor FRIORIO</title>
      </Head>

      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>🔄 Conversor FRIORIO</h1>
        <p>Bem-vindo à plataforma de conversão TERMO e CAGED</p>
        <p>v2.0.0 - Rodando em Vercel ✨</p>

        <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          <a href="/termo" style={{ padding: '1.5rem', border: '2px solid #2d89ef', borderRadius: '8px', textDecoration: 'none', color: 'inherit' }}>
            <h3>📄 TERMO</h3>
            <p>Converter PDF/REM para CSV</p>
          </a>

          <a href="/caged" style={{ padding: '1.5rem', border: '2px solid #2d89ef', borderRadius: '8px', textDecoration: 'none', color: 'inherit' }}>
            <h3>📊 CAGED</h3>
            <p>Processar arquivos CAGED</p>
          </a>

          <a href="/config" style={{ padding: '1.5rem', border: '2px solid #2d89ef', borderRadius: '8px', textDecoration: 'none', color: 'inherit' }}>
            <h3>⚙️ CONFIG</h3>
            <p>Gerenciar configurações</p>
          </a>
        </div>

        <div style={{ marginTop: '3rem', fontSize: '0.9rem', opacity: 0.7 }}>
          <p>✅ Frontend: Next.js 14</p>
          <p>✅ Hosting: Vercel</p>
          <p>✅ Database: Supabase</p>
        </div>
      </div>
    </>
  );
}
