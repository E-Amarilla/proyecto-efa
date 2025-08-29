FROM ubuntu:22.04

# Actualiza el sistema e instala dependencias necesarias
RUN apt-get update && apt-get install -y \
    curl \
    git \
    gcc-11 \
    g++-11 \
    wget \
    xz-utils

RUN curl -sL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs

RUN wget https://github.com/BtbN/FFmpeg-Builds/releases/download/latest/ffmpeg-master-latest-linux64-gpl.tar.xz -O /tmp/ffmpeg.tar.xz \
    && tar -xvJf /tmp/ffmpeg.tar.xz -C /tmp \
    && mv /tmp/ffmpeg-master-latest-linux64-gpl/bin/ffmpeg /usr/local/bin/ \
    && mv /tmp/ffmpeg-master-latest-linux64-gpl/bin/ffplay /usr/local/bin/ \
    && mv /tmp/ffmpeg-master-latest-linux64-gpl/bin/ffprobe /usr/local/bin/

# Establecer directorio de trabajo
WORKDIR /app

# Instalar dependencias de Node.js
RUN npm install

# Copiar el código fuente de la aplicación
COPY . .

# Exponer el puerto de la aplicación (3000 por defecto)
EXPOSE 3000

# Ejecutar la aplicación
CMD ["npm", "run", "dev"]
