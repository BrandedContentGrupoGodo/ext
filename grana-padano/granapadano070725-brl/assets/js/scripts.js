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

// Scroll automático dentro de cada sección
if (isDesktop) {
  gsap.utils.toArray(".section").forEach((section) => {
    const inner = section.querySelector(".inner");

    // Pin y animación de scroll interno
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: () => `+=${section.offsetHeight}`, // duración dinámica según contenido
      scrub: true,
    });

    // Cambiar el color del body para acompañar el texto
    const color = window.getComputedStyle(section).color;
    const bgColor = window.getComputedStyle(section).backgroundColor;

    ScrollTrigger.create({
      trigger: section,
      start: "top center",
      end: "bottom center",
      onEnter: () => {
        document.body.style.color = color;
        document.body.style.backgroundColor = bgColor;
      },
      onEnterBack: () => {
        document.body.style.color = color;
        document.body.style.backgroundColor = bgColor;
      }
    });
  });
}


window.addEventListener("load", () => {
  setTimeout(() => {
    ScrollTrigger.refresh(true); // 🔥 fuerza un full recalculo
  }, 1000); // dale más margen si el CMS tarda
});
