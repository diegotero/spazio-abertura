import { useEffect } from 'react';
import ReactGA from 'react-ga4';

const GA_MEASUREMENT_ID = 'G-FD37QTMWVG';

// Tipos de eventos
export const trackEvent = (category: string, action: string, label?: string) => {
  ReactGA.event({
    category,
    action,
    label
  });
};

// Configuración de objetivos personalizados
const setupCustomMetrics = () => {
  ReactGA.set({
    metric1: 1, // Métrica personalizada para usuarios que interactúan con el formulario
    metric2: 1  // Métrica personalizada para usuarios que usan WhatsApp
  });
};

// Seguimiento de tiempo en página
const trackTimeOnPage = () => {
  let startTime = Date.now();
  
  window.addEventListener('beforeunload', () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000); // tiempo en segundos
    if (timeSpent > 180) { // más de 3 minutos
      trackEvent('Engagement', 'TimeOnPage', 'More than 3 minutes');
    }
  });
};

const Analytics = () => {
  useEffect(() => {
    // Inicialización de GA4
    ReactGA.initialize(GA_MEASUREMENT_ID);
    
    // Vista de página inicial
    ReactGA.send({ 
      hitType: "page_view",
      page: window.location.pathname
    });

    // Configurar métricas personalizadas
    setupCustomMetrics();

    // Iniciar seguimiento de tiempo en página
    trackTimeOnPage();

    // Seguimiento de clics en enlaces externos
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === 'A' && target.href && target.href.startsWith('http')) {
        trackEvent('Enlaces', 'Click', target.href);
      }
    });

    // Seguimiento de scrolling
    let maxScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = Math.round((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100);
      if (currentScroll > maxScroll) {
        maxScroll = currentScroll;
        if (maxScroll >= 90) { // Usuario llegó al 90% de la página
          trackEvent('Engagement', 'Scroll', '90% de la página');
        }
      }
    });

    // Cleanup
    return () => {
      window.removeEventListener('beforeunload', () => {});
      document.removeEventListener('click', () => {});
      window.removeEventListener('scroll', () => {});
    };
  }, []);

  return null;
};

export default Analytics;
