// Animaciones con GSAP
document.addEventListener("DOMContentLoaded", () => {
    gsap.timeline()
        .from(".intro-subtitle", { duration: 1, opacity: 0, y: 20 })
        .from(".intro-logo", { duration: 1, opacity: 0, y: 20 }, "-=0.8")
        .from(".intro-description", { duration: 1, opacity: 0, y: 20 }, "-=0.8");
});

// Smooth scroll para el menú sticky
document.querySelectorAll(".sticky-menu a").forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        const targetSection = document.querySelector(this.getAttribute("href"));
        targetSection.scrollIntoView({
            behavior: "smooth"
        });
    });
});

// Función para activar el enlace en el menú
function setActiveMenuItem(activeAnchor) {
    document.querySelectorAll(".sticky-menu a").forEach(anchor => {
        anchor.classList.remove("active-menu-item"); // Clase que da color azul al menú activo
    });
    activeAnchor.classList.add("active-menu-item");
}

// Configuración del IntersectionObserver para detectar el capítulo visible
const chapters = document.querySelectorAll(".chapter-section");
const menuLinks = document.querySelectorAll(".sticky-menu a");

const observerOptions = {
    root: null,           // Usa el viewport completo como área de observación
    rootMargin: "10px",    // Sin margen adicional
    threshold: 0.2        // 20% del capítulo visible para activarse
};

// Usamos el IntersectionObserver para detectar cuando una sección está activa
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Identificar el índice de la sección visible
            const index = Array.from(chapters).indexOf(entry.target);
            setActiveMenuItem(menuLinks[index]);
        }
    });
}, observerOptions);

// Observa cada capítulo para detectar cuando esté en el viewport
chapters.forEach(chapter => observer.observe(chapter));

// Carrusel de imágenes en cada capítulo
document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.chapter-carousel');

    carousels.forEach(carousel => {
        const images = carousel.querySelectorAll('.carousel img');
        const dots = carousel.querySelectorAll('.dot');
        let currentIndex = 0;

        // Función para mostrar la diapositiva actual
        function showSlide(index) {
            images.forEach((img, i) => {
                img.style.display = i === index ? 'block' : 'none';
            });
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }

        // Mostrar la diapositiva inicial
        showSlide(currentIndex);

        // Cambiar las diapositivas automáticamente cada 5 segundos
        setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length; // Avanza al siguiente índice
            showSlide(currentIndex);
        }, 5000); // 5000 milisegundos = 5 segundos

        // Paginadores para que también se pueda hacer clic en ellos
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                showSlide(currentIndex);
            });
        });
    });
});

// Botones 'Ver más'
document.querySelectorAll('.view-more').forEach(button => {
    button.addEventListener('click', () => {
        const url = button.getAttribute('data-url');
        window.open(url, '_blank'); // Abre la URL en una nueva pestaña
    });
});
