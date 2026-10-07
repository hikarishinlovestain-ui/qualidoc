export const fungiData = [
  {
    fungus: "A. niger",
    fullName: "Aspergillus niger",
    ec50: 142.42,
    mic: 70.35,
    loec: 35.18,
    halo: 29.25,
    gem: "MODEL1604280050.2"
  },
  {
    fungus: "A. fumigatus",
    fullName: "Aspergillus fumigatus",
    ec50: 177.47,
    mic: 85.43,
    loec: 40.20,
    halo: 28.60,
    gem: "Pan-A. fumigatus"
  },
  {
    fungus: "F. fujikuroi",
    fullName: "Fusarium fujikuroi",
    ec50: 198.55,
    mic: 100.50,
    loec: 50.25,
    halo: 28.68,
    gem: "iCY1235"
  },
  {
    fungus: "P. chrysogenum",
    fullName: "Penicillium chrysogenum",
    ec50: 247.32,
    mic: 115.58,
    loec: 60.30,
    halo: 27.53,
    gem: "iMA871"
  },
  {
    fungus: "T. reesei",
    fullName: "Trichoderma reesei",
    ec50: 271.30,
    mic: 130.65,
    loec: 65.33,
    halo: 27.14,
    gem: "iAL1006"
  },
  {
    fungus: "R. solani",
    fullName: "Rhizoctonia solani (proxy)",
    ec50: 319.02,
    mic: 145.73,
    loec: 70.35,
    halo: 25.80,
    gem: "Proxy — sem GEM disponível"
  }
];

export const paradoxExplanations = [
  {
    title: "Baixa difusividade",
    detail: "Compostos lipofílicos (xantohumol, diterpenos) não difundem adequadamente no meio ágar sólido"
  },
  {
    title: "Redundância funcional",
    detail: "A microbiota do solo possui mecanismos redundantes de defesa que compensam a ação isolada"
  },
  {
    title: "Proxy matemático",
    detail: "O halo in silico é um proxy de sensibilidade metabólica, não de difusão física real"
  }
];
