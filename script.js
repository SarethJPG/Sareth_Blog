document.addEventListener('DOMContentLoaded', () => {
  // === Menú móvil (se mantiene igual) ===
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('active');
    });

    const links = document.querySelectorAll('#mobile-menu a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('active');
      });
    });
  }

  // === Índice modular de entradas responsivo ===
  const blogIndex = document.getElementById('blog-index');
  const allCards = Array.from(blogIndex.querySelectorAll('.card'));

  // Función para calcular cuántas cards por bloque según ancho
  function getCardsPerBlock() {
    const width = window.innerWidth;
    if (width <= 640) return 2;       // móvil: 1 columna x 2 filas
    if (width <= 1024) return 4;      // tablet/grande: 2 columnas x 2 filas
    return 6;                         // escritorio: 3 columnas x 2 filas
  }

  // Función para construir bloques
  function buildBlocks() {
    blogIndex.innerHTML = ''; // limpiar contenedor
    const entradasPorBloque = getCardsPerBlock();

    const grupos = [];
    for (let i = 0; i < allCards.length; i += entradasPorBloque) {
      grupos.push(allCards.slice(i, i + entradasPorBloque));
    }

    const bloques = grupos.map((grupo, index) => {
      const grid = document.createElement('div');
      grid.className = 'entries-grid';
      if (index > 0) grid.classList.add('hidden');
      grid.id = `entries-${index + 1}`;

      grupo.forEach(card => grid.appendChild(card));

      // Rellenar espacios vacíos si el grupo no llega al total
      while (grid.children.length < entradasPorBloque) {
        const empty = document.createElement('div');
        empty.className = 'card empty';
        grid.appendChild(empty);
      }

      blogIndex.appendChild(grid);
      return grid;
    });

    // Crear botón global
    const btnWrapper = document.createElement('div');
    btnWrapper.className = 'load-more';

    const btn = document.createElement('button');
    btn.id = 'btn-toggle';
    btn.textContent = 'Ver más';

    btnWrapper.appendChild(btn);
    blogIndex.appendChild(btnWrapper);

    // Estado actual
    let currentVisible = 1;

    btn.addEventListener('click', () => {
      if (btn.textContent === 'Ver más') {
        if (currentVisible < bloques.length) {
          bloques[currentVisible].classList.remove('hidden');
          currentVisible++;
        }
        if (currentVisible === bloques.length) {
          btn.textContent = 'Ver menos';
        }
      } else {
        // Volver al estado inicial
        bloques.forEach((grid, i) => {
          if (i > 0) grid.classList.add('hidden');
        });
        currentVisible = 1;
        btn.textContent = 'Ver más';
      }
    });
  }

  // Construir bloques iniciales
  buildBlocks();

  // Reconstruir bloques al cambiar tamaño de pantalla
  window.addEventListener('resize', () => {
    buildBlocks();
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('active');
    });

    const links = document.querySelectorAll('#mobile-menu a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('active');
      });
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Animaciones generales (fade-in en hero, textos, etc.)
  const faders = document.querySelectorAll(".fade-in");

  const optionsFaders = {
    threshold: 0.2,
    rootMargin: "0px 0px -20% 0px" // espera a que esté más dentro del viewport
  };

  const observerFaders = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, optionsFaders);

  faders.forEach(fader => {
    observerFaders.observe(fader);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Animaciones en escalera para las cards
  const cards = document.querySelectorAll(".card");
  const cardsSection = document.querySelector("#entradas");

  const optionsCards = {
    threshold: 0.5, // al menos 50% visible
    rootMargin: "0px 0px -40% 0px" // asegura que esté bien dentro antes de activar
  };

  const observerCards = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animación en escalera: delay progresivo
        cards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add("visible");
          }, index * 200); // cada card aparece 200ms después de la anterior
        });
      }
    });
  }, optionsCards);

  if (cardsSection) {
    observerCards.observe(cardsSection);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const aboutSection = document.querySelector("#sobre-mi");
  const avatar = document.querySelector(".fade-in-avatar");
  const textBlock = document.querySelector(".fade-in-text");

  const optionsAbout = {
    threshold: 0.2,
    rootMargin: "0px 0px -40% 0px"
  };

  const observerAbout = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        avatar.classList.add("visible");
        textBlock.classList.add("visible");
      }
    });
  }, optionsAbout);

  if (aboutSection) {
    observerAbout.observe(aboutSection);
  }
});

