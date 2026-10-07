import { motion, useInView } from 'framer-motion';
import { useRef, useState, useMemo, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Area, AreaChart, Legend
} from 'recharts';
import {
  curadoriaData, fbaConfig, doseResponseModels, simulationResults
} from '../data/aragemData';

interface Props { darkMode: boolean; }

function CountUp({ end, decimals = 0, duration = 2000 }: { end: number; decimals?: number; duration?: number }) {
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
      setValue(eased * end);
      if (progress >= 1) clearInterval(interval);
    }, 16);
    return () => clearInterval(interval);
  }, [inView, end, duration]);

  return <span ref={ref}>{value.toFixed(decimals)}</span>;
}

// Classification badge
function ClassBadge({ type }: { type: 'direta' | 'homologia' | 'hipotese' }) {
  const config = {
    direta: { emoji: '🟢', label: 'Evidência direta', color: 'bg-green-500/20 text-green-400 border-green-500/40' },
    homologia: { emoji: '🟡', label: 'Homologia RBH', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40' },
    hipotese: { emoji: '🔴', label: 'Hipótese mecanística', color: 'bg-red-500/20 text-red-400 border-red-500/40' }
  };
  const c = config[type];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border ${c.color}`}>
      {c.emoji} {c.label}
    </span>
  );
}

// Equation display component
function EquationBlock({ equation, darkMode }: { equation: string; darkMode: boolean }) {
  return (
    <div className={`font-mono text-sm p-4 rounded-lg border ${darkMode
      ? 'bg-[#0a0f07] border-[#D4A017]/30 text-[#D4A017]'
      : 'bg-[#F5E6C8]/50 border-[#8B4513]/30 text-[#8B4513]'
    }`}>
      {equation}
    </div>
  );
}

export default function BlockAraGEM({ darkMode }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [activeStep, setActiveStep] = useState(0);
  const [hoveredProtein, setHoveredProtein] = useState<number | null>(null);
  const [hoveredCompound, setHoveredCompound] = useState<number | null>(null);

  // Slider states for dose-response
  const [sliderValues, setSliderValues] = useState<Record<string, Record<string, number>>>(() => {
    const initial: Record<string, Record<string, number>> = {};
    doseResponseModels.forEach((model, i) => {
      initial[i.toString()] = {};
      Object.entries(model.parametros).forEach(([key, param]) => {
        initial[i.toString()][key] = param.valor;
      });
    });
    return initial;
  });

  const steps = [
    { id: 0, label: 'Curadoria', icon: '🧬', short: 'Passo 1' },
    { id: 1, label: 'FBA Config', icon: '⚙️', short: 'Passo 2' },
    { id: 2, label: 'Dose-Resposta', icon: '📈', short: 'Passo 4' },
    { id: 3, label: 'Simulação', icon: '🎯', short: 'Passo 5' },
  ];

  const axisColor = darkMode ? '#4a7a2e' : '#2D5016';
  const gridColor = darkMode ? 'rgba(45,80,22,0.2)' : 'rgba(45,80,22,0.1)';
  const textColor = darkMode ? '#F5E6C8' : '#2D5016';

  // Generate dose-response curve data
  const generateCurveData = (modelIndex: number) => {
    const model = doseResponseModels[modelIndex];
    const params = sliderValues[modelIndex.toString()];
    const data = [];
    for (let c = 0; c <= 1000; c += 10) {
      data.push({ dose: c, value: model.funcao(c, params) });
    }
    return data;
  };

  return (
    <section id="aragem" className="section-block py-20 px-6 relative">
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
            Pipeline de Modelagem Metabólica
          </h2>
          <p className={`text-lg ${darkMode ? 'text-[#4a7a2e]' : 'text-[#8B4513]'}`}>
            Do AraGEM às Curvas Preditivas — construção passo a passo
          </p>
        </motion.div>

        {/* Step navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {steps.map((step) => (
            <button
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all ${
                activeStep === step.id
                  ? 'bg-[#D4A017] text-[#0a0f07] shadow-lg shadow-[#D4A017]/20'
                  : darkMode
                    ? 'bg-[#1a2b12] text-[#F5E6C8]/70 hover:bg-[#2D5016]/30 border border-[#2D5016]/30'
                    : 'bg-white/60 text-[#2D5016] hover:bg-[#2D5016]/10 border border-[#2D5016]/20'
              }`}
            >
              <span className="text-lg">{step.icon}</span>
              <span className="hidden md:inline">{step.label}</span>
              <span className="md:hidden text-xs">{step.short}</span>
            </button>
          ))}
        </div>

        {/* Step content */}
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className={`rounded-2xl border p-6 md:p-8 ${darkMode
            ? 'bg-[#1a2b12]/60 border-[#2D5016]/30'
            : 'bg-white/60 border-[#2D5016]/20'
          }`}
        >
          {/* STEP 1: Curadoria Genômica */}
          {activeStep === 0 && (
            <div>
              <h3 className={`text-xl font-bold mb-2 ${textColor}`}>
                {curadoriaData.titulo}
              </h3>
              <p className={`text-sm mb-6 ${darkMode ? 'text-[#F5E6C8]/70' : 'text-[#8B4513]/80'}`}>
                {curadoriaData.modelo_base} → <strong>{curadoriaData.organismo_alvo}</strong> via {curadoriaData.metodo}
              </p>

              {/* Protein table */}
              <div className="overflow-x-auto mb-8">
                <table className="w-full text-xs md:text-sm">
                  <thead>
                    <tr className={darkMode ? 'bg-[#2D5016]/20' : 'bg-[#2D5016]/10'}>
                      <th className={`px-3 py-2 text-left font-semibold ${darkMode ? 'text-[#D4A017]' : 'text-[#2D5016]'}`}>Módulo</th>
                      <th className={`px-3 py-2 text-left font-semibold ${darkMode ? 'text-[#D4A017]' : 'text-[#2D5016]'}`}>Proteína L. sativa</th>
                      <th className={`px-3 py-2 text-center font-semibold ${darkMode ? 'text-[#D4A017]' : 'text-[#2D5016]'}`}>Identidade</th>
                      <th className={`px-3 py-2 text-center font-semibold ${darkMode ? 'text-[#D4A017]' : 'text-[#2D5016]'}`}>Cobertura</th>
                      <th className={`px-3 py-2 text-left font-semibold ${darkMode ? 'text-[#D4A017]' : 'text-[#2D5016]'}`}>Classificação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {curadoriaData.modulos_adicionados.map((mod, i) => (
                      <motion.tr
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        onMouseEnter={() => setHoveredProtein(i)}
                        onMouseLeave={() => setHoveredProtein(null)}
                        className={`border-t transition-colors cursor-pointer ${
                          hoveredProtein === i
                            ? darkMode ? 'bg-[#D4A017]/10' : 'bg-[#D4A017]/10'
                            : darkMode ? 'hover:bg-[#2D5016]/10' : 'hover:bg-[#2D5016]/5'
                        }`}
                      >
                        <td className={`px-3 py-2 font-medium ${darkMode ? 'text-[#F5E6C8]' : 'text-[#2D5016]'}`}>
                          {mod.modulo}
                        </td>
                        <td className={`px-3 py-2 font-mono text-xs ${darkMode ? 'text-[#4a7a2e]' : 'text-[#8B4513]'}`}>
                          {mod.proteina_Lsat}
                        </td>
                        <td className="px-3 py-2 text-center">
                          <span className={`font-mono font-bold ${
                            parseFloat(mod.identidade.replace(',', '.')) >= 80
                              ? 'text-green-500'
                              : parseFloat(mod.identidade.replace(',', '.')) >= 60
                                ? 'text-yellow-500'
                                : 'text-red-400'
                          }`}>
                            {mod.identidade}
                          </span>
                        </td>
                        <td className={`px-3 py-2 text-center font-mono ${darkMode ? 'text-[#F5E6C8]/70' : 'text-[#2D5016]/70'}`}>
                          {mod.cobertura}
                        </td>
                        <td className="px-3 py-2">
                          <ClassBadge type={mod.classificacao} />
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Compounds modeled */}
              <h4 className={`font-semibold mb-4 ${darkMode ? 'text-[#D4A017]' : 'text-[#8B4513]'}`}>
                Compostos Modelados
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {curadoriaData.compostos_modelados.map((comp, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.2 }}
                    onMouseEnter={() => setHoveredCompound(i)}
                    onMouseLeave={() => setHoveredCompound(null)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      hoveredCompound === i ? 'scale-105' : ''
                    }`}
                    style={{ borderColor: comp.cor + '60', background: comp.cor + '10' }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: comp.cor }} />
                      <h5 className={`font-bold ${darkMode ? 'text-[#F5E6C8]' : 'text-[#2D5016]'}`}>
                        {comp.composto}
                      </h5>
                    </div>
                    <div className="space-y-1">
                      {comp.vias_adicionadas.map((via, j) => (
                        <div key={j} className={`text-xs flex items-center gap-1 ${darkMode ? 'text-[#F5E6C8]/60' : 'text-[#2D5016]/60'}`}>
                          <span style={{ color: comp.cor }}>→</span> {via}
                        </div>
                      ))}
                    </div>
                    <p className={`text-[10px] italic mt-2 ${darkMode ? 'text-[#F5E6C8]/40' : 'text-[#2D5016]/40'}`}>
                      {comp.nota}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: FBA Configuration */}
          {activeStep === 1 && (
            <div>
              <h3 className={`text-xl font-bold mb-2 ${textColor}`}>
                {fbaConfig.titulo}
              </h3>
              <p className={`text-sm mb-6 ${darkMode ? 'text-[#F5E6C8]/70' : 'text-[#8B4513]/80'}`}>
                {fbaConfig.ambiente} | Solver: {fbaConfig.solver}
              </p>

              {/* Equations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h4 className={`font-semibold mb-3 ${darkMode ? 'text-[#D4A017]' : 'text-[#8B4513]'}`}>
                    Formulação Matemática
                  </h4>
                  <div className="space-y-3">
                    <EquationBlock
                      equation="max  cᵀ · v"
                      darkMode={darkMode}
                    />
                    <p className={`text-xs ${darkMode ? 'text-[#F5E6C8]/50' : 'text-[#2D5016]/50]'}`}>
                      Função Objetivo: maximizar biomassa
                    </p>
                    
                    <EquationBlock
                      equation="S · v = 0"
                      darkMode={darkMode}
                    />
                    <p className={`text-xs ${darkMode ? 'text-[#F5E6C8]/50' : 'text-[#2D5016]/50]'}`}>
                      Balanço de massa (estado estacionário)
                    </p>

                    <EquationBlock
                      equation="v_min ≤ v ≤ v_max"
                      darkMode={darkMode}
                    />
                    <p className={`text-xs ${darkMode ? 'text-[#F5E6C8]/50' : 'text-[#2D5016]/50]'}`}>
                      Limites termodinâmicos e de capacidade
                    </p>
                  </div>
                </div>

                {/* Flow diagram */}
                <div>
                  <h4 className={`font-semibold mb-3 ${darkMode ? 'text-[#D4A017]' : 'text-[#8B4513]'}`}>
                    Pipeline Computacional
                  </h4>
                  <div className="space-y-3">
                    {[
                      { label: 'Matriz Estequiométrica (S)', icon: '📐', desc: `${fbaConfig.restricoes.balanco_massa}` },
                      { label: 'Vetor de Fluxos (v)', icon: '🔄', desc: `${fbaConfig.restricoes.limites_fluxo}` },
                      { label: 'Solver HiGHS', icon: '⚡', desc: 'Programação linear — scipy.optimize.linprog' },
                      { label: 'Vetor de Fluxos Ótimos', icon: '✅', desc: 'Distribuição ótima sob restrições' },
                      { label: 'HYB_BIOMASS', icon: '🌱', desc: fbaConfig.reacao_dreno }
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.2 }}
                        className={`flex items-center gap-3 p-3 rounded-lg ${darkMode ? 'bg-[#2D5016]/15' : 'bg-[#2D5016]/5'}`}
                      >
                        <span className="text-2xl">{item.icon}</span>
                        <div>
                          <p className={`text-sm font-semibold ${darkMode ? 'text-[#F5E6C8]' : 'text-[#2D5016]'}`}>
                            {item.label}
                          </p>
                          <p className={`text-xs ${darkMode ? 'text-[#4a7a2e]' : 'text-[#8B4513]/70'}`}>
                            {item.desc}
                          </p>
                        </div>
                        {i < 4 && (
                          <div className="ml-auto text-[#D4A017]">↓</div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Culture medium */}
              <div className={`p-4 rounded-xl ${darkMode ? 'bg-[#2D5016]/10' : 'bg-[#2D5016]/5'}`}>
                <h4 className={`font-semibold mb-2 text-sm ${darkMode ? 'text-[#4a7a2e]' : 'text-[#2D5016]'}`}>
                  Meio de Cultura Mínimo
                </h4>
                <div className="flex flex-wrap gap-2">
                  {fbaConfig.meio_cultura.componentes.map((comp, i) => (
                    <span key={i} className={`px-3 py-1 rounded-full text-xs font-mono ${
                      darkMode ? 'bg-[#1a2b12] text-[#D4A017] border border-[#D4A017]/30' : 'bg-white text-[#8B4513] border border-[#8B4513]/30'
                    }`}>
                      {comp}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Dose-Response */}
          {activeStep === 2 && (
            <div>
              <h3 className={`text-xl font-bold mb-2 ${textColor}`}>
                Equações Limitantes de Dose-Resposta
              </h3>
              <p className={`text-sm mb-6 ${darkMode ? 'text-[#F5E6C8]/70' : 'text-[#8B4513]/80'}`}>
                Cada extrato recebeu uma formulação matemática distinta baseada em seu perfil fitoquímico
              </p>

              <div className="space-y-8">
                {doseResponseModels.map((model, modelIdx) => (
                  <motion.div
                    key={modelIdx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: modelIdx * 0.2 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                  >
                    {/* Chart */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: model.cor }} />
                        <h4 className={`font-semibold ${darkMode ? 'text-[#F5E6C8]' : 'text-[#2D5016]'}`}>
                          {model.nome}
                        </h4>
                      </div>
                      <p className={`text-xs mb-3 ${darkMode ? 'text-[#4a7a2e]' : 'text-[#8B4513]/70'}`}>
                        {model.modelo}
                      </p>
                      <ResponsiveContainer width="100%" height={220}>
                        <AreaChart data={generateCurveData(modelIdx)}>
                          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                          <XAxis dataKey="dose" stroke={axisColor} tick={{ fontSize: 10 }}
                            label={{ value: 'Concentração (mg/L)', position: 'bottom', fill: axisColor, fontSize: 10, offset: -5 }} />
                          <YAxis stroke={axisColor} tick={{ fontSize: 10 }} domain={['auto', 'auto']}
                            label={{ value: 'f(C)', angle: -90, position: 'left', fill: axisColor, fontSize: 10 }} />
                          <Tooltip
                            contentStyle={{ background: darkMode ? '#1a2b12' : '#fff', border: `1px solid ${model.cor}`, borderRadius: 8, fontSize: 11 }}
                            formatter={(value: number) => [value.toFixed(4), 'f(C)']}
                            labelFormatter={(label) => `${label} mg/L`}
                          />
                          <Area
                            type="monotone"
                            dataKey="value"
                            stroke={model.cor}
                            fill={model.cor}
                            fillOpacity={0.15}
                            strokeWidth={2}
                            dot={false}
                            isAnimationActive={true}
                            animationDuration={1500}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Equation + Sliders */}
                    <div>
                      <EquationBlock equation={model.equacaoLatex} darkMode={darkMode} />
                      <p className={`text-xs italic mt-2 mb-4 ${darkMode ? 'text-[#F5E6C8]/50' : 'text-[#2D5016]/50'}`}>
                        {model.comportamento}
                      </p>

                      {/* Sliders */}
                      <div className="space-y-3">
                        {Object.entries(model.parametros).map(([key, param]) => (
                          <div key={key}>
                            <div className="flex justify-between items-center mb-1">
                              <label className={`text-xs font-medium ${darkMode ? 'text-[#D4A017]' : 'text-[#8B4513]'}`}>
                                {param.label}
                              </label>
                              <span className={`text-xs font-mono ${darkMode ? 'text-[#F5E6C8]/70' : 'text-[#2D5016]/70'}`}>
                                {sliderValues[modelIdx.toString()][key]?.toFixed(key === 'beta' ? 4 : key === 'alpha' || key === 'n' ? 2 : key === 'V_max' ? 2 : 0)}
                              </span>
                            </div>
                            <input
                              type="range"
                              min={param.min}
                              max={param.max}
                              step={param.step}
                              value={sliderValues[modelIdx.toString()][key] ?? param.valor}
                              onChange={(e) => {
                                setSliderValues(prev => ({
                                  ...prev,
                                  [modelIdx.toString()]: {
                                    ...prev[modelIdx.toString()],
                                    [key]: parseFloat(e.target.value)
                                  }
                                }));
                              }}
                              className="w-full h-2 rounded-full appearance-none cursor-pointer"
                              style={{
                                background: `linear-gradient(to right, ${model.cor} 0%, ${model.cor} ${
                                  ((sliderValues[modelIdx.toString()][key] ?? param.valor) - param.min) / (param.max - param.min) * 100
                                }%, ${darkMode ? '#2D5016' : '#e0e0e0'} ${
                                  ((sliderValues[modelIdx.toString()][key] ?? param.valor) - param.min) / (param.max - param.min) * 100
                                }%, ${darkMode ? '#2D5016' : '#e0e0e0'} 100%)`
                              }}
                            />
                            <p className={`text-[10px] mt-0.5 ${darkMode ? 'text-[#4a7a2e]' : 'text-[#2D5016]/50'}`}>
                              {param.descricao}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: Simulation Results */}
          {activeStep === 3 && (
            <div>
              <h3 className={`text-xl font-bold mb-2 ${textColor}`}>
                {simulationResults.titulo}
              </h3>
              <p className={`text-sm mb-6 ${darkMode ? 'text-[#F5E6C8]/70' : 'text-[#8B4513]/80'}`}>
                {simulationResults.doses_simuladas} doses × condições = cenários matemáticos resolvidos
              </p>

              {/* Scenario counter */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex justify-center gap-6 mb-8 flex-wrap"
              >
                <div className={`px-6 py-4 rounded-xl border text-center ${darkMode ? 'bg-[#D4A017]/10 border-[#D4A017]/30' : 'bg-[#D4A017]/5 border-[#D4A017]/30'}`}>
                  <div className="text-3xl font-bold text-[#D4A017]">
                    <CountUp end={simulationResults.total_cenarios} />
                  </div>
                  <div className={`text-xs ${darkMode ? 'text-[#F5E6C8]/60' : 'text-[#8B4513]'}`}>
                    Cenários simulados
                  </div>
                </div>
                <div className={`px-6 py-4 rounded-xl border text-center ${darkMode ? 'bg-[#2D5016]/20 border-[#2D5016]/30' : 'bg-[#2D5016]/5 border-[#2D5016]/30'}`}>
                  <div className="text-3xl font-bold text-[#2D5016]">
                    <CountUp end={simulationResults.doses_simuladas} />
                  </div>
                  <div className={`text-xs ${darkMode ? 'text-[#F5E6C8]/60' : 'text-[#8B4513]'}`}>
                    Doses por condição
                  </div>
                </div>
                <div className={`px-6 py-4 rounded-xl border text-center ${darkMode ? 'bg-[#8B4513]/10 border-[#8B4513]/30' : 'bg-[#8B4513]/5 border-[#8B4513]/30'}`}>
                  <div className="text-3xl font-bold text-[#8B4513]">
                    {simulationResults.faixa_concentracao}
                  </div>
                  <div className={`text-xs ${darkMode ? 'text-[#F5E6C8]/60' : 'text-[#8B4513]'}`}>
                    Faixa (mg/L)
                  </div>
                </div>
              </motion.div>

              {/* Combined chart */}
              <div className="mb-6">
                <h4 className={`font-semibold mb-3 ${darkMode ? 'text-[#F5E6C8]' : 'text-[#2D5016]'}`}>
                  Curvas de Biomassa Preditas — Todos os Extratos
                </h4>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart>
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                    <XAxis dataKey="dose" stroke={axisColor} tick={{ fontSize: 10 }}
                      type="number" domain={[0, 1000]}
                      label={{ value: 'Concentração (mg/L)', position: 'bottom', fill: axisColor, fontSize: 11, offset: -5 }} />
                    <YAxis stroke={axisColor} tick={{ fontSize: 10 }} domain={[0, 1.1]}
                      label={{ value: 'Biomassa relativa', angle: -90, position: 'left', fill: axisColor, fontSize: 11 }} />
                    <Tooltip
                      contentStyle={{ background: darkMode ? '#1a2b12' : '#fff', border: '1px solid #D4A017', borderRadius: 8, fontSize: 11 }}
                    />
                    <Legend />
                    <ReferenceLine y={1.0} stroke="#8B4513" strokeDasharray="5 5" label={{ value: 'Controle', fill: '#8B4513', fontSize: 10 }} />

                    {/* EEB-HT */}
                    <Line
                      data={simulationResults.resultados["EEB-HT"].dados}
                      dataKey="biomassa"
                      name="EEB-HT (Hormese)"
                      stroke="#D4A017"
                      strokeWidth={2.5}
                      dot={{ fill: '#D4A017', r: 3 }}
                      isAnimationActive={true}
                      animationDuration={2000}
                    />
                    {/* EEB-BM */}
                    <Line
                      data={simulationResults.resultados["EEB-BM"].dados}
                      dataKey="biomassa"
                      name="EEB-BM (Saturação)"
                      stroke="#2D5016"
                      strokeWidth={2.5}
                      dot={{ fill: '#2D5016', r: 3 }}
                      isAnimationActive={true}
                      animationDuration={2000}
                      animationBegin={500}
                    />
                    {/* Xantohumol */}
                    <Line
                      data={simulationResults.resultados["Xantohumol"].dados}
                      dataKey="biomassa"
                      name="Xantohumol (Inibição)"
                      stroke="#8B4513"
                      strokeWidth={2.5}
                      dot={{ fill: '#8B4513', r: 3 }}
                      isAnimationActive={true}
                      animationDuration={2000}
                      animationBegin={1000}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Key findings */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className={`p-4 rounded-xl border-l-4 ${darkMode ? 'bg-[#D4A017]/10 border-[#D4A017]' : 'bg-[#D4A017]/5 border-[#D4A017]'}`}
                >
                  <div className="text-xs font-mono text-[#D4A017] mb-1">EEB-HT</div>
                  <div className={`text-lg font-bold ${darkMode ? 'text-[#F5E6C8]' : 'text-[#2D5016]'}`}>
                    Biomassa máx: {simulationResults.resultados["EEB-HT"].pico_biomassa}
                  </div>
                  <div className={`text-xs ${darkMode ? 'text-[#F5E6C8]/60' : 'text-[#8B4513]/80'}`}>
                    Dose ótima: {simulationResults.resultados["EEB-HT"].dose_otima} mg/L
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className={`p-4 rounded-xl border-l-4 ${darkMode ? 'bg-[#2D5016]/20 border-[#2D5016]' : 'bg-[#2D5016]/5 border-[#2D5016]'}`}
                >
                  <div className="text-xs font-mono text-[#2D5016] mb-1">EEB-BM</div>
                  <div className={`text-lg font-bold ${darkMode ? 'text-[#F5E6C8]' : 'text-[#2D5016]'}`}>
                    Biomassa máx: {simulationResults.resultados["EEB-BM"].biomassa_maxima}
                  </div>
                  <div className={`text-xs ${darkMode ? 'text-[#F5E6C8]/60' : 'text-[#8B4513]/80'}`}>
                    {simulationResults.resultados["EEB-BM"].comportamento}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className={`p-4 rounded-xl border-l-4 ${darkMode ? 'bg-[#8B4513]/10 border-[#8B4513]' : 'bg-[#8B4513]/5 border-[#8B4513]'}`}
                >
                  <div className="text-xs font-mono text-[#8B4513] mb-1">Xantohumol</div>
                  <div className={`text-lg font-bold ${darkMode ? 'text-[#F5E6C8]' : 'text-[#2D5016]'}`}>
                    IC₅₀ ≈ {simulationResults.resultados["Xantohumol"].IC50_aproximado} mg/L
                  </div>
                  <div className={`text-xs ${darkMode ? 'text-[#F5E6C8]/60' : 'text-[#8B4513]/80'}`}>
                    {simulationResults.resultados["Xantohumol"].comportamento}
                  </div>
                </motion.div>
              </div>

              {/* Conclusion card */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className={`mt-6 p-4 rounded-xl text-center ${darkMode ? 'bg-[#2D5016]/15' : 'bg-[#2D5016]/5'}`}
              >
                <p className={`text-sm ${darkMode ? 'text-[#4a7a2e]' : 'text-[#2D5016]'}`}>
                  <strong>⚠️ Nota:</strong> Resultados operam como <em>previsões exploratórias in silico</em> para
                  otimizar concentrações-alvo em validações experimentais.
                </p>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
