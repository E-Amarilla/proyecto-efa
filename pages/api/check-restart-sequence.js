export default function handler(req, res) {
    // Leer la variable global establecida por stream.js
    const restartSequence = global.restartSequence || 0;
    res.status(200).json({ restartSequence });
  }