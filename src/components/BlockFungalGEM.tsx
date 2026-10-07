import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Area, AreaChart
} from 'recharts';
import { phytoProfile, gemsModels } from '../data/fungalGEMData';
import {
  fungiResults, heatmapData, computationalDesign,
  limitations, translationalPerspectives
} from '../data/fungalResults';

interface Props { darkMode: boolean; }

function CountUp({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * end));
      if (progress >= 1) clearInterval(interval);
    }, 16);
    return () => clearInterval(interval);
  }, [inView, end, duration]);

  return <span ref={ref}>{value.toLocaleString('pt-BR')}</span>;
}

function EquationBlock({ children, darkMode }: { children: React.ReactNode; darkMode: boolean }) {
  return (
    <div className={`font-mono text-sm p-4 rounded-lg border ${darkMode
      ? 'bg-[#0a0f07] border-[#D4A017]/30 text-[#D4A017]'
      : 'bg-[#F5E6C8]/50 border-[#8B4513]/30 text-[#8B4513]'
    }`}>
      {children}
    </div>
  );
}

export default function BlockFungalGEM({ darkMode }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [activeBlock, setActiveBlock] = useState(0);
  const [hoveredFungus, setHoveredFungus] = useState<number | null>(null);
  const [expandedLimitation, setExpandedLimitation] = useState<number | null>(null);

  const blocks = [
    { id: 0, label: 'Dados de Entrada', icon: '🧪', short: 'A' },
    { id: 1, label: 'Metodologia', icon: '⚙️', short: 'B' },
    { id: 2, label: 'Estatística', icon: '📊', short: 'C' },
    { id: 3, label: 'Resultados', icon: '🎯', short: 'D' },
    { id: 4, label: 'Limitações', icon: '⚠️', short: 'E' },
  ];

  const axisColor = darkMode ? '#4a7a2e' : '#2D5016';
  const gridColor = darkMode ? 'rgba(45,80,22,0.2)' : 'rgba(45,80,22,0.1)';
  const textColor = darkMode ? '#F5E6C8' : '#2D5016';

  // Generate sigmoid curve data for EEB-HT
  const generateSigmoidData = () => {
    const data = [];
    for (let c = 0; c <= 1000; c += 10) {
      const ic50 = 150;
      const n = 2;
      const alpha = 0.15;
      const cOpt = 45;
      const sigma = 20;
      
      const sigmoid = Math.pow(ic50, n) / (Math.pow(ic50, n) + Math.pow(c, n));
      const gaussian = alpha * Math.exp(-Math.pow(c - cOpt, 2) / (2 * Math.pow(sigma, 2)));
      const value = sigmoid + gaussian;
      
      data.push({ dose: c, value });
    }
    return data;
  };

  // Generate Michaelis-Menten curve for EEB-BM
  const generateMMData = () => {
    const data = [];
    const vmax = 1.1;
    const km = 300;
    for (let c = 0; c <= 1000; c += 10) {
      const value = c === 0 ? 0 : (vmax * c) / (km + c);
      data.push({ dose: c, value });
    }
    return data;
  };

  return (
    <section id="fungal-gem" className="section-block py-20 px-6 relative">
      <div className={`absolute inset-0 ${darkMode
        ? 'bg-gradient-to-b from-[#141f0d] via-[#0a0f07] to-[#141f0d]'
        : 'bg-gradient-to-b from-[#f0e4b8] via-[#faf8f0] to-[#f0e4b8]'
      }`} />

      <div className="relative z-10 max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-[#F5E6C8]' : 'text-[#2D5016]'}`}>
            Modelagem GEM Fúngica
          </h2>
          <p className={`text-lg ${darkMode ? 'text-[#4a7a2e]' : 'text-[#8B4513]'}`}>
            Integração Fitoquímica ↔ Modelagem Metabólica Fúngica
          </p>
        </motion.div>

        {/* Block navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {blocks.map((block) => (
            <button
              key={block.id}
              onClick={() => setActiveBlock(block.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all ${
                activeBlock === block.id
                  ? 'bg-[#D4A017] text-[#0a0f07] shadow-lg shadow-[#D4A017]/20'
                  : darkMode
                    ? 'bg-[#1a2b12] text-[#F5E6C8]/70 hover:bg-[#2D5016]/30 border border-[#2D5016]/30'
                    : 'bg-white/60 text-[#2D5016] hover:bg-[#2D5016]/10 border border-[#2D5016]/20'
              }`}
            >
              <span className="text-lg">{block.icon}</span>
              <span className="hidden md:inline">{block.label}</span>
              <span className="md:hidden text-xs">Bloco {block.short}</span>
            </button>
          ))}
        </div>

        {/* Block content */}
        <motion.div
          key={activeBlock}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className={`rounded-2xl border p-6 md:p-8 ${darkMode
            ? 'bg-[#1a2b12]/60 border-[#2D5016]/30'
            : 'bg-white/60 border-[#2D5016]/20'
          }`}
        >
          {/* BLOCO A: Dados de Entrada */}
          {activeBlock === 0 && (
            <div>
              <h3 className={`text-xl font-bold mb-6 ${textColor}`}>
                Perfil Fitoquímico e GEMs Selecionados
              </h3>

              {/* Phytochemical profile */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {phytoProfile.extratos.map((extrato, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className={`p-5 rounded-xl border-2 ${darkMode ? 'bg-[#0a0f07]/50' : 'bg-white/50'}`}
                    style={{ borderColor: extrato.cor + '60' }}
                  >
                    <h4 className={`font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-[#F5E6C8]' : 'text-[#2D5016]'}`}>
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: extrato.cor }} />
                      {extrato.nome}
                    </h4>
                    <div className="space-y-3">
                      {extrato.compostos.map((comp, j) => (
                        <div key={j} className={`p-3 rounded-lg ${darkMode ? 'bg-[#2D5016]/10' : 'bg-[#2D5016]/5'}`}>
                          <div className="flex items-center justify-between mb-1">
                            <span className={`font-semibold text-sm ${darkMode ? 'text-[#F5E6C8]' : 'text-[#2D5016]'}`}>
                              {comp.composto}
                            </span>
                            <span className={`text-xs font-mono ${darkMode ? 'text-[#4a7a2e]' : 'text-[#8B4513]'}`}>
                              m/z {comp.mz}
                            </span>
                          </div>
                          <p className={`text-xs ${darkMode ? 'text-[#F5E6C8]/60' : 'text-[#2D5016]/60'}`}>
                            {comp.mecanismo}
                          </p>
                          <p className={`text-[10px] italic mt-1 ${darkMode ? 'text-[#4a7a2e]' : 'text-[#2D5016]/50'}`}>
                            {comp.referencia}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Contaminants alert */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className={`p-4 rounded-xl border-2 border-dashed ${darkMode ? 'bg-[#8B4513]/10 border-[#8B4513]/50' : 'bg-[#8B4513]/5 border-[#8B4513]/50'}`}
              >
                <h4 className={`font-bold mb-3 flex items-center gap-2 ${darkMode ? 'text-[#C68E17]' : 'text-[#8B4513]'}`}>
                  <span className="animate-pulse">⚠️</span> Contaminantes Detectados
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {phytoProfile.contaminantes.map((cont, i) => (
                    <div key={i} className={`p-3 rounded-lg ${darkMode ? 'bg-[#0a0f07]/50' : 'bg-white/50'}`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`font-semibold text-sm ${darkMode ? 'text-[#F5E6C8]' : 'text-[#2D5016]'}`}>
                          {cont.composto}
                        </span>
                        <span className={`text-xs font-mono ${darkMode ? 'text-[#4a7a2e]' : 'text-[#8B4513]'}`}>
                          m/z {cont.mz}
                        </span>
                      </div>
                      <p className={`text-xs ${darkMode ? 'text-[#C68E17]' : 'text-[#8B4513]'}`}>
                        {cont.alerta}
                      </p>
                      <p className={`text-[10px] italic mt-1 ${darkMode ? 'text-[#F5E6C8]/40' : 'text-[#2D5016]/40'}`}>
                        {cont.acao}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* GEMs table */}
              <h4 className={`font-bold mt-8 mb-4 ${textColor}`}>
                Modelos Metabólicos (GEMs) Selecionados
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-xs md:text-sm">
                  <thead>
                    <tr className={darkMode ? 'bg-[#2D5016]/20' : 'bg-[#2D5016]/10'}>
                      <th className={`px-3 py-2 text-left font-semibold ${darkMode ? 'text-[#D4A017]' : 'text-[#2D5016]'}`}>Representante</th>
                      <th className={`px-3 py-2 text-left font-semibold ${darkMode ? 'text-[#D4A017]' : 'text-[#2D5016]'}`}>Modelo</th>
                      <th className={`px-3 py-2 text-left font-semibold ${darkMode ? 'text-[#D4A017]' : 'text-[#2D5016]'}`}>Integração</th>
                      <th className={`px-3 py-2 text-center font-semibold ${darkMode ? 'text-[#D4A017]' : 'text-[#2D5016]'}`}>Sensibilidade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gemsModels.map((gem, i) => (
                      <motion.tr
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + i * 0.1 }}
                        onMouseEnter={() => setHoveredFungus(i)}
                        onMouseLeave={() => setHoveredFungus(null)}
                        className={`border-t transition-colors ${
                          gem.isProxy
                            ? darkMode ? 'bg-[#8B4513]/10' : 'bg-[#8B4513]/5'
                            : hoveredFungus === i
                              ? darkMode ? 'bg-[#D4A017]/10' : 'bg-[#D4A017]/10'
                              : ''
                        }`}
                      >
                        <td className={`px-3 py-2 font-medium ${darkMode ? 'text-[#F5E6C8]' : 'text-[#2D5016]'}`}>
                          {gem.representante}
                          {gem.isProxy && <span className="ml-2 text-xs">⚠️</span>}
                        </td>
                        <td className={`px-3 py-2 font-mono text-xs ${darkMode ? 'text-[#4a7a2e]' : 'text-[#8B4513]'}`}>
                          {gem.modelo}
                        </td>
                        <td className={`px-3 py-2 text-xs ${darkMode ? 'text-[#F5E6C8]/70' : 'text-[#2D5016]/70'}`}>
                          {gem.tipo_integracao}
                        </td>
                        <td className="px-3 py-2 text-center">
                          <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium ${
                            gem.sensibilidade.includes('Muito Alta')
                              ? 'bg-green-500/20 text-green-400'
                              : gem.sensibilidade.includes('Alta')
                                ? 'bg-green-500/10 text-green-500'
                                : gem.sensibilidade.includes('Intermediária')
                                  ? 'bg-yellow-500/20 text-yellow-400'
                                  : 'bg-red-500/20 text-red-400'
                          }`}>
                            {gem.sensibilidade}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* BLOCO B: Metodologia */}
          {activeBlock === 1 && (
            <div>
              <h3 className={`text-xl font-bold mb-6 ${textColor}`}>
                Pipeline de Simulação FBA
              </h3>

              {/* FBA equations */}
              <div className="mb-8">
                <h4 className={`font-semibold mb-3 ${darkMode ? 'text-[#D4A017]' : 'text-[#8B4513]'}`}>
                  Formulação Matemática da FBA
                </h4>
                <div className="space-y-3">
                  <EquationBlock darkMode={darkMode}>
                    Função Objetivo: max cᵀ · v
                  </EquationBlock>
                  <EquationBlock darkMode={darkMode}>
                    Sujeito a: S · v = 0
                  </EquationBlock>
                  <EquationBlock darkMode={darkMode}>
                    v_min ≤ v ≤ v_max
                  </EquationBlock>
                </div>
              </div>

              {/* EEB-HT sigmoid curve */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div>
                  <h4 className={`font-semibold mb-3 ${darkMode ? 'text-[#D4A017]' : 'text-[#8B4513]'}`}>
                    EEB-HT: Curva Sigmoide Inversa + Hormese
                  </h4>
                  <EquationBlock darkMode={darkMode}>
                    f(C) = IC₅₀ⁿ/(IC₅₀ⁿ + Cⁿ) + α·exp(-(C-C_opt)²/2σ²)
                  </EquationBlock>
                  <p className={`text-xs mt-2 ${darkMode ? 'text-[#F5E6C8]/60' : 'text-[#2D5016]/60'}`}>
                    Sigmoide (inibição) + Gaussiana (hormese do xantohumol-hordenina)
                  </p>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={generateSigmoidData()}>
                      <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                      <XAxis dataKey="dose" stroke={axisColor} tick={{ fontSize: 10 }} />
                      <YAxis stroke={axisColor} tick={{ fontSize: 10 }} />
                      <Tooltip contentStyle={{ background: darkMode ? '#1a2b12' : '#fff', border: '1px solid #D4A017', borderRadius: 8, fontSize: 11 }} />
                      <Area type="monotone" dataKey="value" stroke="#D4A017" fill="#D4A017" fillOpacity={0.2} strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div>
                  <h4 className={`font-semibold mb-3 ${darkMode ? 'text-[#2D5016]' : 'text-[#2D5016]'}`}>
                    EEB-BM: Michaelis-Menten (Saturação)
                  </h4>
                  <EquationBlock darkMode={darkMode}>
                    f(C) = (V_max · C) / (K_m + C)
                  </EquationBlock>
                  <p className={`text-xs mt-2 ${darkMode ? 'text-[#F5E6C8]/60' : 'text-[#2D5016]/60'}`}>
                    Ácido linoleico = substrato nutricional, NÃO tóxico
                  </p>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={generateMMData()}>
                      <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                      <XAxis dataKey="dose" stroke={axisColor} tick={{ fontSize: 10 }} />
                      <YAxis stroke={axisColor} tick={{ fontSize: 10 }} />
                      <Tooltip contentStyle={{ background: darkMode ? '#1a2b12' : '#fff', border: '1px solid #2D5016', borderRadius: 8, fontSize: 11 }} />
                      <Area type="monotone" dataKey="value" stroke="#2D5016" fill="#2D5016" fillOpacity={0.2} strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Biomass to Halo conversion */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`p-5 rounded-xl border-2 ${darkMode ? 'bg-[#D4A017]/10 border-[#D4A017]/50' : 'bg-[#D4A017]/5 border-[#D4A017]/50'}`}
              >
                <h4 className={`font-bold mb-3 flex items-center gap-2 ${darkMode ? 'text-[#D4A017]' : 'text-[#8B4513]'}`}>
                  <span>⚠️</span> Conversão Biomassa → Proxy de Halo
                </h4>
                <EquationBlock darkMode={darkMode}>
                  Halo_proxy = 30 · (1 - v_biomassa(C) / v_biomassa(controle))
                </EquationBlock>
                <div className={`mt-3 p-3 rounded-lg ${darkMode ? 'bg-[#0a0f07]/50' : 'bg-white/50'}`}>
                  <p className={`text-xs ${darkMode ? 'text-[#C68E17]' : 'text-[#8B4513]'}`}>
                    <strong>IMPORTANTE:</strong> Esta equação NÃO representa difusão física. É um proxy linear para visualizar a fração de redução de biomassa em escala 0-30mm.
                  </p>
                  <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
                    <div className={`p-2 rounded ${darkMode ? 'bg-[#2D5016]/20' : 'bg-[#2D5016]/10'}`}>
                      <div className="font-bold">LOEC</div>
                      <div className={darkMode ? 'text-[#F5E6C8]/60' : 'text-[#2D5016]/60'}>Halo &gt; 1mm</div>
                    </div>
                    <div className={`p-2 rounded ${darkMode ? 'bg-[#2D5016]/20' : 'bg-[#2D5016]/10'}`}>
                      <div className="font-bold">MIC teórica</div>
                      <div className={darkMode ? 'text-[#F5E6C8]/60' : 'text-[#2D5016]/60'}>Halo &gt; 5mm</div>
                    </div>
                    <div className={`p-2 rounded ${darkMode ? 'bg-[#2D5016]/20' : 'bg-[#2D5016]/10'}`}>
                      <div className="font-bold">EC₅₀</div>
                      <div className={darkMode ? 'text-[#F5E6C8]/60' : 'text-[#2D5016]/60'}>Halo = 15mm</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Computational design */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 flex justify-center gap-6 flex-wrap"
              >
                <div className={`px-6 py-4 rounded-xl border text-center ${darkMode ? 'bg-[#D4A017]/10 border-[#D4A017]/30' : 'bg-[#D4A017]/5 border-[#D4A017]/30'}`}>
                  <div className="text-3xl font-bold text-[#D4A017]">
                    <CountUp end={6000} />
                  </div>
                  <div className={`text-xs ${darkMode ? 'text-[#F5E6C8]/60' : 'text-[#8B4513]'}`}>
                    Simulações FBA
                  </div>
                </div>
                <div className={`px-6 py-4 rounded-xl border text-center ${darkMode ? 'bg-[#2D5016]/20 border-[#2D5016]/30' : 'bg-[#2D5016]/5 border-[#2D5016]/30'}`}>
                  <div className="text-3xl font-bold text-[#2D5016]">200</div>
                  <div className={`text-xs ${darkMode ? 'text-[#F5E6C8]/60' : 'text-[#8B4513]'}`}>
                    Doses por condição
                  </div>
                </div>
                <div className={`px-6 py-4 rounded-xl border text-center ${darkMode ? 'bg-[#8B4513]/10 border-[#8B4513]/30' : 'bg-[#8B4513]/5 border-[#8B4513]/30'}`}>
                  <div className="text-3xl font-bold text-[#8B4513]">5</div>
                  <div className={`text-xs ${darkMode ? 'text-[#F5E6C8]/60' : 'text-[#8B4513]'}`}>
                    Réplicas computacionais
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {/* BLOCO C: Estatística */}
          {activeBlock === 2 && (
            <div>
              <h3 className={`text-xl font-bold mb-6 ${textColor}`}>
                Fluxo Decisório Estatístico
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Statistical tests */}
                <div>
                  <h4 className={`font-semibold mb-4 ${darkMode ? 'text-[#D4A017]' : 'text-[#8B4513]'}`}>
                    Testes de Premissas
                  </h4>
                  <div className="space-y-3">
                    {[
                      { nome: 'Shapiro-Wilk', funcao: 'Avaliar normalidade', cor: '#2D5016' },
                      { nome: 'Levene', funcao: 'Avaliar homogeneidade de variâncias', cor: '#D4A017' }
                    ].map((teste, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.2 }}
                        className={`p-4 rounded-xl border-l-4 ${darkMode ? 'bg-[#2D5016]/10' : 'bg-[#2D5016]/5'}`}
                        style={{ borderLeftColor: teste.cor }}
                      >
                        <div className={`font-semibold ${darkMode ? 'text-[#F5E6C8]' : 'text-[#2D5016]'}`}>
                          {teste.nome}
                        </div>
                        <div className={`text-xs ${darkMode ? 'text-[#4a7a2e]' : 'text-[#8B4513]'}`}>
                          {teste.funcao}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Decision flow */}
                <div>
                  <h4 className={`font-semibold mb-4 ${darkMode ? 'text-[#D4A017]' : 'text-[#8B4513]'}`}>
                    Fluxo Decisório
                  </h4>
                  <div className="space-y-3">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className={`p-4 rounded-xl ${darkMode ? 'bg-green-500/10 border border-green-500/30' : 'bg-green-50 border border-green-200'}`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-green-500">✓</span>
                        <span className={`font-semibold text-sm ${darkMode ? 'text-green-400' : 'text-green-700'}`}>
                          Ambas premissas satisfeitas
                        </span>
                      </div>
                      <div className={`text-xs ${darkMode ? 'text-[#F5E6C8]/60' : 'text-[#2D5016]/60'}`}>
                        → ANOVA one-way + Tukey (post-hoc)
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className={`p-4 rounded-xl ${darkMode ? 'bg-orange-500/10 border border-orange-500/30' : 'bg-orange-50 border border-orange-200'}`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-orange-500">✗</span>
                        <span className={`font-semibold text-sm ${darkMode ? 'text-orange-400' : 'text-orange-700'}`}>
                          Pelo menos uma premissa falhou
                        </span>
                      </div>
                      <div className={`text-xs ${darkMode ? 'text-[#F5E6C8]/60' : 'text-[#2D5016]/60'}`}>
                        → Kruskal-Wallis + Mann-Whitney (Bonferroni)
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* BLOCO D: Resultados */}
          {activeBlock === 3 && (
            <div>
              <h3 className={`text-xl font-bold mb-6 ${textColor}`}>
                Hierarquia de Sensibilidade Fúngica ao EEB-HT
              </h3>

              {/* Results table */}
              <div className="overflow-x-auto mb-8">
                <table className="w-full text-xs md:text-sm">
                  <thead>
                    <tr className={darkMode ? 'bg-[#2D5016]/20' : 'bg-[#2D5016]/10'}>
                      <th className={`px-3 py-2 text-left font-semibold ${darkMode ? 'text-[#D4A017]' : 'text-[#2D5016]'}`}>Ranking</th>
                      <th className={`px-3 py-2 text-left font-semibold ${darkMode ? 'text-[#D4A017]' : 'text-[#2D5016]'}`}>Representante</th>
                      <th className={`px-3 py-2 text-center font-semibold ${darkMode ? 'text-[#D4A017]' : 'text-[#2D5016]'}`}>EC₅₀</th>
                      <th className={`px-3 py-2 text-center font-semibold ${darkMode ? 'text-[#D4A017]' : 'text-[#2D5016]'}`}>MIC</th>
                      <th className={`px-3 py-2 text-center font-semibold ${darkMode ? 'text-[#D4A017]' : 'text-[#2D5016]'}`}>LOEC</th>
                      <th className={`px-3 py-2 text-center font-semibold ${darkMode ? 'text-[#D4A017]' : 'text-[#2D5016]'}`}>Halo 1000mg/L</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fungiResults.map((result, i) => (
                      <motion.tr
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`border-t ${result.isProxy ? darkMode ? 'bg-[#8B4513]/10' : 'bg-[#8B4513]/5' : ''}`}
                      >
                        <td className="px-3 py-2">
                          <span className="text-lg">
                            {result.ranking === 1 ? '🥇' : result.ranking === 2 ? '🥈' : result.ranking === 3 ? '🥉' : `#${result.ranking}`}
                          </span>
                        </td>
                        <td className={`px-3 py-2 font-medium ${darkMode ? 'text-[#F5E6C8]' : 'text-[#2D5016]'}`}>
                          {result.representante}
                          {result.isProxy && <span className="ml-1 text-xs">⚠️</span>}
                        </td>
                        <td className={`px-3 py-2 text-center font-mono ${darkMode ? 'text-[#D4A017]' : 'text-[#8B4513]'}`}>
                          {result.ec50_predito}
                        </td>
                        <td className={`px-3 py-2 text-center font-mono ${darkMode ? 'text-[#F5E6C8]/70' : 'text-[#2D5016]/70'}`}>
                          {result.mic_teorica}
                        </td>
                        <td className={`px-3 py-2 text-center font-mono ${darkMode ? 'text-[#F5E6C8]/70' : 'text-[#2D5016]/70'}`}>
                          {result.loec}
                        </td>
                        <td className={`px-3 py-2 text-center font-bold ${darkMode ? 'text-[#D4A017]' : 'text-[#8B4513]'}`}>
                          {result.halo_1000mgL} mm
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Heatmap */}
              <h4 className={`font-semibold mb-4 ${darkMode ? 'text-[#D4A017]' : 'text-[#8B4513]'}`}>
                Heatmap de Halos Virtuais (mm)
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className={darkMode ? 'bg-[#2D5016]/20' : 'bg-[#2D5016]/10'}>
                      <th className={`px-3 py-2 text-left ${darkMode ? 'text-[#D4A017]' : 'text-[#2D5016]'}`}>Fungo</th>
                      <th className={`px-3 py-2 text-center ${darkMode ? 'text-[#D4A017]' : 'text-[#2D5016]'}`}>50 mg/L</th>
                      <th className={`px-3 py-2 text-center ${darkMode ? 'text-[#D4A017]' : 'text-[#2D5016]'}`}>200 mg/L</th>
                      <th className={`px-3 py-2 text-center ${darkMode ? 'text-[#D4A017]' : 'text-[#2D5016]'}`}>1000 mg/L</th>
                    </tr>
                  </thead>
                  <tbody>
                    {heatmapData.map((row, i) => (
                      <motion.tr
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className="border-t"
                      >
                        <td className={`px-3 py-2 font-medium ${darkMode ? 'text-[#F5E6C8]' : 'text-[#2D5016]'}`}>
                          {row.fungo}
                        </td>
                        {[row.halo_50, row.halo_200, row.halo_1000].map((halo, j) => {
                          const intensity = halo / 30;
                          return (
                            <td key={j} className="px-3 py-2 text-center">
                              <div
                                className="inline-block px-3 py-1 rounded font-mono font-bold text-xs"
                                style={{
                                  backgroundColor: `rgba(212, 160, 23, ${0.1 + intensity * 0.6})`,
                                  color: intensity > 0.5 ? '#0a0f07' : darkMode ? '#D4A017' : '#8B4513'
                                }}
                              >
                                {halo.toFixed(1)}
                              </div>
                            </td>
                          );
                        })}
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* EEB-BM result */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className={`mt-6 p-5 rounded-xl border-2 ${darkMode ? 'bg-[#2D5016]/20 border-[#2D5016]/50' : 'bg-[#2D5016]/5 border-[#2D5016]/50'}`}
              >
                <h4 className={`font-bold mb-2 flex items-center gap-2 ${darkMode ? 'text-[#2D5016]' : 'text-[#2D5016]'}`}>
                  <span>✅</span> Ação Nutricional do EEB-BM
                </h4>
                <p className={`text-sm ${darkMode ? 'text-[#F5E6C8]/70' : 'text-[#2D5016]/70'}`}>
                  <strong>Halo = 0mm</strong> em todos os modelos. Ácido linoleico = substrato lipídico, NÃO agente antifúngico.
                  EEB-BM atua como controle nutricional, não como inibidor.
                </p>
              </motion.div>
            </div>
          )}

          {/* BLOCO E: Limitações */}
          {activeBlock === 4 && (
            <div>
              <h3 className={`text-xl font-bold mb-6 ${textColor}`}>
                Limitações e Perspectivas Translacionais
              </h3>

              {/* Limitations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {limitations.map((lim, i) => (
                  <motion.div
                    key={lim.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15 }}
                    onClick={() => setExpandedLimitation(expandedLimitation === lim.id ? null : lim.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      expandedLimitation === lim.id
                        ? darkMode ? 'bg-[#8B4513]/20 border-[#8B4513]/50' : 'bg-[#8B4513]/10 border-[#8B4513]/50'
                        : darkMode ? 'bg-[#1a2b12]/60 border-[#2D5016]/30' : 'bg-white/60 border-[#2D5016]/20'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{lim.icone}</span>
                      <div className="flex-1">
                        <h4 className={`font-semibold mb-1 ${darkMode ? 'text-[#F5E6C8]' : 'text-[#2D5016]'}`}>
                          {lim.titulo}
                        </h4>
                        <p className={`text-xs ${darkMode ? 'text-[#F5E6C8]/60' : 'text-[#2D5016]/60'}`}>
                          {lim.descricao}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Translational perspectives */}
              <h4 className={`font-semibold mb-4 ${darkMode ? 'text-[#D4A017]' : 'text-[#8B4513]'}`}>
                Perspectivas Translacionais
              </h4>
              <div className="space-y-3">
                {translationalPerspectives.map((persp, i) => (
                  <motion.div
                    key={persp.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.2 }}
                    className={`p-4 rounded-xl border-l-4 ${darkMode ? 'bg-[#2D5016]/10 border-[#D4A017]' : 'bg-[#2D5016]/5 border-[#D4A017]'}`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[#D4A017]">→</span>
                      <span className={`font-semibold text-sm ${darkMode ? 'text-[#F5E6C8]' : 'text-[#2D5016]'}`}>
                        {persp.acao}
                      </span>
                    </div>
                    <p className={`text-xs ml-6 ${darkMode ? 'text-[#4a7a2e]' : 'text-[#8B4513]'}`}>
                      {persp.descricao}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
