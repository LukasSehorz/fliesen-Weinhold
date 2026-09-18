/* =========================================================================
   Fliesen Weinhold — Interaktion
   Animationslogik 1:1 an der Referenz orientiert:
   Reveal 500 ms ease-out-quad beim Eintritt in den Viewport,
   Sticky-Header, Overlay-Menü, Hero-Diashow (3 s), Referenz-Slider, Parallax.
   ========================================================================= */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------- Reveal on scroll ------------------------- */
  var revealItems = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !reduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealItems.forEach(function (el) { io.observe(el); });
  } else {
    revealItems.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ------------------------------- Header -------------------------------- */
  var header = document.getElementById('header');
  var toTop = document.getElementById('toTop');

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    header.classList.toggle('is-scrolled', y > 40);
    toTop.classList.toggle('is-visible', y > window.innerHeight * 0.6);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------------------------- Overlay-Menü ----------------------------- */
  var burger = document.getElementById('burger');
  var menu = document.getElementById('menu');

  function setMenu(open) {
    menu.classList.toggle('is-open', open);
    burger.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    menu.setAttribute('aria-hidden', String(!open));
    document.documentElement.style.overflow = open ? 'hidden' : '';
    document.body.style.overflow = open ? 'hidden' : '';
  }
  burger.addEventListener('click', function () {
    setMenu(!menu.classList.contains('is-open'));
  });
  menu.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) setMenu(false);
  });

  /* --------------------------- Hero-Diashow (3 s) ------------------------ */
  var slides = document.querySelectorAll('.hero__slide');
  var dots = document.querySelectorAll('.hero__dot');
  var current = 0;
  var timer = null;
  var INTERVAL = 3000;

  function show(i) {
    current = (i + slides.length) % slides.length;
    slides.forEach(function (s, n) { s.classList.toggle('is-active', n === current); });
    dots.forEach(function (d, n) {
      d.classList.remove('is-active');
      if (n === current) { void d.offsetWidth; d.classList.add('is-active'); }
    });
  }
  function start() {
    stop();
    if (reduced || slides.length < 2) return;
    timer = setInterval(function () { show(current + 1); }, INTERVAL);
  }
  function stop() { if (timer) { clearInterval(timer); timer = null; } }

  dots.forEach(function (d, n) {
    d.addEventListener('click', function () { show(n); start(); });
  });
  document.addEventListener('visibilitychange', function () {
    document.hidden ? stop() : start();
  });
  start();

  /* ----------------------------- Referenz-Slider ------------------------- */
  var track = document.getElementById('sliderTrack');
  if (track) {
    var slideEls = track.querySelectorAll('.slide');
    var prev = document.getElementById('slidePrev');
    var next = document.getElementById('slideNext');
    var index = 0;

    function perView() { return window.matchMedia('(max-width: 1050px)').matches ? 1 : 2; }
    function maxIndex() { return Math.max(0, slideEls.length - perView()); }

    function update() {
      index = Math.min(index, maxIndex());
      track.style.transform = 'translate3d(-' + (index * (100 / perView())) + '%,0,0)';
      prev.disabled = index === 0;
      next.disabled = index >= maxIndex();
    }
    prev.addEventListener('click', function () { index = Math.max(0, index - 1); update(); });
    next.addEventListener('click', function () { index = Math.min(maxIndex(), index + 1); update(); });
    window.addEventListener('resize', update);
    update();

    /* Wischen auf Touch */
    var startX = null;
    track.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) {
        index = dx < 0 ? Math.min(maxIndex(), index + 1) : Math.max(0, index - 1);
        update();
      }
      startX = null;
    }, { passive: true });
  }

  /* ------------------------ Parallax der Fliesen-Deko -------------------- */
  var deco = document.getElementById('tileDeco');
  if (deco && !reduced) {
    var tiles = deco.querySelectorAll('i');
    var speeds = [0.16, -0.11, -0.19, 0.13];
    var ticking = false;

    function parallax() {
      var rect = deco.getBoundingClientRect();
      var progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      if (progress < -0.2 || progress > 1.2) { ticking = false; return; }
      var offset = (progress - 0.5) * 220;
      tiles.forEach(function (t, i) {
        t.style.transform = 'translateY(' + (offset * speeds[i]).toFixed(2) + 'px) rotate(' + (45 + offset * speeds[i] * 0.22).toFixed(2) + 'deg)';
      });
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(parallax); }
    }, { passive: true });
    parallax();
  }

  /* --------------------------- Formular-Feedback ------------------------- */
  var form = document.querySelector('.form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var note = document.getElementById('formNote');
      note.hidden = false;
      form.querySelector('button[type="submit"]').disabled = true;
    });
  }

  /* -------------------------------- Jahr -------------------------------- */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  /* -------------------- Smooth Scroll mit Header-Offset ------------------ */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (!id || id === '#' || id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var offset = id === '#top' ? 0 : header.offsetHeight;
      var top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: reduced ? 'auto' : 'smooth' });
    });
  });
})();
