// checkout.js

// Function to toggle payment fields visibility
function toggleFields() {
    let method = document.getElementById("payment-method").value;
    let cardFields = document.getElementById("card-fields");

    if (method === "visa" || method === "credit-card") {
        cardFields.classList.add("show");
        cardFields.classList.remove("hidden");
    } else {
        cardFields.classList.add("hidden");
        cardFields.classList.remove("show");
    }
}

// Function to initialize the checkout page
function initCheckout() {
    // Add event listener to payment method dropdown
    const paymentMethod = document.getElementById("payment-method");
    if (paymentMethod) {
        paymentMethod.addEventListener("change", toggleFields);
    }

    // You can add more initialization code here if needed
    // For example, form validation or cart total display
}

// Wait for DOM to be fully loaded before initializing
document.addEventListener("DOMContentLoaded", function() {
    initCheckout();
});