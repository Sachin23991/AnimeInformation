// Anime Showcase JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Genre Filter Functionality
    const genreButtons = document.querySelectorAll('.genre-btn');
    const animeCards = document.querySelectorAll('[data-genre]');
    
    genreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedGenre = this.getAttribute('data-genre');
            
            // Update active button
            genreButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter anime cards
            animeCards.forEach(card => {
                if (selectedGenre === 'all' || card.getAttribute('data-genre') === selectedGenre) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.6s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add scroll effects
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.showcase-header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(10, 10, 10, 0.95)';
        } else {
            header.style.background = 'rgba(10, 10, 10, 0.9)';
        }
    });
    
    // Animate cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards
    document.querySelectorAll('.anime-card, .featured-card, .character-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});
