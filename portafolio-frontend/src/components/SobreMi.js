// Componente mejorado para la sección SobreMi
'use client'
import {useEffect, useRef, useState} from 'react';
import {FaEnvelope, FaMapMarkerAlt} from 'react-icons/fa';
import Image from "next/image";

const SobreMi = () => {
    const [mousePosition, setMousePosition] = useState({x: 0, y: 0});
    const imageRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    // Efecto para detectar cuando el elemento está visible
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            {threshold: 0.1}
        );

        if (imageRef.current) {
            observer.observe(imageRef.current);
        }

        return () => {
            if (imageRef.current) {
                observer.disconnect();
            }
        };
    }, []);

    // Manejador de movimiento del ratón para el efecto parallax
    const handleMouseMove = (e) => {
        if (!imageRef.current) return;

        const {left, top, width, height} = imageRef.current.getBoundingClientRect();
        const x = ((e.clientX - left) / width) - 0.5;
        const y = ((e.clientY - top) / height) - 0.5;

        setMousePosition({x, y});
    };

    return (
        <section id="sobre-mi" className="min-h-screen bg-dark py-16" onMouseMove={handleMouseMove}>
            <div className="container mx-auto px-4">
                <h2 className="text-5xl font-bold mb-8 text-center relative">
          <span className="relative inline-block">
            <span
                className="absolute -inset-1 blur-md bg-gradient-to-r from-transparent via-python-yellow/20 to-transparent rounded-lg"></span>
            <span
                className="relative text-transparent bg-clip-text bg-gradient-to-r from-white via-python-yellow to-white">SOBRE MÍ</span>
          </span>
                </h2>

                <p className="text-xl text-gray-400 mb-12 text-center max-w-3xl mx-auto">
                    Desarrollador Web
                </p>

                <div className="flex flex-col lg:flex-row items-center gap-12 max-w-6xl mx-auto">
                    {/* Contenido textual con animación de entrada */}
                    <div
                        className={`lg:w-3/5 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                        <p className="text-gray-300 mb-6 leading-relaxed text-lg">
                            Apasionado por el aprendizaje constante y el desarrollo tecnológico, con el propósito de
                            acercar soluciones digitales a emprendedores,
                            profesionales independientes y pequeños negocios en crecimiento.
                            Mi mayor motivación es transformar conocimientos técnicos en herramientas prácticas que
                            impulsen a otros a crecer, innovar y alcanzar sus objetivos.
                        </p>

                        <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                            Actualmente, trabajo con la visión de crear una agencia de desarrollo que ayude a nivelar el
                            campo tecnológico para quienes más lo necesitan:
                            aquellos que sueñan con emprender o hacer crecer su negocio, pero no siempre tienen acceso a
                            soluciones efecientes y adaptadas a sus necesidades.
                        </p>
                        <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                            &quot;Me definen la persistencia, la curiosidad, el trabajo colaborativo y una mentalidad de
                            crecimiento continuo.
                            Siempre estoy abierto a conectar, compartir ideas y sumar valor.

                        </p>

                        {/* Información de contacto */}
                        <div className="space-y-4 mt-8">
                            <div className="flex items-center text-gray-300">
                                <FaMapMarkerAlt className="text-python-yellow mr-3"/>
                                <span>Puerto Montt, Chile</span>
                            </div>

                            <div className="flex items-center text-gray-300">
                                <FaEnvelope className="text-python-yellow mr-3"/>
                                <span>desarrollowebservicios@gmail.com</span>
                            </div>
                        </div>
                    </div>

                    {/* Imagen con efecto parallax */}
                    <div ref={imageRef}
                         className={`lg:w-2/5 max-w-md transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                        <div className="relative">
                            {/* Borde luminoso animado */}
                            <div
                                className="absolute -inset-1 rounded-xl bg-gradient-to-r from-python-yellow/50 to-primary-blue/50 blur-md"
                                style={{
                                    transform: `translateX(${mousePosition.x * -15}px) translateY(${mousePosition.y * -15}px)`,
                                    transition: 'transform 0.2s ease-out'
                                }}
                            ></div>

                            {/* Imagen principal con efecto */}
                            <Image
                                src="/img/pic.jpg"
                                alt="Alexis Gallardo"
                                width={400}
                                height={500}
                                className="relative rounded-xl z-10 grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl"
                                style={{
                                    transform: `translateX(${mousePosition.x * -8}px) translateY(${mousePosition.y * -8}px)`,
                                    transition: 'transform 0.2s ease-out',
                                    boxShadow: '0 10px 25px rgba(0,0,0,0.5), 0 0 30px rgba(247, 223, 30, 0.4)'
                                }}
                            />

                            {/* Elementos decorativos */}
                            <div
                                className="absolute -bottom-4 -left-4 w-16 h-16 border-2 border-python-yellow/40 rounded-full z-0"
                                style={{
                                    transform: `translateX(${mousePosition.x * 12}px) translateY(${mousePosition.y * 12}px)`,
                                    transition: 'transform 0.1s ease-out'
                                }}
                            ></div>

                            <div
                                className="absolute -top-4 -right-4 w-20 h-20 border-2 border-primary-blue/40 rounded-full z-0"
                                style={{
                                    transform: `translateX(${mousePosition.x * 20}px) translateY(${mousePosition.y * 20}px)`,
                                    transition: 'transform 0.1s ease-out'
                                }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SobreMi;