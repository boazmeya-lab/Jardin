/* Jardin Agro – Indice "Créer mon bouquet"
   Ajoute une bulle avec flèche qui rebondit au-dessus du bouton menant à
   creer-mon-bouquet.html. Installation : avant </body> de index.html (et des
   pages où le bouton apparaît) :
   <script src="js/hint-bouquet.js" defer></script> */
(function () {
  'use strict';

  var TEXT = 'Composez votre propre bouquet 🌸<br>Essayez-le ici !';
  var KEY = 'jaBouquetHintSeen';

  if (/creer-mon-bouquet/.test(location.pathname)) return;

  function seen() { try { return sessionStorage.getItem(KEY) === '1'; } catch (e) { return false; } }
  function markSeen() { try { sessionStorage.setItem(KEY, '1'); } catch (e) {} }

  function findTarget() {
    var links = Array.prototype.slice.call(document.querySelectorAll('a[href*="creer-mon-bouquet"]'));
    var main = links.filter(function (a) { return !a.closest('header, nav'); });
    return (main[0] || links[0]) || null;
  }

  var css = '' +
    '#ja-hint{position:absolute;z-index:900;max-width:230px;background:#a4162b;color:#fff;padding:12px 30px 12px 14px;border-radius:14px;font:600 14px/1.4 "Plus Jakarta Sans",system-ui,sans-serif;box-shadow:0 8px 24px rgba(0,0,0,.25);display:none;pointer-events:auto;text-align:left}' +
    '#ja-hint.show{display:block}' +
    '#ja-hint::after{content:"";position:absolute;left:var(--ax,40px);margin-left:-9px;bottom:-9px;border:9px solid transparent;border-top-color:#a4162b;border-bottom:0}' +
    '#ja-hint.below::after{bottom:auto;top:-9px;border-top:0;border-bottom:9px solid #a4162b;border-bottom-color:#a4162b}' +
    '#ja-hint button{position:absolute;top:4px;right:6px;background:none;border:0;color:#fff;font-size:18px;cursor:pointer;line-height:1}' +
    '#ja-hint button:focus-visible{outline:2px solid #fff;outline-offset:2px}' +
    '@media (prefers-reduced-motion:no-preference){#ja-hint.show .ja-hint-in{animation:jaHintBob 1.6s ease-in-out infinite}@keyframes jaHintBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}}';

  function init() {
    if (seen()) return;
    var target = findTarget();
    if (!target) return;

    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    var hint = document.createElement('div');
    hint.id = 'ja-hint';
    hint.setAttribute('role', 'status');
    hint.innerHTML = '<div class="ja-hint-in">' + TEXT + '</div><button type="button" aria-label="Fermer l’indication">×</button>';
    document.body.appendChild(hint);

    function place() {
      var r = target.getBoundingClientRect();
      var sx = window.pageXOffset, sy = window.pageYOffset;
      var w = hint.offsetWidth, h = hint.offsetHeight;
      var below = r.top < 110; /* pas assez de place au-dessus (header collant) */
      var center = r.left + r.width / 2;
      var left = Math.min(Math.max(center - w / 2, 10), document.documentElement.clientWidth - w - 10);
      hint.classList.toggle('below', below);
      hint.style.left = (left + sx) + 'px';
      hint.style.top = (below ? r.bottom + 14 + sy : r.top - h - 14 + sy) + 'px';
      hint.style.setProperty('--ax', (center - left) + 'px');
    }

    function hide() { hint.classList.remove('show'); markSeen(); }
    hint.querySelector('button').addEventListener('click', hide);
    target.addEventListener('click', markSeen);

    window.addEventListener('resize', place);
    window.addEventListener('load', place);

    /* Affichée quand le bouton entre à l'écran */
    function reveal() { hint.classList.add('show'); place(); }
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) { setTimeout(reveal, 700); io.disconnect(); }
      }, { threshold: 0.6 });
      io.observe(target);
    } else {
      setTimeout(reveal, 1200);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
