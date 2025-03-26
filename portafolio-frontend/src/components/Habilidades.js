'use client';
import {useState} from 'react';

import {FaCloudDownloadAlt, FaGithub, FaRobot, FaRuler, FaTools} from "react-icons/fa";

import SoftSkillsCarousel from "@/components/carrusel";

export default function Habilidades() {
    // Estructura por áreas de experiencia en lugar de niveles
    const areas = [
        {
            name: "Desarrollo Backend",
            description: "Diseño y desarrollo de soluciones robustas y escalables con Python.",
            skills: ["Python", "Django", "Flask", "RESTful APIs"],
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-primary-blue" fill="none"
                     viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                          d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"/>
                </svg>
            )
        },
        {
            name: "Desarrollo Frontend",
            description: "Creación de interfaces modernas y responsivas para aplicaciones web.",
            skills: ["JavaScript", "React", "Next.js", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap"],
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-primary-blue" fill="none"
                     viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
            )
        },
        {
            name: "Datos y Análisis",
            description: "Procesamiento de datos y soluciones analíticas para empresas.",
            skills: ["SQL", "PostgreSQL", "MySQL"],
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-primary-blue" fill="none"
                     viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
            )
        },
    ];

    // Estado para el área activa
    const [activeArea, setActiveArea] = useState(areas[0].name);

    // Estado para la categoría de herramientas
    const [activeToolCategory, setActiveToolCategory] = useState('diseno');

    // Estado para el tipo de habilidad
    const [skillType, setSkillType] = useState('technical'); // 'technical' o 'soft'

    // Estado para la categoría de soft skills
    const [activeSoftSkill, setActiveSoftSkill] = useState('comunicacion');
    const [activeSkillCard, setActiveSkillCard] = useState('skill1');

    // Categorías de herramientas
    const toolCategories = {
        diseno: {
            name: "Diseño",
            icon: <FaRuler/>,
            tools: [
                {name: 'Canvas', color: '#3776AB'},
                {name: 'Figma', color: '#092E20'},
            ]
        },
        versiones: {
            name: "Control de Versiones",
            icon: <FaGithub/>,
            tools: [
                {name: 'Git', color: '#F05032'},
                {name: 'GitHub', color: '#181717'}
            ]
        },
        ia: {
            name: "IA Asistentes",
            icon: <FaRobot/>,
            tools: [
                {name: 'Claude.ai', color: '#7A5FFF'},
                {name: 'ChatGPT', color: '#10A37F'}
            ]
        },
        despliegue: {
            name: "Despliegue",
            icon: <FaCloudDownloadAlt/>,
            tools: [
                {name: 'Vercel', color: '#2496ED'},
                {name: 'PythonAnywhere', color: '#FF9900'},
                {name: 'Render', color: '#336791'}
            ]
        }
    };
    // En tu componente Habilidades.jsx
    const softSkills = {
        comunicacion: {
            name: "Comunicación",
            description: "Habilidades para transmitir ideas de forma clara y efectiva.",
            skills: [
                {name: "Comunicación efectiva"},
                {name: "Presentaciones"},
                {name: "Documentación técnica"}
            ]
        },
        colaboracion: {
            name: "Colaboración",
            description: "Capacidades para trabajar en equipo y coordinar esfuerzos.",
            skills: [
                {name: "Trabajo en equipo"},
                {name: "Gestión de conflictos"},
                {name: "Mentoría"}
            ]
        },
        adaptabilidad: {
            name: "Adaptabilidad",
            description: "Flexibilidad para adaptarse a nuevos entornos y tecnologías.",
            skills: [
                {name: "Aprendizaje rápido"},
                {name: "Resolución de problemas"},
                {name: "Gestión del cambio"}
            ]
        },
        autonomia: {
            name: "Autonomía",
            description: "Capacidad para trabajar independientemente y gestionar el tiempo.",
            skills: [
                {name: "Iniciativa"},
                {name: "Gestión del tiempo"},
                {name: "Auto-organización"}
            ]
        }
    };

    return (
        <section id="habilidades" className="min-h-screen bg-dark flex items-center">
            <div className="container mx-auto px-12 md:px-20 lg:px-32 py-16">
                {/* Título con efecto */}
                <h2 className="text-5xl font-bold mb-10 text-center relative">
                    <span className="relative inline-block">
                        <span
                            className="absolute -inset-1 blur-md bg-gradient-to-r from-transparent via-primary-blue/20 to-transparent rounded-lg"></span>
                        <span
                            className="relative text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-white">HABILIDADES</span>
                    </span>
                </h2>

                {/* Selector de tipo de habilidad */}
                <div className="flex justify-center mb-10">
                    <div className="inline-flex rounded-full bg-gray-800 p-1">
                        <button
                            onClick={() => setSkillType('technical')}
                            className={`px-6 py-2 rounded-full transition-colors ${
                                skillType === 'technical'
                                    ? 'bg-primary-blue text-white'
                                    : 'text-gray-400 hover:text-gray-200'
                            }`}
                        >
                            Habilidades Técnicas
                        </button>
                        <button
                            onClick={() => setSkillType('soft')}
                            className={`px-6 py-2 rounded-full transition-colors ${
                                skillType === 'soft'
                                    ? 'bg-primary-blue text-white'
                                    : 'text-gray-400 hover:text-gray-200'
                            }`}
                        >
                            Soft Skills
                        </button>
                    </div>
                </div>

                {/* Contenido para habilidades técnicas */}
                {skillType === 'technical' && (
                    <>
                        {/* Descripción */}
                        <p className="text-xl text-gray-400 mb-10 text-center max-w-3xl mx-auto">
                            Áreas en las que puedo aportar soluciones de valor
                        </p>

                        {/* Áreas de especialización - Botones */}
                        <div className="flex flex-wrap justify-center gap-4 mb-10">
                            {areas.map((area) => (
                                <button
                                    key={area.name}
                                    onClick={() => setActiveArea(area.name)}
                                    className={`px-5 py-2 rounded-full transition-all duration-300 ${
                                        activeArea === area.name
                                            ? 'bg-primary-blue text-white font-medium'
                                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                    }`}
                                >
                                    {area.name}
                                </button>
                            ))}
                        </div>

                        {/* Mostrar área seleccionada */}
                        {areas.filter(area => area.name === activeArea).map((area, index) => (
                            <div key={index}
                                 className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-4xl mx-auto bg-gray-800/30 p-8 rounded-lg
                                 shadow-xl shadow-primary-blue/15 hover:shadow-2xl hover:shadow-primary-blue/25 border border-gray-700/50
                                 hover:border-primary-blue/30 transition-all duration-500">
                                {/* Icono */}
                                <div
                                    className="w-20 h-20 flex-shrink-0 mb-4 md:mb-0 bg-gray-800 rounded-full flex items-center justify-center relative">
                                    <div
                                        className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-blue/20 to-python-yellow/20 blur-md"></div>
                                    <div className="relative z-10">
                                        {area.icon}
                                    </div>
                                </div>

                                {/* Contenido */}
                                <div className=" flex-1  p-4 rounded-lg shadow-lg shadow-primary-blue/20 hover:shadow-xl
                                        hover:shadow-primary-blue/30 transition-all duration-300 ">
                                    <h3 className="text-2xl font-semibold mb-3 text-white">{area.name}</h3>
                                    <p className="text-gray-300 mb-4">{area.description}</p>

                                    {/* Tecnologías */}
                                    <div className="flex flex-wrap gap-2">
                                        {area.skills.map((skill, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1 bg-gray-700 text-gray-200 rounded-full text-sm"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Herramientas y Tecnologías - ahora con categorías */}
                        <div className="mt-16 max-w-4xl mx-auto">
                            <h3 className="text-2xl font-semibold mb-6 text-center text-white">Herramientas y
                                Tecnologías</h3>

                            {/* Botones de categorías de herramientas */}
                            <div className="flex flex-wrap justify-center gap-4 mb-8">
                                {Object.keys(toolCategories).map((key) => (
                                    <button
                                        key={key}
                                        onClick={() => setActiveToolCategory(key)}
                                        className={`px-5 py-2 rounded-full transition-all duration-300 ${
                                            activeToolCategory === key
                                                ? 'bg-primary-blue text-white font-medium'
                                                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                        }`}
                                    >
                                        {toolCategories[key].name}
                                    </button>
                                ))}
                            </div>

                            {/* Detalles de la categoría seleccionada */}
                            <div className="max-w-4xl mx-auto">
                                <div
                                    className="flex flex-col md:flex-row items-center justify-center
                                    gap-8 mb-8 bg-gray-800/30 p-8 rounded-lg
                                    shadow-primary-blue/15 hover:shadow-2xl
                                    hover:shadow-primary-blue/25 border border-gray-700/50
                                    hover:border-primary-blue/30 transition-all duration-500">
                                    {/* Icono */}
                                    <div
                                        className="w-20 h-20 flex-shrink-0 mb-4 md:mb-0 bg-gray-800 rounded-full flex items-center justify-center relative">
                                        <div
                                            className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-blue/20 to-python-yellow/20 blur-md"></div>
                                        <div className="relative z-10">
                                            {/* Icono según la categoría */}
                                            {activeToolCategory === 'diseno' ? (
                                                <FaRuler className="w-10 h-10 text-primary-blue"/>
                                            ) : activeToolCategory === 'versiones' ? (
                                                <FaGithub className="w-10 h-10 text-primary-blue"/>
                                            ) : activeToolCategory === 'ia' ? (
                                                <FaRobot className="w-10 h-10 text-primary-blue"/>
                                            ) : activeToolCategory === 'despliegue' ? (
                                                <FaCloudDownloadAlt className="w-10 h-10 text-primary-blue"/>
                                            ) : (
                                                <FaTools className="w-10 h-10 text-primary-blue"/>
                                            )}
                                        </div>
                                    </div>

                                    {/* Contenido que se muestra al seleccionar algún botón */}
                                    <div
                                        className="flex-1 p-4 rounded-lg shadow-lg shadow-primary-blue/20 hover:shadow-xl
                                        hover:shadow-primary-blue/30 transition-all duration-300">
                                        <h3 className="text-2xl font-semibold mb-3 text-white">{toolCategories[activeToolCategory].name}</h3>
                                        <p className="text-gray-300 mb-4">
                                            {activeToolCategory === 'desarrollo'
                                                ? "Herramientas y lenguajes de programación que utilizo para desarrollar soluciones."
                                                : activeToolCategory === 'versiones'
                                                    ? "Herramientas para control de versiones y colaboración en código."
                                                    : activeToolCategory === 'ia'
                                                        ? "Asistentes de IA que utilizo para optimizar mi flujo de trabajo."
                                                        : activeToolCategory === 'despliegue'
                                                            ? "Plataformas y servicios para implementar aplicaciones en producción."
                                                            : "Herramientas y tecnologías que utilizo en mi trabajo."  // Caso por defecto
                                            }
                                        </p>

                                        {/* Tecnologías en botones circulares */}
                                        <div className="flex flex-wrap gap-2">
                                            {toolCategories[activeToolCategory].tools.map((tech, i) => (
                                                <span
                                                    key={i}
                                                    className="px-3 py-1 bg-gray-700 text-gray-200 rounded-full text-sm"
                                                >
                                                      {tech.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Metodologías y enfoques */}
                        <div className="mt-16 max-w-4xl mx-auto">
                            <h3 className="text-2xl font-semibold mb-6 text-center text-white">
                                Metodologías y
                                Enfoques
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div
                                    className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-primary-blue/50 shadow-md shadow-primary-blue/10 hover:shadow-lg hover:shadow-primary-blue/25 transition-all duration-300 transform hover:-translate-y-1">
                                    <h4 className="text-primary-blue font-medium mb-2">Desarrollo Ágil</h4>
                                    <p className="text-gray-400 text-sm">Aplicación de metodologías ágiles para entregar
                                        valor de forma iterativa y eficiente.</p>
                                </div>
                                <div
                                    className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-primary-blue/50 shadow-md shadow-primary-blue/10 hover:shadow-lg hover:shadow-primary-blue/25 transition-all duration-300 transform hover:-translate-y-1">
                                    <h4 className="text-primary-blue font-medium mb-2">Clean Code</h4>
                                    <p className="text-gray-400 text-sm">Desarrollo de código mantenible, eficiente y
                                        bien documentado.</p>
                                </div>
                                <div
                                    className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-primary-blue/50 shadow-md shadow-primary-blue/10 hover:shadow-lg hover:shadow-primary-blue/25 transition-all duration-300 transform hover:-translate-y-1">
                                    <h4 className="text-primary-blue font-medium mb-2">Aprendizaje Continuo</h4>
                                    <p className="text-gray-400 text-sm">Actualización constante sobre las mejores
                                        prácticas y tecnologías emergentes.</p>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* Contenido para Soft Skills */}
                {skillType === 'soft' && (
                    <div className="max-w-4xl mx-auto">
                        <p className="text-xl text-gray-400 mb-6 text-center max-w-3xl mx-auto">
                            Más allá del código, valoro las habilidades humanas que me permiten colaborar, adaptarme
                            y cumplir objetivos. Aquí están algunas de ellas, que definen mi forma de trabajar.
                        </p>

                        {/* Título y descripción dinámica basada en la categoría activa */}
                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-semibold mb-4 text-white">{softSkills[activeSoftSkill].name}</h3>
                            <p className="text-gray-300 max-w-2xl mx-auto">{softSkills[activeSoftSkill].description}</p>
                        </div>

                        {/* Carrusel de soft skills (reemplaza todos los botones y estructura anterior) */}
                        <div className="mb-10">
                            <SoftSkillsCarousel setActiveSoftSkill={setActiveSoftSkill}/>
                        </div>

                    </div>
                )}

            </div>
        </section>
    );
}