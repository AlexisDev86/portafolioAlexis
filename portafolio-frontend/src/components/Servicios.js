'use client';
import {useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {EffectCoverflow, Navigation, Pagination} from 'swiper/modules';
import {FaCogs, FaGlobe, FaTools} from 'react-icons/fa';

// Importa los estilos de Swiper
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function Servicios() {
    // Estado para el servicio activo en el carrusel
    const [activeServiceIndex, setActiveServiceIndex] = useState(0);

    // Lista de servicios con detalles orientados a profesionales independientes, emprendedores y organizaciones
    const servicios = [
        {
            id: 1,
            titulo: "Sitios Web Profesionales",
            descripcion: "Diseño y desarrollo de sitios web personalizados que destacan tu marca y conectan con tu audiencia objetivo.",
            icono: <FaGlobe className="w-14 h-14 text-white"/>,
            detalles: [
                "Diseño web adaptado a tu identidad de marca",
                "Experiencia de usuario intuitiva y moderna",
                "Optimización para móviles y tablets",
                "Rápidos tiempos de carga y alto rendimiento",
                "Integración con redes sociales y herramientas de marketing"
            ]
        },
        /*  {
              id: 2,
              titulo: "Tiendas Online",
              descripcion: "Creación de tiendas virtuales que convierten visitantes en clientes, con gestión de productos y pagos seguros.",
              icono: <FaShoppingCart className="w-14 h-14 text-white"/>,
              detalles: [
                  "Catálogo de productos atractivo y funcional",
                  "Proceso de compra simplificado",
                  "Múltiples opciones de pago integradas",
                  "Gestión de inventario y pedidos",
                  "Estrategias de venta cruzada y upselling"
              ]
          },*/
        {
            id: 3,
            titulo: "Aplicaciones Web Personalizadas",
            descripcion: "Desarrollo de aplicaciones a medida que automatizan procesos y mejoran la eficiencia de tu negocio.",
            icono: <FaCogs className="w-14 h-14 text-white"/>,
            detalles: [
                "CRMs y sistemas de gestión personalizados",
                "Portales para clientes y proveedores",
                "Automatización de procesos empresariales",
                "Dashboards y reportes a medida",
                "Integraciones con tus herramientas actuales"
            ]
        },
        {
            id: 4,
            titulo: "Mantenimiento y Soporte",
            descripcion: "Servicios continuos para mantener tu presencia digital actualizada, segura y funcionando de manera óptima.",
            icono: <FaTools className="w-14 h-14 text-white"/>,
            detalles: [
                "Actualizaciones periódicas de seguridad",
                "Copias de seguridad regulares",
                "Análisis de rendimiento y optimización",
                "Soporte técnico continuo",
                "Implementación de nuevas funcionalidades"
            ]
        }
    ];

    return (
        <section id="servicios" className="min-h-screen bg-dark-bg flex items-center py-20">
            <div className="container mx-auto px-4 md:px-12 lg:px-20">
                {/* Título con efecto */}
                <h2 className="text-5xl font-bold mb-10 text-center relative">
                    <span className="relative inline-block">
                        <span
                            className="absolute -inset-1 blur-md bg-gradient-to-r from-transparent via-primary-blue/20 to-transparent rounded-lg"></span>
                        <span
                            className="relative text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-white">SERVICIOS</span>
                    </span>
                </h2>

                {/* Descripción */}
                <p className="text-xl text-gray-200 mb-16 text-center max-w-3xl mx-auto">
                    Soluciones digitales para profesionales independientes, emprendedores y organizaciones
                </p>

                {/* Vista Carrusel */}
                <div className="py-6 servicios-carousel">
                    <Swiper
                        effect={'coverflow'}
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView={1.5}
                        breakpoints={{
                            640: {slidesPerView: 2},
                            768: {slidesPerView: 2.5},
                            1024: {slidesPerView: 3}
                        }}
                        coverflowEffect={{
                            rotate: 0,
                            stretch: 0,
                            depth: 200,
                            modifier: 2,
                            slideShadows: false
                        }}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true
                        }}
                        navigation={true}
                        modules={[EffectCoverflow, Pagination, Navigation]}
                        onSlideChange={(swiper) => setActiveServiceIndex(swiper.activeIndex)}
                        className="mySwiper"
                    >
                        {servicios.map((servicio, index) => (
                            <SwiperSlide key={servicio.id}>
                                <div
                                    className="relative flex flex-col items-center px-6 py-14 bg-gray-900 rounded-xl backdrop-blur-sm transition-all duration-300 h-full">
                                    {/* Icono */}
                                    <div
                                        className="mb-8 p-6 bg-gradient-to-br from-primary-blue/20 to-primary-blue/10 rounded-full shadow-lg shadow-primary-blue/20 transform transition-all duration-500 hover:scale-110 icon-container">
                                        {servicio.icono}
                                    </div>

                                    {/* Contenido */}
                                    <h3 className="text-2xl font-semibold mb-4 text-white text-center">{servicio.titulo}</h3>
                                    <p className="text-gray-200 text-center max-w-xs mx-auto leading-relaxed mb-6">{servicio.descripcion}</p>

                                    {/* Lista de detalles - Visible solo en la tarjeta activa */}
                                    <div className="mt-auto overflow-hidden transition-all duration-300">
                                        {index === activeServiceIndex && (
                                            <ul className="text-sm text-gray-400 space-y-2 list-disc pl-5 servicios-fadeIn">
                                                {servicio.detalles.map((detalle, i) => (
                                                    <li key={i} className="servicios-slideUp"
                                                        style={{animationDelay: `${i * 100}ms`}}>
                                                        {detalle}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Llamada a la acción */}
                <div className="mt-20 text-center">
                    <div
                        className="inline-block bg-gradient-to-r from-gray-800 to-gray-900 p-8 rounded-xl shadow-xl max-w-3xl">
                        <h3 className="text-2xl font-semibold mb-4 text-white">¿Listo para establecer tu presencia en la
                            web?</h3>
                        <p className="text-gray-400 mb-6">
                            Ya sea que estés iniciando tu negocio, quieras renovar tu sitio actual o necesites una
                            solución digital completa, puedo ayudarte a destacar en el mundo digital.
                        </p>
                        <a
                            href="#contacto"
                            className="inline-block px-8 py-3 bg-primary-blue text-white font-medium rounded-full hover:bg-primary-blue/90 transition-colors shadow-lg"
                        >
                            Solicita una consulta gratuita
                        </a>
                    </div>
                </div>

                {/* Sección de metodología de trabajo */}
                <div className="mt-20">
                    <h3 className="text-2xl font-semibold mb-8 text-center text-white">Cómo Trabajo Contigo</h3>
                    <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8">
                        <div className="flex-1 max-w-xs group">
                            <div className="relative">
                                <div
                                    className="w-14 h-14 rounded-full bg-primary-blue/20 flex items-center justify-center mb-4 text-xl z-10 relative shadow-md shadow-primary-blue/30 group-hover:shadow-lg group-hover:shadow-primary-blue/40 transition-all duration-300">
                                    <span className="text-white font-bold">1</span>
                                </div>
                                <div
                                    className="absolute top-7 left-7 w-full h-0.5 bg-gradient-to-r from-primary-blue/40 to-primary-blue/10 z-0 hidden md:block"></div>
                            </div>
                            <h4 className="text-lg font-medium mb-2 text-white group-hover:text-primary-blue transition-colors duration-300">Descubrimiento</h4>
                            <p className="text-gray-400 text-sm bg-gray-800/30 p-4 rounded-lg shadow-md shadow-primary-blue/10 group-hover:shadow-lg group-hover:shadow-primary-blue/20 transition-all duration-300">
                                Conocemos tu negocio, objetivos y público objetivo para crear una estrategia digital
                                efectiva.
                            </p>
                        </div>

                        <div className="flex-1 max-w-xs group">
                            <div className="relative">
                                <div
                                    className="w-14 h-14 rounded-full bg-primary-blue/20 flex items-center justify-center mb-4 text-xl z-10 relative shadow-md shadow-primary-blue/30 group-hover:shadow-lg group-hover:shadow-primary-blue/40 transition-all duration-300">
                                    <span className="text-white font-bold">2</span>
                                </div>
                                <div
                                    className="absolute top-7 left-7 w-full h-0.5 bg-gradient-to-r from-primary-blue/40 to-primary-blue/10 z-0 hidden md:block"></div>
                            </div>
                            <h4 className="text-lg font-medium mb-2 text-white group-hover:text-primary-blue transition-colors duration-300">
                                Diseño y Propuesta
                            </h4>
                            <p className="text-gray-400 text-sm bg-gray-800/30 p-4 rounded-lg shadow-md shadow-primary-blue/10 group-hover:shadow-lg group-hover:shadow-primary-blue/20 transition-all duration-300">
                                Creo un concepto visual y funcional alineado con tu marca y presupuesto.
                            </p>
                        </div>

                        <div className="flex-1 max-w-xs group">
                            <div className="relative">
                                <div
                                    className="w-14 h-14 rounded-full bg-primary-blue/20 flex items-center justify-center mb-4 text-xl z-10 relative shadow-md shadow-primary-blue/30 group-hover:shadow-lg group-hover:shadow-primary-blue/40 transition-all duration-300">
                                    <span className="text-white font-bold">3</span>
                                </div>
                                <div
                                    className="absolute top-7 left-7 w-full h-0.5 bg-gradient-to-r from-primary-blue/40 to-primary-blue/10 z-0 hidden md:block"></div>
                            </div>
                            <h4 className="text-lg font-medium mb-2 text-white group-hover:text-primary-blue transition-colors duration-300">
                                Desarrollo y Revisiones
                            </h4>
                            <p className="text-gray-400 text-sm bg-gray-800/30 p-4 rounded-lg shadow-md shadow-primary-blue/10 group-hover:shadow-lg group-hover:shadow-primary-blue/20 transition-all duration-300">
                                Construyo tu solución digital con comunicación constante y ajustes según tus
                                comentarios.
                            </p>
                        </div>

                        <div className="flex-1 max-w-xs group">
                            <div
                                className="w-14 h-14 rounded-full bg-primary-blue/20 flex items-center justify-center mb-4 text-xl shadow-md shadow-primary-blue/30 group-hover:shadow-lg group-hover:shadow-primary-blue/40 transition-all duration-300">
                                <span className="text-white font-bold">4</span>
                            </div>
                            <h4 className="text-lg font-medium mb-2 text-white group-hover:text-primary-blue transition-colors duration-300">
                                Lanzamiento y Crecimiento
                            </h4>
                            <p className="text-gray-400 text-sm bg-gray-800/30 p-4 rounded-lg shadow-md shadow-primary-blue/10 group-hover:shadow-lg group-hover:shadow-primary-blue/20 transition-all duration-300">
                                Publico tu proyecto y te apoyo con mantenimiento, marketing y estrategias de
                                crecimiento.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}