// Inicializar Lenis solo cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  const lenis = new Lenis({ 
    smooth: true,
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smoothTouch: false,
    touchMultiplier: 2,
  });
  
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
});

// ============== IMAGEN INTERACTIVA ============== 

// Contenido para cada punto
const pointsData = {
  1: { title: "Granja" },
  2: { title: "Distribución logística" },
  3: { title: "Fabricante de envases" },
  4: { title: "Danone" }
};

// Inicializar funcionalidad interactiva cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  // Seleccionar elementos
  const hotspots = document.querySelectorAll('.hotspot');
  const infoPanel = document.getElementById('infoPanel');
  const infoContent = document.getElementById('infoContent');
  const closePanel = document.getElementById('closePanel');

// Función para abrir el panel con información
function openInfoPanel(pointNumber, hotspotElement) {
  const data = pointsData[pointNumber];
  if (data) {
    infoContent.innerHTML = `
      <h3>${data.title}</h3>
    `;
    
    // Obtener la posición del hotspot
    const rect = hotspotElement.getBoundingClientRect();
    const imageContainer = document.querySelector('.image-container');
    const containerRect = imageContainer.getBoundingClientRect();
    
    // Calcular posición relativa al contenedor de la imagen
    const relativeTop = rect.top - containerRect.top;
    const relativeLeft = rect.left - containerRect.left;
    
    // Posicionar el panel cerca del punto
    // Ajustar según sea necesario para que no se salga de la imagen
    let topPosition = relativeTop + rect.height / 2;
    let leftPosition = relativeLeft + rect.width + 20; // 20px de separación
    
    // Si el panel se sale por la derecha, colocarlo a la izquierda del punto
    if (leftPosition + 300 > containerRect.width) {
      leftPosition = relativeLeft - 320; // ancho del panel + separación
    }
    
    // Aplicar posición
    infoPanel.style.top = `${topPosition}px`;
    infoPanel.style.left = `${leftPosition}px`;
    infoPanel.style.transform = 'translateY(-50%) scale(0.8)';
    
    infoPanel.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevenir scroll mientras está abierto
  }
}

// Función para cerrar el panel
function closeInfoPanel() {
  infoPanel.classList.remove('active');
  document.body.style.overflow = ''; // Restaurar scroll
}

// Event listeners para los hotspots
hotspots.forEach(hotspot => {
  hotspot.addEventListener('click', function(e) {
    e.stopPropagation(); // Evitar que el clic se propague
    
    // Si el panel ya está abierto, cerrarlo
    if (infoPanel.classList.contains('active')) {
      closeInfoPanel();
    } else {
      // Si está cerrado, abrirlo
      const pointNumber = this.getAttribute('data-point');
      openInfoPanel(pointNumber, this);
    }
  });
});

// Event listener para el botón de cerrar
closePanel.addEventListener('click', closeInfoPanel);

// Cerrar al hacer clic fuera del contenido del panel
document.addEventListener('click', function(e) {
  if (infoPanel.classList.contains('active')) {
    const infoContent = document.querySelector('.info-content');
    const closeBtn = document.querySelector('.info-close');
    
    // Si el clic no fue dentro del contenido ni en el botón de cerrar
    if (!infoContent.contains(e.target) && !closeBtn.contains(e.target)) {
      closeInfoPanel();
    }
  }
});

// Cerrar con la tecla Escape
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && infoPanel.classList.contains('active')) {
    closeInfoPanel();
  }
});

  // Cerrar al hacer scroll
  window.addEventListener('scroll', function() {
    if (infoPanel.classList.contains('active')) {
      closeInfoPanel();
    }
  });
});
