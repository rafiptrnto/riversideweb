/* =========================================================
   SCRIPT.JS — Core site interactions
   Loading screen · Sticky navbar · Hamburger menu · Dark mode
   Scroll progress bar · Active navbar link · Typing effect
   Back to top · FAQ accordion · Ripple · Form validation
========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Loading Screen ---------- */
  const loadingScreen = document.getElementById('loading-screen');
  window.addEventListener('load', () => {
    setTimeout(() => loadingScreen.classList.add('hide'), 400);
  });
  // Fallback in case 'load' already fired
  setTimeout(() => loadingScreen && loadingScreen.classList.add('hide'), 2500);

  /* ---------- Sticky Navbar ---------- */
  const navbar = document.getElementById('navbar');
  const scrollProgress = document.getElementById('scroll-progress');
  const backToTop = document.getElementById('back-to-top');

  const onScroll = () => {
    const scrollY = window.scrollY;

    navbar.classList.toggle('scrolled', scrollY > 40);
    backToTop.classList.toggle('show', scrollY > 500);

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
    scrollProgress.style.width = `${progress}%`;

    updateActiveLink();
  };

  window.addEventListener('scroll', onScroll);
  onScroll();

  /* ---------- Hamburger Menu ---------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- Active Navbar Link on Scroll ---------- */
  const sections = document.querySelectorAll('main section[id], .hero[id]');
  const navLinkEls = document.querySelectorAll('.nav-link');

  function updateActiveLink() {
    let currentId = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) currentId = section.id;
    });
    navLinkEls.forEach(link => {
      link.classList.toggle('active-link', link.getAttribute('href') === `#${currentId}`);
    });
  }

  /* ---------- Dark Mode Toggle ---------- */
  const darkToggle = document.getElementById('dark-mode-toggle');
  const iconSun = document.getElementById('icon-sun');
  const iconMoon = document.getElementById('icon-moon');

  darkToggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark');
    iconSun.style.display = isDark ? 'none' : 'block';
    iconMoon.style.display = isDark ? 'block' : 'none';
  });

  /* ---------- Typing Effect (Hero Subtitle) ---------- */
  const typingText = document.getElementById('typing-text');
  const phrases = ['Home of Baseball & Softball Athletes.'];
  let phraseIndex = 0, charIndex = 0, deleting = false;

  function typeLoop() {
    const current = phrases[phraseIndex];

    if (!deleting) {
      typingText.textContent = current.slice(0, ++charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(typeLoop, 2200);
        return;
      }
    } else {
      typingText.textContent = current.slice(0, --charIndex);
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }
    setTimeout(typeLoop, deleting ? 35 : 55);
  }
  typeLoop();

  /* ---------- FAQ Accordion ---------- */
  document.querySelectorAll('.accordion-item').forEach(item => {
    const header = item.querySelector('.accordion-header');
    const body = item.querySelector('.accordion-body');

    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      document.querySelectorAll('.accordion-item').forEach(other => {
        other.classList.remove('open');
        other.querySelector('.accordion-body').style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  /* ---------- Back To Top ---------- */
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Button Ripple Effect ---------- */
  document.querySelectorAll('.ripple').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const circle = document.createElement('span');
      const size = Math.max(rect.width, rect.height);

      circle.classList.add('ripple-circle');
      circle.style.width = circle.style.height = `${size}px`;
      circle.style.left = `${e.clientX - rect.left - size / 2}px`;
      circle.style.top = `${e.clientY - rect.top - size / 2}px`;

      this.appendChild(circle);
      setTimeout(() => circle.remove(), 600);
    });
  });

  /* ---------- Smooth Scroll for Anchor Links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length < 2) return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = target.offsetTop - 84;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    });
  });

  /* ---------- Contact Form Validation ---------- */
  const form = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  const validators = {
    name: (v) => v.trim().length >= 3 ? '' : 'Nama minimal 3 karakter.',
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Masukkan email yang valid.',
    message: (v) => v.trim().length >= 10 ? '' : 'Pesan minimal 10 karakter.'
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    Object.keys(validators).forEach(field => {
      const input = document.getElementById(field);
      const errorEl = document.getElementById(`error-${field}`);
      const message = validators[field](input.value);

      input.closest('.form-group').classList.toggle('error', !!message);
      errorEl.textContent = message;
      if (message) valid = false;
    });

    if (valid) {
      formSuccess.classList.add('show');
      form.reset();
      setTimeout(() => formSuccess.classList.remove('show'), 4000);
    }
  });

});
