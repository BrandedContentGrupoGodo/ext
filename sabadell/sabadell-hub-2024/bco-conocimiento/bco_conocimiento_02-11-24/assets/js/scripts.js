// Smooth Scroll on Button Click
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        const target = this.getAttribute('href');
        window.location.href = target;
    });
});





