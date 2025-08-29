// Usar el objeto global para mantener el estado entre solicitudes
global.secondsRemainingGlobal = global.secondsRemainingGlobal || 60;

// Esta función será llamada desde stream.js para actualizar el tiempo restante
export const updateRemainingTime = (seconds) => {
  global.secondsRemainingGlobal = seconds;
  // console.log(`[API] Tiempo actualizado: ${global.secondsRemainingGlobal}`);
};

export default function handler(req, res) {
  // console.log(`[API] Enviando tiempo: ${global.secondsRemainingGlobal}`);
  res.status(200).json({ timeRemaining: global.secondsRemainingGlobal });
}