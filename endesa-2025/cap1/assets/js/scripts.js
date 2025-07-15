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
