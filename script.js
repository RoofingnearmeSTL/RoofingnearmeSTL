(function () {
  const menuButton = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');

  if (menuButton && navLinks) {
    menuButton.addEventListener('click', function () {
      navLinks.classList.toggle('mobile-open');
    });
  }

  document.querySelectorAll('form[data-lead-form]').forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const note = form.querySelector('.form-note');
      if (note) {
        note.style.display = 'block';
      }
      form.reset();
    });
  });

  const year = document.getElementById('year');
  if (year) {
    year.textContent = new Date().getFullYear();
  }
})();
