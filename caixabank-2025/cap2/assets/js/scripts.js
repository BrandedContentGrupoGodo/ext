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
    gsap.fromTo("#reportaje", 
      {
        y: 50,
        opacity: 0
      },
      {
        scrollTrigger: {
          trigger: "#reportaje",
          start: "top 80%",
          toggleActions: "play none none none"
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out"
      }
    );

// Animación GSAP para todas las secciones con clase .reportaje
gsap.utils.toArray(".reportaje").forEach((section, index) => {
  gsap.fromTo(section, 
    { 
      y: 50,
      opacity: 0
    },
    { 
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: "top 90%",        // Activación más temprana para los últimos elementos
        end: "bottom 20%",
        toggleActions: "play none none none"
      }
    }
  );
});

// Animación específica para los párrafos individuales dentro de cada sección
gsap.utils.toArray(".parrafos-caixa").forEach((parrafo, index) => {
  gsap.fromTo(parrafo, 
    { 
      y: 30,
      opacity: 0
    },
    { 
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: parrafo,
        start: "top 95%",        // Muy temprano para asegurar que se vean los últimos
        toggleActions: "play none none none"
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
