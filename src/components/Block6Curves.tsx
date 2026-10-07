import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Area, AreaChart, Legend
} from 'recharts';
import { htDoses, htCRS, htFBA } from '../data/htData';
import { bmDoses, bmLogistic, bmFBA, bmBoxplot } from '../data/bmData';
import AcademicImage from './AcademicImage';
import { IMAGES } from '../assets/images';

interface Props { darkMode: boolean; }

function CountUp({ end, decimals = 1, suffix = '' }: { end: number; decimals?: number; suffix?: string }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
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

export default function Block6Curves({ darkMode }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { label: 'FBA Preditivo', id: 0 },
    { label: 'IVG — EEB-HT', id: 1 },
    { label: 'Raiz — EEB-HT', id: 2 },
    { label: 'IVG — EEB-BM', id: 3 },
    { label: 'Raiz — EEB-BM', id: 4 },
    { label: 'Fenótipo', id: 5 },
  ];

  const axisColor = darkMode ? '#4a7a2e' : '#2D5016';
  const gridColor = darkMode ? 'rgba(45,80,22,0.2)' : 'rgba(45,80,22,0.1)';
  const textColor = darkMode ? '#F5E6C8' : '#2D5016';

  return (
    <section id="curves" className="section-block py-20 px-6 relative min-h-screen">
      <div className={`absolute inset-0 ${darkMode
        ? 'bg-gradient-to-b from-[#0a0f07] to-[#141f0d]'
        : 'bg-gradient-to-b from-[#faf8f0] to-[#f0e4b8]'
      }`} />

      <div className="relative z-10 max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-8"
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-[#F5E6C8]' : 'text-[#2D5016]'}`}>
            Curvas FBA vs In Vitro
          </h2>
          <p className={`text-lg ${darkMode ? 'text-[#4a7a2e]' : 'text-[#8B4513]'}`}>
            O core do painel: predição metabólica confrontada com dados experimentais
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-[#D4A017] text-[#0a0f07]'
                  : darkMode
                    ? 'bg-[#1a2b12] text-[#F5E6C8]/70 hover:bg-[#2D5016]/30'
                    : 'bg-[#2D5016]/10 text-[#2D5016] hover:bg-[#2D5016]/20'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Chart Area */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={`rounded-2xl border p-6 ${darkMode ? 'bg-[#1a2b12]/60 border-[#2D5016]/30' : 'bg-white/60 border-[#2D5016]/20'}`}
        >
          {/* Tab 0: FBA Predictive */}
          {activeTab === 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className={`font-semibold mb-4 ${textColor}`}>EEB-HT — Curva Hormética (FBA)</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={htFBA.points}>
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                    <XAxis dataKey="dose" stroke={axisColor} tick={{ fontSize: 11 }} label={{ value: 'mg/L', position: 'bottom', fill: axisColor, fontSize: 11 }} />
                    <YAxis stroke={axisColor} tick={{ fontSize: 11 }} label={{ value: 'Crescimento', angle: -90, position: 'left', fill: axisColor, fontSize: 11 }} />
                    <Tooltip contentStyle={{ background: darkMode ? '#1a2b12' : '#fff', border: '1px solid #D4A017', borderRadius: 8 }} />
                    <ReferenceLine x={45} stroke="#D4A017" strokeDasharray="5 5" label={{ value: 'Pico: 45 mg/L', fill: '#D4A017', fontSize: 10 }} />
                    <Area type="monotone" dataKey="growth" stroke="#D4A017" fill="url(#htGradient)" strokeWidth={2} dot={{ fill: '#D4A017', r: 3 }} />
                    <defs>
                      <linearGradient id="htGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#D4A017" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#D4A017" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
                <p className={`text-xs mt-2 italic ${darkMode ? 'text-[#D4A017]' : 'text-[#C68E17]'}`}>
                  {htFBA.equation}
                </p>
              </div>
              <div>
                <h3 className={`font-semibold mb-4 ${textColor}`}>EEB-BM — Saturação (FBA)</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={bmFBA.points}>
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                    <XAxis dataKey="dose" stroke={axisColor} tick={{ fontSize: 11 }} label={{ value: 'mg/L', position: 'bottom', fill: axisColor, fontSize: 11 }} />
                    <YAxis stroke={axisColor} tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={{ background: darkMode ? '#1a2b12' : '#fff', border: '1px solid #2D5016', borderRadius: 8 }} />
                    <Area type="monotone" dataKey="growth" stroke="#2D5016" fill="url(#bmGradient)" strokeWidth={2} dot={{ fill: '#2D5016', r: 3 }} />
                    <defs>
                      <linearGradient id="bmGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2D5016" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#2D5016" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
                <p className={`text-xs mt-2 italic ${darkMode ? 'text-[#4a7a2e]' : 'text-[#2D5016]'}`}>
                  {bmFBA.equation} | Platô: {bmFBA.plateau}
                </p>
              </div>
            </div>
          )}

          {/* Tab 1: IVG EEB-HT */}
          {activeTab === 1 && (
            <div>
              <h3 className={`font-semibold mb-2 ${textColor}`}>IVG — EEB-HT (Hormese)</h3>
              <p className={`text-xs mb-4 ${darkMode ? 'text-[#4a7a2e]' : 'text-[#2D5016]/60'}`}>
                EC50 IVG = <CountUp end={45.2} /> mg/L | Pico hormético ≈ 12,5 mg/L
              </p>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={htDoses} barCategoryGap="20%">
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                  <XAxis dataKey="label" stroke={axisColor} tick={{ fontSize: 10 }} />
                  <YAxis stroke={axisColor} tick={{ fontSize: 11 }} domain={[0, 1.5]} />
                  <Tooltip contentStyle={{ background: darkMode ? '#1a2b12' : '#fff', border: '1px solid #D4A017', borderRadius: 8 }} />
                  <ReferenceLine y={1} stroke="#8B4513" strokeDasharray="5 5" label={{ value: 'Controle', fill: '#8B4513', fontSize: 10 }} />
                  <Bar dataKey="ivg" fill="#D4A017" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 flex gap-4 flex-wrap justify-center">
                <div className={`px-3 py-1 rounded-full text-xs ${darkMode ? 'bg-[#D4A017]/20 text-[#D4A017]' : 'bg-[#D4A017]/10 text-[#8B4513]'}`}>
                  {htCRS.equation}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Root EEB-HT */}
          {activeTab === 2 && (
            <div>
              <h3 className={`font-semibold mb-2 ${textColor}`}>Comprimento Radicular — EEB-HT</h3>
              <p className={`text-xs mb-4 ${darkMode ? 'text-[#4a7a2e]' : 'text-[#2D5016]/60'}`}>
                EC50 radicular = <CountUp end={62.8} /> mg/L | Mediana máxima em 12,5 mg/L
              </p>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={htDoses} barCategoryGap="20%">
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                  <XAxis dataKey="label" stroke={axisColor} tick={{ fontSize: 10 }} />
                  <YAxis stroke={axisColor} tick={{ fontSize: 11 }} label={{ value: 'mm', angle: -90, position: 'left', fill: axisColor, fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: darkMode ? '#1a2b12' : '#fff', border: '1px solid #D4A017', borderRadius: 8 }} />
                  <ReferenceLine y={18.5} stroke="#8B4513" strokeDasharray="5 5" label={{ value: 'Controle', fill: '#8B4513', fontSize: 10 }} />
                  <Bar dataKey="root" fill="#C68E17" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Tab 3: IVG EEB-BM */}
          {activeTab === 3 && (
            <div>
              <h3 className={`font-semibold mb-2 ${textColor}`}>IVG — EEB-BM (Monotônico)</h3>
              <p className={`text-xs mb-4 ${darkMode ? 'text-[#4a7a2e]' : 'text-[#2D5016]/60'}`}>
                EC50 extrapolado = <CountUp end={3611.86} decimals={2} /> mg/L | {bmLogistic.model}
              </p>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={bmDoses} barCategoryGap="15%">
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                  <XAxis dataKey="label" stroke={axisColor} tick={{ fontSize: 10 }} />
                  <YAxis stroke={axisColor} tick={{ fontSize: 11 }} domain={[0.8, 1.5]} />
                  <Tooltip contentStyle={{ background: darkMode ? '#1a2b12' : '#fff', border: '1px solid #2D5016', borderRadius: 8 }} />
                  <ReferenceLine y={1} stroke="#8B4513" strokeDasharray="5 5" label={{ value: 'Controle', fill: '#8B4513', fontSize: 10 }} />
                  <Bar dataKey="ivg" fill="#2D5016" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Tab 4: Root EEB-BM */}
          {activeTab === 4 && (
            <div>
              <h3 className={`font-semibold mb-2 ${textColor}`}>Comprimento Radicular — EEB-BM</h3>
              <p className={`text-xs mb-4 ${darkMode ? 'text-[#4a7a2e]' : 'text-[#2D5016]/60'}`}>
                Spearman ρ = <CountUp end={0.834} decimals={3} /> | Controle: {bmBoxplot.control} mm → 1000 mg/L: {bmBoxplot.max1000} mm
              </p>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={bmDoses} barCategoryGap="15%">
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                  <XAxis dataKey="label" stroke={axisColor} tick={{ fontSize: 10 }} />
                  <YAxis stroke={axisColor} tick={{ fontSize: 11 }} label={{ value: 'mm', angle: -90, position: 'left', fill: axisColor, fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: darkMode ? '#1a2b12' : '#fff', border: '1px solid #2D5016', borderRadius: 8 }} />
                  <ReferenceLine y={17.24} stroke="#8B4513" strokeDasharray="5 5" label={{ value: 'Controle', fill: '#8B4513', fontSize: 10 }} />
                  <Bar dataKey="root" fill="#4a7a2e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 flex gap-4 justify-center flex-wrap">
                <div className={`px-3 py-2 rounded-lg text-xs text-center ${darkMode ? 'bg-[#8B4513]/20' : 'bg-[#8B4513]/10'}`}>
                  <div className="text-[#8B4513] font-bold">CuSO₄ (+)</div>
                  <div className={darkMode ? 'text-[#F5E6C8]/60' : 'text-[#8B4513]/80'}>{bmBoxplot.cuSO4} mm</div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 5: Phenotypic */}
          {activeTab === 5 && (
            <div>
              <h3 className={`font-semibold mb-6 text-center ${textColor}`}>Descoberta Fenotípica</h3>
              
              {/* Comparative image */}
              <AcademicImage
                src={IMAGES.pelosRadiculares}
                alt="Comparação de radículas: Controle vs EEB-HT"
                caption="Figura 17: Observação morfológica evidenciando a formação precoce de pelos radiculares em L. sativa tratada com EEB-HT (a) vs. Controle (b)"
                className="mb-6"
                darkMode={darkMode}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className={`p-4 rounded-xl border ${darkMode ? 'bg-[#1a2b12]/60 border-[#2D5016]/30' : 'bg-white/60 border-[#2D5016]/20'}`}>
                  <h4 className={`font-semibold mb-2 ${darkMode ? 'text-[#F5E6C8]' : 'text-[#2D5016]'}`}>
                    🌱 Controle
                  </h4>
                  <p className={`text-sm ${darkMode ? 'text-[#F5E6C8]/60' : 'text-[#8B4513]/80'}`}>
                    Raízes normais com pelos radiculares típicos
                  </p>
                </div>
                <motion.div
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  className={`p-4 rounded-xl border-2 ${darkMode ? 'bg-[#D4A017]/10 border-[#D4A017]/50' : 'bg-[#D4A017]/5 border-[#D4A017]/50'}`}
                >
                  <h4 className={`font-semibold mb-2 ${darkMode ? 'text-[#D4A017]' : 'text-[#8B4513]'}`}>
                    🌿 EEB-HT 12,5 mg/L
                  </h4>
                  <p className={`text-sm ${darkMode ? 'text-[#F5E6C8]/80' : 'text-[#2D5016]/80'}`}>
                    <strong className="text-[#D4A017]">Pelos radiculares PREOCES</strong> (dia 1) — diferenciação epidérmica acelerada
                  </p>
                </motion.div>
              </div>

              {/* CuSO4 control */}
              <AcademicImage
                src={IMAGES.controleCuSO4}
                alt="Esverdeamento precoce por CuSO₄"
                caption="Figura 22: Esverdeamento precoce em plântulas expostas ao CuSO₄ (controle positivo de estresse)"
                className="mb-6"
                darkMode={darkMode}
              />

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className={`mt-4 p-4 rounded-xl ${darkMode ? 'bg-[#2D5016]/20' : 'bg-[#2D5016]/5'}`}
              >
                <p className={`text-sm ${darkMode ? 'text-[#4a7a2e]' : 'text-[#2D5016]'}`}>
                  <strong>Mecanismo proposto:</strong> ROS + auxina + etileno → diferenciação epidérmica acelerada
                </p>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
