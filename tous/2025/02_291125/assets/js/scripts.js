 // Inicializamos Lenis
  const lenis = new Lenis({
    duration: 0.8,               // Más estable que 0.6
    easing: t => t*(2-t),        // EaseOutQuad
    smooth: true,                
    direction: 'vertical',
    gestureDirection: 'vertical',
    mouseMultiplier: 1.2,        // No demasiado rápido, evita saltos
    smoothTouch: true,
    infinite: false
  });

  // Método para que Lenis se ejecute en cada frame
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  // Opcional: Escuchar evento de scroll
  lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }) => {
    // console.log(scroll, limit, velocity, direction, progress);
  });

  // Sección interactiva con palabras
  document.addEventListener('DOMContentLoaded', function() {
    const wordsSection = document.querySelector('.interactive-words-section');
    if (!wordsSection) return;

    const dataScript = document.getElementById('interactive-words-data');
    if (!dataScript) return;

    const wordsData = JSON.parse(dataScript.textContent);
    const wordItems = document.querySelectorAll('.interactive-word-item');
    const titleElement = document.querySelector('.interactive-words-title');
    const descriptionElement = document.querySelector('.interactive-words-description');
    const imageElement = document.querySelector('.interactive-image');

    function updateContent(index) {
      const data = wordsData[index];
      if (!data) return;

      // Actualizar título y descripción con fade
      titleElement.style.opacity = '0';
      descriptionElement.style.opacity = '0';
      
      setTimeout(() => {
        titleElement.textContent = data.title;
        descriptionElement.textContent = data.description;
        titleElement.style.opacity = '1';
        descriptionElement.style.opacity = '1';
      }, 200);

      // Actualizar imagen
      imageElement.classList.remove('active');
      setTimeout(() => {
        imageElement.src = data.image;
        imageElement.alt = data.title;
        imageElement.classList.add('active');
      }, 200);

      // Actualizar estados activos
      wordItems.forEach((item, i) => {
        if (i === parseInt(index)) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    }

    // Añadir event listeners
    wordItems.forEach((item) => {
      item.addEventListener('click', function() {
        const index = this.getAttribute('data-index');
        updateContent(index);
      });
    });

    // Inicializar con la primera palabra
    updateContent(0);
  });