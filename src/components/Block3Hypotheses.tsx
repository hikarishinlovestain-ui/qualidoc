import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

interface Props { darkMode: boolean; }

const hypotheses = [
  {
    id: 'H1',
    title: 'Resposta Bifásica (Hormese)',
    description: 'Trub quente induz resposta bifásica — estímulo em baixas doses, inibição em altas',
    highlight: true,
    icon: '📈',
    detail: 'Curva em U invertido com pico de eustresse em ~12,5 mg/L'
  },
  {
    id: 'H2',
    title: 'Saturação Assintótica',
    description: 'Bagaço de malte segue curva de saturação sem toxicidade até 1000 mg/L',
    highlight: true,
    icon: '📊',
    detail: 'Modelo Michaelis-Menten com EC50 > 3600 mg/L'
  },
  {
    id: 'H3',
    title: 'Predição AraGEM',
    description: 'Modelo metabólico AraGEM adaptado prediz doses ótimas de aplicação',
    highlight: false,
    icon: '🧬',
    detail: 'FBA com COBRApy + modelo AraGEM v1.2 curado para L. sativa'
  },
  {
    id: 'H4',
    title: 'Inibição de Fitopatógenos',
    description: 'Compostos bioativos (xantohumol, diterpenos) inibem crescimento fúngico',
    highlight: false,
    icon: '🛡️',
    detail: 'GEMs fúngicos predizem halos de 25-30 mm a 1000 mg/L'
  },
  {
    id: 'H5',
    title: 'Ação Dual',
    description: 'HT = sinalizador hormonal | BM = fonte nutricional',
    highlight: false,
    icon: '⚡',
    detail: 'Sinergismo: HT elicia defesa + BM fornece nutrientes'
  }
];

export default function Block3Hypotheses({ darkMode }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="hypotheses" className="section-block py-20 px-6 relative">
      <div className={`absolute inset-0 ${darkMode
        ? 'bg-gradient-to-b from-[#141f0d] to-[#0a0f07]'
        : 'bg-gradient-to-b from-[#f0e4b8] to-[#faf8f0]'
      }`} />

      <div className="relative z-10 max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-[#F5E6C8]' : 'text-[#2D5016]'}`}>
            Hipóteses Centrais
          </h2>
          <p className={`text-lg ${darkMode ? 'text-[#4a7a2e]' : 'text-[#8B4513]'}`}>
            Cinco hipóteses que guiam esta investigação
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hypotheses.map((h, i) => (
            <motion.div
              key={h.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              onClick={() => setExpanded(expanded === h.id ? null : h.id)}
              className={`card-hover cursor-pointer p-6 rounded-2xl border-2 transition-all ${
                h.highlight
                  ? darkMode
                    ? 'bg-[#D4A017]/10 border-[#D4A017]/50 shadow-lg shadow-[#D4A017]/10'
                    : 'bg-[#D4A017]/10 border-[#D4A017]/50 shadow-lg shadow-[#D4A017]/20'
                  : darkMode
                    ? 'bg-[#1a2b12]/60 border-[#2D5016]/30'
                    : 'bg-white/60 border-[#2D5016]/20'
              }`}
            >
              <div className="flex items-start gap-3 mb-3">
                <span className="text-3xl">{h.icon}</span>
                <div>
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                    h.highlight
                      ? 'bg-[#D4A017] text-[#0a0f07]'
                      : darkMode ? 'bg-[#2D5016] text-[#F5E6C8]' : 'bg-[#2D5016] text-white'
                  }`}>
                    {h.id}
                  </span>
                </div>
              </div>
              
              <h3 className={`font-bold text-lg mb-2 ${darkMode ? 'text-[#F5E6C8]' : 'text-[#2D5016]'}`}>
                {h.title}
              </h3>
              
              <p className={`text-sm ${darkMode ? 'text-[#F5E6C8]/70' : 'text-[#8B4513]/80'}`}>
                {h.description}
              </p>

              {expanded === h.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className={`mt-3 pt-3 border-t ${darkMode ? 'border-[#2D5016]/30' : 'border-[#2D5016]/20'}`}
                >
                  <p className={`text-xs italic ${darkMode ? 'text-[#D4A017]' : 'text-[#C68E17]'}`}>
                    {h.detail}
                  </p>
                </motion.div>
              )}

              {h.highlight && (
                <div className="mt-3 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4A017] animate-pulse" />
                  <span className="text-xs text-[#D4A017] font-medium">Hipótese principal</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
