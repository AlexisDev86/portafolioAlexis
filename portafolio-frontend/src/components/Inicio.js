'use client';
import {useEffect, useState} from 'react';
import Image from 'next/image';
import {FaGithub, FaLinkedin} from 'react-icons/fa';

export default function Hero() {
    const [animationReady, setAnimationReady] = useState(false);
    const fullName = "GALLARDO";

    // Aplicar animación después de que el componente se monte
    useEffect(() => {
        // Pequeño retraso para asegurar que el componente está completamente montado
        const timer = setTimeout(() => {
            setAnimationReady(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
            {/* Imagen de fondo con prioridad para mejorar LCP */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/img/desktop1.jpg"
                    alt="Escritorio de trabajo con pantallas de código"
                    fill
                    className="object-cover object-center"
                    priority={true}
                    sizes="100vw"
                />
            </div>

            {/* Overlay para mejorar legibilidad */}
            <div className="absolute inset-0 bg-black/50 z-0"></div>

            {/* Contenido principal */}
            <div className="container mx-auto px-4 md:px-12 relative z-10">
                <div className="max-w-3xl">
                    <h2 className="text-primary-blue text-4xl md:text-6xl font-light mb-2 animate-fadeIn">
                        ALEXIS
                    </h2>

                    <h1 className="text-white text-6xl md:text-8xl font-bold mb-4 flex items-end">
                      <span className={`inline-block ${animationReady ? 'animate-typewriter' : ''}`}>
                        {fullName}
                      </span>
                        <span
                            className={`inline-block bg-white ${animationReady ? 'animate-cursor' : 'opacity-0'}`}
                            style={{
                                height: '8px',
                                width: '28px',
                                marginLeft: '2px',
                                marginBottom: '18px' // Ajusta para alinear con la línea base del texto
                            }}
                        ></span>
                    </h1>
                    <h3 className="text-yellow-400 text-2xl md:text-4xl font-medium mb-8 animate-slideUp"
                        style={{animationDelay: '1.2s'}}>
                        Ingeniero Informático
                    </h3>

                    <div className="flex flex-wrap gap-4 mb-10 animate-slideUp" style={{animationDelay: '1.5s'}}>
                        <a href="#proyectos"
                           className="px-8 py-3 bg-primary-blue text-white font-medium rounded-md hover:bg-primary-blue/90 transition-all hover:shadow-lg hover:shadow-primary-blue/30 transform hover:-translate-y-1">
                            Ver Proyectos
                        </a>
                        <a href="#contacto"
                           className="px-8 py-3 border-2 border-yellow-400 text-yellow-400 font-medium rounded-md hover:bg-yellow-400/10 transition-all hover:shadow-lg hover:shadow-yellow-400/30 transform hover:-translate-y-1">
                            Contáctame
                        </a>
                    </div>

                    <div className="flex space-x-4 animate-slideUp" style={{animationDelay: '1.8s'}}>
                        <a href="https://github.com/AlexisDev86" target="_blank" rel="noopener noreferrer"
                           className="text-white hover:text-primary-blue transition-colors text-3xl">
                            <FaGithub/>
                        </a>
                        <a href="https://www.linkedin.com/in/alexis-gallardo-6a895520b/" target="_blank"
                           rel="noopener noreferrer"
                           className="text-white hover:text-primary-blue transition-colors text-3xl">
                            <FaLinkedin/>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}