// Scroll suave con respeto a prefers-reduced-motion
    (function () {
      const trigger = document.getElementById('bc-scroll-trigger');
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      function smoothScroll(evt) {
        // Permite el comportamiento por defecto si es ancla normal y reduce motion
        if (prefersReduced) return;

        const href = trigger.getAttribute('href');
        if (!href || !href.startsWith('#')) return;

        const target = document.querySelector(href);
        if (!target) return;

        evt.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      trigger?.addEventListener('click', smoothScroll, { passive: false });
    })();