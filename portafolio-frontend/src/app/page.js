import {Suspense} from 'react';
import dynamic from 'next/dynamic';

// Mantén el componente Inicio cargado inmediatamente ya que es el primer contenido visible
import Inicio from '@/components/Inicio';

// Carga dinámica para el resto de los componentes
const SobreMi = dynamic(() => import('@/components/SobreMi'), {
    loading: () => <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-primary-blue rounded-full"></div>
    </div>
});

const Habilidades = dynamic(() => import('@/components/Habilidades'), {
    loading: () => <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-primary-blue rounded-full"></div>
    </div>
});

const Proyectos = dynamic(() => import('@/components/Proyectos'), {
    loading: () => <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-primary-blue rounded-full"></div>
    </div>
});

const Servicios = dynamic(() => import('@/components/Servicios'), {
    loading: () => <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-primary-blue rounded-full"></div>
    </div>
});

const Contacto = dynamic(() => import('@/components/Contacto'), {
    loading: () => <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-primary-blue rounded-full"></div>
    </div>
});

export default function Page() {
    return (
        <>
            <Inicio/>

            <Suspense fallback={<div className="min-h-screen"></div>}>
                <SobreMi/>
            </Suspense>

            <Suspense fallback={<div className="min-h-screen"></div>}>
                <Habilidades/>
            </Suspense>

            <Suspense fallback={<div className="min-h-screen"></div>}>
                <Proyectos/>
            </Suspense>

            <Suspense fallback={<div className="min-h-screen"></div>}>
                <Servicios/>
            </Suspense>

            <Suspense fallback={<div className="min-h-screen"></div>}>
                <Contacto/>
            </Suspense>
        </>
    );
}