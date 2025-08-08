//
// Wave Dating Website - Clean & Reliable Scripts with Content Management
//

// Force page to start at top - Multiple approaches for reliability
window.scrollTo(0, 0);
document.documentElement.scrollTop = 0;
document.body.scrollTop = 0;

// Disable browser scroll restoration
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

// Clear any URL hash that might cause scrolling
if (window.location.hash) {
    history.replaceState(null, null, window.location.pathname + window.location.search);
}

// Additional scroll reset after page elements load
setTimeout(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
}, 100);

// 📹 CONTENT CONFIGURATION - Easy to customize!
const WEBSITE_CONTENT = {
    // Match popup settings
    matchSettings: {
        enabled: true,           // Set to false to disable completely
        frequency: 0.03,         // 3% chance (much lower frequency)
        onlyManualSwipes: true,  // Only show on manual swipes, not autoplay
        duration: 2000           // Shorter duration - 2 seconds
    },
    // Video sources for different sections
    videos: {
        hero: {
            src: 'assets/img/4584890.mp4',
            fallback: 'assets/img/demo-screen.mp4',
            poster: 'assets/img/portrait_black.png'
        },
        features: {
            src: 'assets/img/9460275.mp4',
            fallback: 'assets/img/demo-screen.mp4',
            poster: 'assets/img/portrait_black.png'
        }
    },
    
    // Dating cards data - easily customizable
    datingCards: [
        {
            name: 'Jordan',
            age: 25,
            description: 'Fitness enthusiast 💪',
            location: 'Miami',
            video: 'assets/img/workoutgirl.mp4',
            poster: 'assets/img/portrait_black.png'
        },
        {
            name: 'Sam',
            age: 27,
            description: 'Music producer 🎵',
            location: 'Nashville',
            video: 'assets/img/7722232-uhd_2160_3840_25fps.mp4',
            poster: 'assets/img/portrait_black.png'
        },
        {
            name: 'Alex',
            age: 26,
            description: 'Adventure seeker 🏔️',
            location: 'New York',
            video: 'assets/img/4762777-uhd_2160_4096_24fps.mp4',
            poster: 'assets/img/portrait_black.png'
        },
        {
            name: 'Emma',
            age: 24,
            description: 'Coffee lover ☕',
            location: 'Los Angeles',
            video: 'assets/img/5637945-uhd_2160_3840_24fps.mp4',
            poster: 'assets/img/portrait_black.png'
        }
    ],
    
    // App store links
    appLinks: {
        ios: 'https://apps.apple.com/us/app/wave-dating/id1520259972'
    }
};

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Wave Dating Website - Loading with Content Management...');
    
    // Force scroll to top one more time - robust approach
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Clear hash from URL if present
    if (window.location.hash) {
        history.replaceState(null, null, window.location.pathname + window.location.search);
    }
    
    // Initialize all features
    initNavigation();
    initModals();
    initVideos();
    initAnimations();
    
    // Initialize enhanced features if libraries are available
    const initializeEnhancedFeatures = () => {
        addDebugMessage('🔍 Checking for libraries...');
        addDebugMessage('GSAP available: ' + (typeof gsap !== 'undefined'));
        addDebugMessage('Swiper available: ' + (typeof Swiper !== 'undefined'));
        
        if (typeof gsap !== 'undefined') {
            initGSAPAnimations();
        } else {
            // Fallback: show content without animation
            addDebugMessage('⚠️ GSAP not found, showing content without animation');
            setTimeout(() => {
                document.body.classList.add('gsap-loaded');
                const heroElements = document.querySelectorAll('.app-badge, h1, .masthead p, .download-btn');
                heroElements.forEach(el => {
                    el.style.opacity = '1';
                    el.style.visibility = 'visible';
                });
            }, 300);
        }
        
        if (typeof Swiper !== 'undefined') {
            addDebugMessage('✅ Swiper library found, initializing dating cards...');
            initDatingCards();
        } else {
            addDebugMessage('❌ Swiper library not found, retrying...');
            setTimeout(initializeEnhancedFeatures, 500);
        }
    };
    
    setTimeout(initializeEnhancedFeatures, 200);
    
    // Add scroll-based video performance management
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            // Check if we're near the dating cards section
            const datingSection = document.querySelector('.dating-cards-section');
            if (datingSection) {
                const rect = datingSection.getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                
                // If dating cards section is approaching or visible
                if (rect.top < viewportHeight && rect.bottom > 0) {
                    // Pause other videos to prioritize dating cards performance (but NOT iPhone videos)
                    document.querySelectorAll('video').forEach(video => {
                        const isPhoneMockup = video.closest('.masthead-device-mockup') || video.closest('.features-device-mockup');
                        const isDatingCard = video.closest('.dating-cards-section');
                        
                        if (!isPhoneMockup && !isDatingCard && !video.paused) {
                            video.pause();
                            addDebugMessage('⏸️ Pausing video for dating cards priority');
                        }
                    });
                }
            }
        }, 100); // Debounce scroll events
    }, { passive: true });

    console.log('✅ Wave Dating Website - Ready with Content System!');
});

// Navigation functionality
function initNavigation() {
    // Bootstrap ScrollSpy
    const mainNav = document.querySelector('#mainNav');
    if (mainNav && window.bootstrap) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74
        });
    }

    // Navbar collapse
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navLinks = document.querySelectorAll('#navbarResponsive .nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarToggler && window.getComputedStyle(navbarToggler).display !== 'none') {
                const collapse = bootstrap.Collapse.getInstance(document.querySelector('#navbarResponsive'));
                if (collapse) {
                    collapse.hide();
                }
            }
        });
    });

    // Navbar scroll effect
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const navbar = document.querySelector('#mainNav');
                if (navbar) {
                    if (window.scrollY > 50) {
                        navbar.classList.add('navbar-scrolled');
                        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                        navbar.style.backdropFilter = 'blur(10px)';
                    } else {
                        navbar.classList.remove('navbar-scrolled');
                        navbar.style.backgroundColor = 'transparent';
                        navbar.style.backdropFilter = 'none';
                    }
                }
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Modal functionality
function initModals() {
    const modalTriggers = document.querySelectorAll('[data-bs-toggle="modal"]');
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-bs-target');
            const modal = document.querySelector(targetId);
            if (modal && window.bootstrap) {
                const bsModal = new bootstrap.Modal(modal);
                bsModal.show();
            }
        });
    });

    // Modal event handlers
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('shown.bs.modal', function() {
            const firstInput = this.querySelector('input[type="text"], input[type="email"], textarea');
            if (firstInput) {
                firstInput.focus();
            }
        });
    });
}

// Global video performance manager
let activeVideoSections = new Set();

function pauseNonEssentialVideos(exceptSection = null) {
    document.querySelectorAll('video').forEach(video => {
        // NEVER pause iPhone mockup videos
        const isPhoneMockup = video.closest('.masthead-device-mockup') || video.closest('.features-device-mockup');
        if (isPhoneMockup) {
            return; // Skip iPhone videos entirely
        }
        
        const section = video.closest('section') || video.closest('.masthead');
        if (section !== exceptSection && !video.paused) {
            video.pause();
            addDebugMessage('⏸️ Pausing background video for performance');
        }
    });
}

// Enhanced Video functionality with content management
function initVideos() {
    const videos = document.querySelectorAll('video');
    console.log(`Found ${videos.length} videos to initialize`);
    
    videos.forEach((video, index) => {
        console.log(`Initializing video ${index + 1}`);
        
        // Determine video type and set appropriate source
        let videoConfig = WEBSITE_CONTENT.videos.hero; // default
        
        if (video.closest('.features-device-mockup')) {
            videoConfig = WEBSITE_CONTENT.videos.features;
        } else if (video.closest('.masthead-device-mockup')) {
            videoConfig = WEBSITE_CONTENT.videos.hero;
        }
        
        // Set proper attributes with performance optimization
        video.setAttribute('playsinline', '');
        video.setAttribute('muted', '');
        video.setAttribute('loop', '');
        
        // Use different preload strategies based on video location
        if (video.closest('.features-device-mockup')) {
            // Features video - lazy load to reduce initial performance impact
            video.setAttribute('preload', 'none');
            video.setAttribute('loading', 'lazy');
        } else {
            // Hero video - preload metadata for immediate playback
            video.setAttribute('preload', 'metadata');
        }
        
        // Set poster if available
        if (videoConfig.poster) {
            video.setAttribute('poster', videoConfig.poster);
        }
        
        // Ensure video doesn't break layout
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.objectFit = 'cover';
        video.style.display = 'block';
        
        // Update video source if different from default
        const source = video.querySelector('source');
        if (source && videoConfig.src !== source.src) {
            source.src = videoConfig.src;
            video.load();
        }
        
        // Performance optimization: Smart video management for features video
        if (video.closest('.features-device-mockup')) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    const vid = entry.target;
                    
                    if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
                        // Video is visible - load and play if needed
                        if (vid.getAttribute('preload') === 'none') {
                            addDebugMessage('📹 Loading features video on scroll');
                            vid.setAttribute('preload', 'metadata');
                            vid.load();
                            setTimeout(() => {
                                vid.play().catch(e => console.log('Features video autoplay blocked:', e));
                            }, 200);
                        } else if (vid.paused) {
                            vid.play().catch(e => console.log('Features video resume blocked:', e));
                        }
                    } else {
                        // Video is not visible or barely visible - pause to improve performance
                        if (!vid.paused) {
                            addDebugMessage('⏸️ Pausing features video to improve performance');
                            vid.pause();
                        }
                    }
                });
            }, { 
                threshold: [0, 0.3, 0.7],  // Multiple thresholds for better control
                rootMargin: '50px 0px'  // Smaller margin for more precise control
            });
            
            observer.observe(video);
        }

        // Only add click functionality to dating card videos, not iPhone mockups
        const isPhoneMockup = video.closest('.masthead-device-mockup') || video.closest('.features-device-mockup');
        
        if (!isPhoneMockup) {
            // Click to play/pause for dating cards only
            video.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                console.log('Video clicked, paused:', this.paused);
                
                try {
                    if (this.paused) {
                        this.play().then(() => {
                            console.log('Video playing');
                            showVideoFeedback('▶️', this);
                        }).catch(err => {
                            console.warn('Video play failed:', err);
                            showVideoFeedback('❌', this);
                        });
                    } else {
                        this.pause();
                        console.log('Video paused');
                        showVideoFeedback('⏸️', this);
                    }
                } catch (err) {
                    console.error('Video control error:', err);
                }
            });
        } else {
            // iPhone mockup videos - disable pointer events to prevent interaction
            video.style.pointerEvents = 'none';
            video.style.cursor = 'default';
            console.log('iPhone mockup video - click disabled');
        }

        // Enhanced error handling with content-aware fallback
        video.addEventListener('error', function(e) {
            console.warn('Video error occurred:', e);
            if (!this.dataset.fallback) {
                this.dataset.fallback = 'true';
                console.log('Loading fallback video');
                const source = this.querySelector('source');
                if (source) {
                    source.src = videoConfig.fallback;
                    this.load();
                }
            }
        });

        // Auto-play when loaded
        video.addEventListener('loadeddata', function() {
            console.log('Video loaded successfully');
            setTimeout(() => {
                this.play().catch(err => {
                    console.log('Autoplay blocked:', err);
                });
            }, 100);
        });
    });
}

function showVideoFeedback(icon, video) {
    // Remove existing feedback
    const existing = video.parentElement.querySelector('.video-feedback');
    if (existing) existing.remove();
    
    const feedback = document.createElement('div');
    feedback.className = 'video-feedback';
    feedback.textContent = icon;
    feedback.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 3rem;
        color: white;
        z-index: 100;
        pointer-events: none;
        text-shadow: 2px 2px 8px rgba(0,0,0,0.8);
        animation: videoFeedback 1s ease-out forwards;
    `;
    
    video.parentElement.style.position = 'relative';
    video.parentElement.appendChild(feedback);
    
    setTimeout(() => {
        if (feedback.parentElement) {
            feedback.remove();
        }
    }, 1000);
}

// Basic animations
function initAnimations() {
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes videoFeedback {
            0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
            50% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
            100% { opacity: 0; transform: translate(-50%, -50%) scale(1); }
        }
        
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        
        @keyframes matchShow {
            0% { opacity: 0; transform: translate(-50%, -50%) scale(0); }
            50% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
            100% { opacity: 0; transform: translate(-50%, -50%) scale(1); }
        }
        
        .pulse {
            animation: pulse 2s infinite;
        }
        
        .btn {
            transition: all 0.3s ease;
        }
        
        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }
        
        .feature-item, .testimonial-card {
            animation: fadeInUp 0.8s ease-out;
        }
        
        .video-feedback {
            animation: videoFeedback 1s ease-out forwards;
        }
        
        /* Enhanced Dating Cards Styles */
        .dating-cards-swiper {
            max-width: 320px;
            margin: 3rem auto;
            padding: 20px;
        }
        
        .dating-card {
            position: relative;
            width: 280px;
            height: 420px;
            border-radius: 20px;
            overflow: hidden;
            background: white;
            box-shadow: 0 15px 35px rgba(0,0,0,0.15);
            cursor: grab;
            transition: all 0.3s ease;
        }
        
        .dating-card:active {
            cursor: grabbing;
        }
        
        .dating-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 25px 50px rgba(0,0,0,0.2);
        }
        
        .dating-card video {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .card-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(transparent, rgba(0,0,0,0.85));
            color: white;
            padding: 3rem 1.5rem 1.5rem;
        }
        
        .card-overlay h4 {
            margin: 0;
            font-size: 1.6rem;
            font-weight: bold;
            text-shadow: 1px 1px 3px rgba(0,0,0,0.5);
        }
        
        .card-overlay p {
            margin: 0.5rem 0 0;
            opacity: 0.95;
            font-size: 1rem;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
        }
        
        .card-location {
            font-size: 0.85rem;
            opacity: 0.8;
            margin-top: 0.25rem;
        }
        
        .match-animation {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 2.5rem;
            color: #ff6b6b;
            background: rgba(0,0,0,0.9);
            padding: 2rem 3rem;
            border-radius: 20px;
            z-index: 9999;
            text-align: center;
            animation: matchShow 2.5s ease-out forwards;
            border: 2px solid #ff6b6b;
        }
        
        /* Fix any modal issues */
        .modal {
            z-index: 1055;
        }
        
        .modal-backdrop {
            z-index: 1050;
        }
        
        /* Loading states */
        .dating-card.loading {
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: loading 1.5s infinite;
        }
        
        @keyframes loading {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
        }
    `;
    document.head.appendChild(style);
}

// Enhanced GSAP animations (if available)
function initGSAPAnimations() {
    try {
        gsap.registerPlugin(ScrollTrigger);
        
        // Add class to indicate GSAP is loaded
        document.body.classList.add('gsap-loaded');
        
        // Reset any existing transforms/states from previous load
        gsap.set(['.app-badge', 'h1', '.masthead p', '.download-btn'], {
            clearProps: "all",
            opacity: 0,
            visibility: "visible"
        });
        
        // Hero animation with improved timing for refresh
        const heroTimeline = gsap.timeline({ 
            delay: 0.2,  // Reduced delay for faster start
            onComplete: () => {
                addDebugMessage('🎬 Hero animation complete');
            }
        });
        
        heroTimeline
            .to('.app-badge', {
                duration: 0.8,
                y: 0,
                opacity: 1,
                ease: "back.out(1.7)"
            })
            .to('h1', {
                duration: 0.8,
                y: 0,
                opacity: 1,
                ease: "power3.out"
            }, "-=0.4")
            .to('.masthead p', {
                duration: 0.6,
                y: 0,
                opacity: 1,
                ease: "power3.out"
            }, "-=0.3")
            .to('.download-btn', {
                duration: 0.5,
                scale: 1,
                opacity: 1,
                stagger: 0.1,
                ease: "back.out(1.7)"
            }, "-=0.2");
        
        addDebugMessage('🎭 Hero animation started');

        // Optimized scroll animations with reduced performance impact
        const featureItems = document.querySelectorAll('.feature-item');
        if (featureItems.length > 0) {
            // Ensure items are visible by default
            featureItems.forEach(item => {
                item.style.opacity = '1';
                item.style.visibility = 'visible';
            });
            
            // Simplified, performance-optimized animation
            gsap.from('.feature-item', {
                duration: 0.6,  // Shorter duration
                y: 30,          // Reduced movement
                opacity: 0,
                stagger: 0.1,   // Faster stagger
                ease: "power2.out",  // Simpler easing
                scrollTrigger: {
                    trigger: '#features',
                    start: 'top 85%',  // Trigger earlier
                    end: 'bottom 20%',
                    toggleActions: 'play none none none',  // Only play once
                    fastScrollEnd: true,  // Optimize for fast scrolling
                    refreshPriority: -1,  // Lower priority
                    onRefresh: () => {
                        // Fallback: ensure items are visible
                        featureItems.forEach(item => {
                            if (item.style.opacity === '0') {
                                item.style.opacity = '1';
                            }
                        });
                    }
                }
            });
        }

        // Optimized stats counter with reduced CPU usage
        document.querySelectorAll('.stat-number').forEach(stat => {
            const finalValue = parseInt(stat.textContent);
            if (finalValue) {
                ScrollTrigger.create({
                    trigger: stat,
                    start: 'top 85%',
                    toggleActions: 'play none none none',  // Only play once
                    fastScrollEnd: true,  // Optimize for fast scrolling
                    refreshPriority: -1,  // Lower priority
                    onEnter: () => {
                        // Use a simpler counter animation to reduce CPU load
                        gsap.to(stat, {
                            duration: 1.5,  // Shorter duration
                            textContent: finalValue,
                            roundProps: "textContent",
                            ease: "power1.out"  // Simpler easing
                        });
                    }
                });
            }
        });

        console.log('✅ GSAP animations loaded');
    } catch (e) {
        console.error('GSAP error:', e);
    }
}

// Debug helper function (console only, no visual debug)
function addDebugMessage(message) {
    console.log(message);
}

// Enhanced Dating cards with content management
function initDatingCards() {
    try {
        addDebugMessage('🃏 Initializing dating cards with content system...');
        const datingCardsSection = document.querySelector('.dating-cards-section');
        if (!datingCardsSection) {
            addDebugMessage('❌ Dating cards section not found');
            return;
        }
        
        const container = datingCardsSection.querySelector('.container');
        if (!container) {
            addDebugMessage('❌ Container not found in dating cards section');
            return;
        }
        
        addDebugMessage('✅ Found dating cards section and container');
        
        // Remove existing
        const existing = container.querySelector('.dating-cards-swiper');
        if (existing) {
            console.log('Removing existing swiper');
            existing.remove();
        }
        
        // Note: Removed intersection observer to prevent iPhone video interference
        
        // Generate cards dynamically from content
        const cardsHTML = WEBSITE_CONTENT.datingCards.map(card => `
            <div class="swiper-slide">
                <div class="dating-card">
                    <video muted loop playsinline preload="metadata" poster="${card.poster}">
                        <source src="${card.video}" type="video/mp4">
                    </video>
                    <div class="card-overlay">
                        <h4>${card.name}, ${card.age}</h4>
                        <p>${card.description}</p>
                        <div class="card-location">📍 ${card.location}</div>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Create swiper with dynamic content - FIXED navigation structure
        const swiperHTML = `
            <div class="dating-cards-swiper mb-5">
                <div class="swiper-wrapper">
                    ${cardsHTML}
                </div>
                <div class="swiper-pagination"></div>
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
            </div>
        `;
        
        // Insert after the text section
        addDebugMessage('📍 Inserting dating cards HTML...');
        container.insertAdjacentHTML('beforeend', swiperHTML);
        
        addDebugMessage(`✅ HTML inserted with ${WEBSITE_CONTENT.datingCards.length} cards`);
        addDebugMessage('🔍 Swiper container: ' + (document.querySelector('.dating-cards-swiper') !== null));
        addDebugMessage('🔍 Next button: ' + (document.querySelector('.swiper-button-next') !== null));
        addDebugMessage('🔍 Prev button: ' + (document.querySelector('.swiper-button-prev') !== null));
        addDebugMessage('🔍 Slides count: ' + document.querySelectorAll('.swiper-slide').length);
        
        // Initialize Swiper with proper error handling and retries
        const initializeSwiper = () => {
            try {
                console.log('Initializing enhanced Swiper...');
                
                // Ensure swiper container exists
                const swiperContainer = document.querySelector('.dating-cards-swiper');
                if (!swiperContainer) {
                    console.warn('Swiper container not found, retrying...');
                    setTimeout(initializeSwiper, 100);
                    return;
                }
                
                // Ensure navigation elements exist
                const nextBtn = document.querySelector('.swiper-button-next');
                const prevBtn = document.querySelector('.swiper-button-prev');
                if (!nextBtn || !prevBtn) {
                    console.warn('Navigation buttons not found, retrying...');
                    setTimeout(initializeSwiper, 100);
                    return;
                }
                
                console.log('All Swiper elements found, initializing...');
                
                // Debug: Check if Swiper constructor exists
                console.log('🔍 Swiper constructor available:', typeof Swiper);
                console.log('🔍 Creating Swiper instance...');
                
                const swiper = new Swiper('.dating-cards-swiper', {
                    effect: 'cards',
                    grabCursor: true,
                    centeredSlides: true,
                    slidesPerView: 1,
                    loop: false, // FIXED: Disable loop to fix navigation issues
                    speed: 200, // Even faster transitions to reduce lag
                    initialSlide: 0, // Always start at first slide
                    cardsEffect: {
                        perSlideOffset: 8,
                        perSlideRotate: 2,
                        rotate: true,
                        slideShadows: false, // Disable shadows for better performance
                    },
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                        dynamicBullets: true
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                        disabledClass: 'swiper-button-disabled'
                    },
                    autoplay: {
                        delay: 8000,
                        disableOnInteraction: true,
                        pauseOnMouseEnter: true
                    },
                    // Performance optimizations
                    watchSlidesProgress: true,
                    watchSlidesVisibility: true,
                    preloadImages: false,
                    lazy: true,
                    on: {
                        init: function() {
                            addDebugMessage('🎯 Swiper initialized with ' + this.slides.length + ' slides');
                            
                            // Pause other videos when dating cards become active
                            pauseNonEssentialVideos(document.querySelector('.dating-cards-section'));
                            
                            // Force enable navigation
                            this.allowSlideNext = true;
                            this.allowSlidePrev = true;
                            this.update();
                            
                            // Fix navigation buttons
                            const self = this;
                            setTimeout(function() {
                                const nextBtn = document.querySelector('.swiper-button-next');
                                const prevBtn = document.querySelector('.swiper-button-prev');
                                
                                if (nextBtn && prevBtn) {
                                    addDebugMessage('✅ Fixing navigation buttons');
                                    nextBtn.style.display = 'flex';
                                    prevBtn.style.display = 'flex';
                                    nextBtn.style.opacity = '1';
                                    prevBtn.style.opacity = '1';
                                    nextBtn.style.pointerEvents = 'auto';
                                    prevBtn.style.pointerEvents = 'auto';
                                    self.navigation.update();
                                } else {
                                    addDebugMessage('❌ Navigation buttons not found');
                                }
                            }, 100);
                        },
                        slideChangeTransitionStart: function() {
                            addDebugMessage('🔄 Starting transition');
                            
                            // Immediately pause all videos to prevent lag
                            document.querySelectorAll('.dating-card video').forEach(v => {
                                v.pause();
                                v.currentTime = 0;
                            });
                            
                            // Pre-load the next video before transition completes
                            const nextSlide = this.slides[this.activeIndex];
                            const nextVideo = nextSlide?.querySelector('video');
                            if (nextVideo && nextVideo.loadOnDemand) {
                                nextVideo.loadOnDemand(); // Trigger lazy loading
                            }
                            
                            // Add subtle loading overlay
                            if (nextSlide) {
                                nextSlide.style.opacity = '0.9';
                            }
                        },
                        slideChangeTransitionEnd: function() {
                            addDebugMessage('🎬 Transition ended, playing video');
                            
                            // Play the active slide video immediately (should be preloaded)
                            const activeSlide = this.slides[this.activeIndex];
                            const activeVideo = activeSlide?.querySelector('video');
                            
                            if (activeVideo) {
                                // Since all videos are preloaded, this should be instant
                                activeVideo.currentTime = 0; // Start from beginning
                                activeVideo.play().catch(e => console.log('Video autoplay blocked:', e));
                                addDebugMessage('✅ Video playing for slide ' + this.activeIndex);
                                
                                // Restore full opacity after video starts
                                activeSlide.style.opacity = '1';
                            } else {
                                addDebugMessage('❌ No video found for slide ' + this.activeIndex);
                                // Still restore opacity even if no video
                                if (activeSlide) activeSlide.style.opacity = '1';
                            }
                        },
                        slideChange: function() {
                            // This runs during transition - keep it minimal for performance
                            console.log('Slide changed');
                            
                            // Check if match popup should show
                            const settings = WEBSITE_CONTENT.matchSettings;
                            if (settings.enabled) {
                                const isAutoplay = this.autoplay.running;
                                const shouldShow = Math.random() < settings.frequency;
                                
                                if (shouldShow && (!settings.onlyManualSwipes || !isAutoplay)) {
                                    showMatch();
                                }
                            }
                        }
                    }
                });
                
                // Debug: Check if Swiper was created successfully
                console.log('🔍 Swiper instance created:', swiper);
                console.log('🔍 Swiper slides count:', swiper.slides ? swiper.slides.length : 'undefined');
                console.log('🔍 Swiper navigation object:', swiper.navigation);
                console.log('🔍 Navigation nextEl:', swiper.navigation ? swiper.navigation.nextEl : 'undefined');
                console.log('🔍 Navigation prevEl:', swiper.navigation ? swiper.navigation.prevEl : 'undefined');
                
                // AGGRESSIVE focus prevention for rapid clicking
                const preventFocus = (element) => {
                    if (element) {
                        element.addEventListener('focus', (e) => {
                            e.preventDefault();
                            e.target.blur();
                        }, true);
                        element.addEventListener('focusin', (e) => {
                            e.preventDefault();
                            e.target.blur();
                        }, true);
                        // Prevent tab focusing
                        element.setAttribute('tabindex', '-1');
                    }
                };
                
                // Apply focus prevention to all Swiper elements
                setTimeout(() => {
                    const swiperElements = document.querySelectorAll(
                        '.swiper-button-next, .swiper-button-prev, .swiper-pagination-bullet, ' +
                        '.swiper-slide, .swiper-wrapper, .dating-cards-swiper, .swiper-container, ' +
                        '.dating-card, .dating-card *'
                    );
                    swiperElements.forEach(preventFocus);
                    console.log(`Applied focus prevention to ${swiperElements.length} elements`);
                }, 100);
                
                // Initialize videos in cards with proper handling
                const cardVideos = document.querySelectorAll('.dating-card video');
                console.log(`Found ${cardVideos.length} card videos`);
                
                cardVideos.forEach((video, index) => {
                    console.log(`Setting up card video ${index + 1}`);
                    
                    // AGGRESSIVE performance optimizations for dating cards
                    video.style.width = '100%';
                    video.style.height = '100%';
                    video.style.objectFit = 'cover';
                    
                    // CRITICAL: Only load the first video initially
                    if (index === 0) {
                        video.setAttribute('preload', 'metadata');
                    } else {
                        video.setAttribute('preload', 'none'); // Don't preload other videos
                    }
                    
                    video.setAttribute('playsinline', 'true');
                    video.setAttribute('muted', 'true');
                    video.setAttribute('loop', 'true');
                    
                    // Reduce video quality on mobile for better performance
                    if (window.innerWidth <= 768) {
                        video.style.maxWidth = '100%';
                        video.style.height = 'auto';
                        // Lower video quality attributes for mobile
                        video.setAttribute('poster', 'assets/img/portrait_black.png');
                    }
                    
                    // Lazy loading: Only load video when it becomes active
                    let videoLoaded = index === 0; // First video can load immediately
                    
                    const loadVideo = () => {
                        if (!videoLoaded) {
                            console.log(`Loading video ${index + 1} on demand`);
                            video.setAttribute('preload', 'metadata');
                            video.load();
                            videoLoaded = true;
                        }
                    };
                    
                    video.addEventListener('loadedmetadata', () => {
                        console.log(`Card video ${index + 1} metadata loaded`);
                        video.parentElement.classList.remove('loading');
                        
                        // Only auto-play if it's the currently active slide
                        if (index === 0) {
                            setTimeout(() => {
                                video.play().catch(err => {
                                    console.log(`Card video ${index + 1} autoplay blocked:`, err);
                                });
                            }, 100);
                        }
                    });
                    
                    video.addEventListener('error', (e) => {
                        console.warn(`Card video ${index + 1} error:`, e);
                        video.parentElement.classList.remove('loading');
                        
                        // Fallback to lighter demo video
                        video.src = 'assets/img/demo-screen.mp4';
                        video.setAttribute('preload', 'metadata');
                        video.load();
                    });
                    
                    // Add loading state only for non-first videos
                    if (index > 0) {
                        video.parentElement.classList.add('loading');
                    }
                    
                    // Store load function for Swiper to call
                    video.loadOnDemand = loadVideo;
                    
                    // Only load the first video immediately
                    if (index === 0) {
                        video.load();
                    }
                });
                
                console.log('✅ Enhanced dating cards fully loaded');
            } catch (swiperError) {
                console.error('Swiper initialization error:', swiperError);
                // Retry initialization on error
                setTimeout(initializeSwiper, 500);
            }
        };
        
        // Start initialization immediately, then retry if needed
        setTimeout(initializeSwiper, 100);
        
    } catch (e) {
        console.error('Dating cards error:', e);
    }
}

function showMatch() {
    // Don't show multiple matches at once
    if (document.querySelector('.match-animation')) {
        return;
    }
    
    const match = document.createElement('div');
    match.className = 'match-animation';
    match.innerHTML = '💖<br><strong>IT\'S A MATCH!</strong><br>💖';
    
    document.body.appendChild(match);
    
    const duration = WEBSITE_CONTENT.matchSettings.duration || 2500;
    setTimeout(() => {
        if (match.parentElement) {
            match.remove();
        }
    }, duration);
}

// Ensure page always starts at top
window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
});

// Also handle page show event (when coming back from browser back/forward)
window.addEventListener('pageshow', () => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
});

console.log('🔥 Wave Dating - Enhanced Scripts with Content Management Loaded!');
