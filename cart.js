document.addEventListener('DOMContentLoaded', () => {
    // Sticky Header
    const header = document.querySelector('.main-header');
    const headerOffset = header.offsetTop;

    function stickyHeader() {
        if (window.pageYOffset > headerOffset) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    }
    window.addEventListener('scroll', stickyHeader);

    // Cart Elements
    const cartItemsContainer = document.getElementById('cartItems');
    const cartSubtotalSpan = document.getElementById('cartSubtotal');
    const cartShippingSpan = document.getElementById('cartShipping');
    const cartTaxSpan = document.getElementById('cartTax');
    const cartTotalSpan = document.getElementById('cartTotal');
    const clearCartBtn = document.querySelector('.clear-cart-btn');
    const checkoutBtn = document.querySelector('.checkout-btn');
    const emptyCartMessage = document.querySelector('.empty-cart-message');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const SHIPPING_COST = 50.00;
    const TAX_RATE = 0.13;

    // Save Cart to LocalStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
        updateCartIcon();
    }

    // Update Cart Icon Count
    function updateCartIcon() {
        const cartIcon = document.querySelector('.main-nav ul li a[href="cart.html"] .fa-shopping-cart');
        if (cartIcon) {
            const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
            let badge = cartIcon.nextElementSibling;
            
            if (!badge || !badge.classList.contains('cart-badge')) {
                badge = document.createElement('span');
                badge.classList.add('cart-badge');
                cartIcon.parentNode.appendChild(badge);
            }
            
            badge.textContent = itemCount > 0 ? itemCount : '';
            badge.style.display = itemCount > 0 ? 'inline-block' : 'none';
        }
    }

    // Render Cart Items
    function renderCartItems() {
        cartItemsContainer.innerHTML = '';

        if (cart.length === 0) {
            emptyCartMessage.style.display = 'block';
        } else {
            emptyCartMessage.style.display = 'none';

            cart.forEach(item => {
                const cartItemDiv = document.createElement('div');
                cartItemDiv.classList.add('cart-item');
                cartItemDiv.dataset.id = item.id;

                cartItemDiv.innerHTML = `
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}" onerror="this.src='images/default-product.jpg'">
                    </div>
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p class="price">$${item.price.toFixed(2)}</p>
                    </div>
                    <div class="cart-item-quantity">
                        <button class="quantity-decrease" aria-label="Decrease quantity">-</button>
                        <input type="number" value="${item.quantity}" min="1" data-id="${item.id}">
                        <button class="quantity-increase" aria-label="Increase quantity">+</button>
                    </div>
                    <button class="cart-item-remove" data-id="${item.id}" aria-label="Remove item">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                `;
                cartItemsContainer.appendChild(cartItemDiv);
            });
        }
    }

    // Calculate Cart Summary
    function calculateCartSummary() {
        let subtotal = 0;
        cart.forEach(item => {
            subtotal += item.price * item.quantity;
        });

        const shipping = subtotal > 0 ? SHIPPING_COST : 0;
        const tax = subtotal * TAX_RATE;
        const total = subtotal + shipping + tax;

        cartSubtotalSpan.textContent = `$${subtotal.toFixed(2)}`;
        cartShippingSpan.textContent = `$${shipping.toFixed(2)}`;
        cartTaxSpan.textContent = `$${tax.toFixed(2)}`;
        cartTotalSpan.textContent = `$${total.toFixed(2)}`;
    }

    // Update Cart Display
    function updateCartDisplay() {
        renderCartItems();
        calculateCartSummary();
    }

    // Handle Quantity Changes
    function handleQuantityChange(event) {
        let inputElement;
        let productId;
        let change = 0;

        if (event.target.classList.contains('quantity-increase')) {
            inputElement = event.target.previousElementSibling;
            productId = inputElement.dataset.id;
            change = 1;
        } else if (event.target.classList.contains('quantity-decrease')) {
            inputElement = event.target.nextElementSibling;
            productId = inputElement.dataset.id;
            change = -1;
        } else if (event.target.tagName === 'INPUT' && event.target.type === 'number') {
            inputElement = event.target;
            productId = inputElement.dataset.id;
            const newQuantity = parseInt(inputElement.value);
            const currentItem = cart.find(item => item.id === productId);
            
            if (currentItem && newQuantity >= 1) {
                currentItem.quantity = newQuantity;
                saveCart();
                return;
            } else if (currentItem && newQuantity < 1) {
                removeFromCart(productId);
                return;
            }
        }

        const itemToUpdate = cart.find(item => item.id === productId);
        if (itemToUpdate) {
            itemToUpdate.quantity += change;
            if (itemToUpdate.quantity < 1) {
                removeFromCart(productId);
            } else {
                saveCart();
            }
        }
    }

    // Remove Item from Cart
    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        saveCart();
    }

    // Handle Remove Item
    function handleRemoveItem(event) {
        if (event.target.classList.contains('cart-item-remove') || 
            event.target.closest('.cart-item-remove')) {
            const removeButton = event.target.classList.contains('cart-item-remove') 
                ? event.target 
                : event.target.closest('.cart-item-remove');
            const productId = removeButton.dataset.id;
            removeFromCart(productId);
        }
    }

    // Clear Cart
    function handleClearCart() {
        if (cart.length === 0) {
            alert('Your cart is already empty.');
            return;
        }
        if (confirm('Are you sure you want to clear your entire cart? This action cannot be undone.')) {
            cart = [];
            saveCart();
            alert('Your cart has been cleared.');
        }
    }

    // Handle Checkout
    function handleCheckout() {
        if (cart.length === 0) {
            alert('Your cart is empty. Please add items before checking out.');
            return;
        }
        window.location.href = 'checkout.html';
    }

    // Event Listeners
    cartItemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('quantity-increase') || 
            e.target.classList.contains('quantity-decrease')) {
            handleQuantityChange(e);
        } else if (e.target.classList.contains('cart-item-remove') || 
                  e.target.closest('.cart-item-remove')) {
            handleRemoveItem(e);
        }
    });

    cartItemsContainer.addEventListener('change', (e) => {
        if (e.target.tagName === 'INPUT' && e.target.type === 'number') {
            handleQuantityChange(e);
        }
    });

    clearCartBtn.addEventListener('click', handleClearCart);
    checkoutBtn.addEventListener('click', handleCheckout);

    // Initial render
    updateCartDisplay();
    updateCartIcon();
});