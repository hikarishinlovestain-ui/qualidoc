export interface Residuo {
  id: string;
  nome: string;
  subnome: string;
  icone: string;
  cor_tema: 'verde' | 'ambar';
  origem: string;
  volume: string;
  desafio: string;
  composicao: string[];
  papel_no_estudo: string;
}

export interface ResiduosCervejeirosData {
  titulo: string;
  subtitulo: string;
  residuos: Residuo[];
}

export const residuosCervejeirosData: ResiduosCervejeirosData = {
  titulo: "Os Coprodutos da Indústria Cervejeira",
  subtitulo: "Do passivo ambiental ao bioinsumo de precisão: entendendo as matrizes",
  residuos: [
    {
      id: "bsg",
      nome: "Bagaço de Malte (BSG)",
      subnome: "Brewer's Spent Grain",
      icone: "🌾",
      cor_tema: "verde",
      origem: "Cascas da cevada malteada que permanecem após a extração dos açúcares fermentáveis durante a filtração do mosto.",
      volume: "~85% do resíduo sólido total gerado na cervejaria.",
      desafio: "Alto teor de umidade (75-80%), dificultando armazenamento e favorecendo o descarte em aterros.",
      composicao: [
        "Proteínas: 20-30%",
        "Fibras insolúveis: 45-70%",
        "Lipídios: 2-10%",
        "Compostos fenólicos: 1,5-3 mg/g"
      ],
      papel_no_estudo: "Atua como condicionador edáfico e vetor nutricional. Sua matriz lipídica (ex: ácido linoleico) fornece precursores de membrana, gerando uma curva de saturação assintótica sem evidência de toxicidade aguda nas doses testadas."
    },
    {
      id: "ht",
      nome: "Trub Quente (HT)",
      subnome: "Hot Trub",
      icone: "🍺",
      cor_tema: "ambar",
      origem: "Coagulação e precipitação de proteínas, polifenóis, resíduos de lúpulo e partículas de malte durante a fervura do mosto.",
      volume: "2º maior resíduo sólido do processo.",
      desafio: "Separação por turbilhonamento (whirlpool) ou centrifugação; alta variabilidade sazonal.",
      composicao: [
        "Proteínas: 20-30%",
        "Lipídios: 10-12%",
        "Compostos fenólicos: 1-3 mg/g",
        "Marcadores: Xantohumol e Hordenina"
      ],
      papel_no_estudo: "Atua como elicitor bioquímico e sinalizador celular. Induz uma resposta bifásica (hormese): bioestimulação e precocidade de pelos radiculares em baixas doses, e fitotoxicidade severa em concentrações elevadas."
    }
  ]
};
