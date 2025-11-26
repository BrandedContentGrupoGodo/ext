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
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
        smoothTouch: false
      });

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

      // Iniciar el loop de animación de Lenis SIEMPRE (importante para que funcione el scroll)
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

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
    } else {
      // Si Lenis no está disponible, usar ScrollTrigger normal
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
