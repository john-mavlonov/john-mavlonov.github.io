/**
 * Utility Functions for Portfolio Animations and Interactions
 * Premium Portfolio Animation Library
 */

// Animation Utilities
class AnimationUtils {
    /**
     * Create a staggered animation for multiple elements
     * @param {NodeList|Array} elements - Elements to animate
     * @param {string} animationName - CSS animation name
     * @param {object} options - Animation options
     */
    static staggerAnimation(elements, animationName, options = {}) {
        const {
            duration = 0.6,
            delay = 0.1,
            easing = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            timingFunction = 'ease-out'
        } = options;

        elements.forEach((element, index) => {
            element.style.animation = `${animationName} ${duration}s ${timingFunction} ${delay * index}s forwards`;
            element.style.opacity = '0';
        });
    }

    /**
     * Create scroll trigger animation using GSAP
     * @param {Element} element - Element to animate
     * @param {object} animationProps - Animation properties
     * @param {object} triggerProps - Trigger properties
     */
    static createScrollAnimation(element, animationProps = {}, triggerProps = {}) {
        if (typeof gsap === 'undefined') {
            console.warn('GSAP not loaded');
            return;
        }

        const defaults = {
            duration: 1,
            ease: 'power2.out'
        };

        const scrollTriggerDefaults = {
            trigger: element,
            start: 'top 80%',
            end: 'top 20%',
            toggleActions: 'play none none reverse'
        };

        gsap.to(element, {
            ...defaults,
            ...animationProps,
            scrollTrigger: {
                ...scrollTriggerDefaults,
                ...triggerProps
            }
        });
    }

    /**
     * Create parallax effect
     * @param {Element} element - Element to apply parallax
     * @param {number} speed - Parallax speed (0-1)
     */
    static createParallax(element, speed = 0.5) {
        if (typeof gsap === 'undefined') {
            console.warn('GSAP not loaded');
            return;
        }

        gsap.to(element, {
            y: -100 * (1 - speed),
            scrollTrigger: {
                trigger: element,
                start: 'top center',
                end: 'bottom center',
                scrub: true,
                markers: false
            }
        });
    }

    /**
     * Create text reveal animation
     * @param {Element} element - Text element
     * @param {string} direction - Direction: 'up', 'down', 'left', 'right'
     * @param {object} options - Animation options
     */
    static textReveal(element, direction = 'up', options = {}) {
        const animationMap = {
            up: 'textRevealUp',
            down: 'textRevealDown',
            left: 'textRevealLeft',
            right: 'textRevealRight'
        };

        const {
            duration = 0.8,
            delay = 0,
            stagger = 0.1
        } = options;

        element.style.animation = `${animationMap[direction]} ${duration}s ease-out ${delay}s forwards`;
    }

    /**
     * Create word-by-word reveal animation
     * @param {Element} element - Text container
     * @param {object} options - Animation options
     */
    static wordReveal(element, options = {}) {
        const {
            duration = 0.6,
            delay = 0.1,
            direction = 'up'
        } = options;

        const text = element.textContent;
        const words = text.split(' ');
        const animationMap = {
            up: 'textRevealUp',
            down: 'textRevealDown',
            left: 'textRevealLeft',
            right: 'textRevealRight'
        };

        element.innerHTML = words.map((word, index) => 
            `<span style="display: inline-block; animation: ${animationMap[direction]} ${duration}s ease-out ${delay * index}s forwards; opacity: 0;">${word}&nbsp;</span>`
        ).join('');
    }

    /**
     * Add hover animation effect
     * @param {Element} element - Element to add hover effect
     * @param {string} effectType - Type of effect
     */
    static addHoverEffect(element, effectType = 'scale') {
        const effects = {
            scale: () => {
                element.addEventListener('mouseenter', () => {
                    gsap.to(element, { scale: 1.05, duration: 0.3 });
                });
                element.addEventListener('mouseleave', () => {
                    gsap.to(element, { scale: 1, duration: 0.3 });
                });
            },
            lift: () => {
                element.addEventListener('mouseenter', () => {
                    gsap.to(element, { y: -10, duration: 0.3, boxShadow: '0 15px 40px rgba(0,0,0,0.1)' });
                });
                element.addEventListener('mouseleave', () => {
                    gsap.to(element, { y: 0, duration: 0.3, boxShadow: '0 5px 15px rgba(0,0,0,0.05)' });
                });
            },
            rotate: () => {
                element.addEventListener('mouseenter', () => {
                    gsap.to(element, { rotation: 5, duration: 0.3 });
                });
                element.addEventListener('mouseleave', () => {
                    gsap.to(element, { rotation: 0, duration: 0.3 });
                });
            },
            glow: () => {
                element.addEventListener('mouseenter', () => {
                    element.style.animation = 'boxGlow 1s ease-in-out infinite';
                });
                element.addEventListener('mouseleave', () => {
                    element.style.animation = 'none';
                });
            }
        };

        if (effects[effectType]) {
            effects[effectType]();
        }
    }
}

// DOM Utilities
class DOMUtils {
    /**
     * Get all elements matching selector
     * @param {string} selector - CSS selector
     * @returns {NodeList}
     */
    static query(selector) {
        return document.querySelectorAll(selector);
    }

    /**
     * Add class to element with animation
     * @param {Element} element - Element
     * @param {string} className - Class name
     */
    static addClass(element, className) {
        element.classList.add(className);
    }

    /**
     * Remove class from element
     * @param {Element} element - Element
     * @param {string} className - Class name
     */
    static removeClass(element, className) {
        element.classList.remove(className);
    }

    /**
     * Toggle class on element
     * @param {Element} element - Element
     * @param {string} className - Class name
     */
    static toggleClass(element, className) {
        element.classList.toggle(className);
    }

    /**
     * Create element with attributes
     * @param {string} tag - HTML tag
     * @param {object} attributes - Element attributes
     * @returns {Element}
     */
    static createElement(tag, attributes = {}) {
        const element = document.createElement(tag);
        Object.keys(attributes).forEach(key => {
            if (key === 'class') {
                element.className = attributes[key];
            } else if (key === 'style') {
                Object.assign(element.style, attributes[key]);
            } else {
                element.setAttribute(key, attributes[key]);
            }
        });
        return element;
    }
}

// Scroll Utilities
class ScrollUtils {
    /**
     * Smooth scroll to element
     * @param {Element|string} target - Element or selector
     * @param {number} offset - Scroll offset
     */
    static smoothScroll(target, offset = 0) {
        const element = typeof target === 'string' ? document.querySelector(target) : target;
        if (!element) return;

        const scrollTop = element.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({
            top: scrollTop,
            behavior: 'smooth'
        });
    }

    /**
     * Get scroll percentage
     * @returns {number} Scroll percentage (0-100)
     */
    static getScrollPercentage() {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        return (window.scrollY / windowHeight) * 100;
    }

    /**
     * Check if element is in viewport
     * @param {Element} element - Element to check
     * @returns {boolean}
     */
    static isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    /**
     * On scroll to element
     * @param {Element} element - Element to watch
     * @param {Function} callback - Callback function
     */
    static onScrollTo(element, callback) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    callback(entry);
                }
            });
        }, { threshold: 0.1 });

        observer.observe(element);
    }
}

// Event Utilities
class EventUtils {
    /**
     * Debounce function
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in ms
     * @returns {Function}
     */
    static debounce(func, wait = 250) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Throttle function
     * @param {Function} func - Function to throttle
     * @param {number} limit - Limit time in ms
     * @returns {Function}
     */
    static throttle(func, limit = 100) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    /**
     * Add event listener once
     * @param {Element} element - Element
     * @param {string} event - Event name
     * @param {Function} handler - Handler function
     */
    static once(element, event, handler) {
        element.addEventListener(event, function onceHandler() {
            handler();
            element.removeEventListener(event, onceHandler);
        });
    }

    /**
     * Add delegated event listener
     * @param {Element} parent - Parent element
     * @param {string} event - Event name
     * @param {string} selector - Child selector
     * @param {Function} handler - Handler function
     */
    static delegate(parent, event, selector, handler) {
        parent.addEventListener(event, (e) => {
            if (e.target.matches(selector)) {
                handler.call(e.target, e);
            }
        });
    }
}

// Timer Utilities
class TimerUtils {
    /**
     * Delay execution
     * @param {number} ms - Delay in milliseconds
     * @returns {Promise}
     */
    static delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Create countdown timer
     * @param {number} seconds - Seconds to count down
     * @param {Function} onTick - Callback on tick
     * @param {Function} onComplete - Callback on complete
     */
    static countdown(seconds, onTick, onComplete) {
        let remaining = seconds;
        const interval = setInterval(() => {
            remaining--;
            onTick(remaining);
            if (remaining <= 0) {
                clearInterval(interval);
                onComplete();
            }
        }, 1000);
    }
}

// Storage Utilities
class StorageUtils {
    /**
     * Set item in localStorage
     * @param {string} key - Storage key
     * @param {any} value - Value to store
     */
    static setItem(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Storage error:', error);
        }
    }

    /**
     * Get item from localStorage
     * @param {string} key - Storage key
     * @returns {any}
     */
    static getItem(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('Storage error:', error);
            return null;
        }
    }

    /**
     * Remove item from localStorage
     * @param {string} key - Storage key
     */
    static removeItem(key) {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Storage error:', error);
        }
    }

    /**
     * Clear all localStorage
     */
    static clear() {
        try {
            localStorage.clear();
        } catch (error) {
            console.error('Storage error:', error);
        }
    }
}

// Export utilities globally
window.AnimationUtils = AnimationUtils;
window.DOMUtils = DOMUtils;
window.ScrollUtils = ScrollUtils;
window.EventUtils = EventUtils;
window.TimerUtils = TimerUtils;
window.StorageUtils = StorageUtils;
