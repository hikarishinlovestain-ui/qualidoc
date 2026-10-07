import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { fungiData, paradoxExplanations } from '../data/fungiData';

interface Props { darkMode: boolean; }

function CountUp({ end, decimals = 2, suffix = '' }: { end: number; decimals?: number; suffix?: string }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(eased * end);
      if (progress >= 1) clearInterval(interval);
    }, 16);
    return () => clearInterval(interval);
  }, [inView, end]);

  return <span ref={ref}>{value.toFixed(decimals)}{suffix}</span>;
}

export default function Block7Antifungal({ darkMode }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredFungus, setHoveredFungus] = useState<number | null>(null);

  const maxHalo = 30;

  return (
    <section id="antifungal" className="section-block py-20 px-6 relative">
      <div className={`absolute inset-0 ${darkMode
        ? 'bg-gradient-to-b from-[#141f0d] to-[#0a0f07]'
        : 'bg-gradient-to-b from-[#f0e4b8] to-[#faf8f0]'
      }`} />

      <div className="relative z-10 max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-[#F5E6C8]' : 'text-[#2D5016]'}`}>
            Antifúngico In Silico vs In Vitro
          </h2>
          <p className={`text-lg ${darkMode ? 'text-[#4a7a2e]' : 'text-[#8B4513]'}`}>
            Heatmap de halos preditos e o paradoxo experimental
          </p>
        </motion.div>

        {/* Heatmap */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h3 className={`font-semibold mb-4 text-center ${darkMode ? 'text-[#D4A017]' : 'text-[#8B4513]'}`}>
            Halos de Inibição Preditos — EEB-HT a 1000 mg/L
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {fungiData.map((fungus, i) => {
              const intensity = fungus.halo / maxHalo;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.15, type: 'spring' }}
                  onMouseEnter={() => setHoveredFungus(i)}
                  onMouseLeave={() => setHoveredFungus(null)}
                  className={`relative p-4 rounded-xl border cursor-pointer transition-all ${
                    hoveredFungus === i ? 'scale-105 z-10' : ''
                  } ${darkMode ? 'border-[#2D5016]/30' : 'border-[#2D5016]/20'}`}
                  style={{
                    background: `rgba(${Math.round(212 * intensity)}, ${Math.round(160 * intensity)}, ${Math.round(23 * intensity)}, ${0.1 + intensity * 0.4})`
                  }}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">🍄</div>
                    <p className={`text-xs font-semibold mb-1 ${darkMode ? 'text-[#F5E6C8]' : 'text-[#2D5016]'}`}>
                      {fungus.fungus}
                    </p>
                    <div className={`text-2xl font-bold ${darkMode ? 'text-[#D4A017]' : 'text-[#8B4513]'}`}>
                      <CountUp end={fungus.halo} decimals={2} suffix=" mm" />
                    </div>
                  </div>

                  {/* Tooltip */}
                  {hoveredFungus === i && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 p-3 rounded-lg shadow-xl z-20 w-56 ${
                        darkMode ? 'bg-[#1a2b12] border border-[#D4A017]/30' : 'bg-white border border-[#2D5016]/20'
                      }`}
                    >
                      <p className={`text-xs font-semibold mb-1 ${darkMode ? 'text-[#D4A017]' : 'text-[#8B4513]'}`}>
                        {fungus.fullName}
                      </p>
                      <div className={`text-xs space-y-1 ${darkMode ? 'text-[#F5E6C8]/70' : 'text-[#2D5016]/70'}`}>
                        <p>EC50: {fungus.ec50} mg/L</p>
                        <p>MIC teórica: {fungus.mic} mg/L</p>
                        <p>LOEC: {fungus.loec} mg/L</p>
                        <p className="font-mono text-[10px]">GEM: {fungus.gem}</p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Color scale */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <span className={`text-xs ${darkMode ? 'text-[#4a7a2e]' : 'text-[#2D5016]/60'}`}>0 mm</span>
            <div className="w-48 h-3 rounded-full" style={{
              background: 'linear-gradient(90deg, rgba(212,160,23,0.1), rgba(212,160,23,0.8))'
            }} />
            <span className={`text-xs ${darkMode ? 'text-[#4a7a2e]' : 'text-[#2D5016]/60'}`}>30 mm</span>
          </div>
        </motion.div>

        {/* Paradox Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
        >
          <h3 className={`font-semibold mb-6 text-center text-xl ${darkMode ? 'text-[#C68E17]' : 'text-[#8B4513]'}`}>
            ⚡ O PARADOXO
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Left: In silico prediction */}
            <motion.div
              initial={{ x: -50 }}
              animate={inView ? { x: 0 } : {}}
              transition={{ delay: 1.2 }}
              className={`p-6 rounded-2xl border text-center ${darkMode ? 'bg-[#D4A017]/10 border-[#D4A017]/30' : 'bg-[#D4A017]/5 border-[#D4A017]/30'}`}
            >
              <div className="text-4xl mb-3">🔮</div>
              <h4 className={`font-semibold mb-2 ${darkMode ? 'text-[#D4A017]' : 'text-[#8B4513]'}`}>
                Predição In Silico
              </h4>
              <div className="text-3xl font-bold text-[#D4A017]">25-30 mm</div>
              <p className={`text-xs mt-2 ${darkMode ? 'text-[#F5E6C8]/60' : 'text-[#8B4513]/80'}`}>
                Halos preditos por FBA
              </p>
            </motion.div>

            {/* Center: Arrow with explanations */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 1.5 }}
              className="space-y-3"
            >
              {paradoxExplanations.map((exp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 1.7 + i * 0.3 }}
                  className={`p-3 rounded-lg border-l-4 ${darkMode ? 'bg-[#1a2b12]/60 border-[#C68E17]' : 'bg-white/60 border-[#C68E17]'}`}
                >
                  <p className={`text-xs font-semibold ${darkMode ? 'text-[#C68E17]' : 'text-[#8B4513]'}`}>
                    {i + 1}. {exp.title}
                  </p>
                  <p className={`text-xs mt-1 ${darkMode ? 'text-[#F5E6C8]/60' : 'text-[#2D5016]/60'}`}>
                    {exp.detail}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Right: Real plate */}
            <motion.div
              initial={{ x: 50 }}
              animate={inView ? { x: 0 } : {}}
              transition={{ delay: 1.2 }}
              className={`p-6 rounded-2xl border text-center ${darkMode ? 'bg-[#8B4513]/10 border-[#8B4513]/30' : 'bg-[#8B4513]/5 border-[#8B4513]/30'}`}
            >
              <div className="text-4xl mb-3">🧫</div>
              <h4 className={`font-semibold mb-2 ${darkMode ? 'text-[#8B4513]' : 'text-[#8B4513]'}`}>
                Placa Real
              </h4>
              <div className="text-3xl font-bold text-[#8B4513]">0 mm</div>
              <p className={`text-xs mt-2 ${darkMode ? 'text-[#F5E6C8]/60' : 'text-[#8B4513]/80'}`}>
                Sem halos observados em ágar
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 2.5 }}
            className={`mt-8 p-4 rounded-xl text-center ${darkMode ? 'bg-[#2D5016]/20' : 'bg-[#2D5016]/5'}`}
          >
            <p className={`text-sm ${darkMode ? 'text-[#4a7a2e]' : 'text-[#2D5016]'}`}>
              <strong>Conclusão:</strong> Nova metodologia necessária — microdiluição em meio líquido para compostos lipofílicos
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
