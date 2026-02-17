// Simple navigation setup
export function setupNavigation() {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('nav ul');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      nav.classList.toggle('show');
    });
  }

  // Close menu when a link is clicked
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (nav) nav.classList.remove('show');
    });
  });
}
