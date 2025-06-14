document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links (optional, but good for UX)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Product Data for the home page
    const homePageProducts = [
        { id: 'shoe-011', name: 'AeroFlex Sneaker', price: 99.99, image: 'images/AeroFlex Sneaker.png', category: 'sneakers' },
        { id: 'shoe-012', name: 'Everest Trek Boot', price: 149.99, image: 'images/Everest Trek Boot.png', category: 'boots' },
        { id: 'shoe-013', name: 'Coastal Walk Sandal', price: 59.99, image: 'images/Coastal Walk Sandal.png', category: 'sandals' },
        { id: 'shoe-014', name: 'Executive Oxford', price: 129.99, image: 'images/Executive Oxford.png', category: 'formals' },
        { id: 'shoe-015', name: 'CloudRun X', price: 109.99, image: 'images/CloudRun X.png', category: 'sneakers' },
        { id: 'shoe-016', name: 'Urban Explorer Boot', price: 139.99, image: 'images/Urban Explorer Boot.png', category: 'boots' },
        { id: 'shoe-017', name: 'Urban Stride Sneaker', price: 89.99, image: 'images/Urban Stride Sneaker.png', category: 'sneakers' },
        { id: 'shoe-018', name: 'Classic Leather Boot', price: 119.99, image: 'images/Classic Leather Boot.png', category: 'boots' },
        { id: 'shoe-019', name: 'Summer Breeze Sandal', price: 49.99, image: 'images/Summer Breeze Sandal.png', category: 'sandals' },
        { id: 'shoe-020', name: 'Pro Runner X', price: 129.99, image: 'images/Pro Runner X.png', category: 'sneakers' }
    ];

    // Get the current page's filename
    const currentPage = window.location.pathname.split('/').pop();

    // --- Product Display Logic for home page ---
    if (currentPage === 'index.html') {
        const tabButtons = document.querySelectorAll('.tab-button');
        const productGrid = document.querySelector('.product-grid');

        function renderHomeProducts(category = 'all') {
            if (!productGrid) return;

            productGrid.innerHTML = '';

            const filteredProducts = category === 'all'
                ? homePageProducts
                : homePageProducts.filter(product => product.category === category);

            if (filteredProducts.length === 0) {
                productGrid.innerHTML = '<p class="no-products-message">No products found in this category.</p>';
                return;
            }

            filteredProducts.forEach(product => {
                const productItem = document.createElement('div');
                productItem.classList.add('product-item');
                productItem.dataset.id = product.id;
                productItem.dataset.category = product.category;

                productItem.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" onerror="this.src='images/default-product.jpg'">
                    <h4>${product.name}</h4>
                    <p>$${product.price.toFixed(2)}</p>
                    <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
                `;
                productGrid.appendChild(productItem);
            });

            // Attach event listeners to the new "Add to Cart" buttons
            attachAddToCartListeners();
        }

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                const category = button.dataset.category;
                renderHomeProducts(category);
            });
        });

        // Initial display for home page: show all products by default
        document.querySelector('.tab-button[data-category="all"]').click();
    }

    // Sticky Header functionality
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

    // --- Cart Functionality Integration (common to all pages with header) ---
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartIcon();
    }

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

    function addToCart(productId) {
        // Search in home page products first
        let productToAdd = homePageProducts.find(product => product.id === productId);
        
        // If not found in home page products, search in the other products data
        if (!productToAdd) {
            productToAdd = productsData.find(product => product.id === productId);
        }

        if (productToAdd) {
            const existingItem = cart.find(item => item.id === productId);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ 
                    id: productToAdd.id,
                    name: productToAdd.name,
                    price: productToAdd.price,
                    image: productToAdd.image,
                    category: productToAdd.category,
                    quantity: 1 
                });
            }
            saveCart();
            showAddToCartNotification(productToAdd.name);
        } else {
            console.error('Product not found:', productId);
            alert('Could not add product to cart.');
        }
    }

    function showAddToCartNotification(productName) {
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `
            <span>${productName} added to cart!</span>
            <a href="cart.html">View Cart</a>
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    function attachAddToCartListeners() {
        const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
        addToCartButtons.forEach(button => {
            button.removeEventListener('click', handleAddToCartClick); // Prevent duplicates
            button.addEventListener('click', handleAddToCartClick);
        });
    }

    function handleAddToCartClick(event) {
        const productId = event.target.dataset.id;
        addToCart(productId);
    }

    // Initial update of the cart icon when the page loads
    updateCartIcon();
});