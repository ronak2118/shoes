document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('productGrid');
    const productItems = document.querySelectorAll('.product-item');
    const categoryLinks = document.querySelectorAll('.filter-categories a');
    const priceRangeSlider = document.getElementById('priceRange');
    const priceValueSpan = document.getElementById('priceValue');
    const ratingRadios = document.querySelectorAll('input[name="rating"]');
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    // Filter Functionality
    function applyFilters() {
        const selectedCategory = document.querySelector('.filter-categories a.active')?.dataset.filter || 'all';
        const maxPrice = parseFloat(priceRangeSlider.value);
        const minRating = parseFloat(document.querySelector('input[name="rating"]:checked')?.dataset.minRating || 0);

        productItems.forEach(item => {
            const itemCategory = item.dataset.category;
            const itemPrice = parseFloat(item.dataset.price);
            const itemRating = parseFloat(item.dataset.rating);

            const categoryMatch = selectedCategory === 'all' || itemCategory === selectedCategory;
            const priceMatch = itemPrice <= maxPrice;
            const ratingMatch = itemRating >= minRating;

            if (categoryMatch && priceMatch && ratingMatch) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    // Category Filter
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            categoryLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            applyFilters();
        });
    });

    // Price Range Filter
    priceRangeSlider.addEventListener('input', () => {
        priceValueSpan.textContent = priceRangeSlider.value;
        applyFilters();
    });

    // Rating Filter
    ratingRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            applyFilters();
        });
    });

    // Initialize filters on page load
    priceValueSpan.textContent = priceRangeSlider.value;
    applyFilters();

    // Add to Cart Functionality
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productItem = e.target.closest('.product-item');
            const productId = button.dataset.productId;
            const productName = button.dataset.name;
            const productPrice = parseFloat(button.dataset.price);
            const productImage = productItem.querySelector('img').src;

            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            const existingProductIndex = cart.findIndex(item => item.id === productId);

            if (existingProductIndex > -1) {
                cart[existingProductIndex].quantity += 1;
            } else {
                cart.push({
                    id: productId,
                    name: productName,
                    price: productPrice,
                    image: productImage,
                    quantity: 1
                });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            alert(`${productName} added to cart!`);
            updateCartIcon();
        });
    });

    // Update Cart Icon Count
    function updateCartIcon() {
        const cartIcon = document.querySelector('.main-nav ul li a[href="cart.html"] .fa-shopping-cart');
        if (cartIcon) {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
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

    // Initialize cart icon on page load
    updateCartIcon();
});