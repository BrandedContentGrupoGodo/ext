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
  if (isDesktop) {
    lenis = new Lenis({ smooth: true });
  
    function raf(time) {
      lenis.raf(time);
      ScrollTrigger.update(); // 🔧 Esta línea es clave para evitar el salto
      requestAnimationFrame(raf);
    }
  
    requestAnimationFrame(raf);
  }
  
}

// Scroll automático dentro de cada sección
if (isDesktop) {
  gsap.utils.toArray(".section").forEach((section, i) => {
    const inner = section.querySelector(".inner");

    // Pin y animación de scroll interno
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: () => `+=${section.offsetHeight}`, // duración dinámica según contenido
      pin: true,
      scrub: true,
      anticipatePin: 1,
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

// Oculta el menú de entrada
menu.style.opacity = '0';
menu.style.display = 'none';

ScrollTrigger.create({
  trigger: section2,
  start: "top top",
  onEnter: () => {
    menu.style.display = 'block';
    setTimeout(() => {
      menu.style.opacity = '1';
    }, 10); // tiny delay to allow opacity transition
  },
  onLeaveBack: () => {
    menu.style.opacity = '0';
    setTimeout(() => {
      menu.style.display = 'none';
    }, 300); // espera a que se desvanezca antes de ocultar
  },
});

window.addEventListener("load", () => {
  requestAnimationFrame(() => {
    setTimeout(() => {
      ScrollTrigger.refresh();
      const section2Top = section2.getBoundingClientRect().top;
      if (section2Top > 1) {
        menu.style.opacity = '0';
        menu.style.display = 'none';
      }
    }, 150);
  });
});



window.addEventListener("load", () => {
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 100); // da un pequeño margen por si hay carga lenta
});
