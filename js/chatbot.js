/* Jardin Agro – Assistant FAQ (100 % local, sans API)
   Installation : ajouter avant </body> de chaque page :
   <script src="js/chatbot.js" defer></script> */
(function () {
  'use strict';

  var PHONE_DISPLAY = '+243 831 982 374';
  var PHONE_TEL = '+243831982374';
  var CONTACT_PAGE = 'contact.html';
  var BOT_NAME = 'Assistant Jardin Agro';

  /* ---------- BASE DE CONNAISSANCES ----------
     Pour envoyer des photos avec une réponse, ajouter le champ
     img: ['image/photo1.jpg', 'image/photo2.jpg', 'image/photo3.jpg'] */
  var FAQ = [
    // Salutations & Politesse
    {
      q: 'Bonjour',
      k: ['bonjour', 'salut', 'coucou', 'hello', 'bonsoir', 'hola', 'hey'],
      a: 'Bonjour 🌸 Comment puis-je vous aider aujourd’hui ?'
    },
    {
      q: 'Comment ça va ?',
      k: ['ca va', 'cava', 'comment ca va', 'comment vas tu', 'comment allez vous', 'forme'],
      a: 'Tout va très bien, merci ! 🌿 Et vous, comment puis-je vous aider ?'
    },
    {
      q: 'Merci',
      k: ['merci', 'super', 'genial', 'parfait', 'top', 'remercie', 'merci beaucoup'],
      a: 'Avec grand plaisir ! N’hésitez pas si vous avez d’autres questions. Bonne journée 🌺'
    },

    // Photos (images envoyées automatiquement)
    {
      q: 'Voir des photos de bouquets',
      k: ['photo', 'photos', 'image', 'images', 'voir', 'montrer', 'montre', 'montrez', 'exemple', 'exemples', 'modele', 'modeles', 'catalogue', 'apercu'],
      a: 'Voici quelques-uns de nos bouquets 🌸 Retrouvez-les tous dans le <a href="products.html">catalogue</a>, ou créez le vôtre avec <a href="creer-mon-bouquet.html">Créer mon bouquet</a>.',
      img: ['image/bouquet1.jpg', 'image/bouquet2.jpg', 'image/bouquet3.jpg']
    },

    // FAQ Produits & Services
    {
      q: 'Comment passer une commande ?',
      k: ['commander', 'commande', 'acheter', 'achat', 'panier', 'reserver', 'passer'],
      a: 'C’est simple : choisissez vos fleurs ou bouquets dans le <a href="products.html">catalogue</a>, ajoutez-les au panier, puis validez votre commande. Vous pouvez aussi composer votre propre bouquet avec <a href="creer-mon-bouquet.html">Créer mon bouquet</a>.'
    },
    {
      q: 'Quels sont les délais et zones de livraison ?',
      k: ['livraison', 'livrer', 'delai', 'zone', 'combien de temps', 'quand', 'recevoir', 'adresse'],
      a: 'Les délais et zones de livraison sont détaillés sur la page <a href="livraison.html">Livraison</a>. Pour une livraison urgente ou une adresse particulière, notre service client vous répond rapidement.'
    },
    {
      q: 'Puis-je créer un bouquet personnalisé ?',
      k: ['personnalise', 'personnaliser', 'creer', 'composer', 'composition', 'sur mesure', 'choisir mes fleurs', 'ruban', 'emballage'],
      a: 'Oui ! Avec <a href="creer-mon-bouquet.html">Créer mon bouquet</a>, vous choisissez vos fleurs et leur quantité, l’emballage et le ruban. Vous voyez l’aperçu et le prix se mettre à jour en direct.'
    },
    {
      q: 'Proposez-vous des abonnements floraux pour les entreprises ?',
      k: ['abonnement', 'entreprise', 'societe', 'bureau', 'professionnel', 'hotel', 'restaurant', 'regulier', 'gros', 'grossiste'],
      a: 'Oui, nous accompagnons les professionnels (bureaux, hôtels, restaurants…) avec des livraisons régulières et des ventes en gros. Contactez notre service client pour un devis adapté à vos besoins.'
    },
    {
      q: 'Faites-vous des compositions pour les cérémonies funéraires ?',
      k: ['funeraire', 'funerailles', 'deuil', 'enterrement', 'obseques', 'couronne', 'condoleances', 'ceremonie', 'gerbe'],
      a: 'Oui, nous réalisons des compositions pour les cérémonies funéraires (gerbes, couronnes, bouquets). Merci de nous contacter directement pour préciser vos souhaits et le délai.'
    },
    {
      q: 'Comment se passe le paiement ?',
      k: ['paiement', 'payer', 'prix', 'mobile money', 'carte', 'cash', 'especes', 'mpesa', 'airtel', 'orange', 'facture'],
      a: 'Les modes de paiement disponibles s’affichent lors de la validation de votre commande. Pour une question précise (facture, paiement à la livraison, commande professionnelle), contactez notre service client.'
    },
    {
      q: 'Comment conserver mes fleurs plus longtemps ?',
      k: ['conserver', 'conservation', 'durer', 'faner', 'fanent', 'entretien', 'entretenir', 'longtemps', 'eau', 'vase', 'fraiches', 'fraicheur', 'sechent'],
      a: '<b>Nos conseils pour des fleurs plus durables :</b><br>• Coupez 1 à 2 cm de tige en biais, à chaque changement d’eau.<br>• Utilisez un vase propre et de l’eau fraîche tous les 1 à 2 jours.<br>• Retirez les feuilles qui trempent dans l’eau.<br>• Ajoutez le sachet de nutriment fourni, s’il y en a un.<br>• Placez le bouquet loin du soleil direct, de la chaleur et des fruits mûrs.<br>• Retirez les fleurs fanées pour protéger les autres.'
    },
    {
      q: 'Comment entretenir un bouquet de roses ?',
      k: ['rose', 'roses', 'bouquet', 'tete qui penche', 'penchent'],
      a: 'Pour les roses : retirez les feuilles du bas, recoupez les tiges en biais et mettez-les dans de l’eau propre et fraîche. Si une tête penche, recoupez la tige et plongez-la quelques minutes dans de l’eau tiède. Gardez-les au frais, à l’écart du soleil.'
    },
    {
      q: 'Comment garder un bouquet frais pendant le transport ou avant un événement ?',
      k: ['transport', 'evenement', 'mariage', 'fete', 'avant', 'stocker', 'garder', 'voyage', 'frigo', 'cadeau'],
      a: 'Gardez les fleurs au frais et à l’ombre, tiges dans un peu d’eau si possible. Évitez la voiture chaude et le soleil. Pour un événement, mettez-les dans l’eau dès que vous les recevez et gardez-les dans une pièce fraîche.'
    },
    {
      q: 'Comment contacter le service client ?',
      k: ['contact', 'contacter', 'telephone', 'appeler', 'numero', 'joindre', 'service client', 'whatsapp', 'aide'],
      a: 'Vous pouvez joindre notre service client au <b>' + PHONE_DISPLAY + '</b>.'
    }
  ];

  var GREETING = 'Bonjour 🌸 Je suis l’assistant de Jardin Agro. Posez-moi une question sur les commandes, la livraison, les bouquets ou l’entretien de vos fleurs.';
  var SUGGESTIONS = ['Comment passer une commande ?', 'Délais de livraison', 'Conserver mes fleurs', 'Bouquet personnalisé', 'Voir des photos'];

  /* ---------- MOTEUR DE RECHERCHE ---------- */
  function norm(s) {
    return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
  }
  var STOP = ['le', 'la', 'les', 'un', 'une', 'des', 'de', 'du', 'et', 'ou', 'a', 'au', 'aux', 'en', 'pour', 'je', 'tu', 'vous', 'nous', 'mes', 'mon', 'ma', 'est', 'ce', 'que', 'qui', 'quoi', 'comment', 'puis', 'peut', 'peux', 'faire', 'avez', 'faites', 'proposez', 'y', 'il', 'ya', 'sur', 'dans', 'plus', 'quel', 'quels', 'quelle', 'quelles', 'se', 'passe', 'l', 'd', 's'];

  function lev(a, b) {
    var m = a.length, n = b.length, i, j, d = [];
    for (i = 0; i <= m; i++) { d[i] = [i]; }
    for (j = 1; j <= n; j++) { d[0][j] = j; }
    for (i = 1; i <= m; i++) {
      for (j = 1; j <= n; j++) {
        d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      }
    }
    return d[m][n];
  }
  function similar(w, t) {
    if (w === t) return 1;
    if (w.length >= 5 && t.length >= 5 && (w.indexOf(t) === 0 || t.indexOf(w) === 0)) return 0.85;
    if (w.length >= 5 && t.length >= 5 && lev(w, t) <= (w.length > 7 ? 2 : 1)) return 0.7;
    return 0;
  }

  var INDEX = FAQ.map(function (item) {
    var tokens = norm(item.q).split(' ').filter(function (w) { return w.length > 1 && STOP.indexOf(w) < 0; });
    var keys = item.k.map(norm);
    return { item: item, tokens: tokens, keys: keys };
  });

  function answer(input) {
    var text = norm(input);
    var words = text.split(' ').filter(function (w) { return w.length > 1 && STOP.indexOf(w) < 0; });
    if (!words.length) return null;
    var best = null, bestScore = 0;
    INDEX.forEach(function (e) {
      var score = 0;
      e.keys.forEach(function (k) {
        if (k.indexOf(' ') > -1) { if (text.indexOf(k) > -1) score += 3; return; }
        words.forEach(function (w) { score += 2.5 * similar(w, k); });
      });
      words.forEach(function (w) {
        e.tokens.forEach(function (t) { score += 1 * similar(w, t); });
      });
      if (score > bestScore) { bestScore = score; best = e.item; }
    });
    return bestScore >= 1.5 ? best : null;
  }

  /* ---------- ICÔNES ---------- */
  var ICON_CHAT = '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.5-4.7A8 8 0 1 1 21 12Z"/><circle cx="8.5" cy="12" r=".9" fill="currentColor"/><circle cx="12" cy="12" r=".9" fill="currentColor"/><circle cx="15.5" cy="12" r=".9" fill="currentColor"/></svg>';
  var ICON_SEND = '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M3.4 20.4 21 12 3.4 3.6 3.3 10l12.2 2-12.2 2z"/></svg>';
  var ICON_CLOSE = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>';
  var ICON_LEAF = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14"/><path d="M5 19c3-4 6-7 10-9"/></svg>';

  /* ---------- INTERFACE CSS ---------- */
  var css = '' +
    /* Bouton flottant */
    '#ja-chat-btn{position:fixed;right:18px;bottom:18px;z-index:9998;width:60px;height:60px;border-radius:50%;border:0;cursor:pointer;background:#2b5a3c;color:#fff;box-shadow:0 8px 24px rgba(43,90,60,.45);display:flex;align-items:center;justify-content:center;-webkit-tap-highlight-color:transparent;transition:transform .15s}' +
    '#ja-chat-btn:hover{transform:scale(1.06)}' +
    '#ja-badge{position:absolute;top:-2px;right:-2px;min-width:20px;height:20px;border-radius:10px;background:#a4162b;color:#fff;font:700 12px/20px "Plus Jakarta Sans",system-ui,sans-serif;text-align:center;border:2px solid #fff;padding:0 4px;box-sizing:border-box}' +
    '#ja-tip{position:fixed;right:18px;bottom:90px;z-index:9997;max-width:230px;background:#a4162b;color:#fff;padding:12px 30px 12px 14px;border-radius:14px;font:600 14px/1.4 "Plus Jakarta Sans",system-ui,sans-serif;box-shadow:0 8px 24px rgba(0,0,0,.25);display:none;cursor:pointer}' +
    '#ja-tip.show{display:block}' +
    '#ja-tip::after{content:"";position:absolute;bottom:-9px;right:22px;border:9px solid transparent;border-top-color:#a4162b;border-bottom:0}' +
    '#ja-tip button{position:absolute;top:4px;right:6px;background:none;border:0;color:#fff;font-size:18px;cursor:pointer;line-height:1}' +
    '@media (prefers-reduced-motion:no-preference){#ja-tip.show{animation:jaBob 1.6s ease-in-out infinite}@keyframes jaBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}}' +
    '#ja-chat-btn:focus-visible,#ja-chat button:focus-visible,#ja-chat input:focus-visible,#ja-chat a:focus-visible{outline:3px solid #a4162b;outline-offset:2px}' +

    /* Fenêtre : plein écran sur mobile (hauteur ajustée au clavier par JS), pop-up sur PC */
    '#ja-chat{position:fixed;top:0;left:0;right:0;height:100%;z-index:99999;background:#f4f5f1;display:none;flex-direction:column;font-family:"Plus Jakarta Sans",system-ui,sans-serif;color:#222;overscroll-behavior:contain}' +
    'body.ja-lock{overflow:hidden;position:fixed;width:100%}' +
    '@media (min-width:600px){#ja-chat{top:auto;left:auto;right:18px;bottom:92px;width:380px;height:580px;max-height:calc(100vh - 110px);border-radius:18px;box-shadow:0 16px 48px rgba(0,0,0,.28);overflow:hidden}}' +
    '#ja-chat.open{display:flex}' +
    '@media (prefers-reduced-motion:no-preference){#ja-chat.open{animation:jaPop .22s ease-out}@keyframes jaPop{from{opacity:0;transform:translateY(12px) scale(.98)}to{opacity:1;transform:none}}}' +

    /* En-tête */
    '#ja-chat header{background:#2b5a3c;color:#fff;padding:12px 14px;padding-top:max(12px,env(safe-area-inset-top));display:flex;align-items:center;gap:12px;flex-shrink:0;box-shadow:0 2px 8px rgba(0,0,0,.15)}' +
    '.ja-avatar{position:relative;width:40px;height:40px;border-radius:50%;background:#e9f2ec;color:#2b5a3c;display:flex;align-items:center;justify-content:center;flex-shrink:0}' +
    '.ja-avatar.sm{width:28px;height:28px}' +
    '.ja-avatar.sm svg{width:16px;height:16px}' +
    '.ja-dot{position:absolute;right:0;bottom:0;width:11px;height:11px;border-radius:50%;background:#3ddc84;border:2px solid #2b5a3c}' +
    '.ja-title{flex:1;min-width:0;line-height:1.25}' +
    '.ja-title strong{display:block;font-family:"Playfair Display",Georgia,serif;font-size:17px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}' +
    '.ja-title span{font-size:12.5px;opacity:.85}' +
    '#ja-chat header button{background:rgba(255,255,255,.18);border:0;color:#fff;width:34px;height:34px;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center}' +
    '#ja-chat header button:hover{background:rgba(255,255,255,.3)}' +

    /* Messages */
    '#ja-msgs{flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;padding:14px 12px;display:flex;flex-direction:column;gap:4px;scroll-behavior:smooth}' +
    '.ja-day{align-self:center;background:#e4e7df;color:#5b6357;font-size:12px;font-weight:600;padding:4px 12px;border-radius:999px;margin:2px 0 10px}' +
    '.ja-row{display:flex;align-items:flex-end;gap:8px;margin-top:8px}' +
    '.ja-row.user{justify-content:flex-end}' +
    '.ja-row.cont{margin-top:0}' +
    '.ja-row.cont .ja-avatar{visibility:hidden}' +
    '.ja-col{display:flex;flex-direction:column;max-width:78%}' +
    '.ja-row.user .ja-col{align-items:flex-end}' +
    '.ja-m{padding:10px 14px;border-radius:18px;font-size:15px;line-height:1.5;word-wrap:break-word;overflow-wrap:anywhere}' +
    '.ja-m a{font-weight:600}' +
    '.ja-bot{background:#fff;border:1px solid #e3e5dd;border-bottom-left-radius:5px;box-shadow:0 1px 2px rgba(0,0,0,.04)}' +
    '.ja-bot a{color:#a4162b}' +
    '.ja-user{background:#2b5a3c;color:#fff;border-bottom-right-radius:5px}' +
    '.ja-time{font-size:11px;color:#8a9085;margin:3px 6px 0}' +

    /* Photos envoyées par l’assistant */
    '.ja-gal{display:flex;gap:6px;margin-top:10px}' +
    '.ja-gal img{flex:1;min-width:0;width:100%;aspect-ratio:1;object-fit:cover;border-radius:12px;cursor:pointer;display:block;background:#e4e7df}' +
    '#ja-zoom{position:fixed;top:0;left:0;right:0;bottom:0;z-index:100000;background:rgba(0,0,0,.88);display:flex;align-items:center;justify-content:center;padding:16px}' +
    '#ja-zoom img{max-width:100%;max-height:100%;border-radius:12px}' +

    /* Indicateur « en train d’écrire » */
    '.ja-typing{display:inline-flex;gap:4px;padding:14px 16px}' +
    '.ja-typing i{width:7px;height:7px;border-radius:50%;background:#9aa394;display:block}' +
    '@media (prefers-reduced-motion:no-preference){.ja-typing i{animation:jaDot 1.1s infinite ease-in-out}.ja-typing i:nth-child(2){animation-delay:.15s}.ja-typing i:nth-child(3){animation-delay:.3s}@keyframes jaDot{0%,60%,100%{transform:translateY(0);opacity:.5}30%{transform:translateY(-5px);opacity:1}}}' +

    /* Suggestions */
    '.ja-sugg{display:flex;flex-wrap:wrap;gap:8px;margin:10px 0 2px 36px}' +
    '.ja-sugg button{border:1px solid #2b5a3c;background:#fff;color:#2b5a3c;border-radius:999px;padding:8px 14px;font-size:13.5px;cursor:pointer;font-family:inherit;font-weight:500;transition:background .15s,color .15s}' +
    '.ja-sugg button:hover{background:#2b5a3c;color:#fff}' +

    /* Boutons de contact */
    '.ja-cta{display:flex;flex-direction:column;gap:8px;margin-top:10px}' +
    '.ja-cta a{display:block;text-align:center;text-decoration:none;padding:11px 14px;border-radius:999px;font-size:14px;font-weight:600}' +
    '.ja-cta .p{background:#2b5a3c;color:#fff}' +
    '.ja-cta .s{border:1px solid #2b5a3c;color:#2b5a3c}' +

    /* Saisie */
    '#ja-form{display:flex;align-items:center;gap:8px;padding:10px 12px;background:#fff;border-top:1px solid #e3e5dd;flex-shrink:0}' +
    '#ja-input{flex:1;border:1px solid #d9dcd3;background:#f4f5f1;border-radius:999px;padding:12px 16px;font-size:16px;font-family:inherit;min-width:0;-webkit-appearance:none;color:#222}' +
    '#ja-input:focus{border-color:#2b5a3c;background:#fff;outline:none}' +
    '#ja-send{border:0;background:#a4162b;color:#fff;width:44px;height:44px;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:opacity .15s,transform .15s}' +
    '#ja-send:disabled{opacity:.4;cursor:default}' +
    '#ja-send:not(:disabled):hover{transform:scale(1.06)}' +
    '.ja-foot{background:#fff;text-align:center;font-size:11px;color:#8a9085;padding:0 12px 8px;padding-bottom:max(8px,env(safe-area-inset-bottom))}' +
    '@media (prefers-reduced-motion:no-preference){.ja-row{animation:jaIn .2s ease-out}@keyframes jaIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}}';

  function el(tag, attrs, html) {
    var e = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { e.setAttribute(k, attrs[k]); });
    if (html) e.innerHTML = html;
    return e;
  }
  function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function now() {
    var d = new Date();
    return ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2);
  }
  function gallery(list) {
    return '<div class="ja-gal">' + list.map(function (s) {
      return '<img src="' + s + '" alt="Bouquet Jardin Agro" loading="lazy">';
    }).join('') + '</div>';
  }

  function init() {
    var style = el('style'); style.textContent = css; document.head.appendChild(style);

    var btn = el('button', { id: 'ja-chat-btn', type: 'button', 'aria-label': 'Ouvrir l’assistant Jardin Agro', 'aria-expanded': 'false' }, ICON_CHAT + '<span id="ja-badge">1</span>');
    var box = el('div', { id: 'ja-chat', role: 'dialog', 'aria-label': BOT_NAME });
    box.innerHTML =
      '<header>' +
        '<div class="ja-avatar">' + ICON_LEAF + '<span class="ja-dot"></span></div>' +
        '<div class="ja-title"><strong>' + BOT_NAME + '</strong><span>En ligne · répond tout de suite</span></div>' +
        '<button type="button" aria-label="Fermer">' + ICON_CLOSE + '</button>' +
      '</header>' +
      '<div id="ja-msgs" aria-live="polite"></div>' +
      '<form id="ja-form" autocomplete="off">' +
        '<input id="ja-input" type="text" placeholder="Écrivez votre message…" aria-label="Votre message" enterkeyhint="send">' +
        '<button id="ja-send" type="submit" aria-label="Envoyer" disabled>' + ICON_SEND + '</button>' +
      '</form>' +
      '<div class="ja-foot">Assistant automatique · Jardin Agro</div>';
    document.body.appendChild(btn);
    document.body.appendChild(box);

    var tip = el('div', { id: 'ja-tip', role: 'status' }, 'Voici l’IA de Jardin Agro 🤖<br>Vous avez des questions ?<button type="button" aria-label="Fermer l’indication">×</button>');
    document.body.appendChild(tip);
    function hideTip() {
      tip.classList.remove('show');
      try { sessionStorage.setItem('jaTipSeen', '1'); } catch (e) {}
    }
    tip.querySelector('button').addEventListener('click', function (e) { e.stopPropagation(); hideTip(); });
    tip.addEventListener('click', function () { hideTip(); toggle(true); });
    var seen = false;
    try { seen = sessionStorage.getItem('jaTipSeen') === '1'; } catch (e) {}
    if (!seen) { setTimeout(function () { if (!box.classList.contains('open')) tip.classList.add('show'); }, 1500); }

    var msgs = box.querySelector('#ja-msgs');
    var input = box.querySelector('#ja-input');
    var send = box.querySelector('#ja-send');
    var badge = btn.querySelector('#ja-badge');
    var started = false;
    var lastWho = null;
    var typingRow = null;
    var locked = false;
    var savedScroll = 0;

    function scrollDown() { msgs.scrollTop = msgs.scrollHeight; }

    /* ---- Mobile : la fenêtre suit la zone visible (clavier) ---- */
    function fitViewport() {
      var vv = window.visualViewport;
      if (!vv || window.innerWidth >= 600 || !box.classList.contains('open')) {
        box.style.height = '';
        box.style.top = '';
        return;
      }
      box.style.height = vv.height + 'px';
      box.style.top = vv.offsetTop + 'px';
      window.scrollTo(0, 0);
      scrollDown();
    }
    function lockPage(lock) {
      if (lock === locked || window.innerWidth >= 600) return;
      locked = lock;
      if (lock) {
        savedScroll = window.pageYOffset || 0;
        document.body.style.top = -savedScroll + 'px';
        document.body.classList.add('ja-lock');
      } else {
        document.body.classList.remove('ja-lock');
        document.body.style.top = '';
        window.scrollTo(0, savedScroll);
      }
    }
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', fitViewport);
      window.visualViewport.addEventListener('scroll', fitViewport);
    }

    function add(html, who) {
      var isUser = who === 'user';
      var cont = lastWho === who;
      var row = el('div', { 'class': 'ja-row ' + (isUser ? 'user' : 'bot') + (cont ? ' cont' : '') });
      if (!isUser) row.appendChild(el('div', { 'class': 'ja-avatar sm' }, ICON_LEAF));
      var col = el('div', { 'class': 'ja-col' });
      col.appendChild(el('div', { 'class': 'ja-m ' + (isUser ? 'ja-user' : 'ja-bot') }, html));
      col.appendChild(el('div', { 'class': 'ja-time' }, now()));
      row.appendChild(col);
      msgs.appendChild(row);
      lastWho = who;
      scrollDown();
      /* les photos changent la hauteur après chargement */
      Array.prototype.forEach.call(row.querySelectorAll('img'), function (im) {
        im.addEventListener('load', scrollDown);
        im.addEventListener('error', function () { im.style.display = 'none'; });
      });
      return row;
    }

    function showTyping() {
      hideTyping();
      var row = el('div', { 'class': 'ja-row bot' + (lastWho === 'bot' ? ' cont' : '') });
      row.appendChild(el('div', { 'class': 'ja-avatar sm' }, ICON_LEAF));
      row.appendChild(el('div', { 'class': 'ja-m ja-bot ja-typing', 'aria-label': 'L’assistant écrit…' }, '<i></i><i></i><i></i>'));
      msgs.appendChild(row);
      typingRow = row;
      scrollDown();
    }
    function hideTyping() {
      if (typingRow && typingRow.parentNode) typingRow.parentNode.removeChild(typingRow);
      typingRow = null;
    }

    function contactBlock() {
      return '<div class="ja-cta"><a class="p" href="' + CONTACT_PAGE + '">Contacter le service client</a>' +
        '<a class="s" href="tel:' + PHONE_TEL + '">Appeler le ' + PHONE_DISPLAY + '</a></div>';
    }

    function botSays(html, after) {
      showTyping();
      var plain = html.replace(/<[^>]+>/g, '');
      var delay = Math.min(1400, 500 + plain.length * 6);
      setTimeout(function () {
        hideTyping();
        add(html, 'bot');
        if (after) after();
      }, delay);
    }

    function reply(text) {
      add(esc(text), 'user');
      var found = answer(text);
      if (found) {
        botSays(found.a + (found.img && found.img.length ? gallery(found.img) : ''));
      } else {
        botSays('Je n’ai pas la réponse à cette question, mais notre service client se fera un plaisir de vous aider 🌿' + contactBlock());
      }
    }

    function start() {
      if (started) return; started = true;
      msgs.appendChild(el('div', { 'class': 'ja-day' }, 'Aujourd’hui'));
      botSays(GREETING, function () {
        var wrap = el('div', { 'class': 'ja-sugg' });
        SUGGESTIONS.forEach(function (s) {
          var b = el('button', { type: 'button' }); b.textContent = s;
          b.addEventListener('click', function () {
            if (wrap.parentNode) wrap.parentNode.removeChild(wrap);
            reply(s);
          });
          wrap.appendChild(b);
        });
        msgs.appendChild(wrap);
        scrollDown();
      });
    }

    function toggle(open) {
      var willOpen = typeof open === 'boolean' ? open : !box.classList.contains('open');
      box.classList.toggle('open', willOpen);
      btn.setAttribute('aria-expanded', String(willOpen));
      btn.style.display = (willOpen && window.innerWidth < 600) ? 'none' : 'flex';
      lockPage(willOpen);
      fitViewport();
      if (willOpen) { hideTip(); badge.style.display = 'none'; start(); setTimeout(function () { input.focus(); }, 50); }
    }

    /* Agrandir une photo au toucher */
    msgs.addEventListener('click', function (e) {
      if (e.target.tagName !== 'IMG') return;
      var z = el('div', { id: 'ja-zoom' }, '<img src="' + e.target.src + '" alt="">');
      z.addEventListener('click', function () { z.parentNode && z.parentNode.removeChild(z); });
      document.body.appendChild(z);
    });

    btn.addEventListener('click', function () { toggle(); });
    box.querySelector('header button').addEventListener('click', function () { toggle(false); btn.focus(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') toggle(false); });
    window.addEventListener('resize', function () {
      btn.style.display = (box.classList.contains('open') && window.innerWidth < 600) ? 'none' : 'flex';
      fitViewport();
    });
    input.addEventListener('input', function () { send.disabled = !input.value.trim(); });
    box.querySelector('#ja-form').addEventListener('submit', function (e) {
      e.preventDefault();
      var v = input.value.trim();
      if (!v) return;
      input.value = '';
      send.disabled = true;
      reply(v);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
