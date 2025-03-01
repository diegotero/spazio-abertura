import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { useScrollTo } from '../hooks/useScrollTo';

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Ventanas Modernas para Residencia",
    description: "Diseño minimalista con eficiencia energética y máxima luminosidad",
    category: "Residencial",
    imageUrl: "https://vrrohcaovubbp0uw.public.blob.vercel-storage.com/clientes/spazio/fotos-proyectos/fotos-proyecto-spazio-aberturas%20(19)-NcLieh9cxgIytd8iReVwOeLL4tpM2a.avif"
  },
  {
    id: 2,
    title: "Puertas Corredizas Panorámicas",
    description: "Sistema de apertura suave con vista despejada al exterior",
    category: "Residencial",
    imageUrl: "https://vrrohcaovubbp0uw.public.blob.vercel-storage.com/clientes/spazio/fotos-proyectos/fotos-proyecto-spazio-aberturas%20(1)-DWz9uubOSjbOmzb2hYQa7zL8VHnZia.jpg"
  },
  {
    id: 3,
    title: "Ventanales de Piso a Techo",
    description: "Máxima iluminación natural con aislamiento térmico superior",
    category: "Comercial",
    imageUrl: "https://vrrohcaovubbp0uw.public.blob.vercel-storage.com/clientes/spazio/fotos-proyectos/fotos-proyecto-spazio-aberturas%20(10)-YAym2aKzKfstLRc8nxZdre7Ps1irLc.jpg"
  },
  {
    id: 4,
    title: "Fachada Integral Moderna",
    description: "Diseño contemporáneo con alto rendimiento energético",
    category: "Corporativo",
    imageUrl: "https://vrrohcaovubbp0uw.public.blob.vercel-storage.com/clientes/spazio/fotos-proyectos/fotos-proyecto-spazio-aberturas%20(11)-mIWYZXcsdEXu5MMNk8t9MCjtXgOwuL.jpg"
  },
  {
    id: 5,
    title: "Sistema de Ventanas Premium",
    description: "Solución personalizada con máximo confort acústico",
    category: "Residencial",
    imageUrl: "https://vrrohcaovubbp0uw.public.blob.vercel-storage.com/clientes/spazio/fotos-proyectos/fotos-proyecto-spazio-aberturas%20(12)-EUVu9yhqmw78V23BMn8SX1a29xyzYb.jpg"
  },
  {
    id: 6,
    title: "Puertas de Acceso Exclusivas",
    description: "Diseño elegante con sistema de seguridad integrado",
    category: "Comercial",
    imageUrl: "https://vrrohcaovubbp0uw.public.blob.vercel-storage.com/clientes/spazio/fotos-proyectos/fotos-proyecto-spazio-aberturas%20(13)-cnSWQZRmdtm6cxcvEp4QkV5Zlm2K6w.jpg"
  },
  {
    id: 7,
    title: "Ventanas Oscilobatientes",
    description: "Sistema versátil con múltiples funciones de apertura",
    category: "Residencial",
    imageUrl: "https://vrrohcaovubbp0uw.public.blob.vercel-storage.com/clientes/spazio/fotos-proyectos/fotos-proyecto-spazio-aberturas%20(15)-OCboBeyOqVu3vWEVWd2Gb1GYtRgCcb.jpg"
  },
  {
    id: 8,
    title: "Fachada Vidriada Integral",
    description: "Máxima transparencia con control solar eficiente",
    category: "Corporativo",
    imageUrl: "https://vrrohcaovubbp0uw.public.blob.vercel-storage.com/clientes/spazio/fotos-proyectos/fotos-proyecto-spazio-aberturas%20(14)-pmopbgZPA4tJS8POkncml18koAN649.jpg"
  },
  {
    id: 9,
    title: "Ventanas Panorámicas",
    description: "Vistas espectaculares con máximo aislamiento",
    category: "Residencial",
    imageUrl: "https://vrrohcaovubbp0uw.public.blob.vercel-storage.com/clientes/spazio/fotos-proyectos/fotos-proyecto-spazio-aberturas%20(16)-hgqVbka6CNKz5zBNDHuCLPjKxXKwOs.jpg"
  },
  {
    id: 10,
    title: "Sistema Corredizo Premium",
    description: "Apertura suave con diseño minimalista",
    category: "Residencial",
    imageUrl: "https://vrrohcaovubbp0uw.public.blob.vercel-storage.com/clientes/spazio/fotos-proyectos/fotos-proyecto-spazio-aberturas%20(17)-3mBzKt0si7yu8QNQBS4XDv8NmTMuHA.jpg"
  },
  {
    id: 11,
    title: "Ventanas de Alto Rendimiento",
    description: "Eficiencia energética con diseño contemporáneo",
    category: "Comercial",
    imageUrl: "https://vrrohcaovubbp0uw.public.blob.vercel-storage.com/clientes/spazio/fotos-proyectos/fotos-proyecto-spazio-aberturas%20(18)-wV77c20MUp2Zh2e1trPJpwhUHuBq7q.jpg"
  },
  {
    id: 12,
    title: "Puertas Plegadizas",
    description: "Máxima apertura con mínimo espacio",
    category: "Residencial",
    imageUrl: "https://vrrohcaovubbp0uw.public.blob.vercel-storage.com/clientes/spazio/fotos-proyectos/fotos-proyecto-spazio-aberturas%20(2)-ejRrC6Ys09eUeyrbJJkQl4rdE8bmkp.jpg"
  }
];

const ITEMS_PER_PAGE = 6;

const ProjectGallery: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const scrollTo = useScrollTo();

  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);
  const currentProjects = projects.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === totalPages - 1;

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isModalOpen) return;

    switch (e.key) {
      case 'Escape':
        setIsModalOpen(false);
        break;
      case 'ArrowLeft':
        navigateProject(-1);
        break;
      case 'ArrowRight':
        navigateProject(1);
        break;
    }
  }, [isModalOpen]);

  const navigateProject = (direction: number) => {
    if (!selectedProject) return;
    const currentIndex = projects.findIndex(p => p.id === selectedProject.id);
    const newIndex = (currentIndex + direction + projects.length) % projects.length;
    setSelectedProject(projects[newIndex]);
  };

  const nextPage = () => {
    if (!isLastPage) {
      setCurrentPage(prev => prev + 1);
      scrollTo('proyectos');
    }
  };

  const prevPage = () => {
    if (!isFirstPage) {
      setCurrentPage(prev => prev - 1);
      scrollTo('proyectos');
    }
  };

  const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
    const { ref, inView } = useInView({
      triggerOnce: true,
      threshold: 0.1
    });

    return (
      <div
        ref={ref}
        className={`relative overflow-hidden rounded-xl transition-all duration-500 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <button
          onClick={() => {
            setSelectedProject(project);
            setIsModalOpen(true);
          }}
          className="group relative w-full aspect-[4/3] overflow-hidden rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          aria-label={`Ver proyecto: ${project.title}`}
        >
          <img
            src={project.imageUrl}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-sm text-white/80">{project.category}</p>
            </div>
          </div>
        </button>
      </div>
    );
  };

  return (
    <section id="proyectos" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">Nuestros proyectos</h2>
          <p className="text-xl text-gray-600">
            Descubrí cómo transformamos espacios con nuestras soluciones en aberturas de aluminio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {currentProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="flex justify-center items-center mt-20">
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={prevPage}
              disabled={isFirstPage}
              className={`flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-100 active:scale-95 ${
                isFirstPage
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-black text-white hover:bg-black/90'
              }`}
              aria-label="Página anterior"
            >
              <ArrowLeft size={20} />
              <span className="hidden sm:inline font-medium">Anterior</span>
            </button>
            
            <div className="font-medium text-gray-700 px-4">
              Página {currentPage + 1} de {totalPages}
            </div>
            
            <button
              onClick={nextPage}
              disabled={isLastPage}
              className={`flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-100 active:scale-95 ${
                isLastPage
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-black text-white hover:bg-black/90'
              }`}
              aria-label="Página siguiente"
            >
              <span className="hidden sm:inline font-medium">Siguiente</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {isModalOpen && selectedProject && (
          <ProjectModal
            selectedProject={selectedProject}
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            navigateProject={navigateProject}
          />
        )}
      </div>
    </section>
  );
};

interface ProjectModalProps {
  selectedProject: Project;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  navigateProject: (direction: number) => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ selectedProject, isOpen, setIsOpen, navigateProject }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'Escape':
        setIsOpen(false);
        break;
      case 'ArrowLeft':
        navigateProject(-1);
        break;
      case 'ArrowRight':
        navigateProject(1);
        break;
    }
  }, [isOpen, setIsOpen, navigateProject]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={(e) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) setIsOpen(false);
      }}
    >
      <div className="relative w-full max-w-6xl mx-auto p-4" ref={modalRef}>
        <div className="relative">
          <img
            src={selectedProject.imageUrl}
            alt={selectedProject.title}
            className="w-full h-auto rounded-lg"
          />
          
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8 rounded-b-lg">
            <h3 className="text-2xl font-bold text-white mb-2">{selectedProject.title}</h3>
            <p className="text-white/80">{selectedProject.description}</p>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 focus:outline-none"
            aria-label="Cerrar"
          >
            <X size={24} />
          </button>

          <button
            onClick={() => navigateProject(-1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 focus:outline-none"
            aria-label="Proyecto anterior"
          >
            <ChevronLeft size={36} />
          </button>

          <button
            onClick={() => navigateProject(1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 focus:outline-none"
            aria-label="Proyecto siguiente"
          >
            <ChevronRight size={36} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectGallery;
