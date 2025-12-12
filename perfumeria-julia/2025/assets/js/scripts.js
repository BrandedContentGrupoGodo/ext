// Prevenir FOUC y activar animaciones
(function() {
    'use strict';
    
    // Remover clase no-js del html
    document.documentElement.classList.remove('no-js');
    
    // Añadir clase loaded cuando el DOM esté listo
    function addLoadedClass() {
        const bodyMoeve = document.querySelector('.body-moeve');
        if (bodyMoeve) {
            bodyMoeve.classList.add('loaded');
        }
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addLoadedClass);
    } else {
        addLoadedClass();
    }
    
    // Intersection Observer para animar secciones cuando entren en viewport
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -30px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Para elementos internos, añadir clase a la sección padre también
                if (entry.target.classList.contains('content-split__text') || 
                    entry.target.classList.contains('content-split__image')) {
                    const parent = entry.target.closest('.content-split');
                    if (parent) parent.classList.add('is-visible');
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar secciones principales
    const animatedSections = document.querySelectorAll(
        '.content-split, .text-content, .quote-highlight, .image-content-section'
    );
    
    animatedSections.forEach(function(section) {
        observer.observe(section);
    });
    
    // Observar elementos internos para stagger animations
    const textElements = document.querySelectorAll('.content-split__text, .content-split__image');
    textElements.forEach(function(element) {
        observer.observe(element);
    });
})();
