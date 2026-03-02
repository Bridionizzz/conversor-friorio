// pages/termo.js
import Head from 'next/head';
import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import Header from '../components/Header';
import TelaTermoComponent from '../components/TelaTermoComponent';
import styles from '../styles/Termo.module.css';

const BANCOS = [
  'AUTO (IA)',
  'BRASFOR',
  'SARFATY',
  'GARSON',
  'DANIELE',
  'JP CAPITAL',
  'EXICON',
  'BFC',
  'SOFISA',
  'RED',
  'HARPIA',
  'BELA VISTA',
  'VIA CAPITAL',
  'LARCA',
  'ATF',
  'OPERA',
  'RNX',
  'INVISTA',
  'ATHENA',
  'MATRIZ',
  'SOMA',
];

export default function TermoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [registros, setRegistros] = useState([]);
  const [valorPago, setValorPago] = useState(0);
  const fileInputRef = useRef(null);

  const [tipo, setTipo] = useState('PDF');
  const [banco, setBanco] = useState('AUTO (IA)');

  const processar = async (e) => {
    e.preventDefault();

    if (!fileInputRef.current?.files[0]) {
      toast.error('Selecione um arquivo');
      return;
    }

    setLoading(true);
    const toastId = toast.loading('Processando arquivo...');

    try {
      const formData = new FormData();
      formData.append('file', fileInputRef.current.files[0]);
      formData.append('banco', banco);
      formData.append('tipo', tipo);

      const response = await fetch('/api/termo/processar', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.erro || `Erro ${response.status}`);
      }

      const data = await response.json();

      if (!data.sucesso) {
        throw new Error(data.erro || 'Erro ao processar');
      }

      setRegistros(data.registros || []);
      setValorPago(data.valor_pago || 0);
      toast.success('Arquivo processado com sucesso!');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      toast.dismiss(toastId);
    }
  };

  const exportarCSV = async () => {
    try {
      const response = await fetch('/api/termo/exportar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          registros,
          pago: valorPago,
          tarifa: 0,
          iof: 0,
        }),
      });

      if (!response.ok) throw new Error('Erro ao exportar');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'termo.csv';
      a.click();

      toast.success('CSV exportado com sucesso!');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Head>
        <title>Conversor TERMO - FRIORIO</title>
      </Head>

      <Header />

      <main className={styles.container}>
        <div className={styles.header}>
          <button className={styles.btnVoltar} onClick={() => router.push('/')}>
            ⬅ Voltar
          </button>
          <h1>Conversor TERMO</h1>
          <div></div>
        </div>

        <section className={styles.config}>
          <form onSubmit={processar}>
            <div className={styles.formRow}>
              <label>Tipo:</label>
              <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                <option value="PDF">PDF</option>
                <option value="REM">REM</option>
              </select>
            </div>

            <div className={styles.formRow}>
              <label>Banco:</label>
              <select value={banco} onChange={(e) => setBanco(e.target.value)}>
                {BANCOS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formRow}>
              <label>Arquivo:</label>
              <input
                ref={fileInputRef}
                type="file"
                accept={tipo === 'PDF' ? '.pdf' : '.rem'}
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className={styles.btnPrincipal}
              disabled={loading}
            >
              {loading ? '⏳ Processando...' : '⚙️ Processar'}
            </button>
          </form>
        </section>

        {registros.length > 0 && (
          <TelaTermoComponent
            registros={registros}
            setRegistros={setRegistros}
            valorPago={valorPago}
            onExportar={exportarCSV}
          />
        )}
      </main>
    </>
  );
}
