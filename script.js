(function () {
  const menuButton = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');

  if (menuButton && navLinks) {
    menuButton.setAttribute('aria-expanded', 'false');
    if (window.matchMedia('(max-width: 900px)').matches) {
      navLinks.setAttribute('aria-hidden', 'true');
    }
    menuButton.addEventListener('click', function () {
      navLinks.classList.toggle('mobile-open');
      const expanded = navLinks.classList.contains('mobile-open');
      menuButton.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      navLinks.setAttribute('aria-hidden', expanded ? 'false' : 'true');
    });
  }

  const year = document.getElementById('year');
  if (year) {
    year.textContent = new Date().getFullYear();
  }
})();
