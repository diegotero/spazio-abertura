import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const WhatWeDoSection: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <section id="que-hacemos" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div 
          ref={ref}
          className={`max-w-3xl mx-auto text-center transform transition-all duration-700 ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h2 className="text-4xl font-bold mb-6">Qué hacemos</h2>
          <p className="text-xl text-gray-600 mb-8">
            En Spazio Aberturas, transformamos tus espacios con aberturas de aluminio de alta calidad, diseño innovador y fabricación a medida.
          </p>
          <button
            className="inline-flex items-center gap-2 bg-black hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
            onClick={toggleExpanded}
            aria-expanded={expanded}
            aria-controls="servicios-detalle"
          >
            {expanded ? 'Ver menos' : 'Ver más'}
            {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>

        <div
          id="servicios-detalle"
          className={`mt-12 transition-all duration-500 ease-in-out ${
            expanded ? 'opacity-100 max-h-[1000px]' : 'opacity-0 max-h-0 overflow-hidden'
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-bold mb-4">Fabricación a medida</h3>
              <p className="text-gray-600 leading-relaxed">
                Creamos aberturas de aluminio personalizadas para adaptarnos a tus necesidades y estilo, garantizando la máxima calidad en cada proyecto.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-bold mb-4">Diseño innovador</h3>
              <p className="text-gray-600 leading-relaxed">
                Utilizamos tecnología 3D y las últimas tendencias en diseño para crear soluciones modernas y funcionales que transforman espacios.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-bold mb-4">Instalación profesional</h3>
              <p className="text-gray-600 leading-relaxed">
                Nuestro equipo especializado garantiza una instalación impecable, cumpliendo con los más altos estándares de calidad y seguridad.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-bold mb-4">Asesoramiento integral</h3>
              <p className="text-gray-600 leading-relaxed">
                Te acompañamos en todo el proceso, desde la selección de materiales hasta el servicio post-venta, asegurando tu satisfacción total.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoSection;
