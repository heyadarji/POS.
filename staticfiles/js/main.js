// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarNav = document.querySelector('.navbar-nav');
    
    if (navbarToggler && navbarNav) {
        navbarToggler.addEventListener('click', function() {
            navbarNav.classList.toggle('show');
        });
    }
    
    // FAQ toggle
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                // Toggle active state on question
                this.classList.toggle('active');
                
                // Find the associated answer and toggle its visibility
                const answer = this.nextElementSibling;
                if (answer.classList.contains('show')) {
                    answer.classList.remove('show');
                } else {
                    answer.classList.add('show');
                }
            });
        });
    }
    
    // Tab functionality for product details
    const tabNavItems = document.querySelectorAll('.tab-nav-item');
    
    if (tabNavItems.length > 0) {
        tabNavItems.forEach(item => {
            item.addEventListener('click', function() {
                // Remove active class from all tab nav items
                tabNavItems.forEach(navItem => {
                    navItem.classList.remove('active');
                });
                
                // Add active class to clicked tab nav item
                this.classList.add('active');
                
                // Hide all tab panes
                const tabPanes = document.querySelectorAll('.tab-pane');
                tabPanes.forEach(pane => {
                    pane.classList.remove('active');
                });
                
                // Show the corresponding tab pane
                const targetId = this.getAttribute('data-tab');
                const targetPane = document.getElementById(targetId);
                if (targetPane) {
                    targetPane.classList.add('active');
                }
            });
        });
    }
    
    // Quantity control for product detail page
    const quantityBtns = document.querySelectorAll('.quantity-btn');
    
    if (quantityBtns.length > 0) {
        quantityBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const action = this.getAttribute('data-action');
                const input = this.parentNode.querySelector('.quantity-input');
                let value = parseInt(input.value, 10);
                
                if (action === 'decrease') {
                    if (value > 1) {
                        value--;
                    }
                } else if (action === 'increase') {
                    value++;
                }
                
                input.value = value;
            });
        });
    }
    
    // Contact form submission with AJAX
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            
            // Create AJAX request
            fetch(contactForm.getAttribute('action'), {
                method: 'POST',
                body: formData,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Show success message
                    const successMsg = document.createElement('div');
                    successMsg.className = 'alert alert-success';
                    successMsg.textContent = data.message || 'Thank you for contacting us! We will get back to you shortly.';
                    
                    // Insert before the form
                    contactForm.parentNode.insertBefore(successMsg, contactForm);
                    
                    // Reset the form
                    contactForm.reset();
                    
                    // Remove success message after 5 seconds
                    setTimeout(() => {
                        successMsg.remove();
                    }, 5000);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
    }
    
    // Review submission with AJAX
    const reviewForm = document.getElementById('review-form');
    
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(reviewForm);
            
            // Create AJAX request
            fetch(reviewForm.getAttribute('action'), {
                method: 'POST',
                body: formData,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Show success message
                    const successMsg = document.createElement('div');
                    successMsg.className = 'alert alert-success';
                    successMsg.textContent = data.message || 'Your review has been submitted successfully!';
                    
                    // Insert before the form
                    reviewForm.parentNode.insertBefore(successMsg, reviewForm);
                    
                    // Reset the form
                    reviewForm.reset();
                    
                    // Remove success message after 5 seconds
                    setTimeout(() => {
                        successMsg.remove();
                    }, 5000);
                    
                    // Reload the page after 1 second to show the new review
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
    }

    // Toggle mobile menu
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // Product quantity buttons
    const quantityInputs = document.querySelectorAll('.quantity-input');
    quantityInputs.forEach(input => {
        const decrementBtn = input.previousElementSibling;
        const incrementBtn = input.nextElementSibling;

        if (decrementBtn) {
            decrementBtn.addEventListener('click', () => {
                const currentValue = parseInt(input.value);
                if (currentValue > 1) {
                    input.value = currentValue - 1;
                }
            });
        }

        if (incrementBtn) {
            incrementBtn.addEventListener('click', () => {
                const currentValue = parseInt(input.value);
                input.value = currentValue + 1;
            });
        }
    });

    // Product tabs
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and tabs
            document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
            
            // Add active class to clicked button and corresponding tab
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
}); 