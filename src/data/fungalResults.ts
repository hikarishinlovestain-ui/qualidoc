// Bloco D: Resultados Principais

export interface FungalResult {
  representante: string;
  ec50_predito: number;
  mic_teorica: number;
  loec: number;
  halo_1000mgL: number;
  sensibilidade: string;
  ranking: number;
  nota?: string;
  isProxy?: boolean;
}

export const fungiResults: FungalResult[] = [
  {
    representante: "A. niger ATCC 1015",
    ec50_predito: 142.42,
    mic_teorica: 70.35,
    loec: 35.18,
    halo_1000mgL: 29.25,
    sensibilidade: "Muito Alta",
    ranking: 1
  },
  {
    representante: "A. fumigatus pan-model",
    ec50_predito: 177.47,
    mic_teorica: 85.43,
    loec: 40.20,
    halo_1000mgL: 28.60,
    sensibilidade: "Alta",
    ranking: 2
  },
  {
    representante: "F. fujikuroi CBS 195.34",
    ec50_predito: 198.55,
    mic_teorica: 100.50,
    loec: 50.25,
    halo_1000mgL: 28.68,
    sensibilidade: "Alta",
    ranking: 3
  },
  {
    representante: "P. chrysogenum W54-1255",
    ec50_predito: 247.32,
    mic_teorica: 115.58,
    loec: 60.30,
    halo_1000mgL: 27.53,
    sensibilidade: "Intermediária",
    ranking: 4
  },
  {
    representante: "T. reesei QM6a",
    ec50_predito: 271.30,
    mic_teorica: 130.65,
    loec: 65.33,
    halo_1000mgL: 27.14,
    sensibilidade: "Intermediária",
    ranking: 5
  },
  {
    representante: "R. solani 123E",
    ec50_predito: 319.02,
    mic_teorica: 145.73,
    loec: 70.35,
    halo_1000mgL: 25.80,
    sensibilidade: "Baixa",
    ranking: 6,
    nota: "Proxy de ortologia — LIMITAÇÃO",
    isProxy: true
  }
];

export const heatmapData = [
  { fungo: "A. niger", halo_50: 15.2, halo_200: 26.8, halo_1000: 29.25 },
  { fungo: "A. fumigatus", halo_50: 12.5, halo_200: 25.3, halo_1000: 28.60 },
  { fungo: "F. fujikuroi", halo_50: 10.8, halo_200: 24.1, halo_1000: 28.68 },
  { fungo: "P. chrysogenum", halo_50: 8.5, halo_200: 22.7, halo_1000: 27.53 },
  { fungo: "T. reesei", halo_50: 7.2, halo_200: 21.9, halo_1000: 27.14 },
  { fungo: "R. solani (proxy)", halo_50: 5.1, halo_200: 20.5, halo_1000: 25.80 }
];

export const computationalDesign = {
  faixa_doses: "0 a 1000 mg/L",
  resolucao: "200 pontos uniformemente espaçados",
  replicas: "5 réplicas computacionais simuladas por ponto",
  erro: "Normal heterocedástico proporcional ao halo médio",
  total_cenarios: "~6.000 simulações FBA",
  calculo: "5 fungos × 2 extratos × 200 doses × 5 réplicas"
};

export const limitations = [
  {
    id: 1,
    titulo: "Ranking de Sensibilidade",
    descricao: "A hierarquia descrita decorre dos parâmetros de sensibilidade assumidos e da disponibilidade de GEMs, não de uma comparação empírica direta entre genomas.",
    icone: "⚖️"
  },
  {
    id: 2,
    titulo: "Proxy de R. solani",
    descricao: "A ausência de um GEM específico exigiu o uso de um proxy matemático de ortologia, limitando a extrapolação molecular direta.",
    icone: "⚠️"
  },
  {
    id: 3,
    titulo: "Conversão Biomassa → Halo",
    descricao: "É uma simplificação computacional. Em ensaios de difusão em poço, a formação do halo depende de difusão radial, solubilidade e adsorção ao ágar. Moléculas hidrofóbicas como o xantohumol podem apresentar taxas de difusão limitadas.",
    icone: "📏"
  },
  {
    id: 4,
    titulo: "Réplicas Computacionais",
    descricao: "As 5 réplicas por condição são simuladas por modelagem, não medições experimentais. Os valores não correspondem a medições reais de placas.",
    icone: "🔢"
  }
];

export const translationalPerspectives = [
  {
    id: 1,
    acao: "Retroceder no escalonamento biológico",
    descricao: "Desenhar novos experimentos com microrganismos puros em monocultivo"
  },
  {
    id: 2,
    acao: "Utilizar técnica de microdiluição seriada em meio líquido",
    descricao: "Contornar limitações de difusividade de compostos lipofílicos no ágar"
  },
  {
    id: 3,
    acao: "Validar em fitopatógenos-alvo bem definidos",
    descricao: "Substituir comunidade de solo e C. albicans por patógenos específicos"
  }
];
