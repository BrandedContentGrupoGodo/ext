console.clear();

gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
    const isMobile = window.innerWidth <= 768;

    if (!isMobile) {
        gsap.timeline({
            scrollTrigger: {
                trigger: ".wrapper",
                start: "top top",
                end: "+=150%",
                pin: true,
                scrub: true,
                markers: false // Puedes eliminar los marcadores después de las pruebas
            }
        })
        .to(".image-container img", {
            scale: 2,
            z: 350,
            transformOrigin: "center center",
            ease: "power1.inOut"
        });
    }
});
