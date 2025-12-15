document.addEventListener("DOMContentLoaded", () => {
  const navSection = document.querySelector("[data-pillars-nav]");
  const navBar = navSection?.querySelector(".pillars-nav__bar");
  const navItems = navSection?.querySelectorAll(".pillars-nav__item");
  const sections = document.querySelectorAll("[data-pillar-section]");

  if (navSection && navBar && navItems?.length && sections?.length) {
    const cmsOffset = 40; // espacio reservado para el menú del CMS
    const navTop = navSection.getBoundingClientRect().top + window.scrollY;

    const setActive = (id) => {
      navItems.forEach((btn) => {
        const isActive = btn.dataset.target === `#${id}`;
        btn.classList.toggle("is-active", isActive);
        btn.setAttribute("aria-current", isActive ? "true" : "false");
      });
    };

    const handleScroll = () => {
      if (window.scrollY + cmsOffset >= navTop) {
        navSection.classList.add("is-fixed");
        navBar.style.top = `${cmsOffset}px`;
      } else {
        navSection.classList.remove("is-fixed");
        navBar.style.top = "";
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    navItems.forEach((btn) => {
      btn.addEventListener("click", (event) => {
        event.preventDefault();
        const targetSelector = btn.dataset.target;
        const target = document.querySelector(targetSelector);
        if (!target) return;
        const barHeight = navBar.offsetHeight;
        const targetY = target.getBoundingClientRect().top + window.scrollY - (cmsOffset + barHeight + 12);
        window.scrollTo({ top: targetY, behavior: "smooth" });
        setActive(target.id);
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: `-${cmsOffset + navBar.offsetHeight}px 0px -55% 0px`, threshold: 0.3 }
    );

    sections.forEach((section) => observer.observe(section));
  }

  const sliderTrack = document.querySelector("[data-slider-track]");
  const sliderViewport = document.querySelector("[data-slider-viewport]");
  const sliderPrev = document.querySelector("[data-slider-prev]");
  const sliderNext = document.querySelector("[data-slider-next]");
  const slides = sliderTrack ? Array.from(sliderTrack.children) : [];

  if (sliderTrack && sliderViewport && slides.length) {
    let currentIndex = 0;
    let autoplayId = null;
    let stepSize = 0;
    let gapSize = 0;

    const computeSizes = () => {
      const firstSlide = slides[0];
      if (!firstSlide) return;
      const slideRect = firstSlide.getBoundingClientRect();
      const styles = window.getComputedStyle(sliderTrack);
      gapSize = parseFloat(styles.columnGap || styles.gap || "0") || 0;
      stepSize = slideRect.width + gapSize;
    };

    const updatePosition = () => {
      if (!stepSize) computeSizes();
      const viewportWidth = sliderViewport.clientWidth;
      const slideWidth = slides[0].getBoundingClientRect().width;
      const offset = stepSize * currentIndex;
      const centerOffset = (viewportWidth - slideWidth) / 2;
      sliderTrack.style.transform = `translateX(${-(offset - centerOffset)}px)`;
    };

    const restartAutoplay = () => {
      if (autoplayId) clearInterval(autoplayId);
      autoplayId = setInterval(() => {
        goTo(currentIndex + 1);
      }, 4500);
    };

    const goTo = (index) => {
      currentIndex = (index + slides.length) % slides.length;
      updatePosition();
    };

    const nextSlide = () => {
      goTo(currentIndex + 1);
      restartAutoplay();
    };

    const prevSlide = () => {
      goTo(currentIndex - 1);
      restartAutoplay();
    };

    computeSizes();
    updatePosition();
    restartAutoplay();

    sliderNext?.addEventListener("click", nextSlide);
    sliderPrev?.addEventListener("click", prevSlide);
    window.addEventListener("resize", () => {
      computeSizes();
      updatePosition();
    });

    // Soporte de gesto táctil (swipe) en mobile
    let touchStartX = 0;
    let touchEndX = 0;
    const swipeThreshold = 40; // píxeles mínimos para considerar swipe

    const onTouchStart = (event) => {
      const touch = event.touches[0];
      touchStartX = touch.clientX;
      touchEndX = touch.clientX;
    };

    const onTouchMove = (event) => {
      const touch = event.touches[0];
      touchEndX = touch.clientX;
    };

    const onTouchEnd = () => {
      const deltaX = touchEndX - touchStartX;
      if (Math.abs(deltaX) < swipeThreshold) return;

      if (deltaX < 0) {
        // swipe hacia la izquierda -> siguiente
        nextSlide();
      } else {
        // swipe hacia la derecha -> anterior
        prevSlide();
      }
    };

    sliderViewport.addEventListener("touchstart", onTouchStart, { passive: true });
    sliderViewport.addEventListener("touchmove", onTouchMove, { passive: true });
    sliderViewport.addEventListener("touchend", onTouchEnd);
  }
});

