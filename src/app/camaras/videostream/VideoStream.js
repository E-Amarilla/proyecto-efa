// VideoStream.js
"use client";

import React, { useEffect, useRef, useState, useContext } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import AuthContext from "../../context/AuthContext";
import style from "../camaras.module.css";

const VideoStream = ({ cameraId, isFullScreen = false }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showPlayer, setShowPlayer] = useState(false);
  const [error, setError] = useState(null);
  const { streamInitialized, streamRestartSequence } = useContext(AuthContext);

  // Efecto para reiniciar el stream cuando cambia la secuencia de reinicio
  useEffect(() => {
    if (streamRestartSequence > 0) {
      console.log(`[Cámara ${cameraId}] Reiniciando reproductor debido a reinicio de streams (secuencia: ${streamRestartSequence})`);
      reloadStream();
    }
  }, [streamRestartSequence, cameraId]);
  
  // En el useEffect de verificación de archivos
  useEffect(() => {
    const checkHlsFiles = async () => {
      try {
        console.log(`[Cámara ${cameraId}] Verificando archivos...`);
        
        // Verificar si el archivo .m3u8 existe
        const m3u8Response = await fetch(`/hls/${cameraId}.m3u8`, { 
          method: "HEAD",
          cache: "no-cache",
          headers: {
            'Pragma': 'no-cache',
            'Cache-Control': 'no-cache, no-store, must-revalidate'
          }
        });
  
        if (m3u8Response.ok) {
          // Verificar si existe algún archivo .ts para esta cámara
          const tsFilesResponse = await fetch(`/hls/${cameraId}.m3u8`, {
            cache: "no-cache",
            headers: {
              'Pragma': 'no-cache',
              'Cache-Control': 'no-cache, no-store, must-revalidate'
            }
          });
          
          const tsFilesText = await tsFilesResponse.text();
          const tsFiles = tsFilesText.split("\n").filter(line => line.endsWith(".ts"));
  
          console.log(`[Cámara ${cameraId}] Archivos TS encontrados: ${tsFiles.length}`);
  
          if (tsFiles.length > 0) {
            setIsLoading(false);
            setShowPlayer(true);
            setError(null);
          } else {
            console.log(`[Cámara ${cameraId}] No hay archivos TS, reintentando...`);
            setTimeout(checkHlsFiles, 2000);
          }
        } else {
          console.log(`[Cámara ${cameraId}] M3U8 no encontrado (${m3u8Response.status}), reintentando...`);
          setTimeout(checkHlsFiles, 2000);
        }
      } catch (error) {
        console.error(`[Cámara ${cameraId}] Error:`, error);
        setTimeout(checkHlsFiles, 2000);
      }
    };
  
    if (streamInitialized) {
      // Iniciar la verificación después de un breve retraso cuando sea por reinicio
      const delay = streamRestartSequence > 0 ? 2000 : 0;
      setTimeout(checkHlsFiles, delay);
    }
  }, [streamInitialized, cameraId, streamRestartSequence]); // Añadir streamRestartSequence como dependencia

  useEffect(() => {
    if (showPlayer && videoRef.current) {
      // Limpiar el reproductor anterior si existe
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }

      const player = videojs(videoRef.current, {
        controls: false,
        autoplay: true,
        muted: true,
        sources: [
          {
            // Añadir parámetro para evitar caché
            src: `/hls/${cameraId}.m3u8?v=${streamRestartSequence || 0}`,
            type: "application/x-mpegURL",
          },
        ],
        liveui: false,
      });
      
      // Guardar la referencia al reproductor
      playerRef.current = player;

      player.on("bufferupdate", () => {
        const bufferEnd = player.bufferedEnd();
        const currentTime = player.currentTime();

        if (bufferEnd - currentTime > 15) {
          player.tech_.clearBuffer_();
          player.tech_.setCurrentTime(currentTime);
        }
      });

      player.on("error", () => {
        setError("Error al cargar la transmisión. Intenta recargar la página.");
      });

      return () => {
        if (playerRef.current) {
          playerRef.current.dispose();
          playerRef.current = null;
        }
      };
    }
  }, [showPlayer, cameraId, streamRestartSequence]);

  const reloadStream = () => {
    console.log(`[Cámara ${cameraId}] Reiniciando reproductor...`);
    
    // Si hay un reproductor activo, limpiarlo primero
    if (playerRef.current) {
      try {
        playerRef.current.dispose();
        playerRef.current = null;
      } catch (error) {
        console.error(`[Cámara ${cameraId}] Error al destruir reproductor:`, error);
      }
    }
    
    setIsLoading(true);
    setError(null);
    setShowPlayer(false);
  };

return (
    <div style={{ 
      width: '100%', 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      pointerEvents: 'none' 
    }}>
      {error && (
        <div style={styles.errorContainer}>
          <p>{error}</p>
          <button onClick={reloadStream} style={styles.reloadButton}>
            Recargar
          </button>
        </div>
      )}
      {isLoading && (
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <p>Conectando a la cámara...</p>
        </div>
      )}
      {showPlayer && (
        <div className={style.contenedorVideo}>
          <div data-vjs-player style={{ 
            width: '100%', 
            height: '100%',
            overflow: 'hidden' // Añadido para evitar que se vea contenido fuera del área
          }}>
            <video
              ref={videoRef}
              className="video-js vjs-default-skin"
              style={{ 
                width: "100%", 
                height: isFullScreen ? "90vh" : "100%", 
                objectFit: "cover", // Volvemos a "cover" para eliminar los bordes negros
                backgroundColor: "#131313", // Mismo color que el fondo
                borderRadius: "10px"
              }}
            >
              <p>Tu navegador no soporta el elemento de video.</p>
            </video>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  errorContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffebee",
    color: "#c62828",
    padding: "10px",
    borderRadius: "4px",
    marginBottom: "10px",
  },
  reloadButton: {
    marginTop: "10px",
    padding: "5px 10px",
    backgroundColor: "#c62828",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  loadingContainer: {
    display: "flex",
    marginTop: "10vh",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "200px",
    color: "#8c8c8c",
  },
  spinner: {
    border: "4px solid rgba(0, 0, 0, 0.1)",
    borderTop: "4px solid #333",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    animation: "spin 1s linear infinite",
  },
};

export default VideoStream;