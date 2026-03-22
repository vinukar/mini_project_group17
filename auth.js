// Authentication Utility for VitaCare
const Auth = {
    // Check if user is logged in
    isAuthenticated: function() {
        return localStorage.getItem('vitacare_logged_in') === 'true';
    },

    // Get current user data
    getCurrentUser: function() {
        const userJson = localStorage.getItem('vitacare_user');
        return userJson ? JSON.parse(userJson) : null;
    },

    // Login user
    login: function(email, password) {
        const users = JSON.parse(localStorage.getItem('vitacare_users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            localStorage.setItem('vitacare_logged_in', 'true');
            localStorage.setItem('vitacare_user', JSON.stringify({
                name: user.name,
                email: user.email
            }));
            return { success: true };
        }
        return { success: false, message: 'Invalid email or password' };
    },

    // Signup user
    signup: function(name, email, password) {
        let users = JSON.parse(localStorage.getItem('vitacare_users') || '[]');
        
        if (users.find(u => u.email === email)) {
            return { success: false, message: 'Email already exists' };
        }

        const newUser = { name, email, password };
        users.push(newUser);
        localStorage.setItem('vitacare_users', JSON.stringify(users));
        
        // Auto-login after signup
        return this.login(email, password);
    },

    // Logout user
    logout: function() {
        localStorage.removeItem('vitacare_logged_in');
        localStorage.removeItem('vitacare_user');
        window.location.href = 'login.html';
    },

    // Initialize page protection
    init: function() {
        const path = window.location.pathname;
        const page = path.split("/").pop();
        
        // Protected pages list
        const protectedPages = ['index.html', 'report.html', 'log.html', 'payment.html', ''];
        
        if (protectedPages.includes(page) || page === '') {
            if (!this.isAuthenticated()) {
                window.location.href = 'login.html';
            }
        } else if (page === 'login.html') {
            if (this.isAuthenticated()) {
                window.location.href = 'index.html';
            }
        }

        // Add logout button listener if it exists
        document.addEventListener('DOMContentLoaded', () => {
            const logoutBtn = document.getElementById('logout-btn');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.logout();
                });
            }
        });
    }
};

// Auto-run protection
Auth.init();
