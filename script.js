// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Typing animation for hero subtitle
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Add blinking cursor effect
            element.innerHTML += '<span class="cursor">|</span>';
        }
    }
    
    type();
}

// Initialize typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const texts = [
            'Application Development Student',
            'Open Source Contributor',
            'Cybersecurity Enthusiast',
            'Full-Stack Developer'
        ];
        
        let currentTextIndex = 0;
        
        function cycleTexts() {
            typeWriter(typingElement, texts[currentTextIndex], 80);
            currentTextIndex = (currentTextIndex + 1) % texts.length;
        }
        
        // Start the first typing animation
        cycleTexts();
        
        // Change text every 4 seconds
        setInterval(cycleTexts, 4000);
    }
});

// Intersection Observer for fade-in animations
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
    const animateElements = document.querySelectorAll('.skill-category, .project-card, .stat-card, .highlight-item');
    animateElements.forEach(el => observer.observe(el));
});

// Modal functionality
const modal = document.getElementById('disclaimerModal');
const closeBtn = document.querySelector('.close');

function showDisclaimer() {
    console.log('showDisclaimer function called');
    const modal = document.getElementById('disclaimerModal');
    console.log('Modal element:', modal);
    
    if (modal) {
        modal.style.display = 'block';
        modal.style.zIndex = '9999';
        document.body.style.overflow = 'hidden';
        console.log('Modal should be visible now');
        
        // Force modal to be visible
        setTimeout(() => {
            modal.style.display = 'block';
            modal.style.opacity = '1';
            modal.style.visibility = 'visible';
        }, 10);
    } else {
        console.error('Modal element not found!');
        alert('Disclaimer modal not found. Please check the page structure.');
    }
}

function closeModal() {
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking on X or outside the modal
if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
}

window.addEventListener('click', (e) => {
    if (modal && e.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.style.display === 'block') {
        closeModal();
    }
});

// Initialize EmailJS
(function() {
    emailjs.init("LcMWngoVif9xVQWOt"); // Your EmailJS public key
})();



// Contact form handling
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Sending...</span>';
    showNotification('Sending message...', 'info');
    
    // Prepare email template parameters
    const templateParams = {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message,
        to_name: 'Yassin Benhaida'
    };
    
    // Send email using EmailJS
    emailjs.send('service_y5rw3z9', 'template_4hpca1h', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();
        }, function(error) {
            console.log('FAILED...', error);
            showNotification('Failed to send message. Please try again or contact me directly.', 'error');
        })
        .finally(function() {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i><span>Send Message</span>';
        });
});

// Email validation function
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
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Skill items hover effect
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05) translateY(-2px)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) translateY(0)';
    });
});

// Project cards hover effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Active navigation link highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Add active link styles
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #667eea !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
    
    .cursor {
        animation: blink 1s infinite;
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
`;
document.head.appendChild(style);

// Terminal typing effect for the featured project
function typeTerminalText() {
    const terminalLines = document.querySelectorAll('.terminal-line');
    terminalLines.forEach((line, index) => {
        const text = line.textContent;
        line.textContent = '';
        line.style.opacity = '0';
        
        setTimeout(() => {
            line.style.opacity = '1';
            let i = 0;
            const typeInterval = setInterval(() => {
                if (i < text.length) {
                    line.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typeInterval);
                }
            }, 50);
        }, index * 1000);
    });
}

// Initialize terminal effect when projects section is visible
const projectsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            typeTerminalText();
            projectsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const projectsSection = document.querySelector('#projects');
if (projectsSection) {
    projectsObserver.observe(projectsSection);
}

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add loading styles
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(loadingStyle);

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        showNotification('🎉 You found the secret! Welcome to the matrix!', 'success');
        document.body.style.animation = 'matrix 2s infinite';
        
        const matrixStyle = document.createElement('style');
        matrixStyle.textContent = `
            @keyframes matrix {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(matrixStyle);
        
        setTimeout(() => {
            document.body.style.animation = '';
            matrixStyle.remove();
        }, 5000);
        
        konamiCode = [];
    }
});

console.log('🚀 Yassin\'s Portfolio loaded successfully!');
console.log('💡 Try the Konami code for a surprise!');

// Add to window for testing
window.showDisclaimer = showDisclaimer;


