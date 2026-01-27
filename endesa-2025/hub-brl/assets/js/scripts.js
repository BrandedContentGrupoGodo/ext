// Scroll suave al hacer clic en enlaces de anclaje
document.addEventListener('DOMContentLoaded', function() {
  // Manejar clic en el botón "Explorar historias"
  const exploreButton = document.querySelector('a[href="#cap1"]');
  if (exploreButton) {
    exploreButton.addEventListener('click', function(e) {
      e.preventDefault();
      const targetElement = document.getElementById('cap1');
      if (targetElement) {
        // Calcular la posición del elemento
        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offset = window.innerWidth <= 600 ? 0 : 100; // Offset diferente para mobile y desktop
        
        // Scroll suave
        window.scrollTo({
          top: elementPosition - offset,
          behavior: 'smooth'
        });
      }
    });
  }

  // Manejar todos los enlaces de anclaje para scroll suave
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.length > 1) {
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          e.preventDefault();
          const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
          const offset = window.innerWidth <= 600 ? 0 : 100;
          
          window.scrollTo({
            top: elementPosition - offset,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Efecto Parallax moderno para las cajas de capítulos
  const sections = document.querySelectorAll('.hub-section');
  let ticking = false;

  function updateParallax() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    
    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top + scrollY;
      const sectionCenter = sectionTop + rect.height / 2;
      
      // Calcular distancia desde el centro de la ventana
      const distanceFromCenter = scrollY + windowHeight / 2 - sectionCenter;
      const distancePercent = distanceFromCenter / windowHeight;
      
      // Parallax vertical sutil
      const parallaxY = distancePercent * 30; // Ajusta la intensidad
      
      // Rotación sutil basada en la posición
      const rotation = distancePercent * 2;
      
      // Escala basada en la proximidad al centro
      const scale = 1 - Math.abs(distancePercent) * 0.1;
      const clampedScale = Math.max(0.95, Math.min(1.05, scale));
      
      // Opacity basada en la visibilidad
      const opacity = Math.max(0.3, Math.min(1, 1 - Math.abs(distancePercent) * 0.5));
      
      // Aplicar transformaciones con diferentes intensidades por capítulo
      const intensity = [0.8, 1.0, 0.9, 1.1, 0.85, 1.0][index] || 1;
      const parallaxIntensity = parallaxY * intensity;
      const rotationIntensity = rotation * intensity * 0.5;
      
      section.style.transform = `
        translateY(${parallaxIntensity}px) 
        rotateZ(${rotationIntensity}deg) 
        scale(${clampedScale})
        perspective(1000px)
      `;
      section.style.opacity = opacity;
    });
    
    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  // Verificar preferencias de movimiento reducido
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Solo aplicar parallax en desktop y si no hay preferencia de movimiento reducido
  if (window.innerWidth > 600 && !prefersReducedMotion) {
    window.addEventListener('scroll', requestTick, { passive: true });
    window.addEventListener('resize', requestTick, { passive: true });
    // Inicializar
    updateParallax();
  } else {
    // En mobile o con movimiento reducido, solo mostrar las cajas sin parallax
    sections.forEach(section => {
      section.style.opacity = '1';
      section.style.transform = 'none';
    });
  }
});
