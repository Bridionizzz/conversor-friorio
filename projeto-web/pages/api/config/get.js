// pages/api/config/get.js
import { carregar_config } from '../../../lib/supabase';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ erro: 'Método não permitido' });
  }

  try {
    const cfg = await carregar_config();
    return res.status(200).json(cfg);
  } catch (error) {
    return res.status(500).json({
      erro: error.message,
    });
  }
}
