'use client';

import {useEffect, useState} from 'react';
import Link from 'next/link';

export default function MainLayout({children}) {
    // Estado para el menú móvil
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Estado para visibilidad del botón de WhatsApp
    const [isWhatsAppVisible, setIsWhatsAppVisible] = useState(false);

    // Función para navegación por scroll
    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({behavior: 'smooth'});
            // Cerrar menú móvil si está abierto
            if (isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
            }
        }
    };

    // Toggle para el menú móvil
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Efecto para mostrar/ocultar botón de WhatsApp basado en scroll
    useEffect(() => {
        const handleScroll = () => {
            // Mostrar después de 300px de scroll
            if (window.scrollY > 300) {
                setIsWhatsAppVisible(true);
            } else {
                setIsWhatsAppVisible(false);
            }
        };

        // Agregar event listener
        window.addEventListener('scroll', handleScroll);

        // Limpiar event listener
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Secciones de navegación
    const navItems = [
        {name: 'Inicio', sectionId: 'home'},
        {name: 'Sobre Mí', sectionId: 'sobre-mi'},
        {name: 'Habilidades', sectionId: 'habilidades'},
        {name: 'Proyectos', sectionId: 'proyectos'},
        {name: 'Servicios', sectionId: 'servicios'},
        {name: 'Contacto', sectionId: 'contacto'}
    ];

    return (
        <>
            {/* Header */}
            <header className="bg-dark text-white py-4 fixed top-0 left-0 w-full z-50 shadow-md">
                <div className="container mx-auto px-6 md:px-8">
                    <div className="flex justify-between items-center">
                        {/* Logo con estilo mejorado */}
                        <Link
                            href="/"
                            className="flex items-center transition-transform hover:scale-105 duration-300"
                        >
                            <div
                                className="logo-graphic w-8 h-8 bg-gradient-to-br from-python-yellow to-python-yellow/70 rounded-lg flex items-center justify-center transform -rotate-3 shadow-md shadow-python-yellow/20 mr-1.5">
                                <span className="text-dark font-bold text-lg">A</span>
                            </div>
                            <span className="font-semibold text-xl tracking-wide text-python-yellow">
                                  .Gallardo
                            </span>
                        </Link>

                        {/* Menú para escritorio */}
                        <nav className="hidden md:block">
                            <ul className="flex space-x-8">
                                {navItems.map((item) => (
                                    <li key={item.sectionId}>
                                        <button
                                            onClick={() => scrollToSection(item.sectionId)}
                                            className="hover:text-python-yellow transition-colors"
                                        >
                                            {item.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        {/* Botón de toggle para menú móvil */}
                        <button
                            className="md:hidden z-50"
                            onClick={toggleMobileMenu}
                            aria-label="Menú Navegación"
                            aria-expanded={isMobileMenuOpen}
                        >
                            {isMobileMenuOpen ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16m-7 6h7"
                                    />
                                </svg>
                            )}
                        </button>

                        {/* Menú para móvil */}
                        {isMobileMenuOpen && (
                            <nav
                                className="
                                  fixed
                                  inset-0
                                  bg-dark/95
                                  backdrop-blur-sm
                                  z-40
                                  flex
                                  flex-col
                                  items-center
                                  justify-center
                                  space-y-6
                                  p-4
                                "
                            >
                                {/* Botón para cerrar el menú, más visible */}
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="absolute top-6 right-6 text-white hover:text-python-yellow p-2"
                                    aria-label="Cerrar menú"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M6 18L18 6M6 6l12 12"/>
                                    </svg>
                                </button>

                                {/* Título del menú */}
                                <div className="mb-6">
                                    <h2 className="text-white text-xl font-semibold">Navegación</h2>
                                    <div className="h-1 w-16 bg-python-yellow mx-auto mt-2"></div>
                                </div>

                                <ul className="text-center space-y-6 w-full max-w-xs">
                                    {navItems.map((item) => (
                                        <li key={item.sectionId}>
                                            <button
                                                onClick={() => {
                                                    scrollToSection(item.sectionId);
                                                    setIsMobileMenuOpen(false); // Cierra el menú al hacer clic
                                                }}
                                                className="
                                                  w-full
                                                  text-xl
                                                  text-white
                                                  py-3
                                                  px-6
                                                  rounded-lg
                                                  flex
                                                  items-center
                                                  justify-center
                                                  transition-all
                                                  hover:bg-gray-800
                                                  hover:text-python-yellow
                                                  active:scale-95
                                                "
                                            >
                                                {/* Puedes añadir iconos si los tienes */}
                                                <span>{item.name}</span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        )}
                    </div>
                </div>
            </header>

            {/* Contenido principal */}
            <main className="scroll-smooth pt-16">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-dark-bg-900 text-white py-8">
                <div className="container mx-auto px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Columna 1: Logo y descripción */}
                        <div>
                            {/* Logo actualizado en el footer */}
                            <div className="flex items-center mb-4">
                                <div
                                    className="logo-graphic w-7 h-7 bg-gradient-to-br from-python-yellow to-python-yellow/70 rounded-lg flex items-center justify-center transform -rotate-3 shadow-md shadow-python-yellow/20 mr-1.5">
                                    <span className="text-dark font-bold text-base">A</span>
                                </div>
                                <h3 className="text-xl font-semibold text-python-yellow tracking-wide">.Gallardo</h3>
                            </div>
                            <p className="text-gray-400 mb-4">
                                Ingeniero Informático especializado en desarrollo de aplicaciones web y soluciones
                                empresariales.
                            </p>
                        </div>

                        {/* Columna 2: Enlaces rápidos */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
                            <ul className="space-y-2">
                                {navItems.map((item) => (
                                    <li key={item.sectionId}>
                                        <button
                                            onClick={() => scrollToSection(item.sectionId)}
                                            className="text-gray-400 hover:text-python-yellow transition-colors"
                                        >
                                            {item.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Columna 3: Contacto */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li>Puerto Montt, Chile</li>
                                <li>desarrollowebservicios@gmail.com</li>
                            </ul>

                            {/* Redes sociales */}
                            <div className="flex space-x-4 mt-4">
                                <a
                                    href="https://github.com/AlexisDev86"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Visitar mi perfil en GitHub"
                                    className="text-gray-400 hover:text-python-yellow"
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd"
                                              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                              clipRule="evenodd"/>
                                    </svg>
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/alexis-gallardo-6a895520b/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Visitar mi perfil en Linkedin"
                                    className="text-gray-400 hover:text-python-yellow"
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path
                                            d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-300">
                        <p>&copy; {new Date().getFullYear()} Alexis Gallardo. Todos los derechos reservados.</p>
                    </div>
                </div>
            </footer>

            {/* Botón de WhatsApp */}
            <a
                href="https://wa.me/56992433256?text=Hola,%20estoy%20interesado%20en%20tus%20servicios"
                target="_blank"
                rel="noopener noreferrer"
                className={`fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center ${
                    isWhatsAppVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
                }`}
                aria-label="Contactar por WhatsApp"
            >
                {/* Icono de WhatsApp */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="w-7 h-7 fill-current"
                >
                    <path
                        d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                </svg>

                {/* Texto opcional que se muestra en pantallas más grandes */}
                <span className="ml-2 hidden md:inline">Chatea conmigo</span>
            </a>
        </>
    );
}