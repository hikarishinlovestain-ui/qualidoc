export const IMAGES = {
  // Contexto
  processoCerveja: "https://raw.githubusercontent.com/jungbluttdiedich-cyber/images/main/Processo%20de%20fabrica%C3%A7%C3%A3o%20de%20cerveja.jpg",
  
  // Cromatogramas
  claeEEBHT: "https://raw.githubusercontent.com/jungbluttdiedich-cyber/images/main/CLAE%20EEBTQ.jpg",
  claeEEBBM: "https://raw.githubusercontent.com/jungbluttdiedich-cyber/images/main/CLAE%20EEBBM.jpg",
  
  // Estruturas Químicas 2D (Fragmentação)
  xantohumol: "https://raw.githubusercontent.com/jungbluttdiedich-cyber/images/main/xanthohumol.png",
  hordenina: "https://raw.githubusercontent.com/jungbluttdiedich-cyber/images/main/hordenine.png",
  acidoLinoleico: "https://raw.githubusercontent.com/jungbluttdiedich-cyber/images/main/linoleic_acid.png",
  erucamida: "https://raw.githubusercontent.com/jungbluttdiedich-cyber/images/main/erucamide.png",
  anidridoFtalico: "https://raw.githubusercontent.com/jungbluttdiedich-cyber/images/main/phthalic_anhydride.png",
  diterpenoide: "https://raw.githubusercontent.com/jungbluttdiedich-cyber/images/main/lambertianic_acid.png",
  
  // Fenótipos Experimentais
  pelosRadiculares: "https://raw.githubusercontent.com/jungbluttdiedich-cyber/images/main/Compara%C3%A7%C3%A3o%20de%20radiculas.jpg",
  controleCuSO4: "https://raw.githubusercontent.com/jungbluttdiedich-cyber/images/main/CuSO4%20esverdeado.jpg",
} as const;

export type ImageKey = keyof typeof IMAGES;
