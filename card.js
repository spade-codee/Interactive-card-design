// DOM Elements
const form = document.getElementById('cardForm');
const successState = document.getElementById('successState');

// Card Preview Elements
const cardNumberPreview = document.getElementById('cardNumberPreview');
const cardNamePreview = document.getElementById('cardNamePreview');
const monthPreview = document.getElementById('monthPreview');
const yearPreview = document.getElementById('yearPreview');
const cvcPreview = document.getElementById('cvcPreview');

// Form Input Elements
const cardholderName = document.getElementById('cardholderName');
const cardNumber = document.getElementById('cardNumber');
const expiryMonth = document.getElementById('expiryMonth');
const expiryYear = document.getElementById('expiryYear');
const cvc = document.getElementById('cvc');

// Error Message Elements
const errorMessages = document.querySelectorAll('.error-message');

// Input Formatting and Validation Functions
function formatCardNumber(value) {
    // Remove any non-digit characters
    const digits = value.replace(/\D/g, '');
    // Add space after every 4 digits
    const formatted = digits.replace(/(\d{4})/g, '$1 ').trim();
    return formatted;
}

function validateCardNumber(number) {
    const regex = /^(\d{4}\s?){4}$/;
    return regex.test(number.trim());
}

function validateExpiryMonth(month) {
    const num = parseInt(month);
    return num >= 1 && num <= 12;
}

function validateExpiryYear(year) {
    const currentYear = new Date().getFullYear() % 100;
    const num = parseInt(year);
    return num >= currentYear && num <= currentYear + 10;
}

function validateCVC(cvc) {
    const regex = /^\d{3}$/;
    return regex.test(cvc);
}

// Real-time Update Functions
cardholderName.addEventListener('input', (e) => {
    let value = e.target.value.toUpperCase();
    cardNamePreview.textContent = value || 'JANE APPLESEED';
});

cardNumber.addEventListener('input', (e) => {
    let value = formatCardNumber(e.target.value);
    e.target.value = value; // Update input field with formatted value
    cardNumberPreview.textContent = value || '0000 0000 0000 0000';
});

expiryMonth.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    e.target.value = value;
    monthPreview.textContent = value.padStart(2, '0');
});

expiryYear.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    e.target.value = value;
    yearPreview.textContent = value.padStart(2, '0');
});

cvc.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    e.target.value = value;
    cvcPreview.textContent = value || '000';
});

// Number-only input restriction
[cardNumber, expiryMonth, expiryYear, cvc].forEach(input => {
    input.addEventListener('keypress', (e) => {
        if (!/\d/.test(e.key)) {
            e.preventDefault();
        }
    });
});

// Form Submission and Validation
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;
    
    // Clear all error messages
    errorMessages.forEach(error => error.textContent = '');

    // Validate Cardholder Name
    if (!cardholderName.value.trim()) {
        document.querySelector('[data-error="name"]').textContent = "Can't be blank";
        isValid = false;
    }

    // Validate Card Number
    if (!cardNumber.value.trim()) {
        document.querySelector('[data-error="number"]').textContent = "Can't be blank";
        isValid = false;
    } else if (!validateCardNumber(cardNumber.value)) {
        document.querySelector('[data-error="number"]').textContent = 'Wrong format, numbers only';
        isValid = false;
    }

    // Validate Expiry Date
    if (!expiryMonth.value || !expiryYear.value) {
        document.querySelector('[data-error="expiry"]').textContent = "Can't be blank";
        isValid = false;
    } else if (!validateExpiryMonth(expiryMonth.value)) {
        document.querySelector('[data-error="expiry"]').textContent = 'Invalid month';
        isValid = false;
    } else if (!validateExpiryYear(expiryYear.value)) {
        document.querySelector('[data-error="expiry"]').textContent = 'Invalid year';
        isValid = false;
    }

    // Validate CVC
    if (!cvc.value) {
        document.querySelector('[data-error="cvc"]').textContent = "Can't be blank";
        isValid = false;
    } else if (!validateCVC(cvc.value)) {
        document.querySelector('[data-error="cvc"]').textContent = 'Invalid CVC';
        isValid = false;
    }

    // If all validations pass, show success state
    if (isValid) {
        form.classList.add('hidden');
        successState.classList.remove('hidden');
    }
});

// Continue button in success state
document.querySelector('.continue-button').addEventListener('click', () => {
    // Reset form and return to initial state
    form.reset();
    successState.classList.add('hidden');
    form.classList.remove('hidden');
    
    // Reset preview values
    cardNumberPreview.textContent = '0000 0000 0000 0000';
    cardNamePreview.textContent = 'JANE APPLESEED';
    monthPreview.textContent = '00';
    yearPreview.textContent = '00';
    cvcPreview.textContent = '000';
});