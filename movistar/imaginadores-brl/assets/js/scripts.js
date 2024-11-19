// Inicializa el código cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", () => {
    // Referencia al menú sticky
    const stickyMenu = document.querySelector(".sticky-menu-mov");
    if (!stickyMenu) {
        console.error("El menú sticky no está presente en el DOM.");
        return;
    }

    // Calcula la altura inicial para posicionar el sticky
    const stickyOffset = stickyMenu.offsetTop;

    // Guardar referencia al contenedor padre (si aplica)
    const parentContainer = stickyMenu.parentElement;

    // Calcular ancho inicial del menú
    const calculateMenuWidth = () => {
        if (parentContainer) {
            const containerWidth = parentContainer.offsetWidth;
            stickyMenu.style.width = `${containerWidth}px`;
        } else {
            stickyMenu.style.width = "100%"; // Fallback si no hay contenedor padre
        }
    };

    // Aplicar estilos al menú
    const applyStickyStyles = () => {
        stickyMenu.style.position = "fixed";
        stickyMenu.style.top = "40px"; // Altura fija desde el header
        stickyMenu.style.left = "50%"; // Centrado horizontal
        stickyMenu.style.transform = "translateX(-50%)"; // Ajusta para centrar
        stickyMenu.style.zIndex = "1000";
        stickyMenu.style.backgroundColor = "var(--menu-bg-color)"; // Usa la variable definida en tu CSS
        stickyMenu.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.1)"; // Añade una sombra sutil
    };

    // Comportamiento del menú sticky
    window.addEventListener("scroll", () => {
        if (window.scrollY > stickyOffset) {
            applyStickyStyles();
        } else {
            stickyMenu.style.position = "relative";
            stickyMenu.style.top = "unset";
            stickyMenu.style.left = "unset";
            stickyMenu.style.transform = "unset";
            stickyMenu.style.boxShadow = "none";
            calculateMenuWidth(); // Recalcula el ancho
        }
    });

    // Ajuste del ancho inicial
    calculateMenuWidth();

    // Recalcular ancho al redimensionar la ventana
    window.addEventListener("resize", calculateMenuWidth);

    // Smooth scroll para enlaces del menú
    document.querySelectorAll(".sticky-menu-mov a").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetSection = document.querySelector(this.getAttribute("href"));
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: "smooth" });
            } else {
                console.error("Sección objetivo no encontrada:", this.getAttribute("href"));
            }
        });
    });

    // IntersectionObserver para detectar capítulos en el viewport
    const chapters = document.querySelectorAll(".chapter-section");
    const menuLinks = document.querySelectorAll(".sticky-menu-mov a");

    const observerOptions = {
        threshold: 0.3 // 30% visible para activar la animación
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(chapters).indexOf(entry.target);
                menuLinks.forEach(link => link.classList.remove("active-menu-item"));
                menuLinks[index]?.classList.add("active-menu-item");

                gsap.fromTo(entry.target,
                    { opacity: 0, scale: 0.95 },
                    { opacity: 1, scale: 1, duration: 1, ease: "power3.out" }
                );
            }
        });
    }, observerOptions);

    chapters.forEach(chapter => observer.observe(chapter));
});

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

// Animaciones con GSAP
document.addEventListener("DOMContentLoaded", () => {
    gsap.timeline()
        .from(".intro-subtitle", { duration: 1, opacity: 0, y: 20 })
        .from(".intro-logo", { duration: 1, opacity: 0, y: 20 }, "-=0.8")
        .from(".intro-description", { duration: 1, opacity: 0, y: 20 }, "-=0.8");
});

// Botones 'Ver más'
document.querySelectorAll('.view-more').forEach(button => {
    button.addEventListener('click', () => {
        const url = button.getAttribute('data-url');
        window.open(url, '_blank');
    });
});

