// components/SoftSkillsCarousel.jsx
import {Swiper, SwiperSlide} from 'swiper/react';
import {EffectCoverflow, Navigation, Pagination} from 'swiper/modules';
import {FaCalendarCheck, FaComments, FaSyncAlt, FaUserFriends} from 'react-icons/fa';

// Importa los estilos de Swiper
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const SoftSkillsCarousel = ({setActiveSoftSkill}) => {
    // Array con todas las habilidades de todas las categorías
    const allSkills = [
        // Comunicación
        {
            category: 'comunicacion',
            name: 'Comunicación efectiva',
            description: 'Explico conceptos técnicos de manera clara y sencilla.',
            icon: FaComments,
            categoryName: 'Comunicación'
        },

        // Colaboración
        {
            category: 'colaboracion',
            name: 'Trabajo en equipo',
            description: 'Disfruto colaborar, escuchar ideas y aportar soluciones a equipos y proyectos.',
            icon: FaUserFriends,
            categoryName: 'Colaboración'
        },
        // Adaptabilidad
        {
            category: 'adaptabilidad',
            name: 'Aprendizaje continuo',
            description: 'Me gusta prender cosas nuevas y adaptarme a los cambios.',
            icon: FaSyncAlt,
            categoryName: 'Adaptabilidad'
        },
        // Autonomía
        {
            category: 'autonomia',
            name: 'Gestión del tiempo',
            description: 'Organizo mi tiempo y piroridades para cumplir objetivos y entregas a tiempo.',
            icon: FaCalendarCheck,
            categoryName: 'Autonomía'
        },

    ];

    // Actualizar la categoría activa cuando cambia el slide
    const handleSlideChange = (swiper) => {
        const activeIndex = swiper.activeIndex;
        const activeSkill = allSkills[activeIndex];
        setActiveSoftSkill(activeSkill.category);
    };

    return (
        <div className="py-6">
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
                onSlideChange={handleSlideChange}
                className="mySwiper"
            >
                {allSkills.map((skill, index) => (
                    <SwiperSlide key={index}>
                        <div
                            className="relative flex flex-col items-center px-6 py-14 bg-gray-800/70 rounded-xl backdrop-blur-sm transition-all duration-300 h-full">
                            {/* Categoría - más destacada en la tarjeta activa */}
                            <div className="absolute top-4 right-4">
      <span className="px-3 py-1 text-xs font-medium bg-primary-blue/50 text-white rounded-full">
        {skill.categoryName}
      </span>
                            </div>

                            {/* Icono */}
                            <div
                                className="mb-8 p-6 bg-gradient-to-br from-primary-blue/20 to-primary-blue/10 rounded-full shadow-lg shadow-primary-blue/20 transform transition-all duration-500 hover:scale-110 icon-container">
                                <skill.icon className="w-14 h-14 text-primary-blue"/>
                            </div>

                            {/* Contenido */}
                            <h3 className="text-2xl font-semibold mb-4 text-white text-center">{skill.name}</h3>
                            <p className="text-gray-300 text-center max-w-xs mx-auto leading-relaxed">{skill.description}</p>
                        </div>
                    </SwiperSlide>


                ))}
            </Swiper>
        </div>
    );
};

export default SoftSkillsCarousel;