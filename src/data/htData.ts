export const htDoses = [
  { dose: 0, ivg: 1.0, ivgError: 0.05, root: 18.5, rootError: 2.1, label: "Controle" },
  { dose: 12.5, ivg: 1.35, ivgError: 0.08, root: 24.8, rootError: 3.2, label: "12,5 mg/L" },
  { dose: 25, ivg: 1.22, ivgError: 0.07, root: 22.1, rootError: 2.8, label: "25 mg/L" },
  { dose: 50, ivg: 0.85, ivgError: 0.06, root: 14.2, rootError: 2.5, label: "50 mg/L" },
  { dose: 100, ivg: 0.52, ivgError: 0.04, root: 8.9, rootError: 1.8, label: "100 mg/L" },
  { dose: 200, ivg: 0.28, ivgError: 0.03, root: 5.1, rootError: 1.2, label: "200 mg/L" },
  { dose: 500, ivg: 0.12, ivgError: 0.02, root: 2.3, rootError: 0.8, label: "500 mg/L" },
];

export const htCRS = {
  ec50IVG: 45.2,
  ec50Root: 62.8,
  peakHormesis: 12.5,
  equation: "y = β/(1+(x/EC50)^b) + a·exp(-(x/μ)²)",
  description: "Curva de Resposta Contínua (CRS) com componente hormético"
};

export const htFBA = {
  points: [
    { dose: 0, growth: 0.32 },
    { dose: 10, growth: 0.45 },
    { dose: 25, growth: 0.58 },
    { dose: 45, growth: 0.72 },
    { dose: 80, growth: 0.65 },
    { dose: 150, growth: 0.48 },
    { dose: 200, growth: 0.35 },
    { dose: 400, growth: 0.18 },
    { dose: 600, growth: 0.08 },
    { dose: 800, growth: 0.03 },
    { dose: 1000, growth: 0.01 },
  ],
  peakDose: 45,
  equation: "Gaussiana + Decaimento Quadrático"
};

export const htYield = { eebHT: 6.13 };
