// Static cart data (replace with your actual products)
const staticCartData = [
    { id: '1', name: 'Porsche 911 Turbo', brand: 'Porsche', price: 180000, quantity: 1 },
    { id: '2', name: 'McLaren 720S', brand: 'McLaren', price: 250000, quantity: 2 },
    { id: '3', name: 'Ferrari SF90', brand: 'Ferrari', price: 400000, quantity: 1 }
];

// Function to load cart from static array
function loadCartFromStaticData() {
    // Clear existing cart
    cart = [];
    
    // Add items from static data
    staticCartData.forEach(item => {
        cart.push({
            id: item.id,
            name: item.name,
            brand: item.brand,
            price: item.price,
            quantity: item.quantity || 1  // Default to 1 if quantity not specified
        });
    });
    
    // Render the updated cart
    renderCart();
}

// Global cart variable
let cart = [];

// Main cart rendering function
function renderCart() {

    window.location.href = cart.html;
    alert("hello");

    const cartContainer = document.querySelector('.cart-items');
    const subtotalElement = document.querySelector('.summary-details p:last-child');
    const totalElement = document.querySelector('.summary-details:last-child p:last-child');
    
    if (cart.length === 0) {
        if (cartContainer) cartContainer.innerHTML = '<div class="empty-cart-message">Your cart is empty</div>';
        if (subtotalElement) subtotalElement.textContent = '$0';
        if (totalElement) totalElement.textContent = '$0';
        updateCartCount();
        return;
    }

    let cartHTML = '';
    let subtotal = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        cartHTML += `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-image">
                    <img src="images/${item.id}.jpg" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p class="brand">${item.brand}</p>
                    <div class="quantity-controls">
                        <button class="quantity-btn decrease" data-id="${item.id}">−</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn increase" data-id="${item.id}">+</button>
                    </div>
                    <p class="price">$${item.price.toLocaleString()}</p>
                </div>
                <div class="cart-item-total">
                    $${itemTotal.toLocaleString()}
                </div>
                <button class="remove-item" data-id="${item.id}">
                    <svg viewBox="0 0 24 24"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/></svg>
                </button>
            </div>
        `;
    });

    if (cartContainer) cartContainer.innerHTML = cartHTML;
    if (subtotalElement) subtotalElement.textContent = `$${subtotal.toLocaleString()}`;
    if (totalElement) totalElement.textContent = `$${subtotal.toLocaleString()}`;
    
    setupCartEventListeners();
    updateCartCount();
}

// Set up event listeners for cart interactions
function setupCartEventListeners() {
    // Remove items
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const itemId = e.currentTarget.dataset.id;
            cart = cart.filter(item => item.id !== itemId);
            renderCart();
        });
    });
    
    // Increase quantity
    document.querySelectorAll('.quantity-btn.increase').forEach(button => {
        button.addEventListener('click', (e) => {
            const itemId = e.currentTarget.dataset.id;
            const item = cart.find(item => item.id === itemId);
            if (item) {
                item.quantity++;
                renderCart();
            }
        });
    });
    
    // Decrease quantity
    document.querySelectorAll('.quantity-btn.decrease').forEach(button => {
        button.addEventListener('click', (e) => {
            const itemId = e.currentTarget.dataset.id;
            const item = cart.find(item => item.id === itemId);
            if (item && item.quantity > 1) {
                item.quantity--;
                renderCart();
            }
        });
    });
}

// Update cart count in header/navigation
function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
}

// Initialize the cart when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadCartFromStaticData();
});