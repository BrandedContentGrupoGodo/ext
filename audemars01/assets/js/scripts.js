gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  const isDesktop = window.innerWidth >= 768;
  let lenis;

  if (isDesktop) {
    lenis = new Lenis({
      smooth: true,
      lerp: 0.1,
    });

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        return arguments.length
          ? lenis.scrollTo(value, { duration: 0, immediate: true })
          : window.scrollY;
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
  }

  // Doble refresh por seguridad
  const forceRefresh = () => {
    ScrollTrigger.refresh();
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);
  };

  // Por si el contenido tarda (CMS)
  window.addEventListener("load", () => {
    setTimeout(() => {
      forceRefresh();
    }, 500);
  });

  // También por si acaso después del DOM ya cargado
  setTimeout(forceRefresh, 1000);

  // ANIMACIONES
  gsap.from(".collab-1", {
    opacity: 0,
    y: -30,
    delay: 0.8,
    duration: 1,
    ease: "power3.out",
  });

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
    line.style.backgroundImage =
      "repeating-linear-gradient(to bottom, black 0, black 10px, transparent 10px, transparent 20px)";
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

  window.addEventListener("resize", () => {
    gsap.utils.toArray(".dashed-line").forEach((line) => {
      const wrapper = line.closest(".timeline-wrapper");
      const content = wrapper.querySelector(".timeline-content") || wrapper;
      const contentHeight = content.offsetHeight;
      line.style.height = `${contentHeight}px`;
    });
    ScrollTrigger.refresh();
  });

  ScrollTrigger.create({
    trigger: ".bg-fondo1",
    start: "top center",
    end: "bottom center",
    onEnter: () => {
      document
        .querySelector(".timeline-section")
        .classList.add("fondo1-activo");
      document
        .querySelector(".timeline-section")
        .classList.remove("fondo2-activo");
    },
  });

  ScrollTrigger.create({
    trigger: ".bg-fondo2",
    start: "top center",
    end: "bottom center",
    onEnter: () => {
      document
        .querySelector(".timeline-section")
        .classList.add("fondo2-activo");
      document
        .querySelector(".timeline-section")
        .classList.remove("fondo1-activo");
    },
  });

  gsap.utils.toArray(".col-img, .col-text").forEach((el, i) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: 30,
      scale: 0.98,
      duration: 0.9,
      ease: "power2.out",
      delay: i * 0.2,
    });
  });

  gsap.utils.toArray(".box").forEach((box) => {
    gsap.from(box, {
      scrollTrigger: {
        trigger: box,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power2.out",
    });
  });

  const bullets = gsap.utils.toArray(".quadrilateral-block .bullet");

  gsap.set(bullets, { opacity: 0, scale: 0.9 });

  gsap.to(bullets, {
    scrollTrigger: {
      trigger: ".quadrilateral-block",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
    opacity: 1,
    scale: 1,
    duration: 1,
    ease: "power2.out",
    stagger: 0.2,
  });

  // SLIDER
  const track = document.querySelector(".slider-track");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const slides = document.querySelectorAll(".slide");

  if (track && prevBtn && nextBtn && slides.length) {
    const slideWidth = slides[0].offsetWidth + 20;
    const visibleSlides = window.innerWidth < 768 ? 1 : 2.5;
    const maxIndex = Math.max(
      0,
      Math.floor(slides.length - visibleSlides + 0.5)
    );
    let currentIndex = 0;

    const updateSlider = () => {
      const offset = currentIndex * slideWidth;
      gsap.to(track, {
        x: -offset,
        duration: 0.8,
        ease: "power2.out",
      });
      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex >= maxIndex;
    };

    prevBtn.addEventListener("click", () => {
      if (currentIndex > 0) currentIndex--;
      updateSlider();
    });

    nextBtn.addEventListener("click", () => {
      if (currentIndex < maxIndex) currentIndex++;
      updateSlider();
    });
  }
});
