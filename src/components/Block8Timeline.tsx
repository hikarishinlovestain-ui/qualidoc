import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface Props { darkMode: boolean; }

interface TimelineItem {
  period: string;
  title: string;
  status: 'done' | 'current' | 'future';
  icon: string;
}

const timelineItems: TimelineItem[] = [
  { period: 'Jun-Dez/2024', title: 'Revisão bibliográfica', status: 'done', icon: '📚' },
  { period: 'Jan-Mar/2025', title: 'Coleta e processamento de amostras', status: 'done', icon: '🧪' },
  { period: 'Mar-Mai/2025', title: 'CLAE-DAD-EM/EM (Fiocruz)', status: 'done', icon: '🔬' },
  { period: 'Mar-Ago/2025', title: 'Curadoria in silico de GEMs', status: 'done', icon: '💻' },
  { period: 'Ago-Nov/2025', title: 'FBA com COBRApy', status: 'done', icon: '📊' },
  { period: 'Jan/25-Mar/26', title: 'Ensaios de germinação (ISO 11269-2)', status: 'done', icon: '🌱' },
  { period: 'Nov/25-Jan/26', title: 'Ensaios antifúngicos', status: 'done', icon: '🛡️' },
  { period: 'Mar-Abr/2026', title: 'Análises estatísticas', status: 'done', icon: '📈' },
  { period: 'Mai-Ago/2026', title: 'Escrita do relatório', status: 'done', icon: '✍️' },
  { period: 'Set/2026', title: 'QUALIFICAÇÃO', status: 'current', icon: '🎓' },
  { period: 'Set-Dez/2026', title: 'Novos ensaios antifúngicos (microdiluição)', status: 'future', icon: '🔄' },
  { period: 'Set-Dez/2026', title: 'Formulação para cultivo', status: 'future', icon: '⚗️' },
  { period: 'Jan-Mar/2027', title: 'Casa de vegetação', status: 'future', icon: '🏡' },
  { period: 'Abr-Ago/2027', title: 'Análises finais', status: 'future', icon: '📋' },
  { period: 'Set/27-Mai/28', title: 'Tese e artigos', status: 'future', icon: '📝' },
  { period: 'Jun/2028', title: 'DEFESA', status: 'future', icon: '🏆' },
];

export default function Block8Timeline({ darkMode }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="timeline" className="section-block py-20 px-6 relative">
      <div className={`absolute inset-0 ${darkMode
        ? 'bg-gradient-to-b from-[#0a0f07] to-[#141f0d]'
        : 'bg-gradient-to-b from-[#faf8f0] to-[#f0e4b8]'
      }`} />

      <div className="relative z-10 max-w-4xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-[#F5E6C8]' : 'text-[#2D5016]'}`}>
            Cronograma
          </h2>
          <p className={`text-lg ${darkMode ? 'text-[#4a7a2e]' : 'text-[#8B4513]'}`}>
            Linha do tempo do doutorado
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 timeline-line" />

          {timelineItems.map((item, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`relative flex items-center mb-6 ${
                  isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-row`}
              >
                {/* Content */}
                <div className={`flex-1 ml-14 md:ml-0 ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                  <div className={`inline-block p-4 rounded-xl border transition-all card-hover ${
                    item.status === 'current'
                      ? 'animate-pulse-glow border-[#D4A017] bg-[#D4A017]/10'
                      : item.status === 'done'
                        ? darkMode ? 'bg-[#1a2b12]/60 border-[#2D5016]/30' : 'bg-white/60 border-[#2D5016]/20'
                        : darkMode ? 'bg-[#1a2b12]/30 border-[#2D5016]/15' : 'bg-white/30 border-[#2D5016]/10'
                  }`}>
                    <div className={`text-xs font-mono mb-1 ${
                      item.status === 'current' ? 'text-[#D4A017]' :
                      item.status === 'done' ? darkMode ? 'text-[#4a7a2e]' : 'text-[#2D5016]' :
                      darkMode ? 'text-[#F5E6C8]/40' : 'text-[#2D5016]/40'
                    }`}>
                      {item.period}
                    </div>
                    <div className={`font-semibold text-sm ${
                      item.status === 'current' ? 'text-[#D4A017]' :
                      darkMode ? 'text-[#F5E6C8]' : 'text-[#2D5016]'
                    }`}>
                      {item.icon} {item.title}
                    </div>
                    {item.status === 'done' && (
                      <span className="text-xs text-[#4a7a2e]">✅ Concluído</span>
                    )}
                    {item.status === 'future' && (
                      <span className={`text-xs ${darkMode ? 'text-[#F5E6C8]/40' : 'text-[#2D5016]/40'}`}>⏳ Futuro</span>
                    )}
                  </div>
                </div>

                {/* Dot */}
                <div className={`absolute left-6 md:left-1/2 w-4 h-4 rounded-full -translate-x-1/2 border-2 ${
                  item.status === 'current'
                    ? 'bg-[#D4A017] border-[#D4A017] scale-150'
                    : item.status === 'done'
                      ? 'bg-[#2D5016] border-[#4a7a2e]'
                      : 'bg-transparent border-[#2D5016]/40'
                }`} />

                {/* Spacer for the other side */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
