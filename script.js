document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".animate-on-load");

  elements.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add("visible");
    }, index * 400); // cada elemento entra con 0.4s de diferencia
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".scroll-animate");

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

  elements.forEach((el) => observer.observe(el));
});
