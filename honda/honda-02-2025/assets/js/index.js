document.addEventListener("DOMContentLoaded", function () {
    const dots = document.querySelectorAll(".dot");
    const infoBox = document.getElementById("info-box");
    const infoText = document.getElementById("info-text");

    if (!dots.length) {
        console.error("No se encontraron puntos con la clase .dot");
        return;
    }

    // Animación de latido en los puntos
    gsap.fromTo(dots, { scale: 1 }, { scale: 1.2, repeat: -1, yoyo: true, duration: 1, ease: "power1.inOut" });

    dots.forEach(dot => {
        dot.addEventListener("click", function (event) {
            event.stopPropagation();

            const text = this.getAttribute("data-info");
            infoText.textContent = text;

            const rect = this.getBoundingClientRect();
            const containerRect = document.querySelector(".image-container").getBoundingClientRect();

            infoBox.style.left = `${rect.left - containerRect.left + 20}px`;
            infoBox.style.top = `${rect.top - containerRect.top - 10}px`;

            gsap.fromTo(this, { scale: 1.4 }, { scale: 1, duration: 0.3, ease: "elastic.out(1, 0.5)" });

            infoBox.style.display = "block";
            gsap.to(infoBox, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.7)" });
        });
    });

    // Ocultar la caja de información al hacer clic fuera
    document.addEventListener("click", function (event) {
        if (!infoBox.contains(event.target)) {
            gsap.to(infoBox, { 
                opacity: 0, 
                scale: 0.8, 
                duration: 0.3, 
                ease: "power1.inOut", 
                onComplete: () => {
                    infoBox.style.display = "none";
                }
            });
        }
    });
});