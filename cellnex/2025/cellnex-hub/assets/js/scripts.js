// Inicializar Lenis solo cuando el DOM esté listo y solo para el contenedor Cellnex
document.addEventListener('DOMContentLoaded', function() {
  const cellnexContainer = document.querySelector('.cellnex-hub-container');
  if (!cellnexContainer) return;
  
  const lenis = new Lenis({ 
    smooth: true,
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smoothTouch: false,
    touchMultiplier: 2,
  });
  
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
});
