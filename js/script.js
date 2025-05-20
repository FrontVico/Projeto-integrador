document.addEventListener('DOMContentLoaded', () => {
  // Elementos do DOM
  const elementSearch = document.getElementById('elementSearch');
  const elementFilter = document.getElementById('elementFilter');
  const periodicTable = document.getElementById('periodicTable');
  const elementInfo = document.getElementById('elementInfo');
  const helpButton = document.getElementById('helpButton');
  const helpModal = document.getElementById('helpModal');
  const closeHelpModal = document.getElementById('closeHelpModal');
  const searchSuggestions = document.getElementById('searchSuggestions');

  const elementsData = [
    // Período 1 (Elementos 1-2)
    { number: 1, symbol: 'H', name: 'Hidrogênio', mass: 1.008, group: '1', period: 1, state: 'Gasoso', config: '1s¹', category: 'nonmetal', 
      description: 'Elemento mais leve e abundante no universo.', density: '0.08988 g/L', meltingPoint: '-259.16°C', boilingPoint: '-252.87°C', electronegativity: 2.20 },
    { number: 2, symbol: 'He', name: 'Hélio', mass: 4.0026, group: '18', period: 1, state: 'Gasoso', config: '1s²', category: 'noble', 
      description: 'Gás nobre usado em resfriamento criogênico.', density: '0.1786 g/L', meltingPoint: '-272.20°C', boilingPoint: '-268.93°C', electronegativity: null },
  
    // Período 2 (Elementos 3-10)
    { number: 3, symbol: 'Li', name: 'Lítio', mass: 6.94, group: '1', period: 2, state: 'Sólido', config: '[He] 2s¹', category: 'alkali', 
      description: 'Metal alcalino usado em baterias.', density: '0.534 g/cm³', meltingPoint: '180.54°C', boilingPoint: '1342°C', electronegativity: 0.98 },
    { number: 4, symbol: 'Be', name: 'Berílio', mass: 9.0122, group: '2', period: 2, state: 'Sólido', config: '[He] 2s²', category: 'alkaline', 
      description: 'Metal leve usado em ligas aeroespaciais.', density: '1.85 g/cm³', meltingPoint: '1287°C', boilingPoint: '2469°C', electronegativity: 1.57 },
    { number: 5, symbol: 'B', name: 'Boro', mass: 10.81, group: '13', period: 2, state: 'Sólido', config: '[He] 2s² 2p¹', category: 'metalloid', 
      description: 'Semimetal essencial para plantas.', density: '2.34 g/cm³', meltingPoint: '2076°C', boilingPoint: '3927°C', electronegativity: 2.04 },
    { number: 6, symbol: 'C', name: 'Carbono', mass: 12.011, group: '14', period: 2, state: 'Sólido', config: '[He] 2s² 2p²', category: 'nonmetal', 
      description: 'Base da vida na Terra.', density: '2.267 g/cm³', meltingPoint: '3550°C', boilingPoint: '3825°C', electronegativity: 2.55 },
    { number: 7, symbol: 'N', name: 'Nitrogênio', mass: 14.007, group: '15', period: 2, state: 'Gasoso', config: '[He] 2s² 2p³', category: 'nonmetal', 
      description: '78% da atmosfera terrestre.', density: '1.2506 g/L', meltingPoint: '-210.00°C', boilingPoint: '-195.79°C', electronegativity: 3.04 },
    { number: 8, symbol: 'O', name: 'Oxigênio', mass: 15.999, group: '16', period: 2, state: 'Gasoso', config: '[He] 2s² 2p⁴', category: 'nonmetal', 
      description: 'Essencial para respiração.', density: '1.429 g/L', meltingPoint: '-218.79°C', boilingPoint: '-182.95°C', electronegativity: 3.44 },
    { number: 9, symbol: 'F', name: 'Flúor', mass: 18.998, group: '17', period: 2, state: 'Gasoso', config: '[He] 2s² 2p⁵', category: 'halogen', 
      description: 'Halogênio mais reativo.', density: '1.696 g/L', meltingPoint: '-219.67°C', boilingPoint: '-188.11°C', electronegativity: 3.98 },
    { number: 10, symbol: 'Ne', name: 'Neônio', mass: 20.180, group: '18', period: 2, state: 'Gasoso', config: '[He] 2s² 2p⁶', category: 'noble', 
      description: 'Usado em letreiros luminosos.', density: '0.9002 g/L', meltingPoint: '-248.59°C', boilingPoint: '-246.05°C', electronegativity: null },
  
    // Período 3 (Elementos 11-18)
    { number: 11, symbol: 'Na', name: 'Sódio', mass: 22.990, group: '1', period: 3, state: 'Sólido', config: '[Ne] 3s¹', category: 'alkali', 
      description: 'Componente do sal de cozinha.', density: '0.968 g/cm³', meltingPoint: '97.72°C', boilingPoint: '883°C', electronegativity: 0.93 },
    { number: 12, symbol: 'Mg', name: 'Magnésio', mass: 24.305, group: '2', period: 3, state: 'Sólido', config: '[Ne] 3s²', category: 'alkaline', 
      description: 'Essencial para a clorofila.', density: '1.738 g/cm³', meltingPoint: '650°C', boilingPoint: '1090°C', electronegativity: 1.31 },
    { number: 13, symbol: 'Al', name: 'Alumínio', mass: 26.982, group: '13', period: 3, state: 'Sólido', config: '[Ne] 3s² 3p¹', category: 'metal', 
      description: 'Metal leve e resistente.', density: '2.70 g/cm³', meltingPoint: '660.32°C', boilingPoint: '2519°C', electronegativity: 1.61 },
    { number: 14, symbol: 'Si', name: 'Silício', mass: 28.085, group: '14', period: 3, state: 'Sólido', config: '[Ne] 3s² 3p²', category: 'metalloid', 
      description: 'Base da eletrônica moderna.', density: '2.329 g/cm³', meltingPoint: '1414°C', boilingPoint: '3265°C', electronegativity: 1.90 },
    { number: 15, symbol: 'P', name: 'Fósforo', mass: 30.974, group: '15', period: 3, state: 'Sólido', config: '[Ne] 3s² 3p³', category: 'nonmetal', 
      description: 'Essencial para DNA e RNA.', density: '1.82 g/cm³', meltingPoint: '44.15°C', boilingPoint: '280.5°C', electronegativity: 2.19 },
    { number: 16, symbol: 'S', name: 'Enxofre', mass: 32.06, group: '16', period: 3, state: 'Sólido', config: '[Ne] 3s² 3p⁴', category: 'nonmetal', 
      description: 'Usado em ácido sulfúrico.', density: '2.07 g/cm³', meltingPoint: '115.21°C', boilingPoint: '444.61°C', electronegativity: 2.58 },
    { number: 17, symbol: 'Cl', name: 'Cloro', mass: 35.45, group: '17', period: 3, state: 'Gasoso', config: '[Ne] 3s² 3p⁵', category: 'halogen', 
      description: 'Usado para purificar água.', density: '3.214 g/L', meltingPoint: '-101.5°C', boilingPoint: '-34.04°C', electronegativity: 3.16 },
    { number: 18, symbol: 'Ar', name: 'Argônio', mass: 39.948, group: '18', period: 3, state: 'Gasoso', config: '[Ne] 3s² 3p⁶', category: 'noble', 
      description: 'Gás nobre inerte.', density: '1.784 g/L', meltingPoint: '-189.34°C', boilingPoint: '-185.85°C', electronegativity: null },
  
    // Período 4 (Elementos 19-36)
    { number: 19, symbol: 'K', name: 'Potássio', mass: 39.098, group: '1', period: 4, state: 'Sólido', config: '[Ar] 4s¹', category: 'alkali', 
      description: 'Essencial para funções celulares.', density: '0.862 g/cm³', meltingPoint: '63.38°C', boilingPoint: '759°C', electronegativity: 0.82 },
    { number: 20, symbol: 'Ca', name: 'Cálcio', mass: 40.078, group: '2', period: 4, state: 'Sólido', config: '[Ar] 4s²', category: 'alkaline', 
      description: 'Fundamental para ossos e dentes.', density: '1.54 g/cm³', meltingPoint: '842°C', boilingPoint: '1484°C', electronegativity: 1.00 },
    { number: 21, symbol: 'Sc', name: 'Escândio', mass: 44.956, group: '3', period: 4, state: 'Sólido', config: '[Ar] 3d¹ 4s²', category: 'transition', 
      description: 'Usado em ligas leves.', density: '2.985 g/cm³', meltingPoint: '1541°C', boilingPoint: '2836°C', electronegativity: 1.36 },
    { number: 22, symbol: 'Ti', name: 'Titânio', mass: 47.867, group: '4', period: 4, state: 'Sólido', config: '[Ar] 3d² 4s²', category: 'transition', 
      description: 'Metal resistente e leve.', density: '4.506 g/cm³', meltingPoint: '1668°C', boilingPoint: '3287°C', electronegativity: 1.54 },
    { number: 23, symbol: 'V', name: 'Vanádio', mass: 50.942, group: '5', period: 4, state: 'Sólido', config: '[Ar] 3d³ 4s²', category: 'transition', 
      description: 'Usado em aços especiais.', density: '6.11 g/cm³', meltingPoint: '1910°C', boilingPoint: '3407°C', electronegativity: 1.63 },
    { number: 24, symbol: 'Cr', name: 'Cromo', mass: 51.996, group: '6', period: 4, state: 'Sólido', config: '[Ar] 3d⁵ 4s¹', category: 'transition', 
      description: 'Usado em revestimentos.', density: '7.19 g/cm³', meltingPoint: '1907°C', boilingPoint: '2671°C', electronegativity: 1.66 },
    { number: 25, symbol: 'Mn', name: 'Manganês', mass: 54.938, group: '7', period: 4, state: 'Sólido', config: '[Ar] 3d⁵ 4s²', category: 'transition', 
      description: 'Essencial para produção de aço.', density: '7.21 g/cm³', meltingPoint: '1246°C', boilingPoint: '2061°C', electronegativity: 1.55 },
    { number: 26, symbol: 'Fe', name: 'Ferro', mass: 55.845, group: '8', period: 4, state: 'Sólido', config: '[Ar] 3d⁶ 4s²', category: 'transition', 
      description: 'Componente da hemoglobina.', density: '7.874 g/cm³', meltingPoint: '1538°C', boilingPoint: '2862°C', electronegativity: 1.83 },
    { number: 27, symbol: 'Co', name: 'Cobalto', mass: 58.933, group: '9', period: 4, state: 'Sólido', config: '[Ar] 3d⁷ 4s²', category: 'transition', 
      description: 'Usado em baterias recarregáveis.', density: '8.90 g/cm³', meltingPoint: '1495°C', boilingPoint: '2927°C', electronegativity: 1.88 },
    { number: 28, symbol: 'Ni', name: 'Níquel', mass: 58.693, group: '10', period: 4, state: 'Sólido', config: '[Ar] 3d⁸ 4s²', category: 'transition', 
      description: 'Usado em ligas resistentes.', density: '8.908 g/cm³', meltingPoint: '1455°C', boilingPoint: '2913°C', electronegativity: 1.91 },
    { number: 29, symbol: 'Cu', name: 'Cobre', mass: 63.546, group: '11', period: 4, state: 'Sólido', config: '[Ar] 3d¹⁰ 4s¹', category: 'transition', 
      description: 'Excelente condutor elétrico.', density: '8.96 g/cm³', meltingPoint: '1084.62°C', boilingPoint: '2562°C', electronegativity: 1.90 },
    { number: 30, symbol: 'Zn', name: 'Zinco', mass: 65.38, group: '12', period: 4, state: 'Sólido', config: '[Ar] 3d¹⁰ 4s²', category: 'transition', 
      description: 'Usado em galvanização.', density: '7.134 g/cm³', meltingPoint: '419.53°C', boilingPoint: '907°C', electronegativity: 1.65 },
    { number: 31, symbol: 'Ga', name: 'Gálio', mass: 69.723, group: '13', period: 4, state: 'Sólido', config: '[Ar] 3d¹⁰ 4s² 4p¹', category: 'metal', 
      description: 'Derrete na mão (29.76°C).', density: '5.907 g/cm³', meltingPoint: '29.76°C', boilingPoint: '2400°C', electronegativity: 1.81 },
    { number: 32, symbol: 'Ge', name: 'Germânio', mass: 72.630, group: '14', period: 4, state: 'Sólido', config: '[Ar] 3d¹⁰ 4s² 4p²', category: 'metalloid', 
      description: 'Usado em semicondutores.', density: '5.323 g/cm³', meltingPoint: '938.25°C', boilingPoint: '2833°C', electronegativity: 2.01 },
    { number: 33, symbol: 'As', name: 'Arsênio', mass: 74.922, group: '15', period: 4, state: 'Sólido', config: '[Ar] 3d¹⁰ 4s² 4p³', category: 'metalloid', 
      description: 'Tóxico em certas formas.', density: '5.727 g/cm³', meltingPoint: '817°C', boilingPoint: '614°C', electronegativity: 2.18 },
    { number: 34, symbol: 'Se', name: 'Selênio', mass: 78.971, group: '16', period: 4, state: 'Sólido', config: '[Ar] 3d¹⁰ 4s² 4p⁴', category: 'nonmetal', 
      description: 'Essencial em pequenas quantidades.', density: '4.809 g/cm³', meltingPoint: '221°C', boilingPoint: '685°C', electronegativity: 2.55 },
    { number: 35, symbol: 'Br', name: 'Bromo', mass: 79.904, group: '17', period: 4, state: 'Líquido', config: '[Ar] 3d¹⁰ 4s² 4p⁵', category: 'halogen', 
      description: 'Único halogênio líquido.', density: '3.122 g/cm³', meltingPoint: '-7.2°C', boilingPoint: '58.8°C', electronegativity: 2.96 },
    { number: 36, symbol: 'Kr', name: 'Criptônio', mass: 83.798, group: '18', period: 4, state: 'Gasoso', config: '[Ar] 3d¹⁰ 4s² 4p⁶', category: 'noble', 
      description: 'Usado em lâmpadas especiais.', density: '3.749 g/L', meltingPoint: '-157.36°C', boilingPoint: '-153.22°C', electronegativity: 3.00 },
  
    // Período 5 (Elementos 37-54)
    { number: 37, symbol: 'Rb', name: 'Rubídio', mass: 85.468, group: '1', period: 5, state: 'Sólido', config: '[Kr] 5s¹', category: 'alkali', 
      description: 'Extremamente reativo.', density: '1.532 g/cm³', meltingPoint: '39.31°C', boilingPoint: '688°C', electronegativity: 0.82 },
    { number: 38, symbol: 'Sr', name: 'Estrôncio', mass: 87.62, group: '2', period: 5, state: 'Sólido', config: '[Kr] 5s²', category: 'alkaline', 
      description: 'Usado em fogos de artifício.', density: '2.64 g/cm³', meltingPoint: '777°C', boilingPoint: '1382°C', electronegativity: 0.95 },
    { number: 39, symbol: 'Y', name: 'Ítrio', mass: 88.906, group: '3', period: 5, state: 'Sólido', config: '[Kr] 4d¹ 5s²', category: 'transition', 
      description: 'Usado em supercondutores.', density: '4.472 g/cm³', meltingPoint: '1526°C', boilingPoint: '3345°C', electronegativity: 1.22 },
    { number: 40, symbol: 'Zr', name: 'Zircônio', mass: 91.224, group: '4', period: 5, state: 'Sólido', config: '[Kr] 4d² 5s²', category: 'transition', 
      description: 'Resistente à corrosão.', density: '6.506 g/cm³', meltingPoint: '1855°C', boilingPoint: '4409°C', electronegativity: 1.33 },
    { number: 41, symbol: 'Nb', name: 'Nióbio', mass: 92.906, group: '5', period: 5, state: 'Sólido', config: '[Kr] 4d⁴ 5s¹', category: 'transition', 
      description: 'Usado em ligas supercondutoras.', density: '8.57 g/cm³', meltingPoint: '2477°C', boilingPoint: '4744°C', electronegativity: 1.6 },
    { number: 42, symbol: 'Mo', name: 'Molibdênio', mass: 95.95, group: '6', period: 5, state: 'Sólido', config: '[Kr] 4d⁵ 5s¹', category: 'transition', 
      description: 'Essencial para enzimas.', density: '10.22 g/cm³', meltingPoint: '2623°C', boilingPoint: '4639°C', electronegativity: 2.16 },
    { number: 43, symbol: 'Tc', name: 'Tecnécio', mass: 98, group: '7', period: 5, state: 'Sólido', config: '[Kr] 4d⁵ 5s²', category: 'transition', 
      description: 'Primeiro elemento artificial.', density: '11 g/cm³', meltingPoint: '2157°C', boilingPoint: '4265°C', electronegativity: 1.9 },
    { number: 44, symbol: 'Ru', name: 'Rutênio', mass: 101.07, group: '8', period: 5, state: 'Sólido', config: '[Kr] 4d⁷ 5s¹', category: 'transition', 
      description: 'Usado em catalisadores.', density: '12.45 g/cm³', meltingPoint: '2334°C', boilingPoint: '4150°C', electronegativity: 2.2 },
    { number: 45, symbol: 'Rh', name: 'Ródio', mass: 102.91, group: '9', period: 5, state: 'Sólido', config: '[Kr] 4d⁸ 5s¹', category: 'transition', 
      description: 'Metal precioso raro.', density: '12.41 g/cm³', meltingPoint: '1964°C', boilingPoint: '3695°C', electronegativity: 2.28 },
    { number: 46, symbol: 'Pd', name: 'Paládio', mass: 106.42, group: '10', period: 5, state: 'Sólido', config: '[Kr] 4d¹⁰', category: 'transition', 
      description: 'Usado em catalisadores automotivos.', density: '12.02 g/cm³', meltingPoint: '1554.9°C', boilingPoint: '2963°C', electronegativity: 2.20 },
    { number: 47, symbol: 'Ag', name: 'Prata', mass: 107.87, group: '11', period: 5, state: 'Sólido', config: '[Kr] 4d¹⁰ 5s¹', category: 'transition', 
      description: 'Melhor condutor elétrico.', density: '10.49 g/cm³', meltingPoint: '961.78°C', boilingPoint: '2162°C', electronegativity: 1.93 },
    { number: 48, symbol: 'Cd', name: 'Cádmio', mass: 112.41, group: '12', period: 5, state: 'Sólido', config: '[Kr] 4d¹⁰ 5s²', category: 'transition', 
      description: 'Usado em baterias recarregáveis.', density: '8.65 g/cm³', meltingPoint: '321.07°C', boilingPoint: '767°C', electronegativity: 1.69 },
    { number: 49, symbol: 'In', name: 'Índio', mass: 114.82, group: '13', period: 5, state: 'Sólido', config: '[Kr] 4d¹⁰ 5s² 5p¹', category: 'metal', 
      description: 'Usado em telas touchscreen.', density: '7.31 g/cm³', meltingPoint: '156.60°C', boilingPoint: '2072°C', electronegativity: 1.78 },
    { number: 50, symbol: 'Sn', name: 'Estanho', mass: 118.71, group: '14', period: 5, state: 'Sólido', config: '[Kr] 4d¹⁰ 5s² 5p²', category: 'metal', 
      description: 'Componente do bronze.', density: '7.287 g/cm³', meltingPoint: '231.93°C', boilingPoint: '2602°C', electronegativity: 1.96 },
    { number: 51, symbol: 'Sb', name: 'Antimônio', mass: 121.76, group: '15', period: 5, state: 'Sólido', config: '[Kr] 4d¹⁰ 5s² 5p³', category: 'metalloid', 
      description: 'Usado em retardantes de chama.', density: '6.685 g/cm³', meltingPoint: '630.63°C', boilingPoint: '1587°C', electronegativity: 2.05 },
    { number: 52, symbol: 'Te', name: 'Telúrio', mass: 127.60, group: '16', period: 5, state: 'Sólido', config: '[Kr] 4d¹⁰ 5s² 5p⁴', category: 'metalloid', 
      description: 'Usado em painéis solares.', density: '6.232 g/cm³', meltingPoint: '449.51°C', boilingPoint: '988°C', electronegativity: 2.1 },
    { number: 53, symbol: 'I', name: 'Iodo', mass: 126.90, group: '17', period: 5, state: 'Sólido', config: '[Kr] 4d¹⁰ 5s² 5p⁵', category: 'halogen', 
      description: 'Essencial para a tireoide.', density: '4.93 g/cm³', meltingPoint: '113.7°C', boilingPoint: '184.3°C', electronegativity: 2.66 },
    { number: 54, symbol: 'Xe', name: 'Xenônio', mass: 131.29, group: '18', period: 5, state: 'Gasoso', config: '[Kr] 4d¹⁰ 5s² 5p⁶', category: 'noble', 
      description: 'Usado em lâmpadas e anestésicos.', density: '5.894 g/L', meltingPoint: '-111.75°C', boilingPoint: '-108.12°C', electronegativity: 2.6 },
  
    // Período 6 (Elementos 55-86 incluindo Lantanídeos)
    { number: 55, symbol: 'Cs', name: 'Césio', mass: 132.91, group: '1', period: 6, state: 'Sólido', config: '[Xe] 6s¹', category: 'alkali', 
      description: 'Metal mais eletropositivo.', density: '1.93 g/cm³', meltingPoint: '28.44°C', boilingPoint: '671°C', electronegativity: 0.79 },
    { number: 56, symbol: 'Ba', name: 'Bário', mass: 137.33, group: '2', period: 6, state: 'Sólido', config: '[Xe] 6s²', category: 'alkaline', 
      description: 'Usado em contrastes radiológicos.', density: '3.51 g/cm³', meltingPoint: '727°C', boilingPoint: '1845°C', electronegativity: 0.89 },
    // Lantanídeos (57-71)
    { number: 57, symbol: 'La', name: 'Lantânio', mass: 138.91, group: '3', period: 6, state: 'Sólido', config: '[Xe] 5d¹ 6s²', category: 'lanthanide', 
      description: 'Primeiro elemento da série dos lantanídeos.', density: '6.15 g/cm³', meltingPoint: '920°C', boilingPoint: '3464°C', electronegativity: 1.10 },
    { number: 58, symbol: 'Ce', name: 'Cério', mass: 140.12, group: '3', period: 6, state: 'Sólido', config: '[Xe] 4f¹ 5d¹ 6s²', category: 'lanthanide', 
      description: 'Usado em pedras de isqueiro.', density: '6.77 g/cm³', meltingPoint: '795°C', boilingPoint: '3443°C', electronegativity: 1.12 },
    { number: 59, symbol: 'Pr', name: 'Praseodímio', mass: 140.91, group: '3', period: 6, state: 'Sólido', config: '[Xe] 4f³ 6s²', category: 'lanthanide', 
      description: 'Usado em ligas magnéticas.', density: '6.77 g/cm³', meltingPoint: '935°C', boilingPoint: '3127°C', electronegativity: 1.13 },
    { number: 60, symbol: 'Nd', name: 'Neodímio', mass: 144.24, group: '3', period: 6, state: 'Sólido', config: '[Xe] 4f⁴ 6s²', category: 'lanthanide', 
      description: 'Usado em ímãs fortes.', density: '7.01 g/cm³', meltingPoint: '1024°C', boilingPoint: '3074°C', electronegativity: 1.14 },
    { number: 61, symbol: 'Pm', name: 'Promécio', mass: 145, group: '3', period: 6, state: 'Sólido', config: '[Xe] 4f⁵ 6s²', category: 'lanthanide', 
      description: 'Elemento radioativo artificial.', density: '7.26 g/cm³', meltingPoint: '1042°C', boilingPoint: '3000°C', electronegativity: 1.13 },
    { number: 62, symbol: 'Sm', name: 'Samário', mass: 150.36, group: '3', period: 6, state: 'Sólido', config: '[Xe] 4f⁶ 6s²', category: 'lanthanide', 
      description: 'Usado em ímãs e lasers.', density: '7.52 g/cm³', meltingPoint: '1072°C', boilingPoint: '1794°C', electronegativity: 1.17 },
    { number: 63, symbol: 'Eu', name: 'Európio', mass: 151.96, group: '3', period: 6, state: 'Sólido', config: '[Xe] 4f⁷ 6s²', category: 'lanthanide', 
      description: 'Usado em telas de TV.', density: '5.24 g/cm³', meltingPoint: '822°C', boilingPoint: '1597°C', electronegativity: 1.2 },
    { number: 64, symbol: 'Gd', name: 'Gadolínio', mass: 157.25, group: '3', period: 6, state: 'Sólido', config: '[Xe] 4f⁷ 5d¹ 6s²', category: 'lanthanide', 
      description: 'Usado em ressonância magnética.', density: '7.90 g/cm³', meltingPoint: '1312°C', boilingPoint: '3273°C', electronegativity: 1.2 },
    { number: 65, symbol: 'Tb', name: 'Térbio', mass: 158.93, group: '3', period: 6, state: 'Sólido', config: '[Xe] 4f⁹ 6s²', category: 'lanthanide', 
      description: 'Usado em dispositivos sonoros.', density: '8.23 g/cm³', meltingPoint: '1356°C', boilingPoint: '3230°C', electronegativity: 1.2 },
    { number: 66, symbol: 'Dy', name: 'Disprósio', mass: 162.50, group: '3', period: 6, state: 'Sólido', config: '[Xe] 4f¹⁰ 6s²', category: 'lanthanide', 
      description: 'Usado em ímãs de alta performance.', density: '8.55 g/cm³', meltingPoint: '1407°C', boilingPoint: '2567°C', electronegativity: 1.22 },
    { number: 67, symbol: 'Ho', name: 'Hólmio', mass: 164.93, group: '3', period: 6, state: 'Sólido', config: '[Xe] 4f¹¹ 6s²', category: 'lanthanide', 
      description: 'Usado em lasers médicos.', density: '8.80 g/cm³', meltingPoint: '1461°C', boilingPoint: '2720°C', electronegativity: 1.23 },
    { number: 68, symbol: 'Er', name: 'Érbio', mass: 167.26, group: '3', period: 6, state: 'Sólido', config: '[Xe] 4f¹² 6s²', category: 'lanthanide', 
      description: 'Usado em fibras ópticas.', density: '9.07 g/cm³', meltingPoint: '1529°C', boilingPoint: '2868°C', electronegativity: 1.24 },
    { number: 69, symbol: 'Tm', name: 'Túlio', mass: 168.93, group: '3', period: 6, state: 'Sólido', config: '[Xe] 4f¹³ 6s²', category: 'lanthanide', 
      description: 'Elemento mais raro da série.', density: '9.32 g/cm³', meltingPoint: '1545°C', boilingPoint: '1950°C', electronegativity: 1.25 },
    { number: 70, symbol: 'Yb', name: 'Itérbio', mass: 173.05, group: '3', period: 6, state: 'Sólido', config: '[Xe] 4f¹⁴ 6s²', category: 'lanthanide', 
      description: 'Usado em relógios atômicos.', density: '6.90 g/cm³', meltingPoint: '824°C', boilingPoint: '1196°C', electronegativity: 1.1 },
    { number: 71, symbol: 'Lu', name: 'Lutécio', mass: 174.97, group: '3', period: 6, state: 'Sólido', config: '[Xe] 4f¹⁴ 5d¹ 6s²', category: 'lanthanide', 
      description: 'Último elemento da série.', density: '9.84 g/cm³', meltingPoint: '1652°C', boilingPoint: '3402°C', electronegativity: 1.27 },
    // Continuação do período 6 (72-86)
    { number: 72, symbol: 'Hf', name: 'Háfnio', mass: 178.49, group: '4', period: 6, state: 'Sólido', config: '[Xe] 4f¹⁴ 5d² 6s²', category: 'transition', 
      description: 'Usado em barras de controle nuclear.', density: '13.31 g/cm³', meltingPoint: '2233°C', boilingPoint: '4603°C', electronegativity: 1.3 },
    { number: 73, symbol: 'Ta', name: 'Tântalo', mass: 180.95, group: '5', period: 6, state: 'Sólido', config: '[Xe] 4f¹⁴ 5d³ 6s²', category: 'transition', 
      description: 'Usado em componentes eletrônicos.', density: '16.65 g/cm³', meltingPoint: '3017°C', boilingPoint: '5458°C', electronegativity: 1.5 },
    { number: 74, symbol: 'W', name: 'Tungstênio', mass: 183.84, group: '6', period: 6, state: 'Sólido', config: '[Xe] 4f¹⁴ 5d⁴ 6s²', category: 'transition', 
      description: 'Metal com maior ponto de fusão.', density: '19.25 g/cm³', meltingPoint: '3422°C', boilingPoint: '5555°C', electronegativity: 2.36 },
    { number: 75, symbol: 'Re', name: 'Rênio', mass: 186.21, group: '7', period: 6, state: 'Sólido', config: '[Xe] 4f¹⁴ 5d⁵ 6s²', category: 'transition', 
      description: 'Um dos metais mais raros.', density: '21.02 g/cm³', meltingPoint: '3186°C', boilingPoint: '5596°C', electronegativity: 1.9 },
    { number: 76, symbol: 'Os', name: 'Ósmio', mass: 190.23, group: '8', period: 6, state: 'Sólido', config: '[Xe] 4f¹⁴ 5d⁶ 6s²', category: 'transition', 
      description: 'Substância mais densa conhecida.', density: '22.59 g/cm³', meltingPoint: '3033°C', boilingPoint: '5012°C', electronegativity: 2.2 },
    { number: 77, symbol: 'Ir', name: 'Irídio', mass: 192.22, group: '9', period: 6, state: 'Sólido', config: '[Xe] 4f¹⁴ 5d⁷ 6s²', category: 'transition', 
      description: 'Metal mais resistente à corrosão.', density: '22.56 g/cm³', meltingPoint: '2446°C', boilingPoint: '4428°C', electronegativity: 2.20 },
    { number: 78, symbol: 'Pt', name: 'Platina', mass: 195.08, group: '10', period: 6, state: 'Sólido', config: '[Xe] 4f¹⁴ 5d⁹ 6s¹', category: 'transition', 
      description: 'Metal precioso usado em catalisadores.', density: '21.45 g/cm³', meltingPoint: '1768.3°C', boilingPoint: '3825°C', electronegativity: 2.28 },
    { number: 79, symbol: 'Au', name: 'Ouro', mass: 196.97, group: '11', period: 6, state: 'Sólido', config: '[Xe] 4f¹⁴ 5d¹⁰ 6s¹', category: 'transition', 
      description: 'Metal precioso resistente à corrosão.', density: '19.32 g/cm³', meltingPoint: '1064.18°C', boilingPoint: '2856°C', electronegativity: 2.54 },
    { number: 80, symbol: 'Hg', name: 'Mercúrio', mass: 200.59, group: '12', period: 6, state: 'Líquido', config: '[Xe] 4f¹⁴ 5d¹⁰ 6s²', category: 'transition', 
      description: 'Único metal líquido à temperatura ambiente.', density: '13.534 g/cm³', meltingPoint: '-38.83°C', boilingPoint: '356.73°C', electronegativity: 2.00 },
    { number: 81, symbol: 'Tl', name: 'Tálio', mass: 204.38, group: '13', period: 6, state: 'Sólido', config: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p¹', category: 'metal', 
      description: 'Altamente tóxico.', density: '11.85 g/cm³', meltingPoint: '304°C', boilingPoint: '1473°C', electronegativity: 1.62 },
    { number: 82, symbol: 'Pb', name: 'Chumbo', mass: 207.2, group: '14', period: 6, state: 'Sólido', config: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²', category: 'metal', 
      description: 'Usado em baterias e proteção contra radiação.', density: '11.34 g/cm³', meltingPoint: '327.46°C', boilingPoint: '1749°C', electronegativity: 2.33 },
    { number: 83, symbol: 'Bi', name: 'Bismuto', mass: 208.98, group: '15', period: 6, state: 'Sólido', config: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p³', category: 'metal', 
      description: 'Elemento mais diamagnético.', density: '9.78 g/cm³', meltingPoint: '271.5°C', boilingPoint: '1564°C', electronegativity: 2.02 },
    { number: 84, symbol: 'Po', name: 'Polônio', mass: 209, group: '16', period: 6, state: 'Sólido', config: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁴', category: 'metalloid', 
      description: 'Elemento radioativo extremamente tóxico.', density: '9.196 g/cm³', meltingPoint: '254°C', boilingPoint: '962°C', electronegativity: 2.0 },
    { number: 85, symbol: 'At', name: 'Astato', mass: 210, group: '17', period: 6, state: 'Sólido', config: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁵', category: 'halogen', 
      description: 'Elemento mais raro na natureza.', density: '7 g/cm³ (estimado)', meltingPoint: '302°C', boilingPoint: '337°C', electronegativity: 2.2 },
    { number: 86, symbol: 'Rn', name: 'Radônio', mass: 222, group: '18', period: 6, state: 'Gasoso', config: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁶', category: 'noble', 
      description: 'Gás radioativo perigoso.', density: '9.73 g/L', meltingPoint: '-71°C', boilingPoint: '-61.7°C', electronegativity: 2.2 },
  
    // Período 7 (Elementos 87-118 incluindo Actinídeos)
    { number: 87, symbol: 'Fr', name: 'Frâncio', mass: 223, group: '1', period: 7, state: 'Sólido', config: '[Rn] 7s¹', category: 'alkali', 
      description: 'Elemento mais eletropositivo conhecido.', density: '1.87 g/cm³ (estimado)', meltingPoint: '27°C', boilingPoint: '677°C', electronegativity: 0.7 },
    { number: 88, symbol: 'Ra', name: 'Rádio', mass: 226, group: '2', period: 7, state: 'Sólido', config: '[Rn] 7s²', category: 'alkaline', 
      description: 'Famoso por sua radioatividade.', density: '5.5 g/cm³', meltingPoint: '700°C', boilingPoint: '1737°C', electronegativity: 0.9 },
    // Actinídeos (89-103)
    { number: 89, symbol: 'Ac', name: 'Actínio', mass: 227, group: '3', period: 7, state: 'Sólido', config: '[Rn] 6d¹ 7s²', category: 'actinide', 
      description: 'Dá nome à série dos actinídeos.', density: '10.07 g/cm³', meltingPoint: '1050°C', boilingPoint: '3200°C', electronegativity: 1.1 },
    { number: 90, symbol: 'Th', name: 'Tório', mass: 232.04, group: '3', period: 7, state: 'Sólido', config: '[Rn] 6d² 7s²', category: 'actinide', 
      description: 'Potencial combustível nuclear.', density: '11.72 g/cm³', meltingPoint: '1750°C', boilingPoint: '4788°C', electronegativity: 1.3 },
    { number: 91, symbol: 'Pa', name: 'Protactínio', mass: 231.04, group: '3', period: 7, state: 'Sólido', config: '[Rn] 5f² 6d¹ 7s²', category: 'actinide', 
      description: 'Raro e altamente radioativo.', density: '15.37 g/cm³', meltingPoint: '1568°C', boilingPoint: '4027°C', electronegativity: 1.5 },
    { number: 92, symbol: 'U', name: 'Urânio', mass: 238.03, group: '3', period: 7, state: 'Sólido', config: '[Rn] 5f³ 6d¹ 7s²', category: 'actinide', 
      description: 'Combustível nuclear principal.', density: '19.1 g/cm³', meltingPoint: '1135°C', boilingPoint: '4131°C', electronegativity: 1.38 },
    { number: 93, symbol: 'Np', name: 'Neptúnio', mass: 237, group: '3', period: 7, state: 'Sólido', config: '[Rn] 5f⁴ 6d¹ 7s²', category: 'actinide', 
      description: 'Primeiro elemento transurânico.', density: '20.45 g/cm³', meltingPoint: '644°C', boilingPoint: '3902°C', electronegativity: 1.36 },
    { number: 94, symbol: 'Pu', name: 'Plutônio', mass: 244, group: '3', period: 7, state: 'Sólido', config: '[Rn] 5f⁶ 7s²', category: 'actinide', 
      description: 'Usado em armas nucleares.', density: '19.816 g/cm³', meltingPoint: '639.4°C', boilingPoint: '3228°C', electronegativity: 1.28 },
    { number: 95, symbol: 'Am', name: 'Amerício', mass: 243, group: '3', period: 7, state: 'Sólido', config: '[Rn] 5f⁷ 7s²', category: 'actinide', 
      description: 'Usado em detectores de fumaça.', density: '12 g/cm³', meltingPoint: '1176°C', boilingPoint: '2607°C', electronegativity: 1.13 },
    { number: 96, symbol: 'Cm', name: 'Cúrio', mass: 247, group: '3', period: 7, state: 'Sólido', config: '[Rn] 5f⁷ 6d¹ 7s²', category: 'actinide', 
      description: 'Homenagem a Marie Curie.', density: '13.51 g/cm³', meltingPoint: '1340°C', boilingPoint: '3110°C', electronegativity: 1.28 },
    { number: 97, symbol: 'Bk', name: 'Berquélio', mass: 247, group: '3', period: 7, state: 'Sólido', config: '[Rn] 5f⁹ 7s²', category: 'actinide', 
      description: 'Produzido em quantidades mínimas.', density: '14.78 g/cm³', meltingPoint: '986°C', boilingPoint: '2627°C', electronegativity: 1.3 },
    { number: 98, symbol: 'Cf', name: 'Califórnio', mass: 251, group: '3', period: 7, state: 'Sólido', config: '[Rn] 5f¹⁰ 7s²', category: 'actinide', 
      description: 'Elemento mais caro do mundo.', density: '15.1 g/cm³', meltingPoint: '900°C', boilingPoint: '1470°C', electronegativity: 1.3 },
    { number: 99, symbol: 'Es', name: 'Einstênio', mass: 252, group: '3', period: 7, state: 'Sólido', config: '[Rn] 5f¹¹ 7s²', category: 'actinide', 
      description: 'Homenagem a Albert Einstein.', density: '8.84 g/cm³', meltingPoint: '860°C', boilingPoint: '996°C', electronegativity: 1.3 },
    { number: 100, symbol: 'Fm', name: 'Férmio', mass: 257, group: '3', period: 7, state: 'Sólido', config: '[Rn] 5f¹² 7s²', category: 'actinide', 
      description: 'Homenagem a Enrico Fermi.', density: '9.7 g/cm³ (estimado)', meltingPoint: '1527°C', boilingPoint: '--', electronegativity: 1.3 },
    { number: 101, symbol: 'Md', name: 'Mendelévio', mass: 258, group: '3', period: 7, state: 'Sólido', config: '[Rn] 5f¹³ 7s²', category: 'actinide', 
      description: 'Homenagem a Dmitri Mendeleev.', density: '10.3 g/cm³ (estimado)', meltingPoint: '827°C', boilingPoint: '--', electronegativity: 1.3 },
    { number: 102, symbol: 'No', name: 'Nobélio', mass: 259, group: '3', period: 7, state: 'Sólido', config: '[Rn] 5f¹⁴ 7s²', category: 'actinide', 
      description: 'Homenagem a Alfred Nobel.', density: '9.9 g/cm³ (estimado)', meltingPoint: '827°C', boilingPoint: '--', electronegativity: 1.3 },
    { number: 103, symbol: 'Lr', name: 'Laurêncio', mass: 262, group: '3', period: 7, state: 'Sólido', config: '[Rn] 5f¹⁴ 6d¹ 7s²', category: 'actinide', 
      description: 'Homenagem a Ernest Lawrence.', density: '15.6 g/cm³ (estimado)', meltingPoint: '1627°C', boilingPoint: '--', electronegativity: 1.3 },
    // Continuação do período 7 (104-118)
    { number: 104, symbol: 'Rf', name: 'Rutherfórdio', mass: 267, group: '4', period: 7, state: 'Sólido', config: '[Rn] 5f¹⁴ 6d² 7s²', category: 'transition', 
      description: 'Elemento sintético radioativo.', density: '23 g/cm³ (estimado)', meltingPoint: '2100°C (estimado)', boilingPoint: '5500°C (estimado)', electronegativity: null },
    { number: 105, symbol: 'Db', name: 'Dúbnio', mass: 268, group: '5', period: 7, state: 'Sólido', config: '[Rn] 5f¹⁴ 6d³ 7s²', category: 'transition', 
      description: 'Elemento sintético superpesado.', density: '29 g/cm³ (estimado)', meltingPoint: '--', boilingPoint: '--', electronegativity: null },
    { number: 106, symbol: 'Sg', name: 'Seabórgio', mass: 269, group: '6', period: 7, state: 'Sólido', config: '[Rn] 5f¹⁴ 6d⁴ 7s²', category: 'transition', 
      description: 'Homenagem a Glenn T. Seaborg.', density: '35 g/cm³ (estimado)', meltingPoint: '--', boilingPoint: '--', electronegativity: null },
    { number: 107, symbol: 'Bh', name: 'Bóhrio', mass: 270, group: '7', period: 7, state: 'Sólido', config: '[Rn] 5f¹⁴ 6d⁵ 7s²', category: 'transition', 
      description: 'Homenagem a Niels Bohr.', density: '37 g/cm³ (estimado)', meltingPoint: '--', boilingPoint: '--', electronegativity: null },
    { number: 108, symbol: 'Hs', name: 'Hássio', mass: 269, group: '8', period: 7, state: 'Sólido', config: '[Rn] 5f¹⁴ 6d⁶ 7s²', category: 'transition', 
      description: 'Homenagem ao estado alemão Hesse.', density: '41 g/cm³ (estimado)', meltingPoint: '--', boilingPoint: '--', electronegativity: null },
    { number: 109, symbol: 'Mt', name: 'Meitnério', mass: 278, group: '9', period: 7, state: 'Sólido', config: '[Rn] 5f¹⁴ 6d⁷ 7s²', category: 'transition', 
      description: 'Homenagem a Lise Meitner.', density: '37.4 g/cm³ (estimado)', meltingPoint: '--', boilingPoint: '--', electronegativity: null },
    { number: 110, symbol: 'Ds', name: 'Darmstádio', mass: 281, group: '10', period: 7, state: 'Sólido', config: '[Rn] 5f¹⁴ 6d⁹ 7s¹', category: 'transition', 
      description: 'Homenagem à cidade de Darmstadt.', density: '34.8 g/cm³ (estimado)', meltingPoint: '--', boilingPoint: '--', electronegativity: null },
    { number: 111, symbol: 'Rg', name: 'Roentgênio', mass: 282, group: '11', period: 7, state: 'Sólido', config: '[Rn] 5f¹⁴ 6d¹⁰ 7s¹', category: 'transition', 
      description: 'Homenagem a Wilhelm Röntgen.', density: '28.7 g/cm³ (estimado)', meltingPoint: '--', boilingPoint: '--', electronegativity: null },
    { number: 112, symbol: 'Cn', name: 'Copernício', mass: 285, group: '12', period: 7, state: 'Gasoso (previsto)', config: '[Rn] 5f¹⁴ 6d¹⁰ 7s²', category: 'transition', 
      description: 'Homenagem a Nicolau Copérnico.', density: '23.7 g/cm³ (estimado)', meltingPoint: '--', boilingPoint: '--', electronegativity: null },
    { number: 113, symbol: 'Nh', name: 'Nihônio', mass: 286, group: '13', period: 7, state: 'Sólido (previsto)', config: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p¹', category: 'metal', 
      description: 'Nome japonês para "Japão".', density: '16 g/cm³ (estimado)', meltingPoint: '--', boilingPoint: '--', electronegativity: null },
    { number: 114, symbol: 'Fl', name: 'Fleróvio', mass: 289, group: '14', period: 7, state: 'Gasoso (previsto)', config: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p²', category: 'metal', 
      description: 'Homenagem a Georgy Flyorov.', density: '14 g/cm³ (estimado)', meltingPoint: '--', boilingPoint: '--', electronegativity: null },
    { number: 115, symbol: 'Mc', name: 'Moscóvio', mass: 290, group: '15', period: 7, state: 'Sólido (previsto)', config: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p³', category: 'metal', 
      description: 'Homenagem à região de Moscou.', density: '13.5 g/cm³ (estimado)', meltingPoint: '--', boilingPoint: '--', electronegativity: null },
    { number: 116, symbol: 'Lv', name: 'Livermório', mass: 293, group: '16', period: 7, state: 'Sólido (previsto)', config: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁴', category: 'metal', 
      description: 'Homenagem ao Laboratório Livermore.', density: '12.9 g/cm³ (estimado)', meltingPoint: '--', boilingPoint: '--', electronegativity: null },
    { number: 117, symbol: 'Ts', name: 'Tenesso', mass: 294, group: '17', period: 7, state: 'Sólido (previsto)', config: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁵', category: 'halogen', 
      description: 'Homenagem ao estado do Tennessee.', density: '7.2 g/cm³ (estimado)', meltingPoint: '--', boilingPoint: '--', electronegativity: null },
    { number: 118, symbol: 'Og', name: 'Oganésson', mass: 294, group: '18', period: 7, state: 'Gasoso (previsto)', config: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁶', category: 'noble', 
      description: 'Homenagem a Yuri Oganessian.', density: '7.2 g/cm³ (previsto)', meltingPoint: '50-100°C (previsto)', boilingPoint: '80-120°C (previsto)', electronegativity: null }
  ];

  // Inicialização
  initPeriodicTable();
  showElementInfo(1); // Mostrar Hidrogênio por padrão

  // Event listeners
  elementSearch.addEventListener('input', handleSearch);
  elementFilter.addEventListener('change', filterElements);
  helpButton.addEventListener('click', () => helpModal.classList.remove('hidden'));
  closeHelpModal.addEventListener('click', () => helpModal.classList.add('hidden'));

  // Sugestões de busca
  const suggestionElements = searchSuggestions.querySelectorAll('span');
  suggestionElements.forEach(el => {
    el.addEventListener('click', () => {
      elementSearch.value = el.textContent;
      handleSearch();
    });
  });

  // Funções principais
  function initPeriodicTable() {
    // Organizar os elementos por período e grupo
    const periods = {};
    elementsData.forEach(element => {
      if (!periods[element.period]) {
        periods[element.period] = {};
      }
      periods[element.period][element.group] = element;
    });
    
    // Criar a tabela
    let html = '';
    for (let period = 1; period <= 7; period++) {
      for (let group = 1; group <= 18; group++) {
        const element = periods[period] && periods[period][group];
        if (element) {
          html += `
            <div class="element ${getElementColorClass(element)} rounded-lg p-2 text-center cursor-pointer"
                 data-number="${element.number}" 
                 data-name="${element.name.toLowerCase()}" 
                 data-symbol="${element.symbol.toLowerCase()}"
                 data-category="${element.category}">
              <div class="text-xs font-bold opacity-70">${element.number}</div>
              <div class="text-xl font-bold my-1">${element.symbol}</div>
              <div class="text-xs opacity-70">${element.mass.toFixed(element.mass % 1 === 0 ? 0 : 2)}</div>
            </div>
          `;
        } else {
          // Espaço vazio
          html += `<div class="empty"></div>`;
        }
      }
    }
    
    periodicTable.innerHTML = html;
    
    // Adicionar event listeners aos elementos
    document.querySelectorAll('.element').forEach(el => {
      el.addEventListener('click', () => {
        // Remover seleção anterior
        document.querySelectorAll('.element.selected').forEach(selectedEl => {
          selectedEl.classList.remove('selected');
        });
        
        // Adicionar seleção ao elemento clicado
        el.classList.add('selected');
        
        // Mostrar informações do elemento
        const elementNumber = parseInt(el.dataset.number);
        showElementInfo(elementNumber);
      });
    });
  }
  
  function getElementColorClass(element) {
    // Cores baseadas no grupo/categoria
    const group = parseInt(element.group);
    
    if (element.category === 'alkali') return 'bg-red-400 hover:bg-red-500';
    if (element.category === 'alkaline') return 'bg-orange-400 hover:bg-orange-500';
    if (element.category === 'transition') return 'bg-blue-400 hover:bg-blue-500';
    if (element.category === 'halogen') return 'bg-green-400 hover:bg-green-500';
    if (element.category === 'noble') return 'bg-cyan-400 hover:bg-cyan-500';
    if (element.category === 'metalloid') return 'bg-purple-400 hover:bg-purple-500';
    if (element.category === 'nonmetal') return 'bg-green-400 hover:bg-green-500';
    if (group >= 3 && group <= 12) return 'bg-blue-400 hover:bg-blue-500';
    
    return 'bg-gray-400 hover:bg-gray-500';
  }
  
  function showElementInfo(number) {
    const element = elementsData.find(el => el.number == number);
    if (!element) return;
    
    // Atualizar informações básicas
    document.getElementById('elementName').textContent = element.name;
    document.getElementById('elementSymbol').textContent = element.symbol;
    document.getElementById('atomicNumber').textContent = element.number;
    document.getElementById('atomicMass').textContent = element.mass.toFixed(3);
    document.getElementById('elementGroup').textContent = element.group;
    document.getElementById('elementPeriod').textContent = element.period;
    document.getElementById('elementState').textContent = element.state;
    document.getElementById('electronConfig').textContent = element.config;
    document.getElementById('elementDescription').textContent = element.description;
    
    // Atualizar categoria com estilo
    const categoryNames = {
      'alkali': 'Metal Alcalino',
      'alkaline': 'Metal Alcalino-Terroso',
      'transition': 'Metal de Transição',
      'halogen': 'Halogênio',
      'noble': 'Gás Nobre',
      'metalloid': 'Semimetal',
      'nonmetal': 'Não-Metal',
      'metal': 'Metal'
    };
    
    const categoryElement = document.getElementById('elementCategory');
    categoryElement.textContent = categoryNames[element.category] || 'Elemento';
    categoryElement.className = 'text-sm mt-1 px-2 py-1 rounded-full inline-block ' + 
      (element.category === 'nonmetal' ? 'bg-green-100 text-green-800' :
       element.category === 'noble' ? 'bg-cyan-100 text-cyan-800' :
       element.category === 'alkali' ? 'bg-red-100 text-red-800' :
       element.category === 'alkaline' ? 'bg-orange-100 text-orange-800' :
       element.category === 'transition' ? 'bg-blue-100 text-blue-800' :
       'bg-gray-100 text-gray-800');
    
    // Atualizar propriedades adicionais
    document.getElementById('elementDensity').textContent = element.density || '-';
    document.getElementById('elementMeltingPoint').textContent = element.meltingPoint || '-';
    document.getElementById('elementBoilingPoint').textContent = element.boilingPoint || '-';
    document.getElementById('elementElectronegativity').textContent = element.electronegativity || '-';
    
    // Mostrar o painel de informações se estiver oculto
    elementInfo.classList.remove('hidden');
    
    // Rolar para o topo do painel de informações (em telas móveis)
    elementInfo.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function handleSearch() {
    const searchTerm = elementSearch.value.trim().toLowerCase();
    
    // Esconder todas as sugestões se não houver termo de busca
    if (searchTerm.length === 0) {
      searchSuggestions.classList.add('hidden');
      resetSearch();
      return;
    }
    
    // Mostrar sugestões para termos curtos
    if (searchTerm.length < 2) {
      searchSuggestions.classList.remove('hidden');
      return;
    } else {
      searchSuggestions.classList.add('hidden');
    }
    
    // Remover destaques anteriores
    document.querySelectorAll('.search-highlight').forEach(el => {
      el.classList.remove('search-highlight');
    });
    
    // Encontrar elementos que correspondam ao termo de busca
    const matchingElements = document.querySelectorAll('.element').forEach(el => {
      const matches = el.dataset.name.includes(searchTerm) || 
                      el.dataset.symbol === searchTerm ||
                      el.dataset.number === searchTerm;
      
      if (matches) {
        el.classList.add('search-highlight');
        
        // Se for uma correspondência exata do símbolo ou número, selecionar o elemento
        if (el.dataset.symbol === searchTerm || el.dataset.number === searchTerm) {
          el.click(); // Simular clique para selecionar
        }
      } else {
        el.classList.remove('search-highlight');
      }
    });
  }
  
  function resetSearch() {
    elementSearch.value = '';
    document.querySelectorAll('.search-highlight').forEach(el => {
      el.classList.remove('search-highlight');
    });
  }
  
  function filterElements() {
    const filterValue = elementFilter.value;
    
    document.querySelectorAll('.element').forEach(el => {
      if (filterValue === 'all') {
        el.classList.remove('hidden');
      } else {
        const matchesCategory = el.dataset.category === filterValue ||
                              (filterValue === 'metal' && !['nonmetal', 'noble', 'metalloid'].includes(el.dataset.category));
        
        if (matchesCategory) {
          el.classList.remove('hidden');
        } else {
          el.classList.add('hidden');
        }
      }
    });
  }
});