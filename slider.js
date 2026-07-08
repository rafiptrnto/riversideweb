/* =========================================================
   SLIDER.JS — Testimonial slider with dots + autoplay
========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  const track = document.getElementById('testi-track');
  const dotsContainer = document.getElementById('testi-dots');
  if (!track || !dotsContainer) return;

  const slides = Array.from(track.children);
  let current = 0;
  let autoplayTimer = null;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.classList.add('testi-dot');
    dot.setAttribute('aria-label', `Testimoni ${i + 1}`);
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  const dots = Array.from(dotsContainer.children);

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach(d => d.classList.remove('active'));
    dots[current].classList.add('active');
  }

  function next() { goTo(current + 1); }

  function startAutoplay() {
    autoplayTimer = setInterval(next, 5000);
  }
  function stopAutoplay() {
    clearInterval(autoplayTimer);
  }

  startAutoplay();

  const sliderWrapper = track.closest('.testi-slider');
  sliderWrapper.addEventListener('mouseenter', stopAutoplay);
  sliderWrapper.addEventListener('mouseleave', startAutoplay);

  /* Basic swipe support */
  let startX = 0;
  track.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', (e) => {
    const diff = e.changedTouches[0].clientX - startX;
    if (diff > 50) goTo(current - 1);
    if (diff < -50) goTo(current + 1);
  }, { passive: true });

});
