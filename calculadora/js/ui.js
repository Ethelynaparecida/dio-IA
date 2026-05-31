/**
 * ============================================================================
 * UI - User Interface Utilities
 * ============================================================================
 *
 * Global object containing utility methods for:
 * - Number and currency formatting
 * - Element visibility control
 * - DOM manipulation
 */

const UI = {
    /**
     * Format a number with specified decimal places and thousand separators.
     * * Uses Brazilian Portuguese locale (pt-BR) which uses comma (,) as decimal
     * separator and period (.) as thousand separator.
     * * @param {number} number - The number to format
     * @param {number} decimals - Number of decimal places (default: 2)
     * @returns {string} Formatted number string (e.g., "1.234,56")
     */
    formatNumber: function (number, decimals = 2) {
        if (typeof number !== 'number') {
            return '0';
        }

        return number.toLocaleString('pt-BR', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
        });
    },

    /**
     * Format a value as Brazilian Real (BRL) currency.
     * * Formats the value with R$ prefix and uses Brazilian Portuguese locale
     * for proper number formatting with comma as decimal separator.
     * * @param {number} value - The value to format in BRL
     * @returns {string} Formatted currency string (e.g., "R$ 1.234,56")
     */
    formatCurrency: function (value) {
        if (typeof value !== 'number') {
            return 'R$ 0,00';
        }

        return value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
    },

    /**
     * Show an element by removing the 'hidden' class.
     * Suporta receber o ID (string) ou o próprio Elemento HTML.
     * * @param {string|HTMLElement} elementOrId - The ID or the element itself
     * @returns {Element|null} The element if found, null otherwise
     */
    showElement: function (elementOrId) {
        const element = typeof elementOrId === 'string'
            ? document.getElementById(elementOrId)
            : elementOrId;

        if (element) {
            element.classList.remove('hidden');
        }

        return element;
    },

    /**
     * Hide an element by adding the 'hidden' class.
     * Suporta receber o ID (string) ou o próprio Elemento HTML.
     * * @param {string|HTMLElement} elementOrId - The ID or the element itself
     * @returns {Element|null} The element if found, null otherwise
     */
    hideElement: function (elementOrId) {
        const element = typeof elementOrId === 'string'
            ? document.getElementById(elementOrId)
            : elementOrId;

        if (element) {
            element.classList.add('hidden');
        }

        return element;
    },

    /**
     * Scroll smoothly to an element on the page.
     * Suporta receber o ID (string) ou o próprio Elemento HTML.
     * * @param {string|HTMLElement} elementOrId - The ID or the element itself
     * @returns {boolean} true if element was found and scrolled to, false otherwise
     */
    scrollToElement: function (elementOrId) {
        const element = typeof elementOrId === 'string'
            ? document.getElementById(elementOrId)
            : elementOrId;

        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
            return true;
        }

        return false;
    },

    /* ========================================================================
       RENDERING METHODS
       ======================================================================== */

    /**
     * Render the main results section showing emission calculation details.
     * * @param {Object} data - Result data object
     * @returns {string} Complete HTML string to insert into result-content div
     */
    renderResults: function (data) {
        const modeInfo = CONFIG.TRANSPORT_MODES[data.modoTransporte || data.mode];
        const modeLabel = modeInfo ? modeInfo.label : data.mode;
        const modeIcon = modeInfo ? modeInfo.icon : '❓';

        let html = `
      <div class="results__container">
        <div class="results__card">
          <h3 class="results__card-title">Rota</h3>
          <div class="results__card-content">
            <div class="results__route">
              <span class="results__route-city">${data.origem || data.origin}</span>
              <span class="results__route-arrow">→</span>
              <span class="results__route-city">${data.destino || data.destination}</span>
            </div>
          </div>
        </div>

        <div class="results__card">
          <h3 class="results__card-title">Distância</h3>
          <div class="results__card-content">
            <div class="results__metric">
              <span class="results__metric-value">${this.formatNumber(data.distancia || data.distance, 1)}</span>
              <span class="results__metric-unit">km</span>
            </div>
          </div>
        </div>

        <div class="results__card results__card--highlight">
          <h3 class="results__card-title">Emissão de CO₂</h3>
          <div class="results__card-content">
            <div class="results__emission">
              <span class="results__emission-icon">🍃</span>
              <div class="results__emission-value">
                <span class="results__metric-value">${this.formatNumber(data.emissao || data.emission, 2)}</span>
                <span class="results__metric-unit">kg CO₂</span>
              </div>
            </div>
          </div>
        </div>

        <div class="results__card">
          <h3 class="results__card-title">Modo de Transporte</h3>
          <div class="results__card-content">
            <div class="results__transport">
              <span class="results__transport-icon">${modeIcon}</span>
              <span class="results__transport-label">${modeLabel}</span>
            </div>
          </div>
        </div>
    `;

        // Adiciona o card de economia se o modo não for carro e houver economia calculada
        const modoAtual = data.modoTransporte || data.mode;
        const economia = data.economia || data.savings;

        if (modoAtual !== 'car' && hasSavingsData(economia)) {
            const savedKg = economia.savedKg !== undefined ? economia.savedKg : economia.saved;
            const percentage = economia.percentage;

            html += `
        <div class="results__card results__card--success">
          <h3 class="results__card-title">Redução de CO₂</h3>
          <div class="results__card-content">
            <div class="results__savings">
              <div class="results__savings-amount">
                <span class="results__metric-value">${this.formatNumber(savedKg, 2)}</span>
                <span class="results__metric-unit">kg economizados</span>
              </div>
              <div class="results__savings-percentage">
                <span class="results__percentage">${this.formatNumber(percentage, 1)}%</span>
                <span class="results__percentage-label">a menos que carro</span>
              </div>
            </div>
          </div>
        </div>
      `;
        }

        html += `</div>`;
        return html;

        // Função auxiliar interna para validação rápida da economia
        function hasSavingsData(eco) {
            return eco && (eco.savedKg !== undefined || eco.saved !== undefined) && eco.percentage !== undefined;
        }
    },

    /**
     * Render comparison between all transport modes.
     * * @param {Array<Object>} modesArray - Array from Calculator.calculateAllModes()
     * @param {string} selectedMode - The currently selected transport mode key
     * @returns {string} Complete HTML string for comparison section
     */
    renderComparison: function (modesArray, selectedMode) {
        // Encontra a maior emissão para calibrar a barra de progresso proporcionalmente
        const maxEmission = Math.max(...modesArray.map(m => m.emission)) || 1;

        let html = `
      <div class="comparison__container">
        <h3 class="comparison__title">Comparação entre Modos de Transporte</h3>
    `;

        // Renderiza cada modo de transporte da lista
        modesArray.forEach(item => {
            const modeInfo = CONFIG.TRANSPORT_MODES[item.mode];
            const modeLabel = modeInfo ? modeInfo.label : item.mode;
            const modeIcon = modeInfo ? modeInfo.icon : '❓';
            const isSelected = item.mode === selectedMode;

            // Calcula a largura da barra e define a cor baseado na intensidade da poluição
            const progressPercent = Math.max(
                3,
                (item.emission / maxEmission) * 100
            );
            let barColor = '#10b981'; // Verde (Mais ecológico: 0-25%)

            if (progressPercent > 25 && progressPercent <= 60) {
                barColor = '#f59e0b'; // Amarelo
            } else if (progressPercent > 60 && progressPercent <= 89) {
                barColor = '#f97316'; // Laranja
            } else if (progressPercent > 89) {
                barColor = '#ef4444'; // Vermelho (Mais poluente)
            }

            const selectedClass = isSelected ? ' comparison__item--selected' : '';

            html += `
        <div class="comparison__item${selectedClass}">
          <div class="comparison__item-header">
            <div class="comparison__mode-info">
              <span class="comparison__mode-icon">${modeIcon}</span>
              <span class="comparison__mode-label">${modeLabel}</span>
            </div>
            ${isSelected ? '<span class="comparison__badge">Selecionado</span>' : ''}
          </div>

          <div class="comparison__item-stats">
            <div class="comparison__stat">
              <span class="comparison__stat-label">Emissão:</span>
              <span class="comparison__stat-value">${this.formatNumber(item.emission, 2)} kg CO₂</span>
            </div>
            <div class="comparison__stat">
              <span class="comparison__stat-label">vs Carro:</span>
              <span class="comparison__stat-value">${this.formatNumber(item.percentageVsCar, 1)}%</span>
            </div>
          </div>

          <div class="comparison__progress-bar">
            <div class="comparison__progress-fill" style="width: ${progressPercent}%; background-color: ${barColor};"></div>
          </div>
        </div>
      `;
        });

        html += `
      <div class="comparison__tip">
        <p class="comparison__tip-text">
          💡 <strong>Dica:</strong> Usar transporte público ou bicicleta pode reduzir significativamente suas emissões de CO₂!
        </p>
      </div>
      </div>
    `;

        return html;
    },

    /**
     * Render carbon credits information and pricing.
     * * @param {Object} creditsData - Object with credits and pricing references
     * @returns {string} Complete HTML string for carbon credits section
     */
    renderCarbonCredits: function (creditsData) {
        const credits = creditsData.credits || 0;
        const prices = creditsData.price || { min: 0, max: 0, average: 0 };

        const html = `
      <div class="carbon-credits__container">
        <div class="carbon-credits__grid">
          <div class="carbon-credits__card">
            <h3 class="carbon-credits__card-title">Créditos de Carbono</h3>
            <div class="carbon-credits__card-content">
              <div class="carbon-credits__credits">
                <span class="carbon-credits__credits-value">${this.formatNumber(credits, 4)}</span>
                <span class="carbon-credits__credits-unit">créditos</span>
              </div>
              <p class="carbon-credits__helper-text">
                1 crédito = 1.000 kg CO₂
              </p>
            </div>
          </div>

          <div class="carbon-credits__card">
            <h3 class="carbon-credits__card-title">Valor Estimado</h3>
            <div class="carbon-credits__card-content">
              <div class="carbon-credits__price">
                <span class="carbon-credits__price-main">${this.formatCurrency(prices.average)}</span>
                <span class="carbon-credits__price-range">
                  ${this.formatCurrency(prices.min)} a ${this.formatCurrency(prices.max)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="carbon-credits__info">
          <h4 class="carbon-credits__info-title">O que são Créditos de Carbono?</h4>
          <p class="carbon-credits__info-text">
            Um crédito de carbono representa uma tonelada de CO₂ equivalente removido ou evitado da atmosfera.
            Você pode usar esses créditos para compensar suas emissões através de projetos ambientais certificados.
          </p>
        </div>

        <button class="carbon-credits__action-button">
          🛒 Compensar Emissões
        </button>
      </div>
    `;

        return html;
    },

    /**
     * Show loading state on a submit button.
     * * @param {HTMLElement} buttonElement - The button element to show loading on
     */
    showLoading: function (buttonElement) {
        if (!buttonElement) {
            return;
        }

        buttonElement.dataset.originalText = buttonElement.innerHTML;
        buttonElement.disabled = true;
        buttonElement.innerHTML = '<span class="spinner"></span> Calculando...';
    },

    /**
     * Hide loading state and restore button to original state.
     * * @param {HTMLElement} buttonElement - The button element to restore
     */
    hideLoading: function (buttonElement) {
        if (!buttonElement) {
            return;
        }

        buttonElement.disabled = false;

        if (buttonElement.dataset.originalText) {
            buttonElement.innerHTML = buttonElement.dataset.originalText;
        }
    },
};