document.addEventListener('DOMContentLoaded', () => {
    // Sticky Header functionality (reusing)
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

    // --- Checkout Form Logic ---
    const checkoutForm = document.getElementById('checkoutForm');
    const stepIndicators = document.querySelectorAll('.step-indicator');
    const formSteps = document.querySelectorAll('.form-step');
    const nextButtons = document.querySelectorAll('.next-step');
    const prevButtons = document.querySelectorAll('.prev-step');
    const paymentMethodRadios = document.querySelectorAll('input[name="paymentMethod"]');

    // Payment details containers
    const paymentDetailsDivs = {
        creditCard: document.getElementById('creditCardDetails'),
        esewa: document.getElementById('esewaDetails'),
        fonepay: document.getElementById('fonepayDetails'),
        paypal: document.getElementById('paypalDetails') // Added PayPal details div
    };

    let currentStep = 1;

    const SHIPPING_COST = 50.00; // Keep consistent with cart.js
    const TAX_RATE = 0.13; // Keep consistent with cart.js

    // Get CSS variables for dynamic styling (like error borders)
    const style = getComputedStyle(document.body);
    const var_error_color = style.getPropertyValue('--error-color').trim();
    const var_border_color = style.getPropertyValue('--border-color').trim();

    // Helper function to set validation border
    function setValidationBorder(inputElement, isValid) {
        if (isValid) {
            inputElement.style.borderColor = var_border_color;
        } else {
            inputElement.style.borderColor = var_error_color;
        }
    }

    // Validation functions
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function isValidPhoneNumber(phone) {
        // Nepali phone numbers are typically 10 digits starting with 98 or 97
        // For broader international use, adjust regex or validation logic
        const re = /^\d{10}$/; // Exactly 10 digits
        return re.test(String(phone));
    }

    function showStep(stepNum) {
        // Hide all steps
        formSteps.forEach(step => step.classList.remove('active'));
        // Show the target step
        document.getElementById(`step${stepNum}`).classList.add('active');

        // Update step indicators
        stepIndicators.forEach(indicator => {
            const indicatorStep = parseInt(indicator.dataset.step);
            if (indicatorStep === stepNum) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });

        currentStep = stepNum;
        window.scrollTo(0, 0); // Scroll to top on step change for better UX
    }

    function validateStep(stepNum) {
        let isValid = true;
        const currentFormStep = document.getElementById(`step${stepNum}`);
        let firstInvalidInput = null; // To scroll to the first invalid field

        if (stepNum === 1) { // Shipping Information Validation
            const fullName = document.getElementById('fullName');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const address = document.getElementById('address');
            const city = document.getElementById('city');
            const state = document.getElementById('state');
            const zipCode = document.getElementById('zipCode');
            const country = document.getElementById('country');

            // Validate Full Name
            if (!fullName.value.trim()) { setValidationBorder(fullName, false); isValid = false; if (!firstInvalidInput) firstInvalidInput = fullName; } else { setValidationBorder(fullName, true); }
            // Validate Email
            if (!isValidEmail(email.value)) { setValidationBorder(email, false); isValid = false; if (!firstInvalidInput) firstInvalidInput = email; } else { setValidationBorder(email, true); }
            // Validate Phone Number (10 digits)
            if (!isValidPhoneNumber(phone.value)) { setValidationBorder(phone, false); isValid = false; if (!firstInvalidInput) firstInvalidInput = phone; } else { setValidationBorder(phone, true); }
            // Validate Address
            if (!address.value.trim()) { setValidationBorder(address, false); isValid = false; if (!firstInvalidInput) firstInvalidInput = address; } else { setValidationBorder(address, true); }
            // Validate City
            if (!city.value.trim()) { setValidationBorder(city, false); isValid = false; if (!firstInvalidInput) firstInvalidInput = city; } else { setValidationBorder(city, true); }
            // Validate State
            if (!state.value.trim()) { setValidationBorder(state, false); isValid = false; if (!firstInvalidInput) firstInvalidInput = state; } else { setValidationBorder(state, true); }
            // Validate Zip Code
            if (!zipCode.value.trim()) { setValidationBorder(zipCode, false); isValid = false; if (!firstInvalidInput) firstInvalidInput = zipCode; } else { setValidationBorder(zipCode, true); }
            // Validate Country
            if (!country.value) { setValidationBorder(country, false); isValid = false; if (!firstInvalidInput) firstInvalidInput = country; } else { setValidationBorder(country, true); }

        } else if (stepNum === 2) { // Payment Information Validation
            const selectedPaymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;

            if (selectedPaymentMethod === 'creditCard') {
                const cardNumber = document.getElementById('cardNumber');
                const cardName = document.getElementById('cardName');
                const expiryDate = document.getElementById('expiryDate');
                const cvv = document.getElementById('cvv');

                if (!cardNumber.value.replace(/\s/g, '').match(/^\d{16}$/)) { setValidationBorder(cardNumber, false); isValid = false; if (!firstInvalidInput) firstInvalidInput = cardNumber; } else { setValidationBorder(cardNumber, true); }
                if (!cardName.value.trim()) { setValidationBorder(cardName, false); isValid = false; if (!firstInvalidInput) firstInvalidInput = cardName; } else { setValidationBorder(cardName, true); }
                if (!expiryDate.value.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) { setValidationBorder(expiryDate, false); isValid = false; if (!firstInvalidInput) firstInvalidInput = expiryDate; } else { setValidationBorder(expiryDate, true); }
                if (!cvv.value.match(/^\d{3,4}$/)) { setValidationBorder(cvv, false); isValid = false; if (!firstInvalidInput) firstInvalidInput = cvv; } else { setValidationBorder(cvv, true); }

            } else if (selectedPaymentMethod === 'esewa') {
                const esewaPhone = document.getElementById('esewaPhone');
                const esewaPassword = document.getElementById('esewaPassword');

                if (!isValidPhoneNumber(esewaPhone.value)) { setValidationBorder(esewaPhone, false); isValid = false; if (!firstInvalidInput) firstInvalidInput = esewaPhone; } else { setValidationBorder(esewaPhone, true); }
                if (!esewaPassword.value.trim()) { setValidationBorder(esewaPassword, false); isValid = false; if (!firstInvalidInput) firstInvalidInput = esewaPassword; } else { setValidationBorder(esewaPassword, true); }

            } else if (selectedPaymentMethod === 'fonepay') {
                const fonepayPhone = document.getElementById('fonepayPhone');
                const fonepayPassword = document.getElementById('fonepayPassword');

                if (!isValidPhoneNumber(fonepayPhone.value)) { setValidationBorder(fonepayPhone, false); isValid = false; if (!firstInvalidInput) firstInvalidInput = fonepayPhone; } else { setValidationBorder(fonepayPhone, true); }
                if (!fonepayPassword.value.trim()) { setValidationBorder(fonepayPassword, false); isValid = false; if (!firstInvalidInput) firstInvalidInput = fonepayPassword; } else { setValidationBorder(fonepayPassword, true); }

            } else if (selectedPaymentMethod === 'paypal') {
                const paypalEmail = document.getElementById('paypalEmail');
                const paypalPassword = document.getElementById('paypalPassword');

                if (!isValidEmail(paypalEmail.value)) { setValidationBorder(paypalEmail, false); isValid = false; if (!firstInvalidInput) firstInvalidInput = paypalEmail; } else { setValidationBorder(paypalEmail, true); }
                if (!paypalPassword.value.trim()) { setValidationBorder(paypalPassword, false); isValid = false; if (!firstInvalidInput) firstInvalidInput = paypalPassword; } else { setValidationBorder(paypalPassword, true); }
            }
        }

        if (!isValid) {
            alert('Please fill in all required fields correctly and fix any highlighted errors.');
            if (firstInvalidInput) {
                firstInvalidInput.focus(); // Focus on the first invalid input
            }
        } else {
            // Display a success message for the completed step
            if (stepNum === 1) {
                alert('Shipping information saved successfully!');
            } else if (stepNum === 2) {
                alert('Payment method selected successfully!');
            }
        }
        return isValid;
    }

    function updateOrderReview() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const reviewShippingAddress = document.getElementById('reviewShippingAddress');
        const reviewPaymentMethod = document.getElementById('reviewPaymentMethod');
        const reviewCartItemsDiv = document.getElementById('reviewCartItems');
        const reviewSubtotalSpan = document.getElementById('reviewSubtotal');
        const reviewShippingSpan = document.getElementById('reviewShipping');
        const reviewTaxSpan = document.getElementById('reviewTax');
        const reviewTotalSpan = document.getElementById('reviewTotal');

        // Shipping Address
        reviewShippingAddress.innerHTML = `
            ${document.getElementById('fullName').value}<br>
            ${document.getElementById('address').value}<br>
            ${document.getElementById('city').value}, ${document.getElementById('state').value} ${document.getElementById('zipCode').value}<br>
            ${document.getElementById('country').value}<br>
            ${document.getElementById('email').value}<br>
            ${document.getElementById('phone').value}
        `;

        // Payment Method
        const selectedPaymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
        let paymentText = '';
        if (selectedPaymentMethod === 'creditCard') {
            paymentText = `Credit Card (Ending in: ${document.getElementById('cardNumber').value.slice(-4)})`;
        } else if (selectedPaymentMethod === 'paypal') {
            paymentText = `PayPal (${document.getElementById('paypalEmail').value})`;
        } else if (selectedPaymentMethod === 'esewa') {
            paymentText = `eSewa (Phone: ${document.getElementById('esewaPhone').value})`;
        } else if (selectedPaymentMethod === 'fonepay') {
            paymentText = `FonePay (Phone: ${document.getElementById('fonepayPhone').value})`;
        }
        reviewPaymentMethod.textContent = paymentText;

        // Cart Items for Review
        reviewCartItemsDiv.innerHTML = '';
        if (cart.length === 0) {
            reviewCartItemsDiv.innerHTML = '<p>Your cart is empty. Please return to the cart page to add items.</p>';
        } else {
            cart.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('review-cart-item');
                itemDiv.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="review-item-details">
                        <div class="name">${item.name}</div>
                        <div class="qty-price">${item.quantity} x $${item.price.toFixed(2)}</div>
                    </div>
                    <div class="review-item-total">$${(item.quantity * item.price).toFixed(2)}</div>
                `;
                reviewCartItemsDiv.appendChild(itemDiv);
            });
        }

        // Calculate Summary (ensure consistency with cart.js if possible, or recalculate)
        let subtotal = 0;
        cart.forEach(item => {
            subtotal += item.price * item.quantity;
        });

        const shipping = subtotal > 0 ? SHIPPING_COST : 0;
        const tax = subtotal * TAX_RATE;
        const total = subtotal + shipping + tax;

        reviewSubtotalSpan.textContent = `$${subtotal.toFixed(2)}`;
        reviewShippingSpan.textContent = `$${shipping.toFixed(2)}`;
        reviewTaxSpan.textContent = `$${tax.toFixed(2)}`;
        reviewTotalSpan.textContent = `$${total.toFixed(2)}`;
    }

    // Event listeners for Next/Previous buttons
    nextButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const nextStepNum = parseInt(e.target.dataset.step);
            if (validateStep(currentStep)) { // Validate current step before moving
                if (nextStepNum === 3) { // If moving to review step
                    updateOrderReview();
                }
                showStep(nextStepNum);
            }
        });
    });

    prevButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const prevStepNum = parseInt(e.target.dataset.step);
            showStep(prevStepNum);
        });
    });

    // Handle payment method selection
    paymentMethodRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            // Hide all payment details divs and reset their border colors
            for (const key in paymentDetailsDivs) {
                paymentDetailsDivs[key].style.display = 'none';
                const inputs = paymentDetailsDivs[key].querySelectorAll('input');
                inputs.forEach(input => setValidationBorder(input, true)); // Reset border to default
            }

            // Show selected payment details div
            const selectedMethod = e.target.value;
            if (paymentDetailsDivs[selectedMethod]) {
                paymentDetailsDivs[selectedMethod].style.display = 'block';
            }
        });
    });

    // Form submission
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent default form submission

        // Final validation before placing order (ensure step 3 is valid, though it has no inputs itself)
        // If current step is 3, proceed. If user somehow submits from an earlier step, validate that step.
        if (currentStep === 3 || validateStep(currentStep)) {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            if (cart.length === 0) {
                alert('Your cart is empty. Cannot place an order.');
                window.location.href = 'cart.html'; // Redirect to cart if empty
                return;
            }

            // In a real application:
            // 1. Collect all form data (shipping, payment, cart items)
            const formData = new FormData(checkoutForm);
            const orderData = {};
            for (let [key, value] of formData.entries()) {
                orderData[key] = value;
            }
            orderData.cartItems = cart; // Use the actual cart array
            orderData.subtotal = parseFloat(document.getElementById('reviewSubtotal').textContent.replace('$', ''));
            orderData.shipping = parseFloat(document.getElementById('reviewShipping').textContent.replace('$', ''));
            orderData.tax = parseFloat(document.getElementById('reviewTax').textContent.replace('$', ''));
            orderData.total = parseFloat(document.getElementById('reviewTotal').textContent.replace('$', ''));

            console.log('Order Data for Submission:', orderData); // Log data for demo purposes

            // 2. Send data to your backend server (e.g., via fetch API)
            // Example fetch:
            // fetch('/api/place-order', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(orderData)
            // })
            // .then(response => response.json())
            // .then(data => {
            //     if (data.success) {
            //         alert('Order Placed Successfully! Your order ID is ' + data.orderId);
            //         localStorage.removeItem('cart'); // Clear cart after successful order
            //         window.location.href = 'order-confirmation.html?orderId=' + data.orderId; // Redirect to confirmation page
            //     } else {
            //         alert('Failed to place order: ' + data.message);
            //     }
            // })
            // .catch(error => {
            //     console.error('Error placing order:', error);
            //     alert('An error occurred while placing your order. Please try again.');
            // });

            // For this static demo:
            alert('Order Placed Successfully! Thank you for your purchase.');
            localStorage.removeItem('cart'); // Clear cart after "successful" demo order
            window.location.href = 'index.html'; // Redirect to home or a simple success page
        }
    });

    // Initial load: show the first step and ensure correct payment details are shown
    showStep(currentStep);
    // Trigger initial payment details display based on default checked radio
    document.querySelector('input[name="paymentMethod"]:checked').dispatchEvent(new Event('change'));

    // Input formatting for Credit Card Expiry (MM/YY) and Number
    const expiryDateInput = document.getElementById('expiryDate');
    if(expiryDateInput) {
        expiryDateInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
            if (value.length > 2) {
                value = value.slice(0, 2) + '/' + value.slice(2, 4);
            }
            e.target.value = value;
        });
    }

    const cardNumberInput = document.getElementById('cardNumber');
    if(cardNumberInput) {
        cardNumberInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
            value = value.replace(/(\d{4})(?=\d)/g, '$1 '); // Add space after every 4 digits
            e.target.value = value;
        });
    }

    // Pre-fill shipping info if available from localStorage (optional feature)
    // You could save shipping info temporarily and load it here if the user revisits
    // Example:
    // const savedShippingInfo = JSON.parse(localStorage.getItem('shippingInfo'));
    // if (savedShippingInfo) {
    //     for (const key in savedShippingInfo) {
    //         const input = document.getElementById(key);
    //         if (input) input.value = savedShippingInfo[key];
    //     }
    // }

    // Check if cart is empty on page load
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert('Your cart is empty. Please add items to proceed to checkout.');
        window.location.href = 'cart.html'; // Redirect to cart page
    }
});