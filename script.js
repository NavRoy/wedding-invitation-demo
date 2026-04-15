/* =============================================
   MyWedLink - script.js
   File 3 of 6
   ============================================= */

'use strict';

/* ===== NAVBAR SCROLL EFFECT ===== */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ===== HAMBURGER MENU ===== */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    }
  });

  // Close nav when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    });
  });
}

/* ===== FLOATING PETALS ===== */
function createPetals(containerId, count = 12) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const emojis = ['🌸', '🌺', '🌹', '🌼', '✨', '🪷', '💐'];

  for (let i = 0; i < count; i++) {
    const petal = document.createElement('div');
    petal.classList.add('petal');
    petal.textContent = emojis[Math.floor(Math.random() * emojis.length)];

    const left     = Math.random() * 100;
    const delay    = Math.random() * 8;
    const duration = 6 + Math.random() * 10;
    const size     = 14 + Math.random() * 16;

    petal.style.cssText = `
      left: ${left}%;
      font-size: ${size}px;
      animation-delay: ${delay}s;
      animation-duration: ${duration}s;
    `;

    container.appendChild(petal);
  }
}

createPetals('heroPetals', 14);
createPetals('ctaPetals', 10);

/* ===== SCROLL-REVEAL (AOS-style, no library) ===== */
function initScrollReveal() {
  const elements = document.querySelectorAll('[data-aos]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el    = entry.target;
        const delay = parseInt(el.getAttribute('data-delay') || '0');
        setTimeout(() => {
          el.classList.add('aos-animate');
        }, delay);
        observer.unobserve(el);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

initScrollReveal();

/* ===== COUNTER ANIMATION ===== */
function animateCounter(el, target, duration = 1800) {
  const start     = performance.now();
  const startVal  = 0;

  function step(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased    = 1 - Math.pow(1 - progress, 3);
    const current  = Math.round(startVal + (target - startVal) * eased);
    el.textContent = current;
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }

  requestAnimationFrame(step);
}

function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el     = entry.target;
        const target = parseInt(el.getAttribute('data-target'));
        animateCounter(el, target);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

initCounters();

/* ===== FAQ ACCORDION ===== */
function toggleFAQ(btn) {
  const item   = btn.parentElement;
  const answer = item.querySelector('.faq-answer');
  const isOpen = btn.classList.contains('open');

  // Close all open FAQs
  document.querySelectorAll('.faq-question.open').forEach(openBtn => {
    openBtn.classList.remove('open');
    openBtn.parentElement.querySelector('.faq-answer').classList.remove('open');
  });

  // If it wasn't open, open it
  if (!isOpen) {
    btn.classList.add('open');
    answer.classList.add('open');
  }
}

// Make toggleFAQ global (used via onclick in HTML)
window.toggleFAQ = toggleFAQ;

/* ===== SMOOTH ANCHOR SCROLL ===== */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const offset = 80; // navbar height
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ===== TEMPLATE CARD HOVER TILT ===== */
document.querySelectorAll('.template-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect   = card.getBoundingClientRect();
    const x      = e.clientX - rect.left;
    const y      = e.clientY - rect.top;
    const cx     = rect.width  / 2;
    const cy     = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -4;
    const rotateY = ((x - cx) / cx) *  4;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ===== WHATSAPP FLOATING BUTTON ===== */
(function createWhatsAppBtn() {
  const btn = document.createElement('a');
  btn.href    = 'https://wa.me/919999999999?text=Hi, I\'d like to create a wedding invitation';
  btn.target  = '_blank';
  btn.rel     = 'noopener';
  btn.setAttribute('aria-label', 'Chat on WhatsApp');
  btn.innerHTML = `
    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  `;
  btn.style.cssText = `
    position: fixed;
    bottom: 28px;
    right: 28px;
    z-index: 9999;
    width: 58px;
    height: 58px;
    background: #25D366;
    color: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 20px rgba(37,211,102,0.5);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    animation: waBounce 2.5s ease-in-out 2s infinite;
  `;

  const style = document.createElement('style');
  style.textContent = `
    @keyframes waBounce {
      0%, 100% { transform: translateY(0) scale(1); }
      50%       { transform: translateY(-6px) scale(1.05); }
    }
  `;
  document.head.appendChild(style);

  btn.addEventListener('mouseenter', () => {
    btn.style.transform = 'scale(1.12)';
    btn.style.boxShadow = '0 8px 30px rgba(37,211,102,0.6)';
    btn.style.animation = 'none';
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
    btn.style.boxShadow = '0 4px 20px rgba(37,211,102,0.5)';
    btn.style.animation = 'waBounce 2.5s ease-in-out infinite';
  });

  document.body.appendChild(btn);
})();

/* ===== SCROLL PROGRESS BAR ===== */
(function createProgressBar() {
  const bar = document.createElement('div');
  bar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    width: 0%;
    background: linear-gradient(90deg, #c8102e, #c9963a);
    z-index: 9998;
    transition: width 0.1s linear;
    border-radius: 0 2px 2px 0;
  `;
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const scrollTop  = window.scrollY;
    const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
    const pct        = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width  = pct + '%';
  });
})();

/* ===== ACTIVE NAV LINK HIGHLIGHT ===== */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a[href^="#"]');
  if (!sections.length || !links.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        links.forEach(link => {
          link.style.color = link.getAttribute('href') === `#${id}`
            ? 'var(--primary)'
            : '';
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
})();

/* ===== PAGE LOAD ANIMATION ===== */
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});
