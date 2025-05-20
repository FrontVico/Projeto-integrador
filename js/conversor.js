document.addEventListener('DOMContentLoaded', () => {
    // Elementos DOM
    const categoryBtns = document.querySelectorAll('.category-btn');
    const unitFields = document.getElementById('unitFields');
    const chemistryFields = document.getElementById('chemistryFields');
    const formulaField = document.getElementById('formulaField');
    const equationField = document.getElementById('equationField');
    const energyFields = document.getElementById('energyFields');
    const inputValue = document.getElementById('inputValue');
    const inputUnit = document.getElementById('inputUnit');
    const resultSpan = document.getElementById('result');
    const resultUnitSpan = document.getElementById('resultUnit');
    const copyBtn = document.getElementById('copyResult');
    const helpBtn = document.getElementById('formulaHelp');
    const helpModal = document.getElementById('helpModal');
    const closeHelpModal = document.getElementById('closeHelpModal');

    // Massas molares dos elementos (lista expandida)
    const atomicMasses = {
      'H': 1.008, 'He': 4.0026, 'Li': 6.94, 'Be': 9.0122, 'B': 10.81,
      'C': 12.011, 'N': 14.007, 'O': 16.00, 'F': 19.00, 'Ne': 20.18,
      'Na': 22.99, 'Mg': 24.305, 'Al': 26.982, 'Si': 28.085, 'P': 30.974,
      'S': 32.06, 'Cl': 35.45, 'K': 39.098, 'Ca': 40.078, 'Fe': 55.845,
      'Cu': 63.546, 'Zn': 65.38, 'Ag': 107.87, 'I': 126.90, 'Ba': 137.33,
      'Pb': 207.2, 'U': 238.03
    };

    // Inicialização
    let currentCategory = 'temperature';
    updateFields();

    // Event Listeners
    categoryBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        categoryBtns.forEach(b => b.classList.remove('active-category'));
        btn.classList.add('active-category');
        currentCategory = btn.dataset.category;
        document.getElementById('category').value = currentCategory;
        updateFields();
      });
    });

    inputValue.addEventListener('input', convert);
    copyBtn.addEventListener('click', copyResult);
    helpBtn.addEventListener('click', () => helpModal.classList.remove('hidden'));
    closeHelpModal.addEventListener('click', () => helpModal.classList.add('hidden'));

    // Fechar modal ao clicar fora
    helpModal.addEventListener('click', (e) => {
      if (e.target === helpModal) helpModal.classList.add('hidden');
    });

    // Atualiza campos conforme a categoria selecionada
    function updateFields() {
      let html = '';
      chemistryFields.classList.add('hidden');
      formulaField.classList.add('hidden');
      equationField.classList.add('hidden');
      energyFields.classList.add('hidden');
      inputValue.value = '';
      resultSpan.textContent = '0';

      switch (currentCategory) {
        case 'temperature':
          html = `
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">De</label>
              <select id="unitFrom" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="celsius">Celsius (°C)</option>
                <option value="fahrenheit">Fahrenheit (°F)</option>
                <option value="kelvin">Kelvin (K)</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Para</label>
              <select id="unitTo" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="fahrenheit">Fahrenheit (°F)</option>
                <option value="celsius">Celsius (°C)</option>
                <option value="kelvin">Kelvin (K)</option>
              </select>
            </div>
          `;
          inputUnit.textContent = '°C';
          resultUnitSpan.textContent = '°F';
          break;

        case 'molarity':
          chemistryFields.classList.remove('hidden');
          inputUnit.textContent = 'g/L';
          resultUnitSpan.textContent = 'mol/L';
          break;

        case 'pressure':
          html = `
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">De</label>
              <select id="unitFrom" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="atm">Atmosfera (atm)</option>
                <option value="mmHg">Milímetros de Hg (mmHg)</option>
                <option value="kPa">Quilopascal (kPa)</option>
                <option value="bar">Bar (bar)</option>
                <option value="psi">Libra por polegada (psi)</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Para</label>
              <select id="unitTo" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="mmHg">Milímetros de Hg (mmHg)</option>
                <option value="atm">Atmosfera (atm)</option>
                <option value="kPa">Quilopascal (kPa)</option>
                <option value="bar">Bar (bar)</option>
                <option value="psi">Libra por polegada (psi)</option>
              </select>
            </div>
          `;
          inputUnit.textContent = 'atm';
          resultUnitSpan.textContent = 'mmHg';
          break;

        case 'massMolar':
          formulaField.classList.remove('hidden');
          inputUnit.textContent = '';
          resultUnitSpan.textContent = 'g/mol';
          break;

        case 'concentration':
          html = `
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">De</label>
              <select id="unitFrom" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="percent">Porcentagem (% m/v)</option>
                <option value="ppm">Partes por milhão (ppm)</option>
                <option value="ppb">Partes por bilhão (ppb)</option>
                <option value="molar">Molaridade (mol/L)</option>
                <option value="normal">Normalidade (N)</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Para</label>
              <select id="unitTo" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="ppm">Partes por milhão (ppm)</option>
                <option value="percent">Porcentagem (% m/v)</option>
                <option value="ppb">Partes por bilhão (ppb)</option>
                <option value="molar">Molaridade (mol/L)</option>
                <option value="normal">Normalidade (N)</option>
              </select>
            </div>
          `;
          chemistryFields.classList.remove('hidden');
          inputUnit.textContent = '%';
          resultUnitSpan.textContent = 'ppm';
          break;

        case 'stoichiometry':
          equationField.classList.remove('hidden');
          chemistryFields.classList.remove('hidden');
          inputUnit.textContent = 'g';
          resultUnitSpan.textContent = 'mol';
          break;

        case 'energy':
          html = `
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">De</label>
              <select id="unitFrom" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="kjmol">kJ/mol</option>
                <option value="kcalmol">kcal/mol</option>
                <option value="ev">Elétron-volt (eV)</option>
                <option value="equilibrium">Constante de Equilíbrio</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Para</label>
              <select id="unitTo" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="kcalmol">kcal/mol</option>
                <option value="kjmol">kJ/mol</option>
                <option value="ev">Elétron-volt (eV)</option>
              </select>
            </div>
          `;
          energyFields.classList.remove('hidden');
          inputUnit.textContent = 'kJ/mol';
          resultUnitSpan.textContent = 'kcal/mol';
          break;
      }

      unitFields.innerHTML = html;
      if (html) {
        document.getElementById('unitFrom').addEventListener('change', updateInputUnit);
        document.getElementById('unitTo').addEventListener('change', convert);
        document.getElementById('unitFrom').addEventListener('change', convert);
      }

      // Event listeners para campos dinâmicos
      if (chemistryFields.classList.contains('hidden') === false) {
        document.getElementById('mass').addEventListener('input', convertChemistry);
        document.getElementById('volume').addEventListener('input', convertChemistry);
      }

      if (formulaField.classList.contains('hidden') === false) {
        document.getElementById('chemicalFormula').addEventListener('input', calculateMolarMass);
      }

      if (equationField.classList.contains('hidden') === false) {
        document.getElementById('chemicalEquation').addEventListener('input', calculateStoichiometry);
      }

      if (energyFields.classList.contains('hidden') === false) {
        document.getElementById('equilibriumConst').addEventListener('input', convert);
        document.getElementById('reactionTemp').addEventListener('input', convert);
      }
    }

    function updateInputUnit() {
      const fromUnit = document.getElementById('unitFrom')?.value;
      if (!fromUnit) return;

      const unitTexts = {
        temperature: {
          celsius: '°C', fahrenheit: '°F', kelvin: 'K'
        },
        pressure: {
          atm: 'atm', mmHg: 'mmHg', kPa: 'kPa', bar: 'bar', psi: 'psi'
        },
        concentration: {
          percent: '%', ppm: 'ppm', ppb: 'ppb', molar: 'mol/L', normal: 'N'
        },
        energy: {
          kjmol: 'kJ/mol', kcalmol: 'kcal/mol', ev: 'eV', equilibrium: 'K'
        }
      };

      inputUnit.textContent = unitTexts[currentCategory]?.[fromUnit] || '';
    }

    // Funções de conversão
    function convert() {
      const value = parseFloat(inputValue.value) || 0;
      let result;

      switch (currentCategory) {
        case 'temperature':
          const fromTemp = document.getElementById('unitFrom').value;
          const toTemp = document.getElementById('unitTo').value;
          result = convertTemperature(value, fromTemp, toTemp);
          resultUnitSpan.textContent = toTemp === 'celsius' ? '°C' : 
                                      toTemp === 'fahrenheit' ? '°F' : 'K';
          break;

        case 'pressure':
          const fromPressure = document.getElementById('unitFrom').value;
          const toPressure = document.getElementById('unitTo').value;
          result = convertPressure(value, fromPressure, toPressure);
          resultUnitSpan.textContent = toPressure === 'atm' ? 'atm' :
                                      toPressure === 'mmHg' ? 'mmHg' :
                                      toPressure === 'kPa' ? 'kPa' :
                                      toPressure === 'bar' ? 'bar' : 'psi';
          break;

        case 'concentration':
          const fromConc = document.getElementById('unitFrom').value;
          const toConc = document.getElementById('unitTo').value;
          const molarMass = parseFormula(document.getElementById('chemicalFormula').value.trim()) || 1;
          result = convertConcentration(value, fromConc, toConc, molarMass);
          resultUnitSpan.textContent = toConc === 'percent' ? '%' :
                                      toConc === 'ppm' ? 'ppm' :
                                      toConc === 'ppb' ? 'ppb' :
                                      toConc === 'molar' ? 'mol/L' : 'N';
          break;

        case 'energy':
          const fromEnergy = document.getElementById('unitFrom').value;
          const toEnergy = document.getElementById('unitTo').value;
          const K = parseFloat(document.getElementById('equilibriumConst').value) || 1;
          const T = parseFloat(document.getElementById('reactionTemp').value) || 298;
          
          if (fromEnergy === 'equilibrium') {
            result = convertEnergyFromEquilibrium(K, T, toEnergy);
          } else {
            result = convertEnergy(value, fromEnergy, toEnergy);
          }
          
          resultUnitSpan.textContent = toEnergy === 'kjmol' ? 'kJ/mol' :
                                      toEnergy === 'kcalmol' ? 'kcal/mol' : 'eV';
          break;
      }

      if (result !== undefined) {
        resultSpan.textContent = result.toFixed(4).replace(/\.?0+$/, '');
      }
    }

    function convertChemistry() {
      const mass = parseFloat(document.getElementById('mass').value) || 0;
      const volume = parseFloat(document.getElementById('volume').value) || 1;
      let result;

      switch (currentCategory) {
        case 'molarity':
          const molarMass = parseFormula(document.getElementById('chemicalFormula').value.trim()) || 1;
          result = mass / (molarMass * volume);
          resultUnitSpan.textContent = 'mol/L';
          break;

        case 'stoichiometry':
          // Implementado em calculateStoichiometry()
          return;
      }

      if (result !== undefined) {
        resultSpan.textContent = result.toFixed(4).replace(/\.?0+$/, '');
      }
    }

    function calculateMolarMass() {
      const formula = document.getElementById('chemicalFormula').value.trim();
      if (!formula) {
        resultSpan.textContent = '0';
        return;
      }

      try {
        const molarMass = parseFormula(formula);
        resultSpan.textContent = molarMass.toFixed(3);
      } catch (e) {
        resultSpan.textContent = 'Erro';
        console.error(e);
      }
    }

    function calculateStoichiometry() {
      const equation = document.getElementById('chemicalEquation').value.trim();
      const mass = parseFloat(document.getElementById('mass').value) || 0;
      
      if (!equation || !mass) {
        resultSpan.textContent = '0';
        return;
      }

      // Exemplo simplificado para algumas equações comuns
      let result;
      if (equation.includes('2H2 + O2 → 2H2O')) {
        const molarMassH2O = 18.015;
        const molesH2O = mass / molarMassH2O;
        result = molesH2O; // 1 mol de H2O requer 1 mol de H2 (simplificado)
      } else if (equation.includes('N2 + 3H2 → 2NH3')) {
        const molarMassNH3 = 17.031;
        const molesNH3 = mass / molarMassNH3;
        result = molesNH3 * 1.5; // 1.5 mol de H2 para 1 mol de NH3
      } else {
        resultSpan.textContent = 'Equação não suportada';
        return;
      }

      resultSpan.textContent = result.toFixed(4);
    }

    // Analisador de fórmulas químicas
    function parseFormula(formula) {
      if (!formula) return 0;
      
      let totalMass = 0;
      let i = 0;
      const n = formula.length;

      while (i < n) {
        // Parse elemento
        let element = formula[i++];
        if (i < n && /[a-z]/.test(formula[i])) {
          element += formula[i++];
        }

        if (!atomicMasses[element]) {
          throw new Error(`Elemento desconhecido: ${element}`);
        }

        // Parse quantidade
        let quantity = 1;
        if (i < n && /\d/.test(formula[i])) {
          let numStr = '';
          while (i < n && /\d/.test(formula[i])) {
            numStr += formula[i++];
          }
          quantity = parseInt(numStr, 10);
        }

        totalMass += atomicMasses[element] * quantity;
      }

      return totalMass;
    }

    // Conversões específicas
    function convertTemperature(value, from, to) {
      if (from === to) return value;
      
      // Converter primeiro para Celsius
      let celsius;
      switch (from) {
        case 'celsius': celsius = value; break;
        case 'fahrenheit': celsius = (value - 32) * 5/9; break;
        case 'kelvin': celsius = value - 273.15; break;
      }
      
      // Converter de Celsius para unidade alvo
      switch (to) {
        case 'celsius': return celsius;
        case 'fahrenheit': return (celsius * 9/5) + 32;
        case 'kelvin': return celsius + 273.15;
      }
    }

    function convertPressure(value, from, to) {
      if (from === to) return value;
      
      // Fator de conversão para Pascal (unidade SI)
      let pascal;
      switch (from) {
        case 'atm': pascal = value * 101325; break;
        case 'mmHg': pascal = value * 133.322; break;
        case 'kPa': pascal = value * 1000; break;
        case 'bar': pascal = value * 100000; break;
        case 'psi': pascal = value * 6894.76; break;
      }
      
      // Converter de Pascal para unidade alvo
      switch (to) {
        case 'atm': return pascal / 101325;
        case 'mmHg': return pascal / 133.322;
        case 'kPa': return pascal / 1000;
        case 'bar': return pascal / 100000;
        case 'psi': return pascal / 6894.76;
      }
    }

    function convertConcentration(value, from, to, molarMass = 1) {
      if (from === to) return value;
      
      const conversions = {
        percent: { 
          ppm: 10000, 
          ppb: 10000000,
          molar: (10/molarMass), 
          normal: (10/molarMass) 
        },
        ppm: { 
          percent: 0.0001, 
          ppb: 1000,
          molar: (0.001/molarMass), 
          normal: (0.001/molarMass) 
        },
        ppb: {
          percent: 0.0000001,
          ppm: 0.001,
          molar: (0.000001/molarMass),
          normal: (0.000001/molarMass)
        },
        molar: { 
          percent: (molarMass*10), 
          ppm: (molarMass*1000),
          ppb: (molarMass*1000000),
          normal: 1 
        },
        normal: { 
          percent: (molarMass*10), 
          ppm: (molarMass*1000),
          ppb: (molarMass*1000000),
          molar: 1 
        }
      };
      
      return value * conversions[from][to];
    }

    function convertEnergy(value, from, to) {
      if (from === to) return value;
      
      const conversions = {
        kjmol: { kcalmol: 0.239006, ev: 10.3643 },
        kcalmol: { kjmol: 4.184, ev: 43.3634 },
        ev: { kjmol: 0.096485, kcalmol: 0.0230605 }
      };
      
      return value * conversions[from][to];
    }

    function convertEnergyFromEquilibrium(K, T, to) {
      const R = 8.314; // J/(mol·K)
      const deltaG = (-R * T * Math.log(K)) / 1000; // em kJ/mol
      
      if (to === 'kjmol') return deltaG;
      if (to === 'kcalmol') return deltaG * 0.239006;
      if (to === 'ev') return deltaG * 10.3643;
      
      return deltaG;
    }

    function copyResult() {
      const resultText = `${resultSpan.textContent} ${resultUnitSpan.textContent}`;
      navigator.clipboard.writeText(resultText).then(() => {
        const originalIcon = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i>';
        setTimeout(() => {
          copyBtn.innerHTML = originalIcon;
        }, 2000);
      });
    }

    // Ativar primeira categoria
    document.querySelector('.category-btn').click();
  });