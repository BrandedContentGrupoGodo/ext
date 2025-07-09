// Fondo animado inspirado en Codepen de gvrban
    const canvas = document.getElementById('bg');
    const ctx = canvas.getContext('2d');
    let width, height;
    let stars = [];
    function initCanvas() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      stars = Array.from({ length: 120 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.2,
        d: Math.random() * 100
      }));
    }
    function drawStars() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'white';
      ctx.shadowBlur = 4;
      ctx.shadowColor = 'white';
      stars.forEach(s => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });
    }
    function animateStars() {
      stars.forEach((s, i) => {
        s.y += Math.sin(s.d) * 0.3;
        s.x += Math.cos(s.d) * 0.2;
        if (s.y > height || s.x > width || s.x < 0) {
          stars[i] = { x: Math.random() * width, y: 0, r: s.r, d: s.d };
        }
      });
      drawStars();
      requestAnimationFrame(animateStars);
    }
    window.addEventListener('resize', initCanvas);
    initCanvas();
    animateStars();

    // Historias
    const historias = [
      {
        nombre: "Álvaro",
        frase: "El coraje también se entrena.",
        descripcion: "Un salto de fe, seis miradas que lo impulsan.",
        imagen: "https://via.placeholder.com/400x200?text=Alvaro",
        enlace: "historia-alvaro.html"
      },
      {
        nombre: "Clara",
        frase: "Donde otros ven límites, ella respira profundo.",
        descripcion: "Su red: un entrenador, un padre, una voz interior y mucho agua.",
        imagen: "https://via.placeholder.com/400x200?text=Clara",
        enlace: "historia-clara.html"
      },
      {
        nombre: "Nico",
        frase: "No escuchas su zancada. Pero vibra en cada meta.",
        descripcion: "Un corredor sordo que despierta respeto en quienes lo ven volar.",
        imagen: "https://via.placeholder.com/400x200?text=Nico",
        enlace: "historia-nico.html"
      },
      {
        nombre: "Luna",
        frase: "Bailar es desafiar la gravedad con belleza.",
        descripcion: "Una historia que inspira incluso a quienes no la conocen.",
        imagen: "https://via.placeholder.com/400x200?text=Luna",
        enlace: "historia-luna.html"
      },
      {
        nombre: "Erik",
        frase: "Donde termina la vista, comienza el instinto.",
        descripcion: "Un judoka ciego, una red que lo guía y un rival que lo admira.",
        imagen: "https://via.placeholder.com/400x200?text=Erik",
        enlace: "historia-erik.html"
      },
      {
        nombre: "Valentina",
        frase: "El músculo más fuerte no se entrena: es el alma.",
        descripcion: "Una historia de fuerza, sororidad y perseverancia sobre ruedas.",
        imagen: "https://via.placeholder.com/400x200?text=Valentina",
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

      // GSAP animación
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