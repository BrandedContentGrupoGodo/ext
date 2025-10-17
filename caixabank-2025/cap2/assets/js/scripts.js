// Scroll suave
    document.querySelector(".hero__cta").addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector("#video-section").scrollIntoView({
        behavior: "smooth"
      });
    });

    // GSAP Animaciones
    gsap.from(".hero__image img", {
      x: -50,
      opacity: 0,
      duration: 1,
      ease: "power2.out"
    });

    gsap.to(".hero__title", {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.5,
      ease: "power2.out"
    });

    gsap.fromTo(".hero__cta", 
      {scale: 0.9, opacity: 0},
      {scale: 1, opacity: 1, duration: 0.8, delay: 1, ease: "elastic.out(1,0.5)"}
    );


// Lightbox funcional
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

document.querySelectorAll('.gallery-item').forEach(img => {
  img.addEventListener('click', () => {
    lightbox.style.display = 'flex';
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
  });
});

lightboxClose.addEventListener('click', () => {
  lightbox.style.display = 'none';
  lightboxImg.src = '';
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = 'none';
    lightboxImg.src = '';
  }
});
