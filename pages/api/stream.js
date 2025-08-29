import ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import fs from 'fs';
import { updateRemainingTime } from './restart-time';

const RTSP_URLS = [
  process.env.NEXT_PUBLIC_CAM1,
  process.env.NEXT_PUBLIC_CAM2,
  process.env.NEXT_PUBLIC_CAM3,
  process.env.NEXT_PUBLIC_CAM4,
].filter(Boolean);

const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink);
const existsAsync = promisify(fs.exists);

const HLS_DIR = path.join(process.cwd(), 'public', 'hls');

const ffmpegProcesses = [];
let isStreaming = false;
let restartTimer = null;
let restartCounter = 0;
let isRestartTimerActive = false;
let restartSequence = 0;

// Función para mostrar el contador de tiempo
const logTimeRemaining = (totalSeconds) => {
  // console.log(`[Cámaras] Reinicio automático en ${totalSeconds} segundos. (${Math.floor(totalSeconds/60)}:${String(totalSeconds % 60).padStart(2, '0')})`);
};

const clearHlsDirectory = async () => {
  if (fs.existsSync(HLS_DIR)) {
    const files = fs.readdirSync(HLS_DIR);
    
    // Procesar los archivos en serie, no en paralelo
    for (const file of files) {
      const filePath = path.join(HLS_DIR, file);
      try {
        // Verificar que el archivo aún existe antes de intentar eliminarlo
        const exists = await existsAsync(filePath);
        if (exists) {
          await unlinkAsync(filePath);
          // Pequeño retraso para evitar saturar el sistema de archivos
          await new Promise(resolve => setTimeout(resolve, 10));
        }
      } catch (error) {
        console.error(`Error al eliminar archivo ${file}:`, error.message);
      }
    }
  }
};

if (!fs.existsSync(HLS_DIR)) {
  fs.mkdirSync(HLS_DIR, { recursive: true });
} else {
  clearHlsDirectory();
}

// Mejorar la función de finalización de procesos FFmpeg
const killFfmpegProcesses = async () => {
  for (const process of ffmpegProcesses) {
    try {
      // Intentar terminar el proceso de forma limpia primero
      process.kill('SIGTERM');
      
      // Dar tiempo al proceso para terminar correctamente
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Si aún está activo, forzar la finalización
      try {
        process.kill('SIGKILL');
      } catch (e) {
        // El proceso ya podría haberse terminado, ignorar el error
      }
    } catch (error) {
      console.log('El proceso FFmpeg ya había terminado');
    }
  }
  
  // Limpiar el array de procesos
  ffmpegProcesses.length = 0;
  
  // Dar tiempo adicional para asegurar que todos los procesos se liberaron
  await new Promise(resolve => setTimeout(resolve, 1000));
};

// Modificar la función de reinicio para ser completamente asíncrona
const restartStreaming = async () => {
  console.log('[Cámaras] Reiniciando todas las transmisiones...');
  
  // Cancelar temporizador existente si hay uno
  if (restartTimer) {
    clearInterval(restartTimer);
    restartTimer = null;
    isRestartTimerActive = false;
  }
  
  try {
    // Primero, detener todos los procesos FFmpeg y esperar
    console.log('[Cámaras] Deteniendo procesos FFmpeg...');
    await killFfmpegProcesses();
    
    // Luego, limpiar los archivos HLS
    console.log('[Cámaras] Limpiando directorio HLS...');
    await clearHlsDirectory();
    
    // Esperar un momento para asegurar que el sistema de archivos esté listo
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Marcar que no hay transmisiones activas
    isStreaming = false;
    
    // Iniciar nuevas transmisiones
    console.log('[Cámaras] Iniciando nuevas transmisiones...');
    await startStreaming();
    
    // Incrementar el contador de secuencia de reinicio
    restartSequence++;
    global.restartSequence = restartSequence;
    
    console.log('[Cámaras] Reinicio completado. Secuencia:', restartSequence);
  } catch (error) {
    console.error('[Cámaras] Error durante el reinicio:', error);
    
    // Intentar recuperarse del error
    isStreaming = false;
    await new Promise(resolve => setTimeout(resolve, 5000));
    startStreaming();
  }
};

// Asegurarnos de que las variables globales estén correctamente definidas
global.isStreaming = global.isStreaming || false;
global.restartSequence = global.restartSequence || 0;
global.isRestartTimerActive = global.isRestartTimerActive || false;

// Modificar la función startRestartTimer
const startRestartTimer = () => {
  // Detener cualquier temporizador existente a nivel global
  if (global.restartTimer) {
    console.log('[Cámaras] Cancelando temporizador global existente');
    clearInterval(global.restartTimer);
    global.restartTimer = null;
    global.isRestartTimerActive = false;
  }

  if (restartTimer) {
    console.log('[Cámaras] Cancelando temporizador local existente');
    clearInterval(restartTimer);
    restartTimer = null;
    isRestartTimerActive = false;
  }

  const restartInterval = 120 * 60;
  let secondsRemaining = restartInterval;
  
  // Actualizar la variable global
  updateRemainingTime(secondsRemaining);
  console.log(`[Cámaras] Tiempo restante inicial: ${secondsRemaining} segundos`);
  
  restartCounter++;
  console.log(`[Cámaras] Contador de reinicios: ${restartCounter}`);
  
  // Log inicial
  logTimeRemaining(secondsRemaining);
  
  // Configurar el temporizador
  global.restartTimer = setInterval(() => {
    secondsRemaining -= 1;
    
    // Actualizar la variable global en cada segundo
    updateRemainingTime(secondsRemaining);
    
    if (secondsRemaining <= 0) {
      clearInterval(global.restartTimer);
      global.restartTimer = null;
      global.isRestartTimerActive = false;
      isRestartTimerActive = false;
      restartTimer = null;
      restartStreaming();
    } else if (secondsRemaining % 15 === 0) {
      logTimeRemaining(secondsRemaining);
    }
  }, 1000);
  
  // Sincronizar las variables locales y globales
  restartTimer = global.restartTimer;
  isRestartTimerActive = true;
  global.isRestartTimerActive = true;
};

const startStream = (rtspUrl, outputFile) => {
  return new Promise((resolve, reject) => {
    const command = ffmpeg(rtspUrl)
      .output(path.join(HLS_DIR, outputFile))
      .outputOptions([
        '-hls_time 5',
        '-hls_list_size 4',
        '-hls_flags delete_segments+append_list',
        '-force_key_frames expr:gte(t,n_forced*5)',
        '-g 5',
        '-keyint_min 5',
        '-f hls',
        '-c:v libx264',
        '-c:a aac',
        '-vf', 'scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,setsar=1:1',
      ])
      .on('start', (cmdline) => {
        console.log(`[Cámaras] Comando FFmpeg iniciado: ${outputFile}`);
        // Esperar un momento antes de resolver para dar tiempo a que los archivos se creen
        setTimeout(() => resolve(command), 1000);
      })
      .on('error', (err) => {
        console.error(`Error en ffmpeg para ${outputFile}:`, err.message);
        reject(err);
      })
      .on('end', () => {
        console.log(`Stream finalizado para ${outputFile}`);
      });

    ffmpegProcesses.push(command);
    command.run();
  });
};

const startStreaming = async () => {
  if (global.isStreaming) {
    console.log('[Cámaras] Las transmisiones ya están en curso (global)');
    return { message: 'Las transmisiones ya están en curso' };
  }
  
  if (isStreaming) {
    console.log('[Cámaras] Las transmisiones ya están en curso (local)');
    return { message: 'Las transmisiones ya están en curso' };
  }

  console.log('[Cámaras] Iniciando transmisiones...');

  try {
    // Limpiar cualquier proceso anterior
    await killFfmpegProcesses();
    
    for (let i = 0; i < RTSP_URLS.length; i++) {
      const outputFile = `cam${i + 1}.m3u8`;
      console.log(`[Cámaras] Iniciando cámara ${i + 1}...`);
      
      // Iniciar cada stream y esperar a que termine
      await startStream(RTSP_URLS[i], outputFile);
      
      // Esperar un poco entre cada inicio de cámara
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // Esperar un poco para que FFmpeg genere los archivos iniciales
    await new Promise(resolve => setTimeout(resolve, 333));
    
    // Verificar que los archivos se hayan creado
    let allFilesExist = true;
    for (let i = 0; i < RTSP_URLS.length; i++) {
      const m3u8Path = path.join(HLS_DIR, `cam${i + 1}.m3u8`);
      if (!fs.existsSync(m3u8Path)) {
        console.error(`[Cámaras] Archivo no encontrado: ${m3u8Path}`);
        allFilesExist = false;
      } else {
        console.log(`[Cámaras] Archivo creado correctamente: ${m3u8Path}`);
      }
    }
    
    if (!allFilesExist) {
      console.error('[Cámaras] No todos los archivos .m3u8 se crearon correctamente');
    }

    isStreaming = true;
    global.isStreaming = true;
    
    console.log('[Cámaras] Todas las cámaras iniciadas, configurando temporizador...');
    startRestartTimer();
    
    return { 
      message: 'Transmisiones iniciadas para todas las cámaras',
      filesCreated: allFilesExist 
    };
  } catch (error) {
    console.error('[Cámaras] Error al iniciar transmisiones:', error);
    return { message: 'Error al iniciar las transmisiones', error: error.message };
  }
};

export default async function handler(req, res) {
  try {
    const result = await startStreaming();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar las transmisiones', error: error.message });
  }
}

export const cleanupHandler = (req, res) => {
  // Cancelar temporizador si existe (tanto local como global)
  if (restartTimer || global.restartTimer) {
    if (restartTimer) clearInterval(restartTimer);
    if (global.restartTimer) clearInterval(global.restartTimer);
    
    restartTimer = null;
    global.restartTimer = null;
    isRestartTimerActive = false;
    global.isRestartTimerActive = false;
  }
  
  killFfmpegProcesses();
  clearHlsDirectory();
  isStreaming = false;
  global.isStreaming = false;
  console.log('[Cámaras] Recursos limpiados correctamente');
  
  if (res) {
    res.status(200).json({ message: 'Recursos limpiados correctamente' });
  }
};

process.on('SIGTERM', () => {
  console.log('[Cámaras] Recibida señal SIGTERM, limpiando recursos...');
  if (restartTimer) {
    clearInterval(restartTimer);
    isRestartTimerActive = false;
  }
  killFfmpegProcesses();
  process.exit();
});

process.on('SIGINT', () => {
  console.log('[Cámaras] Recibida señal SIGINT, limpiando recursos...');
  if (restartTimer) {
    clearInterval(restartTimer);
    isRestartTimerActive = false;
  }
  killFfmpegProcesses();
  process.exit();
});