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

    // Función para calcular y ajustar el ancho y posición del menú
    const adjustMenuStyles = () => {
        if (parentContainer) {
            const containerWidth = parentContainer.offsetWidth;
            stickyMenu.style.width = `${containerWidth}px`;
        } else {
            stickyMenu.style.width = "100%"; // Fallback si no hay contenedor padre
        }
        stickyMenu.style.left = "50%"; // Centrado horizontal
        stickyMenu.style.transform = "translateX(-50%)"; // Ajuste para centrar
    };

    // Aplicar estilos al menú en modo sticky
    const applyStickyStyles = () => {
        stickyMenu.style.position = "fixed";
        stickyMenu.style.top = "50px"; // Altura fija desde el header
        stickyMenu.style.zIndex = "1000";
        stickyMenu.style.backgroundColor = "var(--menu-bg-color)";
        stickyMenu.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.1)";
    };

    // Comportamiento del menú sticky
    const onScroll = () => {
        if (window.scrollY > stickyOffset) {
            applyStickyStyles();
        } else {
            stickyMenu.style.position = "relative";
            stickyMenu.style.top = "unset";
            stickyMenu.style.left = "unset";
            stickyMenu.style.transform = "unset";
            stickyMenu.style.boxShadow = "none";
            adjustMenuStyles(); // Recalcular ancho y posición
        }
    };

    // Ajustar estilos al cargar la página
    const initializeMenu = () => {
        adjustMenuStyles(); // Asegura que el menú esté centrado desde el inicio
        onScroll(); // Aplica los estilos iniciales basados en la posición de scroll
    };

    // Configurar eventos
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", adjustMenuStyles);
    window.addEventListener("load", initializeMenu);

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
