// ============================================
// MBO Studio — Landing Page Services
// ============================================

// --- Mobile Navigation ---
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const body = document.body;

// Create overlay for mobile menu
const overlay = document.createElement('div');
overlay.className = 'nav-overlay';
body.appendChild(overlay);

function openMenu() {
    navMenu.classList.add('active');
    overlay.classList.add('active');
    navToggle.setAttribute('aria-expanded', 'true');
    body.style.overflow = 'hidden';

    // Animate hamburger
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
}

function closeMenu() {
    navMenu.classList.remove('active');
    overlay.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
    body.style.overflow = '';

    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
}

navToggle.addEventListener('click', () => {
    if (navMenu.classList.contains('active')) {
        closeMenu();
    } else {
        openMenu();
    }
});

overlay.addEventListener('click', closeMenu);

navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

// --- Header Scroll Effect ---
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    if (currentScroll > lastScroll && currentScroll > 200) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
});

// --- Smooth Scroll for Anchor Links ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// --- Active Nav Highlight ---
const sections = document.querySelectorAll('section[id]');

function highlightNav() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 120;
        const sectionId = section.getAttribute('id');
        const link = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (link && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(l => { l.style.color = ''; });
            if (!link.classList.contains('nav-cta')) {
                link.style.color = 'var(--primary-light)';
            }
        }
    });
}

window.addEventListener('scroll', highlightNav);

// --- Counter Animation ---
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const resultsSection = document.querySelector('.stats-banner');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    const suffix = counter.parentElement.querySelector('.stat-label');
                    const isPercent = suffix && suffix.classList.contains('stat-percent');
                    const duration = 2000;
                    const steps = 60;
                    const increment = target / steps;
                    let current = 0;
                    let step = 0;

                    const interval = setInterval(() => {
                        step++;
                        current = Math.min(Math.round(increment * step), target);
                        counter.textContent = current + (isPercent ? '%' : '+');

                        if (step >= steps) {
                            counter.textContent = target + (isPercent ? '%' : '+');
                            clearInterval(interval);
                        }
                    }, duration / steps);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    // Observe hero stats
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) observer.observe(heroStats);

    // Observe results section
    if (resultsSection) observer.observe(resultsSection);
}

// --- Scroll Animations ---
function initScrollAnimations() {
    const animateElements = document.querySelectorAll(
        '.service-card, .work-card, .pricing-card, .testimonial-card, .process-step, .faq-item'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    animateElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// --- Page Load ---
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.4s ease';
    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });

    animateCounters();
    initScrollAnimations();
});

// --- Close menu on Escape key ---
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        closeMenu();
    }
});
