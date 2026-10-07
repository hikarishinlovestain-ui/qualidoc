import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IMAGES } from '../assets/images';

interface Props {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  enableZoom?: boolean;
  darkMode?: boolean;
}

export default function AcademicImage({ src, alt, caption, className = '', enableZoom = true, darkMode = true }: Props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const handleError = () => {
    setHasError(true);
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleClick = () => {
    if (enableZoom && !hasError) {
      setIsZoomed(true);
    }
  };

  return (
    <>
      <figure className={`relative group ${className}`}>
        <div className={`relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ${enableZoom ? 'cursor-zoom-in' : ''}`}>
          {!isLoaded && !hasError && (
            <div className={`absolute inset-0 flex items-center justify-center ${darkMode ? 'bg-[#1a2b12]' : 'bg-gray-100'}`}>
              <div className="animate-pulse flex flex-col items-center gap-2">
                <div className="w-8 h-8 border-2 border-[#D4A017] border-t-transparent rounded-full animate-spin" />
                <span className={`text-xs ${darkMode ? 'text-[#4a7a2e]' : 'text-gray-500'}`}>Carregando...</span>
              </div>
            </div>
          )}
          
          {hasError ? (
            <div className={`aspect-video flex flex-col items-center justify-center ${darkMode ? 'bg-[#1a2b12]' : 'bg-gray-100'}`}>
              <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Imagem indisponível</span>
            </div>
          ) : (
            <img
              src={src}
              alt={alt}
              loading="lazy"
              onLoad={handleLoad}
              onError={handleError}
              onClick={handleClick}
              className={`w-full h-auto object-contain transition-transform duration-300 ${enableZoom ? 'group-hover:scale-105' : ''} ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
          )}
        </div>
        
        {caption && (
          <figcaption className={`mt-2 text-xs text-center italic ${darkMode ? 'text-[#4a7a2e]' : 'text-gray-600'}`}>
            {caption}
          </figcaption>
        )}
      </figure>

      {/* Zoom Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 cursor-zoom-out"
            onClick={() => setIsZoomed(false)}
          >
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={src}
              alt={alt}
              className="max-w-full max-h-full object-contain"
            />
            <button
              className="absolute top-4 right-4 text-white text-3xl hover:text-[#D4A017] transition-colors"
              onClick={() => setIsZoomed(false)}
            >
              ×
            </button>
            {caption && (
              <div className="absolute bottom-4 left-0 right-0 text-center text-white text-sm">
                {caption}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Helper para mapear nomes de compostos para imagens
export const getCompoundImage = (compoundName: string): string | null => {
  const normalized = compoundName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  
  if (normalized.includes('xantohumol')) return IMAGES.xantohumol;
  if (normalized.includes('hordenina')) return IMAGES.hordenina;
  if (normalized.includes('linoleico')) return IMAGES.acidoLinoleico;
  if (normalized.includes('erucamida')) return IMAGES.erucamida;
  if (normalized.includes('ftalico') || normalized.includes('ftálico')) return IMAGES.anidridoFtalico;
  if (normalized.includes('diterpeno') || normalized.includes('labdano')) return IMAGES.diterpenoide;
  
  return null;
};
