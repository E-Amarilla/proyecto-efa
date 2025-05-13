import { cleanupHandler } from './stream';

// Variables globales para tracking
let isRestarting = false;

export default async function handler(req, res) {
  // Solo permitir solicitudes POST
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false,
      message: 'Método no permitido. Use POST para esta operación.' 
    });
  }
  
  // Evitar reinicios concurrentes
  if (isRestarting) {
    return res.status(429).json({ 
      success: false,
      message: 'Ya hay un reinicio en progreso, por favor espere.'
    });
  }
  
  try {
    console.log('[API] Iniciando reinicio forzado de cámaras...');
    isRestarting = true;
    
    // Paso 1: Limpiar todos los recursos actuales
    console.log('[API] Limpiando recursos existentes...');
    cleanupHandler(null);
    
    // Paso 2: Esperar un tiempo para asegurar que la limpieza sea completa
    console.log('[API] Esperando para completar limpieza...');
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Paso 3: Iniciar nuevos streams usando el endpoint existente
    console.log('[API] Iniciando nuevos streams...');
    const response = await fetch(`http://${req.headers.host}/api/stream`);
    
    if (!response.ok) {
      throw new Error(`Error al iniciar streams: ${response.statusText}`);
    }
    
    // IMPORTANTE: Incrementar manualmente la secuencia de reinicio
    if (global.restartSequence !== undefined) {
      global.restartSequence += 1;
      console.log('[API] Secuencia de reinicio incrementada a:', global.restartSequence);
    }
    
    console.log('[API] Reinicio forzado completado exitosamente');
    
    res.status(200).json({ 
      success: true, 
      message: 'Reinicio forzado completado correctamente',
      restartSequence: global.restartSequence
    });
  } catch (error) {
    console.error('[API] Error durante el reinicio forzado:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al realizar el reinicio forzado', 
      error: error.message 
    });
  } finally {
    // Siempre marcar como completado al finalizar
    isRestarting = false;
  }
}