document.addEventListener('DOMContentLoaded', function () {
    // Elements
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    const autoplayBtn = document.querySelector('.autoplay-btn');


    // Variables
    let currentIndex = 0;
    let intervalId = null;
    let isAutoplay = true;
    const autoplayInterval = 4000; // 4 seconds

    // Create indicators
    items.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });

    const indicators = document.querySelectorAll('.indicator');

    // Function to go to a specific slide
    function goToSlide(index) {
        // Update current index
        currentIndex = index;

        // Update carousel position
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Update indicators
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === currentIndex);
        });
    }

    // Function to go to next slide
    function nextSlide() {
        let nextIndex = (currentIndex + 1) % items.length;
        goToSlide(nextIndex);
    }

    // Function to go to previous slide
    function prevSlide() {
        let prevIndex = (currentIndex - 1 + items.length) % items.length;
        goToSlide(prevIndex);
    }

    // Set up autoplay
    function startAutoplay() {
        if (intervalId) clearInterval(intervalId);
        intervalId = setInterval(nextSlide, autoplayInterval);
        autoplayBtn.textContent = 'Pause Autoplay';
        isAutoplay = true;
    }

    function stopAutoplay() {
        clearInterval(intervalId);
        autoplayBtn.textContent = 'Start Autoplay';
        isAutoplay = false;
    }

    // Event listeners
    nextBtn.addEventListener('click', () => {
        nextSlide();
        if (isAutoplay) {
            stopAutoplay();
            startAutoplay();
        }
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        if (isAutoplay) {
            stopAutoplay();
            startAutoplay();
        }
    });

    autoplayBtn.addEventListener('click', () => {
        if (isAutoplay) {
            stopAutoplay();
        } else {
            startAutoplay();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === ' ') {
            if (isAutoplay) {
                stopAutoplay();
            } else {
                startAutoplay();
            }
        }
    });

    // Initialize autoplay
    startAutoplay();

    // Swipe support for touch devices
    let startX = 0;
    let endX = 0;

    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const threshold = 50; // Minimum swipe distance

        if (startX - endX > threshold) {
            // Swipe left - next slide
            nextSlide();
        } else if (endX - startX > threshold) {
            // Swipe right - previous slide
            prevSlide();
        }

        if (isAutoplay) {
            stopAutoplay();
            startAutoplay();
        }
    }
});