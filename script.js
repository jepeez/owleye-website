// Navigation scroll effect
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

// Language switcher functionality
let currentLanguage = 'fi'; // Default to Finnish

function switchLanguage(lang) {
    currentLanguage = lang;
    
    // Update all elements with language data attributes
    const elements = document.querySelectorAll('[data-fi][data-en]');
    elements.forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            // Use textContent for elements that don't contain HTML
            if (element.tagName === 'STRONG' || element.tagName === 'SPAN') {
                element.textContent = text;
            } else {
                element.innerHTML = text;
            }
        }
    });
    
    // Update form placeholders
    const placeholderElements = document.querySelectorAll('[data-fi-placeholder][data-en-placeholder]');
    placeholderElements.forEach(element => {
        const placeholder = element.getAttribute(`data-${lang}-placeholder`);
        if (placeholder) {
            element.placeholder = placeholder;
        }
    });
    
    // Update select options
    const selectOptions = document.querySelectorAll('option[data-fi][data-en]');
    selectOptions.forEach(option => {
        const text = option.getAttribute(`data-${lang}`);
        if (text) {
            option.textContent = text;
        }
    });
    
    // Update language button states
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
    
    // Save language preference
    localStorage.setItem('owleye-language', lang);
}

// Initialize EmailJS
emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key

// Initialize language switcher
document.addEventListener('DOMContentLoaded', () => {
    // Check for saved language preference
    const savedLang = localStorage.getItem('owleye-language');
    if (savedLang && (savedLang === 'fi' || savedLang === 'en')) {
        switchLanguage(savedLang);
    }
    
    // Add event listeners to language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            switchLanguage(lang);
        });
    });
});

// Handle navbar background on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Floating drone animation - flies left to right in revealed space below hero
const floatingDrone = document.querySelector('.floating-drone');
if (floatingDrone) {
    let ticking = false;
    
    function updateDronePosition() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // Start animation when scrolling past 30% of hero section
        const heroThreshold = windowHeight * 0.3;
        
        if (scrollY > heroThreshold) {
            // Show drone
            floatingDrone.style.opacity = '1';
            
            // Calculate progress (0 to 1) based on scroll - longer distance for slower movement
            const scrollProgress = Math.min((scrollY - heroThreshold) / (windowHeight * 0.8), 1);
            
            // Fly from left (-300px) to right (100vw)
            const startX = -300;
            const endX = window.innerWidth;
            const currentX = startX + (endX - startX) * scrollProgress;
            
            // Add slight vertical bobbing effect
            const bobAmount = Math.sin(scrollProgress * Math.PI * 4) * 15;
            
            // Position at bottom of hero with slight offset
            const yPosition = -50 + bobAmount;
            
            // Slight rotation based on movement
            const rotation = Math.sin(scrollProgress * Math.PI * 2) * 5;
            
            floatingDrone.style.transform = `translate(${currentX}px, ${yPosition}px) rotate(${rotation}deg)`;
        } else {
            // Hide drone when at top
            floatingDrone.style.opacity = '0';
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateDronePosition);
            ticking = true;
        }
    });
    
    // Initial position
    updateDronePosition();
}

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});

// Smooth scrolling for anchor links (only for same-page navigation)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

// Observe all elements with data-aos attribute
document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
});

// Form submission handling
const quoteForm = document.querySelector('.quote-form');
if (quoteForm) {
    quoteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = currentLanguage === 'fi' ? 'Lähetetään...' : 'Sending...';
        submitBtn.disabled = true;
        
        // Get form data
        const formData = new FormData(this);
        const templateParams = {
            from_name: formData.get('from_name'),
            from_email: formData.get('from_email'),
            phone: formData.get('phone') || 'Not provided',
            service: formData.get('service'),
            message: formData.get('message'),
            to_email: 'joni.sainio@owleye.fi'
        };
        
        // Send email using EmailJS
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                const successMsg = currentLanguage === 'fi' ? 
                    'Kiitos! Otamme yhteyttä 24 tunnin sisällä.' : 
                    'Thank you! We\'ll get back to you within 24 hours.';
                showNotification(successMsg, 'success');
                
                // Reset form
                quoteForm.reset();
            })
            .catch(function(error) {
                console.log('FAILED...', error);
                const errorMsg = currentLanguage === 'fi' ? 
                    'Virhe lähettäessä viestiä. Yritä uudelleen tai ota yhteyttä suoraan.' : 
                    'Error sending message. Please try again or contact us directly.';
                showNotification(errorMsg, 'error');
            })
            .finally(function() {
                // Restore button state
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#00d4ff' : '#ff4444'};
        color: ${type === 'success' ? '#1a1a1a' : '#ffffff'};
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 350px;
        font-weight: 600;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: inherit;
        font-size: 1.5rem;
        cursor: pointer;
        margin-left: 1rem;
        padding: 0;
    `;
    
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Parallax effect for hero video
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        const rate = scrolled * -0.5;
        heroVideo.style.transform = `translateY(${rate}px)`;
    }
});

// Stats counter animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber && !statNumber.classList.contains('animated')) {
                statNumber.classList.add('animated');
                const text = statNumber.textContent;
                const number = parseInt(text.replace(/[^\d]/g, ''));
                if (number) {
                    statNumber.textContent = '0';
                    animateCounter(statNumber, number);
                    // Add back any non-numeric characters
                    setTimeout(() => {
                        statNumber.textContent = text;
                    }, 2000);
                }
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});

// Video loading and error handling
document.addEventListener('DOMContentLoaded', () => {
    const video = document.querySelector('.hero-video video');
    if (video) {
        video.addEventListener('loadeddata', () => {
            console.log('Hero video loaded successfully');
        });
        
        video.addEventListener('error', () => {
            console.log('Video failed to load, showing fallback');
            const fallback = document.querySelector('.hero-fallback');
            if (fallback) {
                fallback.style.display = 'block';
            }
        });
        
        // Ensure video plays on mobile devices
        video.addEventListener('canplay', () => {
            video.play().catch(e => {
                console.log('Autoplay prevented:', e);
            });
        });
    }
});

// Preload critical resources
function preloadResources() {
    // Preload hero video
    const video = document.createElement('video');
    video.src = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
    video.preload = 'metadata';
}

// Initialize preloading
document.addEventListener('DOMContentLoaded', preloadResources);

// Performance optimization: Lazy load non-critical content
const lazyLoadObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            
            // Load background images
            if (element.dataset.bg) {
                element.style.backgroundImage = `url(${element.dataset.bg})`;
            }
            
            // Load images
            if (element.tagName === 'IMG' && element.dataset.src) {
                element.src = element.dataset.src;
            }
            
            lazyLoadObserver.unobserve(element);
        }
    });
});

// Apply lazy loading to images and background elements
document.querySelectorAll('[data-src], [data-bg]').forEach(el => {
    lazyLoadObserver.observe(el);
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
        
        // Close any open modals or notifications
        const notification = document.querySelector('.notification');
        if (notification) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }
});

// Add focus styles for accessibility
document.addEventListener('DOMContentLoaded', () => {
    // Add focus-visible polyfill behavior
    const focusableElements = document.querySelectorAll('a, button, input, select, textarea');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', () => {
            if (element.matches(':focus-visible')) {
                element.style.outline = `2px solid var(--accent-electric)`;
                element.style.outlineOffset = '2px';
            }
        });
        
        element.addEventListener('blur', () => {
            element.style.outline = '';
            element.style.outlineOffset = '';
        });
    });
});

// Service section hover effects
document.querySelectorAll('.service-block').forEach(block => {
    block.addEventListener('mouseenter', () => {
        block.style.transform = 'translateY(-5px)';
        block.style.transition = 'transform 0.3s ease';
    });
    
    block.addEventListener('mouseleave', () => {
        block.style.transform = 'translateY(0)';
    });
});

// Add loading state to form submission
const submitBtn = document.querySelector('.submit-btn');
if (submitBtn) {
    const originalText = submitBtn.textContent;
    
    document.querySelector('.quote-form').addEventListener('submit', () => {
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}
