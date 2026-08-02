(function () {
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#site-nav');
  const filterButtons = document.querySelectorAll('[data-filter]');
  const projectCards = document.querySelectorAll('[data-track]');
  const emptyState = document.querySelector('.filter-empty');
  const year = document.querySelector('#current-year');

  if (year) year.textContent = String(new Date().getFullYear());

  function closeMenu() {
    if (!menuButton || !navigation) return;
    navigation.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
  }

  if (menuButton && navigation) {
    menuButton.addEventListener('click', function () {
      const isOpen = navigation.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    });

    navigation.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', function (event) {
      if (!navigation.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeMenu();
    });
  }

  filterButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      const selected = button.dataset.filter;
      let visibleCount = 0;

      filterButtons.forEach(function (filterButton) {
        const isActive = filterButton === button;
        filterButton.classList.toggle('is-active', isActive);
        filterButton.setAttribute('aria-pressed', String(isActive));
      });

      projectCards.forEach(function (card) {
        const isVisible = selected === 'all' || card.dataset.track === selected;
        card.hidden = !isVisible;
        if (isVisible) visibleCount += 1;
      });

      if (emptyState) emptyState.hidden = visibleCount !== 0;
    });
  });
}());
