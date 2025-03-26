/** @type {import('next').NextConfig} */
const nextConfig = {
    // Configuración de imágenes
    images: {
        domains: ['agmzdev25.pythonanywhere.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'agmzdev25.pythonanywhere.com',
                pathname: '/media/**',
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