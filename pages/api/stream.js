// stream.js
import ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import fs from 'fs';

const RTSP_URLS = [
  process.env.NEXT_PUBLIC_CAM1,
  process.env.NEXT_PUBLIC_CAM2,
  process.env.NEXT_PUBLIC_CAM3,
].filter(Boolean); // Filtra valores nulos o undefined

const HLS_DIR = path.join(process.cwd(), 'public', 'hls');

const ffmpegProcesses = [];
let isStreaming = false;

// Función para limpiar el directorio HLS
const clearHlsDirectory = () => {
  if (fs.existsSync(HLS_DIR)) {
    const files = fs.readdirSync(HLS_DIR);
    files.forEach((file) => {
      const filePath = path.join(HLS_DIR, file);
      try {
        fs.unlinkSync(filePath);
        console.log(`Archivo eliminado: ${filePath}`);
      } catch (error) {
        console.error(`Error al eliminar el archivo ${filePath}:`, error);
      }
    });
    console.log("Todos los archivos de la carpeta hls han sido eliminados.");
  } else {
    console.log("La carpeta hls no existe. No hay archivos para eliminar.");
  }
};

// Limpiar el directorio HLS al iniciar el servidor
if (!fs.existsSync(HLS_DIR)) {
  fs.mkdirSync(HLS_DIR, { recursive: true });
} else {
  clearHlsDirectory(); // Limpiar el directorio solo al iniciar el servidor
}

const killFfmpegProcesses = () => {
  ffmpegProcesses.forEach((process) => {
    try {
      process.kill('SIGKILL');
      console.log(`Proceso FFmpeg terminado: ${process.ffmpegProc.pid}`);
    } catch (error) {
      console.error(`Error al terminar el proceso FFmpeg: ${error}`);
    }
  });
  ffmpegProcesses.length = 0;
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
      ])
      .on('start', (cmdline) => {
        console.log(`FFmpeg started for ${outputFile} with command:`, cmdline);
        console.log(`Archivos HLS se generarán en: ${HLS_DIR}`);
        resolve(command); // Resuelve la promesa cuando FFmpeg inicia
      })
      .on('progress', (progress) => {
        console.log(`Processing ${outputFile}:`, progress);
      })
      .on('error', (err) => {
        console.error(`FFmpeg error for ${outputFile}:`, err);
        reject(err); // Rechaza la promesa en caso de error
      })
      .on('end', () => {
        console.log(`FFmpeg finished processing for ${outputFile}`);
      });

    ffmpegProcesses.push(command);
    command.run();
  });
};

export default async function handler(req, res) {
  if (isStreaming) {
    console.log("USUARIO YA MIRANDO, ME SUMO");
    return res.status(200).json({ message: 'Las transmisiones ya están en curso' });
  }

  isStreaming = true;

  try {
    // Verificar si los archivos HLS ya existen
    const filesExist = RTSP_URLS.every((_, index) => {
      const outputFile = `cam${index + 1}.m3u8`;
      return fs.existsSync(path.join(HLS_DIR, outputFile));
    });

    if (!filesExist) {
      killFfmpegProcesses();

      // Iniciar transmisiones en secuencia
      for (let i = 0; i < RTSP_URLS.length; i++) {
        const outputFile = `cam${i + 1}.m3u8`;
        await startStream(RTSP_URLS[i], outputFile); // Espera a que cada transmisión se inicie
      }
    }

    res.status(200).json({ message: 'Transmisiones iniciadas para todas las cámaras' });
  } catch (error) {
    console.error("Error al iniciar las transmisiones:", error);
    res.status(500).json({ message: 'Error al iniciar las transmisiones' });
  }
}

// Endpoint para limpiar recursos
export const cleanupHandler = (req, res) => {
  killFfmpegProcesses();
  clearHlsDirectory();
  isStreaming = false;
  res.status(200).json({ message: 'Recursos limpiados correctamente' });
};

process.on('SIGTERM', () => {
  killFfmpegProcesses();
  process.exit();
});

process.on('SIGINT', () => {
  killFfmpegProcesses();
  process.exit();
});