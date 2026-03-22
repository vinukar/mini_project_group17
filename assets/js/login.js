// Login and Signup logic for VitaCare
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const tabLogin = document.getElementById('tab-login');
    const tabSignup = document.getElementById('tab-signup');
    const goToSignup = document.getElementById('go-to-signup');
    const goToLogin = document.getElementById('go-to-login');
    const authAlert = document.getElementById('auth-alert');
    const formTitle = document.getElementById('form-title');
    const formSubtitle = document.getElementById('form-subtitle');

    // Function to show/hide forms
    const showSignup = () => {
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
        tabLogin.classList.remove('active');
        tabSignup.classList.add('active');
        formTitle.textContent = 'Create Account';
        formSubtitle.textContent = 'Join the VitaCare family today';
        authAlert.style.display = 'none';
    };

    const showLogin = () => {
        signupForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
        tabSignup.classList.remove('active');
        tabLogin.classList.add('active');
        formTitle.textContent = 'Welcome Back';
        formSubtitle.textContent = 'Please sign in to your account';
        authAlert.style.display = 'none';
    };

    // Event listeners for tabs and links
    tabSignup.addEventListener('click', showSignup);
    tabLogin.addEventListener('click', showLogin);
    goToSignup.addEventListener('click', (e) => {
        e.preventDefault();
        showSignup();
    });
    goToLogin.addEventListener('click', (e) => {
        e.preventDefault();
        showLogin();
    });

    // Handle Login submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        const result = Auth.login(email, password);
        
        if (result.success) {
            showAlert('Login successful! Redirecting...', 'success');
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 1000);
        } else {
            showAlert(result.message, 'danger');
        }
    });

    // Handle Signup submission
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('signup-name').value;
        const nic = document.getElementById('signup-nic').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;

        const result = Auth.signup(name, email, password, nic);
        
        if (result.success) {
            showAlert('Account created successfully! Redirecting...', 'success');
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 1000);
        } else {
            showAlert(result.message, 'danger');
        }
    });

    // Helper to show alerts
    const showAlert = (message, type) => {
        authAlert.textContent = message;
        authAlert.className = `alert alert-${type}`;
        authAlert.style.display = 'block';
    };
});
