(function () {
  const menuButton = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');

  if (menuButton && navLinks) {
    const mobileQuery = window.matchMedia('(max-width: 900px)');

    function syncMenuAccessibility() {
      if (mobileQuery.matches) {
        const expanded = navLinks.classList.contains('mobile-open');
        menuButton.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        navLinks.setAttribute('aria-hidden', expanded ? 'false' : 'true');
      } else {
        navLinks.classList.remove('mobile-open');
        menuButton.setAttribute('aria-expanded', 'false');
        navLinks.setAttribute('aria-hidden', 'false');
      }
    }

    syncMenuAccessibility();

    menuButton.addEventListener('click', function () {
      navLinks.classList.toggle('mobile-open');
      syncMenuAccessibility();
    });

    if (mobileQuery.addEventListener) {
      mobileQuery.addEventListener('change', syncMenuAccessibility);
    } else if (mobileQuery.addListener) {
      mobileQuery.addListener(syncMenuAccessibility);
    }
  }

  const year = document.getElementById('year');
  if (year) {
    year.textContent = new Date().getFullYear();
  }
})();
