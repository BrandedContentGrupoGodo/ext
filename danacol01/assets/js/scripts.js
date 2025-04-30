gsap.registerPlugin(ScrollTrigger);

let lenis;
const isDesktop = window.innerWidth >= 768;

if (isDesktop) {
  lenis = new Lenis({ smooth: true });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

// Scroll automático dentro de cada sección
if (isDesktop) {
  gsap.utils.toArray(".section").forEach((section, i) => {
    const inner = section.querySelector(".inner");

    // Pin y animación de scroll interno
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=100%",
      pin: true,
      scrub: true,
      markers: false,
      onEnter: () => {
        gsap.to(inner, {
          scrollTop: inner.scrollHeight,
          ease: "none",
          duration: 2
        });
      }
    });

    // Cambiar el color del body para acompañar el texto
    const color = window.getComputedStyle(section).color;
    const bgColor = window.getComputedStyle(section).backgroundColor;

    ScrollTrigger.create({
      trigger: section,
      start: "top center",
      end: "bottom center",
      onEnter: () => {
        document.body.style.color = color;
        document.body.style.backgroundColor = bgColor;
      },
      onEnterBack: () => {
        document.body.style.color = color;
        document.body.style.backgroundColor = bgColor;
      }
    });
  });
}

// Scroll suave al hacer clic en los enlaces del menú
document.querySelectorAll('.sticky-menu a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetEl = document.querySelector(targetId);
    if (!targetEl) return;

    if (typeof lenis !== "undefined") {
      lenis.scrollTo(targetEl, { offset: -100 });
    } else {
      const top = targetEl.offsetTop - 100;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// Actualiza clase .active en el menú según scroll
const menuLinks = document.querySelectorAll('.sticky-menu a');

gsap.utils.toArray(".section").forEach(section => {
  ScrollTrigger.create({
    trigger: section,
    start: "top center",
    end: "bottom center",
    onEnter: () => setActive(section.id),
    onEnterBack: () => setActive(section.id),
  });
});

function setActive(id) {
  menuLinks.forEach(link => {
    const href = link.getAttribute("href");
    link.classList.toggle("active", href === `#${id}`);
  });
}

// ✅ Mostrar el menú solo a partir de la sección 2 (como antes)
const menu = document.querySelector('.sticky-menu');
const section2 = document.querySelector('#section-2');

ScrollTrigger.create({
  trigger: section2,
  start: "top top",
  onEnter: () => menu.style.display = 'block',
  onLeaveBack: () => menu.style.display = 'none',
});
