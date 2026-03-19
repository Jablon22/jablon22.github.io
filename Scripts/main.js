/* =============================================
   MAIN.JS — Jakub Groblicki Personal Site
   Vanilla JavaScript (ES6+)
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ─────────────────────────────────────────
     1. HAMBURGER MENU
     Toggles mobile navigation open/closed.
  ───────────────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const mainNav   = document.getElementById('main-nav');

  if (hamburger && mainNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('is-open');
      hamburger.classList.toggle('is-open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close on nav link click
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('is-open');
        hamburger.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !mainNav.contains(e.target)) {
        mainNav.classList.remove('is-open');
        hamburger.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }


  /* ─────────────────────────────────────────
     2. ACTIVE NAV LINK ON SCROLL
     Highlights the nav link matching the
     section currently in the viewport.
  ───────────────────────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('#main-nav a');

  if (sections.length && navLinks.length) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => link.classList.remove('active'));
          const active = document.querySelector(
            `#main-nav a[href="#${entry.target.id}"]`
          );
          if (active) active.classList.add('active');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

    sections.forEach(s => navObserver.observe(s));
  }


  /* ─────────────────────────────────────────
     3. SKILL BARS ANIMATION
     Bars animate to their target width when
     the skills section scrolls into view.
  ───────────────────────────────────────── */
  const skillBars = document.querySelectorAll('.skill-bar-fill');

  if (skillBars.length) {
    const barObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const width  = target.getAttribute('data-width');
          target.style.width = width + '%';
          barObserver.unobserve(target); // animate once only
        }
      });
    }, { threshold: 0.3 });

    skillBars.forEach(bar => barObserver.observe(bar));
  }


  /* ─────────────────────────────────────────
     4. SCROLL FADE-IN
     Elements with class .fade-in become
     visible when they enter the viewport.
  ───────────────────────────────────────── */
  const fadeEls = document.querySelectorAll('.fade-in');

  if (fadeEls.length) {
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    fadeEls.forEach(el => fadeObserver.observe(el));
  }

});