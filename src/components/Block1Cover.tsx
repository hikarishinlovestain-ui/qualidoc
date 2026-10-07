import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Props { darkMode: boolean; }

function GrainParticle({ delay, left }: { delay: number; left: number }) {
  return (
    <div
      className="grain-particle"
      style={{
        left: `${left}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${4 + Math.random() * 4}s`,
      }}
    />
  );
}

function MoleculeSVG() {
  return (
    <motion.div
      className="animate-molecule"
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
    >
      <svg width="280" height="280" viewBox="0 0 280 280" className="opacity-80">
        {/* Xanthohumol simplified structure */}
        <g transform="translate(140,140)">
          {/* Central ring system */}
          <polygon points="0,-40 35,-20 35,20 0,40 -35,20 -35,-20" fill="none" stroke="#D4A017" strokeWidth="2" className="molecule-bond" />
          <polygon points="0,-25 22,-12 22,12 0,25 -22,12 -22,-12" fill="none" stroke="#C68E17" strokeWidth="1.5" opacity="0.6" />
          
          {/* Side chains */}
          <line x1="35" y1="-20" x2="70" y2="-35" stroke="#4a7a2e" strokeWidth="2" className="molecule-bond" />
          <line x1="70" y1="-35" x2="100" y2="-20" stroke="#4a7a2e" strokeWidth="2" className="molecule-bond" />
          <line x1="100" y1="-20" x2="120" y2="-40" stroke="#4a7a2e" strokeWidth="2" className="molecule-bond" />
          
          <line x1="-35" y1="20" x2="-70" y2="35" stroke="#8B4513" strokeWidth="2" className="molecule-bond" />
          <line x1="-70" y1="35" x2="-100" y2="20" stroke="#8B4513" strokeWidth="2" className="molecule-bond" />
          
          {/* OH groups */}
          <circle cx="0" cy="-40" r="6" fill="#D4A017" opacity="0.8" />
          <text x="0" y="-36" textAnchor="middle" fill="#0a0f07" fontSize="8" fontWeight="bold">O</text>
          
          <circle cx="35" cy="20" r="6" fill="#4a7a2e" opacity="0.8" />
          <text x="35" y="24" textAnchor="middle" fill="#F5E6C8" fontSize="8" fontWeight="bold">O</text>
          
          <circle cx="-35" cy="-20" r="6" fill="#C68E17" opacity="0.8" />
          <text x="-35" y="-16" textAnchor="middle" fill="#0a0f07" fontSize="8" fontWeight="bold">O</text>
          
          {/* Carbon atoms */}
          {[
            [70, -35], [100, -20], [120, -40],
            [-70, 35], [-100, 20],
            [0, 40]
          ].map(([x, y], i) => (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r="4"
              fill="#D4A017"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.2 }}
            />
          ))}
          
          {/* Label */}
          <text x="0" y="80" textAnchor="middle" fill="#D4A017" fontSize="11" fontFamily="monospace" opacity="0.7">
            Xantohumol
          </text>
          <text x="0" y="95" textAnchor="middle" fill="#4a7a2e" fontSize="9" fontFamily="monospace" opacity="0.5">
            C₂₁H₂₂O₅ | m/z 355,15
          </text>
        </g>
      </svg>
    </motion.div>
  );
}

function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i <= text.length) {
        setDisplayed(text.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [started, text]);

  return (
    <span>
      {displayed}
      <span className="animate-pulse text-[#D4A017]">|</span>
    </span>
  );
}

export default function Block1Cover({ darkMode }: Props) {
  const grains = Array.from({ length: 20 }, (_, i) => ({
    delay: Math.random() * 5,
    left: Math.random() * 100,
  }));

  return (
    <section id="cover" className="section-block relative flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        {/* Gradient overlay */}
        <div className={`absolute inset-0 ${darkMode
          ? 'bg-gradient-to-br from-[#0a0f07] via-[#141f0d] to-[#1a2b12]'
          : 'bg-gradient-to-br from-[#F5E6C8] via-[#f0e4b8] to-[#e8d9a0]'
        }`} />
        
        {/* Grain particles */}
        {grains.map((g, i) => (
          <GrainParticle key={i} delay={g.delay} left={g.left} />
        ))}
        
        {/* Radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#D4A017] opacity-5 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4A017]/10 border border-[#D4A017]/30 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#D4A017] animate-pulse" />
            <span className={`text-sm font-medium ${darkMode ? 'text-[#D4A017]' : 'text-[#8B4513]'}`}>
              Qualificação de Doutorado — Outubro 2026
            </span>
          </motion.div>

          {/* Title */}
          <h1 className={`text-2xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 ${darkMode ? 'text-[#F5E6C8]' : 'text-[#2D5016]'}`}>
            <TypewriterText
              text="Modelagem metabólica in silico e validação agronômica do uso de trub quente e bagaço de malte como bioinsumos em Lactuca sativa L."
              delay={500}
            />
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className={`text-lg md:text-xl mb-4 ${darkMode ? 'text-[#4a7a2e]' : 'text-[#8B4513]'}`}
          >
            Doutorando: <strong className={darkMode ? 'text-[#D4A017]' : 'text-[#2D5016]'}>Hikari Shin Lovestain C. R. Lima</strong>
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            className={`text-sm md:text-base mb-2 ${darkMode ? 'text-[#F5E6C8]/70' : 'text-[#2D5016]/70'}`}
          >
            Orientadores: <strong>Prof. Dr. Gustavo Henrique Bianco de Souza</strong> | <strong>Drª Regislainy Gomes da Silva</strong>
          </motion.p>

          {/* Molecule */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-8 flex justify-center"
          >
            <MoleculeSVG />
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
            className="mt-12"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className={`text-sm ${darkMode ? 'text-[#4a7a2e]' : 'text-[#2D5016]/50'}`}
            >
              ↓ Role para explorar ↓
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
