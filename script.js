(function () {
  const root = document.documentElement;
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#site-nav');
  const year = document.querySelector('#current-year');
  const progress = document.querySelector('.progress');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (year) year.textContent = String(new Date().getFullYear());

  /* mobile menu */
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
    navigation.querySelectorAll('a').forEach(function (l) { l.addEventListener('click', closeMenu); });
    document.addEventListener('click', function (e) {
      if (!navigation.contains(e.target) && !menuButton.contains(e.target)) closeMenu();
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
  }

  /* scroll progress */
  function onScroll() {
    const max = root.scrollHeight - root.clientHeight;
    if (progress && max > 0) progress.style.transform = 'scaleX(' + (root.scrollTop / max) + ')';
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* reveal on scroll + count-up */
  function countUp(el) {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    if (reduced || isNaN(target)) return;
    const start = performance.now();
    const dur = 1200;
    (function tick(now) {
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(target * eased) + (t === 1 ? suffix : '');
      if (t < 1) requestAnimationFrame(tick);
    })(start);
  }

  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        entry.target.querySelectorAll('[data-count]').forEach(countUp);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el, i) {
      el.style.transitionDelay = (i % 3) * 90 + 'ms';
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* active nav link */
  const links = Array.prototype.slice.call(document.querySelectorAll('.site-nav a[href^="#"]:not(.nav-cta)'));
  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) { a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    links.forEach(function (a) {
      const s = document.querySelector(a.getAttribute('href'));
      if (s) spy.observe(s);
    });
  }

  /* spotlight on project cards */
  document.querySelectorAll('.project').forEach(function (card) {
    card.addEventListener('pointermove', function (e) {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', e.clientX - r.left + 'px');
      card.style.setProperty('--my', e.clientY - r.top + 'px');
    });
  });
}());
