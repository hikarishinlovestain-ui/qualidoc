# Painel de Qualificação de Doutorado

## Modelagem metabólica in silico e validação agronômica do uso de trub quente e bagaço de malte como bioinsumos em Lactuca sativa L.

**Doutorando:** Hikari Shin Lovestain C. R. Lima  
**Orientadores:** Prof. Dr. Gustavo Henrique Bianco de Souza | Drª Regislainy Gomes da Silva  
**Data:** Outubro 2026

---

## 🎯 Visão Geral

Painel web interativo e animado para apresentação de qualificação de doutorado, contando a história científica em **10 blocos narrativos** com transições suaves e dados reais do projeto.

### Características Principais

- ✅ **11 imagens reais** integradas do repositório GitHub
- ✅ **10 blocos narrativos** interativos
- ✅ **Modo apresentação** (tecla F) com navegação por setas
- ✅ **Modo escuro/claro** (tecla D)
- ✅ **Gráficos interativos** com Recharts
- ✅ **Animações scroll-triggered** com Framer Motion
- ✅ **Zoom em imagens** ao clicar
- ✅ **Sliders interativos** para ajustar parâmetros de modelos
- ✅ **Dados exatos** do relatório (EC₅₀, MIC, LOEC, halos)

---

## 📦 Stack Tecnológica

- **React 18** + **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS 4** (estilização)
- **Framer Motion** (animações)
- **Recharts** (gráficos interativos)
- **Lucide React** (ícones)

---

## 🚀 Instalação e Execução

### Desenvolvimento

```bash
npm install
npm run dev
```

Acesse: `http://localhost:5173`

### Build para Produção

```bash
npm run build
```

Os arquivos otimizados serão gerados em `dist/`

### Preview do Build

```bash
npm run preview
```

---

## 📚 Estrutura dos Blocos Narrativos

### 1. **Capa Animada**
- Título com efeito de digitação
- Molécula de xantohumol rotacionando em SVG
- Partículas de grãos de cevada caindo
- Informações do doutorando e orientadores

### 2. **O Problema**
- 🖼️ **Imagem real:** Processo de fabricação de cerveja (Figura 1)
- Cards animados com dados: 85% BSG, 2º Trub Quente, 75-80% umidade, ODS 12
- Animação de economia circular: Cervejaria → Resíduo → Bioinsumo

### 3. **Hipóteses Centrais**
- 5 hipóteses clicáveis com detalhes expansíveis
- H1 e H2 destacadas como principais
- Ícones e badges visuais

### 4. **Fluxo Metodológico**
- Pipeline animado com 8 etapas conectadas
- Rendimentos: EEB-HT = 6,13% | EEB-BM = 6,20%
- Stack tecnológica: Python 3.14, COBRApy, ImageJ 1.54, R (drc)

### 5. **Pipeline AraGEM** (4 sub-blocos)
- **Passo 1:** Curadoria genômica (9 proteínas RBH, 2 compostos modelados)
- **Passo 2:** Configuração FBA (equações matemáticas, solver HiGHS)
- **Passo 4:** Equações dose-resposta com **sliders interativos**
  - EEB-HT: Hormese (Gaussiana + Decaimento Quadrático)
  - EEB-BM: Michaelis-Menten (Saturação)
- **Passo 5:** Simulação (603 cenários, 201 doses/condição)

### 6. **Fitoquímica**
- 🖼️ **Imagens reais:** Cromatogramas CLAE (Figuras 2a e 2b)
- Tabela interativa com 6 compostos anotados
- 🖼️ **Estruturas 2D reais** ao clicar em cada composto:
  - Xantohumol, Hordenina, Ácido Linoleico, Diterpenoide
  - Erucamida ⚠️ e Anidrido Ftálico ⚠️ (contaminantes)
- Propostas de fragmentação MS/EM

### 7. **Curvas FBA vs In Vitro** (6 abas)
- **Aba 1:** FBA Preditivo (EEB-HT hormese + EEB-BM saturação)
- **Aba 2:** IVG EEB-HT (EC₅₀ = 45,2 mg/L, pico 12,5 mg/L)
- **Aba 3:** Raiz EEB-HT (EC₅₀ = 62,8 mg/L)
- **Aba 4:** IVG EEB-BM (EC₅₀ > 3600 mg/L, monotônico)
- **Aba 5:** Raiz EEB-BM (Spearman ρ = 0,834)
- **Aba 6:** Descoberta Fenotípica
  - 🖼️ **Imagem real:** Pelos radiculares precoces (Figura 17)
  - 🖼️ **Imagem real:** CuSO₄ esverdeamento (Figura 22)

### 8. **Modelagem GEM Fúngica** (5 sub-blocos)
- **Bloco A:** Dados de entrada (perfil fitoquímico + 6 GEMs)
- **Bloco B:** Metodologia (FBA, curvas sigmoide + Michaelis-Menten)
  - Contador animado: **6.000 simulações FBA**
- **Bloco C:** Análise estatística (fluxo decisório Shapiro-Wilk → Levene → ANOVA/Kruskal-Wallis)
- **Bloco D:** Resultados (tabela hierárquica + heatmap de halos)
  - Dados exatos da Tabela 6: EC₅₀, MIC, LOEC, halos 1000 mg/L
  - EEB-BM = halo nulo (ação nutricional)
- **Bloco E:** Limitações e perspectivas translacionais

### 9. **Cronograma**
- Timeline vertical com 16 etapas
- Status: ✅ Concluído (9) | 🎓 Atual (1) | ⏳ Futuro (6)
- QUALIFICAÇÃO em Setembro/2026 com destaque pulsante

### 10. **Conclusões Preliminares**
- 4 conclusões com ícones
- Dualidade fitoquímica confirmada
- Hormese do Trub Quente validada
- Saturação do Bagaço validada
- Antifúngico requer nova metodologia

---

## 🖼️ Imagens Integradas

Todas as 11 imagens reais do repositório GitHub estão configuradas em `src/assets/images.ts`:

### Contexto
1. Processo de fabricação de cerveja (Figura 1)

### Cromatogramas
2. CLAE EEB-HT (Figura 2a)
3. CLAE EEB-BM (Figura 2b)

### Estruturas Químicas 2D
4. Xantohumol (Figura 4)
5. Hordenina (Figura 5)
6. Ácido Linoleico (Figura 6)
7. Erucamida ⚠️ (Figura 7)
8. Anidrido Ftálico ⚠️ (Figura 3)
9. Diterpenoide (Figura 8)

### Fenótipos Experimentais
10. Pelos radiculares precoces (Figura 17)
11. CuSO₄ esverdeamento (Figura 22)

### Componente AcademicImage

Todas as imagens usam o componente `AcademicImage.tsx` com:
- ✅ Lazy loading (`loading="lazy"`)
- ✅ Fallback com ícone de erro
- ✅ Zoom ao clicar (lightbox)
- ✅ Legendas descritivas
- ✅ Sombras e bordas profissionais
- ✅ Responsividade (`max-w-full`, `h-auto`, `object-contain`)

---

## 🎨 Requisitos de UI/UX Implementados

### Animações
- ✅ Scroll-triggered (Intersection Observer)
- ✅ Gráficos com traçado progressivo
- ✅ Números com count-up animation
- ✅ Transições fade + slide entre blocos
- ✅ Hover em compostos mostra estrutura 2D
- ✅ Staggered animations em tabelas

### Interatividade
- ✅ Navegação lateral (dots) indicando bloco atual
- ✅ Modo apresentação (tecla F): fullscreen, setas ← →
- ✅ Modo escuro/claro (tecla D)
- ✅ Tooltips em dados numéricos
- ✅ Sliders para ajustar parâmetros de modelos
- ✅ Zoom em imagens ao clicar

### Acessibilidade
- ✅ Contraste WCAG AA
- ✅ Alternativa textual para equações
- ✅ Descrições em todas as imagens (alt)
- ✅ Navegação por teclado

---

## 📊 Dados Exatos do Relatório

Todos os valores numéricos estão fielmente representados:

### EEB-HT (Trub Quente)
- EC₅₀ IVG = 45,2 mg/L
- EC₅₀ radicular = 62,8 mg/L
- Pico hormético = 12,5 mg/L
- Rendimento = 6,13%

### EEB-BM (Bagaço de Malte)
- EC₅₀ extrapolado = 3611,86 mg/L
- Spearman ρ = 0,834
- Controle: 17,24 mm → 1000 mg/L: 36,51 mm
- Rendimento = 6,20%

### Antifúngico (Tabela 6)
- A. niger: EC₅₀ 142,42 | Halo 29,25 mm
- A. fumigatus: EC₅₀ 177,47 | Halo 28,60 mm
- F. fujikuroi: EC₅₀ 198,55 | Halo 28,68 mm
- P. chrysogenum: EC₅₀ 247,32 | Halo 27,53 mm
- T. reesei: EC₅₀ 271,30 | Halo 27,14 mm
- R. solani (proxy): EC₅₀ 319,02 | Halo 25,80 mm

### Simulações
- 603 cenários FBA (3 condições × 201 doses)
- 6.000 simulações fúngicas (5 fungos × 2 extratos × 200 doses × 5 réplicas)

---

## 🎯 Atalhos de Teclado

| Tecla | Ação |
|-------|------|
| `F` | Alternar modo apresentação |
| `D` | Alternar tema escuro/claro |
| `←` `→` | Navegar entre blocos (modo apresentação) |
| `Esc` | Sair do zoom de imagem |

---

## 📁 Estrutura de Arquivos

```
src/
├── assets/
│   └── images.ts              # URLs das 11 imagens reais
├── components/
│   ├── AcademicImage.tsx      # Componente reutilizável de imagem
│   ├── Block1Cover.tsx        # Capa animada
│   ├── Block2Problem.tsx      # O Problema
│   ├── Block3Hypotheses.tsx   # Hipóteses
│   ├── Block4Methodology.tsx  # Metodologia
│   ├── BlockAraGEM.tsx        # Pipeline AraGEM (4 passos)
│   ├── Block5Phytochemistry.tsx # Fitoquímica
│   ├── Block6Curves.tsx       # Curvas FBA vs In Vitro
│   ├── BlockFungalGEM.tsx     # Modelagem GEM Fúngica (5 blocos)
│   ├── Block8Timeline.tsx     # Cronograma
│   └── Block9Conclusions.tsx  # Conclusões
├── data/
│   ├── aragemData.ts          # Dados do pipeline AraGEM
│   ├── bmData.ts              # Dados do Bagaço de Malte
│   ├── compoundsData.ts       # Compostos fitoquímicos
│   ├── fungiData.ts           # Dados antifúngicos
│   ├── fungalGEMData.ts       # GEMs fúngicos
│   ├── fungalResults.ts       # Resultados GEM fúngico
│   └── htData.ts              # Dados do Trub Quente
├── App.tsx                    # Componente principal
├── main.tsx                   # Entry point
└── index.css                  # Estilos globais + Tailwind
```

---

## 🔧 Configuração

### Paleta de Cores
- Verde-folha: `#2D5016`
- Dourado-cerveja: `#D4A017`
- Âmbar: `#C68E17`
- Creme: `#F5E6C8`
- Terracota: `#8B4513`

### Fontes
- **Inter** (texto geral)
- **JetBrains Mono** (código e dados numéricos)

---

## 📝 Notas Técnicas

### Performance
- Lazy loading em todas as imagens
- Build otimizado (~765 KB JS, ~40 KB CSS)
- Animações com Framer Motion (GPU-accelerated)

### Fidelidade aos Dados
- Todos os valores numéricos são exatos do relatório
- Equações matemáticas renderizadas em formato legível
- Tooltips explicam origem dos dados

### Limitações Conhecidas
- Imagens carregam do GitHub (depende de conexão)
- Fallback implementado para imagens indisponíveis
- Zoom funciona apenas em desktop (mobile: tap para abrir)

---

## 🎓 Agradecimentos

- NECERVA/UFOP (amostras)
- Fiocruz (CLAE-DAD-EM/EM)
- Programa de Pós-Graduação
- Orientadores e banca examinadora

---

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos como parte da qualificação de doutorado.

---

**Desenvolvido com React + TypeScript + Tailwind CSS + Framer Motion**
