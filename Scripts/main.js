/* =============================================
   MAIN.JS — Jakub Groblicki Personal Site
   Vanilla JavaScript (ES6+)
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ─────────────────────────────────────────
     1. HAMBURGER MENU
     Toggles mobile navigation open/closed.
     Uses aria-expanded for accessibility.
  ───────────────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const mainNav   = document.getElementById('main-nav');

  if (hamburger && mainNav) {

    hamburger.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('is-open');
      hamburger.classList.toggle('is-open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when a nav link is clicked
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('is-open');
        hamburger.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when clicking outside
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
     Uses IntersectionObserver to detect
     which section is currently in view
     and highlights the matching nav link.
  ───────────────────────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('#main-nav a');

  if (sections.length && navLinks.length) {

    const observerOptions = {
      root: null,           // observe relative to viewport
      rootMargin: '-40% 0px -55% 0px',  // trigger when section is in middle band
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Remove active class from all links
          navLinks.forEach(link => link.classList.remove('active'));

          // Add active class to matching link
          const activeLink = document.querySelector(
            `#main-nav a[href="#${entry.target.id}"]`
          );
          if (activeLink) activeLink.classList.add('active');
        }
      });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

  }


  /* ─────────────────────────────────────────
     3. SCROLL-TRIGGERED FADE-IN ANIMATION
     Elements with class .fade-in-on-scroll
     animate in when they enter the viewport.
     (Sections animate automatically via CSS;
     this is a utility for future elements.)
  ───────────────────────────────────────── */
  const fadeElements = document.querySelectorAll('.fade-in-on-scroll');

  if (fadeElements.length) {

    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          fadeObserver.unobserve(entry.target); // animate only once
        }
      });
    }, { threshold: 0.15 });

    fadeElements.forEach(el => fadeObserver.observe(el));

  }

});