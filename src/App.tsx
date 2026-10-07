import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Block1Cover from './components/Block1Cover';
import Block2Problem from './components/Block2Problem';
import Block3Hypotheses from './components/Block3Hypotheses';
import Block4Methodology from './components/Block4Methodology';
import Block5Phytochemistry from './components/Block5Phytochemistry';
import Block6Curves from './components/Block6Curves';
import Block7Antifungal from './components/Block7Antifungal';
import Block8Timeline from './components/Block8Timeline';
import Block9Conclusions from './components/Block9Conclusions';

const sections = [
  { id: 'cover', label: 'Capa' },
  { id: 'problem', label: 'Problema' },
  { id: 'hypotheses', label: 'Hipóteses' },
  { id: 'methodology', label: 'Metodologia' },
  { id: 'phytochemistry', label: 'Fitoquímica' },
  { id: 'curves', label: 'Curvas FBA' },
  { id: 'antifungal', label: 'Antifúngico' },
  { id: 'timeline', label: 'Cronograma' },
  { id: 'conclusions', label: 'Conclusões' },
];

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState(0);
  const [presentationMode, setPresentationMode] = useState(false);
  const [showNav, setShowNav] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    document.documentElement.classList.toggle('light', !darkMode);
  }, [darkMode]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'f' || e.key === 'F') {
        setPresentationMode(prev => !prev);
      }
      if (e.key === 'd' || e.key === 'D') {
        setDarkMode(prev => !prev);
      }
      if (presentationMode) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          setActiveSection(prev => Math.min(prev + 1, sections.length - 1));
        }
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          setActiveSection(prev => Math.max(prev - 1, 0));
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [presentationMode]);

  useEffect(() => {
    if (presentationMode) {
      const el = document.getElementById(sections[activeSection].id);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeSection, presentationMode]);

  const handleScroll = useCallback(() => {
    if (presentationMode) return;
    const scrollPos = window.scrollY + window.innerHeight / 2;
    const sectionElements = sections.map(s => document.getElementById(s.id));
    for (let i = sectionElements.length - 1; i >= 0; i--) {
      const el = sectionElements[i];
      if (el && el.offsetTop <= scrollPos) {
        setActiveSection(i);
        break;
      }
    }
  }, [presentationMode]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToSection = (index: number) => {
    setActiveSection(index);
    const el = document.getElementById(sections[index].id);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-[#0a0f07] text-[#F5E6C8]' : 'bg-[#faf8f0] text-[#1a1a1a]'}`}>
      {/* Navigation Dots */}
      <AnimatePresence>
        {showNav && !presentationMode && (
          <motion.nav
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="fixed left-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3"
          >
            {sections.map((section, i) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(i)}
                className={`nav-dot w-3 h-3 rounded-full border-2 transition-all ${
                  i === activeSection
                    ? 'bg-[#D4A017] border-[#D4A017] scale-150'
                    : darkMode
                    ? 'bg-transparent border-[#4a7a2e] hover:border-[#D4A017]'
                    : 'bg-transparent border-[#2D5016] hover:border-[#D4A017]'
                }`}
                title={section.label}
              />
            ))}
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Controls */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded-full transition-all ${darkMode ? 'bg-[#1a2b12] text-[#D4A017]' : 'bg-[#2D5016] text-[#F5E6C8]'} hover:scale-110`}
          title="Alternar tema (D)"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
        <button
          onClick={() => setPresentationMode(!presentationMode)}
          className={`p-2 rounded-full transition-all ${darkMode ? 'bg-[#1a2b12] text-[#D4A017]' : 'bg-[#2D5016] text-[#F5E6C8]'} hover:scale-110`}
          title="Modo apresentação (F)"
        >
          📽️
        </button>
        <button
          onClick={() => setShowNav(!showNav)}
          className={`p-2 rounded-full transition-all ${darkMode ? 'bg-[#1a2b12] text-[#D4A017]' : 'bg-[#2D5016] text-[#F5E6C8]'} hover:scale-110`}
          title="Mostrar/ocultar navegação"
        >
          ☰
        </button>
      </div>

      {/* Presentation Mode Indicator */}
      <AnimatePresence>
        {presentationMode && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#D4A017] text-[#0a0f07] px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-3"
          >
            <span>Modo Apresentação</span>
            <span className="text-xs opacity-70">← → navegar | F sair</span>
            <span className="bg-[#0a0f07] text-[#D4A017] px-2 py-0.5 rounded-full text-xs">
              {activeSection + 1}/{sections.length}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main>
        <Block1Cover darkMode={darkMode} />
        <Block2Problem darkMode={darkMode} />
        <Block3Hypotheses darkMode={darkMode} />
        <Block4Methodology darkMode={darkMode} />
        <Block5Phytochemistry darkMode={darkMode} />
        <Block6Curves darkMode={darkMode} />
        <Block7Antifungal darkMode={darkMode} />
        <Block8Timeline darkMode={darkMode} />
        <Block9Conclusions darkMode={darkMode} />
      </main>

      {/* Footer */}
      <footer className={`py-8 text-center text-sm ${darkMode ? 'text-[#4a7a2e]' : 'text-[#2D5016]'}`}>
        <p>Painel de Qualificação de Doutorado — Outubro 2026</p>
        <p className="mt-1 text-xs opacity-60">
          Pressione <kbd className="px-1 py-0.5 rounded border border-current">F</kbd> para modo apresentação | 
          <kbd className="px-1 py-0.5 rounded border border-current ml-1">D</kbd> para alternar tema
        </p>
      </footer>
    </div>
  );
}
