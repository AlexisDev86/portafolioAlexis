'use client';
import {useEffect, useState} from 'react';
import Image from 'next/image';
import api from '../utils/api';

// Componente para cargar imágenes optimizadas
function OptimizedProjectImage({src, alt, priority = false}) {
    // Determinar si la imagen es de la API o local
    const isApiImage = src?.startsWith('/media/') || src?.startsWith('/proyectos/');

    // Construir la URL completa si es necesario
    const fullImageUrl = isApiImage
        ? `${process.env.NEXT_PUBLIC_API_URL}${src}`
        : src;

    return (
        <div className="relative h-56 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60 z-10"></div>

            {src ? (
                <Image
                    src={fullImageUrl}
                    alt={alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                    loading={priority ? "eager" : "lazy"}
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23444444'/%3E%3C/svg%3E"
                />
            ) : (
                <div className="w-full h-full bg-gray-700 flex items-center justify-center overflow-hidden">
                    <span
                        className="text-4xl transform transition-transform duration-500 group-hover:scale-110">🖥️</span>
                </div>
            )}
        </div>
    );
}

export default function Proyectos() {
    const [proyectos, setProyectos] = useState([]);
    const [categorias, setCategorias] = useState(['Todos']);
    const [categoriaActiva, setCategoriaActiva] = useState('Todos');
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [categoriasData, setCategoriasData] = useState([]);
    const [expandedDescriptions, setExpandedDescriptions] = useState({});

    // Función para alternar la expansión de la descripción
    const toggleDescription = (id) => {
        setExpandedDescriptions(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    // Obtener categorías y proyectos iniciales en paralelo
    useEffect(() => {
        const obtenerDatosIniciales = async () => {
            try {
                setCargando(true);

                // Realizar ambas solicitudes en paralelo
                const [categoriasRes, proyectosRes] = await Promise.all([
                    api.get('/api/categorias/'),
                    api.get('/api/proyectos/')
                ]);

                // Procesar categorías
                setCategoriasData(categoriasRes.data);
                const nombresCategorias = ['Todos', ...categoriasRes.data.map(cat => cat.nombre)];
                setCategorias(nombresCategorias);

                // Procesar proyectos
                const proyectosFormateados = formatearProyectos(proyectosRes.data);
                setProyectos(proyectosFormateados);
                setError(null);
            } catch (err) {
                console.error('Error al obtener datos iniciales:', err);
                setError('No se pudieron cargar los datos. Intente más tarde.');
            } finally {
                setCargando(false);
            }
        };

        obtenerDatosIniciales();
    }, []);

    // Efecto para filtrar proyectos cuando cambia la categoría activa
    useEffect(() => {
        // Si no es la categoría "Todos" y tenemos los datos de categorías
        if (categoriaActiva !== 'Todos' && categoriasData.length > 0) {
            const obtenerProyectosFiltrados = async () => {
                try {
                    setCargando(true);

                    // Encontrar el ID de la categoría seleccionada
                    const categoriaObj = categoriasData.find(
                        cat => cat.nombre === categoriaActiva
                    );

                    if (categoriaObj) {
                        const respuesta = await api.get(`/api/proyectos/?categoria=${categoriaObj.id}`);
                        const proyectosFormateados = formatearProyectos(respuesta.data);
                        setProyectos(proyectosFormateados);
                    }

                    setError(null);
                } catch (err) {
                    console.error('Error al filtrar proyectos:', err);
                    setError('No se pudieron filtrar los proyectos.');
                } finally {
                    setCargando(false);
                }
            };

            obtenerProyectosFiltrados();
        }
    }, [categoriaActiva, categoriasData]);

    // Función para formatear los datos de proyectos
    const formatearProyectos = (datos) => {
        return datos.map(p => ({
            id: p.id,
            titulo: p.titulo,
            descripcion: p.descripcion,
            imagen: p.imagen || null,
            categoria: p.categoria ? p.categoria.nombre : 'Sin categoría',
            tecnologias: p.tecnologias || [],
            demo: p.demo_url || null,
            repositorio: p.repo_url || null
        }));
    };

    // Filtrar proyectos por categoría (si no están ya filtrados por la API)
    const proyectosFiltrados = categoriaActiva === 'Todos'
        ? proyectos
        : proyectos.filter(proyecto => proyecto.categoria === categoriaActiva);

    // Funciones para manejar clics en enlaces
    const abrirDemo = (url) => {
        window.open(url, '_blank');
    };

    const abrirRepositorio = (url) => {
        window.open(url, '_blank');
    };

    return (
        <section id="proyectos" className="min-h-screen bg-dark flex items-center">
            <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-16">
                {/* Título con efecto */}
                <h2 className="text-4xl md:text-5xl font-bold mb-6 md:mb-10 text-center relative">
                <span className="relative inline-block">
                    <span
                        className="absolute -inset-1 blur-md bg-gradient-to-r from-transparent via-primary-blue/20 to-transparent rounded-lg"></span>
                    <span
                        className="relative text-transparent bg-clip-text bg-gradient-to-r from-white via-yellow-200 to-white">PROYECTOS</span>
                </span>
                </h2>

                {/* Descripción */}
                <p className="text-lg md:text-xl text-gray-400 mb-8 md:mb-10 text-center max-w-3xl mx-auto">
                    Algunos de mis trabajos y proyectos recientes
                </p>

                {/* Estado de carga */}
                {cargando && (
                    <div className="flex justify-center items-center py-10">
                        <div
                            className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-blue"></div>
                    </div>
                )}

                {/* Mensaje de error */}
                {error && (
                    <div className="text-center py-10">
                        <p className="text-red-400">{error}</p>
                    </div>
                )}

                {/* Contenido principal */}
                {!cargando && !error && (
                    <>
                        {/* Filtro de categorías */}
                        <div className="flex flex-wrap justify-center gap-3 mb-8 md:mb-12">
                            {categorias.map((categoria) => (
                                <button
                                    key={categoria}
                                    onClick={() => setCategoriaActiva(categoria)}
                                    className={`px-4 py-2 rounded-full transition-all duration-300 ${
                                        categoriaActiva === categoria
                                            ? 'bg-primary-blue text-white font-medium'
                                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                    }`}
                                >
                                    {categoria}
                                </button>
                            ))}
                        </div>

                        {/* Grid de proyectos */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {proyectosFiltrados.map((proyecto, index) => (
                                <div key={proyecto.id} className="relative group">
                                    {/* Efecto de brillo en los bordes */}
                                    <div
                                        className="absolute -inset-0.5 bg-gradient-to-r from-primary-blue/30 to-gray-700/30 rounded-lg blur opacity-20 group-hover:opacity-70 transition duration-300"></div>

                                    {/* Tarjeta principal */}
                                    <div
                                        className="relative bg-gradient-to-br from-gray-800/60 to-gray-900/80 rounded-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2">
                                        {/* Imagen del proyecto optimizada */}
                                        <OptimizedProjectImage
                                            src={proyecto.imagen}
                                            alt={proyecto.titulo}
                                            priority={index < 3} // Solo las primeras 3 imágenes cargan con prioridad alta
                                        />

                                        {/* Categoría del proyecto */}
                                        <div
                                            className="absolute top-4 right-4 bg-primary-blue/80 text-white text-xs px-3 py-1 rounded-full z-20">
                                            {proyecto.categoria}
                                        </div>

                                        {/* Información del proyecto */}
                                        <div className="p-6">
                                            <h3 className="text-xl font-semibold mb-2 text-white transition-colors duration-300 group-hover:text-primary-blue">{proyecto.titulo}</h3>

                                            {/* Descripción expandible - CAMBIO AQUÍ */}
                                            <div className="mb-4">
                                                <p className={`text-gray-400 ${expandedDescriptions[proyecto.id] ? '' : 'line-clamp-2'}`}>
                                                    {proyecto.descripcion}
                                                </p>
                                                {proyecto.descripcion && proyecto.descripcion.length > 100 && (
                                                    <button
                                                        onClick={() => toggleDescription(proyecto.id)}
                                                        className="text-primary-blue hover:text-python-yellow text-sm mt-1 focus:outline-none transition-colors"
                                                        aria-expanded={expandedDescriptions[proyecto.id]}
                                                    >
                                                        {expandedDescriptions[proyecto.id] ? 'Ver menos' : 'Ver más'}
                                                    </button>
                                                )}
                                            </div>

                                            {/* Tecnologías utilizadas */}
                                            <div className="flex flex-wrap gap-2 mb-4 relative">
                                                <div
                                                    className="absolute inset-0 bg-primary-blue/5 opacity-0 group-hover:opacity-100 blur-sm rounded-lg transition-opacity duration-300"></div>
                                                {proyecto.tecnologias && proyecto.tecnologias.map((tech, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-2 py-1 bg-gray-700 text-xs text-gray-300 rounded-md relative z-10"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Enlaces */}
                                            <div className="flex justify-between mt-4">
                                                <div>
                                                    {proyecto.demo && (
                                                        <button
                                                            onClick={() => abrirDemo(proyecto.demo)}
                                                            className="text-primary-blue hover:text-python-yellow transition-colors text-sm font-medium cursor-pointer"
                                                        >
                                                            Ver Demo
                                                        </button>
                                                    )}
                                                    {!proyecto.demo && <span></span>}
                                                </div>

                                                <div>
                                                    {proyecto.repositorio && (
                                                        <button
                                                            onClick={() => abrirRepositorio(proyecto.repositorio)}
                                                            className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer"
                                                        >
                                                            Ver Código
                                                        </button>
                                                    )}
                                                    {!proyecto.repositorio && <span></span>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Mensaje si no hay proyectos */}
                        {proyectosFiltrados.length === 0 && (
                            <div className="text-center py-8">
                                <p className="text-gray-400">No hay proyectos en esta categoría.</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
}