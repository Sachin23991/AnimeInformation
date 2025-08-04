document.addEventListener('DOMContentLoaded', () => {
    initVideoLoading();
    initSakuraPetals();
    initHeroAnimations();
    initGenreCards();
    initTimelineExplorer();
    initCharacterCarousel();
    initStatsCounter();
    initSearchPortal();
    initScrollAnimations();
    initSmoothScrolling(); // ✅ Added smooth scrolling
});


// ✅ Enhanced video loading and quality management
function initVideoLoading() {
    const video = document.getElementById('entranceVideo');
    
    if (video) {
        video.addEventListener('loadeddata', () => {
            video.classList.add('loaded');
            console.log('✅ Portal video loaded successfully');
        });
        
        video.addEventListener('error', (e) => {
            console.error('❌ Video loading error:', e);
            showVideoFallback();
        });
        
        video.preload = 'metadata';
        
        video.addEventListener('canplaythrough', () => {
            video.play().catch(e => {
                console.log('Video autoplay blocked, will play on user interaction');
            });
        });
        
        video.addEventListener('ended', () => {
            video.currentTime = 0;
            video.play();
        });
    }
}

function showVideoFallback() {
    const videoContainer = document.querySelector('.video-container');
    if (videoContainer) {
        videoContainer.innerHTML = `
            <div class="video-fallback">
                <div class="portal-animation">
                    <div class="portal-ring"></div>
                    <div class="portal-ring"></div>
                    <div class="portal-ring"></div>
                </div>
            </div>
        `;
    }
}

// ✅ NEW: Initialize smooth scrolling navigation
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link[data-scroll]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('data-scroll');
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Remove active class from all nav links
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                
                // Add active class to clicked link
                link.classList.add('active');
                
                // Smooth scroll to target section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Add scroll effect
                createScrollEffect(link);
            }
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
}

function createScrollEffect(clickedLink) {
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
        animation: scrollRipple 0.8s ease-out;
        pointer-events: none;
        z-index: 9999;
    `;
    document.body.appendChild(effect);
    
    setTimeout(() => effect.remove(), 800);
    
    // Add animation if not exists
    if (!document.querySelector('#scroll-animation')) {
        const style = document.createElement('style');
        style.id = 'scroll-animation';
        style.textContent = `
            @keyframes scrollRipple {
                0% { opacity: 1; transform: translate(-50%, -50%) scale(0); }
                100% { opacity: 0; transform: translate(-50%, -50%) scale(3); }
            }
        `;
        document.head.appendChild(style);
    }
}

function updateActiveNavLink() {
    const sections = ['genresSection', 'timelineSection', 'charactersSection'];
    const navLinks = document.querySelectorAll('.nav-link[data-scroll]');
    
    let currentSection = '';
    
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                currentSection = sectionId;
            }
        }
    });
    
    // Update active nav link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-scroll') === currentSection) {
            link.classList.add('active');
        }
    });
}

// Floating Sakura Petals Animation
function initSakuraPetals() {
    const sakuraContainer = document.querySelector('.sakura-petals');
    
    if (!sakuraContainer) return;
    
    function createPetal() {
        const petal = document.createElement('div');
        petal.className = 'sakura-petal';
        petal.innerHTML = '🌸';
        petal.style.left = Math.random() * 100 + '%';
        petal.style.animationDuration = (Math.random() * 3 + 2) + 's';
        petal.style.animationDelay = Math.random() * 2 + 's';
        
        sakuraContainer.appendChild(petal);
        
        setTimeout(() => {
            petal.remove();
        }, 5000);
    }
    
    setInterval(createPetal, 300);
}

// Hero Section Animations
function initHeroAnimations() {
    const enterBtn = document.getElementById('enterPortalBtn');
    
    if (enterBtn) {
        enterBtn.addEventListener('click', () => {
            enterBtn.classList.add('entering');
            
            const ripple = document.createElement('div');
            ripple.className = 'portal-ripple';
            ripple.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                background: radial-gradient(circle, rgba(0, 242, 227, 0.3), transparent);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                z-index: 9999;
                animation: portalRipple 1.5s ease-out;
            `;
            document.body.appendChild(ripple);
            
            setTimeout(() => {
                const genresSection = document.getElementById('genresSection');
                if (genresSection) {
                    genresSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
                ripple.remove();
                enterBtn.classList.remove('entering');
            }, 1500);
        });
    }
    
    // Glitch text effect
    const glitchText = document.querySelector('.glitch-text');
    if (glitchText) {
        setInterval(() => {
            glitchText.classList.add('glitch-active');
            setTimeout(() => {
                glitchText.classList.remove('glitch-active');
            }, 200);
        }, 3000);
    }
    
    // Add portal ripple animation
    if (!document.querySelector('#portal-ripple-animation')) {
        const style = document.createElement('style');
        style.id = 'portal-ripple-animation';
        style.textContent = `
            @keyframes portalRipple {
                0% { width: 0; height: 0; opacity: 1; }
                100% { width: 200vw; height: 200vw; opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Genre Cards with Flip Animation
function initGenreCards() {
    const genreCards = document.querySelectorAll('.genre-card');
    
    genreCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('flipped');
            const genre = card.dataset.genre;
            addGenreEffect(card, genre);
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('flipped');
            removeGenreEffect(card);
        });
        
        card.addEventListener('click', () => {
            createGenreTransition(card);
            setTimeout(() => {
                window.location.href = `/explore/${card.dataset.genre}/`;
            }, 1000);
        });
    });
}

function addGenreEffect(card, genre) {
    switch(genre) {
        case 'shounen':
            createEnergyAura(card);
            break;
        case 'seinen':
            createShadowEffect(card);
            break;
        case 'shoujo':
            createSparkleEffect(card);
            break;
        case 'fantasy':
            createMagicCircle(card);
            break;
        case 'mecha':
            createTechGrid(card);
            break;
        case 'horror':
            createDarknessEffect(card);
            break;
    }
}

function removeGenreEffect(card) {
    const effects = card.querySelectorAll('.temp-effect');
    effects.forEach(effect => effect.remove());
}

function createEnergyAura(element) {
    const aura = document.createElement('div');
    aura.className = 'temp-effect energy-aura-effect';
    aura.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100px;
        height: 100px;
        background: radial-gradient(circle, rgba(255, 215, 0, 0.6), transparent);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: energyPulse 1s ease-in-out infinite;
        pointer-events: none;
    `;
    element.appendChild(aura);
}

function createSparkleEffect(element) {
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'temp-effect sparkle';
            sparkle.innerHTML = '✨';
            sparkle.style.cssText = `
                position: absolute;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                font-size: 1rem;
                animation: sparkleFloat 1s ease-out forwards;
                pointer-events: none;
            `;
            element.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 1000);
        }, i * 100);
    }
    
    // Add sparkle animation if not exists
    if (!document.querySelector('#sparkle-animation')) {
        const style = document.createElement('style');
        style.id = 'sparkle-animation';
        style.textContent = `
            @keyframes sparkleFloat {
                0% { opacity: 0; transform: translateY(20px) scale(0); }
                50% { opacity: 1; transform: translateY(-10px) scale(1); }
                100% { opacity: 0; transform: translateY(-30px) scale(0); }
            }
        `;
        document.head.appendChild(style);
    }
}

function createMagicCircle(element) {
    const circle = document.createElement('div');
    circle.className = 'temp-effect magic-circle-effect';
    circle.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 120px;
        height: 120px;
        border: 2px solid var(--purple);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: magicRotate 2s linear infinite;
        pointer-events: none;
    `;
    
    const innerCircle = document.createElement('div');
    innerCircle.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 80px;
        height: 80px;
        border: 1px solid var(--cyan);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: magicRotate 2s linear infinite reverse;
    `;
    
    circle.appendChild(innerCircle);
    element.appendChild(circle);
    
    if (!document.querySelector('#magic-animation')) {
        const style = document.createElement('style');
        style.id = 'magic-animation';
        style.textContent = `
            @keyframes magicRotate {
                from { transform: translate(-50%, -50%) rotate(0deg); }
                to { transform: translate(-50%, -50%) rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
}

function createGenreTransition(card) {
    const transition = document.createElement('div');
    transition.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: radial-gradient(circle at center, var(--cyan), var(--purple));
        z-index: 9999;
        opacity: 0;
        animation: genreTransition 1s ease-in-out;
    `;
    document.body.appendChild(transition);
    
    setTimeout(() => transition.remove(), 1000);
    
    if (!document.querySelector('#genre-transition')) {
        const style = document.createElement('style');
        style.id = 'genre-transition';
        style.textContent = `
            @keyframes genreTransition {
                0% { opacity: 0; transform: scale(0); }
                50% { opacity: 0.8; transform: scale(1.2); }
                100% { opacity: 1; transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Timeline Explorer with Interactive Nodes
function initTimelineExplorer() {
    const timelineNodes = document.querySelectorAll('.timeline-node');
    const timelineProgress = document.querySelector('.timeline-progress');
    
    timelineNodes.forEach((node, index) => {
        node.addEventListener('click', () => {
            timelineNodes.forEach(n => n.classList.remove('active'));
            node.classList.add('active');
            
            const progress = ((index + 1) / timelineNodes.length) * 100;
            if (timelineProgress) {
                timelineProgress.style.width = progress + '%';
            }
            
            showEraDetails(node.dataset.era);
            createTimelineEffect(node);
        });
        
        node.addEventListener('mouseenter', () => {
            node.classList.add('hover');
            createNodeHoverEffect(node);
        });
        
        node.addEventListener('mouseleave', () => {
            node.classList.remove('hover');
        });
    });
}

function createTimelineEffect(node) {
    const effect = document.createElement('div');
    effect.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 200px;
        height: 200px;
        background: radial-gradient(circle, rgba(0, 242, 227, 0.3), transparent);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: timelineRipple 1s ease-out;
        pointer-events: none;
        z-index: -1;
    `;
    node.appendChild(effect);
    
    setTimeout(() => effect.remove(), 1000);
    
    if (!document.querySelector('#timeline-animation')) {
        const style = document.createElement('style');
        style.id = 'timeline-animation';
        style.textContent = `
            @keyframes timelineRipple {
                0% { opacity: 1; transform: translate(-50%, -50%) scale(0); }
                100% { opacity: 0; transform: translate(-50%, -50%) scale(2); }
            }
        `;
        document.head.appendChild(style);
    }
}

function createNodeHoverEffect(node) {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                width: 4px;
                height: 4px;
                background: var(--cyan);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                animation: nodeParticle 1s ease-out forwards;
                pointer-events: none;
            `;
            node.appendChild(particle);
            
            setTimeout(() => particle.remove(), 1000);
        }, i * 100);
    }
    
    if (!document.querySelector('#node-animation')) {
        const style = document.createElement('style');
        style.id = 'node-animation';
        style.textContent = `
            @keyframes nodeParticle {
                0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                100% { 
                    opacity: 0; 
                    transform: translate(
                        calc(-50% + ${Math.random() * 100 - 50}px), 
                        calc(-50% + ${Math.random() * 100 - 50}px)
                    ) scale(0); 
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function showEraDetails(era) {
    console.log(`Showing details for ${era} era`);
    // Create era detail modal or sidebar
}

// Character Carousel with 3D Effects
function initCharacterCarousel() {
    const characterCards = document.querySelectorAll('.character-card');
    
    characterCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('character-active');
            const character = card.dataset.character;
            createCharacterEffect(card, character);
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('character-active');
        });
        
        // 3D tilt effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
    });
}

function createCharacterEffect(card, character) {
    switch(character) {
        case 'luffy':
            createRubberEffect(card);
            break;
        case 'naruto':
            createChakraEffect(card);
            break;
        case 'goku':
            createKiEffect(card);
            break;
    }
}

function createRubberEffect(card) {
    const effect = document.createElement('div');
    effect.className = 'temp-effect rubber-waves';
    effect.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(255, 107, 53, 0.1) 10px,
            rgba(255, 107, 53, 0.1) 20px
        );
        animation: rubberStretch 2s ease-in-out infinite;
        pointer-events: none;
        border-radius: 20px;
    `;
    card.appendChild(effect);
    
    if (!document.querySelector('#rubber-animation')) {
        const style = document.createElement('style');
        style.id = 'rubber-animation';
        style.textContent = `
            @keyframes rubberStretch {
                0%, 100% { transform: scaleX(1) scaleY(1); }
                50% { transform: scaleX(1.1) scaleY(0.9); }
            }
        `;
        document.head.appendChild(style);
    }
}

function createChakraEffect(card) {
    for (let i = 0; i < 8; i++) {
        const chakraBall = document.createElement('div');
        chakraBall.className = 'temp-effect chakra-ball';
        chakraBall.style.cssText = `
            position: absolute;
            width: 8px;
            height: 8px;
            background: #ff9500;
            border-radius: 50%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            animation: chakraOrbit 3s linear infinite;
            animation-delay: ${i * 0.375}s;
            pointer-events: none;
        `;
        card.appendChild(chakraBall);
    }
    
    if (!document.querySelector('#chakra-animation')) {
        const style = document.createElement('style');
        style.id = 'chakra-animation';
        style.textContent = `
            @keyframes chakraOrbit {
                0% { transform: translate(-50%, -50%) rotate(0deg) translateX(60px) rotate(0deg); }
                100% { transform: translate(-50%, -50%) rotate(360deg) translateX(60px) rotate(-360deg); }
            }
        `;
        document.head.appendChild(style);
    }
}

function createKiEffect(card) {
    const aura = document.createElement('div');
    aura.className = 'temp-effect ki-aura';
    aura.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 150px;
        height: 150px;
        background: radial-gradient(circle, rgba(255, 215, 0, 0.3), transparent);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: kiPower 1.5s ease-in-out infinite;
        pointer-events: none;
    `;
    card.appendChild(aura);
    
    if (!document.querySelector('#ki-animation')) {
        const style = document.createElement('style');
        style.id = 'ki-animation';
        style.textContent = `
            @keyframes kiPower {
                0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
                50% { transform: translate(-50%, -50%) scale(1.3); opacity: 0.7; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Animated Stats Counter
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                animateCounter(entry.target, target);
                createStatParticles(entry.target.closest('.stat-card'));
            }
        });
    });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const duration = 2000;
    const stepTime = duration / 100;
    
    const timer = setInterval(() => {
        current += increment;
        element.textContent = Math.floor(current).toLocaleString();
        
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        }
    }, stepTime);
}

function createStatParticles(card) {
    const particlesContainer = card.querySelector('.stat-particles');
    if (!particlesContainer) return;
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 3px;
                height: 3px;
                background: var(--cyan);
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: statParticleFloat 2s ease-out forwards;
                pointer-events: none;
            `;
            particlesContainer.appendChild(particle);
            
            setTimeout(() => particle.remove(), 2000);
        }, i * 100);
    }
    
    if (!document.querySelector('#stat-particle-animation')) {
        const style = document.createElement('style');
        style.id = 'stat-particle-animation';
        style.textContent = `
            @keyframes statParticleFloat {
                0% { opacity: 1; transform: translateY(0px) scale(1); }
                100% { opacity: 0; transform: translateY(-50px) scale(0); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Search Portal with Suggestions
function initSearchPortal() {
    const searchInput = document.getElementById('animeSearch');
    const searchBtn = document.querySelector('.search-btn');
    const suggestions = document.querySelector('.search-suggestions');
    
    if (searchInput) {
        searchInput.addEventListener('focus', () => {
            if (suggestions) {
                suggestions.classList.add('active');
            }
            createSearchRipple();
        });
        
        searchInput.addEventListener('blur', () => {
            setTimeout(() => {
                if (suggestions) {
                    suggestions.classList.remove('active');
                }
            }, 200);
        });
        
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value;
            if (query.length > 0) {
                updateSearchSuggestions(query);
                createSearchParticles();
            }
        });
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            const query = searchInput.value.trim();
            if (query) {
                performSearch(query);
            }
        });
    }
    
    // Suggestion click handlers
    const suggestionItems = document.querySelectorAll('.suggestion-item');
    suggestionItems.forEach(item => {
        item.addEventListener('click', () => {
            if (searchInput) {
                searchInput.value = item.textContent;
                performSearch(item.textContent);
            }
        });
    });
}

function createSearchRipple() {
    const searchCircle = document.querySelector('.search-circle');
    if (!searchCircle) return;
    
    const ripple = document.createElement('div');
    ripple.className = 'search-circle-ripple';
    ripple.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border: 2px solid var(--cyan);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: searchRippleEffect 1s ease-out;
        pointer-events: none;
    `;
    searchCircle.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 1000);
    
    if (!document.querySelector('#search-ripple-animation')) {
        const style = document.createElement('style');
        style.id = 'search-ripple-animation';
        style.textContent = `
            @keyframes searchRippleEffect {
                0% { width: 0; height: 0; opacity: 1; }
                100% { width: 100px; height: 100px; opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

function createSearchParticles() {
    const searchCircle = document.querySelector('.search-circle');
    if (!searchCircle) return;
    
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: var(--cyan);
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: searchParticleFloat 1s ease-out forwards;
            pointer-events: none;
        `;
        searchCircle.appendChild(particle);
        
        setTimeout(() => particle.remove(), 1000);
    }
    
    if (!document.querySelector('#search-particle-animation')) {
        const style = document.createElement('style');
        style.id = 'search-particle-animation';
        style.textContent = `
            @keyframes searchParticleFloat {
                0% { opacity: 1; transform: translateY(0px) scale(1); }
                100% { opacity: 0; transform: translateY(-30px) scale(0); }
            }
        `;
        document.head.appendChild(style);
    }
}

function updateSearchSuggestions(query) {
    // Update suggestions based on query (implement your search logic here)
    console.log(`Searching for: ${query}`);
}

function performSearch(query) {
    console.log(`Performing search for: ${query}`);
    // Implement search functionality
    window.location.href = `/search/?q=${encodeURIComponent(query)}`;
}

// Scroll-triggered Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.section-title, .genre-card, .timeline-node, .character-card, .stat-card');
    
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

// Additional Helper Functions
function createShadowEffect(element) {
    const shadow = document.createElement('div');
    shadow.className = 'temp-effect shadow-pulse';
    shadow.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle at center, rgba(0, 0, 0, 0.8), transparent);
        animation: shadowPulse 2s ease-in-out infinite;
        pointer-events: none;
        border-radius: 20px;
    `;
    element.appendChild(shadow);
    
    if (!document.querySelector('#shadow-animation')) {
        const style = document.createElement('style');
        style.id = 'shadow-animation';
        style.textContent = `
            @keyframes shadowPulse {
                0%, 100% { opacity: 0.3; transform: scale(1); }
                50% { opacity: 0.7; transform: scale(1.1); }
            }
        `;
        document.head.appendChild(style);
    }
}

function createTechGrid(element) {
    const grid = document.createElement('div');
    grid.className = 'temp-effect tech-grid-effect';
    grid.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: 
            linear-gradient(rgba(0, 242, 227, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 242, 227, 0.2) 1px, transparent 1px);
        background-size: 20px 20px;
        animation: techGridMove 3s linear infinite;
        pointer-events: none;
        border-radius: 20px;
    `;
    element.appendChild(grid);
    
    if (!document.querySelector('#tech-animation')) {
        const style = document.createElement('style');
        style.id = 'tech-animation';
        style.textContent = `
            @keyframes techGridMove {
                0% { background-position: 0 0; }
                100% { background-position: 20px 20px; }
            }
        `;
        document.head.appendChild(style);
    }
}

function createDarknessEffect(element) {
    const darkness = document.createElement('div');
    darkness.className = 'temp-effect darkness-wave';
    darkness.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(45deg, transparent, rgba(139, 0, 0, 0.3), transparent);
        animation: darknessWave 2s ease-in-out infinite;
        pointer-events: none;
        border-radius: 20px;
    `;
    element.appendChild(darkness);
    
    if (!document.querySelector('#darkness-animation')) {
        const style = document.createElement('style');
        style.id = 'darkness-animation';
        style.textContent = `
            @keyframes darknessWave {
                0%, 100% { transform: translateX(-100%); }
                50% { transform: translateX(100%); }
            }
        `;
        document.head.appendChild(style);
    }
}

console.log('🎌 Anime Explore Page Activated!');
