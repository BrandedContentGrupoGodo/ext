document.addEventListener("DOMContentLoaded", function () {
  console.log("JS cargado correctamente"); // Debugging

  // Verifica que GSAP y ScrollTrigger están disponibles
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    console.error("GSAP o ScrollTrigger no están cargados.");
    return;
  }

  const tl = gsap.timeline();

  tl.to(".main-title", { opacity: 1, duration: 0 })
    .from(".main-title span", {
      y: 100,
      opacity: 0,
      ease: "power4.out",
      duration: 1.8,
      skewY: 7,
      stagger: { amount: 0.3 }
    });

  tl.from(".intro-text", {
    opacity: 0,
    y: 20,
    duration: 1,
    ease: "power2.out"
  }, "-=1");

  tl.from(".bottom-right-image", {
    opacity: 0,
    y: -15,
    duration: 0.6,
    ease: "power2.out"
  })
  .to(".bottom-right-image", {
    y: 15,
    repeat: -1,
    yoyo: true,
    duration: 0.8,
    ease: "power1.inOut"
  });

  gsap.utils.toArray(".content-text, .contenedor-derecha, h2, h3, .destacado-centro").forEach(element => {
    if (!element) {
      console.warn("Elemento no encontrado para la animación:", element);
      return;
    }

    gsap.from(element, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: "top 90%",
        end: "bottom 10%",
        toggleActions: "play none none none",
        once: false
      }
    });
  });

  // Soluciona problemas con ScrollTrigger en CMS
  ScrollTrigger.refresh();
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 500);

  console.log("Animaciones cargadas correctamente");
});
