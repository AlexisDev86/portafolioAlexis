// app/layout.js (NO se incluye 'use client' aquí)
import {Poppins} from 'next/font/google';
import {Analytics} from '@vercel/analytics/react';
import MainLayout from './MainLayout';
import './globals.css';

// Optimización de fuentes
const poppins = Poppins({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    display: 'swap',
    variable: '--font-poppins',
});

//Para mejorar SEO
export const metadata = {
    title: {
        default: 'Alexis Gallardo | Desarrollo Web y Software',
        template: '%s | Alexis Gallardo'
    },
    description: 'Explora el portafolio de Alexis Gallardo, ingeniero informático con experiencia en desarrollo web, aplicaciones y software. Especialista en tecnologías modernas como Next.js, Django y React.',
    keywords: [
        'Ingeniero Informático',
        'Desarrollo Web',
        'Desarrollo de Software',
        'Aplicaciones Web',
        'Páginas Web Profesionales',
        'Desarrollador Full Stack',
        'Next.js',
        'React.js',
        'Django',
        'APIs',
        'Backend',
        'Frontend',
        'SEO',
        'Vercel',
        'JavaScript',
        'Python'
    ],
    // Añadir metadatos de Open Graph
    openGraph: {
        type: 'website',
        locale: 'es_ES',
        url: 'https://www.alexisgallardo.dev/',
        siteName: 'Alexis Gallardo | Desarrollo Web',
        title: 'Alexis Gallardo | Desarrollo Web y Software',
        description: 'Explora el portafolio de Alexis Gallardo, ingeniero informático con experiencia en desarrollo web, aplicaciones y software.',
        images: [
            {
                url: 'https://www.alexisgallardo.dev/img/og-image.jpg', // Crea esta imagen para compartir en redes
                width: 1004,
                height: 590,
                alt: 'Alexis Gallardo - Desarrollador Web',
            },
        ],
    },
    // Añadir metadatos para Twitter Cards
    twitter: {
        card: 'summary_large_image',
        title: 'Alexis Gallardo | Desarrollo Web y Software',
        description: 'Desarrollo web profesional y aplicaciones a medida',
        images: ['https://www.alexisgallardo.dev/img/og-image.jpg'],
    },
    // Añadir verificación de robots
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
        },
    },
    // Añadir canonical URL
    canonical: 'https://www.alexisgallardo.dev/',
};

export default function RootLayout({children}) {
    return (
        <html lang="es" className={poppins.variable}>
        <head>
            {/* Preload de imagen LCP para mejorar rendimiento */}
            {/*}
            <link
                href="https://res.cloudinary.com/dsmybis3w/image/upload/f_auto,q_auto/v1743591288/desktop1_xe6bkn.webp"
                as="image"
                type="image/webp"
                importance="high"
                media="(min-width: 320px)"
            />
            */}

            {/* Favicon y Apple Touch Icon */}
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
            <link rel="manifest" href="/site.webmanifest"/>
            <link rel="shortcut icon" href="/favicon.ico"/>
            <meta name="theme-color" content="#000000"/>
        </head>
        <body className="min-h-screen bg-dark-bg text-white scroll-smooth">
        <MainLayout>{children}</MainLayout>
        <Analytics/>
        </body>
        </html>
    );
}