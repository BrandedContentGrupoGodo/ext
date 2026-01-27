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
});
