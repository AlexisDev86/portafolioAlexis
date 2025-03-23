// app/layout.js (NO se incluye 'use client' aquí)
import {Poppins} from 'next/font/google';
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
        default: 'Alexis Gallardo | Ingeniero Informático',
        template: '%s | Alexis Gallardo'
    },
    description: 'Portafolio profesional de Alexis Gallardo, Ingeniero Informático especializado en desarrollo web y aplicaciones.',
    keywords: [
        'Ingeniero Informático',
        'Desarrollo Web',
        'Desarrollo de Aplicaciones',
        'Python',
        'React',
        'Next.js'
    ],
};

export default function RootLayout({children}) {
    return (
        <html lang="es" className={poppins.variable}>
        <body className="min-h-screen bg-dark text-white scroll-smooth">
        <MainLayout>{children}</MainLayout>
        </body>
        </html>
    );
}