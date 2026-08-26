/* ============================================================
   linkedin.js — LinkedIn Embedded Posts Feed
   Loads all real embeds from data/linkedin-posts.json and
   renders them as native LinkedIn iframes in a responsive grid.
   ============================================================ */

(function () {
  'use strict';

  function init() {
    fetch('data/linkedin-posts.json')
      .then(function (res) {
        if (!res.ok) throw new Error('Failed to fetch linkedin-posts.json');
        return res.json();
      })
      .then(function (posts) {
        render(posts || []);
      })
      .catch(function (err) {
        console.warn('linkedin.js:', err.message);
        var grid = document.getElementById('li-grid');
        if (grid) {
          grid.innerHTML = '<p style="color:var(--grid);opacity:.6;font-family:var(--font-mono);font-size:var(--fs-mono-xs);">// Could not load posts. Open directly on <a href="https://www.linkedin.com/in/kavimugil-rajasekar-7273042a2/" target="_blank" rel="noreferrer" style="color:var(--forest);">LinkedIn &rarr;</a></p>';
        }
        var count = document.getElementById('li-posts-count');
        if (count) count.textContent = '';
      });
  }

  function render(posts) {
    var grid  = document.getElementById('li-grid');
    var count = document.getElementById('li-posts-count');
    if (!grid) return;

    if (count) {
      count.textContent = posts.length + ' post' + (posts.length !== 1 ? 's' : '');
    }

    if (posts.length === 0) {
      grid.innerHTML = '<p style="color:var(--grid);opacity:.6;font-family:var(--font-mono);font-size:var(--fs-mono-xs);">// No posts found.</p>';
      return;
    }

    grid.innerHTML = posts.map(function (post) {
      var h = post.height || 800;
      return [
        '<div class="li-embed-wrap" id="' + post.id + '">',
        '  <iframe',
        '    src="' + post.embedUrl + '"',
        '    height="' + h + '"',
        '    frameborder="0"',
        '    allowfullscreen',
        '    loading="lazy"',
        '    title="Embedded LinkedIn post by Kavimugil Rajasekar"',
        '  ></iframe>',
        '</div>'
      ].join('');
    }).join('');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

