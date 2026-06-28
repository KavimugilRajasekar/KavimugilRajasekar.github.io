/* ============================================================
   tubes.js — Interactive 3D background (vanilla port of the
   TubesBackground React component from Instructions.md).
   Lazy-loads threejs-components from CDN, mounts a fixed canvas,
   wires click → setColors / setLightsColors. Honors
   prefers-reduced-motion (skips CDN load entirely).
   ============================================================ */
(function () {
  'use strict';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var CDN = 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js';

  // Blueprint-muted palettes — forest ramps for tubes,
  // mint/gold/forest/grid for lights so they sit on Paper.
  var TUBE_PALETTE  = ['#1A3C2B', '#3A5F47', '#5C7F62'];
  var LIGHT_PALETTE = ['#9EFFBF', '#F4D35E', '#1A3C2B', '#3A3A38'];

  function rand(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function loadScriptUMD(src) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = src;
      s.async = true;
      s.onload = function () { resolve(window.TubesCursor); };
      s.onerror = function () { reject(new Error('Tubes CDN failed')); };
      document.head.appendChild(s);
    });
  }

  function loadScriptESM(src) {
    return new Promise(function (resolve, reject) {
      // Append a module script; resolve once it runs.
      var s = document.createElement('script');
      s.type = 'module';
      s.src = src;
      s.onload = function () { resolve(window.TubesCursor); };
      s.onerror = function () { reject(new Error('Tubes ESM CDN failed')); };
      document.head.appendChild(s);
    });
  }

  function init() {
    var canvas = document.createElement('canvas');
    canvas.id = 'tubes-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.appendChild(canvas);

    loadScriptUMD(CDN)
      .catch(function () { return loadScriptESM(CDN); })
      .then(function (TubesCursor) {
        if (!TubesCursor || typeof TubesCursor !== 'function') {
          console.warn('[tubes] TubesCursor not available; background disabled.');
          return null;
        }
        var app = TubesCursor(canvas, {
          tubes: {
            colors: TUBE_PALETTE.slice(),
            lights: {
              intensity: 120,
              colors: LIGHT_PALETTE.slice()
            }
          }
        });
        return app;
      })
      .then(function (app) {
        if (!app || !app.tubes) return;
        window.addEventListener('click', function (e) {
          // Don't randomize on interactive elements
          if (e.target.closest && e.target.closest('a, button, input, textarea, select, label')) return;
          app.tubes.setColors([rand(TUBE_PALETTE), rand(TUBE_PALETTE), rand(TUBE_PALETTE)]);
          app.tubes.setLightsColors([
            rand(LIGHT_PALETTE), rand(LIGHT_PALETTE),
            rand(LIGHT_PALETTE), rand(LIGHT_PALETTE)
          ]);
        });
      })
      .catch(function (err) {
        console.warn('[tubes] background unavailable:', err);
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();