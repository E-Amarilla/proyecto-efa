/** @type {import('next').NextConfig} */

const nextConfig = {
  async redirects() {
      return [
          {
              source: '/', // Ruta de origen (raíz)
              destination: '/login', // Ruta de destino
              permanent: true, // Indica si es una redirección permanente (true) o temporal (false)
          }
      ];
  },
  productionBrowserSourceMaps: false, // Desactiva los source maps en producción
};

module.exports = nextConfig;
