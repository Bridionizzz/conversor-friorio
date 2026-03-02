// pages/api/termo/exportar.js
import { Parser } from 'json2csv';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ erro: 'Método não permitido' });
  }

  try {
    const { registros, pago, tarifa, iof } = req.body;

    if (!registros || registros.length === 0) {
      return res.status(400).json({
        sucesso: false,
        erro: 'Nenhum registro para exportar',
      });
    }

    // Recalcula financeiro
    const pagoNum = parseFloat(pago) || 0;
    const tarifaNum = parseFloat(tarifa) || 0;
    const iofNum = parseFloat(iof) || 0;

    const totalBruto = registros.reduce(
      (sum, r) => sum + parseFloat(r.VALOR_BRUTO),
      0
    );
    const taxa = pagoNum && totalBruto ? (totalBruto - pagoNum) / totalBruto : 0;

    registros.forEach((r) => {
      const bruto = parseFloat(r.VALOR_BRUTO);
      const juros = bruto * taxa;
      const prop = bruto / totalBruto;

      r.JUROS = juros.toFixed(2);
      r.TARIFA = (prop * tarifaNum).toFixed(2);
      r.IOF = (prop * iofNum).toFixed(2);
      r.VALOR_LIQUIDO = (
        bruto -
        juros -
        prop * tarifaNum -
        prop * iofNum
      ).toFixed(2);
    });

    // Gera CSV
    const fields = [
      'EMPRESA',
      'DOCUMENTO',
      'SERIE',
      'PARCELA',
      'NOSSO_NUMERO',
      'CONTRATO',
      'CODIGO',
      'VALOR_BRUTO',
      'IOF',
      'JUROS',
      'TARIFA',
      'VALOR_LIQUIDO',
    ];

    const json2csvParser = new Parser({ fields, delimiter: ';' });
    const csv = json2csvParser.parse(registros);

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename=termo.csv');
    res.status(200).send(csv);
  } catch (error) {
    return res.status(500).json({
      sucesso: false,
      erro: error.message,
    });
  }
}
