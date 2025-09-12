 // Inicializamos Lenis
  const lenis = new Lenis({
    duration: 0.8,               // Más estable que 0.6
    easing: t => t*(2-t),        // EaseOutQuad
    smooth: true,                
    direction: 'vertical',
    gestureDirection: 'vertical',
    mouseMultiplier: 1.2,        // No demasiado rápido, evita saltos
    smoothTouch: true,
    infinite: false
  });

  // Método para que Lenis se ejecute en cada frame
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  // Opcional: Escuchar evento de scroll
  lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }) => {
    // console.log(scroll, limit, velocity, direction, progress);
  });
