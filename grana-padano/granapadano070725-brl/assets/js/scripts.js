gsap.registerPlugin(ScrollTrigger);

let lenis;
const isDesktop = window.innerWidth >= 768;

if (isDesktop) {
  // Inicializar Lenis solo una vez
  lenis = new Lenis({ smooth: true });

  // Función de animación para Lenis
  function raf(time) {
    lenis.raf(time);
    ScrollTrigger.update(); // Actualizar ScrollTrigger en cada frame
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}



window.addEventListener("load", () => {
  setTimeout(() => {
    ScrollTrigger.refresh(true); // 🔥 fuerza un full recalculo
  }, 1000); // dale más margen si el CMS tarda
});
