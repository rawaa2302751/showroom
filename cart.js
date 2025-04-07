// Function to handle adding items to cart
function addToCart(event) {
    event.preventDefault();
    event.stopPropagation();

    const button = event.target.closest('.add-to-cart');
    if (!button) return;

    const carName = button.getAttribute('data-name');
    const carPrice = parseFloat(button.getAttribute('data-price'));
    const carId = button.getAttribute('data-id') || carName.toLowerCase().replace(/\s+/g, '-');

    // Retrieve existing cart or start new one
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex(item => item.id === carId);
    
    if (existingItemIndex !== -1) {
        // Update quantity if item exists
        cart[existingItemIndex].quantity = (cart[existingItemIndex].quantity || 1) + 1;
    } else {
        // Add new item to cart
        cart.push({
            id: carId,
            name: carName,
            price: carPrice,
            quantity: 1
        });
    }

    // Save updated cart
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count display
    updateCartCount();
    
    // Optional: Show added notification
    alert(`${carName} added to cart!`);
}

// Update cart count in navbar
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const cartCountElement = document.getElementById('cart-count');
    
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }
}

// Attach event listeners on page load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize cart count
    updateCartCount();
    
    // Attach click handlers to all add-to-cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });
});
const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const price = urlParams.get('price');

    // Display the car info
    if (name && price) {
        document.body.innerHTML += `<h2>Selected Car: ${decodeURIComponent(name)}</h2>`;
        document.body.innerHTML += `<p>Price: $${decodeURIComponent(price)}</p>`;
    } else {
        document.body.innerHTML += `<p>No car selected.</p>`;
    }