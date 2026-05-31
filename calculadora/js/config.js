/**
 * ============================================================================
 * CONFIG - Application configuration and helpers
 * ============================================================================
 *
 * Global object containing emission factors, transport metadata,
 * carbon credit values, and helper functions for UI setup.
 */

const CONFIG = {
  EMISSION_FACTORS: {
    bicycle: 0,
    car: 0.12,
    bus: 0.089,
    truck: 0.96,
  },

  TRANSPORT_MODES: {
    bicycle: {
      label: 'Bicicleta',
      icon: '🚲',
      color: '#10b981',
    },
    car: {
      label: 'Carro',
      icon: '🚗',
      color: '#059669',
    },
    bus: {
      label: 'Ônibus',
      icon: '🚌',
      color: '#3b82f6',
    },
    truck: {
      label: 'Caminhão',
      icon: '🚚',
      color: '#f59e0b',
    },
  },

  CARBON_CREDIT: {
    KG_PER_CREDIT: 1000,
    PRICE_MIN_BRL: 50,
    PRICE_MAX_BRL: 150,
  },

  /**
   * Populate the cities datalist using RouteDB route data.
   */
  populateDatalist: function () {
    const cities = RouteDB.getAllCities();
    const datalist = document.getElementById('cities-list');

    if (!datalist) {
      return;
    }

    datalist.innerHTML = '';

    cities.forEach((city) => {
      const option = document.createElement('option');
      option.value = city;
      datalist.appendChild(option);
    });
  },

  /**
   * Set up automatic distance filling based on selected origin and destination.
   */
  setupDistanceAutoFill: function () {
    const originInput = document.getElementById('origin'); 
    const destinationInput = document.getElementById('destination');
    const distanceInput = document.getElementById('distance');
    const manualCheckbox = document.getElementById('manual-distance');
    const helperText = distanceInput ? distanceInput.closest('.calculator__field')?.querySelector('.calculator__help') : null;

    const updateDistance = () => {
      if (!originInput || !destinationInput || !distanceInput || !helperText) {
        return;
      }

      const originValue = originInput.value.trim();
      const destinationValue = destinationInput.value.trim();

      if (manualCheckbox && manualCheckbox.checked) {
        distanceInput.readOnly = false;
        helperText.textContent = 'Distância manual habilitada. Insira o valor desejado.';
        helperText.style.color = 'var(--text-light)';
        return;
      }

      if (originValue && destinationValue) {
        const distance = RouteDB.findDistance(originValue, destinationValue);

        if (distance !== null) {
          distanceInput.value = distance;
          distanceInput.readOnly = true;
          helperText.textContent = 'Distância encontrada automaticamente.';
          helperText.style.color = 'var(--primary)';
          return;
        }
      }

      distanceInput.value = '';
      distanceInput.readOnly = true;
      helperText.textContent = 'Rota não encontrada. Marque para inserir distância manualmente.';
      helperText.style.color = 'var(--danger)';
    };

    if (originInput) {
      originInput.addEventListener('input', updateDistance); 
      originInput.addEventListener('change', updateDistance);
      originInput.addEventListener('blur', updateDistance);
    }

    if (destinationInput) {
      destinationInput.addEventListener('input', updateDistance); 
      destinationInput.addEventListener('change', updateDistance);
      destinationInput.addEventListener('blur', updateDistance);
    }

    if (manualCheckbox) {
      manualCheckbox.addEventListener('change', () => {
        if (!distanceInput || !helperText) {
          return;
        }

        if (manualCheckbox.checked) {
          distanceInput.readOnly = false;
          helperText.textContent = 'Distância manual ativada. Você pode editar o valor.';
          helperText.style.color = 'var(--text-light)';
        } else {
          updateDistance();
        }
      });
    }
  },
};
