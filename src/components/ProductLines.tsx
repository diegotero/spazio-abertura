import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

interface Typology {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
}

const typologies: Typology[] = [
  {
    id: 'ventana-puerta-corrediza',
    title: 'Ventana y puerta corrediza',
    description: 'Sistema deslizable de 2, 3 y 4 hojas que optimiza el espacio y brinda máxima luminosidad',
    image: 'https://vrrohcaovubbp0uw.public.blob.vercel-storage.com/clientes/spazio/tipologias/spazio-aberturas-corrediza-A8ppcOBcXeECoImG3YUjZdLEhkpFwq.avif',
    alt: 'Ventana corrediza de aluminio Spazio Aberturas'
  },
  {
    id: 'ventana-desplazable',
    title: 'Ventana desplazable',
    description: 'Diseño versátil que permite un desplazamiento suave y controlado de las hojas',
    image: 'https://vrrohcaovubbp0uw.public.blob.vercel-storage.com/clientes/spazio/tipologias/spazio-aberturas-desplazable-68Z3zt0YkM8GfjmtPsKwhg5N5s3s2E.avif',
    alt: 'Ventana desplazable de aluminio premium'
  },
  {
    id: 'ventana-banderola',
    title: 'Ventana banderola',
    description: 'Sistema de apertura proyectante ideal para ventilación controlada',
    image: 'https://vrrohcaovubbp0uw.public.blob.vercel-storage.com/clientes/spazio/tipologias/spazio-aberturas-banderola-iQmUGVFOlJEUQg64Sk3ekK1uwcohKK.avif',
    alt: 'Ventana banderola de aluminio'
  },
  {
    id: 'ventana-oscilo-batiente',
    title: 'Ventana oscilo batiente',
    description: 'Combina apertura batiente y basculante para máxima versatilidad',
    image: 'https://vrrohcaovubbp0uw.public.blob.vercel-storage.com/clientes/spazio/tipologias/spazio-aberturas-oscilobatiente-blpRNhsLtNpuoxnnATDLFYZaVgGdwW.avif',
    alt: 'Ventana oscilo batiente de aluminio'
  },
  {
    id: 'ventana-abrir',
    title: 'Ventana de abrir',
    description: 'Sistema tradicional de 1 y 2 hojas con máxima hermeticidad',
    image: 'https://vrrohcaovubbp0uw.public.blob.vercel-storage.com/clientes/spazio/tipologias/spazio-aberturas-practicable-abrir-rebatible-FATRvPbu6GLzl466pevRuef1quMaC3.avif',
    alt: 'Ventana de abrir de aluminio'
  },
  {
    id: 'pano-fijo',
    title: 'Paño fijo',
    description: 'Solución elegante para maximizar la entrada de luz natural',
    image: 'https://vrrohcaovubbp0uw.public.blob.vercel-storage.com/clientes/spazio/tipologias/spazio-aberturas-panofijo-kwzHpqpCSbhM7xA5y5wuLuVcIGVM4M.avif',
    alt: 'Paño fijo de aluminio'
  },
  {
    id: 'puerta-rebatir',
    title: 'Puerta de rebatir',
    description: 'Sistema de 1 y 2 hojas con diseño robusto y elegante',
    image: 'https://vrrohcaovubbp0uw.public.blob.vercel-storage.com/clientes/spazio/tipologias/spazio-aberturas-puerta-rebatir-ZcbzPDpVnPH61JfwqhyGKqJawG6zpy.avif',
    alt: 'Puerta de rebatir de aluminio'
  }
];

const ProductLines: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [expandedLine, setExpandedLine] = useState<string | null>(null);
  const [slideWidth, setSlideWidth] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);
  const totalSlides = typologies.length;

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Función para calcular y actualizar el ancho del slide
  const updateSlideWidth = () => {
    if (slideRef.current) {
      const width = slideRef.current.offsetWidth;
      setSlideWidth(width);
    }
  };

  // Handlers para touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  // Actualizar el ancho del slide cuando cambie el tamaño de la ventana
  useEffect(() => {
    updateSlideWidth();
    const handleResize = () => {
      updateSlideWidth();
      if (window.innerWidth < 640) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleProductLine = (line: string) => {
    setExpandedLine(expandedLine === line ? null : line);
  };

  useEffect(() => {
    const updateSlidesToShow = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    updateSlidesToShow();
    window.addEventListener('resize', updateSlidesToShow);

    return () => window.removeEventListener('resize', updateSlidesToShow);
  }, []);

  // Effect para actualizar el ancho del slide cuando el componente se monte o cambie slidesToShow
  useEffect(() => {
    const updateDimensions = () => {
      if (slideRef.current) {
        const newWidth = slideRef.current.offsetWidth;
        setSlideWidth(newWidth);
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [slidesToShow]);

  const nextSlide = () => {
    if (currentSlide < totalSlides - slidesToShow) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  const isFirstSlide = currentSlide === 0;
  const isLastSlide = currentSlide >= totalSlides - slidesToShow;


  return (
    <section id="que-hacemos" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">Nuestras líneas premium</h2>
          <p className="text-xl text-gray-600">
            Fabricamos aberturas de aluminio que combinan diseño, funcionalidad y durabilidad. Cada pieza es creada con precisión y pensada para adaptarse a tus necesidades.
          </p>
        </div>

        {/* Líneas de Productos */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          {/* Modena */}
          <div
            ref={ref}
            className={`bg-gray-50 rounded-3xl transition-all duration-300 transform ${
              inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <div className="flex justify-center mb-4 px-10 pt-10">
              <img
                src="https://vrrohcaovubbp0uw.public.blob.vercel-storage.com/clientes/spazio/logo-modena-VDOxPuomsYEzURCwJicGZ08SWN6w25.avif"
                alt="Logo Línea Modena"
                className="h-16 w-auto object-contain"
                loading="lazy"
                width="200"
                height="64"
              />
            </div>
            <button
              onClick={() => toggleProductLine('modena')}
              className="w-full text-left p-10 md:cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-black/50 rounded-3xl"
              aria-expanded={expandedLine === 'modena'}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold">Línea modena</h3>
                <ChevronDown className={`w-6 h-6 text-gray-400 md:hidden transition-transform duration-300 ${
                  expandedLine === 'modena' ? 'rotate-180' : ''
                }`} />
              </div>
            </button>
            <div className={`px-10 pb-10 pt-0 md:block ${
              expandedLine === 'modena' ? 'block' : 'hidden'
            }`}>
              <p className="text-gray-600 leading-relaxed">
                El sistema más tradicional que ha creado un estándar debido a su diseño y al equilibrio peso/resistencia.
                Su uso extendido lo transforma en el sistema más consolidado del mercado. La versatilidad del sistema
                le permite adaptarse a todo tipo de proyectos con aberturas de tamaño standard y óptima performance.
              </p>
            </div>
          </div>

          {/* A30 New */}
          <div
            ref={ref}
            className={`bg-gray-50 rounded-3xl transition-all duration-300 transform ${
              inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            } delay-200`}
          >
            <div className="flex justify-center mb-4 px-10 pt-10">
              <img
                src="https://vrrohcaovubbp0uw.public.blob.vercel-storage.com/clientes/spazio/logo-a30-new-zlJWi8r31H6N6DXf3psrUOGaSOK77K.avif"
                alt="Logo Línea A30 new"
                className="h-16 w-auto object-contain"
                loading="lazy"
                width="200"
                height="64"
              />
            </div>
            <button
              onClick={() => toggleProductLine('a30')}
              className="w-full text-left p-10 md:cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-black/50 rounded-3xl"
              aria-expanded={expandedLine === 'a30'}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold">Línea A30 new</h3>
                <ChevronDown className={`w-6 h-6 text-gray-400 md:hidden transition-transform duration-300 ${
                  expandedLine === 'a30' ? 'rotate-180' : ''
                }`} />
              </div>
            </button>
            <div className={`px-10 pb-10 pt-0 md:block ${
              expandedLine === 'a30' ? 'block' : 'hidden'
            }`}>
              <p className="text-gray-600 leading-relaxed">
                El estilo y elegancia de sus líneas redondeadas, sus amplias posibilidades constructivas y la variedad
                de tipologías, hacen de A30 new una opción de alta prestación en la realización de los proyectos más
                tradicionales y variados.
              </p>
            </div>
          </div>
        </div>

        {/* Tipologías Carousel */}
        <div className="mb-8 text-center">
          <h3 className="text-3xl font-bold mb-4">Tipologías disponibles</h3>
          <p className="text-xl text-gray-600 mb-12">
            Descubrí todas las opciones que tenemos para tu proyecto.
          </p>
        </div>

        <div className="relative px-12">
          {/* Carousel Navigation */}
          <button
            onClick={prevSlide}
            disabled={isFirstSlide}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 p-4 rounded-full transition-all duration-200 min-w-[48px] min-h-[48px] ${
              isFirstSlide 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-black text-white hover:bg-gray-800'
            }`}
            aria-label="Anterior tipología"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            disabled={isLastSlide}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 p-4 rounded-full transition-all duration-200 min-w-[48px] min-h-[48px] ${
              isLastSlide 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-black text-white hover:bg-gray-800'
            }`}
            aria-label="Siguiente tipología"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Carousel Content */}
          <div className="overflow-hidden">
            <div
              ref={carouselRef}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${(currentSlide * (slideWidth + 32))}px)`,
                gap: '2rem'
              }}
              role="region"
              aria-label="Carrusel de tipologías"
            >
              {typologies.map((typology, index) => (
                <div
                  key={typology.id}
                  ref={index === 0 ? slideRef : undefined}
                  className={`flex-none w-full ${
                    slidesToShow === 3 ? 'md:w-[calc(33.333%-1.333rem)]' :
                    slidesToShow === 2 ? 'md:w-[calc(50%-1rem)]' :
                    'w-full'
                  }`}
                  role="tabpanel"
                  aria-label={`Tipología ${index + 1} de ${typologies.length}`}
                >
                  <div className="bg-gray-50 rounded-3xl overflow-hidden h-full">
                    <div className="aspect-[4/3] overflow-hidden p-4 md:p-8">
                      <img
                        src={typology.image}
                        alt={typology.alt}
                        className="w-full h-full object-contain max-h-[200px] md:max-h-none"
                        loading="lazy"
                        width="400"
                        height="300"
                      />
                    </div>
                    <div className="p-8 pt-4">
                      <h4 className="text-xl font-bold mb-3">{typology.title}</h4>
                      <p className="text-gray-600">{typology.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Indicators - Solo visible en desktop */}
          <div className="hidden md:flex justify-center gap-4 mt-8">
            {Array.from({ length: Math.ceil((totalSlides - slidesToShow + 1) / 1) }).map((_, index) => {
              const isActive = currentSlide === index;
              return (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`min-w-[48px] min-h-[48px] rounded-full transition-all duration-200 flex items-center justify-center ${
                    isActive
                      ? 'bg-black w-12 text-white'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Ir a tipología ${index + 1}`}
                  aria-current={isActive ? 'true' : 'false'}
                >
                  <span className="sr-only">Tipología {index + 1}</span>
                  <div className="w-2 h-2 rounded-full bg-current" />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductLines;
