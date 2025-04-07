document.addEventListener('DOMContentLoaded', function() {
    const categoryFilter = document.getElementById('categoryFilter');
    const priceFilter = document.getElementById('priceFilter');
    const brandFilter = document.getElementById('brandFilter');
    const resetButton = document.getElementById('resetFilters');
    const carBoxes = document.querySelectorAll('.flex-box');
    
    // Price ranges
    const PRICE_RANGES = {
        low: { min: 100000, max: 200000 },
        medium: { min: 200001, max: 300000 },
        high: { min: 300001, max: Infinity }
    };
    
    // Add event listeners
    if (categoryFilter) categoryFilter.addEventListener('change', filterCars);
    if (priceFilter) priceFilter.addEventListener('change', filterCars);
    if (brandFilter) brandFilter.addEventListener('change', filterCars);
    if (resetButton) resetButton.addEventListener('click', resetFilters);
    
    // Helper function to parse price strings
  ]
    // Normalize string for comparison
    function normalizeString(str) {
        return str ? str.trim().toLowerCase() : '';
    }
    
    // Main filtering function
    function filterCars() {
        const selectedCategory = normalizeString(categoryFilter ? categoryFilter.value : 'all');
        const selectedPrice = priceFilter ? priceFilter.value : 'all';
        const selectedBrand = normalizeString(brandFilter ? brandFilter.value : 'all');
        
        let hasVisibleItems = false;
        
        carBoxes.forEach(box => {
            // Get and normalize data attributes
            const category = normalizeString(box.dataset.category);
            const price = box.dataset.price ? parsePrice(box.dataset.price) : 0;
            const brand = normalizeString(box.dataset.brand);
            
            // Check category match
            const categoryMatch = selectedCategory === 'all' || 
                                category === selectedCategory;
            
            // Check price match
            let priceMatch = true;
            if (selectedPrice !== 'all') {
                const range = PRICE_RANGES[selectedPrice];
                priceMatch = price >= range.min && price <= range.max;
            }
            
            // Check brand match (case insensitive)
            const brandMatch = selectedBrand === 'all' || 
                             brand === selectedBrand;
            
            // Show/hide element
            const shouldShow = categoryMatch && priceMatch && brandMatch;
            box.style.display = shouldShow ? 'block' : 'none';
            
            if (shouldShow) hasVisibleItems = true;
        });
        
        updateNoResultsMessage(hasVisibleItems);
    }
    
    // Reset all filters
    function resetFilters(e) {
        e.preventDefault();
        if (categoryFilter) categoryFilter.value = 'all';
        if (priceFilter) priceFilter.value = 'all';
        if (brandFilter) brandFilter.value = 'all';
        filterCars();
    }
    
    // Show/hide no results message
    function updateNoResultsMessage(hasVisibleItems) {
        const noResultsMsg = document.getElementById('no-results-message');
        const flexContainer = document.querySelector('.flex-container');
        
        if (!hasVisibleItems) {
            if (!noResultsMsg && flexContainer) {
                const msg = document.createElement('p');
                msg.id = 'no-results-message';
                msg.textContent = 'No cars match your filters. Try different criteria.';
                msg.style.textAlign = 'center';
                msg.style.margin = '20px 0';
                msg.style.color = '#ff0000';
                flexContainer.appendChild(msg);
            }
        } else if (noResultsMsg) {
            noResultsMsg.remove();
        }
    }
    
    // Initialize filters on page load
    filterCars();
});


