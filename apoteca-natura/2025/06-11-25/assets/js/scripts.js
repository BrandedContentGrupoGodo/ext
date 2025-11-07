// Configurar Lenis con opciones para evitar conflictos con iframes
let lenis;

// Inicializar Lenis después de que todo esté cargado
document.addEventListener("DOMContentLoaded", () => {
  lenis = new Lenis({ 
    smooth: true,
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    infinite: false,
    lerp: 0.1
  });

  // Integrar Lenis con ScrollTrigger si está disponible
  if (typeof ScrollTrigger !== 'undefined') {
    lenis.on('scroll', ScrollTrigger.update);
    
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    
    gsap.ticker.lagSmoothing(0);
  } else {
    // Si ScrollTrigger no está disponible, usar el método tradicional
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }
});
