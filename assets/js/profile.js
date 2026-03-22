document.addEventListener('DOMContentLoaded', () => {
    const profileName = document.getElementById('profile-name');
    const profileEmail = document.getElementById('profile-email');
    const profileNic = document.getElementById('profile-nic');
    const avatarInitials = document.getElementById('avatar-initials');
    const passwordForm = document.getElementById('password-form');
    const alertBox = document.getElementById('settings-alert');

    // Initialize Profile Data
    function initProfile() {
        if (typeof Auth === 'undefined') return;
        
        const user = Auth.getCurrentUser();
        if (user) {
            if (profileName) profileName.textContent = user.name;
            if (profileEmail) profileEmail.textContent = user.email;
            if (profileNic) profileNic.textContent = user.nic || 'Not Provided';
            
            // Set initials
            if (avatarInitials) {
                const initials = user.name
                    .split(' ')
                    .map(n => n[0])
                    .join('')
                    .toUpperCase()
                    .substring(0, 2);
                avatarInitials.textContent = initials;
            }
        } else {
            // Not logged in, Auth.init() should have redirected but as a backup:
            window.location.href = 'login.html';
        }
    }

    // Handle Password Change
    if (passwordForm) {
        passwordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const currentPassword = document.getElementById('current-password').value;
            const newPassword = document.getElementById('new-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            // Reset Alert
            showAlert('', '');

            // Validation
            if (newPassword !== confirmPassword) {
                showAlert('New passwords do not match', 'danger');
                return;
            }

            if (newPassword.length < 6) {
                showAlert('New password must be at least 6 characters long', 'danger');
                return;
            }

            // Call Auth
            const result = Auth.changePassword(currentPassword, newPassword);
            
            if (result.success) {
                showAlert('Password updated successfully!', 'success');
                passwordForm.reset();
            } else {
                showAlert(result.message || 'Failed to update password', 'danger');
            }
        });
    }

    function showAlert(message, type) {
        if (!alertBox) return;
        
        if (!message) {
            alertBox.style.display = 'none';
            return;
        }

        alertBox.textContent = message;
        alertBox.className = `alert alert-${type}`;
        alertBox.style.display = 'block';
        
        // Scroll to alert
        alertBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Run init
    initProfile();
    initHistory();
    
    // Auth init for protection
    if (typeof Auth !== 'undefined') {
        Auth.init();
        
        // Logout listener (already in auth.js but good to ensure)
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                Auth.logout();
            });
        }
    }

    function initHistory() {
        const historyListContainer = document.getElementById('history-list');
        if (!historyListContainer) return;

        // Load history from localStorage
        const historyStr = localStorage.getItem('vitacare_history') || '[]';
        const history = JSON.parse(historyStr);
        
        if (history.length > 0) {
            // Clear empty state
            historyListContainer.innerHTML = '';
            
            history.forEach(item => {
                const card = document.createElement('div');
                card.className = 'history-card glass-panel';
                
                card.innerHTML = `
                    <div class="history-main">
                        <h3>${item.hospitalName}</h3>
                        <div class="history-details">
                            <div class="detail-item">
                                <i class="fa-solid fa-user"></i>
                                <span>Patient: <strong>${item.patientName}</strong></span>
                            </div>
                            <div class="detail-item">
                                <i class="fa-solid fa-id-card"></i>
                                <span>ID: <strong>${item.patientId}</strong></span>
                            </div>
                            <div class="detail-item">
                                <i class="fa-solid fa-file-medical"></i>
                                <span>Reports: <strong>${item.reportName}</strong></span>
                            </div>
                            <div class="detail-item">
                                <i class="fa-solid fa-calendar-check"></i>
                                <span>Reserved: <strong>${item.date} at ${item.time}</strong></span>
                            </div>
                            <div class="detail-item">
                                <i class="fa-solid fa-credit-card"></i>
                                <span>Paid On: <strong>${item.paidTime}</strong></span>
                            </div>
                        </div>
                    </div>
                    <div class="history-badge">
                        <div class="token-badge">TOKEN #${item.token}</div>
                        <div class="price-badge">LKR ${item.totalPrice.toFixed(2)}</div>
                        <div style="color: var(--success); font-weight: 600; font-size: 0.8rem; text-transform: uppercase;">
                            <i class="fa-solid fa-circle-check"></i> Validated
                        </div>
                    </div>
                `;
                
                historyListContainer.appendChild(card);
            });
        }
    }
});
