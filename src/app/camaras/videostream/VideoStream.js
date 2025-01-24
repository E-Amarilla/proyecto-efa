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
  const { streamInitialized } = useContext(AuthContext);

  useEffect(() => {
    const checkHlsFiles = async () => {
      try {
        // Verificar si el archivo .m3u8 existe
        const m3u8Response = await fetch(`/hls/${cameraId}.m3u8`, { method: "HEAD" });

        if (m3u8Response.ok) {
          // Verificar si existe algún archivo .ts para esta cámara
          const tsFilesResponse = await fetch(`/hls/${cameraId}.m3u8`);
          const tsFilesText = await tsFilesResponse.text();
          const tsFiles = tsFilesText.split("\n").filter(line => line.endsWith(".ts"));

          if (tsFiles.length > 0) {
            console.log(`Archivos HLS disponibles para ${cameraId}. Configurando reproductor...`);
            setIsLoading(false);
            setShowPlayer(true);
            setError(null);
          } else {
            console.log(`No se encontraron archivos .ts para ${cameraId}. Reintentando...`);
            setTimeout(checkHlsFiles, 2000);
          }
        } else {
          console.log(`Archivo .m3u8 no disponible para ${cameraId}. Reintentando...`);
          setTimeout(checkHlsFiles, 2000);
        }
      } catch (error) {
        console.error(`Error al verificar los archivos HLS para ${cameraId}:`, error);
        setTimeout(checkHlsFiles, 2000);
      }
    };

    if (streamInitialized) {
      checkHlsFiles();
    }
  }, [streamInitialized, cameraId]);

  useEffect(() => {
    if (showPlayer && videoRef.current) {
      const player = videojs(videoRef.current, {
        controls: false,
        autoplay: true,
        muted: true,
        sources: [
          {
            src: `/hls/${cameraId}.m3u8`,
            type: "application/x-mpegURL",
          },
        ],
        liveui: false,
      });

      player.on("bufferupdate", () => {
        const bufferEnd = player.bufferedEnd();
        const currentTime = player.currentTime();

        if (bufferEnd - currentTime > 15) {
          player.tech_.clearBuffer_();
          console.log("Buffer antiguo eliminado");
          player.tech_.setCurrentTime(currentTime);
        }
      });

      player.on("error", () => {
        console.error("Error en el reproductor de Video.js");
        setError("Error al cargar la transmisión. Intenta recargar la página.");
      });

      return () => {
        player.dispose();
      };
    }
  }, [showPlayer, cameraId]);

  const reloadStream = () => {
    setIsLoading(true);
    setError(null);
    setShowPlayer(false);
  };

  return (
    <div style={{ flex: '1 1 30%', minWidth: isFullScreen ? '100%' : '300px', pointerEvents: 'none' }}>
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
          <div data-vjs-player>
            <video
              ref={videoRef}
              className="video-js vjs-default-skin"
              style={{ width: "100%", height: isFullScreen ? "90vh" : "auto", backgroundColor: "transparent", borderRadius: "15px" }}
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
    marginTop: "15vh",
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