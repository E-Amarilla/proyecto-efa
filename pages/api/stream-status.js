export default function handler(req, res) {
    // Obtener el estado global de los streams
    const isStreaming = global.isStreaming || false;
    const restartSequence = global.restartSequence || 0;
    const timers = {
      isRestartTimerActive: global.isRestartTimerActive || false,
      secondsRemaining: global.secondsRemainingGlobal || 0
    };
    
    res.status(200).json({
      isStreaming,
      restartSequence,
      timers
    });
  }