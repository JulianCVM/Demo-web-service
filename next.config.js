/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export', // Para generar sitio estático
  trailingSlash: true, // Para compatibilidad con hosting estático
  images: {
    unoptimized: true, // Necesario para export estático
    domains: ['localhost'],
  },
  // Configuración para demo estática
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  // Deshabilitar optimizaciones que requieren servidor
  experimental: {
    esmExternals: false,
  },
  // Configuración de headers para demo
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;