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
const magneticLinks = document.querySelectorAll('.magnetic, a');

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "power2.out"
    });
});

magneticLinks.forEach(link => {
    link.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    link.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// Preloader Logic
const loaderCounter = document.querySelector('.loader-counter');
let counter = 0;

function updateCounter() {
    if (counter < 100) {
        let increment = Math.floor(Math.random() * 10) + 1;
        counter += increment;
        if (counter > 100) counter = 100;
        loaderCounter.textContent = counter;
        
        let delay = Math.floor(Math.random() * 200) + 50;
        setTimeout(updateCounter, delay);
    } else {
        // Start out animations when loaded
        startHeroAnimation();
    }
}

// Start loader
setTimeout(updateCounter, 500);

function startHeroAnimation() {
    const tl = gsap.timeline();

    tl.to(".loader-counter, .loader-text", {
        y: -100,
        opacity: 0,
        duration: 0.8,
        ease: "power4.inOut"
    })
    .to(".loader", {
        y: "-100%",
        duration: 1.2,
        ease: "power4.inOut"
    }, "-=0.4")
    .fromTo(".nav", 
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power4.out" },
        "-=0.6"
    )
    .fromTo(".hero-top .hero-label",
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

// About Text Reveal Animation
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

// Expertise Reveal Animation
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

// Contact Text Reveal
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
