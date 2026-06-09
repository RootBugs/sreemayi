/* ============================================
   SREEMAYI'S 1ST ANNIVERSARY — INTERACTIVE MAGIC
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ---- Preloader ----
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => preloader.classList.add('hidden'), 1200);
  });
  // Fallback: hide after 3s no matter what
  setTimeout(() => preloader.classList.add('hidden'), 3000);

  // ---- Floating Hearts Background ----
  const heartsBg = document.getElementById('heartsBg');
  const heartSymbols = ['❤️', '💕', '💖', '💗', '💘', '💝', '🌹', '✨'];

  function createFloatingHeart() {
    const heart = document.createElement('span');
    heart.classList.add('floating-heart');
    heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = (0.8 + Math.random() * 1.2) + 'rem';
    heart.style.animationDuration = (8 + Math.random() * 12) + 's';
    heart.style.animationDelay = Math.random() * 2 + 's';
    heartsBg.appendChild(heart);
    setTimeout(() => heart.remove(), 22000);
  }

  // Initial batch
  for (let i = 0; i < 12; i++) {
    setTimeout(createFloatingHeart, i * 400);
  }
  // Continuous
  setInterval(createFloatingHeart, 2000);

  // ---- Navbar Scroll ----
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 80);
  });

  // ---- Mobile Nav Toggle ----
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.querySelector('.nav-links');
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
  // Close on link click
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('active'));
  });

  // ---- Scroll-triggered Animations ----
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observe timeline items
  document.querySelectorAll('.timeline-item').forEach(item => {
    fadeObserver.observe(item);
  });

  // Observe promise cards
  document.querySelectorAll('.promise-card').forEach(card => {
    fadeObserver.observe(card);
  });

  // Observe section titles for fade-in
  document.querySelectorAll('.section-title, .section-subtitle').forEach(el => {
    el.classList.add('fade-in');
    fadeObserver.observe(el);
  });

  // ---- Counter Animation ----
  const counterSection = document.getElementById('counter');
  let countersAnimated = false;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersAnimated) {
        countersAnimated = true;
        animateCounters();
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });

  // Fallback: trigger counters after a short delay if observer doesn't fire
  setTimeout(() => {
    if (!countersAnimated) {
      countersAnimated = true;
      animateCounters();
    }
  }, 3000);

  counterObserver.observe(counterSection);

  function animateCounters() {
    const counters = document.querySelectorAll('.counter-number');
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = target > 10000 ? 2500 : 2000;
      const startTime = performance.now();

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * target);
        counter.textContent = current.toLocaleString();

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          counter.textContent = target.toLocaleString();
        }
      }

      requestAnimationFrame(update);
    });
  }

  // ---- Sparkle Cursor Effect ----
  let sparkleTimeout;
  document.addEventListener('mousemove', (e) => {
    if (sparkleTimeout) return;
    sparkleTimeout = setTimeout(() => { sparkleTimeout = null; }, 80);

    const sparkle = document.createElement('span');
    sparkle.classList.add('sparkle');
    const symbols = ['✨', '💕', '💖', '⭐'];
    sparkle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    sparkle.style.left = e.clientX + 'px';
    sparkle.style.top = e.clientY + 'px';
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 800);
  });

  // ---- Smooth Scroll for Nav Links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---- Parallax on Hero ----
  window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-content');
    if (hero && window.scrollY < window.innerHeight) {
      const offset = window.scrollY * 0.3;
      hero.style.transform = `translateY(${offset}px)`;
      hero.style.opacity = 1 - (window.scrollY / window.innerHeight) * 0.8;
    }
  });
});
