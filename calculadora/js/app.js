/**
 * js/app.js
 * ============================================================================
 * CO2 Emission Calculator initialization and form event handling.
 * ============================================================================
 */

(function () {
    // Ensure the DOM is fully loaded before executing the logic
    document.addEventListener("DOMContentLoaded", () => {
        initializeApp();
    });

    /**
     * INITIALIZATION (When DOM is ready)
     */
    function initializeApp() {
        // 1. Populate the cities autocomplete (datalist with id "cities-list")
        CONFIG.populateDatalist();

        // 2. Set up automatic distance filling
        CONFIG.setupDistanceAutoFill();

        // 3. Get the form element by its ID
        const calculatorForm = document.getElementById("calculator-form");

        if (calculatorForm) {
            // 4. Add submit event listener to the form
            calculatorForm.addEventListener("submit", handleFormSubmit);
        }

        // 5. Log to console that the system is ready
        console.log("Calculator initialized successfully");
    }

    /**
     * FORM SUBMIT HANDLER
     */
    function handleFormSubmit(event) {
        // 1. Prevent default form submission (page reload)
        event.preventDefault();

        // 2. Get all form values
      
        const originInput = document.getElementById("origin");
        const origin = originInput?.value.trim();
        const destination = document.getElementById("destination")?.value.trim();
        const distanceText = document.getElementById("distance")?.value.trim();
        
        // Capture the value of the checked transport radio button
        const selectedTransportRadio = event.target.querySelector('input[name="transport"]:checked');
        const transportMode = selectedTransportRadio ? selectedTransportRadio.value : null;

        // Convert the distance string to a floating-point number
        const distance = parseFloat(distanceText);

        // 3. Validate inputs
        // Check if all mandatory fields are filled
        if (!origin || !destination || !distanceText || !transportMode) {
            alert("Rota não encontrada. Marque para inserir distância manualmente.");
            return; 
        }

        // Check if distance is a valid number greater than zero
        if (isNaN(distance) || distance <= 0) {
            alert("Por favor, insira uma distância válida maior que 0.");
            return; 
        }

        // 4. Get the submit button element
        const submitButton = event.target.querySelector('.calculator__submit-button');

        // 5. Call UI.showLoading(button) to show loading state
        UI.showLoading(submitButton);

        // 6. Hide previous results sections to prepare for new rendering
        // Using the exact IDs declared in your HTML file
        UI.hideElement("result");
        UI.hideElement("comparison");
        UI.hideElement("carbon-credits");

        // 7. Use setTimeout with 1500ms delay to simulate processing
        setTimeout(() => {
            // Try-catch block for error handling during processing
            try {
                // * Calculate emission for selected mode using Calculator
                const selectedModeEmission = Calculator.calculateEmission(distance, transportMode);

                // * Calculate car emission as baseline
                const carBaselineEmission = Calculator.calculateEmission(distance, "car");

                // * Calculate savings compared to car
                // Passing baseline first, then current emission (as adjusted in calculator.js)
                const carbonSavings = Calculator.calculateSavings(carBaselineEmission, selectedModeEmission);

                // * Calculate all modes comparison
                const allModesComparison = Calculator.calculateAllModes(distance);

                // * Calculate carbon credits and price estimate
                // Calculated based on the generated emission, not the savings
                const creditsEstimate = Calculator.calculateCarbonCredits(selectedModeEmission);

                // * Build data objects for rendering via UI.js
                const resultsData = {
                    origin,
                    destination,
                    distance,
                    mode: transportMode, // Key matches UI.js expectations
                    emission: selectedModeEmission,
                    savings: carbonSavings
                };

                // * Call UI.renderResults() and set innerHTML of result-content
                const resultsContainer = document.getElementById("result-content");
                if (resultsContainer) {
                    resultsContainer.innerHTML = UI.renderResults(resultsData);
                }

                // * Call UI.renderComparison() and set innerHTML of comparison-content
                const comparisonContainer = document.getElementById("comparison-content");
                if (comparisonContainer) {
                    // Pass data and selected mode to highlight the correct bar
                    comparisonContainer.innerHTML = UI.renderComparison(allModesComparison, transportMode);
                }

                // * Call UI.renderCarbonCredits() and set innerHTML of carbon-credits-content
                const creditsContainer = document.getElementById("carbon-credits-content");
                if (creditsContainer) {
                    creditsContainer.innerHTML = UI.renderCarbonCredits(creditsEstimate);
                }

                // * Show all three sections using UI.showElement()
                UI.showElement("result");
                UI.showElement("comparison");
                UI.showElement("carbon-credits");

                // * Scroll to results section using UI.scrollToElement()
                UI.scrollToElement("result");

                // * Call UI.hideLoading(button)
                UI.hideLoading(submitButton);

            } catch (error) {
                // Catch any errors:
                // * Log error to console
                console.error("Error processing emission calculations:", error);
                
                // * Show user-friendly alert
                alert("Ocorreu um erro inesperado ao calcular as emissões. Por favor, tente novamente.");
                
                // * Call UI.hideLoading(button)
                UI.hideLoading(submitButton);
            }

        }, 1500); // 1500ms delay
    }
})();