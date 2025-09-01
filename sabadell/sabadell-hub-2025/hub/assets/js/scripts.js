// ================================
// Lightbox simple adaptado
// ================================
document.addEventListener('DOMContentLoaded', () => {
  const imgs = document.querySelectorAll('.galeria img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox.querySelector('img');
  const cerrar = document.getElementById('cerrar');

  imgs.forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;

      // Mostrar con animación GSAP
      lightbox.style.display = 'flex';
      gsap.fromTo(lightboxImg, 
        { opacity: 0, scale: 0.8 }, 
        { opacity: 1, scale: 1, duration: 0.3 }
      );
    });
  });

  // Cerrar al hacer clic en la X
  cerrar.addEventListener('click', () => {
    gsap.to(lightboxImg, { opacity: 0, scale: 0.8, duration: 0.2, onComplete: () => {
      lightbox.style.display = 'none';
      lightboxImg.src = '';
      lightboxImg.alt = '';
    }});
  });

  // Cerrar al hacer clic fuera de la imagen
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) {
      gsap.to(lightboxImg, { opacity: 0, scale: 0.8, duration: 0.2, onComplete: () => {
        lightbox.style.display = 'none';
        lightboxImg.src = '';
        lightboxImg.alt = '';
      }});
    }
  });

  // Cerrar con tecla ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && lightbox.style.display === 'flex') {
      gsap.to(lightboxImg, { opacity: 0, scale: 0.8, duration: 0.2, onComplete: () => {
        lightbox.style.display = 'none';
        lightboxImg.src = '';
        lightboxImg.alt = '';
      }});
    }
  });
});

// Seleccionamos los capítulos y los enlaces del nav
const capitulos = document.querySelectorAll('.capitulo');
const enlacesNav = document.querySelectorAll('.nav-sabadell a:not(.bloqueado)');

// Función para quitar la clase activa de todos los enlaces
function resetActive() {
  enlacesNav.forEach(link => link.classList.remove('activo'));
}

// Intersection Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      resetActive();
      const link = document.querySelector(`.nav-sabadell a[href="#${id}"]`);
      if(link) link.classList.add('activo');
    }
  });
}, { 
  threshold: 0.5 // cuando el capítulo esté al 50% en la pantalla
});

// Observamos cada capítulo
capitulos.forEach(cap => observer.observe(cap));

// 🚀 Scroll suave al hacer clic en los enlaces
enlacesNav.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const destino = document.querySelector(link.getAttribute('href'));
    if (destino) {
      destino.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
