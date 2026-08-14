// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    
    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop;
});

// Gallery Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filterValue = btn.dataset.filter;
        
        // Filter gallery items
        galleryItems.forEach(item => {
            const category = item.dataset.category;
            
            if (filterValue === 'all' || category === filterValue) {
                item.classList.remove('hidden');
                item.style.animation = 'none';
                setTimeout(() => {
                    item.style.animation = 'fadeIn 0.6s ease-out forwards';
                }, 10);
            } else {
                item.classList.add('hidden');
            }
        });
    });
});

// GSAP Animations for scroll
gsap.registerPlugin(ScrollTrigger);

// Parallax effect for story section
gsap.to('.story-timeline', {
    scrollTrigger: {
        trigger: '.story',
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
    },
    duration: 1
});

// Skill cards animation on scroll
gsap.to('.skill-card', {
    scrollTrigger: {
        trigger: '.skills-grid',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    },
    duration: 0.6,
    stagger: 0.1
});

// Gallery items animation on scroll
gsap.to('.gallery-item', {
    scrollTrigger: {
        trigger: '.gallery-grid',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    },
    duration: 0.6,
    stagger: 0.1
});

// Timeline items animation
gsap.to('.timeline-item', {
    scrollTrigger: {
        trigger: '.story-timeline',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    },
    duration: 0.6,
    stagger: 0.1
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form Handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        
        // Simulate form submission
        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        
        btn.textContent = 'Message Sent! 🎉';
        btn.style.opacity = '0.7';
        btn.disabled = true;
        
        setTimeout(() => {
            contactForm.reset();
            btn.textContent = originalText;
            btn.style.opacity = '1';
            btn.disabled = false;
        }, 2000);
    });
}

// Cursor tracking animation
const addCursorTrackingToButtons = () => {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            btn.style.setProperty('--mouse-x', x + 'px');
            btn.style.setProperty('--mouse-y', y + 'px');
        });
    });
};

addCursorTrackingToButtons();

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.skill-card, .timeline-item, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Number counter animation
const animateCounters = () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = stat.textContent;
        const numericValue = parseInt(target);
        
        if (numericValue) {
            let current = 0;
            const increment = numericValue / 20;
            
            const counter = setInterval(() => {
                current += increment;
                if (current >= numericValue) {
                    stat.textContent = target;
                    clearInterval(counter);
                } else {
                    stat.textContent = Math.floor(current) + '+';
                }
            }, 50);
        }
    });
};

// Trigger counter animation when hero section is in view
const heroSection = document.querySelector('.hero');
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

heroObserver.observe(heroSection);

// Parallax effect on scroll
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    parallaxElements.forEach(el => {
        const speed = el.dataset.parallax || 0.5;
        el.style.transform = `translateY(${scrollPosition * speed}px)`;
    });
});

// Lazy load images
const lazyLoadImages = () => {
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src; // Ensure image loads
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
};

lazyLoadImages();

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Prevent scrolling while animations are happening
let isScrolling = false;

document.addEventListener('wheel', (e) => {
    if (isScrolling) {
        e.preventDefault();
    }
}, { passive: false });

// Export data to localStorage (for admin panel later)
function savePortfolioData(data) {
    localStorage.setItem('portfolioData', JSON.stringify(data));
}

// Get portfolio data from localStorage
function getPortfolioData() {
    return JSON.parse(localStorage.getItem('portfolioData')) || {
        name: 'John Mavlonov',
        title: 'Premium Pizza Chef',
        experience: '4+ Years',
        email: 'john@mavlonov.com',
        phone: '+1 (234) 567-890',
        location: 'Italy, Europe'
    };
}

// Add mobile-specific touch animations
if (window.innerWidth <= 768) {
    document.addEventListener('touchstart', function () {}, false);
}

// Advanced GSAP Animations
if (typeof gsap !== 'undefined') {
    // Hero stats cards entrance animation with stagger
    gsap.from('.stat-card', {
        duration: 1,
        y: 60,
        opacity: 0,
        stagger: 0.15,
        ease: 'back.out',
        scrollTrigger: {
            trigger: '.hero-stats',
            start: 'top 80%'
        }
    });

    // Skill cards entrance with scale effect
    gsap.from('.skill-card', {
        duration: 0.8,
        scale: 0.8,
        opacity: 0,
        stagger: 0.1,
        ease: 'back.out',
        scrollTrigger: {
            trigger: '.skills-grid',
            start: 'top 80%'
        }
    });

    // Gallery items with rotation entrance
    gsap.from('.gallery-item', {
        duration: 0.9,
        rotationX: -90,
        opacity: 0,
        transformOrigin: 'center center',
        stagger: 0.08,
        ease: 'back.out',
        scrollTrigger: {
            trigger: '.gallery-grid',
            start: 'top 75%'
        }
    });

    // Timeline items with rolling entrance
    gsap.from('.timeline-item', {
        duration: 0.8,
        x: (i) => i % 2 === 0 ? -100 : 100,
        opacity: 0,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.story-timeline',
            start: 'top 70%'
        }
    });

    // Info cards with slide and fade
    gsap.from('.info-card', {
        duration: 0.7,
        x: -50,
        opacity: 0,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.contact-info',
            start: 'top 80%'
        }
    });

    // Section headers with text reveal
    document.querySelectorAll('.section-header h2').forEach(el => {
        gsap.from(el, {
            duration: 0.8,
            y: 30,
            opacity: 0,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: el,
                start: 'top 85%'
            }
        });
    });

    // Add hover animations to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            gsap.to(btn, { duration: 0.3, scale: 1.05, boxShadow: '0 20px 50px rgba(212, 175, 55, 0.4)' });
        });
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { duration: 0.3, scale: 1, boxShadow: '0 10px 30px rgba(212, 175, 55, 0.3)' });
        });
    });

    // Parallax on scroll
    gsap.to('.hero-overlay', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5
        },
        opacity: 0.8,
        duration: 1
    });

    // Section background fade in
    document.querySelectorAll('section').forEach((section, index) => {
        gsap.from(section, {
            duration: 1,
            opacity: 0.8,
            ease: 'power1.out',
            scrollTrigger: {
                trigger: section,
                start: 'top 90%',
                markers: false
            }
        });
    });
}

// Intersection Observer for viewport animations
const createViewportAnimations = () => {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation classes
                if (entry.target.classList.contains('skill-card')) {
                    entry.target.style.animation = 'scaleInCenter 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
                }
                if (entry.target.classList.contains('gallery-item')) {
                    entry.target.style.animation = 'fadeIn 0.6s ease-out forwards';
                }
                if (entry.target.classList.contains('timeline-item')) {
                    entry.target.style.animation = 'slideInUp 0.8s ease-out forwards';
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.skill-card, .gallery-item, .timeline-item').forEach(el => {
        animationObserver.observe(el);
    });
};

// Initialize viewport animations on load
window.addEventListener('load', () => {
    createViewportAnimations();
});

// Animate progress bars on scroll
const animateProgressBars = () => {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0';
                
                setTimeout(() => {
                    gsap.to(bar, {
                        duration: 2,
                        width: width,
                        ease: 'power2.out'
                    });
                }, 200);
                
                progressObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => progressObserver.observe(bar));
};

window.addEventListener('load', animateProgressBars);

// Add smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Console art
console.log('%c🍕 John Mavlonov - Premium Pizza Chef Portfolio 🍕', 'font-size: 20px; font-weight: bold; color: #D4AF37;');
console.log('%cWelcome to a premium portfolio experience!', 'font-size: 14px; color: #E8C547;');
console.log('%cPowered by Pure HTML, CSS & JavaScript with GSAP Animations', 'font-size: 12px; color: #999;');
