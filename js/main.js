// ================================================
// Main JavaScript - Portfolio & Bottle Art
// ================================================

function attachMenuListeners() {
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    menu.classList.toggle('active');
    toggle.classList.toggle('active');
  });

  menu.querySelectorAll('ul li a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('active');
      toggle.classList.remove('active');
    });
  });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
  attachMenuListeners();
});

// Dynamic year in footer
document.addEventListener('DOMContentLoaded', function() {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});