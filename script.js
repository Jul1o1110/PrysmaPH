
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

