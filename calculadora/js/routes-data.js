/**
 * ============================================================================
 * RouteDB - Brazilian Routes Database
 * ============================================================================
 *
 * Global object containing a comprehensive database of popular routes
 * between major Brazilian cities with distance information.
 *
 * Structure:
 * - routes: Array of route objects with origin, destination, and distance
 * * Usage:
 * - RouteDB.getAllCities() - Get all unique cities
 * - RouteDB.findDistance(origin, destination) - Get distance between cities
 */

const RouteDB = {
  /**
   * Array of route objects
   * Each route contains:
   * - origin: String (city name with state abbreviation, e.g., "São Paulo, SP")
   * - destination: String (city name with state abbreviation)
   * - distanceKm: Number (distance in kilometers)
   */
  routes: [
    // Southeast Region - Major connections
    { origin: 'São Paulo, SP', destination: 'Rio de Janeiro, RJ', distanceKm: 430 },
    { origin: 'São Paulo, SP', destination: 'Belo Horizonte, MG', distanceKm: 586 },
    { origin: 'São Paulo, SP', destination: 'Campinas, SP', distanceKm: 95 },
    { origin: 'São Paulo, SP', destination: 'Santos, SP', distanceKm: 70 },
    { origin: 'São Paulo, SP', destination: 'Sorocaba, SP', distanceKm: 108 },
    { origin: 'Rio de Janeiro, RJ', destination: 'Niterói, RJ', distanceKm: 13 },
    { origin: 'Rio de Janeiro, RJ', destination: 'Petrópolis, RJ', distanceKm: 68 },
    { origin: 'Rio de Janeiro, RJ', destination: 'Angra dos Reis, RJ', distanceKm: 165 },
    { origin: 'Belo Horizonte, MG', destination: 'Ouro Preto, MG', distanceKm: 100 },
    { origin: 'Belo Horizonte, MG', destination: 'Contagem, MG', distanceKm: 38 },
    { origin: 'Belo Horizonte, MG', destination: 'Mariana, MG', distanceKm: 120 },
    
    // Central-West Region
    { origin: 'São Paulo, SP', destination: 'Brasília, DF', distanceKm: 1148 },
    { origin: 'Brasília, DF', destination: 'Goiânia, GO', distanceKm: 210 },
    { origin: 'Goiânia, GO', destination: 'Anápolis, GO', distanceKm: 55 },
    { origin: 'Cuiabá, MT', destination: 'Várzea Grande, MT', distanceKm: 30 },
    
    // Northeast Region
    { origin: 'Salvador, BA', destination: 'Feira de Santana, BA', distanceKm: 110 },
    { origin: 'Salvador, BA', destination: 'Ilhéus, BA', distanceKm: 470 },
    { origin: 'Recife, PE', destination: 'Olinda, PE', distanceKm: 14 },
    { origin: 'Recife, PE', destination: 'Caruaru, PE', distanceKm: 135 },
    { origin: 'Fortaleza, CE', destination: 'Caucaia, CE', distanceKm: 30 },
    { origin: 'Natal, RN', destination: 'Parnamirim, RN', distanceKm: 20 },
    { origin: 'São Luís, MA', destination: 'Timon, MA', distanceKm: 45 },
    { origin: 'Maceió, AL', destination: 'Rio Largo, AL', distanceKm: 28 },
    { origin: 'Teresina, PI', destination: 'Timon, MA', distanceKm: 65 },
    
    // North Region
    { origin: 'Manaus, AM', destination: 'Itacoatiara, AM', distanceKm: 176 },
    { origin: 'Belém, PA', destination: 'Ananindeua, PA', distanceKm: 30 },
    { origin: 'Belém, PA', destination: 'Marabá, PA', distanceKm: 480 },
    { origin: 'Porto Velho, RO', destination: 'Ariquemes, RO', distanceKm: 220 },
    { origin: 'Boa Vista, RR', destination: 'Caracaraí, RR', distanceKm: 220 },
    
    // South Region
    { origin: 'Curitiba, PR', destination: 'Londrina, PR', distanceKm: 360 },
    { origin: 'Curitiba, PR', destination: 'Cascavel, PR', distanceKm: 600 },
    { origin: 'Porto Alegre, RS', destination: 'Canoas, RS', distanceKm: 20 },
    { origin: 'Porto Alegre, RS', destination: 'Gramado, RS', distanceKm: 130 },
    { origin: 'Florianópolis, SC', destination: 'Blumenau, SC', distanceKm: 220 },
    { origin: 'Florianópolis, SC', destination: 'Joinville, SC', distanceKm: 300 }
  ],

  /**
   * Get all unique city names from the routes database
   * @returns {Array<string>} Sorted array of unique city names with state abbreviations
   */
  getAllCities: function () {
    const cities = new Set();

    // Extract all origin and destination cities
    this.routes.forEach(route => {
      cities.add(route.origin);
      cities.add(route.destination);
    });

    // Convert Set to Array and sort alphabetically
    return Array.from(cities).sort();
  },

  /**
   * Find the distance between two cities
   * @param {string} origin - Origin city name (e.g., "São Paulo, SP")
   * @param {string} destination - Destination city name (e.g., "Rio de Janeiro, RJ")
   * @returns {number|null} Distance in kilometers if found, null otherwise
   */
  findDistance: function (origin, destination) {
    // Normalize input: trim whitespace and convert to lowercase
    const normalizedOrigin = (origin || '').trim().toLowerCase();
    const normalizedDestination = (destination || '').trim().toLowerCase();

    // Search through routes in both directions
    for (const route of this.routes) {
      const routeOrigin = route.origin.toLowerCase();
      const routeDestination = route.destination.toLowerCase();

      // Check origin -> destination direction
      if (routeOrigin === normalizedOrigin && routeDestination === normalizedDestination) {
        return route.distanceKm;
      }

      // Check destination -> origin direction (reverse)
      if (routeOrigin === normalizedDestination && routeDestination === normalizedOrigin) {
        return route.distanceKm;
      }
    }

    // No route found
    return null;
  },
};