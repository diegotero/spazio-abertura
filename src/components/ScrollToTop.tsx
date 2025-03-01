import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import throttle from 'lodash/throttle';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const threshold = scrollHeight * 0.25;
      
      setIsVisible(scrollTop > threshold);
    };

    const throttledToggleVisibility = throttle(toggleVisibility, 100);

    window.addEventListener('scroll', throttledToggleVisibility);
    return () => window.removeEventListener('scroll', throttledToggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-20 right-4 z-40 bg-black text-white p-4 rounded-full shadow-lg hover:scale-95 transition-transform duration-200 md:right-6 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0 pointer-events-none'
      }`}
      aria-label="Volver arriba"
    >
      <ArrowUp size={24} />
    </button>
  );
};

export default ScrollToTop;
