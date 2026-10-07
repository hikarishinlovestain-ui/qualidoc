export interface ProteinModule {
  modulo: string;
  proteina_Lsat: string;
  identidade: string;
  cobertura: string;
  evidencia_rbh: boolean;
  classificacao: 'direta' | 'homologia' | 'hipotese';
}

export interface CompoundModel {
  composto: string;
  vias_adicionadas: string[];
  nota: string;
  cor: string;
}

export const curadoriaData = {
  passo: 1,
  titulo: "Curadoria Genômica via Reciprocal Best Hit",
  modelo_base: "AraGEM v1.2 (Arabidopsis thaliana)",
  organismo_alvo: "Lactuca sativa",
  metodo: "Reciprocal Best Hit (RBH)",
  modulos_adicionados: [
    {
      modulo: "Transporte de Hordenina - NPF/PTR",
      proteina_Lsat: "XP_023738876.1 / LOC111886866",
      identidade: "63,88%",
      cobertura: "100%",
      evidencia_rbh: true,
      classificacao: "hipotese" as const
    },
    {
      modulo: "Transporte de Hordenina - ABC",
      proteina_Lsat: "XP_023759505.2 / LOC111907930",
      identidade: "72,12%",
      cobertura: "98%",
      evidencia_rbh: true,
      classificacao: "hipotese" as const
    },
    {
      modulo: "Oxidação de Amina Análoga",
      proteina_Lsat: "XP_023764177.1 / PAO1-111912665",
      identidade: "76,02%",
      cobertura: "91%",
      evidencia_rbh: true,
      classificacao: "hipotese" as const
    },
    {
      modulo: "Transporte de Linoleato - FAX1",
      proteina_Lsat: "XP_023741495.1 / LOC111889577",
      identidade: "51,08%",
      cobertura: "99%",
      evidencia_rbh: true,
      classificacao: "homologia" as const
    },
    {
      modulo: "Ativação de Linoleato - LACS7",
      proteina_Lsat: "XP_023742666.1 / LOC111890814",
      identidade: "73,88%",
      cobertura: "98%",
      evidencia_rbh: true,
      classificacao: "homologia" as const
    },
    {
      modulo: "Ciclo do Glioxilato - ICL",
      proteina_Lsat: "XP_023755222.1 / ICL-111903705",
      identidade: "81,94%",
      cobertura: "100%",
      evidencia_rbh: true,
      classificacao: "direta" as const
    },
    {
      modulo: "Ciclo do Glioxilato - MLS",
      proteina_Lsat: "XP_023732731.1 / MLS-111880531",
      identidade: "83,58%",
      cobertura: "98%",
      evidencia_rbh: true,
      classificacao: "direta" as const
    },
    {
      modulo: "Complexo I - NDUFV1",
      proteina_Lsat: "XP_023735211.1 / CI51-111883078",
      identidade: "91,90%",
      cobertura: "96%",
      evidencia_rbh: true,
      classificacao: "homologia" as const
    },
    {
      modulo: "Complexo I - NDUFS7",
      proteina_Lsat: "XP_023734575.1 / LOC111882440",
      identidade: "98,08%",
      cobertura: "72%",
      evidencia_rbh: true,
      classificacao: "homologia" as const
    }
  ] as ProteinModule[],
  compostos_modelados: [
    {
      composto: "Hordenina",
      vias_adicionadas: ["Transporte NPF/PTR", "Transporte ABC", "Desaminação oxidativa análoga"],
      nota: "Hipótese mecanística — homologia não demonstra especificidade de substrato",
      cor: "#D4A017"
    },
    {
      composto: "Ácido Linoleico",
      vias_adicionadas: ["Transporte FAX1/FAX6", "Ativação LACS7", "β-oxidação peroxissomal", "Ciclo do glioxilato (ICL/MLS)", "Biossíntese de jasmonatos"],
      nota: "Hipótese de capacidade metabólica",
      cor: "#2D5016"
    },
    {
      composto: "Xantohumol",
      vias_adicionadas: ["Via dos fenilpropanoides", "Modulação do Complexo I (NDUFV1, NDUFS1, NDUFS7)"],
      nota: "Tratado como modulador de capacidade, não substrato direto",
      cor: "#8B4513"
    }
  ] as CompoundModel[]
};

export const fbaConfig = {
  passo: 2,
  titulo: "Análise de Balanço de Fluxos (FBA)",
  ambiente: "Python 3.14 + COBRApy",
  solver: "HiGHS (scipy.optimize.linprog)",
  funcao_objetivo: "Maximizar produção de biomassa (HYB_BIOMASS)",
  restricoes: {
    balanco_massa: "S · v = 0 (estado estacionário)",
    limites_fluxo: "v_min ≤ v ≤ v_max (termodinâmica + capacidade)"
  },
  meio_cultura: {
    componentes: ["H₂O", "O₂", "ATP", "NH₄⁺", "PO₄³⁻", "CO₂"],
    tipo: "Meio mínimo com disponibilidade controlável"
  },
  reacao_dreno: "HYB_BIOMASS (análogo computacional do crescimento fenotípico)"
};

export interface DoseResponseModel {
  nome: string;
  modelo: string;
  equacao: string;
  equacaoLatex: string;
  parametros: Record<string, { valor: number; min: number; max: number; step: number; label: string; descricao: string }>;
  comportamento: string;
  cor: string;
  funcao: (c: number, params: Record<string, number>) => number;
}

export const doseResponseModels: DoseResponseModel[] = [
  {
    nome: "EEB-HT (Trub Quente)",
    modelo: "Hormese (Gaussiana + Decaimento Quadrático)",
    equacao: "f(C) = α·exp(-(C-Copt)²/2σ²) - β·(C-Copt)²",
    equacaoLatex: "f(C) = α · exp( -(C - C_opt)² / 2σ² ) - β · (C - C_opt)²",
    parametros: {
      C_opt: { valor: 45, min: 10, max: 100, step: 1, label: "C_opt", descricao: "Pico do efeito bioestimulante (mg/L)" },
      alpha: { valor: 0.15, min: 0.05, max: 0.5, step: 0.01, label: "α", descricao: "Magnitude máxima do estímulo" },
      beta: { valor: 0.0008, min: 0.0001, max: 0.005, step: 0.0001, label: "β", descricao: "Inclinação da taxa de declínio (toxicidade)" },
      sigma: { valor: 20, min: 5, max: 60, step: 1, label: "σ", descricao: "Largura da janela hormética" }
    },
    comportamento: "Pico em 45 mg/L, inibição severa >200 mg/L",
    cor: "#D4A017",
    funcao: (C: number, p: Record<string, number>) => {
      const gaussian = p.alpha * Math.exp(-Math.pow(C - p.C_opt, 2) / (2 * Math.pow(p.sigma, 2)));
      const decay = C > p.C_opt ? p.beta * Math.pow(C - p.C_opt, 2) : 0;
      return 1.0 + gaussian - decay;
    }
  },
  {
    nome: "EEB-BM (Bagaço de Malte)",
    modelo: "Michaelis-Menten (Saturação)",
    equacao: "f(C) = (Vmax·C)/(Km + C)",
    equacaoLatex: "f(C) = (V_max · C) / (K_m + C)",
    parametros: {
      V_max: { valor: 1.1, min: 0.5, max: 2.0, step: 0.05, label: "V_max", descricao: "Capacidade absoluta de transporte celular" },
      K_m: { valor: 300, min: 50, max: 800, step: 10, label: "K_m", descricao: "Constante de afinidade intrínseca (mg/L)" }
    },
    comportamento: "Platô entre 400-800 mg/L, sem toxicidade até 1000 mg/L",
    cor: "#2D5016",
    funcao: (C: number, p: Record<string, number>) => {
      if (C === 0) return 1.0;
      const mm = (p.V_max * C) / (p.K_m + C);
      return 1.0 + (mm - 1.0) * (C / (C + p.K_m));
    }
  },
  {
    nome: "Xantohumol",
    modelo: "Inibição Sigmoide (Hill)",
    equacao: "f(C) = IC50^n / (IC50^n + C^n)",
    equacaoLatex: "f(C) = IC₅₀ⁿ / (IC₅₀ⁿ + Cⁿ)",
    parametros: {
      IC50: { valor: 150, min: 50, max: 400, step: 5, label: "IC₅₀", descricao: "Concentração de inibição 50% (mg/L)" },
      n: { valor: 2, min: 1, max: 5, step: 0.5, label: "n", descricao: "Coeficiente de Hill (cooperatividade)" }
    },
    comportamento: "Inibição gradual do Complexo I mitocondrial",
    cor: "#8B4513",
    funcao: (C: number, p: Record<string, number>) => {
      const ic50n = Math.pow(p.IC50, p.n);
      const cn = Math.pow(C, p.n);
      return ic50n / (ic50n + cn);
    }
  }
];

export const simulationResults = {
  passo: 5,
  titulo: "Resultados Preditivos da Simulação FBA",
  total_cenarios: 804,
  doses_simuladas: 201,
  faixa_concentracao: "0-1000 mg/L",
  resultados: {
    "EEB-HT": {
      pico_biomassa: 1.0148,
      dose_otima: 45,
      unidade: "mg/L",
      comportamento: "Hormese — bioestimulação em baixas doses, toxicidade >200 mg/L",
      dados: [
        { dose: 0, biomassa: 1.0 },
        { dose: 12.5, biomassa: 1.008 },
        { dose: 25, biomassa: 1.012 },
        { dose: 45, biomassa: 1.0148 },
        { dose: 80, biomassa: 1.009 },
        { dose: 100, biomassa: 1.005 },
        { dose: 150, biomassa: 0.98 },
        { dose: 200, biomassa: 0.95 },
        { dose: 300, biomassa: 0.85 },
        { dose: 500, biomassa: 0.75 },
        { dose: 750, biomassa: 0.58 },
        { dose: 1000, biomassa: 0.45 }
      ]
    },
    "EEB-BM": {
      biomassa_maxima: 1.0625,
      dose_maxima_testada: 1000,
      unidade: "mg/L",
      comportamento: "Monotônico — aumento contínuo até saturação, sem toxicidade",
      dados: [
        { dose: 0, biomassa: 1.0 },
        { dose: 50, biomassa: 1.012 },
        { dose: 100, biomassa: 1.025 },
        { dose: 200, biomassa: 1.038 },
        { dose: 250, biomassa: 1.04 },
        { dose: 400, biomassa: 1.05 },
        { dose: 500, biomassa: 1.055 },
        { dose: 600, biomassa: 1.058 },
        { dose: 750, biomassa: 1.06 },
        { dose: 800, biomassa: 1.061 },
        { dose: 1000, biomassa: 1.0625 }
      ]
    },
    "Xantohumol": {
      comportamento: "Inibição gradual do fluxo de biomassa",
      IC50_aproximado: 150,
      dados: [
        { dose: 0, biomassa: 1.0 },
        { dose: 25, biomassa: 0.985 },
        { dose: 50, biomassa: 0.95 },
        { dose: 75, biomassa: 0.9 },
        { dose: 100, biomassa: 0.85 },
        { dose: 150, biomassa: 0.5 },
        { dose: 200, biomassa: 0.35 },
        { dose: 300, biomassa: 0.15 },
        { dose: 400, biomassa: 0.08 },
        { dose: 500, biomassa: 0.05 }
      ]
    }
  }
};
