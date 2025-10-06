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

    // Manejo de vídeos del hero
    (function () {
      const videos = document.querySelectorAll('.hero__video-element');
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Función para pausar todos los vídeos
      function pauseAllVideos() {
        videos.forEach(video => {
          if (!video.paused) {
            video.pause();
          }
        });
      }

      // Función para reanudar todos los vídeos
      function playAllVideos() {
        videos.forEach(video => {
          if (video.paused) {
            video.play().catch(e => console.log('Error al reproducir vídeo:', e));
          }
        });
      }

      // Manejar visibilidad de la página
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          pauseAllVideos();
        } else {
          playAllVideos();
        }
      });

      // Manejar cuando el usuario sale de la página
      window.addEventListener('beforeunload', () => {
        pauseAllVideos();
      });

      // Inicializar vídeos cuando estén listos
      videos.forEach((video, index) => {
        // Manejar errores de carga
        video.addEventListener('error', (e) => {
          console.warn(`Error al cargar vídeo ${index + 1}:`, e);
          // Mostrar un placeholder si el vídeo falla
          video.style.display = 'none';
          const container = video.closest('.hero__video');
          if (container) {
            container.style.background = 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)';
            container.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #1F418E; font-weight: 500;">Vídeo no disponible</div>';
          }
        });

        // Asegurar que los vídeos se reproduzcan automáticamente
        video.addEventListener('loadeddata', () => {
          if (!prefersReduced) {
            video.play().catch(e => {
              console.log('Autoplay bloqueado para vídeo', index + 1, e);
            });
          }
        });

        // Manejar clic en el contenedor del vídeo
        const container = video.closest('.hero__video');
        if (container) {
          container.addEventListener('click', () => {
            if (video.paused) {
              video.play().catch(e => console.log('Error al reproducir vídeo:', e));
            } else {
              video.pause();
            }
          });

          // Manejar teclado
          container.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              if (video.paused) {
                video.play().catch(e => console.log('Error al reproducir vídeo:', e));
              } else {
                video.pause();
              }
            }
          });
        }
      });

      // Intersection Observer para pausar vídeos fuera de vista
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
              if (!prefersReduced) {
                video.play().catch(e => console.log('Error al reproducir vídeo:', e));
              }
            } else {
              video.pause();
            }
          });
        }, {
          threshold: 0.5
        });

        videos.forEach(video => {
          observer.observe(video);
        });
      }
    })();

    // Carrusel de formación
    (function () {
      const carousels = document.querySelectorAll('.formation__carousel');
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      carousels.forEach((carousel, carouselIndex) => {
        const track = carousel.querySelector('.formation__carousel-track');
        const prevBtn = carousel.parentElement.querySelector('.formation__arrow--prev');
        const nextBtn = carousel.parentElement.querySelector('.formation__arrow--next');
        const videoItems = carousel.querySelectorAll('.formation__video-item');

        if (!carousel || !track || !prevBtn || !nextBtn) return;

        let currentIndex = 0;
        const totalItems = videoItems.length;
        
        // Función para detectar si estamos en móvil
        function isMobile() {
          return window.innerWidth <= 768;
        }
        
        // Función para obtener el número de elementos por vista
        function getItemsPerView() {
          return isMobile() ? 1 : 3;
        }
        
        // Función para obtener el índice máximo
        function getMaxIndex() {
          const itemsPerView = getItemsPerView();
          return Math.max(0, totalItems - itemsPerView);
        }

        // Función para actualizar la posición del carrusel
        function updateCarousel() {
          const itemWidth = videoItems[0]?.offsetWidth || 280;
          const gap = isMobile() ? 16 : 24; // var(--bc-spacing-sm) en móvil, var(--bc-spacing-lg) en desktop
          const translateX = -(currentIndex * (itemWidth + gap));
          
          if (prefersReduced) {
            track.style.transform = `translateX(${translateX}px)`;
          } else {
            track.style.transform = `translateX(${translateX}px)`;
          }

          const maxIndex = getMaxIndex();
          
          // Actualizar estado de los botones
          prevBtn.disabled = currentIndex === 0;
          nextBtn.disabled = currentIndex >= maxIndex;

          // Actualizar aria-labels
          prevBtn.setAttribute('aria-label', 
            currentIndex === 0 ? 'No hay vídeos anteriores' : 'Vídeo anterior');
          nextBtn.setAttribute('aria-label', 
            currentIndex >= maxIndex ? 'No hay más vídeos' : 'Siguiente vídeo');
        }

        // Función para ir al siguiente elemento
        function nextSlide() {
          const maxIndex = getMaxIndex();
          const itemsPerView = getItemsPerView();
          
          if (currentIndex < maxIndex) {
            if (isMobile()) {
              // En móvil, avanzar de uno en uno
              currentIndex = Math.min(currentIndex + 1, maxIndex);
            } else {
              // En desktop, avanzar de tres en tres
              currentIndex = Math.min(currentIndex + itemsPerView, maxIndex);
            }
            updateCarousel();
          }
        }

        // Función para ir al elemento anterior
        function prevSlide() {
          const itemsPerView = getItemsPerView();
          
          if (currentIndex > 0) {
            if (isMobile()) {
              // En móvil, retroceder de uno en uno
              currentIndex = Math.max(currentIndex - 1, 0);
            } else {
              // En desktop, retroceder de tres en tres
              currentIndex = Math.max(currentIndex - itemsPerView, 0);
            }
            updateCarousel();
          }
        }

        // Event listeners para los botones
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);

        // Navegación por teclado
        nextBtn.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            nextSlide();
          }
        });

        prevBtn.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            prevSlide();
          }
        });

        // Manejo de vídeos desbloqueados
        const unlockedVideos = carousel.querySelectorAll('.formation__video-item--unlocked');
        unlockedVideos.forEach((item, index) => {
          const video = item.querySelector('.formation__video');
          const playOverlay = item.querySelector('.formation__play-overlay');
          
          if (!video) return;

          // Cargar vídeo diferidamente cuando esté visible
          function loadVideo() {
            const videoSrc = video.getAttribute('data-src');
            if (videoSrc && !video.src) {
              video.src = videoSrc;
              video.load();
            }
          }

          // Cargar vídeo cuando entre en vista
          const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                loadVideo();
                videoObserver.unobserve(video);
              }
            });
          }, { threshold: 0.1 });

          videoObserver.observe(video);

          // Manejar clic en el vídeo
          item.addEventListener('click', (e) => {
            // No hacer nada si se hace clic en el enlace
            if (e.target.closest('.formation__link')) return;
            
            e.preventDefault();
            // Asegurar que el vídeo esté cargado antes de reproducir
            if (!video.src) {
              loadVideo();
            }
            if (video.paused) {
              video.play().catch(err => console.log('Error al reproducir vídeo:', err));
              if (playOverlay) playOverlay.style.opacity = '0';
            } else {
              video.pause();
              if (playOverlay) playOverlay.style.opacity = '1';
            }
          });

          // Manejar teclado
          item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              // Asegurar que el vídeo esté cargado antes de reproducir
              if (!video.src) {
                loadVideo();
              }
              if (video.paused) {
                video.play().catch(err => console.log('Error al reproducir vídeo:', err));
                if (playOverlay) playOverlay.style.opacity = '0';
              } else {
                video.pause();
                if (playOverlay) playOverlay.style.opacity = '1';
              }
            }
          });

          // Manejar eventos del vídeo
          video.addEventListener('play', () => {
            if (playOverlay) playOverlay.style.opacity = '0';
          });

          video.addEventListener('pause', () => {
            if (playOverlay) playOverlay.style.opacity = '1';
          });

          // Hover para reproducir automáticamente
          item.addEventListener('mouseenter', () => {
            // Asegurar que el vídeo esté cargado antes de reproducir
            if (!video.src) {
              loadVideo();
            }
            video.play().catch(err => console.log('Error al reproducir vídeo:', err));
            if (playOverlay) playOverlay.style.opacity = '0';
          });

          // Quitar hover para pausar
          item.addEventListener('mouseleave', () => {
            video.pause();
            if (playOverlay) playOverlay.style.opacity = '1';
          });

          // Manejar errores de carga
          video.addEventListener('error', (e) => {
            console.warn(`Error al cargar vídeo de formación ${index + 1}:`, e);
            const container = video.closest('.formation__video-container');
            if (container) {
              container.style.background = 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)';
              container.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #1F418E; font-weight: 500; text-align: center; padding: 1rem;">Vídeo no disponible</div>';
            }
          });
        });

        // Manejar redimensionamiento de ventana
        let resizeTimeout;
        window.addEventListener('resize', () => {
          clearTimeout(resizeTimeout);
          resizeTimeout = setTimeout(() => {
            // Ajustar el índice actual si es necesario al cambiar de móvil a desktop o viceversa
            const maxIndex = getMaxIndex();
            if (currentIndex > maxIndex) {
              currentIndex = maxIndex;
            }
            updateCarousel();
          }, 250);
        });

        // Inicializar carrusel
        updateCarousel();

        // Intersection Observer para pausar vídeos fuera de vista
        if ('IntersectionObserver' in window) {
          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              const video = entry.target;
              if (!entry.isIntersecting) {
                video.pause();
              }
            });
          }, {
            threshold: 0.5
          });

          unlockedVideos.forEach(item => {
            const video = item.querySelector('.formation__video');
            if (video) {
              observer.observe(video);
            }
          });
        }
      });
    })();

    // Sección de datos con animaciones
    (function () {
      const dataSections = document.querySelectorAll('.data');
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      dataSections.forEach((dataSection, sectionIndex) => {
        const mainPercentage = dataSection.querySelector('.data__percentage');
        const barPercentages = dataSection.querySelectorAll('.data__bar-percentage');
        const bars = dataSection.querySelectorAll('.data__bar');

        if (!dataSection || !mainPercentage) return;

        let hasAnimated = false;

        // Función para animar contador
        function animateCounter(element, target, duration = 2000) {
          const start = 0;
          const increment = target / (duration / 16);
          let current = start;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            element.textContent = Math.floor(current) + '%';
          }, 16);
        }

        // Función para animar barras
        function animateBars() {
          bars.forEach((bar, index) => {
            const height = bar.getAttribute('data-height');
            const percentageElement = bar.querySelector('.data__bar-percentage');
            
            // Solo animar si tiene data-height (barras verticales)
            if (!height || !percentageElement) return;
            
            const targetPercentage = parseInt(percentageElement.getAttribute('data-target'));

            // Establecer altura inicial
            bar.style.height = '0px';
            
            // Animar altura
            setTimeout(() => {
              bar.style.height = height + 'px';
              
              // Animar contador de la barra
              if (!prefersReduced) {
                setTimeout(() => {
                  animateCounter(percentageElement, targetPercentage, 1500);
                }, 300);
              } else {
                percentageElement.textContent = targetPercentage + '%';
              }
            }, index * 200);
          });
        }

        // Función para animar porcentaje principal
        function animateMainPercentage() {
          const targetPercentage = parseInt(mainPercentage.getAttribute('data-target'));
          
          if (!prefersReduced) {
            animateCounter(mainPercentage, targetPercentage, 2000);
          } else {
            mainPercentage.textContent = targetPercentage + '%';
          }
        }

        // Intersection Observer para activar animaciones
        if ('IntersectionObserver' in window) {
          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                
                // Animar porcentaje principal
                setTimeout(() => {
                  animateMainPercentage();
                }, 500);
                
                // Animar barras (solo si existen barras con data-height)
                if (bars.length > 0 && bars[0].getAttribute('data-height')) {
                  setTimeout(() => {
                    animateBars();
                  }, 1000);
                }
              }
            });
          }, {
            threshold: 0.3
          });

          observer.observe(dataSection);
        } else {
          // Fallback para navegadores sin IntersectionObserver
          animateMainPercentage();
          if (bars.length > 0 && bars[0].getAttribute('data-height')) {
            animateBars();
          }
        }

        // Reiniciar animaciones al redimensionar (opcional)
        let resizeTimeout;
        window.addEventListener('resize', () => {
          clearTimeout(resizeTimeout);
          resizeTimeout = setTimeout(() => {
            if (hasAnimated) {
              // Reiniciar animaciones si es necesario
              bars.forEach(bar => {
                const height = bar.getAttribute('data-height');
                bar.style.height = height + 'px';
              });
            }
          }, 250);
        });
      });
    })();
