gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".frase-slide").forEach((slide, i) => {
    gsap.to(slide.querySelector("p"), {
      scrollTrigger: {
        trigger: slide,
        start: "top center",
        end: "bottom center",
        toggleActions: "play none none reverse",
      },
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out"
    });
});

const heroTitle = document.querySelector('.hero-title');

function checkVisibility() {
  const rect = heroTitle.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  if(rect.top < windowHeight && rect.bottom > 0) {
    heroTitle.classList.add('visible');
  } else {
    heroTitle.classList.remove('visible');
  }
}

window.addEventListener('scroll', checkVisibility);
window.addEventListener('load', checkVisibility);
