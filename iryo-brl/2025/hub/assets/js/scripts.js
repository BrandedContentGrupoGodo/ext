// Activa ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Anima cada frase al hacer scroll
gsap.utils.toArray(".frase-slide").forEach((slide) => {
  gsap.to(slide.querySelector("p"), {
    scrollTrigger: {
      trigger: slide,
      start: "top center",
      end: "bottom center",
      toggleActions: "play none none reverse",
    },
    opacity: 1,
    y: 0,
    duration: 1.2,
    ease: "power3.out",
  });
});

// Anima el título al hacer scroll
gsap.to(".hero-title", {
  scrollTrigger: {
    trigger: ".hero-title",
    start: "top 80%",
    end: "bottom top",
    toggleActions: "play none none none", // solo aparece una vez
  },
  opacity: 1,
  y: 0,
  duration: 1.2,
  ease: "power3.out",
});

// capitulos
gsap.utils.toArray('.chapter').forEach((chapter) => {
  gsap.to(chapter, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: chapter,
      start: "top 80%", // cuando el capítulo está a 80% del viewport
      toggleActions: "play none none reverse",
    }
  });
});

gsap.utils.toArray('.chapter-content').forEach((content) => {
  gsap.to(content, {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: content,
      start: "top 80%", // cuando el contenido entra al 80% del viewport
      toggleActions: "play none none reverse"
    }
  });
});
