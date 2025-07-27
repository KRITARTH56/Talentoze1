document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.getElementById('navMenu');
    const body = document.body;

    // --- Helper function to close all dropdowns ---
    function closeAllDropdowns() {
        document.querySelectorAll('.nav-item.has-dropdown').forEach(dropdownParent => {
            dropdownParent.classList.remove('active'); // Remove 'active' from all dropdown parents
        });
    }

    // --- Smooth scrolling for navigation links and main menu closing ---
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const parentListItem = this.parentElement;
            const isDropdownToggle = parentListItem.classList.contains('has-dropdown');
            const isMobile = window.innerWidth <= 768; // Your mobile breakpoint
            const targetId = this.getAttribute('href');
            const isAnchorLink = targetId && targetId.startsWith('#');
            const isExternalPageLink = targetId && !targetId.startsWith('#') && targetId !== 'javascript:void(0)';

            // 1. Handle dropdown toggling on mobile
            if (isDropdownToggle && isMobile && navMenu && navMenu.classList.contains('active')) {
                e.preventDefault(); // Prevent default link navigation for the dropdown toggle

                if (parentListItem.classList.contains('active')) {
                    parentListItem.classList.remove('active'); // Close this dropdown
                } else {
                    closeAllDropdowns(); // Close all other dropdowns first
                    parentListItem.classList.add('active'); // Open this dropdown
                }
            }
            // 2. Handle smooth scrolling for anchor links (e.g., #features)
            else if (isAnchorLink) {
                e.preventDefault(); // Prevent default browser jump
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }

                // Close mobile menu AND any open dropdowns after smooth scrolling
                if (navMenu && navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    body.classList.remove('menu-open');
                    closeAllDropdowns(); // <-- This ensures solutions dropdown closes
                }
            }
            // 3. Handle direct page navigation (e.g., about.html, contact.html)
            else if (isExternalPageLink) {
                // Do NOT preventDefault() here. Let the browser navigate.
                // But still close the mobile menu and any open dropdowns before navigation.
                if (navMenu && navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    body.classList.remove('menu-open');
                    closeAllDropdowns(); // <-- This ensures solutions dropdown closes
                }
                // The browser will naturally follow the href after this.
            }
            // 4. Handle clicks on sub-links within a dropdown (e.g., Employee Management)
            // This is already implicitly handled by the navLinks.forEach,
            // but we need to ensure closeAllDropdowns is called.
            // If you have specific handling for these, make sure closeAllDropdowns is there.
            // Example:
            // if (this.closest('.dropdown-menu')) { // If link is inside a dropdown menu
            //    if (navMenu && navMenu.classList.contains('active')) {
            //        hamburger.classList.remove('active');
            //        navMenu.classList.remove('active');
            //        body.classList.remove('menu-open');
            //        closeAllDropdowns(); // Ensure dropdown and main menu close
            //    }
            // }

        });
    });

    // --- Mobile hamburger menu toggle ---
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            body.classList.toggle('menu-open');

            // If the main menu is closing, close any open sub-dropdowns too
            if (!navMenu.classList.contains('active')) {
                closeAllDropdowns(); // <-- This ensures solutions dropdown closes
            }
        });

        // Close main menu and any open sub-dropdowns if clicking outside of them
        document.addEventListener('click', (event) => {
            if (navMenu && navMenu.classList.contains('active')) {
                const isClickInsideNavMenu = navMenu.contains(event.target);
                const isClickOnHamburger = hamburger.contains(event.target);

                if (!isClickInsideNavMenu && !isClickOnHamburger) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    body.classList.remove('menu-open');
                    closeAllDropdowns(); // <-- This ensures solutions dropdown closes
                }
            }
        });
    }

    // --- Global Functions (Make sure they also close the mobile menu and dropdowns) ---
    // Example for scrollToContact:
    window.scrollToContact = function() {
        const contactSection = document.getElementById('contact'); // Use correct ID if it's 'contact'
        if (contactSection) {
            const offsetTop = contactSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        } else {
            // Fallback for contact page itself
            window.location.href = 'contact.html';
        }

        // Close the mobile menu and any open dropdowns after clicking the contact button (if open)
        if (navMenu && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            body.classList.remove('menu-open');
            closeAllDropdowns(); // <-- This ensures solutions dropdown closes
        }
    };

    // Make similar adjustments to any other global functions like scrollToSection
    // that might be called by an `onclick` attribute on your HTML elements.
    // For example, if you have a `scrollToAbout()` function:
    // window.scrollToAbout = function() {
    //    // ... your scroll logic ...
    //    if (navMenu && navMenu.classList.contains('active')) {
    //        hamburger.classList.remove('active');
    //        navMenu.classList.remove('active');
    //        body.classList.remove('menu-open');
    //        closeAllDropdowns();
    //    }
    // };

    // --- All other existing JS functionalities (Navbar background, Modal, Forms, etc.) ---
    // (These sections remain exactly as provided in your last full script)
    // ... (Your existing code for navbar scroll, modal, forms, animations, etc.) ...


    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Modal functionality
    const modal = document.getElementById('demoModal');
    const closeBtn = document.querySelector('.close');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Form submissions
    const contactForm = document.getElementById('contactForm');
    const demoForm = document.getElementById('demoForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactForm();
        });
    }

    if (demoForm) {
        demoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleDemoForm();
        });
    }

    // Animate stats on scroll
    const animateStats = () => {
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            const rect = stat.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                animateNumber(stat);
            }
        });
    };

    window.addEventListener('scroll', animateStats);

    // Add hover effects to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // Add hover effects to problem cards
    const problemCards = document.querySelectorAll('.problem-card');
    problemCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.15)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        });
    });

    // Animate dashboard preview on load
    // const dashboardPreview = document.querySelector('.dashboard-preview');
    // if (dashboardPreview) {
    //     setTimeout(() => {
    //         dashboardPreview.style.transform = 'perspective(1000px) rotateY(-5deg) scale(1.02)';
    //     }, 500);
    // }

    // Add active state to navigation links based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const updateActiveNav = () => {
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${id}"]`);

            if (scrollPos >= top && scrollPos < bottom) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', updateActiveNav);

    // FAQ functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });

    // Counter animation
    const animateCounters = () => {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            if (counter.dataset.animated) return;
            
            const rect = counter.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const target = parseInt(counter.textContent);
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                        counter.dataset.animated = 'true';
                    }
                    
                    if (target >= 1000) {
                        counter.textContent = Math.floor(current).toLocaleString() + '+';
                    } else if (counter.textContent.includes('.')) {
                        counter.textContent = current.toFixed(1) + '%';
                    } else {
                        counter.textContent = Math.floor(current);
                    }
                }, 16);
            }
        });
    };

    window.addEventListener('scroll', animateCounters);

    // Enhanced scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .problem-card, .benefit-item, .testimonial-card, .stat');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    const parallaxElements = document.querySelectorAll('.hero-visual, .dashboard-preview');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    });

    // Enhanced button interactions
    const buttons = document.querySelectorAll('button, .btn-primary, .btn-cta, .btn-demo, .btn-contact');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Typing effect for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        let i = 0;
        
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }

    // Smooth reveal animations
    const revealElements = document.querySelectorAll('.hero-badge, .hero-description, .hero-cta, .hero-features');
    revealElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.8s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 200 * (index + 1));
    });

    // Interactive dashboard preview
    const dashboardPreview = document.querySelector('.dashboard-preview');
    if (dashboardPreview) {
        dashboardPreview.addEventListener('mouseenter', function() {
            this.style.transform = 'perspective(1000px) rotateY(-8deg) scale(1.05)';
        });
        
        dashboardPreview.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateY(-5deg) scale(1)';
        });
    }

    // Enhanced mobile app animation
    const mobileApp = document.querySelector('.mobile-app');
    if (mobileApp) {
        setInterval(() => {
            const buttons = mobileApp.querySelectorAll('.app-btn');
            buttons.forEach((btn, index) => {
                setTimeout(() => {
                    btn.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        btn.style.transform = 'scale(1)';
                    }, 150);
                }, index * 100);
            });
        }, 3000);
    }

    // Location pins animation
    const locationPins = document.querySelectorAll('.location-pin');
    locationPins.forEach((pin, index) => {
        pin.style.animationDelay = `${index * 0.5}s`;
    });

    // Testimonial carousel effect
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;
    
    const highlightTestimonial = () => {
        testimonialCards.forEach((card, index) => {
            if (index === currentTestimonial) {
                card.style.transform = 'translateY(-10px) scale(1.02)';
                card.style.boxShadow = '0 25px 50px rgba(76, 175, 80, 0.2)';
            } else {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)';
            }
        });
        
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    };
    
    if (testimonialCards.length > 0) {
        setInterval(highlightTestimonial, 4000);
    }

    // Enhanced form validation
    const validateForm = (form) => {
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            const value = input.value.trim();
            const errorElement = input.parentNode.querySelector('.error-message');
            
            // Remove existing error
            if (errorElement) {
                errorElement.remove();
            }
            
            // Validate
            if (!value) {
                showFieldError(input, 'This field is required');
                isValid = false;
            } else if (input.type === 'email' && !isValidEmail(value)) {
                showFieldError(input, 'Please enter a valid email address');
                isValid = false;
            }
        });
        
        return isValid;
    };
    
    const showFieldError = (input, message) => {
        const errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.color = '#e74c3c';
        errorElement.style.fontSize = '12px';
        errorElement.style.marginTop = '5px';
        errorElement.style.display = 'block';
        input.parentNode.appendChild(errorElement);
        
        input.style.borderColor = '#e74c3c';
        setTimeout(() => {
            input.style.borderColor = '#ddd';
        }, 3000);
    };
    
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Update form handlers to use validation
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm(this)) {
                handleContactForm();
            }
        });
    }

    if (demoForm) {
        demoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm(this)) {
                handleDemoForm();
            }
        });
    }

    // Scroll progress indicator
    const createScrollProgress = () => {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(135deg, #4CAF50, #81C784);
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    };
    
    createScrollProgress();

    // Enhanced loading states
    const enhanceLoadingStates = () => {
        const buttons = document.querySelectorAll('.btn-submit, .btn-primary, .btn-cta');
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                if (!this.disabled) {
                    this.classList.add('loading-state');
                }
            });
        });
    };
    
    enhanceLoadingStates();
});

// Enhanced scroll to functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Function to scroll to FAQ section
function scrollToFAQ() {
    scrollToSection('faq');
}

// Enhanced demo modal
function openDemo() {
    const modal = document.getElementById('demoModal');
    if (modal) {
        modal.style.display = 'block';
        modal.style.opacity = '0';
        modal.style.transform = 'scale(0.8)';
        document.body.style.overflow = 'hidden';
        
        // Animate in
        setTimeout(() => {
            modal.style.transition = 'all 0.3s ease';
            modal.style.opacity = '1';
            modal.style.transform = 'scale(1)';
        }, 10);
    }
}

// Enhanced close modal
function closeModal() {
    const modal = document.getElementById('demoModal');
    if (modal) {
        modal.style.opacity = '0';
        modal.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Enhanced form handlers with better UX
function handleContactForm() {
    const form = document.getElementById('contactForm');
    const formData = new FormData(form);
    
    // Show loading state
    const submitBtn = form.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    submitBtn.classList.add('loading-state');

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Reset form
        form.reset();
        
        // Show success message
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitBtn.style.background = '#4CAF50';
        submitBtn.classList.remove('loading-state');
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '#4CAF50';
        }, 3000);

        // Show success notification
        showNotification('Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.', 'success');
    }, 2000);
}

function handleDemoForm() {
    const form = document.getElementById('demoForm');
    const formData = new FormData(form);
    
    // Show loading state
    const submitBtn = form.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Scheduling...';
    submitBtn.disabled = true;
    submitBtn.classList.add('loading-state');

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Reset form
        form.reset();
        
        // Close modal with animation
        closeModal();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading-state');

        // Show success notification
        showNotification('Demo scheduled successfully! Our team will contact you within 24 hours to confirm the details.', 'success');
    }, 2000);
}

// Enhanced notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#e74c3c' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        z-index: 3000;
        transform: translateX(400px);
        transition: all 0.3s ease;
        max-width: 400px;
        word-wrap: break-word;
    `;

    // Add to body
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 7 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }
    }, 7000);
}

// Function to open demo modal
function openDemo() {
    const modal = document.getElementById('demoModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

// Function to scroll to contact section
function scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        const offsetTop = contactSection.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Function to scroll to about section
function scrollToAbout() {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        const offsetTop = aboutSection.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Function to handle contact form submission
function handleContactForm() {
    const form = document.getElementById('contactForm');
    const formData = new FormData(form);
    
    // Show loading state
    const submitBtn = form.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Reset form
        form.reset();
        
        // Show success message
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitBtn.style.background = '#4CAF50';
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '#4CAF50';
        }, 3000);

        // Show success notification
        showNotification('Thank you! Your message has been sent successfully.', 'success');
    }, 2000);
}

// Function to handle demo form submission
function handleDemoForm() {
    const form = document.getElementById('demoForm');
    const formData = new FormData(form);
    
    // Show loading state
    const submitBtn = form.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Scheduling...';
    submitBtn.disabled = true;

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Reset form
        form.reset();
        
        // Close modal
        const modal = document.getElementById('demoModal');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        // Show success notification
        showNotification('Demo scheduled! We\'ll contact you within 24 hours.', 'success');
    }, 2000);
}

// Function to show notifications
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 3000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;

    // Add to body
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Function to animate numbers
function animateNumber(element) {
    if (element.dataset.animated) return;
    
    const target = parseInt(element.textContent.replace(/[^\d]/g, ''));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
            element.dataset.animated = 'true';
        }
        
        // Format number based on original content
        const originalText = element.textContent;
        if (originalText.includes('%')) {
            element.textContent = Math.floor(current) + '%';
        } else if (originalText.includes('₹')) {
            element.textContent = '₹' + Math.floor(current) + 'L';
        } else if (originalText.includes('+')) {
            element.textContent = Math.floor(current).toLocaleString() + '+';
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

// Add loading animation to buttons
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-primary') || 
        e.target.classList.contains('btn-cta') || 
        e.target.classList.contains('btn-demo')) {
        
        // Add ripple effect
        const button = e.target;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .nav-link.active {
        color: #4CAF50 !important;
        font-weight: 600;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    @media (max-width: 768px) {
        .hamburger {
            display: flex !important;
        }
        
        .nav-menu.active {
            display: flex !important;
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            padding: 20px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            z-index: 999;
        }
        
        .hamburger.active .bar:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active .bar:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }
        
        .hamburger.active .bar:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
        }
        
        .nav-cta {
            flex-direction: column;
            margin-top: 20px;
        }
    }
`;
document.head.appendChild(style);