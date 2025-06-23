// Activa ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Anima el título al hacer scroll
gsap.to(".hero-title",  {
  scrollTrigger: {
    trigger: ".hero-title",
    start: "top 80%",
    end: "bottom top",
    toggleActions: "play none none none", // solo aparece una vez
  },
  opacity: 1,
  y: 0,
  duration: 1.2,
  ease: "power3.out",
});

(() => {
    const track = document.querySelector('.son-eg-track');
    if (!track) return; // seguridad por si no está en esta página

    const slides = Array.from(track.children);
    const prevBtn = document.querySelector('.son-eg-arrow--left');
    const nextBtn = document.querySelector('.son-eg-arrow--right');
    const slideGap = parseFloat(getComputedStyle(track).gap) || 0;

    function stepWidth() {
      const slideWidth = slides[0].getBoundingClientRect().width;
      return slideWidth + slideGap;
    }

    function updateArrows() {
      const maxScroll = track.scrollWidth - track.clientWidth - 1;
      prevBtn.disabled = track.scrollLeft <= 0;
      nextBtn.disabled = track.scrollLeft >= maxScroll;
    }

    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -stepWidth(), behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: stepWidth(), behavior: 'smooth' });
    });

    track.addEventListener('scroll', updateArrows);
    window.addEventListener('resize', updateArrows);

    // Llama al inicio para estado inicial
    updateArrows();
  })();

    (() => {
    const slider = document.querySelector('.son-eg-slider-track');
    if (!slider) return;

    const prev = document.querySelector('.son-eg-slider-arrow--left');
    const next = document.querySelector('.son-eg-slider-arrow--right');

    const slideGap = parseFloat(getComputedStyle(slider).gap) || 16;
    const slideWidth = 320 + slideGap;

    const update = () => {
      const maxScroll = slider.scrollWidth - slider.clientWidth - 1;
      prev.disabled = slider.scrollLeft <= 0;
      next.disabled = slider.scrollLeft >= maxScroll;
    };

    prev.addEventListener('click', () => {
      slider.scrollBy({ left: -slideWidth, behavior: 'smooth' });
    });
    next.addEventListener('click', () => {
      slider.scrollBy({ left: slideWidth, behavior: 'smooth' });
    });

    slider.addEventListener('scroll', update);
    window.addEventListener('resize', update);
    update();
  })();