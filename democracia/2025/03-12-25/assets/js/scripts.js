// Scripts para proyecto democracia
// Encapsulado dentro de .body-democracia
(function() {
  'use strict';
  
  // Verificar si existe el contenedor principal
  const bodyDemocracia = document.querySelector('.body-democracia');
  if (!bodyDemocracia) return;
  
  // Variable global para Lenis
  let lenis;
  
  // Inicializar cuando el DOM esté listo
  function init() {
    // Mejorar accesibilidad: asegurar atributos ARIA en main-content
    const mainContent = bodyDemocracia.querySelector('#main-content');
    if (mainContent) {
      mainContent.setAttribute('role', 'main');
      if (!mainContent.getAttribute('aria-label')) {
        mainContent.setAttribute('aria-label', 'Contenido principal');
      }
    }

    // Registrar ScrollTrigger primero
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Animación automática para los textos del header (se ejecuta al cargar la página)
    if (typeof gsap !== 'undefined') {
      const headerTitle = bodyDemocracia.querySelector('.header-content__title');
      const headerSubtitle = bodyDemocracia.querySelector('.header-content__subtitle');

      if (headerTitle && headerSubtitle) {
        // Configurar estado inicial
        gsap.set(headerTitle, { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' });
        gsap.set(headerSubtitle, { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' });

        // Timeline para revelar los textos desde abajo (más rápido)
        const headerTimeline = gsap.timeline({ delay: 0.1 });

        headerTimeline
          // Revelar el título primero
          .to(headerTitle, {
            clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)',
            duration: 0.6,
            ease: 'power2.out'
          }, 0)
          // Revelar el subtítulo después del título
          .to(headerSubtitle, {
            clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)',
            duration: 0.6,
            ease: 'power2.out'
          }, 0.2);
      }
    }

    // Lenis temporalmente deshabilitado debido a errores de compatibilidad
    // El scroll funcionará normalmente sin Lenis
    // TODO: Revisar versión de Lenis o usar alternativa
    
    // Asegurar que ScrollTrigger funcione
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.refresh();
    }

    // Inicializar parallax después de un delay
    setTimeout(initParallax, 400);
  }

  // Función para inicializar parallax
  function initParallax() {
    const parallaxSection = bodyDemocracia.querySelector('.parallax-section');
    if (!parallaxSection || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      return;
    }

    const svgWrapper = parallaxSection.querySelector('.parallax-section__svg-wrapper');
    const overlay = parallaxSection.querySelector('.parallax-section__overlay');
    const textReveal = parallaxSection.querySelector('.parallax-section__text-reveal');
    const image = parallaxSection.querySelector('.parallax-section__image');

    if (!svgWrapper || !overlay || !textReveal || !image) {
      console.warn('Elementos de parallax no encontrados');
      return;
    }

    // Estado inicial
    gsap.set(svgWrapper, { y: 0, opacity: 1 });
    gsap.set(overlay, { opacity: 0 });
    gsap.set(image, { opacity: 1 });
    gsap.set(textReveal, { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' });

    // Efecto parallax en la imagen
    gsap.to(image, {
      y: '-20%',
      ease: 'none',
      scrollTrigger: {
        trigger: parallaxSection,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        invalidateOnRefresh: true
      }
    });

    // Timeline para el efecto reveal
    const revealTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: parallaxSection,
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
        invalidateOnRefresh: true,
        onLeaveBack: () => {
          gsap.set(svgWrapper, { y: 0, opacity: 1 });
          gsap.set(textReveal, { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' });
        }
      }
    });

    revealTimeline
      .to(svgWrapper, {
        y: '-100%',
        opacity: 0,
        duration: 0.8,
        ease: 'power2.in'
      }, 0)
      .to(textReveal, {
        clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)',
        duration: 0.8,
        ease: 'power2.out'
      }, 0.5);

    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.refresh();
    }
  }

  // Esperar a que las librerías estén cargadas
  function waitForLibraries() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      setTimeout(init, 150);
    } else {
      setTimeout(waitForLibraries, 50);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', waitForLibraries);
  } else {
    waitForLibraries();
  }
})();
