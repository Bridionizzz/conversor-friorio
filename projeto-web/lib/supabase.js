// lib/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Variáveis SUPABASE não configuradas');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// ============================================
// Funções auxiliares
// ============================================

export async function buscarDadosGIX(documento, banco = null) {
  try {
    const query = supabase
      .from('arqcrec')
      .select('crecempe, crecseri, crecnoss, crecbanc')
      .eq('crecdocu', documento)
      .order('crecemis', { ascending: false })
      .limit(1);

    if (banco) {
      query.eq('crecbanc', banco);
    }

    const { data, error } = await query;

    if (error) throw error;

    if (data && data.length > 0) {
      const row = data[0];
      return {
        EMPRESA: row.crecempe || 0,
        SERIE: row.crecseri || '',
        NOSSO_NUMERO: row.crecnoss || '',
        BANCO: row.crecbanc || '',
      };
    }

    return { EMPRESA: 0, SERIE: '', NOSSO_NUMERO: '', BANCO: '' };
  } catch (error) {
    console.error('Erro ao buscar GIX:', error);
    return { EMPRESA: 0, SERIE: '', NOSSO_NUMERO: '', BANCO: '' };
  }
}

export async function enriquecer_registros_gix(registros) {
  /**
   * Enriquece registros com dados do GIX
   */
  if (!registros || registros.length === 0) return registros;

  for (const r of registros) {
    const doc = String(r.DOCUMENTO || '').trim();
    const banco = r.CODIGO || null;

    if (!doc) continue;

    const dados = await buscarDadosGIX(doc, banco);

    r.EMPRESA = dados.EMPRESA;
    r.SERIE = dados.SERIE;
    r.NOSSO_NUMERO = dados.NOSSO_NUMERO;
    r.CODIGO = dados.BANCO;
  }

  return registros;
}

export async function salvar_config(cfg) {
  /**
   * Salva config no Supabase
   */
  try {
    const { data, error } = await supabase
      .from('config')
      .upsert({
        id: 'global',
        config_data: cfg,
        updated_at: new Date(),
      });

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Erro ao salvar config:', error);
    return false;
  }
}

export async function carregar_config() {
  /**
   * Carrega config do Supabase
   */
  try {
    const { data, error } = await supabase
      .from('config')
      .select('config_data')
      .eq('id', 'global')
      .single();

    if (error && error.code !== 'PGRST116') throw error;

    return (
      data?.config_data || {
        profissoes: {},
        estados: {},
        municipios: {},
        colunas_saida: [],
      }
    );
  } catch (error) {
    console.error('Erro ao carregar config:', error);
    return {
      profissoes: {},
      estados: {},
      municipios: {},
      colunas_saida: [],
    };
  }
}
