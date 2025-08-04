document.addEventListener('DOMContentLoaded', () => {
    initLoadingScreen();
    initCursorTrail();
    initScrollAnimations();
    initGenreCards();
    initFeatureCards();
    initNavigation();
    initHeroButtons();
    initStatsCounter();
    initMobileMenu();

    // Hide loading screen after initialization
    setTimeout(() => {
        hideLoadingScreen();
    }, 2000);
});

// Loading Screen
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Add some dynamic loading text
    const loadingTexts = [
        'Loading Anime Universe...',
        'Initializing Power Systems...',
        'Connecting to Character Database...',
        'Preparing Epic Adventures...',
        'Ready to Explore!'
    ];
    
    const loadingTextElement = document.querySelector('.loading-text');
    let textIndex = 0;
    
    const textInterval = setInterval(() => {
        if (textIndex < loadingTexts.length - 1) {
            loadingTextElement.textContent = loadingTexts[textIndex];
            textIndex++;
        } else {
            clearInterval(textInterval);
        }
    }, 400);
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    loadingScreen.classList.add('fade-out');
    setTimeout(() => {
        loadingScreen.style.display = 'none';
    }, 1000);
}

// Custom Cursor Trail
function initCursorTrail() {
    const cursorTrail = document.getElementById('cursorTrail');
    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateTrail() {
        trailX += (mouseX - trailX) * 0.1;
        trailY += (mouseY - trailY) * 0.1;
        
        cursorTrail.style.left = trailX + 'px';
        cursorTrail.style.top = trailY + 'px';
        
        requestAnimationFrame(animateTrail);
    }
    
    animateTrail();
    
    // Create particles on click
    document.addEventListener('click', (e) => {
        createClickParticles(e.clientX, e.clientY);
    });
}

function createClickParticles(x, y) {
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: var(--cyan);
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            z-index: 9999;
            animation: clickParticle 0.8s ease-out forwards;
        `;
        
        const angle = (i / 12) * Math.PI * 2;
        const velocity = 50 + Math.random() * 50;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        particle.style.setProperty('--vx', vx + 'px');
        particle.style.setProperty('--vy', vy + 'px');
        
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 800);
    }
    
    // Add click particle animation if not exists
    if (!document.querySelector('#click-particle-animation')) {
        const style = document.createElement('style');
        style.id = 'click-particle-animation';
        style.textContent = `
            @keyframes clickParticle {
                0% {
                    opacity: 1;
                    transform: translate(0, 0) scale(1);
                }
                100% {
                    opacity: 0;
                    transform: translate(var(--vx), var(--vy)) scale(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Navigation
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link[data-scroll]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-scroll');
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Remove active class from all nav links
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                // Add active class to clicked link
                link.classList.add('active');
                
                // Smooth scroll with offset for fixed nav
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Create navigation effect
                createNavEffect();
            }
        });
    });
    
    // Update active nav on scroll
    window.addEventListener('scroll', updateActiveNav);
}

function updateActiveNav() {
    const sections = ['genresSection', 'featuresSection'];
    const navLinks = document.querySelectorAll('.nav-link[data-scroll]');
    const scrollPos = window.scrollY + 150;
    
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-scroll') === sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        }
    });
}

function createNavEffect() {
    const effect = document.createElement('div');
    effect.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        width: 100px;
        height: 100px;
        background: radial-gradient(circle, rgba(0, 242, 227, 0.3), transparent);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: navRipple 0.8s ease-out;
        pointer-events: none;
        z-index: 9999;
    `;
    document.body.appendChild(effect);
    setTimeout(() => effect.remove(), 800);
    
    if (!document.querySelector('#nav-ripple-animation')) {
        const style = document.createElement('style');
        style.id = 'nav-ripple-animation';
        style.textContent = `
            @keyframes navRipple {
                0% { opacity: 1; transform: translate(-50%, -50%) scale(0); }
                100% { opacity: 0; transform: translate(-50%, -50%) scale(3); }
            }
        `;
        document.head.appendChild(style);
    }
}

// ✅ UPDATED: Hero Buttons with correct URLs
function initHeroButtons() {
    const startJourneyBtn = document.getElementById('startJourneyBtn');
    const watchTrailerBtn = document.getElementById('watchTrailerBtn');
    const joinNowBtn = document.getElementById('joinNowBtn');
    
    if (startJourneyBtn) {
        startJourneyBtn.addEventListener('click', () => {
            createButtonExplosion(startJourneyBtn);
            setTimeout(() => {
                // ✅ FIXED: Go to anime showcase
                window.location.href = '/anime/showcase/';
            }, 1000);
        });
    }

    if (watchTrailerBtn) {
        watchTrailerBtn.addEventListener('click', () => {
            createButtonGlow(watchTrailerBtn);
            setTimeout(() => {
                // ✅ FIXED: Go to explore
                window.location.href = '/anime/explore/';
            }, 800);
        });
    }

    if (joinNowBtn) {
        joinNowBtn.addEventListener('click', () => {
            createUltimateExplosion(joinNowBtn);
            setTimeout(() => {
                // ✅ FIXED: Go to anime showcase
                window.location.href = '/anime/showcase/';
            }, 1200);
        });
    }
}

function createButtonExplosion(button) {
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Create explosion particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: var(--cyan);
            border-radius: 50%;
            left: ${centerX}px;
            top: ${centerY}px;
            pointer-events: none;
            z-index: 9999;
            animation: explosionParticle 1s ease-out forwards;
        `;
        
        const angle = (i / 20) * Math.PI * 2;
        const velocity = 100 + Math.random() * 100;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        particle.style.setProperty('--vx', vx + 'px');
        particle.style.setProperty('--vy', vy + 'px');
        
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 1000);
    }
    
    // Add explosion animation
    if (!document.querySelector('#explosion-animation')) {
        const style = document.createElement('style');
        style.id = 'explosion-animation';
        style.textContent = `
            @keyframes explosionParticle {
                0% {
                    opacity: 1;
                    transform: translate(0, 0) scale(1);
                }
                100% {
                    opacity: 0;
                    transform: translate(var(--vx), var(--vy)) scale(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Button animation
    button.style.animation = 'buttonExplode 1s ease-out';
    setTimeout(() => {
        button.style.animation = '';
    }, 1000);
    
    if (!document.querySelector('#button-explode-animation')) {
        const style = document.createElement('style');
        style.id = 'button-explode-animation';
        style.textContent = `
            @keyframes buttonExplode {
                0% { transform: scale(1); }
                50% { transform: scale(1.2); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
    }
}

function createButtonGlow(button) {
    const glow = document.createElement('div');
    glow.style.cssText = `
        position: absolute;
        top: -10px;
        left: -10px;
        right: -10px;
        bottom: -10px;
        background: linear-gradient(45deg, var(--hot-pink), var(--purple));
        border-radius: 50px;
        opacity: 0;
        animation: buttonGlowEffect 0.8s ease-out;
        pointer-events: none;
        z-index: -1;
    `;
    button.style.position = 'relative';
    button.appendChild(glow);
    setTimeout(() => glow.remove(), 800);
    
    if (!document.querySelector('#button-glow-animation')) {
        const style = document.createElement('style');
        style.id = 'button-glow-animation';
        style.textContent = `
            @keyframes buttonGlowEffect {
                0% { opacity: 0; transform: scale(1); }
                50% { opacity: 0.5; transform: scale(1.2); }
                100% { opacity: 0; transform: scale(1.5); }
            }
        `;
        document.head.appendChild(style);
    }
}

function createUltimateExplosion(button) {
    // Multiple explosion rings
    for (let ring = 0; ring < 3; ring++) {
        setTimeout(() => {
            const explosionRing = document.createElement('div');
            explosionRing.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                border: 3px solid var(--hot-pink);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                animation: ultimateRing 1.2s ease-out;
                pointer-events: none;
                z-index: 9999;
            `;
            document.body.appendChild(explosionRing);
            setTimeout(() => explosionRing.remove(), 1200);
        }, ring * 200);
    }
    
    // Energy particles
    createButtonExplosion(button);
    
    if (!document.querySelector('#ultimate-ring-animation')) {
        const style = document.createElement('style');
        style.id = 'ultimate-ring-animation';
        style.textContent = `
            @keyframes ultimateRing {
                0% {
                    width: 0;
                    height: 0;
                    opacity: 1;
                }
                100% {
                    width: 600px;
                    height: 600px;
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ✅ UPDATED: Genre Cards with correct URLs
function initGenreCards() {
    const genreCards = document.querySelectorAll('.genre-card');
    
    genreCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const genre = card.dataset.genre;
            createGenreEffect(card, genre);
            playGenreSound(genre);
        });

        card.addEventListener('mouseleave', () => {
            removeGenreEffect(card);
        });

        card.addEventListener('click', () => {
            const genre = card.dataset.genre;
            createGenreTransition(genre);
            setTimeout(() => {
                // ✅ FIXED: Go to explore with genre filter
                window.location.href = `/anime/explore/?genre=${genre}`;
            }, 1500);
        });
    });
}

function createGenreEffect(card, genre) {
    const effects = card.querySelector('.card-effects');
    
    switch(genre) {
        case 'shounen':
            createEnergyBurst(effects);
            break;
        case 'seinen':
            createShadowWaves(effects);
            break;
        case 'shoujo':
            createSparkleShower(effects);
            break;
        case 'fantasy':
            createMagicCircles(effects);
            break;
        case 'mecha':
            createTechGrid(effects);
            break;
        case 'horror':
            createDarknessFog(effects);
            break;
    }
}

function createEnergyBurst(container) {
    for (let i = 0; i < 8; i++) {
        const burst = document.createElement('div');
        burst.className = 'temp-effect energy-line';
        burst.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 3px;
            height: 50px;
            background: linear-gradient(to bottom, var(--red), transparent);
            transform-origin: bottom;
            transform: translate(-50%, -100%) rotate(${i * 45}deg);
            animation: energyBurstEffect 0.8s ease-out;
            pointer-events: none;
        `;
        container.appendChild(burst);
    }
    
    if (!document.querySelector('#energy-burst-animation')) {
        const style = document.createElement('style');
        style.id = 'energy-burst-animation';
        style.textContent = `
            @keyframes energyBurstEffect {
                0% { height: 0; opacity: 1; }
                100% { height: 100px; opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

function createSparkleShower(container) {
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'temp-effect sparkle';
            sparkle.innerHTML = '✨';
            sparkle.style.cssText = `
                position: absolute;
                left: ${Math.random() * 100}%;
                top: 0;
                font-size: 1.2rem;
                animation: sparkleShowerEffect 2s ease-out forwards;
                pointer-events: none;
            `;
            container.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 2000);
        }, i * 100);
    }
    
    if (!document.querySelector('#sparkle-shower-animation')) {
        const style = document.createElement('style');
        style.id = 'sparkle-shower-animation';
        style.textContent = `
            @keyframes sparkleShowerEffect {
                0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                100% { transform: translateY(400px) rotate(360deg); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

function createMagicCircles(container) {
    for (let i = 0; i < 3; i++) {
        const circle = document.createElement('div');
        circle.className = 'temp-effect magic-circle';
        circle.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: ${80 + i * 40}px;
            height: ${80 + i * 40}px;
            border: 2px solid var(--cyan);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            opacity: 0.6;
            animation: magicCircleEffect ${2 + i * 0.5}s linear infinite;
            pointer-events: none;
        `;
        container.appendChild(circle);
    }
    
    if (!document.querySelector('#magic-circle-animation')) {
        const style = document.createElement('style');
        style.id = 'magic-circle-animation';
        style.textContent = `
            @keyframes magicCircleEffect {
                from { transform: translate(-50%, -50%) rotate(0deg); }
                to { transform: translate(-50%, -50%) rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
}

function removeGenreEffect(card) {
    const effects = card.querySelectorAll('.temp-effect');
    effects.forEach(effect => effect.remove());
}

function playGenreSound(genre) {
    // Add sound effects here if desired
    console.log(`Playing ${genre} sound effect`);
}

function createGenreTransition(genre) {
    const transition = document.createElement('div');
    transition.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: radial-gradient(circle, var(--cyan), var(--black));
        z-index: 9999;
        opacity: 0;
        animation: genreTransitionEffect 1.5s ease-in-out;
    `;
    document.body.appendChild(transition);
    setTimeout(() => transition.remove(), 1500);
    
    if (!document.querySelector('#genre-transition-animation')) {
        const style = document.createElement('style');
        style.id = 'genre-transition-animation';
        style.textContent = `
            @keyframes genreTransitionEffect {
                0% { opacity: 0; transform: scale(0); }
                50% { opacity: 0.8; transform: scale(1.2); }
                100% { opacity: 1; transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Feature Cards
function initFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const feature = card.dataset.feature;
            createFeatureAnimation(card, feature);
        });

        card.addEventListener('mouseleave', () => {
            removeFeatureAnimation(card);
        });
    });
}

function createFeatureAnimation(card, feature) {
    const animation = card.querySelector('.feature-animation');
    
    // Create feature-specific animations
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.className = 'feature-particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: var(--cyan);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: featureParticleFloat 3s ease-out infinite;
            animation-delay: ${i * 0.2}s;
        `;
        animation.appendChild(particle);
    }
    
    if (!document.querySelector('#feature-particle-animation')) {
        const style = document.createElement('style');
        style.id = 'feature-particle-animation';
        style.textContent = `
            @keyframes featureParticleFloat {
                0%, 100% { opacity: 0; transform: translateY(20px); }
                50% { opacity: 1; transform: translateY(-20px); }
            }
        `;
        document.head.appendChild(style);
    }
}

function removeFeatureAnimation(card) {
    const particles = card.querySelectorAll('.feature-particle');
    particles.forEach(particle => particle.remove());
}

// Stats Counter
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                animateCounter(entry.target, target);
                
                // Animate stat bar
                const statBar = entry.target.closest('.stat-card').querySelector('.stat-fill');
                if (statBar) {
                    statBar.style.width = '100%';
                }
            }
        });
    });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 60; // 60 frames
    const duration = 2000; // 2 seconds
    const stepTime = duration / 60;
    
    const timer = setInterval(() => {
        current += increment;
        element.textContent = Math.floor(current);
        
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, stepTime);
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.genre-card, .feature-card, .stat-card, .section-title');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.2
    });
    
    animatedElements.forEach(el => observer.observe(el));
}

// Mobile Menu
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-active');
            mobileToggle.classList.toggle('active');
        });
    }
}

// Additional Helper Functions
function createShadowWaves(container) {
    for (let i = 0; i < 5; i++) {
        const wave = document.createElement('div');
        wave.className = 'temp-effect shadow-wave';
        wave.style.cssText = `
            position: absolute;
            top: ${i * 20}%;
            left: 0;
            width: 100%;
            height: 20px;
            background: linear-gradient(90deg, transparent, rgba(139, 0, 139, 0.3), transparent);
            animation: shadowWaveEffect 2s ease-in-out infinite;
            animation-delay: ${i * 0.2}s;
        `;
        container.appendChild(wave);
    }
    
    if (!document.querySelector('#shadow-wave-animation')) {
        const style = document.createElement('style');
        style.id = 'shadow-wave-animation';
        style.textContent = `
            @keyframes shadowWaveEffect {
                0%, 100% { transform: translateX(-100%); }
                50% { transform: translateX(100%); }
            }
        `;
        document.head.appendChild(style);
    }
}

function createTechGrid(container) {
    const grid = document.createElement('div');
    grid.className = 'temp-effect tech-grid-overlay';
    grid.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image:
            linear-gradient(rgba(0, 242, 227, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 242, 227, 0.1) 1px, transparent 1px);
        background-size: 20px 20px;
        animation: techGridMove 2s linear infinite;
        pointer-events: none;
    `;
    container.appendChild(grid);
    
    if (!document.querySelector('#tech-grid-animation')) {
        const style = document.createElement('style');
        style.id = 'tech-grid-animation';
        style.textContent = `
            @keyframes techGridMove {
                0% { background-position: 0 0; }
                100% { background-position: 20px 20px; }
            }
        `;
        document.head.appendChild(style);
    }
}

function createDarknessFog(container) {
    for (let i = 0; i < 6; i++) {
        const fog = document.createElement('div');
        fog.className = 'temp-effect darkness-fog-wisp';
        fog.style.cssText = `
            position: absolute;
            width: 40px;
            height: 40px;
            background: radial-gradient(circle, rgba(139, 0, 0, 0.3), transparent);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: darknessFogFloat 4s ease-in-out infinite;
            animation-delay: ${i * 0.5}s;
        `;
        container.appendChild(fog);
    }
    
    if (!document.querySelector('#darkness-fog-animation')) {
        const style = document.createElement('style');
        style.id = 'darkness-fog-animation';
        style.textContent = `
            @keyframes darknessFogFloat {
                0%, 100% {
                    transform: translate(0, 0) scale(1);
                    opacity: 0.3;
                }
                50% {
                    transform: translate(20px, -20px) scale(1.5);
                    opacity: 0.6;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

console.log('🎌 Anime Homepage Activated! Welcome to the ultimate anime universe!');
