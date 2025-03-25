'use client';
import {useEffect, useState} from 'react';
import axios from 'axios';

// API client setup
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default function Proyectos() {
    const [proyectos, setProyectos] = useState([]);
    const [categorias, setCategorias] = useState(['Todos']);
    const [categoriaActiva, setCategoriaActiva] = useState('Todos');
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    // Obtener categorías desde la API
    useEffect(() => {
        const obtenerCategorias = async () => {
            try {
                // Asegúrate de incluir la barra al final
                const respuesta = await api.get('/api/categorias/');
                // Añadir 'Todos' y los nombres de las categorías al array
                const nombresCategorias = ['Todos', ...respuesta.data.map(cat => cat.nombre)];
                setCategorias(nombresCategorias);
            } catch (err) {
                console.error('Error al obtener categorías:', err);
                setError('No se pudieron cargar las categorías.');
            }
        };

        obtenerCategorias();
    }, []);

    // Obtener proyectos (filtrados opcionalmente por categoría)
    useEffect(() => {
        const obtenerProyectos = async () => {
            try {
                setCargando(true);
                // Asegúrate de incluir la barra al final
                let url = '/api/proyectos/';

                console.log('1. Iniciando obtención de proyectos...');
                console.log('2. URL base de API:', api.defaults.baseURL);
                console.log('3. Categoría activa:', categoriaActiva);

                // Si hay una categoría seleccionada que no sea 'Todos'
                if (categoriaActiva !== 'Todos') {
                    console.log('4. Intentando obtener categorías para filtrar...');
                    try {
                        // Asegúrate de incluir la barra al final
                        const categoriasResponse = await api.get('/api/categorias/');
                        console.log('5. Categorías obtenidas:', categoriasResponse.data);

                        const categoriaObj = categoriasResponse.data.find(
                            cat => cat.nombre === categoriaActiva
                        );

                        console.log('6. Categoría encontrada:', categoriaObj);

                        if (categoriaObj) {
                            // Construye la URL para filtrar por categoría
                            url = `/api/proyectos/?categoria=${categoriaObj.id}`;
                            console.log('7. URL con filtro:', url);
                        }
                    } catch (catError) {
                        console.error('8. Error al obtener categorías:', catError);
                    }
                }

                console.log('9. Haciendo solicitud a:', api.defaults.baseURL + url);
                // Usa la URL que acabas de construir
                const respuesta = await api.get(url);
                console.log('10. Respuesta recibida:', respuesta.data);

                // Transformar los datos de la API al formato esperado por el componente
                const proyectosFormateados = respuesta.data.map(p => {
                    console.log('11. Procesando proyecto:', p.id, p.titulo);
                    return {
                        id: p.id,
                        titulo: p.titulo,
                        descripcion: p.descripcion,
                        imagen: p.imagen || null,
                        categoria: p.categoria ? p.categoria.nombre : 'Sin categoría',
                        tecnologias: p.tecnologias || [],
                        demo: p.demo_url || null,
                        repositorio: p.repo_url || null
                    };
                });

                console.log('12. Proyectos formateados:', proyectosFormateados);
                setProyectos(proyectosFormateados);
                setError(null);
            } catch (err) {
                console.error('ERROR COMPLETO:', err);

                // Información detallada del error
                if (err.response) {
                    // El servidor respondió con un código de error
                    console.error('Datos del error:', err.response.data);
                    console.error('Estado HTTP:', err.response.status);
                } else if (err.request) {
                    // La solicitud se hizo pero no se recibió respuesta
                    console.error('No se recibió respuesta del servidor');
                } else {
                    // Error en la configuración de la solicitud
                    console.error('Error de configuración:', err.message);
                }

                setError('No se pudieron cargar los proyectos. Revisa la consola para más detalles.');
            } finally {
                setCargando(false);
                console.log('13. Estado final - cargando:', false, 'proyectos:', proyectos.length);
            }
        };

        obtenerProyectos();
    }, [categoriaActiva]);

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
            <div className="container mx-auto px-12 md:px-20 lg:px-32 py-16">
                {/* Título con efecto */}
                <h2 className="text-5xl font-bold mb-10 text-center relative">
                <span className="relative inline-block">
                    <span
                        className="absolute -inset-1 blur-md bg-gradient-to-r from-transparent via-primary-blue/20 to-transparent rounded-lg"></span>
                    <span
                        className="relative text-transparent bg-clip-text bg-gradient-to-r from-white via-yellow-200 to-white">PROYECTOS</span>
                </span>
                </h2>

                {/* Descripción */}
                <p className="text-xl text-gray-400 mb-10 text-center max-w-3xl mx-auto">
                    Algunos de mis trabajos y proyectos recientes
                </p>

                {/* Estado de carga */}
                {cargando && (
                    <div className="flex justify-center items-center py-10">
                        <div
                            className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-blue"></div>
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
                        <div className="flex flex-wrap justify-center gap-4 mb-12">
                            {categorias.map((categoria) => (
                                <button
                                    key={categoria}
                                    onClick={() => setCategoriaActiva(categoria)}
                                    className={`px-5 py-2 rounded-full transition-all duration-300 ${
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
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {proyectosFiltrados.map((proyecto) => (
                                <div key={proyecto.id} className="relative group">
                                    {/* Efecto de brillo en los bordes */}
                                    <div
                                        className="absolute -inset-0.5 bg-gradient-to-r from-primary-blue/30 to-gray-700/30 rounded-lg blur opacity-20 group-hover:opacity-70 transition duration-300"></div>

                                    {/* Tarjeta principal */}
                                    <div
                                        className="relative bg-gradient-to-br from-gray-800/60 to-gray-900/80 rounded-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2">
                                        {/* Imagen del proyecto */}
                                        <div className="relative h-56 overflow-hidden">
                                            <div
                                                className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60 z-10"></div>

                                            {/* Si hay imagen, mostrarla; si no, mostrar placeholder */}
                                            {proyecto.imagen ? (
                                                <img
                                                    src={proyecto.imagen}
                                                    alt={proyecto.titulo}
                                                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div
                                                    className="w-full h-full bg-gray-700 flex items-center justify-center overflow-hidden">
                                                    <span
                                                        className="text-4xl transform transition-transform duration-500 group-hover:scale-110">🖥️</span>
                                                </div>
                                            )}

                                            {/* Categoría del proyecto */}
                                            <div
                                                className="absolute top-4 right-4 bg-primary-blue/80 text-white text-xs px-3 py-1 rounded-full z-20">
                                                {proyecto.categoria}
                                            </div>
                                        </div>

                                        {/* Información del proyecto */}
                                        <div className="p-6">
                                            <h3 className="text-xl font-semibold mb-2 text-white transition-colors duration-300 group-hover:text-primary-blue">{proyecto.titulo}</h3>
                                            <p className="text-gray-400 mb-4 line-clamp-2">{proyecto.descripcion}</p>

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