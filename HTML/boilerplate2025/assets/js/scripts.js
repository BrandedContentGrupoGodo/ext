// Registrar el plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

/**
 * Animación con ScrollTrigger para la caja animada.
 * Cuando entra en el viewport, se escala.
 */
ScrollTrigger.create({
  trigger: "#animatedBox",
  start: "top 80%",       // Cuando la parte superior del trigger llega al 80% del viewport
  end: "bottom 50%",      // Hasta que la parte inferior llega al 50% del viewport
  markers: true,          // Activar para debug visual (quítalo en producción)
  onEnter: () => gsap.to("#animatedBox", { scale: 1.2, duration: 1 }),
  onLeaveBack: () => gsap.to("#animatedBox", { scale: 1, duration: 1 }),
});

// Ejemplo de configuración básica con Lenis (si lo necesitas)
const lenis = new Lenis({
    duration: 1.2,
    smoothWheel: true,
    smoothTouch: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Animación con ScrollTrigger para las tarjetas
ScrollTrigger.create({
  trigger: ".card", // Aquí puedes usar .card si quieres animar las tarjetas
  start: "top 80%", // Cuando la parte superior del trigger llega al 80% del viewport
  end: "bottom 50%", // Hasta que la parte inferior llega al 50% del viewport
  markers: true, // Activar para debug visual
  onEnter: () => gsap.to(".card", { scale: 1.1, duration: 0.5 }),
  onLeaveBack: () => gsap.to(".card", { scale: 1, duration: 0.5 }),
});

lenis.on('scroll', ScrollTrigger.update);

// Animación scrollytelling: zoom in + fade para imagen full width
gsap.fromTo(".full-image", 
    { scale: 1.2, opacity: 0 },
    {
      scrollTrigger: {
        trigger: ".image-full",
        start: "top 80%",
        end: "bottom 20%",
        scrub: true,
        // markers: true,
      },
      scale: 1,
      opacity: 1,
      ease: "power2.out",
    }
  );
  
  // Animación para el texto sobre la imagen
  gsap.from(".image-caption", {
    scrollTrigger: {
      trigger: ".image-full",
      start: "top 90%",
      end: "bottom 20%",
      scrub: true,
      // markers: true,
    },
    y: 50,
    opacity: 0,
    ease: "power1.out",
  });
  
  // Animación de reproducción de video con scroll
const video = document.querySelector(".sticky-media video");

ScrollTrigger.create({
  trigger: ".sticky-section",
  start: "top top",
  end: "bottom bottom",
  scrub: true,
  onUpdate: self => {
    if (video.duration) {
      const scrollProgress = self.progress;
      video.currentTime = scrollProgress * video.duration;
    }
  }
});

// Crear spans por cada letra
const headline = document.querySelector('.headline-animated');
const text = headline.textContent;
headline.textContent = '';

text.split('').forEach((char, i) => {
  const span = document.createElement('span');
  span.textContent = char;
  headline.appendChild(span);
});

// Animar letras al hacer scroll
gsap.to('.headline-animated span', {
  scrollTrigger: {
    trigger: '.hero-headline',
    start: 'top 80%',
    toggleActions: 'play none none reverse'
  },
  y: 0,
  opacity: 1,
  duration: 0.6,
  ease: 'power3.out',
  stagger: 0.04
});

gsap.utils.toArray('.texto-scroll p').forEach((p, i) => {
    // Establecer el estado inicial (solo opacidad y movimiento)
    gsap.set(p, {
      opacity: 0,
      y: 30,  // Empieza ligeramente desplazado
    });
  
    // Animación fluida
    gsap.to(p, {
        scrollTrigger: {
          trigger: p,
         start: 'top 90%',
        toggleActions: 'play none none reverse'
        },
        opacity: 1,
        y: 0,  // Movimiento hasta su posición original
        duration: 1.2,  // Duración más constante
        delay: i * 0.15,  // Espacio entre párrafos
        ease: 'power2.out',  // Cambio de ease para hacer la entrada más rápida
      });
    });
  
  
  // Animación frase grande            
  gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray('.headline-line').forEach((line, i) => {
  gsap.to(line, {
    scrollTrigger: {
      trigger: line,
      start: 'top 90%',
      toggleActions: 'play none none reverse'
    },
    opacity: 1,
    y: 0,
    duration: 1.2,
    delay: i * 0.15,
    ease: 'power4.out'
  });
});

    // Animaciones titulares push
    gsap.utils.toArray(".headline-push").forEach((el) => {
        gsap.to(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 70%",
            toggleActions: "play none none reverse"
          },
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power3.out"
        });
    });

    // Animaciones mascara de imagen
    gsap.to(".image1", {
        scrollTrigger: {
          trigger: "#cover",
          start: "top top",       // comienza apenas entra el section
          end: "center top",      // termina cuando el centro del section toca el top del viewport
          scrub: true,
        },
        clipPath: "circle(0% at 50% 50%)",
        ease: "none"
    });

    const audio = new Audio('https://webaudioapi.com/samples/audio-tag/chrono.mp3')

ScrollTrigger.create({
  
  trigger: '.audio-trigger',
  
  start: 'top center',
  end: '+=100%',
  
  onEnter() { audio.play() },
  onLeave() { audio.pause() },
  onEnterBack() { audio.play() },
  onLeaveBack() { audio.pause() },
  
  markers: true
  
})