import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface Props { darkMode: boolean; }

const conclusions = [
  {
    icon: '✅',
    title: 'Dualidade Fitoquímica',
    description: 'HT = sinalizador hormonal (hordenina, xantohumol) | BM = nutricional (ácidos graxos, diterpenos)',
    status: 'confirmed'
  },
  {
    icon: '✅',
    title: 'Hormese do Trub Quente',
    description: 'Pico de estímulo em 12,5 mg/L | EC50 IVG ≈ 45,2 mg/L | EC50 radicular ≈ 62,8 mg/L',
    status: 'confirmed'
  },
  {
    icon: '✅',
    title: 'Saturação do Bagaço',
    description: 'EC50 > 3600 mg/L | Sem toxicidade até 1000 mg/L | Spearman ρ = 0,834',
    status: 'confirmed'
  },
  {
    icon: '⚠️',
    title: 'Antifúngico — Nova Metodologia',
    description: 'Halos preditos in silico (25-30mm) não confirmados in vitro → microdiluição em meio líquido necessária',
    status: 'warning'
  }
];

export default function Block9Conclusions({ darkMode }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="conclusions" className="section-block py-20 px-6 relative">
      <div className={`absolute inset-0 ${darkMode
        ? 'bg-gradient-to-b from-[#141f0d] to-[#0a0f07]'
        : 'bg-gradient-to-b from-[#f0e4b8] to-[#faf8f0]'
      }`} />

      <div className="relative z-10 max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-[#F5E6C8]' : 'text-[#2D5016]'}`}>
            Conclusões Preliminares
          </h2>
          <p className={`text-lg ${darkMode ? 'text-[#4a7a2e]' : 'text-[#8B4513]'}`}>
            Principais achados desta investigação
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {conclusions.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: i * 0.2, duration: 0.6, type: 'spring' }}
              className={`card-hover p-6 rounded-2xl border-2 ${
                c.status === 'confirmed'
                  ? darkMode
                    ? 'bg-[#2D5016]/20 border-[#2D5016]/40'
                    : 'bg-[#2D5016]/5 border-[#2D5016]/30'
                  : darkMode
                    ? 'bg-[#D4A017]/10 border-[#D4A017]/40'
                    : 'bg-[#D4A017]/5 border-[#D4A017]/30'
              }`}
            >
              <div className="flex items-start gap-4">
                <span className="text-4xl">{c.icon}</span>
                <div>
                  <h3 className={`font-bold text-lg mb-2 ${darkMode ? 'text-[#F5E6C8]' : 'text-[#2D5016]'}`}>
                    {c.title}
                  </h3>
                  <p className={`text-sm ${darkMode ? 'text-[#F5E6C8]/70' : 'text-[#8B4513]/80'}`}>
                    {c.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Final message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
          className="mt-16 text-center"
        >
          <div className={`inline-block p-8 rounded-3xl border-2 ${darkMode
            ? 'bg-gradient-to-br from-[#1a2b12] to-[#141f0d] border-[#D4A017]/30'
            : 'bg-gradient-to-br from-white to-[#F5E6C8] border-[#D4A017]/30'
          }`}>
            <div className="text-5xl mb-4">🌱</div>
            <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-[#D4A017]' : 'text-[#8B4513]'}`}>
              Do resíduo ao bioinsumo
            </h3>
            <p className={`text-sm max-w-md mx-auto ${darkMode ? 'text-[#F5E6C8]/70' : 'text-[#2D5016]/70'}`}>
              Esta pesquisa demonstra que resíduos da indústria cervejeira podem ser transformados
              em bioinsumos de alto valor agregado, alinhando economia circular com inovação agronômica.
            </p>
            <div className={`mt-4 text-xs ${darkMode ? 'text-[#4a7a2e]' : 'text-[#2D5016]/50'}`}>
              ODS 12 • Consumo e Produção Responsáveis
            </div>
          </div>
        </motion.div>

        {/* Acknowledgments */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.5 }}
          className={`mt-12 text-center text-sm ${darkMode ? 'text-[#4a7a2e]' : 'text-[#2D5016]/50'}`}
        >
          <p className="mb-2">Agradecimentos:</p>
          <p>NECERVA/UFOP • Fiocruz • COBRApy • Programa de Pós-Graduação</p>
          <p className="mt-4 font-mono text-xs">
            Lactuca sativa L. (var. recomendada ISO 11269-2) • DBC • 4 repetições • 20 sementes/placa
          </p>
        </motion.div>
      </div>
    </section>
  );
}
