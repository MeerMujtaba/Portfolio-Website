// ----- CURSOR -----
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursor-ring');
    let ringX = 0, ringY = 0, mx = 0, my = 0;

    document.addEventListener('mousemove', e => {
        mx = e.clientX; my = e.clientY;
        cursor.style.left = mx + 'px';
        cursor.style.top = my + 'px';
    });

    function animateRing() {
        ringX += (mx - ringX) * 0.12;
        ringY += (my - ringY) * 0.12;
        ring.style.left = ringX + 'px';
        ring.style.top = ringY + 'px';
        requestAnimationFrame(animateRing);
    }
    animateRing();

    document.querySelectorAll('a, button, .skill-pill, .contact-social, .edu-item').forEach(el => {
        el.addEventListener('mouseenter', () => { cursor.classList.add('hovered'); ring.classList.add('hovered'); });
        el.addEventListener('mouseleave', () => { cursor.classList.remove('hovered'); ring.classList.remove('hovered'); });
    });

    // ----- NAV -----
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    });

    // Active nav link
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(s => {
            if (window.scrollY >= s.offsetTop - 200) current = s.id;
        });
        navLinks.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href') === '#' + current) a.classList.add('active');
        });
    });

    // ----- HAMBURGER -----
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        mobileMenu.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('.mob-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            mobileMenu.classList.remove('open');
        });
    });

    // ----- TYPING -----
    const phrases = [
        'AI / ML Engineer',
        'Data Science Enthusiast',
        'Java Desktop Developer',
        'Computer Systems Student'
    ];
    let pi = 0, ci = 0, deleting = false;
    const typingEl = document.getElementById('typing-text');

    function type() {
        const phrase = phrases[pi];
        if (!deleting) {
            typingEl.textContent = phrase.substring(0, ci + 1);
            ci++;
            if (ci === phrase.length) { deleting = true; setTimeout(type, 1800); return; }
        } else {
            typingEl.textContent = phrase.substring(0, ci - 1);
            ci--;
            if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
        }
        setTimeout(type, deleting ? 45 : 70);
    }
    setTimeout(type, 600);

    // ----- SCROLL REVEAL -----
    const revealEls = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    revealEls.forEach(el => observer.observe(el));

    // ----- SKILL BARS -----
    const skillObserver = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.querySelectorAll('.skill-fill').forEach(bar => {
                    bar.style.width = bar.getAttribute('data-w');
                });
            }
        });
    }, { threshold: 0.3 });
    document.querySelectorAll('#skills').forEach(s => skillObserver.observe(s));

    // ----- SMOOTH SCROLL -----
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            e.preventDefault();
            const t = document.querySelector(a.getAttribute('href'));
            if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // ----- CONTACT FORM -----
    document.getElementById('contact-form').addEventListener('submit', e => {
        e.preventDefault();
        const btn = document.getElementById('send-btn');
        const txt = document.getElementById('btn-text');
        btn.classList.add('sent');
        txt.textContent = 'Message Sent!';
        setTimeout(() => {
            btn.classList.remove('sent');
            txt.textContent = 'Send Message';
            e.target.reset();
        }, 3000);
    });
