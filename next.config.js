/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export', // Para generar sitio estático
  trailingSlash: true, // Para compatibilidad con hosting estático
  images: {
    unoptimized: true, // Necesario para export estático
  },
  // Configuración para demo estática
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  // Deshabilitar optimizaciones que requieren servidor
  experimental: {
    esmExternals: false,
  },
};

module.exports = nextConfig;