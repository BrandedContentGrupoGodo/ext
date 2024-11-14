// Animación inicial en la sección introductoria
document.addEventListener("DOMContentLoaded", () => {
    gsap.timeline()
        .from(".intro-subtitle", { duration: 1.2, opacity: 0, y: 20, ease: "power2.out" })
        .from(".intro-logo", { duration: 1.2, opacity: 0, y: 20, ease: "power2.out" }, "-=0.8")
        .from(".intro-description", { duration: 1.2, opacity: 0, y: 20, ease: "power2.out" }, "-=0.8");
});

// Smooth scroll para el menú sticky sin GSAP
document.querySelectorAll(".sticky-menu a").forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        const targetSection = document.querySelector(this.getAttribute("href"));
        targetSection.scrollIntoView({ behavior: "smooth" });
    });
});

// Función para activar el enlace en el menú
function setActiveMenuItem(activeAnchor) {
    document.querySelectorAll(".sticky-menu a").forEach(anchor => {
        anchor.classList.remove("active-menu-item");
    });
    activeAnchor.classList.add("active-menu-item");
}

// IntersectionObserver para detectar capítulos en el viewport y animarlos
const chapters = document.querySelectorAll(".chapter-section");
const menuLinks = document.querySelectorAll(".sticky-menu a");

const observerOptions = {
    threshold: 0.3 // 30% visible para activar la animación
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const index = Array.from(chapters).indexOf(entry.target);
            setActiveMenuItem(menuLinks[index]);
            
            gsap.fromTo(entry.target, 
                { opacity: 0, scale: 0.95 }, 
                { opacity: 1, scale: 1, duration: 1, ease: "power3.out" }
            );
        }
    });
}, observerOptions);

chapters.forEach(chapter => observer.observe(chapter));

// Carrusel de imágenes en cada capítulo con swipe para mobile
document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.chapter-carousel');

    carousels.forEach(carousel => {
        const images = carousel.querySelectorAll('.carousel img');
        const dots = carousel.querySelectorAll('.dot');
        let currentIndex = 0;
        let startX = 0;
        let endX = 0;

        function showSlide(index) {
            images.forEach((img, i) => img.style.display = i === index ? 'block' : 'none');
            dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
        }

        showSlide(currentIndex);

        setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            showSlide(currentIndex);
        }, 5000);

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                showSlide(currentIndex);
            });
        });

        // Eventos para el swipe en dispositivos móviles
        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        carousel.addEventListener('touchmove', (e) => {
            endX = e.touches[0].clientX;
        });

        carousel.addEventListener('touchend', () => {
            if (startX - endX > 50) {
                // Deslizar a la izquierda, mostrar la siguiente imagen
                currentIndex = (currentIndex + 1) % images.length;
            } else if (endX - startX > 50) {
                // Deslizar a la derecha, mostrar la imagen anterior
                currentIndex = (currentIndex - 1 + images.length) % images.length;
            }
            showSlide(currentIndex);
        });
    });
});

// Botones 'Ver más'
document.querySelectorAll('.view-more').forEach(button => {
    button.addEventListener('click', () => {
        const url = button.getAttribute('data-url');
        window.open(url, '_blank');
    });
});
