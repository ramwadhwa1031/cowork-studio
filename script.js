/* ============================================
   COWORKK STUDIO — Interactive JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // === Preloader ===
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('hidden');
                setTimeout(() => preloader.remove(), 600);
            }, 2000);
        });
        // Fallback: hide preloader after 4s regardless
        setTimeout(() => {
            if (preloader && !preloader.classList.contains('hidden')) {
                preloader.classList.add('hidden');
                setTimeout(() => preloader.remove(), 600);
            }
        }, 4000);
    }

    // === Navbar Scroll Effect ===
    const navbar = document.getElementById('navbar');
    const handleNavScroll = () => {
        if (navbar && !navbar.classList.contains('navbar-solid')) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    };
    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();

    // === Mobile Nav Toggle ===
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // Close mobile nav on link click
        navLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Handle click on the ::after pseudo-element ("Book a Tour" CTA)
        navLinks.addEventListener('click', (e) => {
            // Check if click was in the ::after area (below the last nav link)
            const lastLink = navLinks.querySelector('li:last-child');
            if (lastLink) {
                const lastLinkRect = lastLink.getBoundingClientRect();
                if (e.clientY > lastLinkRect.bottom + 10) {
                    // Navigate to book section
                    navToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.style.overflow = '';
                    const bookSection = document.getElementById('book');
                    if (bookSection) {
                        bookSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    } else {
                        // If on another page, go to contact page
                        window.location.href = 'contact.html#book';
                    }
                }
            }
        });

        // Close mobile nav when clicking outside (on the overlay area)
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && 
                !navLinks.contains(e.target) && 
                !navToggle.contains(e.target)) {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // === Hero Slideshow ===
    const heroSlides = document.querySelectorAll('.hero-slide');
    if (heroSlides.length > 1) {
        let currentSlide = 0;
        setInterval(() => {
            heroSlides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % heroSlides.length;
            heroSlides[currentSlide].classList.add('active');
        }, 5000);
    }

    // === Hero Particles ===
    const particleContainer = document.getElementById('hero-particles');
    if (particleContainer) {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.classList.add('hero-particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 6 + 6) + 's';
            particle.style.animationDelay = (Math.random() * 8) + 's';
            particle.style.width = (Math.random() * 3 + 1) + 'px';
            particle.style.height = particle.style.width;
            particle.style.opacity = Math.random() * 0.5 + 0.2;
            particleContainer.appendChild(particle);
        }
    }

    // === Stat Counter Animation ===
    const statNumbers = document.querySelectorAll('.stat-number');
    const animateCounter = (el) => {
        const target = parseInt(el.dataset.count);
        const duration = 2000;
        const start = performance.now();
        
        const update = (timestamp) => {
            const elapsed = timestamp - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(target * eased);
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        };
        requestAnimationFrame(update);
    };

    // Intersection Observer for counters
    if (statNumbers.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => counterObserver.observe(stat));
    }

    // === Scroll Reveal Animations ===
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Apply delay based on class
                    const el = entry.target;
                    let delay = 0;
                    if (el.classList.contains('delay-1')) delay = 150;
                    else if (el.classList.contains('delay-2')) delay = 300;
                    else if (el.classList.contains('delay-3')) delay = 450;
                    
                    setTimeout(() => {
                        el.classList.add('revealed');
                    }, delay);
                    revealObserver.unobserve(el);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // === Gallery Filter (Gallery Page) ===
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterBtns.length > 0 && galleryItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active filter
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.dataset.filter;

                galleryItems.forEach(item => {
                    if (filter === 'all' || item.dataset.category === filter) {
                        item.classList.remove('hidden');
                        item.style.animation = 'fadeUp 0.5s ease forwards';
                    } else {
                        item.classList.add('hidden');
                    }
                });
            });
        });
    }

    // === Lightbox ===
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxCounter = document.getElementById('lightbox-counter');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    
    let lightboxImages = [];
    let currentLightboxIndex = 0;

    if (lightbox && galleryItems.length > 0) {
        // Collect images
        galleryItems.forEach((item, index) => {
            const img = item.querySelector('img');
            const title = item.querySelector('h3');
            if (img) {
                lightboxImages.push({
                    src: img.src,
                    alt: img.alt,
                    caption: title ? title.textContent : ''
                });
            }

            // Open lightbox on zoom button or item click
            const zoomBtn = item.querySelector('.gallery-zoom-btn');
            const openLightbox = (e) => {
                e.preventDefault();
                e.stopPropagation();
                currentLightboxIndex = index;
                showLightboxImage();
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            };

            if (zoomBtn) zoomBtn.addEventListener('click', openLightbox);
            item.addEventListener('click', openLightbox);
        });

        const showLightboxImage = () => {
            const data = lightboxImages[currentLightboxIndex];
            if (data && lightboxImg) {
                lightboxImg.src = data.src;
                lightboxImg.alt = data.alt;
                if (lightboxCaption) lightboxCaption.textContent = data.caption;
                if (lightboxCounter) lightboxCounter.textContent = `${currentLightboxIndex + 1} / ${lightboxImages.length}`;
            }
        };

        // Close
        if (lightboxClose) {
            lightboxClose.addEventListener('click', () => {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            });
        }

        // Click outside
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Navigate
        if (lightboxPrev) {
            lightboxPrev.addEventListener('click', (e) => {
                e.stopPropagation();
                currentLightboxIndex = (currentLightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
                showLightboxImage();
            });
        }

        if (lightboxNext) {
            lightboxNext.addEventListener('click', (e) => {
                e.stopPropagation();
                currentLightboxIndex = (currentLightboxIndex + 1) % lightboxImages.length;
                showLightboxImage();
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            } else if (e.key === 'ArrowLeft') {
                currentLightboxIndex = (currentLightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
                showLightboxImage();
            } else if (e.key === 'ArrowRight') {
                currentLightboxIndex = (currentLightboxIndex + 1) % lightboxImages.length;
                showLightboxImage();
            }
        });
    }

    // === Smooth scroll for anchor links ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // === Contact Form Enhancement ===
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.innerHTML = `
                    <span>Sending...</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                `;
                submitBtn.style.pointerEvents = 'none';
                submitBtn.style.opacity = '0.7';
            }
        });
    }

    // === Tilt effect on facility cards ===
    const facilityCards = document.querySelectorAll('.facility-card');
    facilityCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // === Parallax on scroll (subtle) ===
    const heroContent = document.querySelector('.hero-content');
    const heroScroll = document.querySelector('.hero-scroll');
    if (heroContent) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            if (scrollY < window.innerHeight) {
                const opacity = Math.max(0, 1 - (scrollY / (window.innerHeight * 0.6)));
                heroContent.style.transform = `translateY(${scrollY * 0.3}px)`;
                heroContent.style.opacity = opacity;
                if (heroScroll) {
                    heroScroll.style.opacity = opacity;
                    heroScroll.style.transform = `translateX(-50%) translateY(${scrollY * 0.15}px)`;
                }
            }
        }, { passive: true });
    }
});
