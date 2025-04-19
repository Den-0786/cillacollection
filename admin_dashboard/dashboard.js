document.addEventListener('DOMContentLoaded', function() {
    // Sales Chart
    const salesCtx = document.getElementById('salesChart').getContext('2d');
    const salesChart = new Chart(salesCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Sales',
                data: [6500, 5900, 8000, 8100, 9500, 12000],
                backgroundColor: 'rgba(93, 56, 145, 0.2)',
                borderColor: 'rgba(93, 56, 145, 1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return 'GHS ' + context.raw.toLocaleString();
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return 'GHS ' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });

    // Revenue Chart with updated payment methods
    const revenueCtx = document.getElementById('revenueChart').getContext('2d');
    const revenueChart = new Chart(revenueCtx, {
        type: 'doughnut',
        data: {
            labels: ['Visa/Mastercard', 'Mobile Money', 'Cash on Delivery', 'Cash at Post'],
            datasets: [{
                data: [35, 40, 15, 10],
                backgroundColor: [
                    'rgba(93, 56, 145, 0.8)',
                    'rgba(249, 148, 23, 0.8)',
                    'rgba(78, 159, 61, 0.8)',
                    'rgba(0, 180, 216, 0.8)'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        boxWidth: 12,
                        padding: 20
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.raw + '%';
                        }
                    }
                }
            },
            cutout: '65%'
        }
    });

    // Chart filter buttons
    const filterButtons = document.querySelectorAll('.chart-filter button');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // In a real app, you would update the chart data here
            // based on the selected time period
        });
    });

    // Sidebar navigation
    const menuItems = document.querySelectorAll('.sidebar-menu li[data-panel]');
    const panels = document.querySelectorAll('.content-panel');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all menu items and panels
            menuItems.forEach(i => i.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked menu item
            this.classList.add('active');
            
            // Show the corresponding panel
            const panelId = this.getAttribute('data-panel') + '-panel';
            document.getElementById(panelId).classList.add('active');
        });
    });

// Logout button with error handling
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {  
        logoutBtn.addEventListener('click', async function(e) {
            e.preventDefault();  
            try {
                const confirmed = await showConfirmation({
                    title: 'Logout',
                    message: 'Are you sure you want to logout?',
                    confirmText: 'Yes',
                    cancelText: 'No'
                });

                if (confirmed) {
                    
                    showMessage('Logging out...');
                    setTimeout(() => {
                        window.location.href = '/admin_login/login.html?logout=true';
                        
                    }, 500);
                }
            } catch (error) {
                console.error('Logout error:', error);
                showMessage('error', 'Failed to logout. Please try again.');
            }
        });
    } else {
        console.error('Logout button not found!');
    }
// });

// document.addEventListener('DOMContentLoaded', function() {
    const settingsModal = document.getElementById('settings-modal');
    const closeSettings = document.getElementById('close-settings');
    const cancelSettings = document.getElementById('cancel-settings');
    const settingsMenuItem = document.querySelector('.sidebar-menu li[data-panel="settings"]');
    
    // Open settings modal when settings menu item is clicked
    settingsMenuItem.addEventListener('click', function(e) {
        e.preventDefault();
        settingsModal.classList.add('active');
    });
    
    // Close modal methods
    function closeModal() {
        settingsModal.classList.remove('active');
    }
    
    closeSettings.addEventListener('click', closeModal);
    cancelSettings.addEventListener('click', closeModal);
    
    // Close when clicking outside modal
    settingsModal.addEventListener('click', function(e) {
        if (e.target === settingsModal) {
            closeModal();
        }
    });
    
    // Create confirmation modal function
    function showConfirmation(options) {
        return new Promise((resolve) => {
            const { title, message, confirmText = 'Yes', cancelText = 'No' } = options;
            
            const modal = document.createElement('div');
            modal.className = 'confirmation-overlay active';
            modal.innerHTML = `
                <div class="confirmation-modal">
                    <div class="confirmation-header">
                        <h3>${title}</h3>
                    </div>
                    <div class="confirmation-body">
                        <p>${message}</p>
                    </div>
                    <div class="confirmation-actions">
                        <button class="btn btn-cancel">${cancelText}</button>
                        <button class="btn btn-confirm">${confirmText}</button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            modal.querySelector('.btn-cancel').addEventListener('click', () => {
                document.body.removeChild(modal);
                resolve(false);
            });
            
            modal.querySelector('.btn-confirm').addEventListener('click', () => {
                document.body.removeChild(modal);
                resolve(true);
            });
        });
    }
    
    // Change password button
    document.getElementById('change-password').addEventListener('click', async function() {
        const confirmed = await showConfirmation({
            title: 'Change Password',
            message: 'Are you sure you want to change your password?',
            confirmText: 'Continue',
            cancelText: 'Cancel'
        });
        
        if (confirmed) {
            // In a real app, show password change form
            const passwordForm = document.createElement('div');
            passwordForm.className = 'confirmation-overlay active';
            passwordForm.innerHTML = `
                <div class="confirmation-modal" style="max-width: 400px;">
                    <div class="confirmation-header">
                        <h3>Change Password</h3>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="confirmation-body">
                        <form class="password-form">
                            <div class="form-group">
                                <label>Current Password</label>
                                <input type="password" required>
                            </div>
                            <div class="form-group">
                                <label>New Password</label>
                                <input type="password" required>
                            </div>
                            <div class="form-group">
                                <label>Confirm New Password</label>
                                <input type="password" required>
                            </div>
                            <div class="form-actions">
                                <button type="button" class="btn btn-cancel">Cancel</button>
                                <button type="submit" class="btn btn-primary">Update Password</button>
                            </div>
                        </form>
                    </div>
                </div>
            `;
            
            document.body.appendChild(passwordForm);
            
            passwordForm.querySelector('.modal-close').addEventListener('click', () => {
                document.body.removeChild(passwordForm);
            });
            
            passwordForm.querySelector('.btn-cancel').addEventListener('click', () => {
                document.body.removeChild(passwordForm);
            });
            
            passwordForm.querySelector('.password-form').addEventListener('submit', (e) => {
                e.preventDefault();
                document.body.removeChild(passwordForm);
                showMessage('Password changed successfully!');
            });
        }
    });
    
    // Reset settings button
    document.getElementById('reset-settings').addEventListener('click', async function() {
        const confirmed = await showConfirmation({
            title: 'Reset Settings',
            message: 'Are you sure you want to reset all settings to default values?',
            confirmText: 'Reset',
            cancelText: 'Cancel'
        });
        
        if (confirmed) {
            // In a real app, reset form values here
            showMessage('Settings have been reset to defaults!');
        }
    });
    
    // Form submission
    document.querySelector('.settings-form').addEventListener('submit', async function(e) {
        e.preventDefault();
        const confirmed = await showConfirmation({
            title: 'Save Changes',
            message: 'Are you sure you want to save these settings?',
            confirmText: 'Save',
            cancelText: 'Cancel'
        });
        
        if (confirmed) {
            // In a real app, save settings here
            showMessage('Settings saved successfully!');
            closeModal();
        }
    });
    
    function showMessage(type, message, duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `message-notification ${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 
                        type === 'error' ? 'fa-exclamation-circle' : 
                        'fa-info-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => document.body.removeChild(notification), 300);
        }, duration);
    }
});