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
          ? lenis.scrollTo(value, { duration: 0 })
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

    requestAnimationFrame((time) => {
      raf(time);
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100); // delay para asegurar que todo esté listo
    });
  } else {
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);
  }

  ScrollTrigger.defaults({
    scroller: document.body,
  });

  // ANIMACIONES

  gsap.from(".collab-1", {
    opacity: 0,
    y: -30,
    delay: 0.8,
    duration: 1,
    ease: "power3.out",
  });

  gsap.from(".collab-2", {
    opacity: 0,
    y: -30,
    delay: 1,
    duration: 1,
    ease: "power3.out",
  });

  gsap.from(".collab-3", {
    opacity: 0,
    y: -30,
    delay: 1.2,
    duration: 1,
    ease: "power3.out",
  });

  gsap.utils.toArray(".collab").forEach((element) => {
    gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 100,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.3,
        ease: "power4.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });
});
