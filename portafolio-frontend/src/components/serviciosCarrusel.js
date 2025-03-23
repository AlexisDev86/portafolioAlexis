"use client"
import {useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {EffectCoverflow, Navigation, Pagination} from 'swiper/modules';
import {FaCogs, FaGlobe, FaPalette, FaShoppingCart, FaTools} from 'react-icons/fa';

// Importa los estilos de Swiper
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const ServiciosCarousel = () => {
    const [activeServiceIndex, setActiveServiceIndex] = useState(0);

    // Array con los servicios
    const servicios = [
        {
            id: 1,
            titulo: "Sitios Web Profesionales",
            descripcion: "Diseño y desarrollo de sitios web personalizados que destacan tu marca y conectan con tu audiencia objetivo.",
            icono: <FaGlobe className="w-14 h-14"/>,
            detalles: [
                "Diseño web adaptado a tu identidad de marca",
                "Experiencia de usuario intuitiva y moderna",
                "Optimización para móviles y tablets",
                "Rápidos tiempos de carga y alto rendimiento",
                "Integración con redes sociales y herramientas de marketing"
            ]
        },
        {
            id: 2,
            titulo: "Tiendas Online",
            descripcion: "Creación de tiendas virtuales que convierten visitantes en clientes, con gestión de productos y pagos seguros.",
            icono: <FaShoppingCart className="w-14 h-14"/>,
            detalles: [
                "Catálogo de productos atractivo y funcional",
                "Proceso de compra simplificado",
                "Múltiples opciones de pago integradas",
                "Gestión de inventario y pedidos",
                "Estrategias de venta cruzada y upselling"
            ]
        },
        {
            id: 3,
            titulo: "Aplicaciones Web Personalizadas",
            descripcion: "Desarrollo de aplicaciones a medida que automatizan procesos y mejoran la eficiencia de tu negocio.",
            icono: <FaCogs className="w-14 h-14"/>,
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
            titulo: "Identidad Visual",
            descripcion: "Creación de una identidad de marca coherente que comunica tu visión y valores de forma efectiva.",
            icono: <FaPalette className="w-14 h-14"/>,
            detalles: [
                "Diseño de logo y elementos de marca",
                "Paleta de colores y tipografía coherente",
                "Material gráfico para redes sociales",
                "Guía de estilo para tu marca",
                "Diseños adaptados a diferentes plataformas"
            ]
        },
        {
            id: 5,
            titulo: "Mantenimiento y Soporte",
            descripcion: "Servicios continuos para mantener tu presencia digital actualizada, segura y funcionando de manera óptima.",
            icono: <FaTools className="w-14 h-14"/>,
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
                            className="relative flex flex-col items-center px-6 py-14 bg-gray-800/70 rounded-xl backdrop-blur-sm transition-all duration-300 h-full">
                            {/* Icono */}
                            <div
                                className="mb-8 p-6 bg-gradient-to-br from-primary-blue/20 to-primary-blue/10 rounded-full shadow-lg shadow-primary-blue/20 transform transition-all duration-500 hover:scale-110 icon-container">
                                {servicio.icono}
                            </div>

                            {/* Contenido */}
                            <h3 className="text-2xl font-semibold mb-4 text-white text-center">{servicio.titulo}</h3>
                            <p className="text-gray-300 text-center max-w-xs mx-auto leading-relaxed mb-6">{servicio.descripcion}</p>

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
    );
};

export default ServiciosCarousel;