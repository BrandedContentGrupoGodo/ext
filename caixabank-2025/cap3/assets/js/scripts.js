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

      // Animación propia por sección (el estado inicial ya está en CSS)
      gsap.to(section, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          once: true,
          invalidateOnRefresh: true
        }
      });

      // Al cargar imágenes dentro, recalcular posiciones
      section.querySelectorAll("img").forEach((img) => {
        img.addEventListener("load", () => {
          if (window.ScrollTrigger) ScrollTrigger.refresh();
        });
      });
    }

    // Inicializar lo que ya existe en el DOM
    if (window.gsap) {
      gsap.utils.toArray(".reportaje").forEach(initReportajeSection);
    }

    // Observar inyecciones del CMS y nuevos nodos
    if (window.MutationObserver) {
      const observer = new MutationObserver((mutations) => {
        let foundNew = false;
        for (const mutation of mutations) {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType !== 1) return; // Element
            const element = /** @type {HTMLElement} */ (node);
            if (element.matches && element.matches(".reportaje")) {
              initReportajeSection(element);
              foundNew = true;
            }
            const nested = element.querySelectorAll ? element.querySelectorAll(".reportaje") : [];
            if (nested && nested.length) {
              nested.forEach((sec) => initReportajeSection(sec));
              foundNew = true;
            }
          });
        }
        if (foundNew && window.ScrollTrigger) {
          ScrollTrigger.refresh();
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
    }

    // Refrescar al final de carga y tras un pequeño delay por seguridad
    window.addEventListener("load", () => {
      if (window.ScrollTrigger) {
        ScrollTrigger.refresh();
        setTimeout(() => ScrollTrigger.refresh(), 300);
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
