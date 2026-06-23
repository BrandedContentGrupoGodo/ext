(function () {
  "use strict";

  const GSAP_URL = "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js";
  const SCROLL_TRIGGER_URL =
    "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js";

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      if (document.querySelector('script[src="' + src + '"]')) {
        resolve();
        return;
      }
      var el = document.createElement("script");
      el.src = src;
      el.async = true;
      el.onload = function () {
        resolve();
      };
      el.onerror = reject;
      document.body.appendChild(el);
    });
  }

  function whenIdle(fn, timeout) {
    if ("requestIdleCallback" in window) {
      requestIdleCallback(fn, { timeout: timeout || 2000 });
    } else {
      setTimeout(fn, 1);
    }
  }

  function observeOnce(target, onVisible, rootMargin) {
    if (!target) return;
    if (!("IntersectionObserver" in window)) {
      onVisible();
      return;
    }
    var observer = new IntersectionObserver(
      function (entries) {
        if (entries[0].isIntersecting) {
          onVisible();
          observer.disconnect();
        }
      },
      { rootMargin: rootMargin || "120px" }
    );
    observer.observe(target);
  }

  function applyAnimationFallback() {
    document.querySelectorAll(".hero__image img").forEach(function (img) {
      img.style.opacity = "1";
    });
    var title = document.querySelector(".hero__title");
    if (title) title.style.opacity = "1";
    var cta = document.querySelector(".hero__cta");
    if (cta) cta.style.opacity = "1";
  }

  function initGsapAnimations() {
    if (!window.gsap) {
      applyAnimationFallback();
      return;
    }

    gsap.fromTo(
      ".hero__image img",
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power2.out" }
    );

    gsap.to(".hero__title", {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.5,
      ease: "power2.out",
    });

    gsap.fromTo(
      ".hero__cta",
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, delay: 1, ease: "elastic.out(1,0.5)" }
    );

    if (window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
    }

    if (document.querySelector("#reportaje")) {
      gsap.to("#reportaje", {
        scrollTrigger: {
          trigger: "#reportaje",
          start: "top 80%",
          once: true,
          invalidateOnRefresh: true,
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      });
    }
  }

  function initAnimations() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      applyAnimationFallback();
      return;
    }

    loadScript(GSAP_URL)
      .then(function () {
        return loadScript(SCROLL_TRIGGER_URL);
      })
      .then(initGsapAnimations)
      .catch(applyAnimationFallback);
  }

  function initHeroScroll() {
    var heroCta = document.querySelector(".hero__cta");
    if (!heroCta) return;
    heroCta.addEventListener("click", function (e) {
      e.preventDefault();
      var videoSection = document.querySelector("#video-section");
      if (videoSection) {
        videoSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  function initReportajeVisibility() {
    document.querySelectorAll(".reportaje").forEach(function (section) {
      section.style.opacity = "1";
    });

    if (!window.MutationObserver) return;

    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        mutation.addedNodes.forEach(function (node) {
          if (node.nodeType !== 1) return;
          if (node.classList && node.classList.contains("reportaje")) {
            node.style.opacity = "1";
          }
          var nested = node.querySelectorAll ? node.querySelectorAll(".reportaje") : [];
          nested.forEach(function (sec) {
            sec.style.opacity = "1";
          });
        });
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  function initYoutubeFacade() {
    document.querySelectorAll(".video-wrapper[data-youtube-id]").forEach(function (wrapper) {
      var poster = wrapper.querySelector(".video-wrapper__poster");
      if (!poster) return;

      poster.addEventListener("click", function () {
        var id = wrapper.getAttribute("data-youtube-id");
        if (!id) return;

        var iframe = document.createElement("iframe");
        iframe.src =
          "https://www.youtube.com/embed/" +
          id +
          "?autoplay=1&rel=0";
        iframe.title = poster.getAttribute("aria-label") || "Video de la campaña";
        iframe.loading = "lazy";
        iframe.setAttribute("allowfullscreen", "");
        iframe.setAttribute(
          "allow",
          "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        );
        wrapper.replaceChildren(iframe);
      });
    });
  }

  function initLightbox() {
    var lightbox = document.getElementById("lightbox");
    var lightboxImg = document.getElementById("lightbox-img");
    var lightboxClose = document.getElementById("lightbox-close");
    if (!lightbox || !lightboxImg || !lightboxClose) return;

    document.querySelectorAll(".gallery-item").forEach(function (img) {
      img.addEventListener("click", function () {
        lightbox.style.display = "flex";
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
      });
    });

    lightboxClose.addEventListener("click", function () {
      lightbox.style.display = "none";
      lightboxImg.src = "";
    });

    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) {
        lightbox.style.display = "none";
        lightboxImg.src = "";
      }
    });
  }

  function loadTwitterWidgets() {
    if (document.getElementById("twitter-wjs")) return;
    var s = document.createElement("script");
    s.id = "twitter-wjs";
    s.async = true;
    s.src = "https://platform.twitter.com/widgets.js";
    s.charset = "utf-8";
    document.body.appendChild(s);
  }

  function initLazySocialBar() {
    var socialBar = document.querySelector(".social-bar");
    if (!socialBar) return;

    observeOnce(
      socialBar,
      function () {
        socialBar.querySelectorAll("iframe[data-src]").forEach(function (iframe) {
          if (!iframe.src || iframe.src === "about:blank") {
            iframe.src = iframe.getAttribute("data-src");
          }
        });
        loadTwitterWidgets();
      },
      "200px"
    );
  }

  function loadQualifio() {
    var container = document.querySelector(".iframeQualifio");
    if (!container || container.dataset.qualifioLoaded === "true") return;
    container.dataset.qualifioLoaded = "true";

    (function (b, o, n, u, s) {
      var a, t;
      a = b.createElement(u);
      a.async = 1;
      a.src = s;
      t = b.getElementsByTagName(u)[0];
      t.parentNode.insertBefore(a, t);
      o[n] = o[n] || [];
    })(
      document,
      window,
      "_qual_async",
      "script",
      "https://files.qualifio.com/kit/qualp.2.min.js"
    );

    window._qual_async = window._qual_async || [];
    window._qual_async.push([
      "createIframe",
      "qualifio_insert_place_1666371",
      "lavanguardia.qualifioapp.com",
      "20",
      "D6A2A023-A757-4C3C-9D10-6C1B627D96CA",
      "100%",
      "670",
      "",
      "",
      "",
      "max-width:810px;margin:0 auto;",
    ]);
  }

  function initLazyQualifio() {
    observeOnce(document.querySelector(".iframeQualifio"), loadQualifio, "300px");
    setTimeout(loadQualifio, 3500);
  }

  initHeroScroll();
  initReportajeVisibility();
  initYoutubeFacade();
  initLightbox();
  initLazySocialBar();
  initLazyQualifio();
  whenIdle(initAnimations, 2500);
})();
