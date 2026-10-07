export interface Compound {
  name: string;
  extract: string;
  tr: string;
  mz: string;
  formula: string;
  function: string;
  isContaminant: boolean;
  contaminantNote?: string;
  smiles?: string;
  fragments?: string[];
}

export const compounds: Compound[] = [
  {
    name: "Xantohumol",
    extract: "EEB-HT",
    tr: "30,1 min",
    mz: "355,1548",
    formula: "C₂₁H₂₂O₅",
    function: "Elicitor hormético",
    isContaminant: false,
    fragments: ["-H₂O (337,14)", "-CO (309,14)", "-C₅H₈ (267,12)"],
    smiles: "CC(=CCC/O=C(c1cc(O)c(OC)c(c1)C(C)=C)/C=C1\\C=C(O)C(c2ccc(O)cc2)=NN1)C"
  },
  {
    name: "Hordenina",
    extract: "EEB-HT",
    tr: "1,0 min",
    mz: "166,1227",
    formula: "C₁₀H₁₅NO",
    function: "Aleloquímico / sinalização",
    isContaminant: false,
    fragments: ["-CH₃ (151,10)", "-H₂O (148,09)"]
  },
  {
    name: "Ácido linoleico",
    extract: "EEB-BM",
    tr: "32,9 min",
    mz: "281,2472",
    formula: "C₁₈H₃₂O₂",
    function: "Precursor de jasmonatos",
    isContaminant: false,
    fragments: ["-H₂O (263,24)", "-CO₂ (237,24)", "-C₃H₆ (195,17)"]
  },
  {
    name: "Diterpeno (labdano)",
    extract: "Ambos",
    tr: "28,8 / 33,1 min",
    mz: "317,209",
    formula: "C₂₀H₂₈O₃",
    function: "Defesa vegetal",
    isContaminant: false,
    fragments: ["-H₂O (299,20)", "-CO (271,20)"]
  },
  {
    name: "Erucamida",
    extract: "Ambos",
    tr: "6,7 / 46,7 min",
    mz: "338,3425",
    formula: "C₂₂H₄₃NO",
    function: "⚠️ Possível contaminante",
    isContaminant: true,
    contaminantNote: "Amida de ácido graxo frequentemente associada a contaminantes de plástico (tampas de tubos Eppendorf). Requer confirmação com branco de extração."
  },
  {
    name: "Anidrido ftálico",
    extract: "Ambos",
    tr: "33,8 / 34 min",
    mz: "149,0233",
    formula: "C₈H₄O₃",
    function: "⚠️ Contaminante de vidraria",
    isContaminant: true,
    contaminantNote: "Derivado de ftalatos presentes em septos de injeção e plásticos. Composto artefatual, não endógeno das amostras."
  }
];
