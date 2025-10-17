// Encapsulación del código en IIFE para evitar contaminar el scope global
(function() {
  'use strict';

  // ============================================
  // SCROLL SUAVE
  // ============================================
  const initSmoothScroll = () => {
    const ctaButton = document.querySelector(".hero__cta");
    if (!ctaButton) return;

    ctaButton.addEventListener("click", (e) => {
      e.preventDefault();
      const targetSection = document.querySelector("#video-section");
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  };

  // ============================================
  // ANIMACIONES GSAP - HERO
  // ============================================
  const initHeroAnimations = () => {
    const timeline = gsap.timeline();
    
    timeline
      .from(".hero__image img", {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
      })
      .to(".hero__title", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
      }, "-=0.5")
      .fromTo(".hero__cta", 
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "elastic.out(1,0.5)" }
      );
  };

  // ============================================
  // ANIMACIONES GSAP - REPORTAJES (ScrollTrigger)
  // ============================================
  const initReportajeAnimations = () => {
    gsap.utils.toArray(".reportaje").forEach(section => {
      gsap.fromTo(section, 
        { y: 50, opacity: 0 },
        { 
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%"
          }
        }
      );
    });
  };

  // ============================================
  // LIGHTBOX
  // ============================================
  const initLightbox = () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    
    if (!lightbox || !lightboxImg || !lightboxClose) return;

    // Función para cerrar el lightbox
    const closeLightbox = () => {
      lightbox.style.display = 'none';
      lightboxImg.src = '';
    };

    // Delegación de eventos para las imágenes de la galería
    document.addEventListener('click', (e) => {
      const galleryItem = e.target.closest('.gallery-item');
      if (galleryItem) {
        lightbox.style.display = 'flex';
        lightboxImg.src = galleryItem.src;
        lightboxImg.alt = galleryItem.alt;
      }
    });

    // Cerrar con el botón de cierre
    lightboxClose.addEventListener('click', closeLightbox);

    // Cerrar al hacer click fuera de la imagen
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    // Cerrar con la tecla Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.style.display === 'flex') {
        closeLightbox();
      }
    });
  };

  // ============================================
  // INICIALIZACIÓN
  // ============================================
  const init = () => {
    initSmoothScroll();
    initHeroAnimations();
    initReportajeAnimations();
    initLightbox();
  };

  // Ejecutar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
