
document.addEventListener('DOMContentLoaded', function() {
        // DOM Elements
    const paymentOptions = document.querySelectorAll('.payment-option');
    const mobileDetails = document.getElementById("mobile-details");
    const cardDetails = document.getElementById('card-details');
    const continueBtn = document.getElementById('continue-btn');
    const confirmationModal = document.getElementById('confirmation-modal');
    const confirmPaymentBtn = document.getElementById('confirm-payment');
    const cancelPaymentBtn = document.getElementById('cancel-payment');
    const confirmationDetails = document.getElementById('confirmation-details');
    const paymentMethodsContainer = document.querySelector('.payment-methods');
    const orderItemsContainer = document.getElementById('order-items-container');
    const orderTotalAmount = document.getElementById('order-total-amount');

    // Create error message element
    const methodError = document.createElement('div');
    methodError.className = 'validation-error';
    methodError.id = 'method-error';
    paymentMethodsContainer.insertBefore(methodError, continueBtn);

    // Price parsing function
    function parsePrice(priceStr) {
        const numericValue = parseFloat(priceStr.replace(/[^\d.]/g, ''));
        return isNaN(numericValue) ? 0 : numericValue;
    }

    // Load cart items from localStorage
    let checkoutProducts = JSON.parse(localStorage.getItem('checkoutProducts')) || [];
    
    function updateOrderSummary() {
        if (checkoutProducts.length > 0) {
            orderItemsContainer.innerHTML = checkoutProducts.map(item => {
                const productName = item.title || item.name || product.image || 'Product';
                const price = item.price ? `GHS ${item.price}` : 'GHS 0.00';
                const quantity = item.quantity || 1;
                
                return `
                    <div class="product-item">
                        <span>${productName}</span>
                        <span>${quantity} x ${price}</span>
                    </div>
                `;
            }).join('');
    
            const total = checkoutProducts.reduce((sum, item) => {
                const priceValue = parsePrice(item.price || '0');
                return sum + (priceValue * (item.quantity || 1));
            }, 0);
            
            orderTotalAmount.textContent = `GHS ${total.toFixed(2)}`;
            return total;
        } else {
            orderItemsContainer.innerHTML = '<p>No items in cart</p>';
            orderTotalAmount.textContent = 'GHS 0.00';
            return 0;
        }
    }

    // Initialize order summary
    updateOrderSummary();

    // Network prefixes for mobile money validation
    const networkPrefixes = {
        mtn: ['024', '025', '053', '054', '055', '059'],
        telecel: ['020', '050', '026', '056'],
        airteltigo: ['027', '057', '026', '056']
    };

    // Variables to track selected payment method
    let selectedMethod = null;
    let paymentType = null;

    // Initialize UI
    mobileDetails.style.display = 'none';
    cardDetails.style.display = 'none';
    confirmationModal.style.display = 'none';
    methodError.style.display = 'none';

    // FIXED: Payment method selection (works with your existing HTML/CSS)
    paymentOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            paymentOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            this.classList.add('active');
            
            // Get payment method details
            selectedMethod = this.getAttribute('data-method');
            paymentType = this.getAttribute('data-type');
            
            // Clear any previous method error
            methodError.style.display = 'none';
            methodError.textContent = '';
            
            // Show the corresponding payment details section
            if (paymentType === 'mobile') {
                mobileDetails.style.display = 'block';
                cardDetails.style.display = 'none';
                document.getElementById('mobile-network').value = 
                    selectedMethod === 'mtn' ? 'MTN' : 
                    selectedMethod === 'telecel' ? 'Telecel' : 'AirtelTigo';
                setupMobileNumberValidation();
            } else if (paymentType === 'card') {
                cardDetails.style.display = 'block';
                mobileDetails.style.display = 'none';
            }
        });
    });

    // Continue to payment button
    continueBtn.addEventListener('click', function() {
        methodError.style.display = 'none';
        methodError.textContent = '';
        
        if (!selectedMethod) {
            methodError.style.display = 'block';
            methodError.textContent = 'Please select a payment method';
            return;
        }

        const total = updateOrderSummary(); // Get current total
        
        if (paymentType === 'mobile') {
            if (!validateMobilePayment(total)) return;
            showConfirmationModal(getMobilePaymentDetails(total));
        } else if (paymentType === 'card') {
            if (!validateCardPayment(total)) return;
            showConfirmationModal(getCardPaymentDetails(total));
        }
    });


// Mobile number validation - FIXED
function setupMobileNumberValidation() {
    const customerNumberInput = document.getElementById('customer-number');
    customerNumberInput.addEventListener('input', function() {
        validateMobileNumber(this, 'customer-error');
    });
}

function validateMobileNumber(input, errorElementId) {
    const errorElement = document.getElementById(errorElementId);
    const value = input.value.replace(/\D/g, '');
    const currentLength = value.length;
    
    errorElement.textContent = '';
    errorElement.style.display = 'none';
    
    if (!selectedMethod) return;
    
    if(currentLength >= 3) {
        const prefix = value.substring(0, 3);
        if (!networkPrefixes[selectedMethod].includes(prefix)) {
            const networkName = selectedMethod === 'mtn' ? 'MTN' :
                selectedMethod === 'telecel' ? 'Telecel' : 'AirtelTigo';
            errorElement.textContent = `${networkName} numbers start with ${networkPrefixes[selectedMethod].join(', ')}`;
            errorElement.style.display = 'block';
        }
    }
        
    if (currentLength > 0 && currentLength < 10) {
        errorElement.textContent = 'Number must be 10 digits';
        errorElement.style.display = 'block';
    }
}

function validateMobilePayment(total) {
    let isValid = true;
    const customerNumber = document.getElementById('customer-number').value.replace(/\D/g, '');
    const merchantNumber = document.getElementById('merchant-number').value.replace(/\D/g, '');
    const amount = document.getElementById('mobile-amount').value;
    
    // Reset errors
    document.querySelectorAll('.validation-error').forEach(el => {
        el.textContent = '';
        el.style.display = 'none';
    });

    // Validate customer number
    if (!customerNumber) {
        showError('customer-error', 'Customer number is required');
        isValid = false;
    } else if (customerNumber.length !== 10) {
        showError('customer-error', 'Number must be 10 digits');
        isValid = false;
    } else if (selectedMethod && !networkPrefixes[selectedMethod].includes(customerNumber.substring(0, 3))) {
        showError('customer-error', `Invalid number for selected network`);
        isValid = false;
    }

    // Validate merchant number
    if (!merchantNumber) {
        showError('merchant-error', 'Merchant number is required');
        isValid = false;
    } else if (merchantNumber.length !== 10) {
        showError('merchant-error', 'Number must be 10 digits');
        isValid = false;
    }

    // Validate amount
    if (!amount) {
        showError('amount-error', 'Amount is required');
        isValid = false;
    } else if (isNaN(parseFloat(amount))) {
        showError('amount-error', 'Invalid amount');
        isValid = false;
    } else if (parseFloat(amount) <= 0) {
        showError('amount-error', 'Amount must be greater than 0');
        isValid = false;
    } else if (Math.abs(parseFloat(amount) - total) > 0.01) {
        showError('amount-error', `Amount must be GHS ${total.toFixed(2)}`);
        isValid = false;
    }

    return isValid;
}

function validateCardPayment(total) {
    let isValid = true;
    const cardNumber = document.getElementById('card-number').value;
    const cardName = document.getElementById('card-name').value;
    const cardExpiry = document.getElementById('card-expiry').value;
    const cardCvv = document.getElementById('card-cvv').value;
    const cardAmount = document.getElementById('card-amount').value;

    // Reset errors
    document.querySelectorAll('.validation-error').forEach(el => {
        el.textContent = '';
        el.style.display = 'none';
    });

    // Validate card number
    if (!cardNumber) {
        showError('card-error', 'Card number is required');
        isValid = false;
    } else if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ''))) {
        showError('card-error', 'Enter a valid 16-digit card number');
        isValid = false;
    }

    // Validate card name
    if (!cardName) {
        showError('name-error', 'Name on card is required');
        isValid = false;
    }

    // Validate expiry date
    if (!cardExpiry) {
        showError('expiry-error', 'Expiry date is required');
        isValid = false;
    } else if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) {
        showError('expiry-error', 'Enter expiry date in MM/YY format');
        isValid = false;
    }

    // Validate CVV
    if (!cardCvv) {
        showError('cvv-error', 'CVV is required');
        isValid = false;
    } else if (!/^\d{3,4}$/.test(cardCvv)) {
        showError('cvv-error', 'Enter a valid 3 or 4-digit CVV');
        isValid = false;
    }

    // Validate amount
    if (!cardAmount) {
        showError('amount-error', 'Amount is required');
        isValid = false;
    } else if (isNaN(parseFloat(cardAmount))) {
        showError('amount-error', 'Invalid amount');
        isValid = false;
    } else if (parseFloat(cardAmount) <= 0) {
        showError('amount-error', 'Amount must be greater than 0');
        isValid = false;
    } else if (Math.abs(parseFloat(cardAmount) - total) > 0.01) {
        showError('amount-error', `Amount must be GHS ${total.toFixed(2)}`);
        isValid = false;
    }

    return isValid;
}

function showError(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = message;
        element.style.display = 'block';
    }
}

function getMobilePaymentDetails(total) {
    return {
        type: 'Mobile Money',
        method: selectedMethod === 'mtn' ? 'MTN Mobile Money' : 
                selectedMethod === 'telecel' ? 'Telecel Cash' : 'AirtelTigo Money',
        customerNumber: document.getElementById('customer-number').value,
        merchantNumber: document.getElementById('merchant-number').value,
        amount: 'GHS ' + total.toFixed(2),
        totalAmount: 'GHS ' + total.toFixed(2)
    };
}

function getCardPaymentDetails(total) {
    return {
        type: 'Card Payment',
        method: selectedMethod === 'visa' ? 'Visa' : 
                selectedMethod === 'mastercard' ? 'Mastercard' : 'American Express',
        cardNumber: '•••• •••• •••• ' + document.getElementById('card-number').value.slice(-4),
        cardName: document.getElementById('card-name').value,
        expiry: document.getElementById('card-expiry').value,
        amount: 'GHS ' + total.toFixed(2),
        totalAmount: 'GHS ' + total.toFixed(2)
    };
}

function showConfirmationModal(details) {
    let productsHTML = checkoutProducts.map(product => `
        <div class="order-item">
            <img src="${product.image}" alt="${product.title || product.name || "Product"}" onerror="this.style.display='none'">
            <div>
                <h4>${product.title || product.title || "Product"}</h4>
                <p>${product.quantity} x ${product.price}</p>
            </div>
        </div>
    `).join('');

    confirmationDetails.innerHTML = `
        <div class="confirmation-section">
            <h3>Order Summary</h3>
            ${productsHTML}
            <div class="order-total">
                <strong>Total Amount:</strong> ${details.totalAmount}
            </div>
        </div>
        
        <div class="confirmation-section">
            <h3>Payment Details</h3>
            <p><strong>Payment Type:</strong> ${details.type}</p>
            <p><strong>Method:</strong> ${details.method}</p>
            ${details.customerNumber ? `<p><strong>Your Number:</strong> ${details.customerNumber}</p>` : ''}
            ${details.merchantNumber ? `<p><strong>Merchant Number:</strong> ${details.merchantNumber}</p>` : ''}
            ${details.cardNumber ? `<p><strong>Card Number:</strong> ${details.cardNumber}</p>` : ''}
            ${details.cardName ? `<p><strong>Name on Card:</strong> ${details.cardName}</p>` : ''}
            ${details.expiry ? `<p><strong>Expiry Date:</strong> ${details.expiry}</p>` : ''}
            <p><strong>Amount to Pay:</strong> ${details.amount}</p>
        </div>
    `;
    confirmationModal.style.display = 'flex';
}

// Confirm payment button
confirmPaymentBtn.addEventListener('click', function() {
    confirmationDetails.innerHTML += `
        <div class="payment-processing">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Processing your payment...</p>
        </div>
    `;
    
    // Simulate payment processing
    setTimeout(function() {
        document.querySelector('.payment-processing').remove();
        confirmationDetails.innerHTML += `
            <div class="payment-success">
                <i class="fas fa-check-circle"></i>
                <p>Payment successful!</p>
                <p>Transaction ID: ${Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
            </div>
        `;
        
        document.querySelector('.confirmation-buttons').style.display = 'none';
        
        setTimeout(function() {
            confirmationModal.style.display = 'none';
            resetPaymentForm();
            document.querySelector('.confirmation-buttons').style.display = 'flex';
            document.querySelector('.payment-success')?.remove();
            // Clear cart after successful payment
            localStorage.removeItem('checkoutProducts');
            checkoutProducts = [];
            updateOrderSummary();
        }, 4000);
    }, 2000);
});

// Cancel payment button
cancelPaymentBtn.addEventListener('click', function() {
    confirmationModal.style.display = 'none';
});

    function resetPaymentForm() {
        paymentOptions.forEach(opt => opt.classList.remove('active'));
        mobileDetails.style.display = 'none';
        cardDetails.style.display = 'none';
        document.getElementById('customer-number').value = '';
        document.getElementById('merchant-number').value = '';
        document.getElementById('mobile-amount').value = '';
        document.getElementById('card-amount').value = '';
        document.getElementById('card-number').value = '';
        document.getElementById('card-name').value = '';
        document.getElementById('card-expiry').value = '';
        document.getElementById('card-cvv').value = '';
        selectedMethod = null;
        paymentType = null;
    }

// Format card number input
    const cardNumberInput = document.getElementById('card-number');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
            e.target.value = value;
        });
        }

    // Format expiry date input
    const expiryInput = document.getElementById('card-expiry');
    if (expiryInput) {
        expiryInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value;
        });
    }
});