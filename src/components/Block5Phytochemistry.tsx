import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { compounds } from '../data/compoundsData';

interface Props { darkMode: boolean; }

export default function Block5Phytochemistry({ darkMode }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedCompound, setSelectedCompound] = useState<number | null>(null);

  return (
    <section id="phytochemistry" className="section-block py-20 px-6 relative">
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
            Fitoquímica
          </h2>
          <p className={`text-lg ${darkMode ? 'text-[#4a7a2e]' : 'text-[#8B4513]'}`}>
            6 compostos anotados por CLAE-DAD-EM/EM
          </p>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="overflow-x-auto rounded-2xl border backdrop-blur-sm"
          style={{ borderColor: darkMode ? 'rgba(45,80,22,0.3)' : 'rgba(45,80,22,0.2)' }}
        >
          <table className="w-full text-sm">
            <thead>
              <tr className={darkMode ? 'bg-[#1a2b12]' : 'bg-[#2D5016]/10'}>
                <th className={`px-4 py-3 text-left font-semibold ${darkMode ? 'text-[#D4A017]' : 'text-[#2D5016]'}`}>Composto</th>
                <th className={`px-4 py-3 text-left font-semibold ${darkMode ? 'text-[#D4A017]' : 'text-[#2D5016]'}`}>Extrato</th>
                <th className={`px-4 py-3 text-left font-semibold ${darkMode ? 'text-[#D4A017]' : 'text-[#2D5016]'}`}>TR</th>
                <th className={`px-4 py-3 text-left font-semibold ${darkMode ? 'text-[#D4A017]' : 'text-[#2D5016]'}`}>m/z [M+H]⁺</th>
                <th className={`px-4 py-3 text-left font-semibold ${darkMode ? 'text-[#D4A017]' : 'text-[#2D5016]'}`}>Fórmula</th>
                <th className={`px-4 py-3 text-left font-semibold ${darkMode ? 'text-[#D4A017]' : 'text-[#2D5016]'}`}>Função</th>
              </tr>
            </thead>
            <tbody>
              {compounds.map((c, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  onClick={() => setSelectedCompound(selectedCompound === i ? null : i)}
                  className={`cursor-pointer border-t transition-colors ${
                    c.isContaminant
                      ? darkMode ? 'bg-[#8B4513]/10 hover:bg-[#8B4513]/20' : 'bg-[#8B4513]/5 hover:bg-[#8B4513]/10'
                      : darkMode ? 'hover:bg-[#2D5016]/20' : 'hover:bg-[#2D5016]/5'
                  } ${selectedCompound === i ? darkMode ? 'bg-[#D4A017]/10' : 'bg-[#D4A017]/10' : ''}`}
                >
                  <td className="px-4 py-3 font-medium flex items-center gap-2">
                    {c.isContaminant && <span className="text-sm">⚠️</span>}
                    <span className={darkMode ? 'text-[#F5E6C8]' : 'text-[#2D5016]'}>{c.name}</span>
                  </td>
                  <td className={`px-4 py-3 font-mono text-xs ${darkMode ? 'text-[#4a7a2e]' : 'text-[#8B4513]'}`}>{c.extract}</td>
                  <td className={`px-4 py-3 font-mono text-xs ${darkMode ? 'text-[#F5E6C8]/70' : 'text-[#2D5016]/70'}`}>{c.tr}</td>
                  <td className={`px-4 py-3 font-mono text-xs ${darkMode ? 'text-[#F5E6C8]/70' : 'text-[#2D5016]/70'}`}>{c.mz}</td>
                  <td className={`px-4 py-3 font-mono text-xs ${darkMode ? 'text-[#F5E6C8]/70' : 'text-[#2D5016]/70'}`}>{c.formula}</td>
                  <td className={`px-4 py-3 text-xs ${c.isContaminant ? 'text-[#C68E17]' : darkMode ? 'text-[#4a7a2e]' : 'text-[#2D5016]'}`}>
                    {c.function}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Selected compound detail */}
        {selectedCompound !== null && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`mt-6 p-6 rounded-2xl border ${darkMode ? 'bg-[#1a2b12]/80 border-[#D4A017]/30' : 'bg-white/80 border-[#D4A017]/30'}`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Structure placeholder */}
              <div className="flex flex-col items-center justify-center p-4">
                <div className={`w-48 h-48 rounded-xl border-2 border-dashed flex items-center justify-center ${darkMode ? 'border-[#2D5016]/50' : 'border-[#2D5016]/30'}`}>
                  <div className="text-center">
                    <div className="text-4xl mb-2">🧪</div>
                    <div className={`text-xs font-mono ${darkMode ? 'text-[#4a7a2e]' : 'text-[#2D5016]/60'}`}>
                      {compounds[selectedCompound].formula}
                    </div>
                    <div className={`text-xs mt-1 ${darkMode ? 'text-[#D4A017]' : 'text-[#C68E17]'}`}>
                      m/z {compounds[selectedCompound].mz}
                    </div>
                  </div>
                </div>
                <p className={`text-xs mt-2 ${darkMode ? 'text-[#4a7a2e]' : 'text-[#2D5016]/50'}`}>
                  Estrutura 2D simplificada
                </p>
              </div>

              {/* Fragmentation */}
              <div>
                <h4 className={`font-semibold mb-3 ${darkMode ? 'text-[#D4A017]' : 'text-[#8B4513]'}`}>
                  Fragmentos propostos (MS/EM)
                </h4>
                {compounds[selectedCompound].fragments ? (
                  <div className="space-y-2">
                    {compounds[selectedCompound].fragments!.map((f, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.2 }}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg ${darkMode ? 'bg-[#2D5016]/20' : 'bg-[#2D5016]/5'}`}
                      >
                        <span className="text-[#D4A017]">→</span>
                        <span className={`text-xs font-mono ${darkMode ? 'text-[#F5E6C8]/80' : 'text-[#2D5016]/80'}`}>{f}</span>
                      </motion.div>
                    ))}
                  </div>
                ) : null}

                {compounds[selectedCompound].isContaminant && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`mt-4 p-3 rounded-lg border ${darkMode ? 'bg-[#8B4513]/10 border-[#8B4513]/30' : 'bg-[#8B4513]/5 border-[#8B4513]/20'}`}
                  >
                    <p className="text-xs text-[#C68E17]">
                      ⚠️ {compounds[selectedCompound].contaminantNote}
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
