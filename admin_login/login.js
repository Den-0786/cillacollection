document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const forgotPasswordLink = document.getElementById('forgot-password');

    // Function to show message notification
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
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, duration);
    }

    // Form validation
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;

        // Validate email
        if (!emailInput.value || !emailInput.value.includes('@')) {
            emailError.style.display = 'block';
            emailInput.style.borderColor = 'var(--danger)';
            isValid = false;
        } else {
            emailError.style.display = 'none';
            emailInput.style.borderColor = '#ddd';
        }

        // Validate password
        if (!passwordInput.value || passwordInput.value.length < 6) {
            passwordError.style.display = 'block';
            passwordInput.style.borderColor = 'var(--danger)';
            isValid = false;
        } else {
            passwordError.style.display = 'none';
            passwordInput.style.borderColor = '#ddd';
        }

        if (isValid) {
            // In a real app, you would send this to your backend
            console.log('Login submitted:', {
                email: emailInput.value,
                password: passwordInput.value
            });

            // Show success message
            showMessage('success', 'Login successful! Redirecting...');
            
            // Redirect to dashboard after a delay
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        } else {
            showMessage('error', 'Please fix the errors in the form');
        }
    });

    // Forgot password functionality
    forgotPasswordLink.addEventListener('click', async function(e) {
        e.preventDefault();
        
        // Create a modal for email input
        const modal = document.createElement('div');
        modal.className = 'message-notification warning';
        modal.style.position = 'fixed';
        modal.style.top = '50%';
        modal.style.left = '50%';
        modal.style.transform = 'translate(-50%, -50%)';
        modal.style.width = '90%';
        modal.style.maxWidth = '400px';
        modal.style.padding = '20px';
        modal.style.flexDirection = 'column';
        modal.style.alignItems = 'flex-start';
        modal.innerHTML = `
            <h3 style="margin-bottom: 15px; color: white;">Reset Password</h3>
            <div style="width: 100%; margin-bottom: 15px;">
                <input type="email" id="reset-email" placeholder="Enter your email address" 
                    style="width: 100%; padding: 10px; border-radius: 5px; border: none;">
            </div>
            <div style="display: flex; gap: 10px; width: 100%;">
                <button id="cancel-reset" style="padding: 8px 15px; background: white; border: none; border-radius: 5px; cursor: pointer;">Cancel</button>
                <button id="submit-reset" style="padding: 8px 15px; background: var(--primary); color: white; border: none; border-radius: 5px; cursor: pointer;">Submit</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Handle cancel
        document.getElementById('cancel-reset').addEventListener('click', function() {
            document.body.removeChild(modal);
        });
        
        // Handle submit
        document.getElementById('submit-reset').addEventListener('click', function() {
            const email = document.getElementById('reset-email').value;
            if (email && email.includes('@')) {
                document.body.removeChild(modal);
                showMessage('success', `Password reset link sent to ${email}`);
            } else {
                showMessage('error', 'Please enter a valid email address');
            }
        });
    });

    // If coming from logout, show message
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('logout')) {
        showMessage('success', 'You have been logged out successfully.');
    }
});
