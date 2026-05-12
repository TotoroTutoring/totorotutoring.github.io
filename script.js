// Mobile navigation toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navbarHeight = 90; // Account for fixed navbar height
            const targetPosition = target.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
    }
});

// Form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const service = formData.get('service');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !message) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission (replace with actual form handling)
        showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
        this.reset();
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        font-weight: 500;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
    `;
    
    // Add close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        margin-left: 10px;
    `;
    
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .testimonial-card, .about-text, .profile-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Typing effect for hero section
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 50);
    }
});

// Stats counter animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const currentValue = Math.floor(start + (target - start) * easeOutExpo(progress));
        element.textContent = currentValue + (element.dataset.suffix || '');
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

function easeOutExpo(x) {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

// Animate counters when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const targetValue = parseInt(statNumber.textContent);
            
            // Store suffix (like + or %)
            const suffix = statNumber.textContent.replace(/[0-9]/g, '');
            statNumber.dataset.suffix = suffix;
            
            animateCounter(statNumber, targetValue);
            statsObserver.unobserve(entry.target);
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const stats = document.querySelectorAll('.stat');
    stats.forEach(stat => statsObserver.observe(stat));
});

// Form field focus effects
document.addEventListener('DOMContentLoaded', () => {
    const formFields = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    
    formFields.forEach(field => {
        // Add placeholder attribute for the floating label effect
        if (!field.hasAttribute('placeholder')) {
            field.setAttribute('placeholder', ' ');
        }
        
        field.addEventListener('focus', () => {
            field.parentElement.classList.add('focused');
        });
        
        field.addEventListener('blur', () => {
            if (!field.value) {
                field.parentElement.classList.remove('focused');
            }
        });
        
        // Check if field has value on load
        if (field.value) {
            field.parentElement.classList.add('focused');
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.code-window');
    
    parallaxElements.forEach(element => {
        const speed = 1.2;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Service card hover effects
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Dark mode toggle (if you want to add a light mode option)
function toggleTheme() {
    document.body.classList.toggle('light-mode');
    const isDark = !document.body.classList.contains('light-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Load saved theme
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
    }
});

// Preloader (optional)
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 300);
    }
});

// Error handling for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', () => {
            img.style.display = 'none';
        });
    });
});

// Copy to clipboard functionality (for code snippets if needed)
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Copied to clipboard!', 'success');
    }).catch(() => {
        showNotification('Failed to copy to clipboard', 'error');
    });
}

// Back to top button
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopButton.className = 'back-to-top';
backToTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #3b82f6, #2563eb);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
`;

backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.body.appendChild(backToTopButton);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.style.opacity = '1';
        backToTopButton.style.visibility = 'visible';
    } else {
        backToTopButton.style.opacity = '0';
        backToTopButton.style.visibility = 'hidden';
    }
}); 

// Lesson plan modal
const lessonData = {
    intro: {
        title: 'Intro Lesson',
        subtitle: 'A taster session to get you started',
        lessons: [
            { name: 'Getting to know you & your goals',  duration: '~10 min' },
            { name: 'Setting up VsCode + Python Introduction', duration: '~20 min' },
        ]
    },
    tutoring: {
        title: 'Python Tutoring',
        subtitle: 'Ongoing lessons tailored to your level',
        lessons: [
            { name: 'Python basics – variables, types & loops', duration: '~20 minutes' },
            { name: 'Basic operators, data types, type conversion', duration: '~30 minutes' },
            { name: 'Project: Making a simple calculator (user input, control flow, basic loops)', duration: '~1 hour' },
            { name: 'Advanced operators - modulo, floor division, exponents, syntax sugar, more control flow and PEP-8 code styling', duration: '~1 - 1.5 hour(s)' },
            { name: 'Format strings, lists, \'for\' loops, functions, scope, and best coding practices', duration: '~1 hour' },
            { name: 'Advanced functions, default parameters, keyword arguments, lambda functions, dictionaries', duration: '~1 - 1.5 hour(s)' },
            { name: 'Modules and virtual environments - "import" and "from" keywords, aliases, "pip" command, usage and benefits of virtual environments', duration: '~1.5 - 2.5 hours' },
            { name: 'Practice - Several small projects to build experience', duration: '~30 - 60 minutes' },
            { name: 'Files - opening, reading, writing, path manipulation', duration: '~30 minutes' },
            { name: 'Error handling and exceptions, understanding tracebacks, "try", "except", raising exceptions, "finally" block', duration: '~45 minutes'},
            { name: 'Sets, creating, adding / removing items, set operations and methods, iterating a set', duration: '~1 hour' },
            { name: 'Comprehensions, list comprehension, dictionary comprehension, set comprehension, using lambda in comprehensions', duration: '~45 minutes - 2 hours' },
            { name: 'Object-oriented programming, classes and objects, attributes and methods, inheritance, encapsulation, polymorphism', duration: '~2 - 3 hours' },
            { name: "Iterators and generators, creating iterators with __iter__ and __next__, generator functions with yield, generator expressions", duration: "~1 hour" },
            { name: 'Decorators and logging, understanding functions as first-class objects, creating and using decorators, "logging" module and how to use it', duration: '~1 hour' },
            { name: 'Common data formats and common use cases, reading and writing each format', duration: '~30 - 60 minutes' },
            { name: 'Custom Exceptions, type annotation, docstrings', duration: '~45 minutes' },
            { name: 'Unit testing, importance of testing, writing tests with the "unittest" framework, best practices for testing', duration: '~30 - 60 minutes' },
            { name: 'Final project - A text-based procedurally generated dungeon crawler', duration: 'Several hours' },
            
        ]   
    }
};

const modal   = document.getElementById('lesson-modal');
const modalClose = document.getElementById('modal-close');

document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', () => {
        const key  = card.dataset.service;
        const data = lessonData[key];
        if (!data) return;

        document.getElementById('modal-title').textContent    = data.title;
        document.getElementById('modal-subtitle').textContent = data.subtitle;

        const list = document.getElementById('lesson-list');
        list.innerHTML = data.lessons.map(l => `
            <li>
                <span class="lesson-name">${l.name}</span>
                <span class="lesson-duration">${l.duration}</span>
            </li>
        `).join('');

        modal.style.display = 'flex';
    });
});

function closeModal() { modal.style.display = 'none'; }

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });