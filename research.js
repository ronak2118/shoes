document.addEventListener('DOMContentLoaded', () => {
    // Sticky Header functionality (reusing from previous JS files)
    const header = document.querySelector('.main-header');
    const headerOffset = header.offsetTop;

    function stickyHeader() {
        if (window.pageYOffset > headerOffset) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    }
    window.addEventListener('scroll', stickyHeader);

    // Optional: Add any subtle animations or effects if desired, e.g.,
    // Fading in sections as they scroll into view (requires Intersection Observer API)
    const sections = document.querySelectorAll('.intro-to-research-section, .research-areas-section, .our-process-section, .future-vision-section');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the section is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in'); // Add a class for animation
                observer.unobserve(entry.target); // Stop observing once it's animated
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.classList.add('fade-in-initial'); // Add initial hidden state for animation
        observer.observe(section);
    });
});

/* Add the following to your research.css for the fade-in effect:
.fade-in-initial {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.fade-in {
    opacity: 1;
    transform: translateY(0);
}
*/