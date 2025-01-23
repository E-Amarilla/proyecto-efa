import { cleanupHandler } from './stream';

export default function handler(req, res) {
  if (req.method === 'POST') {
    return cleanupHandler(req, res);
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}