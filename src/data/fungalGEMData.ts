// Bloco A: Dados de Entrada e Restrições Químicas

export const phytoProfile = {
  titulo: "Perfil Fitoquímico dos Extratos",
  extratos: [
    {
      nome: "EEB-HT (Trub Quente)",
      cor: "#D4A017",
      compostos: [
        {
          composto: "Xantohumol",
          mz: 355.1548,
          formula: "C₂₁H₂₂O₅",
          tr: 30.1,
          funcao: "Chalcona prenilada com atividade antifúngica documentada",
          mecanismo: "Danos à membrana plasmática, perturbação do ciclo TCA/geração de ATP",
          referencia: "Yan et al., 2021",
          status: "presumível"
        },
        {
          composto: "Hordenina",
          mz: 166.1227,
          formula: "C₁₀H₁₅NO",
          tr: 1.0,
          funcao: "Alcaloide fenólico — indutor de defesa vegetal",
          mecanismo: "Não é fungicida direto; compõe termo agregado de estresse fitoquímico",
          referencia: "Ishiai et al., 2016",
          status: "presumível, baixa abundância"
        }
      ]
    },
    {
      nome: "EEB-BM (Bagaço de Malte)",
      cor: "#2D5016",
      compostos: [
        {
          composto: "Ácido Linoleico",
          mz: 281.2472,
          formula: "C₁₈H₃₂O₂",
          tr: 32.9,
          funcao: "Ácido graxo poli-insaturado",
          mecanismo: "Substrato lipídico e precursor de membrana (NÃO modelado como tóxico)",
          referencia: "Lordan et al., 2019",
          status: "presumível"
        }
      ]
    }
  ],
  contaminantes: [
    {
      composto: "Erucamida",
      mz: 338.3425,
      formula: "C₂₂H₄₃NO",
      alerta: "Possível plastificante de materiais poliméricos",
      referencia: "Jug et al., 2020; Canez & Li, 2024",
      acao: "Exige análise de branco processual"
    },
    {
      composto: "Anidrido Ftálico",
      mz: 149.0233,
      formula: "C₈H₄O₃",
      alerta: "Contaminante de vidraria laboratorial",
      referencia: "Jug et al., 2020; Canez & Li, 2024",
      acao: "Exige análise de branco processual"
    }
  ]
};

export interface GEMModel {
  representante: string;
  modelo: string;
  reacao_objetivo: string;
  tipo_integracao: string;
  base_biomassa: number;
  sensibilidade: string;
  nota?: string;
  isProxy?: boolean;
}

export const gemsModels: GEMModel[] = [
  {
    representante: "Aspergillus niger ATCC 1015",
    modelo: "iMA871",
    reacao_objetivo: "added_biomass_sink",
    tipo_integracao: "FBA direto",
    base_biomassa: 15.9575,
    sensibilidade: "Muito Alta"
  },
  {
    representante: "Aspergillus fumigatus pan-model",
    modelo: "Pan-Aspergillus fumigatus",
    reacao_objetivo: "R3625",
    tipo_integracao: "FBA direto",
    base_biomassa: 72.1632,
    sensibilidade: "Alta"
  },
  {
    representante: "Fusarium fujikuroi CBS 195.34",
    modelo: "iCY1235",
    reacao_objetivo: "Biomass",
    tipo_integracao: "FBA direto",
    base_biomassa: 4.3626,
    sensibilidade: "Alta"
  },
  {
    representante: "Penicillium chrysogenum W54-1255",
    modelo: "iAL1006",
    reacao_objetivo: "bmOUT",
    tipo_integracao: "FBA direto com normalização",
    base_biomassa: 60.8138,
    sensibilidade: "Intermediária"
  },
  {
    representante: "Trichoderma reesei QM6a",
    modelo: "MODEL1604280050.2/CoReCo",
    reacao_objetivo: "treebiomasspseudoreaction",
    tipo_integracao: "FBA direto",
    base_biomassa: 279.1455,
    sensibilidade: "Intermediária"
  },
  {
    representante: "Rhizoctonia solani 123E",
    modelo: "Nenhum GEM específico",
    reacao_objetivo: "Não aplicável",
    tipo_integracao: "Proxy de ortologia",
    base_biomassa: 1.0,
    sensibilidade: "Baixa",
    nota: "LIMITAÇÃO: proxy matemático, não FBA direto",
    isProxy: true
  }
];
