(function () {
    'use strict';

    /* ---------- DOM REFS ---------- */
    const navbar     = document.getElementById('navbar');
    const hero       = document.getElementById('hero');
    const form       = document.getElementById('contact-form');
    const yearEl     = document.getElementById('year');

    const NAV_H      = 64;

    /* ---------- MOBILE MENU TOGGLE (hamburger → overlay) ---------- */
    var menuToggle = document.getElementById('menu-toggle');
    var mobileOverlay = document.getElementById('mobile-overlay');

    if (menuToggle && mobileOverlay) {
        function openMenu() {
            menuToggle.classList.add('active');
            menuToggle.setAttribute('aria-expanded', 'true');
            mobileOverlay.classList.add('open');
            document.body.style.overflow = 'hidden';
        }

        function closeMenu() {
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            mobileOverlay.classList.remove('open');
            document.body.style.overflow = '';
        }

        menuToggle.addEventListener('click', function () {
            if (mobileOverlay.classList.contains('open')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        document.querySelectorAll('#mobile-overlay .mobile-link').forEach(function (link) {
            link.addEventListener('click', closeMenu);
        });
    }

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

        if (!name || !email || !message) return;

        var btn = form.querySelector('button[type="submit"]');
        var orig = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i> Lähetetään...';

        var data = new FormData(form);
        data.append('subject', 'Pieni puukkopaja - uusi yhteydenotto');

        fetch(form.action, {
            method: 'POST',
            body: data
        })
        .then(function (res) { return res.json(); })
        .then(function (result) {
            if (result.success) {
                showToast('Kiitos, ' + name + '! Palaamme asiaan 1\u20132 arkipäivän kuluessa.');
                form.reset();
            } else {
                showToast('Virhe: ' + (result.message || 'Lähetys epäonnistui. Yritä uudelleen.'));
            }
        })
        .catch(function () {
            showToast('Verkkovirhe. Tarkista yhteys ja yritä uudelleen.');
        })
        .finally(function () {
            btn.disabled = false;
            btn.innerHTML = orig;
        });
    });

    /* ---------- FOOTER YEAR ---------- */
    var currentYear = new Date().getFullYear();
    yearEl.textContent = currentYear;
    var mobileYear = document.getElementById('mobile-year');
    if (mobileYear) mobileYear.textContent = currentYear;

    /* ---------- GALLERY CAROUSEL ---------- */
    (function () {
        var track  = document.querySelector('.gallery-track');
        var slides = document.querySelectorAll('.gallery-slide');
        var dotsEl = document.querySelector('.gallery-dots');
        var prevBtn = document.querySelector('.gallery-btn.prev');
        var nextBtn = document.querySelector('.gallery-btn.next');
        var lightbox = document.querySelector('.lightbox');
        var lightboxImg = lightbox && lightbox.querySelector('img');
        var closeBtn = document.querySelector('.lightbox-close');
        var lbPrev = document.querySelector('.lightbox-btn.prev');
        var lbNext = document.querySelector('.lightbox-btn.next');

        if (!track || !slides.length) return;

        var currentIndex = 0;
        var slideCount = slides.length;

        // Build dots
        if (dotsEl) {
            for (var i = 0; i < slideCount; i++) {
                var dot = document.createElement('button');
                dot.className = 'gallery-dot' + (i === 0 ? ' active' : '');
                dot.setAttribute('aria-label', 'Siirry kuvaan ' + (i + 1));
                dot.addEventListener('click', function (idx) {
                    return function () { scrollTo(idx); };
                }(i));
                dotsEl.appendChild(dot);
            }
        }

        function getSlideData() {
            var slide = slides[0];
            var style = window.getComputedStyle(track);
            var gap = parseInt(style.gap) || 24;
            return { w: slide.offsetWidth, gap: gap };
        }

        function scrollTo(index) {
            var data = getSlideData();
            if (data.w === 0) return;
            track.scrollTo({ left: index * (data.w + data.gap), behavior: 'smooth' });
            currentIndex = index;
            updateDots();
        }

        function updateDots() {
            var data = getSlideData();
            if (data.w === 0) return;
            var idx = Math.round(track.scrollLeft / (data.w + data.gap));
            if (idx < 0) idx = 0;
            if (idx >= slideCount) idx = slideCount - 1;
            currentIndex = idx;
            var allDots = document.querySelectorAll('.gallery-dot');
            allDots.forEach(function (d, i) {
                d.classList.toggle('active', i === idx);
            });
        }

        // Navigation buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', function () {
                var data = getSlideData();
                if (data.w === 0) return;
                track.scrollBy({ left: -(data.w + data.gap), behavior: 'smooth' });
            });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', function () {
                var data = getSlideData();
                if (data.w === 0) return;
                track.scrollBy({ left: data.w + data.gap, behavior: 'smooth' });
            });
        }

        // Update dots on scroll
        track.addEventListener('scroll', function () {
            window.requestAnimationFrame(updateDots);
        });

        // Keyboard arrows when hovering carousel
        track.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowLeft') { e.preventDefault(); if (prevBtn) prevBtn.click(); }
            if (e.key === 'ArrowRight') { e.preventDefault(); if (nextBtn) nextBtn.click(); }
        });
        track.setAttribute('tabindex', '0');

        // --- Lightbox ---
        function openLightbox(index) {
            currentIndex = index;
            if (lightbox && lightboxImg) {
                var img = slides[index].querySelector('img');
                if (img) {
                    lightboxImg.src = img.src;
                    lightboxImg.alt = img.alt || '';
                    lightbox.classList.add('open');
                    document.body.style.overflow = 'hidden';
                }
            }
        }

        slides.forEach(function (slide, i) {
            slide.addEventListener('click', function () { openLightbox(i); });
        });

        function closeLightbox() {
            if (lightbox) {
                lightbox.classList.remove('open');
                document.body.style.overflow = '';
            }
        }

        if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
        if (lightbox) {
            lightbox.addEventListener('click', function (e) {
                if (e.target === lightbox) closeLightbox();
            });
        }

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeLightbox();
            if (lightbox && lightbox.classList.contains('open')) {
                if (e.key === 'ArrowLeft') { e.preventDefault(); if (lbPrev) lbPrev.click(); }
                if (e.key === 'ArrowRight') { e.preventDefault(); if (lbNext) lbNext.click(); }
            }
        });

        // Lightbox prev/next
        if (lbPrev) {
            lbPrev.addEventListener('click', function (e) {
                e.stopPropagation();
                currentIndex = (currentIndex - 1 + slideCount) % slideCount;
                var img = slides[currentIndex].querySelector('img');
                if (img && lightboxImg) {
                    lightboxImg.src = img.src;
                    lightboxImg.alt = img.alt || '';
                }
            });
        }
        if (lbNext) {
            lbNext.addEventListener('click', function (e) {
                e.stopPropagation();
                currentIndex = (currentIndex + 1) % slideCount;
                var img = slides[currentIndex].querySelector('img');
                if (img && lightboxImg) {
                    lightboxImg.src = img.src;
                    lightboxImg.alt = img.alt || '';
                }
            });
        }

        // Touch swipe for lightbox
        if (lightbox) {
            var touchStartX = 0;
            var touchEndX = 0;
            lightbox.addEventListener('touchstart', function (e) {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });
            lightbox.addEventListener('touchend', function (e) {
                touchEndX = e.changedTouches[0].screenX;
                var diff = touchStartX - touchEndX;
                if (Math.abs(diff) > 60) {
                    if (diff > 0 && lbNext) lbNext.click();
                    else if (diff < 0 && lbPrev) lbPrev.click();
                }
            }, { passive: true });
        }

        // Auto-play
        var autoTimer = null;

        function startAuto() {
            stopAuto();
            autoTimer = setInterval(function () {
                var data = getSlideData();
                if (data.w === 0) return;
                var maxScroll = track.scrollWidth - track.clientWidth;
                var next = track.scrollLeft + data.w + data.gap;
                if (next >= maxScroll) {
                    track.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    track.scrollBy({ left: data.w + data.gap, behavior: 'smooth' });
                }
            }, 4500);
        }

        function stopAuto() {
            if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
        }

        track.addEventListener('mouseenter', stopAuto);
        track.addEventListener('mouseleave', startAuto);
        track.addEventListener('touchstart', stopAuto, { passive: true });

        // Start auto-play
        startAuto();
    })();

})();
