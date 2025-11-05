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


// AUDIO
document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("bg-audio");
  const toggle = document.getElementById("audio-toggle");

  if (!audio || !toggle) return;

  // Estado inicial
  toggle.textContent = "🔇";
  toggle.classList.add("pulse");

  // Activar sonido con primer clic (obligatorio por políticas de navegador)
  const activateAudio = () => {
    audio.muted = false;
    audio.volume = 1;
    audio.play().catch(err => console.warn("Error de autoplay:", err));
    toggle.textContent = "🔊";
    toggle.classList.remove("pulse");

    // Ya no necesitamos esta función después del primer clic
    window.removeEventListener("click", activateAudio);
  };

  window.addEventListener("click", activateAudio);

  // Control manual con botón
  toggle.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevenir que dispare también activateAudio
    if (audio.muted) {
      audio.muted = false;
      audio.play().catch(err => console.warn("Error al reproducir:", err));
      toggle.textContent = "🔊";
    } else {
      audio.muted = true;
      toggle.textContent = "🔇";
    }
  });
});

// TIMELINE ANIMATION
document.addEventListener("DOMContentLoaded", () => {
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    const timelineList = document.querySelector(".timeline-list");
    const timelineLine = document.querySelector(".timeline-line path");
    const timelineItems = document.querySelectorAll(".timeline-item");

    if (timelineList && timelineLine && timelineItems.length > 0) {
      // Configurar la línea punteada para dibujo progresivo
      const pathLength = timelineLine.getTotalLength();
      const dashSize = 12;
      const gapSize = 12;
      const patternLength = dashSize + gapSize;
      
      // Crear un stroke-dasharray muy largo con muchas repeticiones del patrón
      // Esto minimiza el efecto de desplazamiento y hace que parezca dibujo progresivo
      const repetitions = Math.ceil(pathLength / patternLength) * 3; // 3x para asegurar cobertura
      const dashArrayParts = [];
      for (let i = 0; i < repetitions; i++) {
        dashArrayParts.push(dashSize, gapSize);
      }
      const longDashArray = dashArrayParts.join(' ');
      timelineLine.style.strokeDasharray = longDashArray;
      
      // Calcular el offset inicial: ocultar toda la línea
      // Usamos un valor que sea múltiplo del patrón para mejor alineación
      const totalDashLength = repetitions * patternLength;
      timelineLine.style.strokeDashoffset = totalDashLength;
      
      // Calcular el offset final para mostrar toda la línea
      const finalOffset = totalDashLength - pathLength;

      // Animar la línea cuando el contenedor sea visible
      ScrollTrigger.create({
        trigger: timelineList,
        start: "top 80%",
        once: true,
        onEnter: () => {
          // Animar el offset para dibujar la línea progresivamente
          gsap.to(timelineLine, {
            strokeDashoffset: finalOffset,
            duration: 2,
            ease: "power2.inOut"
          });
        }
      });

      // Animar los bullets con delay escalonado
      timelineItems.forEach((item, index) => {
        const dot = item.querySelector(".timeline-dot");
        
        ScrollTrigger.create({
          trigger: timelineList,
          start: "top 80%",
          once: true,
          onEnter: () => {
            // Animar el item
            gsap.to(item, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: index * 0.2,
              ease: "power2.out"
            });

            // Animar el punto con efecto bounce
            if (dot) {
              gsap.to(dot, {
                opacity: 1,
                scale: 1,
                duration: 0.4,
                delay: index * 0.2 + 0.3,
                ease: "back.out(1.7)"
              });
            }
          }
        });
      });
    }
  }
});

// MAPA
document.addEventListener("DOMContentLoaded", () => {
  const mapa = document.getElementById("mapa-img");

  const boxNaranja = document.querySelector(".map-box.naranja");

  let boxesVisible = false;

  // Desktop: hover
  mapa.addEventListener("mouseenter", () => {
    if (window.innerWidth > 768) {
      boxNaranja.classList.add("show");
    }
  });

  mapa.addEventListener("mouseleave", () => {
    if (window.innerWidth > 768) {
      boxNaranja.classList.remove("show");
    }
  });

  // Mobile: touch
  mapa.addEventListener("click", (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      boxesVisible = !boxesVisible;

      if (boxesVisible) {
        boxNaranja.classList.add("show");
      } else {
        boxNaranja.classList.remove("show");
      }
    }
  });

  // Tocar fuera del mapa oculta las cajas (mobile)
  document.addEventListener("click", (e) => {
    if (window.innerWidth <= 768) {
      const isClickInside = mapa.contains(e.target);
      if (!isClickInside && boxesVisible) {
        boxNaranja.classList.remove("show");
        boxesVisible = false;
      }
    }
  });
});
