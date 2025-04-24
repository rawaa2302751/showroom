document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart from localStorage or empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // DOM elements
    const cartContainer = document.getElementById('cart-items-container');
    const subtotalElement = document.querySelector('.subtotal-amount');
    const totalElement = document.querySelector('.total-amount');
    const cartCountElement = document.querySelector('.cart-count');
    const continueShoppingBtn = document.querySelector('.cart-header a');

    // Initialize the page
    renderCart();
    setupEventListeners();

    function setupEventListeners() {
        // Event delegation for cart buttons
        cartContainer.addEventListener('click', function(e) {
            // Handle remove button
            if (e.target.classList.contains('remove-btn')) {
                const cartItem = e.target.closest('.cart-item');
                if (!cartItem) return;
                
                const itemId = cartItem.dataset.id;
                cartItem.classList.add('removing');
                
                setTimeout(() => {
                    cart = cart.filter(item => item.id !== itemId);
                    saveCart();
                    renderCart();
                }, 300);
                return;
            }
            
            // Handle quantity buttons
            if (e.target.classList.contains('quantity-btn')) {
                const cartItem = e.target.closest('.cart-item');
                if (!cartItem) return;
                
                const itemId = cartItem.dataset.id;
                const item = cart.find(item => item.id === itemId);
                if (!item) return;
                
                if (e.target.classList.contains('increase')) {
                    item.quantity = (item.quantity || 1) + 1;
                } else if (e.target.classList.contains('decrease')) {
                    item.quantity = Math.max(1, (item.quantity || 1) - 1);
                }
                
                saveCart();
                renderCart();
            }
        });
        
        // Continue shopping button
        if (continueShoppingBtn) {
            continueShoppingBtn.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = 'carlisting.html';
            });
        }
    }

    // Add item to cart (call this from product pages)
    window.addToCart = function(product) {
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity = (existingItem.quantity || 1) + 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                brand: product.brand || '',
                price: product.price,
                quantity: 1
            });
        }

        saveCart();
        renderCart();
        
        // Show visual feedback
        const cartBtn = document.querySelector('.cart-text-button');
        if (cartBtn) {
            cartBtn.classList.add('cart-bounce');
            setTimeout(() => cartBtn.classList.remove('cart-bounce'), 500);
        }
    }

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function renderCart() {
        if (!cartContainer) return;
        
        if (cart.length === 0) {
            cartContainer.innerHTML = '<div class="empty-cart-message">Your cart is empty</div>';
            updateTotal();
            updateCartCount();
            return;
        }

        let cartHTML = '';
        cart.forEach(item => {
            const quantity = item.quantity || 1;
            const itemTotal = item.price * quantity;

            cartHTML += `
                <div class="cart-item" data-id="${item.id}">
                    <div class="cart-item-details">
                        <h3>${item.name}</h3>
                        ${item.brand ? `<p>${item.brand}</p>` : ''}
                        <div class="quantity-controls">
                            <button class="quantity-btn decrease">-</button>
                            <span>Quantity: ${quantity}</span>
                            <button class="quantity-btn increase">+</button>
                        </div>
                    </div>
                    <div class="cart-item-price">
                        $${itemTotal.toFixed(2)}
                    </div>
                    <button class="remove-btn">✕</button>
                </div>
            `;
        });

        cartContainer.innerHTML = cartHTML;
        updateTotal();
        updateCartCount();
    }

    function updateTotal() {
        if (!subtotalElement || !totalElement) return;
        
        const subtotal = cart.reduce((sum, item) => {
            return sum + (item.price * (item.quantity || 1));
        }, 0);
        
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        totalElement.textContent = `$${subtotal.toFixed(2)}`;
    }

    function updateCartCount() {
        if (!cartCountElement) return;
        
        const count = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
        cartCountElement.textContent = count;
        
        // Update cart button in navbar if it exists
        const navCartCount = document.querySelector('.cart-text-button .count');
        if (navCartCount) {
            navCartCount.textContent = count;
        }
    }
});
