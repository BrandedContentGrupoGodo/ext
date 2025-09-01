// Animación hero: título y subtítulo
gsap.fromTo(
  [".hero__title", ".subtitular"], // ambos elementos
  { opacity: 0, y: 20 },           // estado inicial: invisible y abajo
  { 
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power2.out",
    stagger: 0.3                   // retraso entre ellos
  }
);

// ScrollTrigger para el reportaje
gsap.to("#reportaje", {
  scrollTrigger: {
    trigger: "#reportaje",
    start: "top 80%",
  },
  y: 0,
  opacity: 1,
  duration: 1,
  ease: "power2.out"
});

// Animación GSAP para todas las secciones con clase .reportaje
gsap.utils.toArray(".reportaje").forEach(section => {
  gsap.fromTo(section, 
    { y: 50, opacity: 0 },       // estado inicial
    { 
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: "top 80%",        // cuando la sección llegue al 80% de la pantalla
      }
    }
  );
});
