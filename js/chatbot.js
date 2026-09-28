/* Jardin Agro – Assistant FAQ (100 % local, sans API)
   Installation : ajouter avant </body> de chaque page :
   <script src="js/chatbot.js" defer></script> */
(function () {
  'use strict';

  var PHONE_DISPLAY = '+243 831 982 374';
  var PHONE_TEL = '+243831982374';
  var CONTACT_PAGE = 'contact.html';

  /* ---------- BASE DE CONNAISSANCES ---------- */
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
  var SUGGESTIONS = ['Comment passer une commande ?', 'Délais de livraison', 'Conserver mes fleurs', 'Bouquet personnalisé'];

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

  /* ---------- INTERFACE CSS CORRIGÉE ---------- */
  var css = '' +
    '#ja-chat-btn{position:fixed;right:18px;bottom:18px;z-index:9998;width:58px;height:58px;border-radius:50%;border:0;cursor:pointer;background:#2b5a3c;color:#fff;box-shadow:0 6px 20px rgba(0,0,0,.25);display:flex;align-items:center;justify-content:center;font-size:26px;-webkit-tap-highlight-color:transparent}' +
    '#ja-tip{position:fixed;right:18px;bottom:90px;z-index:9997;max-width:230px;background:#a4162b;color:#fff;padding:12px 30px 12px 14px;border-radius:14px;font:600 14px/1.4 "Plus Jakarta Sans",system-ui,sans-serif;box-shadow:0 8px 24px rgba(0,0,0,.25);display:none}' +
    '#ja-tip.show{display:block}' +
    '#ja-tip::after{content:"";position:absolute;bottom:-9px;right:22px;border:9px solid transparent;border-top-color:#a4162b;border-bottom:0}' +
    '#ja-tip button{position:absolute;top:4px;right:6px;background:none;border:0;color:#fff;font-size:18px;cursor:pointer;line-height:1}' +
    '@media (prefers-reduced-motion:no-preference){#ja-tip.show{animation:jaBob 1.6s ease-in-out infinite}@keyframes jaBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}}' +
    '#ja-chat-btn:focus-visible,#ja-chat button:focus-visible,#ja-chat input:focus-visible,#ja-chat a:focus-visible{outline:3px solid #a4162b;outline-offset:2px}' +
    
    /* Configuration Plein écran / Pop-up PC */
    '#ja-chat{position:fixed;top:0;left:0;right:0;bottom:0;z-index:99999;background:#fff;display:none;flex-direction:column;font-family:"Plus Jakarta Sans",system-ui,sans-serif;color:#222}' +
    '@media (min-width:600px){#ja-chat{top:auto;left:auto;right:18px;bottom:88px;width:370px;height:560px;border-radius:16px;box-shadow:0 12px 40px rgba(0,0,0,.25);overflow:hidden}}' +
    '#ja-chat.open{display:flex}' +
    
    /* Header */
    '#ja-chat header{background:#2b5a3c;color:#fff;padding:16px;padding-top:max(16px, env(safe-area-inset-top));display:flex;align-items:center;justify-content:space-between;flex-shrink:0}' +
    '#ja-chat header strong{font-family:"Playfair Display",Georgia,serif;font-size:18px;font-weight:600}' +
    '#ja-chat header button{background:rgba(255,255,255,.2);border:0;color:#fff;font-size:18px;width:32px;height:32px;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;line-height:1}' +
    
    /* Zone de messages */
    '#ja-msgs{flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch;padding:16px;background:#f7f7f4;display:flex;flex-direction:column;gap:12px}' +
    '.ja-m{max-width:85%;padding:11px 15px;border-radius:16px;font-size:15px;line-height:1.5;word-wrap:break-word}' +
    '.ja-m a{color:#a4162b;font-weight:600}' +
    '.ja-bot{background:#fff;border:1px solid #e6e6e0;align-self:flex-start;border-bottom-left-radius:4px}' +
    '.ja-user{background:#2b5a3c;color:#fff;align-self:flex-end;border-bottom-right-radius:4px}' +
    '.ja-sugg{display:flex;flex-wrap:wrap;gap:8px;align-self:flex-start}' +
    '.ja-sugg button{border:1px solid #2b5a3c;background:#fff;color:#2b5a3c;border-radius:999px;padding:8px 14px;font-size:13.5px;cursor:pointer;font-family:inherit;font-weight:500}' +
    '.ja-cta{display:flex;flex-direction:column;gap:8px;margin-top:10px}' +
    '.ja-cta a{display:block;text-align:center;text-decoration:none;padding:11px 14px;border-radius:999px;font-size:14px;font-weight:600}' +
    '.ja-cta .p{background:#2b5a3c;color:#fff}' +
    '.ja-cta .s{border:1px solid #2b5a3c;color:#2b5a3c}' +
    
    /* Zone de saisie */
    '#ja-form{display:flex;gap:8px;padding:12px;padding-bottom:max(12px, env(safe-area-inset-bottom));border-top:1px solid #e6e6e0;background:#fff;flex-shrink:0}' +
    '#ja-input{flex:1;border:1px solid #d5d5cf;border-radius:999px;padding:12px 16px;font-size:16px!important;font-family:inherit;min-width:0;-webkit-appearance:none}' +
    '#ja-send{border:0;background:#a4162b;color:#fff;border-radius:999px;padding:0 18px;font-size:15px;font-weight:600;cursor:pointer;font-family:inherit}' +
    '@media (prefers-reduced-motion:no-preference){.ja-m{animation:jaIn .18s ease-out}@keyframes jaIn{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}}';

  function el(tag, attrs, html) {
    var e = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { e.setAttribute(k, attrs[k]); });
    if (html) e.innerHTML = html;
    return e;
  }
  function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  function init() {
    var style = el('style'); style.textContent = css; document.head.appendChild(style);

    var btn = el('button', { id: 'ja-chat-btn', 'aria-label': 'Ouvrir l’assistant Jardin Agro', 'aria-expanded': 'false' }, '🤖');
    var box = el('div', { id: 'ja-chat', role: 'dialog', 'aria-label': 'Assistant Jardin Agro' });
    box.innerHTML = '<header><strong>Jardin Agro</strong><button type="button" aria-label="Fermer">✕</button></header>' +
      '<div id="ja-msgs" aria-live="polite"></div>' +
      '<form id="ja-form" autocomplete="off"><input id="ja-input" type="text" placeholder="Votre question…" aria-label="Votre question"><button id="ja-send" type="submit">Envoyer</button></form>';
    document.body.appendChild(btn);
    document.body.appendChild(box);

    var tip = el('div', { id: 'ja-tip', role: 'status' }, 'Voici l’IA de Jardin Agro 🤖<br>Vous avez des questions ?<button type="button" aria-label="Fermer l’indication">×</button>');
    document.body.appendChild(tip);
    function hideTip() {
      tip.classList.remove('show');
      try { sessionStorage.setItem('jaTipSeen', '1'); } catch (e) {}
    }
    tip.querySelector('button').addEventListener('click', hideTip);
    tip.addEventListener('click', function (e) { if (e.target === tip) { hideTip(); toggle(true); } });
    var seen = false;
    try { seen = sessionStorage.setItem('jaTipSeen') === '1'; } catch (e) {}
    if (!seen) { setTimeout(function () { if (!box.classList.contains('open')) tip.classList.add('show'); }, 1500); }

    var msgs = box.querySelector('#ja-msgs');
    var input = box.querySelector('#ja-input');
    var started = false;

    function add(html, who) {
      var m = el('div', { 'class': 'ja-m ' + (who === 'user' ? 'ja-user' : 'ja-bot') }, html);
      msgs.appendChild(m);
      msgs.scrollTop = msgs.scrollHeight;
      return m;
    }
    function contactBlock() {
      return '<div class="ja-cta"><a class="p" href="' + CONTACT_PAGE + '">Contacter le service client</a>' +
        '<a class="s" href="tel:' + PHONE_TEL + '">Appeler le ' + PHONE_DISPLAY + '</a></div>';
    }
    function reply(text) {
      add(esc(text), 'user');
      var found = answer(text);
      setTimeout(function () {
        if (found) {
          add(found.a);
        } else {
          add('Je n’ai pas la réponse à cette question, mais notre service client se fera un plaisir de vous aider 🌿' + contactBlock());
        }
      }, 350);
    }
    function start() {
      if (started) return; started = true;
      add(GREETING);
      var wrap = el('div', { 'class': 'ja-sugg' });
      SUGGESTIONS.forEach(function (s) {
        var b = el('button', { type: 'button' }); b.textContent = s;
        b.addEventListener('click', function () { reply(s); });
        wrap.appendChild(b);
      });
      msgs.appendChild(wrap);
    }
    function toggle(open) {
      var willOpen = typeof open === 'boolean' ? open : !box.classList.contains('open');
      box.classList.toggle('open', willOpen);
      btn.setAttribute('aria-expanded', String(willOpen));
      if (willOpen) { hideTip(); start(); input.focus(); }
    }
    btn.addEventListener('click', function () { toggle(); });
    box.querySelector('header button').addEventListener('click', function () { toggle(false); btn.focus(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') toggle(false); });
    box.querySelector('#ja-form').addEventListener('submit', function (e) {
      e.preventDefault();
      var v = input.value.trim();
      if (!v) return;
      input.value = '';
      reply(v);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
