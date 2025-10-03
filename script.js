
  // --- Animación de elementos al cargar la página ---
  const elements = document.querySelectorAll(".animate-on-load");

  elements.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add("visible");
    }, index * 200); // Reducimos un poco el delay para una carga más rápida
  });

  // --- Animación de elementos al hacer scroll ---
  const scrollElements = document.querySelectorAll(".scroll-animate");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // se anima solo 1 vez
        }
      });
    },
    { threshold: 0.2 } // 20% visible para activar
  );

  scrollElements.forEach((el) => observer.observe(el));

  // --- Lógica para el portafolio de Fotografía ---
  document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica para el Modal Lightbox ---
    const imageModal = document.getElementById('imageModal');
    if (imageModal) {
      imageModal.addEventListener('show.bs.modal', function (event) {
        // Botón que activó el modal
        const triggerElement = event.relatedTarget;
        // Extraer la URL de la imagen del atributo data-img-src
        const imgSrc = triggerElement.getAttribute('data-img-src');
        // Actualizar el src de la imagen dentro del modal
        const modalImage = imageModal.querySelector('.modal-img');
        modalImage.src = imgSrc;
      });
    }

    // --- Lógica para los filtros de la galería ---
    const filterContainer = document.querySelector('.filtros-galeria');
    if (filterContainer) {
      const galleryItems = document.querySelectorAll('.galeria-item');

      filterContainer.addEventListener('click', (event) => {
        if (event.target.matches('.btn')) {
          // Manejar clase 'active' en los botones
          filterContainer.querySelector('.active').classList.remove('active');
          event.target.classList.add('active');

          const filter = event.target.getAttribute('data-filter');

          galleryItems.forEach(item => {
            item.style.display = 'none'; // Ocultar todos
            if (item.getAttribute('data-category') === filter || filter === 'all') {
              item.style.display = 'inline-block'; // Mostrar los que coinciden
            }
          });
        }
      });
    }
  });
