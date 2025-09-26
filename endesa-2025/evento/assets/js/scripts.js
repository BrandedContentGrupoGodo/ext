const lenis = new Lenis({ smooth: true });
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

window.addEventListener("load", () => {
  const header = document.querySelector(".header-section");
  header.classList.remove("hidden");
  header.classList.add("loaded");

  // Fondo tipo cine: leve zoom + blur
  gsap.fromTo(
    header,
    { scale: 1.05, filter: "blur(10px)" },
    { scale: 1, filter: "blur(0px)", duration: 1.8, ease: "power2.out" }
  );

  // Entrada elegante del texto
  gsap.to(".header-text > *", {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    duration: 1,
    stagger: 0.3,
    delay: 1,
    ease: "power3.out"
  });
});
