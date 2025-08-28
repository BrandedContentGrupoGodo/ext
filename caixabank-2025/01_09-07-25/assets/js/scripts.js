// Fondo de estrellas
const canvas = document.getElementById('stars-bg');
const ctx = canvas.getContext('2d');
let width, height, stars = [];

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

function createStars() {
  stars = Array.from({ length: 100 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    r: Math.random() * 1.2,
    dx: (Math.random() - 0.5) * 0.2,
    dy: (Math.random() - 0.5) * 0.2
  }));
}

function drawStars() {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = 'white';
  ctx.shadowBlur = 6;
  ctx.shadowColor = 'white';
  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI);
    ctx.fill();
    star.x += star.dx;
    star.y += star.dy;

    if (star.x < 0 || star.x > width) star.dx *= -1;
    if (star.y < 0 || star.y > height) star.dy *= -1;
  });
  requestAnimationFrame(drawStars);
}

window.addEventListener('resize', () => {
  resizeCanvas();
  createStars();
});

resizeCanvas();
createStars();
drawStars();

// Historias
const historias = [
  {
    nombre: "Elena",
    frase: "Los valores están por encima de cualquier podio",
    imagen: "https://brandedcontentgrupogodo.github.io/ext/caixabank-2025/01_09-07-25/assets/img/cap1.png",
    enlace: "https://www.lavanguardia.com/deportes/20250909/11009017/elena-congost-atleta-perdio-medalla-guia-constelaciones-streaming-brl.html"
  },
  {
    nombre: "Clara",
    frase: "Donde otros ven límites, ella respira profundo.",
    imagen: "https://brandedcontentgrupogodo.github.io/ext/caixabank-2025/01_09-07-25/assets/img/locked.png"
  },
  {
    nombre: "Nico",
    frase: "No escuchas su zancada. Pero vibra en cada meta.",
    imagen: "https://brandedcontentgrupogodo.github.io/ext/caixabank-2025/01_09-07-25/assets/img/locked.png"
  },
  {
    nombre: "Luna",
    frase: "Bailar es desafiar la gravedad con belleza.",
    imagen: "https://brandedcontentgrupogodo.github.io/ext/caixabank-2025/01_09-07-25/assets/img/locked.png"
  },
  {
    nombre: "Erik",
    frase: "Donde termina la vista, comienza el instinto.",
    imagen: "https://brandedcontentgrupogodo.github.io/ext/caixabank-2025/01_09-07-25/assets/img/locked.png"
  },
  {
    nombre: "Valentina",
    frase: "El músculo más fuerte no se entrena: es el alma.",
    imagen: "https://brandedcontentgrupogodo.github.io/ext/caixabank-2025/01_09-07-25/assets/img/locked.png"
  }
];

const container = document.getElementById('constelacion');

historias.forEach(({ nombre, frase, imagen, enlace }, i) => {
  const card = document.createElement('div');
  card.className = 'card';

  if (i === 0) {
    // Primera historia desbloqueada
    card.innerHTML = `
      <img src="${imagen}" alt="Retrato de ${nombre}, atleta paralímpico">
      <div class="card-content">
        <h2>${nombre}</h2>
        <p><em>“${frase}”</em></p>
        <a href="${enlace}" target="_blank" rel="noopener" class="btn">Ver historia →</a>
      </div>
    `;
  } else {
    // Historias bloqueadas
    card.classList.add("locked");
    card.innerHTML = `
      <img src="${imagen}" alt="Historia bloqueada">
      <div class="card-content">
        <p class="soon-text">Disponible próximamente</p>
      </div>
    `;
  }

  container.appendChild(card);

  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: 'top 90%'
    },
    opacity: 0,
    y: 40,
    duration: 0.8,
    ease: 'power2.out',
    delay: i * 0.05
  });
});

