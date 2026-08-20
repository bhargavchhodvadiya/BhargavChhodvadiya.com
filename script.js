/* ════════════════════════════════════════════
   BHARGAV CHHODVADIYA — ENHANCED PORTFOLIO
   ════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    // ─── PRELOADER ───
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 1600);
    });
    // Fallback: hide preloader after 3s even if load event is slow
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 3000);

    // ─── THEME TOGGLE ───
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);

    themeToggle.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        localStorage.setItem('portfolio-theme', next);
    });

    // ─── CUSTOM CURSOR ───
    const cursorDot = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');

    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        let mouseX = 0, mouseY = 0;
        let ringX = 0, ringY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        });

        function animateRing() {
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;
            cursorRing.style.left = ringX + 'px';
            cursorRing.style.top = ringY + 'px';
            requestAnimationFrame(animateRing);
        }
        animateRing();

        const hoverTargets = document.querySelectorAll('a, button, input, textarea, .cloud-tag, .highlight-item, .contact-card, .cert-card, .timeline-card');
        hoverTargets.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorDot.classList.add('hovering');
                cursorRing.classList.add('hovering');
            });
            el.addEventListener('mouseleave', () => {
                cursorDot.classList.remove('hovering');
                cursorRing.classList.remove('hovering');
            });
        });
    }

    // ─── NAVBAR SCROLL BEHAVIOR ───
    const navbar = document.getElementById('navbar');
    const navLinks = document.getElementById('navLinks');
    const navToggle = document.getElementById('navToggle');
    const allNavLinks = document.querySelectorAll('.nav-link');

    function handleScroll() {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        const backToTop = document.getElementById('backToTop');
        if (window.scrollY > 600) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        const sections = document.querySelectorAll('.section, .hero');
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        allNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // ─── MOBILE NAV TOGGLE ───
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('open');
        navLinks.classList.toggle('open');
    });

    allNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('open');
            navLinks.classList.remove('open');
        });
    });

    // ─── BACK TO TOP ───
    document.getElementById('backToTop').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ─── REVEAL ON SCROLL ───
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ─── SKILL BAR ANIMATION ───
    const skillBars = document.querySelectorAll('.bar-fill');
    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                setTimeout(() => {
                    bar.style.width = width + '%';
                    bar.classList.add('animated');
                }, 200);
                barObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.3 });

    skillBars.forEach(bar => barObserver.observe(bar));

    // ─── COUNTER ANIMATION ───
    const statNumbers = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-count'));
                animateCounter(el, 0, target, 1500);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));

    function animateCounter(el, start, end, duration) {
        const startTime = performance.now();
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(start + (end - start) * eased);
            el.textContent = current;
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        requestAnimationFrame(update);
    }

    // ─── TYPING EFFECT ───
    const typedTextEl = document.getElementById('typedText');
    const titles = [
        'System Administrator',
        'Desktop Support Engineer',
        'IT Infrastructure Specialist',
        'Microsoft 365 Administrator',
        'VMware & Server Administrator'
    ];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function typeEffect() {
        const currentTitle = titles[titleIndex];

        if (isDeleting) {
            typedTextEl.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            typedTextEl.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 80;
        }

        if (!isDeleting && charIndex === currentTitle.length) {
            isDeleting = true;
            typeSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typeSpeed = 500;
        }

        setTimeout(typeEffect, typeSpeed);
    }

    typeEffect();

    // ─── FLOATING PARTICLES ───
    const particlesContainer = document.getElementById('heroParticles');
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 8 + 6) + 's';
        particle.style.animationDelay = (Math.random() * 8) + 's';
        particle.style.width = (Math.random() * 3 + 1) + 'px';
        particle.style.height = particle.style.width;
        particlesContainer.appendChild(particle);
    }

    // ─── SMOOTH ANCHOR SCROLLING ───
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'));
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ─── TILT EFFECT ON CARDS ───
    const tiltCards = document.querySelectorAll('.timeline-card, .cert-card, .contact-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ════════════════════════════════
    // EMAILJS CONFIGURATION
    // ════════════════════════════════
    // Template variables used: {{name}}, {{time}}, {{message}}

    const EMAILJS_SERVICE_ID = 'service_jp5cruy';
    const EMAILJS_TEMPLATE_ID = 'template_2ziqpfj';
    const EMAILJS_PUBLIC_KEY = 'FPMHnJujuHaq9JMJt';

    // Initialize EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }

    const contactForm = document.getElementById('contactForm');
    const formSubmit = document.getElementById('formSubmit');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        if (EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID') {
            showFormMessage('Please configure EmailJS in script.js first.', 'error');
            return;
        }

        const btnText = formSubmit.querySelector('.btn-text');
        const btnLoading = formSubmit.querySelector('.btn-loading');
        const btnSuccess = formSubmit.querySelector('.btn-success');

        btnText.style.display = 'none';
        btnLoading.style.display = 'inline-flex';
        btnSuccess.style.display = 'none';
        formSubmit.disabled = true;

        const name = document.getElementById('formName').value.trim();
        const email = document.getElementById('formEmail').value.trim();
        const message = document.getElementById('formMessage').value.trim();

        const now = new Date();
        const time = now.toLocaleDateString('en-IN', {
            day: 'numeric', month: 'short', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });

        const fullMessage = `Email: ${email}\n\n${message}`;

        const templateParams = {
            name: name,
            time: time,
            message: fullMessage,
        };

        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
            .then(() => {
                btnText.style.display = 'none';
                btnLoading.style.display = 'none';
                btnSuccess.style.display = 'inline-flex';
                formSubmit.disabled = false;

                contactForm.reset();

                setTimeout(() => {
                    btnText.style.display = 'inline-flex';
                    btnSuccess.style.display = 'none';
                }, 3000);
            })
            .catch((error) => {
                console.error('EmailJS Error:', error);
                showFormMessage('Failed to send message. Please try again.', 'error');
                btnText.style.display = 'inline-flex';
                btnLoading.style.display = 'none';
                formSubmit.disabled = false;
            });
    });

    function showFormMessage(msg, type) {
        let existing = contactForm.querySelector('.form-message');
        if (existing) existing.remove();

        const div = document.createElement('div');
        div.className = 'form-message';
        div.textContent = msg;
        div.style.cssText = `
            padding: 12px 16px;
            border-radius: 8px;
            font-size: 13px;
            font-weight: 500;
            margin-top: 12px;
            text-align: center;
            background: ${type === 'error' ? 'rgba(239, 68, 68, 0.12)' : 'rgba(34, 197, 94, 0.12)'};
            color: ${type === 'error' ? '#ef4444' : '#22c55e'};
            border: 1px solid ${type === 'error' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 197, 94, 0.2)'};
        `;
        contactForm.appendChild(div);

        setTimeout(() => div.remove(), 5000);
    }

});
