import { cleanupHandler } from './stream';

export default async function handler(req, res) {
  // Solo permitir solicitudes POST para operaciones destructivas
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false,
      message: 'Método no permitido. Use POST para esta operación.'
    });
  }
  
  console.log('[API] Iniciando limpieza de recursos...');
  
  try {
    // Llamar al handler de limpieza exportado desde stream.js
    // Pasando null en lugar de res porque manejaremos la respuesta aquí
    cleanupHandler(null);
    
    console.log('[API] Limpieza de recursos completada exitosamente');
    res.status(200).json({ 
      success: true,
      message: 'Recursos de streaming limpiados correctamente'
    });
  } catch (error) {
    console.error('[API] Error durante la limpieza de recursos:', error);
    res.status(500).json({
      success: false,
      message: 'Error al limpiar los recursos',
      error: error.message
    });
  }
}