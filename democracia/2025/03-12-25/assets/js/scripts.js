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

    // Inicializar Lenis para scroll suave en toda la página
    if (typeof Lenis !== 'undefined') {
      try {
        lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smooth: true,
          smoothTouch: false
        });

        // Verificar que Lenis se haya inicializado correctamente
        if (!lenis || typeof lenis.raf !== 'function') {
          console.warn('Lenis no se inicializó correctamente');
          return;
        }

        // Función para obtener la posición de scroll de Lenis
        function getLenisScroll() {
          try {
            // Intentar diferentes propiedades según la versión de Lenis
            if (typeof lenis.scroll === 'number') return lenis.scroll;
            if (typeof lenis.scrollTop === 'number') return lenis.scrollTop;
            if (lenis.actualScroll !== undefined) return lenis.actualScroll;
            if (lenis.targetScroll !== undefined) return lenis.targetScroll;
            // Para versiones más antiguas
            if (lenis.lerp !== undefined && lenis.scroll !== undefined) return lenis.scroll;
          } catch(e) {
            // Si falla, usar scroll nativo
          }
          return window.pageYOffset || document.documentElement.scrollTop;
        }

        // Iniciar el loop de animación de Lenis (con verificación de que raf existe)
        function raf(time) {
          try {
            if (lenis && typeof lenis.raf === 'function') {
              lenis.raf(time);
            }
          } catch(e) {
            console.warn('Error en Lenis raf:', e);
            return;
          }
          requestAnimationFrame(raf);
        }
        
        // Esperar a que Lenis esté completamente inicializado antes de iniciar el loop
        setTimeout(() => {
          if (lenis && typeof lenis.raf === 'function') {
            requestAnimationFrame(raf);
          } else {
            console.warn('Lenis no está listo para iniciar el loop de animación');
          }
        }, 100);

        // Integrar Lenis con ScrollTrigger
        if (typeof ScrollTrigger !== 'undefined' && typeof gsap !== 'undefined') {
        // Configurar proxy para que ScrollTrigger use el scroll de Lenis
        ScrollTrigger.scrollerProxy(window, {
          scrollTop(value) {
            if (arguments.length) {
              lenis.scrollTo(value);
            }
            return getLenisScroll();
          },
          scrollHeight() {
            return Math.max(
              document.body.scrollHeight,
              document.body.offsetHeight,
              document.documentElement.clientHeight,
              document.documentElement.scrollHeight,
              document.documentElement.offsetHeight
            );
          },
          getBoundingClientRect() {
            return { 
              top: 0, 
              left: 0, 
              width: window.innerWidth, 
              height: window.innerHeight 
            };
          }
        });
        
        // Actualizar ScrollTrigger cuando Lenis hace scroll
        lenis.on('scroll', ScrollTrigger.update);
        
        // También usar GSAP ticker para mejor sincronización
        gsap.ticker.lagSmoothing(0);
        
        // Refresh ScrollTrigger después de configurar el proxy
        ScrollTrigger.refresh();
        
        // Refresh cuando cambia el tamaño de la ventana
        window.addEventListener('resize', () => {
          ScrollTrigger.refresh();
        });
        }
      } catch(error) {
        console.error('Error al inicializar Lenis:', error);
        // Si Lenis falla, usar ScrollTrigger normal
        if (typeof ScrollTrigger !== 'undefined') {
          ScrollTrigger.refresh();
        }
      }
    } else {
      // Si Lenis no está disponible, usar ScrollTrigger normal
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
    }

    // Efecto parallax para la sección destacada (se crea después de configurar Lenis)
    const parallaxSection = bodyDemocracia.querySelector('.parallax-section');
    if (parallaxSection && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      const svgWrapper = parallaxSection.querySelector('.parallax-section__svg-wrapper');
      const overlay = parallaxSection.querySelector('.parallax-section__overlay');
      const textReveal = parallaxSection.querySelector('.parallax-section__text-reveal');
      const image = parallaxSection.querySelector('.parallax-section__image');

      if (!svgWrapper || !overlay || !textReveal || !image) {
        console.warn('Elementos de parallax no encontrados');
        return;
      }

      // Estado inicial: SVG visible sobre la imagen, imagen visible, texto oculto con máscara desde abajo
      gsap.set(svgWrapper, { y: 0, opacity: 1 });
      gsap.set(overlay, { opacity: 0 });
      gsap.set(image, { opacity: 1 });
      gsap.set(textReveal, { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' });

      // Efecto parallax en la imagen (movimiento suave mientras se hace scroll)
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

      // Timeline para el efecto completo: SVG se desplaza hacia arriba mientras la imagen se ve
      const revealTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: parallaxSection,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
          invalidateOnRefresh: true,
          onLeaveBack: () => {
            // Reset cuando se sale hacia arriba
            gsap.set(svgWrapper, { y: 0, opacity: 1 });
            gsap.set(textReveal, { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' });
          }
        }
      });

      // Animaciones sincronizadas
      revealTimeline
        // El SVG se desplaza hacia arriba y desaparece gradualmente mientras la imagen permanece visible
        .to(svgWrapper, {
          y: '-100%',
          opacity: 0,
          duration: 0.8,
          ease: 'power2.in'
        }, 0)
        // El texto blanco se revela con máscara de recorte desde abajo
        .to(textReveal, {
          clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)',
          duration: 0.8,
          ease: 'power2.out'
        }, 0.5);

      // Refresh ScrollTrigger después de crear todas las animaciones
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
    }
  }

  // Esperar a que todas las librerías estén cargadas
  function waitForLibraries() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      // Esperar un poco más para asegurar que Lenis también esté disponible
      setTimeout(init, 100);
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
