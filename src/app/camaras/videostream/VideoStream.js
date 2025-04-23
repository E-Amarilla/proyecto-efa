"use client";

import React from "react";

const VideoStream = ({ cameraId }) => {
  // Mapeo de cameraId a rutas de videos
  const videoSources = {
    cam1: "/videos/video1.mp4",
    cam2: "/videos/video2.mp4",
    cam3: "/videos/video3.mp4",
  };

  return (
    <div style={{ 
      width: '100%',
      height: '100%',
      position: 'relative'
    }}>
      <video
        src={videoSources[cameraId]}
        autoPlay
        muted
        loop
        playsInline
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%', 
          height: '100%', 
          borderRadius: '15px',
          objectFit: 'fill'
        }}
      >
        Tu navegador no soporta el elemento de video.
      </video>
    </div>
  );
};

export default VideoStream;