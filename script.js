document.addEventListener('DOMContentLoaded', () => {
  // FAQ accordion
  document.querySelectorAll('.faq-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      item.classList.toggle('open');
    });
  });

  // Back-to-top smooth scroll (fallback if browser doesn’t support CSS smooth scroll)
  const backToTop = document.querySelector('.back-to-top a');
  if (backToTop) {
    backToTop.addEventListener('click', e => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Basic testimonial rotation (stub; you can expand to real carousel)
  const slides = document.querySelectorAll('.testimonial-slide');
  let index = 0;
  setInterval(() => {
    if (!slides.length) return;
    slides[index].style.display = 'none';
    index = (index + 1) % slides.length;
    slides[index].style.display = 'block';
  }, 8000);
});
