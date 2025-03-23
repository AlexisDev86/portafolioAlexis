/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuraciones adicionales si son necesarias
  webpack: (config, { isServer }) => {
    // Configuración personalizada de webpack si se requiere
    return config;
  }
};

export default nextConfig;
