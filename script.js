(function () {
  'use strict';

  /* ============ YEAR IN FOOTER ============ */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ============ MOBILE NAV ============ */
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  function closeMenu() {
    if (!navMenu || !hamburger) return;
    navMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const open = navMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(open));
    });

    navLinks.forEach(link =>
      link.addEventListener('click', closeMenu)
    );

    /* Close on Escape for keyboard users */
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* ============ SCROLL SPY (IntersectionObserver) ============ */
  const sections = document.querySelectorAll('section[id]');

  if ('IntersectionObserver' in window && sections.length) {
    const spy = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          navLinks.forEach(link => {
            link.classList.toggle(
              'active',
              link.getAttribute('href') === '#' + id
            );
          });
        });
      },
      /* Middle band of viewport triggers activation */
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );

    sections.forEach(sec => spy.observe(sec));
  }

  /* ============ REVEAL ANIMATIONS ============ */
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealEls = document.querySelectorAll(
    '.section, .project-card, .timeline-item, .cert-card'
  );

  if (reduceMotion || !('IntersectionObserver' in window)) {
    /* Skip animation entirely */
    revealEls.forEach(el => el.classList.add('show'));
    return;
  }

  revealEls.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach(el => revealObserver.observe(el));
})();