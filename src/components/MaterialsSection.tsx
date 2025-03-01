import React, { useState } from 'react';
import { Shield, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const MaterialsSection: React.FC = () => {
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const toggleMaterial = (material: string) => {
    setExpandedMobile(expandedMobile === material ? null : material);
  };

  return (
    <section className="py-24 bg-black text-white" ref={ref}>
      <div className="container mx-auto px-6">
        <div className={`max-w-3xl mx-auto text-center mb-16 transform transition-all duration-700 ${
          inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-4xl font-bold mb-6">Materiales premium</h2>
          <p className="text-xl text-white/80">
            Utilizamos los mejores materiales para garantizar durabilidad, eficiencia y estética en cada proyecto.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Aluminio Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/[0.15] transition-all duration-300">
            <button
              onClick={() => toggleMaterial('aluminio')}
              className="w-full text-left p-8 md:cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-2xl"
              aria-expanded={expandedMobile === 'aluminio'}
            >
              <div className="flex items-start gap-6">
                <div className="p-4 bg-white/10 rounded-xl">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-bold mb-2">Aluminio premium</h3>
                  <p className="text-white/80 md:block">El metal más noble y versátil para tus aberturas</p>
                </div>
                <div className="md:hidden">
                  {expandedMobile === 'aluminio' ? (
                    <ChevronUp className="w-6 h-6 text-white/70" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-white/70" />
                  )}
                </div>
              </div>
            </button>
            
            <div className={`space-y-6 px-8 pb-8 md:block ${
              expandedMobile === 'aluminio' ? 'block' : 'hidden'
            }`}>
              <div>
                <h4 className="font-semibold mb-2 text-white/90">Sostenibilidad</h4>
                <p className="text-white/70">100% reciclable y el tercer elemento más abundante en la corteza terrestre, transformable ilimitadamente sin perder calidad.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-white/90">Durabilidad</h4>
                <p className="text-white/70">Altamente resistente a la corrosión, ignífugo y no se deteriora con el tiempo ni la radiación UV.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-white/90">Versatilidad</h4>
                <p className="text-white/70">Excelente dureza y resistencia mecánica con bajo peso, ideal para arquitectura moderna.</p>
              </div>
            </div>
          </div>

          {/* Vidrio Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/[0.15] transition-all duration-300">
            <button
              onClick={() => toggleMaterial('vidrio')}
              className="w-full text-left p-8 md:cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-2xl"
              aria-expanded={expandedMobile === 'vidrio'}
            >
              <div className="flex items-start gap-6">
                <div className="p-4 bg-white/10 rounded-xl">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-bold mb-2">Vidrio de seguridad</h3>
                  <p className="text-white/80 md:block">Máxima protección y eficiencia térmica</p>
                </div>
                <div className="md:hidden">
                  {expandedMobile === 'vidrio' ? (
                    <ChevronUp className="w-6 h-6 text-white/70" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-white/70" />
                  )}
                </div>
              </div>
            </button>

            <div className={`space-y-6 px-8 pb-8 md:block ${
              expandedMobile === 'vidrio' ? 'block' : 'hidden'
            }`}>
              <div>
                <h4 className="font-semibold mb-2 text-white/90">DVH (Doble Vidriado Hermético)</h4>
                <p className="text-white/70">Duplica la aislación térmica del vidrio simple, con aire deshidratado entre vidrios para máxima eficiencia.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-white/90">Vidrio Templado</h4>
                <p className="text-white/70">4-5 veces más resistente que el vidrio común, se fragmenta en pequeños trozos seguros en caso de rotura.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-white/90">Vidrio Laminado</h4>
                <p className="text-white/70">Máxima seguridad con PVB que retiene fragmentos, filtra 99% de rayos UV y reduce hasta 70% el ingreso de calor.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MaterialsSection;
