import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

interface Props { darkMode: boolean; }

function CountUp({ end, duration = 2, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / (duration * 60);
    const interval = setInterval(() => {
      start += step;
      if (start >= end) {
        setValue(end);
        clearInterval(interval);
      } else {
        setValue(Math.floor(start * 100) / 100);
      }
    }, 1000 / 60);
    return () => clearInterval(interval);
  }, [inView, end, duration]);

  return <span ref={ref}>{value.toFixed(end % 1 !== 0 ? 1 : 0)}{suffix}</span>;
}

const problemCards = [
  {
    icon: '🍺',
    stat: 85,
    suffix: '%',
    title: 'Bagaço de Malte (BSG)',
    description: '85% do resíduo sólido cervejeiro mundial é bagaço de malte',
    color: '#D4A017'
  },
  {
    icon: '⚗️',
    stat: 2,
    suffix: 'º',
    title: 'Trub Quente',
    description: '2º maior resíduo — rico em proteínas, polifenóis e lúpulo',
    color: '#C68E17'
  },
  {
    icon: '💧',
    stat: 78,
    suffix: '%',
    title: 'Umidade Elevada',
    description: '75-80% de umidade → descarte em aterros sanitários',
    color: '#8B4513'
  },
  {
    icon: '🌍',
    stat: 12,
    suffix: '',
    title: 'ODS 12',
    description: 'Consumo e Produção Responsáveis — ONU 2030',
    color: '#2D5016'
  }
];

export default function Block2Problem({ darkMode }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCycle(c => (c + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="problem" className="section-block py-20 px-6 relative">
      <div className={`absolute inset-0 ${darkMode
        ? 'bg-gradient-to-b from-[#0a0f07] to-[#141f0d]'
        : 'bg-gradient-to-b from-[#faf8f0] to-[#f0e4b8]'
      }`} />

      <div className="relative z-10 max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-[#F5E6C8]' : 'text-[#2D5016]'}`}>
            O Problema
          </h2>
          <p className={`text-lg ${darkMode ? 'text-[#4a7a2e]' : 'text-[#8B4513]'}`}>
            Resíduos cervejeiros: de passivo ambiental a bioinsumo
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {problemCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className={`card-hover p-6 rounded-2xl border ${darkMode
                ? 'bg-[#1a2b12]/80 border-[#2D5016]/30'
                : 'bg-white/80 border-[#2D5016]/20'
              } backdrop-blur-sm`}
            >
              <div className="text-4xl mb-3">{card.icon}</div>
              <div className="text-4xl font-bold mb-2" style={{ color: card.color }}>
                <CountUp end={card.stat} suffix={card.suffix} />
              </div>
              <h3 className={`font-semibold text-lg mb-2 ${darkMode ? 'text-[#F5E6C8]' : 'text-[#2D5016]'}`}>
                {card.title}
              </h3>
              <p className={`text-sm ${darkMode ? 'text-[#F5E6C8]/60' : 'text-[#8B4513]/80'}`}>
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Circular economy animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="flex items-center justify-center gap-4 md:gap-8 flex-wrap"
        >
          <motion.div
            animate={{ scale: cycle === 0 ? 1.1 : 1 }}
            className={`flex flex-col items-center p-4 rounded-xl ${darkMode ? 'bg-[#D4A017]/10' : 'bg-[#D4A017]/20'}`}
          >
            <span className="text-4xl">🍺</span>
            <span className={`text-xs mt-2 ${darkMode ? 'text-[#D4A017]' : 'text-[#8B4513]'}`}>Cervejaria</span>
          </motion.div>
          
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-2xl"
          >
            →
          </motion.div>
          
          <motion.div
            animate={{ scale: cycle === 1 ? 1.1 : 1 }}
            className={`flex flex-col items-center p-4 rounded-xl ${darkMode ? 'bg-[#8B4513]/10' : 'bg-[#8B4513]/20'}`}
          >
            <span className="text-4xl">♻️</span>
            <span className={`text-xs mt-2 ${darkMode ? 'text-[#C68E17]' : 'text-[#8B4513]'}`}>Resíduo</span>
          </motion.div>
          
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }}
            className="text-2xl"
          >
            →
          </motion.div>
          
          <motion.div
            animate={{ scale: cycle === 2 ? 1.1 : 1 }}
            className={`flex flex-col items-center p-4 rounded-xl ${darkMode ? 'bg-[#2D5016]/20' : 'bg-[#2D5016]/10'}`}
          >
            <span className="text-4xl">🌱</span>
            <span className={`text-xs mt-2 ${darkMode ? 'text-[#4a7a2e]' : 'text-[#2D5016]'}`}>Bioinsumo</span>
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.5 }}
          className={`text-center mt-8 text-sm italic ${darkMode ? 'text-[#4a7a2e]' : 'text-[#2D5016]/60'}`}
        >
          Economia circular: transformar passivo ambiental em solução agronômica
        </motion.p>
      </div>
    </section>
  );
}
