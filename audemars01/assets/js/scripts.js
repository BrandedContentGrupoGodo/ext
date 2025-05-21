gsap.registerPlugin(ScrollTrigger);

let lenis;
const isDesktop = window.innerWidth >= 768;

if (isDesktop) {
  lenis = new Lenis({
    smooth: true,
    lerp: 0.1,
  });

  ScrollTrigger.scrollerProxy(document.body, {
    scrollTop(value) {
      return arguments.length
        ? lenis.scrollTo(value, { duration: 0, immediate: true })
        : lenis.scroll;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: document.body.style.transform ? "transform" : "fixed",
  });

  function raf(time) {
    lenis.raf(time);
    ScrollTrigger.update();
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  gsap.from(".collab-1", {
    opacity: 0,
    y: -30,
    delay: 0.8,
    duration: 1,
    ease: "power3.out",
  });

  // Parallax
  gsap.utils.toArray(".parallax").forEach((elem) => {
    gsap.to(elem, {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: elem,
        scroller: document.body,
        start: "top bottom", 
        end: "bottom top",
        scrub: true,
      },
    });
  });

  gsap.utils.toArray(".dashed-line").forEach((line) => {
    const wrapper = line.closest(".timeline-wrapper");
    const content = wrapper.querySelector(".timeline-content") || wrapper;
    const contentHeight = content.offsetHeight;
    line.style.height = `${contentHeight}px`;
    line.style.backgroundImage = "repeating-linear-gradient(to bottom, black 0, black 10px, transparent 10px, transparent 20px)";
    line.style.backgroundRepeat = "repeat-y";
    line.style.backgroundSize = "1px 20px";
    line.style.width = "2px";

    gsap.fromTo(
      line,
      { height: 0, opacity: 0 },
      {
        height: `${contentHeight}px`,
        opacity: 1,
        ease: "power1.out",
        scrollTrigger: {
          trigger: wrapper,
          start: "top 90%",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  });

  function refreshDashedLines() {
    gsap.utils.toArray(".dashed-line").forEach((line) => {
      const wrapper = line.closest(".timeline-wrapper");
      const content = wrapper.querySelector(".timeline-content") || wrapper;
      const contentHeight = content.offsetHeight;
      line.style.height = `${contentHeight}px`;
    });
    ScrollTrigger.refresh();
  }

  window.addEventListener("resize", refreshDashedLines);

  // CAMBIO DE FONDO SUAVE
  ScrollTrigger.create({
    trigger: ".bg-fondo1",
    start: "top center",
    end: "bottom center",
    onEnter: () => {
      document.querySelector(".timeline-section").classList.add("fondo1-activo");
      document.querySelector(".timeline-section").classList.remove("fondo2-activo");
    },
  });

  ScrollTrigger.create({
    trigger: ".bg-fondo2",
    start: "top center",
    end: "bottom center",
    onEnter: () => {
      document.querySelector(".timeline-section").classList.add("fondo2-activo");
      document.querySelector(".timeline-section").classList.remove("fondo1-activo");
    },
  });
}

gsap.utils.toArray('.col-img, .col-text').forEach((el, i) => {
  gsap.from(el, {
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
      toggleActions: "play none none none"
    },
    opacity: 0,
    y: 30,
    scale: 0.98,
    duration: 0.9,
    ease: "power2.out",
    delay: i * 0.2
  });
});
// Animación de aparición para las imágenes .box
  gsap.utils.toArray(".box").forEach((box) => {
    gsap.from(box, {
      scrollTrigger: {
        trigger: box,
        start: "top 80%", // cuando el top del box llega al 80% del viewport
        toggleActions: "play none none none", // solo se activa una vez
      },
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power2.out",
    });
  });