document.addEventListener('DOMContentLoaded', () => {
  // Initialize all interactive systems
  initCustomCursor();
  initParticleSystem();
  initHeaderInteractions();
  initHeroInteractions();
  initCardInteractions();
  initMouseFollowEffects();
  initKeyboardShortcuts();
  initScrollAnimations();
  initTextAnimations();
  initSearchRedirect();

  initAnimeSelection(); // NEW: Added anime selection initialization
  
  // Custom cursor system
  /* ─── search-redirect utility ─────────────────────────────────── */
function initSearchRedirect() {
  const SHOWCASE_URL = '/anime/showcase/';           // change if needed

  /* buttons / icons */
  document.querySelectorAll(
      '.search-btn, .search-button, [data-search]'
  ).forEach(el =>
      el.addEventListener('click', e => {
        e.preventDefault();
        window.location.href = SHOWCASE_URL;
      })
  );

  /* <form> submits or ENTER in search inputs */
  document.querySelectorAll('form').forEach(form => {
    if (form.querySelector('input[type="search"]')) {
      form.addEventListener('submit', e => {
        e.preventDefault();
        window.location.href = SHOWCASE_URL;
      });
    }
  });
}

  function initCustomCursor() {
    if (window.innerWidth <= 768) return; // Skip on mobile
    
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    document.body.appendChild(cursor);
    
    const follower = document.createElement('div');
    follower.className = 'cursor-follower';
    document.body.appendChild(follower);
    
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });



    // Add this function to your existing landingpage.js file

// Search functionality
// Simple search redirect - always goes to showcase
// Search functionality - CORRECTED URL
// If anime URLs are under /anime/ prefix




    // Add this function to your landingpage.js
function adjustHeroForHeader() {
  const header = document.querySelector('header');
  const hero = document.querySelector('.hero');
  
  if (header && hero) {
    const headerHeight = header.offsetHeight;
    // Add more buffer space - 40px should be enough
    hero.style.paddingTop = (headerHeight + 40) + 'px';
    console.log('Header height:', headerHeight, 'Hero padding:', headerHeight + 40);
  }
}

// Make sure these are called
document.addEventListener('DOMContentLoaded', adjustHeroForHeader);
window.addEventListener('resize', adjustHeroForHeader);
// Also call after a short delay to ensure header is fully rendered
setTimeout(adjustHeroForHeader, 100);


// Call on page load and window resize
document.addEventListener('DOMContentLoaded', adjustHeroForHeader);
window.addEventListener('resize', adjustHeroForHeader);

    
    // Smooth follower animation
    function animateFollower() {
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;
      
      follower.style.left = followerX + 'px';
      follower.style.top = followerY + 'px';
      
      requestAnimationFrame(animateFollower);
    }
    animateFollower();
    
    // Interactive cursor effects - UPDATED to include anime cards
    document.querySelectorAll('a, button, .card, .logo, .tags span, .anime-card, .anime-btn').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2)';
        follower.style.transform = 'scale(1.5)';
        follower.style.borderColor = '#e6007e';
      });
      
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        follower.style.transform = 'scale(1)';
        follower.style.borderColor = 'rgba(0, 242, 227, 0.5)';
      });
    });
  }
  
  // Interactive particle system
  function initParticleSystem() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-system';
    document.body.appendChild(particleContainer);
    
    function createParticle(x, y) {
      const particle = document.createElement('div');
      particle.className = 'interactive-particle';
      particle.style.left = x + 'px';
      particle.style.top = y + 'px';
      particle.style.animationDelay = Math.random() * 2 + 's';
      particleContainer.appendChild(particle);
      
      setTimeout(() => particle.remove(), 4000);
    }
    
    // Create particles on mouse movement
    let particleTimer;
    document.addEventListener('mousemove', (e) => {
      clearTimeout(particleTimer);
      particleTimer = setTimeout(() => {
        if (Math.random() > 0.8) {
          createParticle(e.clientX, e.clientY);
        }
      }, 100);
    });
    
    // Create particles on click
    document.addEventListener('click', (e) => {
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          createParticle(
            e.clientX + (Math.random() - 0.5) * 100,
            e.clientY + (Math.random() - 0.5) * 100
          );
        }, i * 100);
      }
    });
  }
  
  // Advanced header interactions
  function initHeaderInteractions() {
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;
    let scrollTimeout;
    
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      
      // Smart header hide/show
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        header.classList.add('header-hidden');
      } else {
        header.classList.remove('header-hidden');
      }
      
      // Scrolled styling
      if (currentScrollY > 50) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
      
      lastScrollY = currentScrollY;
      
      // Reset header visibility after scroll stops
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        header.classList.remove('header-hidden');
      }, 1000);
    });
    
    // Logo click animation
    const logo = document.querySelector('.logo');
    if (logo) {
      logo.addEventListener('click', () => {
        logo.style.animation = 'none';
        setTimeout(() => {
          logo.style.animation = 'logoSpin 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        }, 10);
      });
    }
    
    // Add logo spin animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes logoSpin {
        0% { transform: rotate(0deg) scale(1); }
        50% { transform: rotate(180deg) scale(1.2); }
        100% { transform: rotate(360deg) scale(1); }
      }
    `;
    document.head.appendChild(style);
  }
  
  // Hero section interactions
  function initHeroInteractions() {
    const hero = document.querySelector('.hero');
    const heroTitle = document.querySelector('.hero h1');
    
    if (!hero || !heroTitle) return;
    
    // Mouse tracking effect
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      hero.style.setProperty('--mouse-x', x + '%');
      hero.style.setProperty('--mouse-y', y + '%');
    });
    
    // Character hover effects
    const text = heroTitle.textContent;
    heroTitle.innerHTML = text.split('').map(char => 
      `<span class="hero-text-char">${char === ' ' ? '&nbsp;' : char}</span>`
    ).join('');
    
    // Hero title click effect
    heroTitle.addEventListener('click', () => {
      const chars = heroTitle.querySelectorAll('.hero-text-char');
      chars.forEach((char, index) => {
        setTimeout(() => {
          char.style.transform = 'translateY(-20px) scale(1.3)';
          char.style.color = index % 2 ? '#e6007e' : '#00f2e3';
          setTimeout(() => {
            char.style.transform = '';
            char.style.color = '';
          }, 600);
        }, index * 100);
      });
    });
  }
  
  // Card interactions
  function initCardInteractions() {
    document.querySelectorAll('.card:not(.anime-card)').forEach(card => {
      // 3D tilt effect
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const rotateX = (e.clientY - centerY) / 10;
        const rotateY = (centerX - e.clientX) / 10;
        
        card.style.transform = `
          translateY(-15px) scale(1.03) 
          rotateX(${rotateX}deg) rotateY(${rotateY}deg)
        `;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
      
      // Card click effect
      card.addEventListener('click', () => {
        card.style.animation = 'cardPulse 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        setTimeout(() => card.style.animation = '', 600);
      });
    });
    
    // Add card pulse animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes cardPulse {
        0% { transform: scale(1.03); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1.03); }
      }
    `;
    document.head.appendChild(style);
  }
  
  // Mouse follow effects for sections
  function initMouseFollowEffects() {
    document.querySelectorAll('.explore, .anime-selection').forEach(section => {
      section.addEventListener('mousemove', (e) => {
        const rect = section.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        section.style.setProperty('--mouse-x', x + '%');
        section.style.setProperty('--mouse-y', y + '%');
      });
    });
  }
  
  // Keyboard shortcuts
  function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Space bar for scroll to next section
      if (e.code === 'Space' && !e.target.matches('input, textarea')) {
        e.preventDefault();
        const currentScroll = window.scrollY;
        const windowHeight = window.innerHeight;
        const nextPosition = Math.ceil(currentScroll / windowHeight) * windowHeight;
        
        window.scrollTo({
          top: nextPosition,
          behavior: 'smooth'
        });
      }
      
      // 'T' key to scroll to top
      if (e.key.toLowerCase() === 't') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
  
  // Scroll-triggered animations
  function initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = `fadeInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`;
        }
      });
    }, observerOptions);
    
    document.querySelectorAll('.card:not(.anime-card), .tags span, .explore h2').forEach(el => {
      observer.observe(el);
    });
    
    // Add fadeInUp animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(50px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  // Text animations
  function initTextAnimations() {
    // Typewriter effect for ASCII
    const asciiElement = document.querySelector('.ascii');
    if (asciiElement) {
      const originalText = asciiElement.textContent;
      asciiElement.textContent = '';
      
      let i = 0;
      function typeWriter() {
        if (i < originalText.length) {
          asciiElement.textContent += originalText.charAt(i);
          i++;
          setTimeout(typeWriter, 50);
        }
      }
      
      asciiElement.addEventListener('click', () => {
        asciiElement.textContent = '';
        i = 0;
        typeWriter();
      });
      
      // Start typewriter on page load
      setTimeout(typeWriter, 1000);
    }
  }

  // NEW: Anime Selection Functionality
  function initAnimeSelection() {
    const animeCards = document.querySelectorAll('.anime-card');
    const animeButtons = document.querySelectorAll('.anime-btn');
    
    // Anime data for different series
    const animeData = {
      'one-piece': {
        title: 'One Piece Timeline',
        episodes: '1000+',
        color: '#ff6b35',
        description: 'Explore the Grand Line adventure!',
        characters: ['Luffy', 'Zoro', 'Nami', 'Sanji', 'Robin']
      },
      'naruto': {
        title: 'Naruto Timeline', 
        episodes: '720',
        color: '#ff9500',
        description: 'Follow the ninja way!',
        characters: ['Naruto', 'Sasuke', 'Sakura', 'Kakashi', 'Hinata']
      },
      'attack-on-titan': {
        title: 'Attack on Titan Timeline',
        episodes: '87',
        color: '#dc2626', 
        description: 'Humanity vs Titans!',
        characters: ['Eren', 'Mikasa', 'Armin', 'Levi', 'Historia']
      },
      'jujutsu-kaisen': {
        title: 'Jujutsu Kaisen Timeline',
        episodes: '24+',
        color: '#7c3aed',
        description: 'Cursed energy battles!',
        characters: ['Yuji', 'Megumi', 'Nobara', 'Gojo', 'Maki']
      }
    };
    
    // Card hover effects with anime-specific colors
    animeCards.forEach(card => {
      const animeType = card.dataset.anime;
      const color = animeData[animeType]?.color || '#00f2e3';
      
      card.addEventListener('mouseenter', () => {
        card.style.setProperty('--hover-color', color);
        
        // Add particle effects
        createAnimeParticles(card, color);
      });
      
      card.addEventListener('mouseleave', () => {
        // Clean up particles
        const particles = card.querySelectorAll('.anime-particle');
        particles.forEach(p => p.remove());
      });
      
      // Card click animation
      card.addEventListener('click', () => {
        card.style.animation = 'cardSelect 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        setTimeout(() => card.style.animation = '', 600);
      });
    });
    
    // Button click handlers
    animeButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        const targetAnime = button.dataset.target;
        const animeInfo = animeData[targetAnime];
        
        // Button click effect
        button.style.transform = 'scale(0.95)';
        setTimeout(() => button.style.transform = '', 150);
        
        // Show anime timeline
        showAnimeTimeline(targetAnime, animeInfo);
      });
    });
    
    // Intersection Observer for anime card animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.animation = `cardFadeIn 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`;
          }, index * 200);
        }
      });
    }, observerOptions);
    
    animeCards.forEach(card => observer.observe(card));
  }
  
  // Create anime-specific particles
  function createAnimeParticles(card, color) {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const particle = document.createElement('div');
        particle.className = 'anime-particle';
        particle.style.cssText = `
          position: absolute;
          width: 4px;
          height: 4px;
          background: ${color};
          border-radius: 50%;
          pointer-events: none;
          z-index: 1;
          top: ${Math.random() * 100}%;
          left: ${Math.random() * 100}%;
          animation: particleFloat 2s ease-out forwards;
          opacity: 0.8;
        `;
        card.appendChild(particle);
        
        setTimeout(() => particle.remove(), 2000);
      }, i * 200);
    }
  }
  
  // Show anime timeline function
  function showAnimeTimeline(animeType, animeInfo) {
    console.log(`Loading ${animeInfo.title}...`);
    
    // Create timeline modal
    const modal = document.createElement('div');
    modal.className = 'anime-modal';
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h2 style="color: ${animeInfo.color};">${animeInfo.title}</h2>
          <button class="close-modal">&times;</button>
        </div>
        <div class="modal-body">
          <p><strong>Episodes:</strong> ${animeInfo.episodes}</p>
          <p><strong>Description:</strong> ${animeInfo.description}</p>
          <p><strong>Main Characters:</strong> ${animeInfo.characters.join(', ')}</p>
          <div class="timeline-placeholder">
            <h3>Timeline Coming Soon!</h3>
            <p>This will show the complete ${animeType.replace('-', ' ')} timeline with arcs, episodes, and key events.</p>
          </div>
        </div>
      </div>
    `;
    
    // Modal styling
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      backdrop-filter: blur(10px);
    `;
    
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
      background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
      padding: 2rem;
      border-radius: 20px;
      max-width: 600px;
      width: 90%;
      border: 2px solid ${animeInfo.color};
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
      color: white;
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
      modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
  }
  
  // Tag interaction effects
  document.querySelectorAll('.tags span').forEach(tag => {
    tag.addEventListener('click', () => {
      // Ripple effect
      const ripple = document.createElement('span');
      ripple.style.position = 'absolute';
      ripple.style.borderRadius = '50%';
      ripple.style.background = 'rgba(255, 255, 255, 0.6)';
      ripple.style.transform = 'scale(0)';
      ripple.style.animation = 'ripple 0.6s linear';
      ripple.style.left = '50%';
      ripple.style.top = '50%';
      ripple.style.width = '20px';
      ripple.style.height = '20px';
      ripple.style.marginLeft = '-10px';
      ripple.style.marginTop = '-10px';
      
      tag.style.position = 'relative';
      tag.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });
  
  // Add all required animations
  const allAnimationsStyle = document.createElement('style');
  allAnimationsStyle.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
    
    @keyframes cardSelect {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1.02); }
    }
    
    @keyframes cardFadeIn {
      from {
        opacity: 0;
        transform: translateY(50px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes particleFloat {
      0% {
        opacity: 0.8;
        transform: translateY(0) scale(1);
      }
      100% {
        opacity: 0;
        transform: translateY(-50px) scale(0.5);
      }
    }
  `;
  document.head.appendChild(allAnimationsStyle);
  
  // Smooth scrolling for navigation
  document.querySelectorAll('nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  console.log('🎉 Interactive animations loaded! Try these interactions:');
  console.log('• Move your mouse around');
  console.log('• Click on cards, tags, and the logo');
  console.log('• Click on anime cards and buttons');
  console.log('• Press SPACE to scroll to next section');
  console.log('• Press T to scroll to top');
  console.log('• Hover over navigation links');
});
