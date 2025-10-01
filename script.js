// ====================================================
// CONSOLIDATED JAVASCRIPT BLOCK
// Place this after the Leaflet script and before </body>
// ====================================================

// 1. Element Selection
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
const closeIcon = document.getElementById('close-icon');
const faders = document.querySelectorAll(".fade-in-up");

// Set the current year in the footer
const currentYearElement = document.getElementById('current-year');
if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

// Function to toggle the mobile menu (centralized logic)
const toggleMenuState = () => {
    mobileMenu.classList.toggle('hidden');
    menuIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
};


// 2. Intersection Observer Setup (Animations)
const appearOptions = {
    threshold: 0,
    rootMargin: "0px 0px -100px 0px"
};

const appearOnScroll = new IntersectionObserver(function (
    entries,
    observer
) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        }
        entry.target.classList.add("visible");
        
        // Unobserve all, except potentially the map if we want to re-check
        // (but for simplicity, we unobserve once visible)
        observer.unobserve(entry.target);
    });
}, appearOptions);

// Observe all elements with the fade-in-up class
faders.forEach(fader => {
    appearOnScroll.observe(fader);
});


// 3. Event Listeners (Mobile Menu and Smooth Scroll)

// Mobile Menu Toggle Listener (simplified)
if (menuToggle) {
    menuToggle.addEventListener('click', toggleMenuState);
}

// Scroll to Section functionality (targeting all relevant links)
document.querySelectorAll('nav a[href^="#"], #mobile-menu a[href^="#"], .hero-content a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = e.currentTarget.getAttribute('href');
        const targetSection = document.querySelector(sectionId);

        if (targetSection) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight - 16; 

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                toggleMenuState(); 
            }
        }
    });
});

