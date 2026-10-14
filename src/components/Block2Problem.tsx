import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import AcademicImage from './AcademicImage';
import { IMAGES } from '../assets/images';
import { residuosCervejeirosData } from '../data/residuosData';

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
          className="text-center mb-8"
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-[#F5E6C8]' : 'text-[#2D5016]'}`}>
            O Problema
          </h2>
          <p className={`text-lg ${darkMode ? 'text-[#4a7a2e]' : 'text-[#8B4513]'}`}>
            Resíduos cervejeiros: de passivo ambiental a bioinsumo
          </p>
        </motion.div>

        {/* Beer process image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="mb-12 max-w-3xl mx-auto"
        >
          <AcademicImage
            src={IMAGES.processoCerveja}
            alt="Processo de fabricação de cerveja"
            caption="Figura 1: Etapas envolvidas na produção da cerveja (Adaptada de Anderson et al., 2019)"
            darkMode={darkMode}
          />
        </motion.div>

        {/* Resíduos Cervejeiros Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <h3 className={`text-2xl md:text-3xl font-bold mb-3 ${darkMode ? 'text-[#F5E6C8]' : 'text-[#2D5016]'}`}>
              {residuosCervejeirosData.titulo}
            </h3>
            <p className={`text-base ${darkMode ? 'text-[#4a7a2e]' : 'text-[#8B4513]'} max-w-3xl mx-auto`}>
              {residuosCervejeirosData.subtitulo}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {residuosCervejeirosData.residuos.map((residuo, idx) => {
              const isVerde = residuo.cor_tema === 'verde';
              const primaryColor = isVerde ? '#2D5016' : '#D4A017';
              const secondaryColor = isVerde ? '#4a7a2e' : '#C68E17';
              
              return (
                <motion.div
                  key={residuo.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + idx * 0.2, type: 'spring', stiffness: 100, damping: 15 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className={`relative rounded-2xl border-2 p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
                    darkMode
                      ? isVerde
                        ? 'bg-[#2D5016]/10 border-[#2D5016]/40'
                        : 'bg-[#D4A017]/10 border-[#D4A017]/40'
                      : isVerde
                        ? 'bg-[#2D5016]/5 border-[#2D5016]/30'
                        : 'bg-[#D4A017]/5 border-[#D4A017]/30'
                  }`}
                >
                  {/* Ícone e Título */}
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-5xl">{residuo.icone}</span>
                    <div>
                      <h4 className={`text-xl md:text-2xl font-bold ${darkMode ? 'text-[#F5E6C8]' : 'text-[#2D5016]'}`}>
                        {residuo.nome}
                      </h4>
                      <span
                        className="inline-block text-xs font-semibold px-3 py-1 rounded-full mt-1"
                        style={{
                          backgroundColor: primaryColor + '20',
                          color: primaryColor,
                          border: `1px solid ${primaryColor}40`
                        }}
                      >
                        {residuo.subnome}
                      </span>
                    </div>
                  </div>

                  {/* Origem */}
                  <div className="mb-5">
                    <h5 className={`font-semibold text-xs uppercase tracking-wider mb-2 ${darkMode ? 'text-[#F5E6C8]/70' : 'text-[#2D5016]/70'}`}>
                      Origem
                    </h5>
                    <p className={`text-sm leading-relaxed ${darkMode ? 'text-[#F5E6C8]/80' : 'text-[#2D5016]/80'}`}>
                      {residuo.origem}
                    </p>
                  </div>

                  {/* Volume e Desafio */}
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className={`p-3 rounded-lg ${darkMode ? 'bg-[#0a0f07]/40' : 'bg-white/60'}`}
                      style={{ border: `1px solid ${primaryColor}30` }}>
                      <span className={`block text-xs font-medium mb-1 ${darkMode ? 'text-[#F5E6C8]/50' : 'text-[#2D5016]/50'}`}>
                        Volume
                      </span>
                      <span className={`font-bold text-sm ${darkMode ? 'text-[#F5E6C8]' : 'text-[#2D5016]'}`}>
                        {residuo.volume}
                      </span>
                    </div>
                    <div className={`p-3 rounded-lg ${darkMode ? 'bg-[#0a0f07]/40' : 'bg-white/60'}`}
                      style={{ border: `1px solid ${primaryColor}30` }}>
                      <span className={`block text-xs font-medium mb-1 ${darkMode ? 'text-[#F5E6C8]/50' : 'text-[#2D5016]/50'}`}>
                        Desafio
                      </span>
                      <span className={`font-bold text-xs ${darkMode ? 'text-[#F5E6C8]' : 'text-[#2D5016]'}`}>
                        {residuo.desafio}
                      </span>
                    </div>
                  </div>

                  {/* Composição */}
                  <div className="mb-5">
                    <h5 className={`font-semibold text-xs uppercase tracking-wider mb-3 ${darkMode ? 'text-[#F5E6C8]/70' : 'text-[#2D5016]/70'}`}>
                      Composição-Chave (Base Seca)
                    </h5>
                    <ul className="grid grid-cols-1 gap-1.5">
                      {residuo.composicao.map((item, i) => (
                        <li key={i} className={`flex items-center gap-2 text-sm ${darkMode ? 'text-[#F5E6C8]/80' : 'text-[#2D5016]/80'}`}>
                          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: primaryColor }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Papel no Estudo (Destaque) */}
                  <div
                    className={`mt-5 p-4 rounded-xl shadow-sm ${darkMode ? 'bg-[#0a0f07]/60' : 'bg-white'}`}
                    style={{ borderLeft: `4px solid ${primaryColor}` }}
                  >
                    <h5 className="font-bold mb-2 flex items-center gap-2 text-sm" style={{ color: primaryColor }}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      Papel neste Estudo
                    </h5>
                    <p className={`text-xs leading-relaxed ${darkMode ? 'text-[#F5E6C8]/70' : 'text-[#2D5016]/70'}`}>
                      {residuo.papel_no_estudo}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
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
