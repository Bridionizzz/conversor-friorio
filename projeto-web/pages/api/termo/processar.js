// pages/api/termo/processar.js
import { IncomingForm } from 'formidable';
import fs from 'fs';
import pdfParse from 'pdf-parse';
import { enriquecer_registros_gix } from '../../../lib/supabase';

// Extractores (mesmos do projeto original)
const EXTRATORES = {
  'BRASFOR': require('../../../utils/extractors/brasfor'),
  'GARSON': require('../../../utils/extractors/garson'),
  'JP CAPITAL': require('../../../utils/extractors/jp_capital'),
  // ... outros
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ erro: 'Método não permitido' });
  }

  try {
    const form = new IncomingForm({
      uploadDir: '/tmp',
      keepExtensions: true,
      multiples: false,
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          sucesso: false,
          erro: 'Erro ao fazer upload',
        });
      }

      const file = files.file?.[0];
      const banco = fields.banco?.[0] || 'AUTO (IA)';
      const tipo = fields.tipo?.[0] || 'PDF';

      if (!file) {
        return res.status(400).json({
          sucesso: false,
          erro: 'Nenhum arquivo enviado',
        });
      }

      try {
        let texto = '';

        // Lê o arquivo
        if (tipo === 'PDF') {
          const fileData = fs.readFileSync(file.filepath);
          const pdfData = await pdfParse(fileData);
          texto = pdfData.text;
        } else {
          texto = fs.readFileSync(file.filepath, 'utf8');
        }

        // Extrai dados
        let registros = [];

        if (banco === 'AUTO (IA)') {
          // Aqui você poderia usar uma API de IA
          // Por enquanto, tenta o primeiro extractor
          registros = EXTRATORES['BRASFOR'](texto);
        } else if (EXTRATORES[banco]) {
          registros = EXTRATORES[banco](texto);
        } else {
          throw new Error(`Banco ${banco} não suportado`);
        }

        // Enriquece com GIX
        registros = await enriquecer_registros_gix(registros);

        // Limpa arquivo temporário
        fs.unlinkSync(file.filepath);

        return res.status(200).json({
          sucesso: true,
          registros,
          valor_pago: null,
        });
      } catch (error) {
        // Limpa arquivo em caso de erro
        if (file.filepath) fs.unlinkSync(file.filepath);

        return res.status(500).json({
          sucesso: false,
          erro: error.message,
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      sucesso: false,
      erro: error.message,
    });
  }
}
