/* Jardin Agro – Indice "Créer mon bouquet" (Bulle blanche)
   Affiche une bulle blanche au-dessus du bouton "creer-bouquet.html" 
   qui reste visible jusqu'à un clic explicite sur la croix ou le bouton.
*/
(function () {
  'use strict';

  // Ne pas exécuter sur la page de création elle-même
  if (/creer-mon-bouquet/.test(location.pathname)) return;

  var btn = document.querySelector('a[href*="creer-mon-bouquet"], a[href*="creer-bouquet"]');
  if (!btn) return;

  // Vérifie si l'utilisateur a déjà fermé la bulle auparavant
  try {
    if (sessionStorage.getItem('jaBouquetHintSeen') === '1') return;
  } catch (e) {}

  // Injection des styles CSS
  var style = document.createElement('style');
  style.textContent = `
    .ja-hint-wrap {
      position: relative;
      display: inline-block;
    }
    .ja-hint-bouquet {
      position: absolute;
      bottom: calc(100% + 14px);
      left: 50%;
      transform: translateX(-50%) translateY(6px);
      background: #ffffff;
      color: #1a1616;
      font: 600 0.88rem 'Plus Jakarta Sans', system-ui, sans-serif;
      padding: 10px 34px 10px 14px;
      border-radius: 12px;
      box-shadow: 0 10px 24px rgba(0, 0, 0, 0.18);
      white-space: nowrap;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.35s ease, transform 0.35s ease;
      z-index: 90;
      text-align: center;
    }
    .ja-hint-bouquet.show {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
      pointer-events: auto;
    }
    /* Flèche blanche pointant vers le bas */
    .ja-hint-bouquet::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      margin-left: -7px;
      border: 7px solid transparent;
      border-top-color: #ffffff;
    }
    .ja-hint-close {
      position: absolute;
      top: 3px;
      right: 8px;
      border: none;
      background: none;
      font-size: 1.2rem;
      line-height: 1;
      cursor: pointer;
      color: #6e6865;
      opacity: 0.8;
    }
    .ja-hint-close:hover {
      opacity: 1;
      color: #1a1616;
    }
    .ja-hint-wrap.pulse .btn, 
    .ja-hint-wrap.pulse a {
      animation: jaHintPulse 1.8s infinite;
    }
    @keyframes jaHintPulse {
      0% { box-shadow: 0 0 0 0 rgba(46, 91, 56, 0.5); }
      70% { box-shadow: 0 0 0 14px rgba(46, 91, 56, 0); }
      100% { box-shadow: 0 0 0 0 rgba(46, 91, 56, 0); }
    }
    @media (max-width: 767px) {
      .ja-hint-bouquet {
        white-space: normal;
        width: 210px;
      }
    }
  `;
  document.head.appendChild(style);

  // Enveloppe le bouton pour positionner la bulle de façon absolue
  var wrap = document.createElement('span');
  wrap.className = 'ja-hint-wrap pulse';
  btn.parentNode.insertBefore(wrap, btn);
  wrap.appendChild(btn);

  // Création de la bulle
  var hint = document.createElement('div');
  hint.className = 'ja-hint-bouquet';
  hint.innerHTML = '✨ Composez votre bouquet sur-mesure <button type="button" class="ja-hint-close" aria-label="Fermer">&times;</button>';
  wrap.appendChild(hint);

  // Fonction d'extinction au clic
  function fermer() {
    hint.classList.remove('show');
    wrap.classList.remove('pulse');
    try {
      sessionStorage.setItem('jaBouquetHintSeen', '1');
    } catch (e) {}
  }

  // Événements : fermeture uniquement lors du clic sur la croix ou sur le bouton
  hint.querySelector('.ja-hint-close').addEventListener('click', fermer);
  btn.addEventListener('click', fermer);

  // Affichage 1,5 seconde après le chargement
  setTimeout(function () {
    hint.classList.add('show');
  }, 1500);
})();
