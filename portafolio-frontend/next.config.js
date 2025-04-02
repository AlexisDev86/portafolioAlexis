/** @type {import('next').NextConfig} */
const nextConfig = {
    // Configuración de imágenes
    images: {
        domains: [
            'agmzdev25.pythonanywhere.com',
            'res.cloudinary.com' //optimizar imagen
        ],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'agmzdev25.pythonanywhere.com',
                pathname: '/media/**',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '/**', // Permite cualquier ruta en Cloudinary
            },
        ],
    },

    // Configuraciones adicionales si son necesarias
    webpack: (config) => {
        config.optimization.minimize = true;
        return config;
    }
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);