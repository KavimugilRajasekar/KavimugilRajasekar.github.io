// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Mobile menu toggle functionality
const menuToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger icon
    menuToggle.classList.toggle('active');
  });
  
  // Close menu when clicking on a link
  document.querySelectorAll('.nav-menu ul li a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      menuToggle.classList.remove('active');
    });
  });
}

// Active link highlighting based on scroll position
window.addEventListener('scroll', function() {
  const scrollPosition = window.scrollY;
  
  document.querySelectorAll('section').forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      document.querySelector(`nav a[href="#${sectionId}"]`).classList.add('active');
    } else {
      document.querySelector(`nav a[href="#${sectionId}"]`).classList.remove('active');
    }
  });
});