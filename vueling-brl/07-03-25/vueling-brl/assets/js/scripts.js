document.addEventListener("DOMContentLoaded", function () {
  console.log("JS cargado correctamente"); // Debugging

  // Verifica que GSAP está disponible
  if (typeof gsap === "undefined") {
    console.error("GSAP no está cargado.");
    return;
  }

  // Registra ScrollTrigger si está disponible
  if (typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  } else {
    console.error("ScrollTrigger no está cargado.");
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

  // Verifica si los elementos existen antes de animarlos
  const elements = gsap.utils.toArray(".contenedor-derecha").filter(el => el);
  
  elements.forEach(element => {
    gsap.from(element, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: "top 90%",
        end: "bottom 10%",
        toggleActions: "play none reverse none",
        once: false
      }
    });
  });

  // Forzar un ScrollTrigger.refresh() adicional
  ScrollTrigger.refresh();
  setTimeout(() => {
    console.log("Forzando ScrollTrigger.refresh()");
    ScrollTrigger.refresh();
  }, 1000);

  console.log("Animaciones cargadas correctamente");
});
