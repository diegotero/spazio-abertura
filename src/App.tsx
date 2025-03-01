import React, { useState } from 'react';
import { useLockBodyScroll } from 'react-use';
import { Menu, X, Shield, Clock, HandshakeIcon, Phone, Mail, MapPin, Instagram, Facebook, Linkedin, CheckCircle2, Award, Rocket, Timer, Leaf, Users } from 'lucide-react';
import ProjectGallery from './components/ProjectGallery';
import ContactSection from './components/ContactSection';
import FAQSection from './components/FAQSection';
import MaterialsSection from './components/MaterialsSection';
import ScrollToTop from './components/ScrollToTop';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import { useInView } from 'react-intersection-observer';
import ProductLines from './components/ProductLines';
import WhatWeDoSection from './components/WhatWeDoSection';
import { trackEvent } from './components/Analytics';

// Image URLs
const HERO_MOBILE_URL = "https://vrrohcaovubbp0uw.public.blob.vercel-storage.com/clientes/spazio/bg-hero-aberturas-spazio-y63FuqTWk6UYy6elWeJWYcxRGohWWd.avif";
const HERO_DESKTOP_URL = "https://vrrohcaovubbp0uw.public.blob.vercel-storage.com/clientes/spazio/bg-hero-aberturas-spazio-y63FuqTWk6UYy6elWeJWYcxRGohWWd.avif";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useLockBodyScroll(isMenuOpen);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const handleEventTracking = (category: string, action: string, label: string) => {
    trackEvent(category, action, label);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="relative md:fixed top-0 left-0 right-0 bg-black/95 text-white z-50 md:shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)]">
        <nav className="container mx-auto px-6 py-4" aria-label="Navegación principal">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold flex items-center gap-2">
              <img 
                src="https://vrrohcaovubbp0uw.public.blob.vercel-storage.com/clientes/spazio/logo-spazio-aberturas-blanco-zE4aPsFPgK0GwjZS6uiuR4zV9Eu5Qz.webp" 
                alt="Spazio Aberturas" 
                className="h-[4.5rem] w-auto"
                width="180"
                height="72"
                loading="eager"
                fetchPriority="high"
              />
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a 
                href="#que-hacemos" 
                className="text-white/80 hover:text-white transition-colors duration-200 px-4 py-2"
                onClick={() => handleEventTracking('Navegación', 'Click', 'Qué hacemos')}
              >
                Qué hacemos
              </a>
              <a 
                href="#proyectos" 
                className="text-white/80 hover:text-white transition-colors duration-200 px-4 py-2"
                onClick={() => handleEventTracking('Navegación', 'Click', 'Proyectos')}
              >
                Proyectos
              </a>
              <a 
                href="#preguntas-frecuentes" 
                className="text-white/80 hover:text-white transition-colors duration-200 px-4 py-2"
                onClick={() => handleEventTracking('Navegación', 'Click', 'Preguntas frecuentes')}
              >
                Preguntas frecuentes
              </a>
              <a 
                href="#donde-estamos" 
                className="text-white/80 hover:text-white transition-colors duration-200 px-4 py-2"
                onClick={() => handleEventTracking('Navegación', 'Click', 'Dónde estamos')}
              >
                Dónde estamos
              </a>
              <a 
                href="#contacto" 
                className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-100 transition-all duration-200"
                onClick={() => handleEventTracking('CTA', 'Click', 'Header - Pedí asesoramiento')}
              >
                ¡Pedí asesoramiento!
              </a>
            </div>

            <div className="md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className="p-2 z-50 relative min-w-[48px] min-h-[48px]"
                aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <>
              <div 
                className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden z-40"
                onClick={() => setIsMenuOpen(false)}
                aria-hidden="true"
              />
              <div 
                id="mobile-menu"
                className="absolute top-[73px] left-0 right-0 bg-black/95 md:hidden z-50"
                role="dialog"
                aria-modal="true"
                aria-label="Menú móvil"
              >
                <nav className="container mx-auto px-6 py-8 space-y-6">
                  <a 
                    href="#que-hacemos" 
                    className="block text-white/80 hover:text-white py-2 transition-colors duration-200"
                    onClick={() => {
                      handleLinkClick();
                      handleEventTracking('Navegación', 'Click Mobile', 'Qué hacemos');
                    }}
                  >
                    Qué hacemos
                  </a>
                  <a 
                    href="#proyectos" 
                    className="block text-white/80 hover:text-white py-2 transition-colors duration-200"
                    onClick={() => {
                      handleLinkClick();
                      handleEventTracking('Navegación', 'Click Mobile', 'Proyectos');
                    }}
                  >
                    Proyectos
                  </a>
                  <a 
                    href="#preguntas-frecuentes" 
                    className="block text-white/80 hover:text-white py-2 transition-colors duration-200"
                    onClick={() => {
                      handleLinkClick();
                      handleEventTracking('Navegación', 'Click Mobile', 'Preguntas frecuentes');
                    }}
                  >
                    Preguntas frecuentes
                  </a>
                  <a 
                    href="#donde-estamos" 
                    className="block text-white/80 hover:text-white py-2 transition-colors duration-200"
                    onClick={() => {
                      handleLinkClick();
                      handleEventTracking('Navegación', 'Click Mobile', 'Dónde estamos');
                    }}
                  >
                    Dónde estamos
                  </a>
                  <a 
                    href="#contacto" 
                    className="block bg-white text-black px-6 py-2 rounded-full hover:bg-gray-100 text-center transition-all duration-200"
                    onClick={() => {
                      handleLinkClick();
                      handleEventTracking('CTA', 'Click Mobile', 'Pedí asesoramiento');
                    }}
                  >
                    ¡Pedí asesoramiento!
                  </a>
                </nav>
              </div>
            </>
          )}
        </nav>
      </header>

      {/* Padding compensatorio solo en desktop */}
      <div className="hidden md:block h-24"></div>

      {/* Hero Section */}
      <main>
        <section className="relative pt-32 pb-20 overflow-hidden" aria-labelledby="hero-heading">
          <div className="absolute inset-0">
            <picture>
              <source 
                media="(min-width: 769px)" 
                srcSet={HERO_DESKTOP_URL}
                width="1920"
                height="1080"
              />
              <source 
                media="(max-width: 768px)" 
                srcSet={HERO_MOBILE_URL}
                width="828"
                height="1200"
              />
              <img 
                src={HERO_DESKTOP_URL}
                alt=""
                className="w-full h-full object-cover"
                width="1920"
                height="1080"
                loading="eager"
                fetchPriority="high"
                aria-hidden="true"
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-black/30" aria-hidden="true" />
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} aria-hidden="true" />
          </div>
          
          <div className="container mx-auto px-6 relative">
            <div className="max-w-6xl mx-auto text-center mb-20">
              <h1 id="hero-heading" className="text-4xl md:text-6xl font-bold mb-8 leading-tight text-white">
                Transformamos espacios con aberturas de aluminio de alta calidad
              </h1>
              <p className="text-xl text-white/90 mb-16 leading-relaxed max-w-3xl mx-auto">
                En Spazio Aberturas, combinamos innovación, rapidez y atención personalizada para que tu proyecto sea impecable, desde el diseño hasta la instalación.
              </p>
              <a 
                href="#contacto" 
                className="bg-white text-black px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-100 inline-block transform hover:scale-105 transition-transform duration-200"
                onClick={() => handleEventTracking('CTA', 'Click', 'Hero - Pedí asesoramiento')}
              >
                ¡Pedí asesoramiento!
              </a>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-8 mt-20">
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl hover:bg-white/15 transition-all duration-300 border border-white/20">
                <Shield className="w-12 h-12 mb-6 text-white" aria-hidden="true" />
                <h2 className="text-xl font-bold mb-4 text-white">Fabricación a medida</h2>
                <p className="text-white/90 leading-relaxed">
                  Creamos aberturas de aluminio personalizadas para adaptarnos a tus necesidades y estilo, garantizando la máxima calidad en cada proyecto.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl hover:bg-white/15 transition-all duration-300 border border-white/20">
                <Clock className="w-12 h-12 mb-6 text-white" aria-hidden="true" />
                <h2 className="text-xl font-bold mb-4 text-white">Instalación rápida</h2>
                <p className="text-white/90 leading-relaxed">
                  Tenemos tu abertura lista en 30 días, garantizando un montaje rápido sin interrumpir el cronograma de tu obra.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl hover:bg-white/15 transition-all duration-300 border border-white/20">
                <HandshakeIcon className="w-12 h-12 mb-6 text-white" aria-hidden="true" />
                <h2 className="text-xl font-bold mb-4 text-white">Soporte integral</h2>
                <p className="text-white/90 leading-relaxed">
                  Desde la consulta inicial hasta la instalación, incluyendo servicio de postventa, para hacer de tu proyecto un éxito.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What We Do Section */}
        <WhatWeDoSection />

        {/* Product Lines Section */}
        <ProductLines />

        {/* Materials Section */}
        <MaterialsSection />

        {/* Why Choose Us Section */}
        <section className="py-24 bg-gray-50" aria-labelledby="why-choose-us-heading">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 id="why-choose-us-heading" className="text-4xl font-bold mb-6">¿Por qué elegirnos?</h2>
              <p className="text-xl text-gray-600">Descubrí por qué somos la elección preferida en aberturas de aluminio.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {/* Card 1 */}
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group">
                <Award className="w-12 h-12 mb-6 text-black group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                <h3 className="text-xl font-bold mb-3">5 años transformando espacios</h3>
                <p className="text-gray-600">Respaldados por Lucy's House, referentes en fabricación e instalación de viviendas modulares transportables en steel frame.</p>
              </div>

              {/* Card 2 */}
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group">
                <HandshakeIcon className="w-12 h-12 mb-6 text-black group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                <h3 className="text-xl font-bold mb-3">Acompañamiento integral garantizado</h3>
                <p className="text-gray-600">Asesoramiento técnico especializado desde la consulta inicial hasta la instalación final.</p>
              </div>

              {/* Card 3 */}
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group">
                <Rocket className="w-12 h-12 mb-6 text-black group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                <h3 className="text-xl font-bold mb-3">Tecnología de vanguardia</h3>
                <p className="text-gray-600">Diseño y fabricación con software 3D de última generación para máxima precisión.</p>
              </div>

              {/* Card 4 */}
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group">
                <Timer className="w-12 h-12 mb-6 text-black group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                <h3 className="text-xl font-bold mb-3">Entregas ágiles y precisas</h3>
                <p className="text-gray-600">Optimizamos procesos para cumplir plazos sin comprometer calidad.</p>
              </div>

              {/* Card 5 */}
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group">
                <Leaf className="w-12 h-12 mb-6 text-black group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                <h3 className="text-xl font-bold mb-3">Compromiso sustentable</h3>
                <p className="text-gray-600">Materiales de alta resistencia y eficiencia energética que cuidan el medio ambiente.</p>
              </div>

              {/* Card 6 */}
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group">
                <Users className="w-12 h-12 mb-6 text-black group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                <h3 className="text-xl font-bold mb-3">Expertos apasionados</h3>
                <p className="text-gray-600">Equipo especializado que transforma ideas en soluciones arquitectónicas excepcionales.</p>
              </div>
            </div>

            <div className="text-center">
              <a 
                href="#contacto" 
                className="inline-block bg-black text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-900 transform hover:scale-105 transition-all duration-300"
                onClick={() => handleEventTracking('CTA', 'Click', 'Why Choose Us - Iniciá tu proyecto')}
              >
                Iniciá tu proyecto hoy
              </a>
            </div>
          </div>
        </section>

        {/* Project Gallery */}
        <ProjectGallery />

        {/* Contact Section */}
        <ContactSection />

        {/* FAQ Section */}
        <FAQSection />
      </main>

      {/* Footer */}
      <footer className="bg-black text-white pt-20 pb-8" itemScope itemType="http://schema.org/Organization">
        <div className="container mx-auto px-6">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
            {/* Brand Column */}
            <div className="lg:col-span-4">
              <a href="/" className="block mb-6">
                <img 
                  src="https://vrrohcaovubbp0uw.public.blob.vercel-storage.com/clientes/spazio/logo-spazio-aberturas-blanco-1yLmpbXhdFFpBkrYIhtXVLYpsKWPYG.webp" 
                  alt="Spazio Aberturas"
                  className="h-28 w-auto"
                  width="280"
                  height="112"
                  loading="lazy"
                  itemProp="logo"
                />
              </a>
              <p className="text-gray-400 mb-6" itemProp="description">
                Spazio Aberturas: Fabricantes de aberturas de aluminio de alta calidad en Córdoba. Ofrecemos diseño personalizado, entrega rápida y servicios de instalación profesional. Transformamos tus espacios con soluciones eficientes y duraderas.
              </p>
              <div className="flex items-center gap-4">
                <a 
                  href="https://www.instagram.com/spazio.aberturas/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-300 p-2 min-w-[48px] min-h-[48px] flex items-center justify-center"
                  aria-label="Seguinos en Instagram"
                  onClick={() => handleEventTracking('Social', 'Click', 'Instagram')}
                >
                  <Instagram size={24} aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Navigation Columns */}
            <nav className="lg:col-span-2" aria-label="Footer navigation">
              <h2 className="text-lg font-bold mb-4">Navegación</h2>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="#que-hacemos" 
                    className="text-gray-400 hover:text-white transition-colors duration-200 px-4 py-2 block"
                    onClick={() => handleEventTracking('Footer', 'Click', 'Qué Hacemos')}
                  >
                    Qué Hacemos
                  </a>
                </li>
                <li>
                  <a 
                    href="#proyectos" 
                    className="text-gray-400 hover:text-white transition-colors duration-200 px-4 py-2 block"
                    onClick={() => handleEventTracking('Footer', 'Click', 'Proyectos')}
                  >
                    Proyectos
                  </a>
                </li>
                <li>
                  <a 
                    href="#donde-estamos" 
                    className="text-gray-400 hover:text-white transition-colors duration-200 px-4 py-2 block"
                    onClick={() => handleEventTracking('Footer', 'Click', 'Dónde Estamos')}
                  >
                    Dónde Estamos
                  </a>
                </li>
                <li>
                  <a 
                    href="#contacto" 
                    className="text-gray-400 hover:text-white transition-colors duration-200 px-4 py-2 block"
                    onClick={() => handleEventTracking('Footer', 'Click', 'Contacto')}
                  >
                    Contacto
                  </a>
                </li>
              </ul>
            </nav>

            <nav className="lg:col-span-2" aria-label="Productos">
              <h2 className="text-lg font-bold mb-4">Productos</h2>
              <ul className="space-y-3" itemProp="hasOfferCatalog" itemScope itemType="http://schema.org/OfferCatalog">
                <li itemProp="itemListElement" itemScope itemType="http://schema.org/Offer">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 px-4 py-2 block" itemProp="itemOffered">Ventanas</a>
                </li>
                <li itemProp="itemListElement" itemScope itemType="http://schema.org/Offer">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 px-4 py-2 block" itemProp="itemOffered">Puertas</a>
                </li>
                <li itemProp="itemListElement" itemScope itemType="http://schema.org/Offer">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 px-4 py-2 block" itemProp="itemOffered">Mamparas</a>
                </li>
                <li itemProp="itemListElement" itemScope itemType="http://schema.org/Offer">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 px-4 py-2 block" itemProp="itemOffered">Barandas</a>
                </li>
              </ul>
            </nav>

            <div className="lg:col-span-4">
              <h2 className="text-lg font-bold mb-4">Contacto</h2>
              <ul className="space-y-4">
                <li>
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=-31.298460,-64.171692" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors duration-200 p-2"
                    itemProp="address" 
                    itemScope 
                    itemType="http://schema.org/PostalAddress"
                    onClick={() => handleEventTracking('Contacto', 'Click', 'Mapa')}
                  >
                    <MapPin className="flex-shrink-0 mt-1" aria-hidden="true" />
                    <span>
                      <span itemProp="streetAddress">Ruta 9 norte Km 716 ½</span><br />
                      <span itemProp="addressLocality">Juárez Celman</span>,{' '}
                      <span itemProp="addressRegion">Córdoba</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a 
                    href="tel:+5493516224280" 
                    className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-200 p-2"
                    itemProp="telephone"
                    onClick={() => handleEventTracking('Contacto', 'Click', 'Teléfono')}
                  >
                    <Phone className="flex-shrink-0" aria-hidden="true" />
                    (+54) 9 351 622 4280
                  </a>
                </li>
                <li>
                  <a 
                    href="mailto:spazio.aberturas@gmail.com" 
                    className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-200 p-2"
                    itemProp="email"
                    onClick={() => handleEventTracking('Contacto', 'Click', 'Email')}
                  >
                    <Mail className="flex-shrink-0" aria-hidden="true" />
                    spazio.aberturas@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-3 text-gray-400 p-2">
                  <Clock className="flex-shrink-0" aria-hidden="true" />
                  <span itemProp="openingHours" content="Mo-Fr 08:00-17:00">
                    Lun a Vie de 8 a 17 hs
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="pt-8 border-t border-gray-800">
            <p className="text-gray-400 text-sm text-center">
              © {new Date().getFullYear()} Spazio Aberturas. Todos los derechos reservados.
            </p>
          </div>
        </div>

        {/* Hidden SEO Content */}
        <div className="hidden" itemProp="name">Spazio Aberturas</div>
        <div className="hidden" itemProp="url">https://spazioaberturas.com.ar</div>
        <div className="hidden" itemProp="foundingDate">2000</div>
        <div className="hidden" itemProp="areaServed">Córdoba, Argentina</div>
        <div className="hidden" itemProp="priceRange">$$$</div>
        <div className="hidden" itemProp="keywords">aberturas de aluminio, ventanas de aluminio, puertas de aluminio, mamparas, barandas, cerramientos, carpintería de aluminio, Córdoba, Juárez Celman</div>
      </footer>

      {/* Botones flotantes */}
      <ScrollToTop />
      <FloatingWhatsApp />
    </div>
  );
}

export default App;
