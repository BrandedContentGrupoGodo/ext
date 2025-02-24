// Import necessary GSAP plugins
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Additional plugin ScrollSmoother should be added if not already present
import ScrollSmoother from 'gsap/ScrollSmoother';

// Initialize ScrollTrigger and ScrollSmoother
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// Set up GSAP animation with ScrollTrigger for the content section
gsap.to(".content-section", {
    scrollTrigger: {
        trigger: ".content-section",
        start: "top 80%", // Adjusted start position
        end: "bottom top",
        toggleActions: "play none none none",
    },
    opacity: 1,
    duration: 1,
    ease: "power2.in",
});

// Optional: Add animations for the H1 and paragraph
gsap.from(".main-heading", {
    scrollTrigger: {
        trigger: ".main-heading",
        start: "top 80%", // Adjusted start position
        end: "bottom top",
        toggleActions: "play none none none",
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
});

gsap.from(".content-section p", {
    scrollTrigger: {
        trigger: ".content-section p",
        start: "top 80%", // Adjusted start position
        end: "bottom top",
        toggleActions: "play none none none",
    },
    y: 50,
    opacity: 1,
    duration: 1,
    ease: "power2.in",
});

/*
*   When user scrolls with the mouse, we have to change sections
* */
function onMouseWheel(event) {
    // Normalize event wheel delta
    var delta = event.originalEvent.wheelDelta / 30 || -event.originalEvent.detail;

    // If the user scrolled up, it goes to the previous section, otherwise - to the next section
    if (delta < -1) {
        goToNextSection();
    } else if (delta > 1) {
        goToPrevSection();
    }

    event.preventDefault();
}

/*
*   If there's a previous section, scroll to it
* */
function goToPrevSection() {
    var $prevSection = $currentSlide.prev(".slide");
    if ($prevSection.length) {
        goToSection($prevSection);
    }
}

/*
*   If there's a next section, scroll to it
* */
function goToNextSection() {
    var $nextSection = $currentSlide.next(".slide");
    if ($nextSection.length) {
        goToSection($nextSection);
    }
}

/*
*   Actual transition between sections
* */
function goToSection($section) {
    // If the sections are not changing and there's such a section
    if (!isAnimating && $section.length) {
        // Setting the animating flag to true
        isAnimating = true;
        $currentSlide = $section;

        // Scrolling to the current section
        TweenLite.to($slidesContainer, 1, { scrollTo: { y: pageHeight * $currentSlide.index() }, onComplete: onSectionChangeEnd, onCompleteScope: this });
    }
}

/*
*   Once the scrolling is finished, we need to restore the "isAnimating" flag.
*   You can also do other things in this function, such as changing the page title
* */
function onSectionChangeEnd() {
    isAnimating = false;
}

$window.on("mousewheel DOMMouseScroll", onMouseWheel);
