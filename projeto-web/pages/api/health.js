// pages/api/health.js
export default async function handler(req, res) {
  try {
    return res.status(200).json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      version: '2.0.0',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
}
