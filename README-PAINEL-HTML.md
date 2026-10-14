# Painel de Qualificação — Versão HTML Standalone

## 📄 Arquivo: `painel-qualificacao.html`

Este é um arquivo HTML **completo e autônomo** que contém todo o painel interativo de qualificação de doutorado, pronto para ser aberto diretamente em qualquer navegador moderno.

---

## 🚀 Como Usar

### Opção 1: Abrir Localmente
1. Faça download do arquivo `painel-qualificacao.html`
2. Dê duplo clique no arquivo
3. O painel abrirá no seu navegador padrão

### Opção 2: Hospedar Online
1. Faça upload do arquivo para qualquer serviço de hospedagem estática:
   - GitHub Pages
   - Netlify
   - Vercel
   - Qualquer servidor web
2. Acesse a URL fornecida

### Opção 3: Compartilhar
- Envie o arquivo por email, WhatsApp, etc.
- O destinatário só precisa abrir no navegador
- **Não requer instalação de Node.js, npm ou qualquer dependência**

---

## ✨ Características

### ✅ Totalmente Autônomo
- **Um único arquivo** (~250 KB)
- **Sem dependências locais** (usa CDNs para bibliotecas)
- **Funciona offline** após o primeiro carregamento (CDNs em cache)

### ✅ Todas as Funcionalidades do Painel Original
- 9 blocos narrativos completos
- 11 imagens reais do repositório GitHub
- Modo escuro/claro (tecla D)
- Modo apresentação (tecla F)
- Animações e transições suaves
- Zoom em imagens ao clicar
- Navegação lateral com dots
- Dados exatos do relatório

### ✅ Imagens Integradas
Todas as 11 imagens do repositório GitHub estão configuradas:
1. Processo de fabricação de cerveja
2. Cromatogramas CLAE (EEB-HT e EEB-BM)
3. Estruturas químicas 2D (6 compostos)
4. Fenótipos experimentais (pelos radiculares, CuSO₄)

### ✅ Dados Completos
- Compostos fitoquímicos com m/z, fórmulas, tempos de retenção
- Resultados antifúngicos (EC₅₀, MIC, LOEC, halos)
- Hipóteses centrais
- Cronograma completo (13 etapas)
- Resíduos cervejeiros (BSG e HT)

---

## 🎯 Atalhos de Teclado

| Tecla | Ação |
|-------|------|
| `F` | Alternar modo apresentação |
| `D` | Alternar tema escuro/claro |
| `Esc` | Sair do zoom de imagem |

---

## 📊 Conteúdo dos Blocos

### 1. Capa Animada
- Título com efeito de digitação
- Molécula de xantohumol rotacionando
- Partículas de grãos de cevada
- Informações do doutorando e orientadores

### 2. O Problema
- 🖼️ Imagem: Processo de fabricação de cerveja
- Cards de resíduos cervejeiros (BSG e HT) com detalhes completos
- Estatísticas: 85% BSG, 2º Trub Quente, 75-80% umidade, ODS 12
- Animação de economia circular

### 3. Hipóteses Centrais
- 5 hipóteses interativas
- H1 (Hormese) e H2 (Saturação) destacadas
- Detalhes expansíveis ao clicar

### 4. Fluxo Metodológico
- Pipeline com 8 etapas
- Rendimentos: EEB-HT = 6,13% | EEB-BM = 6,20%

### 5. Fitoquímica
- 🖼️ Imagens: Cromatogramas CLAE (Figuras 2a e 2b)
- Tabela com 6 compostos anotados
- Dados exatos: m/z, fórmulas, tempos de retenção

### 6. Curvas FBA vs In Vitro
- 🖼️ Imagens: Pelos radiculares (Figura 17) e CuSO₄ (Figura 22)
- EC₅₀ IVG = 45,2 mg/L (EEB-HT)
- EC₅₀ > 3600 mg/L (EEB-BM)

### 7. Modelagem GEM Fúngica
- 6.000 simulações FBA
- Tabela hierárquica de sensibilidade
- Heatmap de halos preditos
- Paradoxo in silico vs in vitro

### 8. Cronograma
- Timeline vertical com 13 etapas
- Status: ✅ Concluído (9) | 🎓 Atual (1) | ⏳ Futuro (3)
- QUALIFICAÇÃO em Setembro/2026 com destaque pulsante

### 9. Conclusões Preliminares
- 4 conclusões principais
- Dualidade fitoquímica confirmada
- Hormese e saturação validadas
- Perspectivas para antifúngico

---

## 🔧 Requisitos Técnicos

### Navegador
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Qualquer navegador moderno com suporte a ES6+

### Conexão Internet
- **Necessária apenas no primeiro carregamento** para baixar:
  - React 18 (~100 KB)
  - ReactDOM (~100 KB)
  - Babel (~1 MB)
  - Tailwind CSS (~300 KB)
  - Framer Motion (~200 KB)
  - Recharts (~400 KB)
  - Fontes Google Fonts
- **Após o primeiro carregamento**, o navegador faz cache e funciona offline

### Imagens
- Carregadas do GitHub (raw.githubusercontent.com)
- Requer conexão internet para exibir
- Fallback visual implementado para imagens indisponíveis

---

## 📦 Estrutura do Arquivo

```
painel-qualificacao.html (único arquivo)
├── <head>
│   ├── Meta tags
│   ├── Google Fonts (Inter + JetBrains Mono)
│   ├── Tailwind CSS (CDN)
│   ├── React 18 (CDN)
│   ├── ReactDOM (CDN)
│   ├── Babel Standalone (CDN)
│   ├── Framer Motion (CDN)
│   ├── Recharts (CDN)
│   └── CSS customizado (animações, temas)
│
└── <body>
    └── <script type="text/babel">
        ├── Constantes (IMAGES, dados)
        ├── Componente AcademicImage
        ├── Componente CountUp
        └── Componente App (principal)
            ├── Bloco 1: Capa
            ├── Bloco 2: Problema + Resíduos
            ├── Bloco 3: Hipóteses
            ├── Bloco 4: Metodologia
            ├── Bloco 5: Fitoquímica
            ├── Bloco 6: Curvas
            ├── Bloco 7: GEM Fúngico
            ├── Bloco 8: Cronograma
            └── Bloco 9: Conclusões
```

---

## 🎨 Paleta de Cores

- **Verde-folha:** `#2D5016`
- **Dourado-cerveja:** `#D4A017`
- **Âmbar:** `#C68E17`
- **Creme:** `#F5E6C8`
- **Terracota:** `#8B4513`

---

## 🔍 Diferenças vs Versão React/Vite

### Vantagens do HTML Standalone
✅ **Portabilidade total** — um único arquivo  
✅ **Zero instalação** — abre direto no navegador  
✅ **Facilidade de compartilhamento** — email, pendrive, etc.  
✅ **Independência** — não requer Node.js/npm  

### Limitações
⚠️ **Performance** — Babel compila JSX no navegador (mais lento que build)  
⚠️ **Tamanho** — ~250 KB vs ~770 KB da versão build (mas tudo em um arquivo)  
⚠️ **CDN dependency** — primeiro carregamento requer internet  
⚠️ **Sem hot reload** — para desenvolvimento, use a versão React/Vite  

### Quando Usar Cada Versão

**Use o HTML Standalone quando:**
- Apresentar para a banca examinadora
- Compartilhar com colegas
- Hospedar em servidor simples
- Precisar de portabilidade máxima
- Não tiver ambiente de desenvolvimento

**Use a versão React/Vite quando:**
- Desenvolver/modificar o painel
- Precisar de hot reload
- Quiser performance máxima
- Estiver integrando com outros sistemas

---

## 📝 Dados Exatos do Relatório

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
- 6.000 simulações FBA fúngicas
- 603 cenários AraGEM (3 condições × 201 doses)

---

## 🐛 Solução de Problemas

### Imagens não carregam
- Verifique conexão com internet
- O GitHub pode estar bloqueado em algumas redes
- As imagens têm fallback visual (ícone + texto)

### Painel lento
- Normal no primeiro carregamento (baixando CDNs)
- Após cache, carrega rapidamente
- Use a versão React/Vite para melhor performance

### Animações não funcionam
- Verifique se o navegador suporta ES6+
- Atualize para a versão mais recente
- Desabilite extensões que bloqueiam scripts

### Modo escuro não funciona
- Pressione a tecla `D`
- Ou clique no botão ☀️/🌙 no canto superior direito

---

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos como parte da qualificação de doutorado.

---

## 🎓 Agradecimentos

- NECERVA/UFOP (amostras)
- Fiocruz (CLAE-DAD-EM/EM)
- Programa de Pós-Graduação
- Orientadores: Prof. Dr. Gustavo Henrique Bianco de Souza e Drª Regislainy Gomes da Silva
- Banca examinadora

---

## 📞 Contato

**Doutorando:** Hikari Shin Lovestain C. R. Lima  
**Instituição:** Universidade Federal de Ouro Preto (UFOP)  
**Programa:** Pós-Graduação em Ciências Biológicas

---

**Desenvolvido com React + Tailwind CSS + Framer Motion + Recharts**  
**Versão: HTML Standalone (arquivo único)**  
**Data: Outubro 2026**
