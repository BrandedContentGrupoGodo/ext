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
        nombre: "Álvaro",
        frase: "El coraje también se entrena.",
        descripcion: "Un salto de fe, seis miradas que lo impulsan.",
        imagen: "https://brandedcontentgrupogodo.github.io/ext/caixabank-2025/01_09-07-25/assets/img/cap1.png",
        enlace: "historia-alvaro.html"
      },
      {
        nombre: "Clara",
        frase: "Donde otros ven límites, ella respira profundo.",
        descripcion: "Su red: un entrenador, un padre, una voz interior y mucho agua.",
        imagen: "https://brandedcontentgrupogodo.github.io/ext/caixabank-2025/01_09-07-25/assets/img/cap2.png",
        enlace: "historia-clara.html"
      },
      {
        nombre: "Nico",
        frase: "No escuchas su zancada. Pero vibra en cada meta.",
        descripcion: "Un corredor sordo que despierta respeto en quienes lo ven volar.",
        imagen: "https://brandedcontentgrupogodo.github.io/ext/caixabank-2025/01_09-07-25/assets/img/cap3.png",
        enlace: "historia-nico.html"
      },
      {
        nombre: "Luna",
        frase: "Bailar es desafiar la gravedad con belleza.",
        descripcion: "Una historia que inspira incluso a quienes no la conocen.",
        imagen: "https://brandedcontentgrupogodo.github.io/ext/caixabank-2025/01_09-07-25/assets/img/cap4.png",
        enlace: "historia-luna.html"
      },
      {
        nombre: "Erik",
        frase: "Donde termina la vista, comienza el instinto.",
        descripcion: "Un judoka ciego, una red que lo guía y un rival que lo admira.",
        imagen: "https://brandedcontentgrupogodo.github.io/ext/caixabank-2025/01_09-07-25/assets/img/cap5.png",
        enlace: "historia-erik.html"
      },
      {
        nombre: "Valentina",
        frase: "El músculo más fuerte no se entrena: es el alma.",
        descripcion: "Una historia de fuerza, sororidad y perseverancia sobre ruedas.",
        imagen: "https://brandedcontentgrupogodo.github.io/ext/caixabank-2025/01_09-07-25/assets/img/cap6.png",
        enlace: "historia-valentina.html"
      }
    ];

const container = document.getElementById('constelacion');

  historias.forEach(({ nombre, frase, descripcion, imagen, enlace }, i) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${imagen}" alt="Retrato de ${nombre}, atleta paralímpico">
      <div class="card-content">
        <h2>${nombre}</h2>
        <p><em>“${frase}”</em></p>
        <p>${descripcion}</p>
        <a href="${enlace}" target="_blank" rel="noopener">Ver historia →</a>
      </div>
    `;
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
