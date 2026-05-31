/**
 * ============================================================================
 * Calculator - CO2 Emission and Carbon Credit Calculations
 * ============================================================================
 *
 * Global object containing calculation methods for:
 * - CO2 emissions based on distance and transport mode
 * - Comparison between different transport modes
 * - Carbon credit calculations
 * - Credit price estimation
 */

const Calculator = {
  /**
   * Calculate CO2 emissions for a given distance and transport mode.
   * 
   * Formula: emissions = distance (km) × emission factor (kg CO2/km)
   * 
   * @param {number} distanceKm - Distance traveled in kilometers
   * @param {string} transportMode - Transport mode key (bicycle, car, bus, truck)
   * @returns {number} CO2 emissions in kilograms, rounded to 2 decimal places
   */
  calculateEmission: function (distanceKm, transportMode) {
    const emissionFactor = CONFIG.EMISSION_FACTORS[transportMode];

    if (typeof emissionFactor === 'undefined') {
      return 0;
    }

    const emission = distanceKm * emissionFactor;
    return Math.round(emission * 100) / 100;
  },

  /**
   * Calculate and compare emissions for all transport modes.
   * 
   * Returns an array with emissions for each mode, including:
   * - Absolute emission in kg CO2
   * - Percentage difference compared to car (baseline)
   * - Sorted from lowest to highest emission
   * 
   * @param {number} distanceKm - Distance traveled in kilometers
   * @returns {Array<Object>} Array of objects with structure:
   *          { mode: 'car', emission: 12.5, percentageVsCar: 100 }
   *          Sorted by emission (lowest first)
   */
  calculateAllModes: function (distanceKm) {
    const results = [];

    // Calculate car emission as baseline for comparison
    const carEmission = this.calculateEmission(distanceKm, 'car');

    // Calculate emissions for each transport mode
    for (const mode in CONFIG.EMISSION_FACTORS) {
      const emission = this.calculateEmission(distanceKm, mode);

      // Calculate percentage vs car baseline
      const percentageVsCar = carEmission > 0 ? (emission / carEmission) * 100 : 0;

      results.push({
        mode: mode,
        emission: emission,
        percentageVsCar: Math.round(percentageVsCar * 100) / 100,
      });
    }

    // Sort by emission (lowest first)
    results.sort((a, b) => a.emission - b.emission);

    return results;
  },

  /**
   * Calculate CO2 savings by comparing two emission values.
   * 
   * Useful for showing how much an alternative transport mode
   * would save compared to a baseline (usually car).
   * 
   * @param {number} emission - Actual emission in kg CO2
   * @param {number} baselineEmission - Baseline emission to compare against (kg CO2)
   * @returns {Object} Object with structure:
   *          { savedKg: 5.5, percentage: 45 }
   *          Where percentage = (saved / baseline) * 100
   */
  calculateSavings: function (baselineEmission, emission) {
    if (baselineEmission <= 0) {
      return { savedKg: 0, percentage: 0 };
    }

    const savedKg = baselineEmission - emission;
    const percentage = (savedKg / baselineEmission) * 100;

    return {
      savedKg: Math.round(savedKg * 100) / 100,
      percentage: Math.round(percentage * 100) / 100,
    };
  },

  /**
   * Convert CO2 emissions to carbon credits.
   * 
   * Formula: credits = emission / KG_PER_CREDIT
   * 
   * One credit typically represents 1 ton (1000 kg) of CO2 equivalent.
   * This can be used for carbon offset programs.
   * 
   * @param {number} emissionKg - CO2 emissions in kilograms
   * @returns {number} Number of carbon credits, rounded to 4 decimal places
   */
 calculateCarbonCredits: function (emissionKg) {
    // 1. Calcula os créditos
    const credits = emissionKg / CONFIG.CARBON_CREDIT.KG_PER_CREDIT;
    const roundedCredits = Math.round(credits * 10000) / 10000;

    // 2. Estima os preços reaproveitando a função existente
    const priceData = this.estimateCreditPrice(roundedCredits);

    // 3. Retorna o pacote completo para o UI
    return {
      credits: roundedCredits,
      price: priceData
    };
  },

  /**
   * Estimate the price range for carbon credits in Brazilian Real (BRL).
   * 
   * Based on market conditions, carbon credits have a minimum and maximum
   * price. This calculates the estimated value range.
   * 
   * Formula:
   * - minPrice = credits × PRICE_MIN_BRL
   * - maxPrice = credits × PRICE_MAX_BRL
   * - average = (minPrice + maxPrice) / 2
   * 
   * @param {number} credits - Number of carbon credits
   * @returns {Object} Object with structure:
   *          { min: 50.5, max: 150.5, average: 100.5 }
   *          All values in BRL, rounded to 2 decimal places
   */
  estimateCreditPrice: function (credits) {
    const minPrice = credits * CONFIG.CARBON_CREDIT.PRICE_MIN_BRL;
    const maxPrice = credits * CONFIG.CARBON_CREDIT.PRICE_MAX_BRL;
    const average = (minPrice + maxPrice) / 2;

    return {
      min: Math.round(minPrice * 100) / 100,
      max: Math.round(maxPrice * 100) / 100,
      average: Math.round(average * 100) / 100,
    };
  }
}
