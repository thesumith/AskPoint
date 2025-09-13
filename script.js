// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Touch-friendly interactions
document.addEventListener('touchstart', function() {}, {passive: true});

// Standard navigation links (no smooth scrolling)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip empty hash links
        if (href === '#') {
            return;
        }
        
        // Allow default browser behavior for anchor links
        // No preventDefault() - let browser handle navigation naturally
    });
});

// Scroll behavior removed - using standard browser scrolling

// Touch scrolling removed - using standard browser behavior

// Touch event listeners removed

// Swipe handling removed

// Section tracking removed

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        if (!data.name || !data.email || !data.message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for your message! We\'ll get back to you soon.');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .stat, .tech-item');
    animateElements.forEach(el => observer.observe(el));
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        heroVisual.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Service cards hover effect enhancement
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Portfolio items click effect
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', function() {
        // Add ripple effect
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(99, 102, 241, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.marginLeft = '-10px';
        ripple.style.marginTop = '-10px';
        
        this.style.position = 'relative';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Services navigation with arrows
document.addEventListener('DOMContentLoaded', () => {
    const servicesGrid = document.getElementById('servicesGrid');
    const prevBtn = document.getElementById('prevService');
    const nextBtn = document.getElementById('nextService');
    
    if (servicesGrid && prevBtn && nextBtn) {
        let currentIndex = 0;
        const serviceCards = servicesGrid.querySelectorAll('.service-card');
        const totalCards = serviceCards.length;
        
        // Function to update button states and card visibility
        const updateButtons = () => {
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex === totalCards - 1;
            
            // Update card visual states
            serviceCards.forEach((card, index) => {
                card.classList.remove('active', 'prev', 'next');
                
                if (index === currentIndex) {
                    card.classList.add('active');
                } else if (index === currentIndex - 1) {
                    card.classList.add('prev');
                } else if (index === currentIndex + 1) {
                    card.classList.add('next');
                }
            });
            
            // Update indicators
            const indicators = document.querySelectorAll('.service-indicator');
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentIndex);
            });
        };
        
        // Function to scroll to specific card
        const scrollToCard = (index) => {
            const cardWidth = serviceCards[0].offsetWidth + parseInt(getComputedStyle(servicesGrid).gap);
            servicesGrid.scrollTo({
                left: index * cardWidth,
                behavior: 'smooth'
            });
        };
        
        // Previous button click
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                scrollToCard(currentIndex);
                updateButtons();
            }
        });
        
        // Next button click
        nextBtn.addEventListener('click', () => {
            if (currentIndex < totalCards - 1) {
                currentIndex++;
                scrollToCard(currentIndex);
                updateButtons();
            }
        });
        
        // Touch/swipe support
        let startX = 0;
        let startY = 0;
        
        servicesGrid.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        servicesGrid.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const diffX = startX - endX;
            const diffY = startY - endY;
            
            // Only handle horizontal swipes
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0 && currentIndex < totalCards - 1) {
                    // Swipe left - next
                    currentIndex++;
                    scrollToCard(currentIndex);
                } else if (diffX < 0 && currentIndex > 0) {
                    // Swipe right - previous
                    currentIndex--;
                    scrollToCard(currentIndex);
                }
                updateButtons();
            }
        });
        
        // Add indicator click functionality
        const indicators = document.querySelectorAll('.service-indicator');
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentIndex = index;
                scrollToCard(currentIndex);
                updateButtons();
            });
        });

        // Initialize button states
        updateButtons();
        
        // Hide arrows on desktop (show only on mobile)
        const checkScreenSize = () => {
            if (window.innerWidth > 768) {
                prevBtn.style.display = 'none';
                nextBtn.style.display = 'none';
                servicesGrid.style.overflowX = 'visible';
            } else {
                prevBtn.style.display = 'flex';
                nextBtn.style.display = 'flex';
                servicesGrid.style.overflowX = 'hidden';
            }
        };
        
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
    }
});

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    /* Services scroll indicator animation */
    .services-section::after {
        animation: fadeInOut 3s ease-in-out infinite;
    }
    
    @keyframes fadeInOut {
        0%, 100% { opacity: 0.5; }
        50% { opacity: 1; }
    }
`;
document.head.appendChild(style);
