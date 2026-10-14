/* ===========================================================
   KULTUR BEI RACHA & ROGER — SCRIPT.JS
   ===========================================================
   Enthält:
   1. Navigation: Hintergrund beim Scrollen + Mobile-Menü
   2. Scroll-Reveal-Animationen (sanftes Einblenden)
   3. Lightbox für die Galerie-Bilder
   4. Aktuelles Jahr im Footer
   =========================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- 1. NAVIGATION ---------- */
  const header = document.getElementById('siteHeader');
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  // Hintergrund der Navigation ändert sich, sobald man scrollt
  function updateHeaderOnScroll() {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  updateHeaderOnScroll();
  window.addEventListener('scroll', updateHeaderOnScroll);

  // Mobiles Menü öffnen/schließen (Hamburger-Icon)
  if (navToggle) {
    navToggle.addEventListener('click', function () {
      const isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });
  }

  // Menü schließen, sobald ein Link angeklickt wird (mobil)
  document.querySelectorAll('.main-nav a').forEach(function (link) {
    link.addEventListener('click', function () {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- 2. SCROLL-REVEAL-ANIMATIONEN ---------- */
  // Alle Elemente mit [data-animate] werden sanft eingeblendet,
  // sobald sie in den sichtbaren Bereich scrollen.
  const animatedItems = document.querySelectorAll('[data-animate]');

  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target); // nur einmal animieren
      }
    });
  }, { threshold: 0.15 });

  animatedItems.forEach(function (item) {
    revealObserver.observe(item);
  });

  /* ---------- 3. LIGHTBOX FÜR DIE GALERIE ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryItems.forEach(function (item) {
    item.addEventListener('click', function () {
      const img = item.querySelector('img');
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxCaption.textContent = item.getAttribute('data-caption') || '';
      lightbox.classList.add('open');
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('open');
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

  // Lightbox auch per Klick auf den dunklen Hintergrund schließen
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  // Lightbox mit der ESC-Taste schließen
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });

  /* ---------- 4. AKTUELLES JAHR IM FOOTER ---------- */
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

});
