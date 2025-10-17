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

    // ScrollTrigger para el reportaje con id
    gsap.to("#reportaje", {
      scrollTrigger: {
        trigger: "#reportaje",
        start: "top 80%",
      },
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.out"
    });

// Animación GSAP para todas las secciones con clase .reportaje
gsap.utils.toArray(".reportaje").forEach((section, index) => {
  gsap.to(section, 
    { 
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: "top 85%",        // cuando la sección llegue al 85% de la pantalla
        toggleActions: "play none none none",
        once: true               // solo anima una vez para evitar parpadeos
      }
    }
  );
});


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
