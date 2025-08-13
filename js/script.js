// Banner Carousel Functionality
document.addEventListener("DOMContentLoaded", function() {
    try {
        initializeCarousel();
        initializeErrorHandling();
    } catch (error) {
        console.error("Error initializing page functionality:", error);
    }
});

function initializeCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const prevButton = document.querySelector('.carousel-control.prev');
    const nextButton = document.querySelector('.carousel-control.next');
    
    if (!slides.length) {
        console.warn("No carousel slides found");
        return;
    }
    
    let currentSlide = 0;
    let autoSlideInterval;
    
    // Show specific slide
    function showSlide(index) {
        try {
            // Hide all slides
            slides.forEach(slide => {
                slide.classList.remove('active');
            });
            
            // Show current slide
            if (slides[index]) {
                slides[index].classList.add('active');
            }
        } catch (error) {
            console.error("Error showing slide:", error);
        }
    }
    
    // Go to next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // Go to previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }
    
    // Start auto-slide
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }
    
    // Stop auto-slide
    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
    }
    
    // Event listeners for manual controls
    if (nextButton) {
        nextButton.addEventListener('click', function() {
            stopAutoSlide();
            nextSlide();
            startAutoSlide(); // Restart auto-slide after manual interaction
        });
        
        // Keyboard accessibility
        nextButton.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                stopAutoSlide();
                nextSlide();
                startAutoSlide();
            }
        });
        
        // Make focusable
        nextButton.setAttribute('tabindex', '0');
        nextButton.setAttribute('role', 'button');
        nextButton.setAttribute('aria-label', 'Próximo slide');
    }
    
    if (prevButton) {
        prevButton.addEventListener('click', function() {
            stopAutoSlide();
            prevSlide();
            startAutoSlide(); // Restart auto-slide after manual interaction
        });
        
        // Keyboard accessibility
        prevButton.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                stopAutoSlide();
                prevSlide();
                startAutoSlide();
            }
        });
        
        // Make focusable
        prevButton.setAttribute('tabindex', '0');
        prevButton.setAttribute('role', 'button');
        prevButton.setAttribute('aria-label', 'Slide anterior');
    }
    
    // Pause auto-slide when user hovers over carousel
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoSlide);
        carouselContainer.addEventListener('mouseleave', startAutoSlide);
    }
    
    // Initialize carousel
    showSlide(currentSlide);
    startAutoSlide();
    
    // Pause auto-slide when page is not visible
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            stopAutoSlide();
        } else {
            startAutoSlide();
        }
    });
}

function initializeErrorHandling() {
    // Handle image loading errors
    const images = document.querySelectorAll('img');
    
    images.forEach(function(img) {
        img.addEventListener('error', function() {
            console.warn("Failed to load image:", this.src);
            
            // Show fallback content
            const fallback = this.nextElementSibling;
            if (fallback && fallback.classList.contains('image-fallback')) {
                this.style.display = 'none';
                fallback.style.display = 'flex';
            } else {
                // Create a fallback if none exists
                const fallbackDiv = document.createElement('div');
                fallbackDiv.className = 'image-fallback';
                fallbackDiv.textContent = 'Imagem não disponível';
                fallbackDiv.style.cssText = `
                    width: 100%;
                    height: 100%;
                    background-color: #e9ecef;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 14px;
                    color: #6c757d;
                    border-radius: 5px;
                `;
                
                this.parentNode.insertBefore(fallbackDiv, this.nextSibling);
                this.style.display = 'none';
            }
        });
        
        // Add loading state
        img.addEventListener('loadstart', function() {
            this.parentElement.classList.add('loading');
        });
        
        img.addEventListener('load', function() {
            this.parentElement.classList.remove('loading');
        });
    });
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize additional features when DOM is ready
document.addEventListener("DOMContentLoaded", function() {
    try {
        initializeSmoothScrolling();
        initializeFormValidation();
        initializeAccessibility();
    } catch (error) {
        console.error("Error initializing additional features:", error);
    }
});

// Form validation (for future forms)
function initializeFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(function(form) {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(function(field) {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    
                    // Remove error class when user starts typing
                    field.addEventListener('input', function() {
                        this.classList.remove('error');
                    });
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Por favor, preencha todos os campos obrigatórios.');
            }
        });
    });
}

// Accessibility enhancements
function initializeAccessibility() {
    // Add skip link for keyboard navigation
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Pular para o conteúdo principal';
    skipLink.className = 'sr-only';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000;
        color: #fff;
        padding: 8px;
        text-decoration: none;
        z-index: 9999;
        border-radius: 3px;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main landmark if it doesn't exist
    const main = document.querySelector('main');
    if (main && !main.id) {
        main.id = 'main';
    }
}

// Utility function to handle loading states
function setLoadingState(element, isLoading) {
    if (isLoading) {
        element.classList.add('loading');
        element.setAttribute('aria-busy', 'true');
    } else {
        element.classList.remove('loading');
        element.removeAttribute('aria-busy');
    }
}

// Error logging function
function logError(error, context = '') {
    console.error(`Error ${context}:`, error);
    
    // In a production environment, you might want to send this to a logging service
    // sendErrorToLoggingService(error, context);
}

// Performance monitoring
function measurePerformance() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                const perfData = performance.timing;
                const loadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log(`Page load time: ${loadTime}ms`);
            }, 0);
        });
    }
}

// Initialize performance monitoring
measurePerformance();

// Handle window resize for responsive adjustments
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        // Recalculate any dynamic layouts if needed
        console.log('Window resized, adjusting layouts if necessary');
    }, 250);
});

// Service worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment when service worker is implemented
        // navigator.serviceWorker.register('/sw.js')
        //     .then(function(registration) {
        //         console.log('SW registered: ', registration);
        //     })
        //     .catch(function(registrationError) {
        //         console.log('SW registration failed: ', registrationError);
        //     });
    });
}
