'use client';
import {useState} from 'react';
import {MdEmail} from "react-icons/md";
import {CiClock2} from "react-icons/ci";
import {FaGithub, FaLinkedin, FaLocationDot} from "react-icons/fa6";
import api from "../utils/api";

export default function Contacto() {
    // Estado para el formulario
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        asunto: '',
        mensaje: ''
    });

    // Estado para el proceso de envío
    const [submitStatus, setSubmitStatus] = useState({
        submitted: false,
        success: false,
        message: ''
    });

    // Estado para validación
    const [errors, setErrors] = useState({});

    // Manejar cambios en el formulario
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        // Limpiar error al editar
        if (errors[name]) {
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: ''
            }));
        }
    };

    // Validar formulario
    const validateForm = () => {
        const newErrors = {};

        if (!formData.nombre.trim()) {
            newErrors.nombre = 'Por favor ingresa tu nombre';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Por favor ingresa tu email';
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = 'Por favor ingresa un email válido';
        }

        if (!formData.asunto.trim()) {
            newErrors.asunto = 'Por favor ingresa el asunto';
        }

        if (!formData.mensaje.trim()) {
            newErrors.mensaje = 'Por favor ingresa tu mensaje';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Manejar envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setSubmitStatus({
            submitted: true,
            success: false,
            message: 'Enviando mensaje...'
        });

        try {
            // Usar la instancia API configurada
            const response = await api.post('/api/contactos/', formData);

            // Éxito
            setSubmitStatus({
                submitted: true,
                success: true,
                message: '¡Mensaje enviado con éxito! Te responderé a la brevedad.'
            });

            // Resetear formulario
            setFormData({
                nombre: '',
                email: '',
                asunto: '',
                mensaje: ''
            });

            setTimeout(() => {
                setSubmitStatus({
                    submitted: false,
                    success: true,
                    message: ''
                });
            }, 5000);

        } catch (error) {
            console.error('Error al enviar mensaje', error);

            const errorMessage = error.response?.data?.message ||
                'Hubo un error al enviar el mensaje. Por favor intenta de nuevo'

            setSubmitStatus({
                submitted: true,
                success: false,
                message: errorMessage
            });
        }
    };

    return (
        <section id="contacto" className="min-h-screen bg-dark overflow-x-hidden">
            <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-16">
                {/* Título con efecto */}
                <h2 className="text-4xl md:text-5xl font-bold mb-6 md:mb-10 text-center relative">
                    <span className="relative inline-block">
                        <span
                            className="absolute -inset-1 blur-md bg-gradient-to-r from-transparent via-primary-blue/20 to-transparent rounded-lg"></span>
                        <span
                            className="relative text-transparent bg-clip-text bg-gradient-to-r from-white via-yellow-200 to-white">CONTACTO</span>
                    </span>
                </h2>

                {/* Descripción */}
                <p className="text-lg md:text-xl text-gray-400 mb-8 md:mb-16 text-center max-w-3xl mx-auto">
                    ¿Tienes un proyecto en mente? ¡Conversemos!
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-start">

                    {/* Información de contacto */}
                    <div
                        className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 md:p-8 rounded-xl shadow-xl shadow-python-yellow/20 hover:shadow-python-yellow/30 transition-all duration-500">
                        <h3 className="text-2xl font-semibold mb-6 text-white">Información de Contacto</h3>

                        <div className="space-y-6 mb-6 md:mb-10">
                            <div className="flex items-start">
                                <div
                                    className="w-10 h-10 rounded-full bg-python-yellow/10 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                                    <MdEmail className="w-5 h-5 text-python-yellow"/>
                                </div>
                                <div className="min-w-0 flex-1"> {/* Añade estas clases para evitar desborde */}
                                    <h4 className="text-white font-medium mb-1">Email</h4>
                                    <p className="text-gray-400 break-all text-sm md:text-base">desarrollowebservicios@gmail.com</p>
                                    <p className="text-gray-500 text-xs md:text-sm mt-1">Respondo en menos de 24
                                        horas</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div
                                    className="w-10 h-10 rounded-full bg-python-yellow/10 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                                    <FaLocationDot className="w-5 h-5 text-python-yellow"/>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h4 className="text-white font-medium mb-1">Ubicación</h4>
                                    <p className="text-gray-400 text-sm md:text-base">Puerto Montt, Chile</p>
                                    <p className="text-gray-500 text-xs md:text-sm mt-1">Disponible para proyectos
                                        remotos</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div
                                    className="w-10 h-10 rounded-full bg-python-yellow/10 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                                    <CiClock2 className="w-5 h-5 text-python-yellow"/>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h4 className="text-white font-medium mb-1">Horario</h4>
                                    <p className="text-gray-400 text-sm md:text-base">Lunes a Viernes: 9:00 - 18:00</p>
                                    <p className="text-gray-500 text-xs md:text-sm mt-1">Hora de Chile (GMT-3)</p>
                                </div>
                            </div>
                        </div>

                        {/* Redes sociales */}
                        <div>
                            <h4 className="text-white font-medium mb-4">Sígueme en redes</h4>
                            <div className="flex space-x-4">
                                <a href="https://www.linkedin.com/in/alexis-gallardo-6a895520b/" target="_blank"
                                   rel="noopener noreferrer"
                                   className="w-10 h-10 rounded-full bg-gray-800 hover:bg-python-yellow/80 flex items-center justify-center transition-colors duration-300">
                                    <FaLinkedin className="w-5 h-5 text-white"/>
                                </a>
                                <a href="https://github.com/AlexisDev86" target="_blank" rel="noopener noreferrer"
                                   className="w-10 h-10 rounded-full bg-gray-800 hover:bg-python-yellow/80 flex items-center justify-center transition-colors duration-300">
                                    <FaGithub className="w-5 h-5 text-white"/>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Formulario de contacto */}
                    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 md:p-8 rounded-xl
                    shadow-xl shadow-python-yellow/20 hover:shadow-python-yellow/30 transition-all duration-500">
                        <h3 className="text-2xl font-semibold mb-6 text-white">Envía un mensaje</h3>

                        {/* Mensaje de estado */}
                        {submitStatus.submitted && (
                            <div
                                className={`p-4 mb-6 rounded-lg ${submitStatus.success ? 'bg-green-900/40 text-green-200' : 'bg-red-900/40 text-red-200'}`}>
                                {submitStatus.message}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="nombre" className="block text-gray-300 mb-2">Nombre</label>
                                    <input
                                        type="text"
                                        id="nombre"
                                        name="nombre"
                                        value={formData.nombre}
                                        onChange={handleChange}
                                        className={`w-full bg-gray-900/50 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${errors.nombre ? 'border border-red-500 focus:ring-red-500/50' : 'focus:ring-primary-blue/50'}`}
                                        placeholder="Tu nombre"
                                    />
                                    {errors.nombre && <p className="mt-1 text-red-500 text-sm">{errors.nombre}</p>}
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`w-full bg-gray-900/50 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${errors.email ? 'border border-red-500 focus:ring-red-500/50' : 'focus:ring-primary-blue/50'}`}
                                        placeholder="tu.email@ejemplo.com"
                                    />
                                    {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email}</p>}
                                </div>

                                <div>
                                    <label htmlFor="asunto" className="block text-gray-300 mb-2">Asunto</label>
                                    <input
                                        type="text"
                                        id="asunto"
                                        name="asunto"
                                        value={formData.asunto}
                                        onChange={handleChange}
                                        className={`w-full bg-gray-900/50 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${errors.asunto ? 'border border-red-500 focus:ring-red-500/50' : 'focus:ring-primary-blue/50'}`}
                                        placeholder="¿En qué puedo ayudarte?"
                                    />
                                    {errors.asunto && <p className="mt-1 text-red-500 text-sm">{errors.asunto}</p>}
                                </div>

                                <div>
                                    <label htmlFor="mensaje" className="block text-gray-300 mb-2">Mensaje</label>
                                    <textarea
                                        id="mensaje"
                                        name="mensaje"
                                        value={formData.mensaje}
                                        onChange={handleChange}
                                        rows="5"
                                        className={`w-full bg-gray-900/50 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${errors.mensaje ? 'border border-red-500 focus:ring-red-500/50' : 'focus:ring-primary-blue/50'}`}
                                        placeholder="Cuéntame sobre tu proyecto o consulta..."
                                    ></textarea>
                                    {errors.mensaje && <p className="mt-1 text-red-500 text-sm">{errors.mensaje}</p>}
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="w-full bg-primary-blue hover:bg-python-yellow text-white font-medium py-3 rounded-lg transition-colors duration-300 shadow-lg flex items-center justify-center"
                                        disabled={submitStatus.submitted && !submitStatus.success}
                                    >
                                        {(submitStatus.submitted && !submitStatus.success) ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10"
                                                            stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor"
                                                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Enviando...
                                            </>
                                        ) : 'Enviar mensaje'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>


                {/* FAQ */}
                <div className="mt-12 md:mt-16">
                    <h3 className="text-2xl font-semibold mb-6 md:mb-8 text-center text-white">Preguntas Frecuentes</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
                        <div
                            className="bg-gray-800/40 p-4 md:p-6 rounded-lg shadow-md shadow-python-yellow/15 hover:shadow-lg hover:shadow-python-yellow/25 transition-all duration-300">
                            <h4 className="text-lg font-medium mb-2 text-white">¿Cuál es tu tiempo de respuesta?</h4>
                            <p className="text-gray-400 text-sm md:text-base">Respondo a todas las consultas en menos de
                                24 horas en días laborables.</p>
                        </div>

                        <div
                            className="bg-gray-800/40 p-4 md:p-6 rounded-lg shadow-md shadow-python-yellow/15 hover:shadow-lg hover:shadow-python-yellow/25 transition-all duration-300">
                            <h4 className="text-lg font-medium mb-2 text-white">¿Trabajas con clientes
                                internacionales?</h4>
                            <p className="text-gray-400 text-sm md:text-base">Sí, trabajo con clientes de todo el mundo
                                de forma remota.</p>
                        </div>

                        <div
                            className="bg-gray-800/40 p-4 md:p-6 rounded-lg shadow-md shadow-python-yellow/15 hover:shadow-lg hover:shadow-python-yellow/25 transition-all duration-300">
                            <h4 className="text-lg font-medium mb-2 text-white">¿Cómo es tu proceso de trabajo?</h4>
                            <p className="text-gray-400 text-sm md:text-base">Mi proceso incluye una fase de
                                descubrimiento, planificación, desarrollo y lanzamiento, con comunicación constante.</p>
                        </div>

                        <div
                            className="bg-gray-800/40 p-4 md:p-6 rounded-lg shadow-md shadow-python-yellow/15 hover:shadow-lg hover:shadow-python-yellow/25 transition-all duration-300">
                            <h4 className="text-lg font-medium mb-2 text-white">¿Ofreces mantenimiento
                                post-lanzamiento?</h4>
                            <p className="text-gray-400 text-sm md:text-base">Sí, ofrezco diferentes planes de
                                mantenimiento y soporte técnico continuo para todos mis proyectos.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}