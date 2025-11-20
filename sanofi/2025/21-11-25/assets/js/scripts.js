// Scroll nativo - Lenis deshabilitado para permitir scroll normal con el ratón
// Compatible con CMS Xalok - Encapsulado dentro de .body-sanofi
(function() {
  'use strict';
  
  // Verificar si existe el contenedor principal
  const bodySanofi = document.querySelector('.body-sanofi');
  if (!bodySanofi) return;
  
  // Verificar preferencias de movimiento reducido
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  document.addEventListener("DOMContentLoaded", () => {
    // Integrar ScrollTrigger si está disponible (sin Lenis)
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.refresh();
    }

    // Animaciones de scroll reveal - Solo desde cabecera hasta tercer párrafo
    if (!prefersReducedMotion) {
      // Usar requestAnimationFrame para mejor performance
      let ticking = false;
      
      const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.05
      };
      
      const handleIntersection = (entries) => {
        if (!ticking) {
          requestAnimationFrame(() => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Desconectar después de animar para mejor performance
                observer.unobserve(entry.target);
              }
            });
            ticking = false;
          });
          ticking = true;
        }
      };
      
      const observer = new IntersectionObserver(handleIntersection, observerOptions);
      
      // Solo animar: header, intro-section y primera editorial-section (hasta tercer párrafo)
      const headerSection = bodySanofi.querySelector('.header-section');
      const introSection = bodySanofi.querySelector('.intro-section');
      const firstEditorialSection = bodySanofi.querySelector('.editorial-section[aria-labelledby="editorial-heading-1"]');
      
      if (headerSection) {
        // Header siempre visible, no necesita observer
        headerSection.classList.add('visible');
      }
      
      if (introSection) {
        observer.observe(introSection);
      }
      
      if (firstEditorialSection) {
        observer.observe(firstEditorialSection);
      }
    }
    
    // Lazy loading de imágenes - Mejorar performance
    const images = bodySanofi.querySelectorAll('img[loading="lazy"]');
    if ('loading' in HTMLImageElement.prototype) {
      // Navegador soporta lazy loading nativo
      images.forEach(img => {
        img.addEventListener('load', function() {
          this.classList.add('loaded');
        });
        if (img.complete) {
          img.classList.add('loaded');
        }
      });
    } else {
      // Fallback para navegadores antiguos
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
          }
        });
      });
      images.forEach(img => imageObserver.observe(img));
    }

    // Manejo del vídeo con imagen de portada
    const videoWrappers = bodySanofi.querySelectorAll('.video-wrapper');
    
    videoWrappers.forEach(wrapper => {
      const video = wrapper.querySelector('.video-wrapper__video');
      const playButton = wrapper.querySelector('.video-wrapper__play-button');
      
      if (video && playButton) {
        // Inicialmente ocultar controles del vídeo
        video.removeAttribute('controls');
        
        // Al hacer clic en el botón de reproducción
        const playVideo = () => {
          video.classList.add('playing');
          video.setAttribute('controls', 'true');
          playButton.classList.add('hidden');
          video.play().catch(err => {
            console.error('Error al reproducir el vídeo:', err);
          });
        };
        
        playButton.addEventListener('click', playVideo);
        
        // También permitir clic directo en el vídeo (si tiene poster)
        video.addEventListener('click', () => {
          if (!video.classList.contains('playing')) {
            playVideo();
          }
        });
        
        // Ocultar botón cuando el vídeo se reproduce
        video.addEventListener('play', () => {
          playButton.classList.add('hidden');
        });
        
        // Manejar teclado para accesibilidad
        playButton.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            playVideo();
          }
        });
      }
    });
    
    // Mejorar accesibilidad: anunciar cambios importantes a lectores de pantalla
    const mainContent = bodySanofi.querySelector('#main-content');
    if (mainContent) {
      mainContent.setAttribute('role', 'main');
      mainContent.setAttribute('aria-label', 'Contenido principal');
    }
  });
})();
