document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    updateHeaderButtons(isLoggedIn);

    // Login form handling
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('loginUsername').value;
            const password = document.getElementById('loginPassword').value;

            // Default admin credentials
            if (username === 'admin' && password === 'admin') {
                localStorage.setItem('isLoggedIn', 'true');
                document.getElementById('loginMessage').textContent = 'Login successful!';
                document.getElementById('loginMessage').style.color = 'green';
                
                // Redirect to home page after 1 second
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            } else {
                document.getElementById('loginMessage').textContent = 'Invalid username or password';
                document.getElementById('loginMessage').style.color = 'red';
            }
        });

        // Cancel button
        document.getElementById('cancelLogin').addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }

    // Register form handling
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('registerConfirmPassword').value;
            
            if (password !== confirmPassword) {
                document.getElementById('registerMessage').textContent = 'Passwords do not match';
                document.getElementById('registerMessage').style.color = 'red';
                return;
            }

            // If all validations pass
            document.getElementById('registerMessage').textContent = 'Registration successful!';
            document.getElementById('registerMessage').style.color = 'green';
            
            // Redirect to home page after 1 second
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        });

        // Cancel button
        document.getElementById('cancelRegister').addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }

    // Logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('isLoggedIn');
            updateHeaderButtons(false);
            window.location.href = 'index.html';
        });
    }

    // Login/Register button click handlers
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'login.html';
        });
    }

    const registerBtn = document.getElementById('registerBtn');
    if (registerBtn) {
        registerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'register.html';
        });
    }

    // Function to update header buttons based on login status
    function updateHeaderButtons(loggedIn) {
        const loginBtnContainer = document.getElementById('loginBtnContainer');
        const registerBtnContainer = document.getElementById('registerBtnContainer');
        const profileBtnContainer = document.getElementById('profileBtnContainer');

        if (loggedIn) {
            if (loginBtnContainer) loginBtnContainer.style.display = 'none';
            if (registerBtnContainer) registerBtnContainer.style.display = 'none';
            if (profileBtnContainer) profileBtnContainer.style.display = 'block';
        } else {
            if (loginBtnContainer) loginBtnContainer.style.display = 'block';
            if (registerBtnContainer) registerBtnContainer.style.display = 'block';
            if (profileBtnContainer) profileBtnContainer.style.display = 'none';
        }
    }
});