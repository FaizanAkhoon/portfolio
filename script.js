// Lenis Smooth Scroll
const lenis = new Lenis({
    duration: 1.5,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Custom Cursor
const cursor = document.querySelector('.cursor');

function initCursor() {
    if (!cursor) return;

    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.15,
            ease: "power2.out"
        });
    });

    refreshCursorHover();
}

function addHover() {
    if (cursor) cursor.classList.add('hover');
}

function removeHover() {
    if (cursor) cursor.classList.remove('hover');
}

function refreshCursorHover() {
    const hoverTargets = document.querySelectorAll('.magnetic, a, button, .preview-trigger, .studio-tab, .filter-btn, .device-toggle, .studio-dev-btn, .letter-screen');
    hoverTargets.forEach(el => {
        el.removeEventListener('mouseenter', addHover);
        el.removeEventListener('mouseleave', removeHover);
        el.addEventListener('mouseenter', addHover);
        el.addEventListener('mouseleave', removeHover);
    });
}

initCursor();

// Preloader Logic
const loaderCounter = document.querySelector('.loader-counter');
let counter = 0;

function updateCounter() {
    if (!loaderCounter) {
        startHeroAnimation();
        return;
    }

    if (counter < 100) {
        let increment = Math.floor(Math.random() * 12) + 2;
        counter += increment;
        if (counter > 100) counter = 100;
        loaderCounter.textContent = counter;
        
        let delay = Math.floor(Math.random() * 120) + 30;
        setTimeout(updateCounter, delay);
    } else {
        // Start out animations when loaded
        startHeroAnimation();
    }
}

// Start loader
setTimeout(updateCounter, 200);

function startHeroAnimation() {
    const tl = gsap.timeline();

    if (document.querySelector(".loader")) {
        tl.to(".loader-counter, .loader-text", {
            y: -100,
            opacity: 0,
            duration: 0.8,
            ease: "power4.inOut"
        })
        .to(".loader", {
            y: "-100%",
            duration: 1.1,
            ease: "power4.inOut"
        }, "-=0.4");
    }

    if (document.querySelector(".nav")) {
        tl.fromTo(".nav", 
            { y: -50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power4.out" },
            "-=0.6"
        );
    }

    // Main homepage hero
    if (document.querySelector(".hero-title")) {
        tl.fromTo(".hero-top .hero-label",
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" },
            "-=0.8"
        )
        .fromTo(".hero-title",
            { y: "120%" },
            { y: "0%", duration: 1.2, stagger: 0.2, ease: "power4.out" },
            "-=1"
        )
        .fromTo(".hero-bottom",
            { opacity: 0 },
            { opacity: 1, duration: 1, ease: "power2.out" },
            "-=0.5"
        );
    }

    // Projects page hero
    if (document.querySelector(".projects-hero-title")) {
        tl.fromTo(".projects-hero-top",
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
            "-=0.7"
        )
        .fromTo(".projects-hero-title",
            { y: "120%" },
            { y: "0%", duration: 1.2, stagger: 0.2, ease: "power4.out" },
            "-=0.9"
        )
        .fromTo(".projects-hero-bottom",
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
            "-=0.5"
        );
    }
}

// About Text Reveal Animation
if (document.querySelector(".about")) {
    gsap.to(".about-text .word", {
        y: "0%",
        duration: 1,
        stagger: 0.05,
        ease: "power4.out",
        scrollTrigger: {
            trigger: ".about",
            start: "top 60%",
        }
    });
}

// Expertise Reveal Animation
if (document.querySelector(".expertise-content")) {
    gsap.fromTo(".expertise-item",
        { opacity: 0, y: 50 },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".expertise-content",
                start: "top 70%",
            }
        }
    );
}

// Selected Work Items Reveal Animation (Homepage)
if (document.querySelector(".work-items")) {
    gsap.fromTo(".work-item",
        { opacity: 0, y: 60 },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".work-items",
                start: "top 75%",
            }
        }
    );
}

// Dedicated Projects Page Cards Reveal
if (document.querySelector(".projects-archive-list")) {
    gsap.fromTo(".project-card",
        { opacity: 0, y: 50 },
        {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.18,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".projects-archive-list",
                start: "top 80%",
            }
        }
    );
}

// Contact Text Reveal
if (document.querySelector(".contact")) {
    gsap.fromTo(".contact-title",
        { y: "120%" },
        {
            y: "0%",
            duration: 1.2,
            stagger: 0.2,
            ease: "power4.out",
            scrollTrigger: {
                trigger: ".contact",
                start: "top 60%",
            }
        }
    );
}

// ==========================================
// Interactive Live Preview Modal Controller
// ==========================================
const previewModal = document.getElementById('previewModal');
const modalIframe = document.getElementById('modalIframe');
const modalLoader = document.getElementById('modalLoader');
const modalSiteTitle = document.getElementById('modalSiteTitle');
const modalSiteUrl = document.getElementById('modalSiteUrl');
const modalExternalLink = document.getElementById('modalExternalLink');
const modalFrameContainer = document.getElementById('modalFrameContainer');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const modalCloseIcon = document.getElementById('modalCloseIcon');
const modalBackdrop = document.getElementById('modalBackdrop');
const deviceToggles = document.querySelectorAll('.device-toggle');

function openPreview(url, title) {
    if (!previewModal || !modalIframe) return;
    
    // Stop Lenis background scrolling while interacting with preview
    if (typeof lenis !== 'undefined') lenis.stop();
    
    if (modalSiteTitle) modalSiteTitle.textContent = title || 'Live Project Preview';
    if (modalSiteUrl) modalSiteUrl.textContent = url;
    if (modalExternalLink) modalExternalLink.href = url;
    
    // Reset device toggle to desktop
    deviceToggles.forEach(t => t.classList.toggle('active', t.dataset.device === 'desktop'));
    if (modalFrameContainer) modalFrameContainer.setAttribute('data-device', 'desktop');
    
    // Show spinner and load url
    if (modalLoader) modalLoader.classList.add('active');
    modalIframe.src = url;
    
    modalIframe.onload = () => {
        if (modalLoader) modalLoader.classList.remove('active');
    };
    
    previewModal.classList.add('active');
    previewModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closePreview() {
    if (!previewModal) return;
    previewModal.classList.remove('active');
    previewModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    
    // Resume smooth scroll
    if (typeof lenis !== 'undefined') lenis.start();
    
    setTimeout(() => {
        if (!previewModal.classList.contains('active') && modalIframe) {
            modalIframe.src = '';
        }
    }, 350);
}

// Bind modal triggers across entire document
document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.preview-btn, .preview-trigger');
    if (trigger) {
        e.preventDefault();
        const url = trigger.dataset.url;
        const title = trigger.dataset.title;
        if (url) openPreview(url, title);
    }
});

if (modalCloseBtn) modalCloseBtn.addEventListener('click', closePreview);
if (modalCloseIcon) modalCloseIcon.addEventListener('click', closePreview);
if (modalBackdrop) modalBackdrop.addEventListener('click', closePreview);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && previewModal && previewModal.classList.contains('active')) {
        closePreview();
    }
});

// Modal Device Viewport Switcher
deviceToggles.forEach(btn => {
    btn.addEventListener('click', () => {
        deviceToggles.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const device = btn.dataset.device;
        if (modalFrameContainer) {
            modalFrameContainer.setAttribute('data-device', device);
        }
    });
});

// ==========================================
// Category Filters on Dedicated Projects Page
// ==========================================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;

            projectCards.forEach(card => {
                const category = card.dataset.category;
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    gsap.fromTo(card, 
                        { opacity: 0, y: 30 }, 
                        { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }
                    );
                } else {
                    card.style.display = 'none';
                }
            });

            // Refresh ScrollTrigger and cursor triggers
            ScrollTrigger.refresh();
            refreshCursorHover();
        });
    });
}

// ==========================================
// Dedicated Live Device Studio on Projects Page
// ==========================================
const studioTabs = document.querySelectorAll('.studio-tab');
const studioIframe = document.getElementById('studioIframe');
const studioUrlText = document.getElementById('studioUrlText');
const studioPopBtn = document.getElementById('studioPopBtn');
const studioReloadBtn = document.getElementById('studioReloadBtn');
const studioLoader = document.getElementById('studioLoader');
const studioViewportContainer = document.getElementById('studioViewportContainer');
const studioDevBtns = document.querySelectorAll('.studio-dev-btn');

if (studioTabs.length > 0 && studioIframe) {
    studioTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            studioTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const url = tab.dataset.url;
            if (studioUrlText) studioUrlText.textContent = url;
            if (studioPopBtn) studioPopBtn.href = url;
            
            if (studioLoader) studioLoader.classList.add('active');
            studioIframe.src = url;
            
            studioIframe.onload = () => {
                if (studioLoader) studioLoader.classList.remove('active');
            };
        });
    });

    if (studioReloadBtn) {
        studioReloadBtn.addEventListener('click', () => {
            if (studioLoader) studioLoader.classList.add('active');
            const curSrc = studioIframe.src;
            studioIframe.src = curSrc;
            studioIframe.onload = () => {
                if (studioLoader) studioLoader.classList.remove('active');
            };
        });
    }

    studioDevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            studioDevBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const size = btn.dataset.size;
            if (studioViewportContainer) {
                studioViewportContainer.setAttribute('data-size', size);
            }
        });
    });
}

// ==========================================
// Interactive Alphabet Screens (FAIZAN BASHIR)
// ==========================================
let audioCtx = null;

function getAudioContext() {
    if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) audioCtx = new AudioContext();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    return audioCtx;
}

function playTone(freq, type = 'sine', duration = 0.08, gainVal = 0.04) {
    try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.3, ctx.currentTime + duration);
        gain.gain.setValueAtTime(gainVal, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + duration);
    } catch (e) {}
}

const letterScreens = document.querySelectorAll('.letter-screen');
const toggleAllScreensBtn = document.getElementById('toggleAllScreensBtn');

if (letterScreens.length > 0) {
    letterScreens.forEach((letter) => {
        // Melodic hover tone and dynamic mouse-tracking gradient
        letter.addEventListener('mouseenter', () => {
            const note = parseFloat(letter.dataset.note) || 440;
            playTone(note, 'sine', 0.08, 0.04);
        });

        letter.addEventListener('mousemove', (e) => {
            const rect = letter.getBoundingClientRect();
            const xPercent = Math.round(((e.clientX - rect.left) / rect.width) * 100);
            const yPercent = Math.round(((e.clientY - rect.top) / rect.height) * 100);
            letter.style.setProperty('--bg-pos', `${xPercent}% ${yPercent}%`);
        });

        // Click toggles screen-locked and triggers pulse animation
        letter.addEventListener('click', (e) => {
            e.stopPropagation();
            const note = parseFloat(letter.dataset.note) || 440;
            playTone(note * 1.5, 'triangle', 0.12, 0.06);

            letter.classList.toggle('screen-locked');
            letter.classList.add('screen-pulse');
            setTimeout(() => {
                letter.classList.remove('screen-pulse');
            }, 450);

            // Update Toggle All Button text state
            updateToggleAllBtn();
        });
    });

    if (toggleAllScreensBtn) {
        toggleAllScreensBtn.addEventListener('click', () => {
            const anyUnlocked = Array.from(letterScreens).some(l => !l.classList.contains('screen-locked'));
            
            letterScreens.forEach((letter, i) => {
                setTimeout(() => {
                    const note = parseFloat(letter.dataset.note) || 440;
                    playTone(note, 'sine', 0.07, 0.03);
                    if (anyUnlocked) {
                        letter.classList.add('screen-locked', 'screen-pulse');
                        setTimeout(() => letter.classList.remove('screen-pulse'), 450);
                    } else {
                        letter.classList.remove('screen-locked');
                    }
                    if (i === letterScreens.length - 1) updateToggleAllBtn();
                }, i * 40);
            });
        });
    }

    function updateToggleAllBtn() {
        if (!toggleAllScreensBtn) return;
        const allActive = Array.from(letterScreens).every(l => l.classList.contains('screen-locked'));
        const btnText = toggleAllScreensBtn.querySelector('.btn-text');
        if (allActive) {
            toggleAllScreensBtn.classList.add('active');
            if (btnText) btnText.textContent = 'STANDBY / RESET';
        } else {
            toggleAllScreensBtn.classList.remove('active');
            if (btnText) btnText.textContent = 'ACTIVATE ALL SCREENS';
        }
    }
}

// Initial cursor hover hookup
setTimeout(refreshCursorHover, 500);
