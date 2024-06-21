// script.js

document.addEventListener("DOMContentLoaded", function() {
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0,
        rootMargin: "0px 0px -100px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('show');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
});

const leftArrow = document.getElementById('left-arrow');
const rightArrow = document.getElementById('right-arrow');
const sliderWrapper = document.querySelector('.slider-wrapper');
const images = document.querySelectorAll('.slider-wrapper img');
let imageWidth = images[0].clientWidth + 10; // Width of the image plus margin
let currentIndex = 0;

function updateArrows() {
    leftArrow.classList.toggle('disabled', currentIndex === 0);
    rightArrow.classList.toggle('disabled', currentIndex === images.length - 1);
}

function slideToIndex(index) {
    currentIndex = index;
    sliderWrapper.style.transform = `translateX(-${currentIndex * (imageWidth)}px)`;
    updateArrows();
}

leftArrow.addEventListener('click', () => {
    if (currentIndex > 0) {
        slideToIndex(currentIndex - 1);
    }
});

rightArrow.addEventListener('click', () => {
    if (currentIndex < images.length - 1) {
        slideToIndex(currentIndex + 1);
    }
});

window.addEventListener('resize', () => {
    imageWidth = images[0].clientWidth + 10; // Recalculate image width on resize
    slideToIndex(currentIndex); // Maintain current index after resize
});

updateArrows();
