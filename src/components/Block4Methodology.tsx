import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface Props { darkMode: boolean; }

const steps = [
  { id: 1, title: 'Amostras', detail: 'NECERVA/UFOP', icon: '🧪', color: '#D4A017' },
  { id: 2, title: 'Secagem', detail: '45°C / 4 dias', icon: '🌡️', color: '#C68E17' },
  { id: 3, title: 'Maceração', detail: 'Ultrassônica 40kHz, 3×30min', icon: '🔊', color: '#8B4513' },
  { id: 4, title: 'CLAE-DAD-EM', detail: 'Fiocruz — ESI-IT-TOF', icon: '🔬', color: '#2D5016' },
  { id: 5, title: 'AraGEM-curado', detail: 'L. sativa (ISO 11269-2)', icon: '🌱', color: '#4a7a2e' },
  { id: 6, title: 'FBA', detail: 'COBRApy / Python 3.14', icon: '💻', color: '#D4A017' },
  { id: 7, title: 'Ensaios ISO', detail: '11269-2 — L. sativa', icon: '📏', color: '#C68E17' },
  { id: 8, title: 'Antifúngico', detail: 'Microdiluição', icon: '🛡️', color: '#8B4513' },
];

export default function Block4Methodology({ darkMode }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="methodology" className="section-block py-20 px-6 relative">
      <div className={`absolute inset-0 ${darkMode
        ? 'bg-gradient-to-b from-[#0a0f07] to-[#141f0d]'
        : 'bg-gradient-to-b from-[#faf8f0] to-[#f0e4b8]'
      }`} />

      <div className="relative z-10 max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-[#F5E6C8]' : 'text-[#2D5016]'}`}>
            Fluxo Metodológico
          </h2>
          <p className={`text-lg ${darkMode ? 'text-[#4a7a2e]' : 'text-[#8B4513]'}`}>
            Pipeline integrado: do resíduo à validação
          </p>
        </motion.div>

        {/* Pipeline */}
        <div className="relative">
          {/* Connection line */}
          <svg className="absolute top-1/2 left-0 w-full h-2 -translate-y-1/2 hidden lg:block" preserveAspectRatio="none">
            <motion.line
              x1="5%" y1="50%" x2="95%" y2="50%"
              stroke={darkMode ? '#2D5016' : '#4a7a2e'}
              strokeWidth="2"
              strokeDasharray="8 4"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 2, delay: 0.5 }}
            />
          </svg>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-2">
            {steps.map((step, i) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.2, duration: 0.5, type: 'spring' }}
                className={`relative p-4 rounded-xl border text-center card-hover ${darkMode
                  ? 'bg-[#1a2b12]/80 border-[#2D5016]/30'
                  : 'bg-white/80 border-[#2D5016]/20'
                }`}
              >
                {/* Step number */}
                <div
                  className="absolute -top-3 -left-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ backgroundColor: step.color }}
                >
                  {step.id}
                </div>

                <div className="text-3xl mb-2">{step.icon}</div>
                <h3 className={`font-semibold text-sm mb-1 ${darkMode ? 'text-[#F5E6C8]' : 'text-[#2D5016]'}`}>
                  {step.title}
                </h3>
                <p className={`text-xs ${darkMode ? 'text-[#4a7a2e]' : 'text-[#8B4513]/70'}`}>
                  {step.detail}
                </p>

                {/* Arrow between steps */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 text-[#D4A017] text-lg">
                    →
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Yields */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 2 }}
          className="mt-12 flex justify-center gap-8 flex-wrap"
        >
          <div className={`px-6 py-4 rounded-xl border ${darkMode ? 'bg-[#D4A017]/10 border-[#D4A017]/30' : 'bg-[#D4A017]/10 border-[#D4A017]/30'}`}>
            <div className="text-3xl font-bold text-[#D4A017]">6,13%</div>
            <div className={`text-sm ${darkMode ? 'text-[#F5E6C8]/70' : 'text-[#8B4513]'}`}>
              Rendimento EEB-HT
            </div>
          </div>
          <div className={`px-6 py-4 rounded-xl border ${darkMode ? 'bg-[#2D5016]/20 border-[#2D5016]/30' : 'bg-[#2D5016]/10 border-[#2D5016]/30'}`}>
            <div className="text-3xl font-bold text-[#2D5016]">6,20%</div>
            <div className={`text-sm ${darkMode ? 'text-[#F5E6C8]/70' : 'text-[#8B4513]'}`}>
              Rendimento EEB-BM
            </div>
          </div>
        </motion.div>

        {/* Software stack */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 2.5 }}
          className={`mt-8 text-center text-xs ${darkMode ? 'text-[#4a7a2e]' : 'text-[#2D5016]/50'}`}
        >
          <span className="font-mono">Python 3.14</span> • <span className="font-mono">COBRApy</span> • <span className="font-mono">ImageJ 1.54</span> • <span className="font-mono">R (drc)</span> • <span className="font-mono">AraGEM v1.2</span>
        </motion.div>
      </div>
    </section>
  );
}
