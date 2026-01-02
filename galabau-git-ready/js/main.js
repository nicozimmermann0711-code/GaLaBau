/* =====================================================
   Becirovic GaLaBau - Main JavaScript
   Navigation, Forms, Consent, Analytics
   ===================================================== */

(function() {
    'use strict';

    // =====================================================
    // DOM Ready
    // =====================================================
    document.addEventListener('DOMContentLoaded', function() {
        initNavigation();
        initSmoothScroll();
        initCookieConsent();
        initContactForm();
        initScrollEffects();
        initFAQ();
    });

    // =====================================================
    // Navigation
    // =====================================================
    function initNavigation() {
        const navToggle = document.getElementById('nav-toggle');
        const navLinks = document.getElementById('nav-links');
        const nav = document.getElementById('main-nav');

        if (!navToggle || !navLinks) return;

        // Mobile menu toggle
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });

        // Close menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.classList.remove('nav-open');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
        });

        // Scroll effect for nav
        let lastScroll = 0;
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                nav.classList.add('nav-scrolled');
            } else {
                nav.classList.remove('nav-scrolled');
            }

            lastScroll = currentScroll;
        });
    }

    // =====================================================
    // Smooth Scroll
    // =====================================================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const target = document.querySelector(targetId);
                if (!target) return;

                e.preventDefault();

                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = target.offsetTop - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            });
        });
    }

    // =====================================================
    // Cookie Consent
    // =====================================================
    function initCookieConsent() {
        const banner = document.getElementById('cookie-banner');
        const acceptBtn = document.getElementById('cookie-accept');
        const rejectBtn = document.getElementById('cookie-reject');

        if (!banner) return;

        // Check if user has already made a choice
        const consentDecided = localStorage.getItem('cookie_consent_decided');
        
        if (!consentDecided) {
            banner.classList.add('active');
        }

        // Accept cookies
        if (acceptBtn) {
            acceptBtn.addEventListener('click', function() {
                localStorage.setItem('cookie_consent_decided', 'true');
                localStorage.setItem('analytics_consent', 'true');
                banner.classList.remove('active');
                
                // Load analytics
                loadAnalytics();
                
                // Track consent event
                trackEvent('consent', 'accept', 'cookie_banner');
            });
        }

        // Reject cookies (only necessary)
        if (rejectBtn) {
            rejectBtn.addEventListener('click', function() {
                localStorage.setItem('cookie_consent_decided', 'true');
                localStorage.setItem('analytics_consent', 'false');
                banner.classList.remove('active');
            });
        }

        // If consent was previously given, load analytics
        if (localStorage.getItem('analytics_consent') === 'true') {
            loadAnalytics();
        }
    }

    // =====================================================
    // Analytics Loading (only after consent)
    // =====================================================
    function loadAnalytics() {
        // Replace GTM-XXXXXXX with actual GTM container ID
        const gtmId = 'GTM-XXXXXXX';
        
        if (gtmId === 'GTM-XXXXXXX') {
            console.log('GTM: Container ID not configured');
            return;
        }

        // Google Tag Manager
        (function(w, d, s, l, i) {
            w[l] = w[l] || [];
            w[l].push({
                'gtm.start': new Date().getTime(),
                event: 'gtm.js'
            });
            var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s),
                dl = l != 'dataLayer' ? '&l=' + l : '';
            j.async = true;
            j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
            f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', gtmId);

        console.log('Analytics: GTM loaded');
    }

    // =====================================================
    // Event Tracking
    // =====================================================
    window.dataLayer = window.dataLayer || [];

    function trackEvent(category, action, label, value) {
        // Only track if consent was given
        if (localStorage.getItem('analytics_consent') !== 'true') {
            return;
        }

        window.dataLayer.push({
            'event': 'custom_event',
            'event_category': category,
            'event_action': action,
            'event_label': label,
            'event_value': value
        });

        console.log('Event tracked:', { category, action, label, value });
    }

    // Track phone clicks
    document.querySelectorAll('a[href^="tel:"]').forEach(function(link) {
        link.addEventListener('click', function() {
            trackEvent('contact', 'click', 'phone_call');
        });
    });

    // Track email clicks
    document.querySelectorAll('a[href^="mailto:"]').forEach(function(link) {
        link.addEventListener('click', function() {
            trackEvent('contact', 'click', 'email');
        });
    });

    // Track WhatsApp clicks
    document.querySelectorAll('a[href*="wa.me"]').forEach(function(link) {
        link.addEventListener('click', function() {
            trackEvent('contact', 'click', 'whatsapp');
        });
    });

    // =====================================================
    // Contact Form
    // =====================================================
    function initContactForm() {
        const form = document.getElementById('contact-form');
        const successMessage = document.getElementById('form-success');

        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validate form
            if (!validateForm(form)) {
                return;
            }

            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            // Simulate form submission (replace with actual endpoint)
            submitForm(data, form, successMessage);
        });

        // Real-time validation
        form.querySelectorAll('input, textarea, select').forEach(function(field) {
            field.addEventListener('blur', function() {
                validateField(this);
            });

            field.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
    }

    function validateForm(form) {
        let isValid = true;
        
        form.querySelectorAll('[required]').forEach(function(field) {
            if (!validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Remove existing error
        removeFieldError(field);

        // Required check
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'Dieses Feld ist erforderlich.';
        }

        // Email check
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
            }
        }

        // Phone check
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[\d\s\+\-\(\)]+$/;
            if (!phoneRegex.test(value) || value.length < 6) {
                isValid = false;
                errorMessage = 'Bitte geben Sie eine gültige Telefonnummer ein.';
            }
        }

        // Checkbox check
        if (field.type === 'checkbox' && field.hasAttribute('required')) {
            if (!field.checked) {
                isValid = false;
                errorMessage = 'Bitte bestätigen Sie die Datenschutzerklärung.';
            }
        }

        if (!isValid) {
            showFieldError(field, errorMessage);
        }

        return isValid;
    }

    function showFieldError(field, message) {
        field.classList.add('error');
        
        const errorEl = document.createElement('span');
        errorEl.className = 'field-error';
        errorEl.textContent = message;
        errorEl.style.cssText = 'display: block; color: #d32f2f; font-size: 13px; margin-top: 4px;';
        
        if (field.type === 'checkbox') {
            field.closest('.form-group').appendChild(errorEl);
        } else {
            field.parentNode.appendChild(errorEl);
        }
    }

    function removeFieldError(field) {
        field.classList.remove('error');
        
        const parent = field.type === 'checkbox' ? field.closest('.form-group') : field.parentNode;
        const errorEl = parent.querySelector('.field-error');
        if (errorEl) {
            errorEl.remove();
        }
    }

    function submitForm(data, form, successMessage) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Wird gesendet...</span>';

        // Simulate API call (replace with actual form submission)
        // Option 1: FormSubmit.co (free, no backend needed)
        // Option 2: Netlify Forms
        // Option 3: Custom backend endpoint

        // Example with FormSubmit.co:
        /*
        fetch('https://formsubmit.co/ajax/Info@becirovic-galabau.de', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            // Success
            form.style.display = 'none';
            successMessage.style.display = 'block';
            trackEvent('form', 'submit', 'contact_form');
        })
        .catch(error => {
            // Error
            alert('Es gab ein Problem beim Senden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns telefonisch.');
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        });
        */

        // Simulated success for demo
        setTimeout(function() {
            form.style.display = 'none';
            successMessage.style.display = 'block';
            trackEvent('form', 'submit', 'contact_form');
            
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 1500);
    }

    // =====================================================
    // Scroll Effects
    // =====================================================
    function initScrollEffects() {
        // Intersection Observer for fade-in animations
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe elements
        document.querySelectorAll('.service-card, .project-card, .usp-card, .faq-item').forEach(function(el) {
            el.classList.add('fade-in');
            observer.observe(el);
        });

        // Add CSS for fade-in
        const style = document.createElement('style');
        style.textContent = `
            .fade-in {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            .fade-in.visible {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
    }

    // =====================================================
    // FAQ Accordion
    // =====================================================
    function initFAQ() {
        // FAQs use native <details> element, but we can add extra functionality
        const faqItems = document.querySelectorAll('.faq-item');

        faqItems.forEach(function(item) {
            item.addEventListener('toggle', function() {
                if (this.open) {
                    // Close other FAQs (optional - for accordion behavior)
                    faqItems.forEach(function(otherItem) {
                        if (otherItem !== item && otherItem.open) {
                            otherItem.open = false;
                        }
                    });

                    // Track FAQ interaction
                    const question = this.querySelector('.faq-question span').textContent;
                    trackEvent('faq', 'open', question.substring(0, 50));
                }
            });
        });
    }

    // =====================================================
    // Utility Functions
    // =====================================================
    
    // Debounce function for scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = function() {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // =====================================================
    // Service Worker Registration (optional, for PWA)
    // =====================================================
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            // Uncomment to enable service worker
            // navigator.serviceWorker.register('/sw.js').then(function(registration) {
            //     console.log('SW registered:', registration);
            // }).catch(function(error) {
            //     console.log('SW registration failed:', error);
            // });
        });
    }

})();

// =====================================================
// Helper: Scroll Progress Indicator (optional)
// =====================================================
/*
(function() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #2E7D32, #4CAF50);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
})();
*/
