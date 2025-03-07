const tl = gsap.timeline();

tl.to(".main-title", { opacity: 1, duration: 0 }) // Asegura que el título sea visible antes de la animación
  .from(".main-title span", {
    y: 100,
    opacity: 0,
    ease: "power4.out",
    duration: 1.8,
    skewY: 7,
    stagger: {
      amount: 0.3
    }
  });

  tl.from(".intro-text", {
    opacity: 0,
    y: 20, // Movimiento sutil hacia arriba
    duration: 1,
    ease: "power2.out"
  }, "-=1"); // Inicia la animación justo después del `main-title`
  
  tl.from(".bottom-right-image", {
    opacity: 0,
    y: -15,  // Sube un poco más para mayor impacto
    duration: 0.6,  // Aparece más rápido
    ease: "power2.out"
  })
  .to(".bottom-right-image", {
    y: 15,  // Movimiento más pronunciado
    repeat: -1,  // Animación infinita
    yoyo: true,  // Sube y baja continuamente
    duration: 0.8,  // Hace el rebote más rápido
    ease: "power1.inOut"
  });
  
  gsap.utils.toArray(".content-text, .contenedor-derecha, h2, h3, .destacado-centro").forEach(element => {
    gsap.from(element, {
      opacity: 0,  // Empieza invisible
      y: 50,  // Se desplaza desde abajo
      duration: 1,  // La animación dura 1 segundo
      ease: "power2.out",  // Efecto de entrada suave
      scrollTrigger: {
        trigger: element,
        start: "top 90%",  // La animación empieza cuando el elemento entra al 80% de la vista
        end: "bottom 10%",  // Termina cuando el elemento llega al 20% desde abajo
        toggleActions: "play none none none",  // La animación se activa solo una vez
      }
    });
  });
  
  
  
