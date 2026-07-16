// ============================================
// Michael Buritica — Personal Landing Page
// ============================================

// --- Translations (ES / EN) ---
const translations = {
    es: {
        'nav.home': 'Inicio',
        'nav.skills': 'Habilidades',
        'nav.contact': 'Contacto',
        'hero.badge': 'Disponible para nuevos proyectos',
        'hero.eyebrow': 'Hola, soy',
        'hero.welcome': 'Bienvenido a mi página',
        'hero.role': 'Software Engineer',
        'hero.description': 'Construyo sistemas distribuidos, automatizo infraestructura y lidero equipos para entregar productos digitales robustos. Especializado en Linux, DevOps, IA, Full Stack y Blockchain.',
        'hero.btn1': 'Ver habilidades',
        'hero.btn2': 'Contactar',
        'skills.tag': 'Habilidades',
        'skills.title': 'En qué soy',
        'skills.titleAccent': 'fuerte',
        'skills.subtitle': 'Un conjunto de disciplinas que combino para entregar productos completos, de la arquitectura al deploy.',
        'skills.linux.title': 'Linux & Sistemas',
        'skills.linux.desc': 'Administración de servidores, shell scripting y entornos de producción robustos sobre Linux.',
        'skills.devops.title': 'DevOps & CI/CD',
        'skills.devops.desc': 'Pipelines automatizados, integración y despliegue continuo, infraestructura como código y monitorización.',
        'skills.ai.title': 'Inteligencia Artificial',
        'skills.ai.desc': 'Integración de LLMs, RAG, agentes y automatización inteligente en productos reales.',
        'skills.fullstack.title': 'Full Stack',
        'skills.fullstack.desc': 'Frontend y backend extremo a extremo: interfaces modernas, APIs y bases de datos performantes.',
        'skills.architecture.title': 'Decisiones de Arquitectura',
        'skills.architecture.desc': 'Diseño sistemas escalables, tolerantes a fallos y orientados a eventos con el stack adecuado.',
        'skills.leadership.title': 'Liderazgo de Proyectos',
        'skills.leadership.desc': 'Coordino equipos, defino hitos y traduzco objetivos de negocio en entregables técnicos.',
        'skills.blockchain.title': 'Blockchain',
        'skills.blockchain.desc': 'Smart contracts, DApps y soluciones Web3 sobre Ethereum con Solidity y mejores prácticas de seguridad.',
        'skills.containers.title': 'Contenedores',
        'skills.containers.desc': 'Empaquetado, orquestación y despliegue de servicios con Docker y Kubernetes en entornos productivos.',
        'contact.tag': 'Contacto',
        'contact.title': 'Hablemos de tu',
        'contact.titleAccent': 'próximo proyecto',
        'contact.description': 'Estoy disponible para colaboraciones, proyectos freelance o roles full-time. Respondo en menos de 24 horas.',
        'contact.email': 'Envíame un email',
        'footer.rights': 'Todos los derechos reservados'
    },
    en: {
        'nav.home': 'Home',
        'nav.skills': 'Skills',
        'nav.contact': 'Contact',
        'hero.badge': 'Available for new projects',
        'hero.eyebrow': "Hi, I'm",
        'hero.welcome': 'Welcome to my page',
        'hero.role': 'Software Engineer',
        'hero.description': 'I build distributed systems, automate infrastructure and lead teams to deliver robust digital products. Specialized in Linux, DevOps, AI, Full Stack and Blockchain.',
        'hero.btn1': 'View skills',
        'hero.btn2': 'Get in touch',
        'skills.tag': 'Skills',
        'skills.title': 'What I',
        'skills.titleAccent': 'excel at',
        'skills.subtitle': 'A set of disciplines I combine to ship complete products, from architecture to deploy.',
        'skills.linux.title': 'Linux & Systems',
        'skills.linux.desc': 'Server administration, shell scripting and robust production environments on Linux.',
        'skills.devops.title': 'DevOps & CI/CD',
        'skills.devops.desc': 'Automated pipelines, continuous integration and delivery, infrastructure as code and monitoring.',
        'skills.ai.title': 'Artificial Intelligence',
        'skills.ai.desc': 'LLM integration, RAG, agents and intelligent automation in real-world products.',
        'skills.fullstack.title': 'Full Stack',
        'skills.fullstack.desc': 'End-to-end frontend and backend: modern interfaces, APIs and performant databases.',
        'skills.architecture.title': 'Architecture Decisions',
        'skills.architecture.desc': 'I design scalable, fault-tolerant, event-driven systems with the right stack.',
        'skills.leadership.title': 'Project Leadership',
        'skills.leadership.desc': 'I coordinate teams, set milestones and translate business goals into technical deliverables.',
        'skills.blockchain.title': 'Blockchain',
        'skills.blockchain.desc': 'Smart contracts, DApps and Web3 solutions on Ethereum with Solidity and security best practices.',
        'skills.containers.title': 'Containers',
        'skills.containers.desc': 'Packaging, orchestration and deployment of services with Docker and Kubernetes in production environments.',
        'contact.tag': 'Contact',
        'contact.title': "Let's talk about your",
        'contact.titleAccent': 'next project',
        'contact.description': "I'm available for collaborations, freelance projects or full-time roles. I reply within 24 hours.",
        'contact.email': 'Send me an email',
        'footer.rights': 'All rights reserved'
    }
};

// --- Language switching ---
const langButtons = document.querySelectorAll('.lang-btn');

function translateKey(key) {
    return translations[key] || key;
}

function updateContent(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key] !== undefined) {
            element.textContent = translations[lang][key];
        }
    });
    langButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    try { localStorage.setItem('lang', lang); } catch (e) {}
}

langButtons.forEach(btn => {
    btn.addEventListener('click', () => updateContent(btn.dataset.lang));
});

// Init language
(function initLang() {
    let saved = 'es';
    try { saved = localStorage.getItem('lang') || 'es'; } catch (e) {}
    updateContent(saved);
})();

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
    if (navMenu.classList.contains('active')) closeMenu();
    else openMenu();
});

overlay.addEventListener('click', closeMenu);
navLinks.forEach(link => link.addEventListener('click', closeMenu));

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) closeMenu();
});

// --- Header Scroll Effect ---
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) header.classList.add('scrolled');
    else header.classList.remove('scrolled');

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
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
    });
});

// --- Terminal Typing Animation ---
function initTerminal() {
    const terminalBody = document.getElementById('terminalBody');
    if (!terminalBody) return;

    const lines = Array.from(terminalBody.querySelectorAll('.code-line'));
    const total = lines.length;

    // Hide all initially
    lines.forEach(line => {
        line.style.opacity = '0';
        line.style.display = 'none';
    });

    // Build typing sequence: prompts type char-by-char, outputs + content fade in
    const sequences = [
        { line: lines[0], edit: 'type', full: 'whoami', delay: 200 },
        { line: lines[1], edit: 'show', delay: 280 },
        { line: lines[2], edit: 'type', full: 'cat profile.txt', delay: 280 },
        { line: lines[3], edit: 'show', delay: 280 },
        { line: lines[4], edit: 'show', delay: 110 },
        { line: lines[5], edit: 'show', delay: 110 },
        { line: lines[6], edit: 'cursor', delay: 280 }
    ];

    let idx = 0;

    function next() {
        if (idx >= sequences.length) return;
        const step = sequences[idx++];
        const node = step.line;
        node.style.display = 'block';

        if (step.edit === 'show') {
            node.style.opacity = '0';
            requestAnimationFrame(() => {
                node.style.transition = 'opacity 0.25s ease';
                node.style.opacity = '1';
            });
            setTimeout(next, step.delay);
        } else if (step.edit === 'cursor') {
            node.style.opacity = '0';
            requestAnimationFrame(() => {
                node.style.transition = 'opacity 0.25s ease';
                node.style.opacity = '1';
            });
        } else {
            // type: keep the prompt span intact, type into the .cmd-text span
            const cmdSpan = node.querySelector('.cmd-text');
            const full = step.full;
            cmdSpan.textContent = '';
            node.style.opacity = '1';
            node.classList.add('typing-cursor');
            let i = 0;
            const typeInterval = setInterval(() => {
                i++;
                cmdSpan.textContent = full.slice(0, i);
                // preserve the &nbsp; visual space for empty lines
                if (i >= full.length) {
                    clearInterval(typeInterval);
                    node.classList.remove('typing-cursor');
                    setTimeout(next, step.delay);
                }
            }, 55);
        }
    }

    next();
}

// --- Scroll Animations ---
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.skill-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    animateElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// --- Year ---
document.getElementById('year').textContent = new Date().getFullYear();

// --- Page Load ---
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.4s ease';
    requestAnimationFrame(() => { document.body.style.opacity = '1'; });

    initScrollAnimations();
    initTerminal();
});
