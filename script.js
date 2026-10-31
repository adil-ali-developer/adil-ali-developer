document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll('.glass, .service-card, .project-card, .about-card').forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
  });

  const reveal = () => {
    const nodes = document.querySelectorAll('.glass, .service-card, .project-card, .about-card');
    nodes.forEach((node) => {
      node.classList.add('visible');
    });
  };

  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (motionQuery.matches) {
    reveal();
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) return;
    if (!motionQuery.matches) {
      reveal();
    }
  });

  const style = document.createElement('style');
  style.textContent = `
    .visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);
});
