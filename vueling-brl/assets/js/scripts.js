document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.pilot-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('.pilot-image').style.transform = 'scale(1.05)';
        });

        card.addEventListener('mouseleave', () => {
            card.querySelector('.pilot-image').style.transform = 'scale(1)';
        });
    });

    document.addEventListener('scroll', () => {
        const containers = document.querySelectorAll('.circle-container');
        const windowHeight = window.innerHeight;
    
        containers.forEach(container => {
            const image = container.querySelector('.scroll-image');
            const containerRect = container.getBoundingClientRect();
            const containerHeight = container.clientHeight;
    
            // Condiciones para verificar si el contenedor está visible en la pantalla
            if (containerRect.top < windowHeight && containerRect.bottom > 0) {
                const maxScroll = containerHeight - 60; // Ajusta según la altura y espacio entre círculos
                const percentage = (windowHeight - containerRect.top) / (windowHeight + containerHeight);
                const moveY = Math.max(0, Math.min(percentage * maxScroll, maxScroll));
                
                // Mueve la imagen hacia abajo
                image.style.transform = `translateY(${moveY}px)`;
            } else {
                // Si se deja de visualizar, la imagen vuelve a su posición original
                image.style.transform = `translateY(0)`;
            }
        });
    });
    
    
    
    
});
