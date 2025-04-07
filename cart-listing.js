document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // FILTERING FUNCTIONALITY
    // ======================
    const categoryFilter = document.getElementById('categoryFilter');
    const priceFilter = document.getElementById('priceFilter');
    const brandFilter = document.getElementById('brandFilter');
    const resetButton = document.getElementById('resetFilters');
    const carBoxes = document.querySelectorAll('.flex-box');
    
    const PRICE_RANGES = {
        low: { min: 100000, max: 200000 },
        medium: { min: 200001, max: 300000 },
        high: { min: 300001, max: Infinity }
    };

    // Initialize filters
    if (categoryFilter) categoryFilter.addEventListener('change', filterCars);
    if (priceFilter) priceFilter.addEventListener('change', filterCars);
    if (brandFilter) brandFilter.addEventListener('change', filterCars);
    if (resetButton) resetButton.addEventListener('click', resetFilters);
    filterCars();

    // =================
    // CART FUNCTIONALITY
    // =================
    initializeCartButtons();
    updateCartCount();

    // ==============
    // CORE FUNCTIONS
    // ==============
    
    // FILTERING FUNCTIONS
    function parsePrice(priceString) {
        return parseInt(priceString.replace(/[^0-9]/g, ''));
    }
    
    function filterCars() {
        const selectedCategory = categoryFilter.value.toLowerCase();
        const selectedPrice = priceFilter.value;
        const selectedBrand = brandFilter.value.toLowerCase();
        
        let hasVisibleItems = false;
        
        carBoxes.forEach(box => {
            const category = box.dataset.category.toLowerCase();
            const price = parsePrice(box.dataset.price);
            const brand = box.dataset.brand.toLowerCase();
            
            const categoryMatch = selectedCategory === 'all' || category === selectedCategory;
            let priceMatch = true;
            if (selectedPrice !== 'all') {
                const range = PRICE_RANGES[selectedPrice];
                priceMatch = price >= range.min && price <= range.max;
            }
            const brandMatch = selectedBrand === 'all' || brand === selectedBrand;
            
            const shouldShow = categoryMatch && priceMatch && brandMatch;
            box.style.display = shouldShow ? 'block' : 'none';
            
            if (shouldShow) hasVisibleItems = true;
        });
        
        updateNoResultsMessage(hasVisibleItems);
    }
    
    function resetFilters(e) {
        e.preventDefault();
        categoryFilter.value = 'all';
        priceFilter.value = 'all';
        brandFilter.value = 'all';
        filterCars();
    }
    
    function updateNoResultsMessage(hasVisibleItems) {
        const noResultsMsg = document.getElementById('no-results-message');
        const flexContainer = document.querySelector('.flex-container');
        
        if (!hasVisibleItems && flexContainer && !noResultsMsg) {
            const msg = document.createElement('p');
            msg.id = 'no-results-message';
            msg.textContent = 'No cars match your filters. Try different criteria.';
            msg.style.textAlign = 'center';
            msg.style.margin = '20px 0';
            msg.style.color = '#ff0000';
            flexContainer.appendChild(msg);
        } else if (noResultsMsg) {
            noResultsMsg.remove();
        }
    }

    // CART FUNCTIONS
    function initializeCartButtons() {
        const cartButtons = document.querySelectorAll('.add-to-cart');
        
        cartButtons.forEach(button => {
            // Remove any existing click handlers to prevent duplicates
            button.replaceWith(button.cloneNode(true));
            
            // Get fresh reference after clone
            const newButton = button.parentElement.querySelector('.add-to-cart');
            
            // Add click handler
            newButton.addEventListener('click', addToCartAndRedirect);
            
            // Ensure data attributes exist
            if (!newButton.hasAttribute('data-name')) {
                const carName = newButton.closest('.flex-box').querySelector('h3').textContent;
                newButton.setAttribute('data-name', carName);
            }
            if (!newButton.hasAttribute('data-price')) {
                const priceText = newButton.closest('.flex-box').querySelector('p').textContent;
                const priceValue = priceText.replace(/[^0-9.]/g, '');
                newButton.setAttribute('data-price', priceValue);
            }
            if (!newButton.hasAttribute('data-brand')) {
                const brand = newButton.closest('.flex-box').dataset.brand;
                newButton.setAttribute('data-brand', brand);
            }
        });
    }
    function addToCartAndRedirecttest() {
       
    alert("JavaScript is successfully connected and working!");
        //window.location.href = 'cart.html'; // Redirect to cart page
    }
    function addToCartAndRedirect(event) {
        event.preventDefault();
        event.stopPropagation();
        
        const button = event.target.closest('.add-to-cart');
        if (!button) return;
        
        const carName = button.getAttribute('data-name');
        const carPrice = parseFloat(button.getAttribute('data-price'));
        const carBrand = button.getAttribute('data-brand');
        const carId = carName.toLowerCase().replace(/\s+/g, '-');

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItemIndex = cart.findIndex(item => item.id === carId);
        
        if (existingItemIndex !== -1) {
            cart[existingItemIndex].quantity += 1;
        } else {
            cart.push({
                id: carId,
                name: carName,
                price: carPrice,
                brand: carBrand,
                quantity: 1,
                addedAt: new Date().toISOString()
            });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        window.location.href = 'cart.html'; // Redirect to cart page
    }

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        const cartCountElements = document.querySelectorAll('#cart-count, .cart-count');
        
        cartCountElements.forEach(element => {
            element.textContent = totalItems;
        });
    }
});