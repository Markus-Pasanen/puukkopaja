(function () {
    'use strict';

    /* ---------- DOM REFS ---------- */
    const menuBtn    = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon   = document.getElementById('menu-icon');
    const navbar     = document.getElementById('navbar');
    const hero       = document.getElementById('hero');
    const form       = document.getElementById('contact-form');
    const yearEl     = document.getElementById('year');

    const NAV_H      = 64;

    /* ---------- MOBILE MENU TOGGLE + STAGGER ---------- */
    menuBtn.addEventListener('click', function () {
        const isOpen = !mobileMenu.classList.contains('hidden');
        if (isOpen) {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('mobile-menu-open');
            menuIcon.className = 'fa-solid fa-bars text-2xl';
        } else {
            mobileMenu.classList.remove('hidden');
            void mobileMenu.offsetWidth;
            mobileMenu.classList.add('mobile-menu-open');
            menuIcon.className = 'fa-solid fa-xmark text-2xl';
        }
    });

    document.querySelectorAll('.mobile-link').forEach(function (link) {
        link.addEventListener('click', function () {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('mobile-menu-open');
            menuIcon.className = 'fa-solid fa-bars text-2xl';
        });
    });

    /* ---------- SMOOTH SCROLL WITH OFFSET ---------- */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            var targetId = this.getAttribute('href');
            var target   = document.querySelector(targetId);
            if (target) {
                var top = target.getBoundingClientRect().top + window.pageYOffset - NAV_H;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }
        });
    });

    /* ---------- SCROLL REVEAL (Intersection Observer) ---------- */
    var revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

        revealEls.forEach(function (el) { observer.observe(el); });
    }

    /* ---------- "ORDER AS GIFT" TOAST ---------- */
    var giftBtn = document.querySelector('[data-gift]');
    if (giftBtn) {
        giftBtn.addEventListener('click', function (e) {
            e.preventDefault();
            showToast('\u2728 Lahjavaihtoehtoja saatavilla \u2014 ota yhteyttä paketointia varten');
        });
    }

    function showToast(msg) {
        var existing = document.querySelector('.toast');
        if (existing) existing.remove();

        var toast = document.createElement('div');
        toast.className = 'toast show';
        toast.textContent = msg;
        document.body.appendChild(toast);

        setTimeout(function () {
            toast.classList.remove('show');
            setTimeout(function () { toast.remove(); }, 400);
        }, 3000);
    }

    /* ---------- FORM SUBMISSION ---------- */
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var name    = document.getElementById('name').value.trim();
        var email   = document.getElementById('email').value.trim();
        var message = document.getElementById('message').value.trim();

        if (name && email && message) {
            showToast('Kiitos, ' + name + '! Palaamme asiaan 1\u20132 arkipäivän kuluessa.');
            form.reset();
        }
        console.log('Contact form submitted:', { name: name, email: email, message: message });
    });

    /* ---------- FOOTER YEAR ---------- */
    yearEl.textContent = new Date().getFullYear();

})();
