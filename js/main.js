/* ============================================================
   main.js — Site scripting (nav toggle, brand swap, year).
   Tubes cursor logic lives in tubes.js.
   ============================================================ */
(function () {
  'use strict';

  function attachNavToggle() {
    var toggle = document.getElementById('nav-toggle');
    var links  = document.getElementById('nav-links');
    if (!toggle || !links) return;

    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('is-open');
      toggle.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('is-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* On any page that isn't a section's Index, slide the brand icon out
     and slide "Kavimugil Rajasekar" into the same slot. The element stays
     the same <a class="brand-logo"> — we just toggle .is-name and inject
     a .brand-name span. */
  function setupBrandSwap() {
    var brand = document.querySelector('.brand-logo');
    if (!brand) return;

    var path = window.location.pathname.toLowerCase();
    var isIndex = /(^|\/)index\.html?$/.test(path) || path === '/' || path === '';

    if (isIndex) return;

    var name = document.createElement('span');
    name.className = 'brand-name';
    name.textContent = 'Kavimugil Rajasekar';
    brand.appendChild(name);
    // Force a reflow so the transition runs after the .brand-name is in the DOM.
    // eslint-disable-next-line no-unused-expressions
    name.offsetWidth;
    brand.classList.add('is-name');
  }

  function setYear() {
    var y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
  }

  /* Bottle Art section is still in development. The bottle-icon-btn links
     to bottle-art/index.html; intercept clicks, drop the native title,
     and surface a styled "Dev in Process" tooltip on hover/focus.
     Scoped to outgoing links (those whose href points INTO bottle-art/),
     not the back-link on bottle-art pages. */
  function setupBottleArtLock() {
    var btns = document.querySelectorAll(
      '.bottle-icon-btn[href$="bottle-art/index.html"],' +
      '.bottle-icon-btn[href$="bottle-art/"]'
    );
    btns.forEach(function (btn) {
      btn.removeAttribute('title');

      var tip = document.createElement('span');
      tip.className = 'dev-tooltip';
      tip.setAttribute('role', 'status');
      tip.innerHTML = '<strong>Dev in Process</strong>Come Back Later!!';
      btn.appendChild(tip);

      var open = function () { tip.classList.add('is-open'); };
      var close = function () { tip.classList.remove('is-open'); };

      btn.addEventListener('mouseenter', open);
      btn.addEventListener('mouseleave', close);
      btn.addEventListener('focus', open);
      btn.addEventListener('blur', close);

      btn.addEventListener('click', function (e) {
        e.preventDefault();
        open();
        setTimeout(close, 1800);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      attachNavToggle();
      setupBrandSwap();
      setupBottleArtLock();
      setYear();
    });
  } else {
    attachNavToggle();
    setupBrandSwap();
    setupBottleArtLock();
    setYear();
  }
})();