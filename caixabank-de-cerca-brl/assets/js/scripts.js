document.addEventListener("DOMContentLoaded", () => {
    // Hover effect for intro image
    const introImage = document.querySelector(".intro-image");
    
    if (introImage) {
        introImage.addEventListener("mouseover", () => {
            introImage.style.transform = "scale(1.05)";
        });

        introImage.addEventListener("mouseout", () => {
            introImage.style.transform = "scale(1)";
        });
    }

    // Smooth scroll for custom buttons
    document.querySelectorAll('.custom-button').forEach(button => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            const targetId = button.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Variables del contador y secciones
    const sections = document.querySelectorAll("section.mercedes-section");
    const counter = document.createElement("div");
    counter.id = "counter";
    counter.textContent = "24";
    counter.style.display = "none"; // Oculto inicialmente
    document.body.appendChild(counter);

    // Función para calcular el nuevo valor del contador basado en el scroll
    function calculateCounterValue(section, scrollPosition) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition <= sectionTop + sectionHeight) {
            const percentageScrolled = (scrollPosition - sectionTop) / sectionHeight;
            const newValue = Math.max(0, 24 - Math.floor(percentageScrolled * 24));
            return newValue;
        }

        return null;
    }

    // Función para actualizar el contador
    function updateCounter() {
        const scrollPosition = window.scrollY;
        let visible = false;

        sections.forEach((section) => {
            const newValue = calculateCounterValue(section, scrollPosition);
            if (newValue !== null) {
                counter.textContent = newValue;
                counter.style.display = "block"; // Mostrar el contador
                visible = true;
            }
        });

        // Ocultar el contador si ninguna sección está visible
        if (!visible) {
            counter.style.display = "none";
        }
    }

    // Mostrar el contador cuando la primera sección se hace visible
    function handleInitialVisibility() {
        const firstSection = document.querySelector("#section1");
        const rect = firstSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            counter.style.display = "block";
            window.removeEventListener("scroll", handleInitialVisibility);
        }
    }

    // Escuchar el evento de scroll para actualizar el contador y mostrarlo al inicio
    window.addEventListener("scroll", updateCounter);
    window.addEventListener("scroll", handleInitialVisibility);
});
