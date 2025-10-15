// Scroll suave
    const heroCta = document.querySelector(".hero__cta");
    if (heroCta) {
      heroCta.addEventListener("click", (e) => {
        e.preventDefault();
        const videoSection = document.querySelector("#video-section");
        if (videoSection) {
          videoSection.scrollIntoView({
            behavior: "smooth"
          });
        }
      });
    }

    // GSAP Animaciones
    if (window.gsap) {
      gsap.fromTo(".hero__image img", 
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power2.out" }
      );

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
    } else {
      // Fallback si GSAP no se carga
      document.querySelectorAll('.hero__image img').forEach(img => img.style.opacity = '1');
      const title = document.querySelector('.hero__title');
      if (title) title.style.opacity = '1';
      const cta = document.querySelector('.hero__cta');
      if (cta) cta.style.opacity = '1';
    }

    // Registrar ScrollTrigger si está disponible
    if (window.gsap && window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
    }

    // ScrollTrigger para el reportaje ancla
    if (document.querySelector("#reportaje")) {
      gsap.to("#reportaje", {
        scrollTrigger: {
          trigger: "#reportaje",
          start: "top 80%",
          once: true,
          invalidateOnRefresh: true
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out"
      });
    }

// Inicialización incremental y segura para .reportaje (contenido inyectado por CMS)
    function initReportajeSection(section) {
      if (!section || section.dataset.gsapInit === "true") return;
      section.dataset.gsapInit = "true";

      // Asegurar que el elemento es visible inicialmente para evitar parpadeo
      section.style.opacity = "1";

      // Solo aplicar animación si GSAP está disponible
      if (window.gsap && window.ScrollTrigger) {
        gsap.fromTo(section,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 90%",
              once: true,
              invalidateOnRefresh: true
            }
          }
        );
      }
    }

    // Inicializar animaciones después de que el DOM esté listo
    function initAllReportajes() {
      if (window.gsap && window.ScrollTrigger) {
        const sections = document.querySelectorAll(".reportaje");
        sections.forEach(section => {
          if (!section.dataset.gsapInit) {
            initReportajeSection(section);
          }
        });
      } else {
        // Fallback: asegurar que todas las secciones son visibles
        document.querySelectorAll(".reportaje").forEach(section => {
          section.style.opacity = "1";
        });
      }
    }

    // Ejecutar después de un pequeño delay para asegurar que GSAP se cargó
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initAllReportajes, 100);
      });
    } else {
      setTimeout(initAllReportajes, 100);
    }

    // Observar inyecciones del CMS (simplificado)
    if (window.MutationObserver && window.gsap) {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) {
              const element = node;
              if (element.classList && element.classList.contains('reportaje')) {
                initReportajeSection(element);
              }
              const nested = element.querySelectorAll ? element.querySelectorAll('.reportaje') : [];
              nested.forEach(sec => initReportajeSection(sec));
            }
          });
        });
      });
      observer.observe(document.body, { childList: true, subtree: true });
    }

    // Refrescar ScrollTrigger después de que las imágenes carguen
    window.addEventListener("load", () => {
      if (window.ScrollTrigger) {
        ScrollTrigger.refresh();
      }
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
