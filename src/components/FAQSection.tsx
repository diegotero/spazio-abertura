import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "¿Cuánto cuesta una abertura de aluminio a medida?",
    answer: "El precio de una abertura de aluminio a medida varía según el diseño, las dimensiones y los materiales utilizados. En Spazio Aberturas, ofrecemos cotizaciones personalizadas sin compromiso. ¡Contactanos para recibir una estimación precisa!"
  },
  {
    question: "¿Qué tipos de aberturas de aluminio ofrecen?",
    answer: "Fabricamos aberturas Aluar en líneas Modena y A30. Además, ofrecemos cerramientos, mamparas, barandas y soluciones personalizadas para proyectos."
  },
  {
    question: "¿Hacen instalación de aberturas en Córdoba?",
    answer: "Sí, en Spazio Aberturas no solo fabricamos aberturas de alta calidad, sino que también ofrecemos un servicio profesional de instalación en toda Córdoba. Nuestro equipo garantiza un montaje preciso y sin complicaciones."
  },
  {
    question: "¿Cuánto tiempo tardan en fabricar e instalar aberturas?",
    answer: "Gracias a nuestros procesos optimizados, entregamos e instalamos aberturas en un plazo máximo de 30 días. Trabajamos con eficiencia para cumplir con los tiempos de tu proyecto sin sacrificar calidad."
  },
  {
    question: "¿Qué ventajas tienen las aberturas de aluminio frente a otros materiales?",
    answer: "Las aberturas de aluminio son livianas, resistentes y de bajo mantenimiento. Además, ofrecen excelente aislamiento térmico y acústico, y son ideales para diseños modernos y minimalistas."
  },
  {
    question: "¿Ofrecen garantía en sus productos y servicios?",
    answer: "Sí, en Spazio Aberturas respaldamos la calidad de nuestros productos y servicios con una garantía extendida. Nos comprometemos a solucionar cualquier inconveniente de manera rápida y eficiente."
  },
  {
    question: "¿Pueden fabricar aberturas para proyectos comerciales?",
    answer: "¡Absolutamente! Trabajamos tanto en proyectos residenciales como comerciales. Nuestras aberturas de aluminio son ideales para oficinas, locales y edificios, ofreciendo durabilidad y diseño profesional."
  }
];

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleKeyPress = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle(index);
    }
  };

  return (
    <section id="preguntas-frecuentes" className="py-24 bg-white" aria-label="Preguntas frecuentes">
      <div className="container mx-auto px-6">
        <div 
          ref={ref}
          className={`max-w-3xl mx-auto text-center mb-16 transform transition-all duration-700 ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h2 className="text-4xl font-bold mb-6">Preguntas Frecuentes</h2>
          <p className="text-xl text-gray-600">
            Encontrá respuestas a las consultas más comunes sobre nuestros productos y servicios.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const { ref: itemRef, inView: itemInView } = useInView({
              triggerOnce: true,
              threshold: 0.1,
              delay: index * 100
            });

            return (
              <div
                key={index}
                ref={itemRef}
                className={`transform transition-all duration-700 ${
                  itemInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
              >
                <div
                  className={`border-b border-gray-200 ${index === 0 ? 'border-t' : ''}`}
                  data-faq-item
                >
                  <button
                    className="w-full py-6 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 rounded-lg"
                    onClick={() => handleToggle(index)}
                    onKeyDown={(e) => handleKeyPress(e, index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span className="text-lg font-medium pr-8">{faq.question}</span>
                    <span className="flex-shrink-0 text-gray-400">
                      {isOpen ? (
                        <Minus className="w-6 h-6 transition-transform duration-200" />
                      ) : (
                        <Plus className="w-6 h-6 transition-transform duration-200" />
                      )}
                    </span>
                  </button>
                  <div
                    id={`faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-6 text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
