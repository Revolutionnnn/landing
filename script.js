// ============================================
// MBO Studio — Premium Dark 3D
// ============================================

// --- Mobile Navigation ---
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const body = document.body;

const overlay = document.createElement('div');
overlay.className = 'nav-overlay';
body.appendChild(overlay);

function openMenu() {
    navMenu.classList.add('active');
    overlay.classList.add('active');
    navToggle.setAttribute('aria-expanded', 'true');
    body.style.overflow = 'hidden';

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

// --- 3D Tilt Effect on Cards ---
function initTiltEffect() {
    if (window.innerWidth <= 768) return;

    const tiltElements = document.querySelectorAll(
        '.service-card, .work-card, .testimonial-card, .dashboard-preview'
    );

    tiltElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -6;
            const rotateY = ((x - centerX) / centerX) * 6;

            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(5px)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

// --- Hero Dashboard 3D Parallax ---
function initHeroParallax() {
    if (window.innerWidth <= 768) return;

    const dashboard = document.querySelector('.dashboard-preview');
    const heroSection = document.querySelector('.hero');

    if (!dashboard || !heroSection) return;

    heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        const rotateX = y * -8;
        const rotateY = x * 8;

        dashboard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });

    heroSection.addEventListener('mouseleave', () => {
        dashboard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
}

// --- Scroll Parallax for Background Shapes ---
function initScrollParallax() {
    if (window.innerWidth <= 768) return;

    const shapes = document.querySelectorAll('.shape-3d');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        shapes.forEach((shape, i) => {
            const speed = 0.02 + (i * 0.015);
            const yOffset = scrollY * speed;
            const rotation = scrollY * 0.02 * (i % 2 === 0 ? 1 : -1);
            shape.style.transform = `translateY(${-yOffset}px) rotate(${rotation}deg)`;
        });
    });
}

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
                    const isPlus = suffix && suffix.classList.contains('stat-plus');
                    const symbol = isPercent ? '%' : (isPlus ? '+' : '');
                    const duration = 2000;
                    const steps = 60;
                    const increment = target / steps;
                    let current = 0;
                    let step = 0;

                    const interval = setInterval(() => {
                        step++;
                        current = Math.min(Math.round(increment * step), target);
                        counter.textContent = current + symbol;

                        if (step >= steps) {
                            counter.textContent = target + symbol;
                            clearInterval(interval);
                        }
                    }, duration / steps);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) observer.observe(heroStats);

    if (resultsSection) observer.observe(resultsSection);
}

// --- Scroll Animations with Stagger ---
function initScrollAnimations() {
    const animateElements = document.querySelectorAll(
        '.service-card, .work-card, .testimonial-card, .process-step, .faq-item'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const siblings = entry.target.parentElement.children;
                const index = Array.from(siblings).indexOf(entry.target);
                entry.target.style.animationDelay = `${index * 0.1}s`;
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

// --- Section Reveal with Parallax Depth ---
function initSectionReveal() {
    if (window.innerWidth <= 768) return;

    const sectionHeaders = document.querySelectorAll('.section-header');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    sectionHeaders.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(el);
    });
}

// --- Glow Effect Following Mouse (subtle) ---
function initMouseGlow() {
    if (window.innerWidth <= 768) return;

    const glow = document.createElement('div');
    glow.style.cssText = `
        position: fixed;
        width: 400px;
        height: 400px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(139, 124, 247, 0.04) 0%, transparent 70%);
        pointer-events: none;
        z-index: 0;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s;
    `;
    document.body.appendChild(glow);

    document.addEventListener('mousemove', (e) => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    });
}

// --- Page Load ---
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });

    animateCounters();
    initScrollAnimations();
    initTiltEffect();
    initHeroParallax();
    initScrollParallax();
    initSectionReveal();
    initMouseGlow();
});

// --- Close menu on Escape key ---
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        closeMenu();
    }
});
