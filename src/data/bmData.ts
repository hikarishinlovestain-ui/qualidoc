export const bmDoses = [
  { dose: 0, ivg: 1.0, ivgError: 0.05, root: 17.24, rootError: 2.3, label: "Controle" },
  { dose: 12.5, ivg: 1.05, ivgError: 0.06, root: 18.9, rootError: 2.5, label: "12,5 mg/L" },
  { dose: 25, ivg: 1.12, ivgError: 0.05, root: 21.3, rootError: 2.7, label: "25 mg/L" },
  { dose: 50, ivg: 1.18, ivgError: 0.06, root: 24.1, rootError: 3.0, label: "50 mg/L" },
  { dose: 100, ivg: 1.25, ivgError: 0.07, root: 27.8, rootError: 3.2, label: "100 mg/L" },
  { dose: 250, ivg: 1.32, ivgError: 0.06, root: 31.2, rootError: 3.5, label: "250 mg/L" },
  { dose: 500, ivg: 1.38, ivgError: 0.07, root: 34.6, rootError: 3.8, label: "500 mg/L" },
  { dose: 1000, ivg: 1.42, ivgError: 0.08, root: 36.51, rootError: 4.1, label: "1000 mg/L" },
];

export const bmLogistic = {
  ec50: 3611.86,
  model: "Log-Logístico 4 parâmetros (LL.4)",
  description: "Aumento monotônico sem toxicidade até 1000 mg/L"
};

export const bmFBA = {
  points: [
    { dose: 0, growth: 0.32 },
    { dose: 50, growth: 0.38 },
    { dose: 100, growth: 0.45 },
    { dose: 200, growth: 0.55 },
    { dose: 400, growth: 0.65 },
    { dose: 600, growth: 0.70 },
    { dose: 800, growth: 0.72 },
    { dose: 1000, growth: 0.73 },
  ],
  plateau: "400-800 mg/L",
  equation: "Michaelis-Menten / Saturação Assintótica"
};

export const bmYield = { eebBM: 6.20 };

export const bmBoxplot = {
  control: 17.24,
  max1000: 36.51,
  cuSO4: 1.50,
  spearmanRho: 0.834
};
