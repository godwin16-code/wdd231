// join.js - Membership form and modal functionality

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Set the timestamp to current date and time
    const timestamp = new Date().toLocaleString();
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        timestampField.value = timestamp;
    }

    // Initialize modals
    initializeModals();
    
    // Initialize form
    initializeForm();
});

// Modal Management
function initializeModals() {
    const infoButtons = document.querySelectorAll('.info-btn');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.modal-close');

    // Open modal when info button is clicked
    infoButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = button.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                openModal(modal);
            }
        });
    });

    // Close modal when close button is clicked
    closeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const modal = e.target.closest('.modal');
            if (modal) {
                closeModal(modal);
            }
        });
    });

    // Close modal when clicking outside of it
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.classList.contains('open')) {
                    closeModal(modal);
                }
            });
        }
    });
}

function openModal(modal) {
    modal.classList.add('open');
    // Focus first focusable element in modal
    const firstFocusable = modal.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (firstFocusable) {
        setTimeout(() => firstFocusable.focus(), 100);
    }
}

function closeModal(modal) {
    modal.classList.remove('open');
}

// Form Management
function initializeForm() {
    const form = document.querySelector('.membership-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        // HTML5 validation will handle validation
        console.log('Form submitted successfully');
    });

    // Add real-time validation feedback
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateField(input);
        });

        input.addEventListener('change', () => {
            validateField(input);
        });
    });
}

function validateField(input) {
    // Remove previous error state
    input.classList.remove('error');

    // Check if field has value
    if (!input.value.trim() && input.hasAttribute('required')) {
        return; // Let browser handle required validation
    }

    if (input.type === 'email' && input.value) {
        if (!validateEmail(input.value)) {
            input.classList.add('error');
        }
    } else if (input.id === 'orgTitle' && input.value) {
        if (!input.validity.valid) {
            input.classList.add('error');
        }
    }
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
