// ============================================
//  script.js — Sam Adu-Gyapong Portfolio
//  IMS222 Project
// ============================================


// ── 1. Highlight the active nav link based on current page ──
function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(function(link) {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}


// ── 2. Typewriter effect for the hero subtitle ──
// If only one text is provided, types it once and stops (cursor keeps blinking).
function typewriter(elementId, texts) {
    var element = document.getElementById(elementId);
    if (!element) return;

    var textIndex = 0;
    var charIndex = 0;
    var isDeleting = false;
    var speed = 80;
    var single = texts.length === 1;

    function type() {
        var currentText = texts[textIndex];

        if (isDeleting) {
            element.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            element.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        // Single phrase: stop once fully typed
        if (single && charIndex === currentText.length) {
            return;
        }

        // Multiple phrases: pause then delete, then move to next
        if (!isDeleting && charIndex === currentText.length) {
            setTimeout(function() { isDeleting = true; }, 2200);
        }

        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }

        var delay = isDeleting ? speed / 2 : speed;
        setTimeout(type, delay);
    }

    type();
}


// ── 3. Contact form: show success message instead of broken PHP ──
function setupContactForm() {
    var form = document.querySelector('#contact-form form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        var successMsg = document.getElementById('form-success');
        if (successMsg) {
            successMsg.style.display = 'block';
            form.reset();
            // Hide the message after 5 seconds
            setTimeout(function() {
                successMsg.style.display = 'none';
            }, 5000);
        }
    });
}


// ── 4. Scroll reveal — fade sections in as they enter the viewport ──
function setupScrollReveal() {
    var elements = document.querySelectorAll('section, article.project-card');

    // Add the base reveal class to each element
    elements.forEach(function(el) {
        el.classList.add('reveal');
    });

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, { threshold: 0.08 });

    elements.forEach(function(el) {
        observer.observe(el);
    });
}


// ── 5. Back to top button ──
function setupBackToTop() {
    var btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 400) {
            btn.classList.add('show');
        } else {
            btn.classList.remove('show');
        }
    });

    btn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}


// ── Run everything once the page is loaded ──
document.addEventListener('DOMContentLoaded', function() {
    setActiveNav();
    setupContactForm();
    setupScrollReveal();
    setupBackToTop();

    // Typewriter only on the home page
    typewriter('hero-subtitle', [
        'Full Stack Developer',
        'Software Engineering Student',
        'React & Flask Builder',
        'Problem Solver'
    ]);
});
