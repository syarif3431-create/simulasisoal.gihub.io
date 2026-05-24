/* ============================================================
   SIMULASI BELAJAR GRATIS - JavaScript
   Smooth scroll, button interactions, and animations
   ============================================================ */

// ==================== SMOOTH SCROLL ====================
// Handles smooth scrolling for all anchor links pointing to sections
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        var targetId = this.getAttribute('href');
        if (targetId === '#') return;

        var targetElement = document.querySelector(targetId);
        if (targetElement) {
            var headerHeight = document.querySelector('.header').offsetHeight;
            var targetPosition = targetElement.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== SCROLL REVEAL ANIMATION ====================
// Adds a fade-in-up animation to elements as they enter the viewport
function revealOnScroll() {
    var reveals = document.querySelectorAll('.card, .step, .feature');

    reveals.forEach(function (element) {
        var windowHeight = window.innerHeight;
        var elementTop = element.getBoundingClientRect().top;
        var revealPoint = 100;

        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('revealed');
        }
    });
}

// Initial check on page load
window.addEventListener('load', revealOnScroll);
// Check on scroll
window.addEventListener('scroll', revealOnScroll);

// ==================== HEADER SHADOW ON SCROLL ====================
// Adds a subtle shadow to the header when the user scrolls down
function handleHeaderShadow() {
    var header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.08)';
    }
}

window.addEventListener('scroll', handleHeaderShadow);

// ==================== BUTTON RIPPLE EFFECT ====================
// Adds a visual ripple effect when buttons are clicked
document.querySelectorAll('.btn').forEach(function (button) {
    button.addEventListener('click', function (e) {
        // Create ripple element
        var ripple = document.createElement('span');
        ripple.classList.add('ripple');

        // Position the ripple
        var rect = this.getBoundingClientRect();
        var size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';

        this.appendChild(ripple);

        // Remove ripple after animation completes
        setTimeout(function () {
            ripple.remove();
        }, 600);
    });
});

// ==================== ADD CSS FOR JS ANIMATIONS ====================
// Inject required animation styles dynamically
var style = document.createElement('style');
style.textContent = `
    /* Scroll reveal animation */
    .card, .step, .feature {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .card.revealed, .step.revealed, .feature.revealed {
        opacity: 1;
        transform: translateY(0);
    }

    /* Button ripple effect */
    .btn {
        position: relative;
        overflow: hidden;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.4);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
