<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>Créez votre bouquet — Jardin Agro</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

  :root{
    --ivoire: #F7F5F3;
    --ivoire-2: #EFEBE5;
    --vert-fonce: #2E5B38;
    --vert-fonce-hover: #23472C;
    --vert-mousse: #3F6E4A;
    --vert-sauge: #8FAE95;
    --rose-poudre: #D9A9A0;
    --rose-fonce: #B11A29;
    --or: #D4AF37;
    --encre: #1A1616;
    --ligne: #EAE6E2;
    --whatsapp: #25D366;
    --whatsapp-hover: #1EB956;
    --radius: 4px;
  }

  *{ box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
  html{ touch-action: manipulation; } /* empêche le double-tap-zoom sur iOS */
  html,body{ margin:0; padding:0; }
  body{
    background: var(--ivoire);
    color: var(--encre);
    font-family: 'Plus Jakarta Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  button, .swatch, .stepper button{ touch-action: manipulation; }
  h1,h2,h3, .display{
    font-family: 'Playfair Display', serif;
    font-weight: 600;
    color: var(--vert-fonce);
    margin: 0;
  }

  /* ---------- Header (aligné sur la page d'accueil) ---------- */
  .site-header{
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    display:flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 48px;
    background: rgba(255, 255, 255, 0.95);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
    border-bottom: 1px solid var(--ligne);
    gap: 16px;
  }
  .brand-block{ display:flex; align-items:center; gap: 12px; text-decoration:none; }
  .site-logo{
    height: 45px;
    width: auto;
    object-fit: contain;
    display: block;
  }
  .site-logo.hidden{ display:none; }
  .brand{
    font-family:'Playfair Display', serif;
    font-weight: 700;
    font-size: 22px;
    color: var(--vert-fonce);
    letter-spacing: 0.01em;
  }
  .site-header nav{
    display:flex; gap: 28px;
    font-size: 0.95rem;
    font-weight: 500;
  }
  .site-header nav a{
    text-decoration: none;
    color: var(--encre);
    transition: color 0.2s ease;
  }
  .site-header nav a:hover{ color: var(--vert-fonce); }
  .header-right{ display:flex; align-items:center; gap: 14px; }

  .cart-btn{
    position: relative;
    display:flex; align-items:center; gap: 8px;
    border:1px solid var(--vert-mousse);
    border-radius: 20px;
    padding: 7px 16px;
    font-size: 13px;
    color: var(--vert-fonce);
    background: transparent;
    cursor: pointer;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
  .cart-btn:hover{ background: var(--ivoire-2); }
  .cart-badge{
    background: var(--vert-fonce); color: var(--ivoire);
    border-radius: 50%;
    min-width: 18px; height: 18px;
    font-size: 11px;
    display:flex; align-items:center; justify-content:center;
    padding: 0 4px;
  }

  /* ---------- Panneau panier ---------- */
  .cart-overlay{
    position: fixed; inset: 0;
    background: rgba(26,22,22,0.25);
    z-index: 200;
    display:none;
  }
  .cart-overlay.open{ display:block; }
  .cart-panel{
    position: fixed; top:0; right:0; bottom:0;
    width: min(380px, 100%);
    background: var(--ivoire);
    box-shadow: -8px 0 24px rgba(0,0,0,0.12);
    z-index: 201;
    display:flex; flex-direction: column;
    padding: 24px;
    transform: translateX(100%);
    transition: transform 0.25s ease;
  }
  .cart-overlay.open .cart-panel{ transform: translateX(0); }
  .cart-panel-header{ display:flex; justify-content: space-between; align-items:center; margin-bottom: 18px; }
  .cart-close{ background:none; border:none; font-size: 20px; cursor:pointer; color: var(--vert-mousse); }
  .cart-items{ flex:1; overflow-y:auto; }
  .cart-item{ border-bottom: 1px solid var(--ligne); padding: 12px 0; font-size: 13px; color: var(--vert-mousse); }
  .cart-item .cart-item-top{ display:flex; justify-content: space-between; color: var(--vert-fonce); font-size: 14px; margin-bottom: 4px; }
  .cart-item .remove-item{ background:none; border:none; color: var(--rose-fonce); font-size: 12px; cursor:pointer; padding: 0; margin-top: 4px; }
  .cart-empty{ color: var(--vert-sauge); font-size: 14px; text-align:center; margin-top: 40px; }
  .cart-total{ display:flex; justify-content: space-between; padding: 14px 0; border-top: 1px solid var(--ligne); font-size: 16px; color: var(--vert-fonce); }
  .cart-panel .btn{ width: 100%; }

  .intro{
    max-width: 640px;
    padding: 46px 48px 8px;
  }
  .intro h1{ font-size: 42px; line-height: 1.15; }
  .intro p{
    color: var(--vert-mousse);
    font-size: 16px;
    line-height: 1.6;
    margin-top: 14px;
    max-width: 520px;
  }

  /* ---------- Layout ---------- */
  .builder{
    display:grid;
    grid-template-columns: 1.05fr 1fr;
    gap: 40px;
    padding: 20px 48px 80px;
    align-items: start;
  }

  /* ---------- Catalogue ---------- */
  .catalog-group + .catalog-group{ margin-top: 30px; }
  .catalog-group h2{
    font-size: 20px;
    font-style: italic;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--ligne);
    margin-bottom: 6px;
  }

  .flower-row{
    display:grid;
    grid-template-columns: 64px 1fr auto;
    align-items:center;
    gap: 16px;
    padding: 14px 4px;
    border-bottom: 1px solid var(--ligne);
  }
  .flower-thumb{
    width: 64px; height: 76px;
    display:flex; align-items:flex-end; justify-content:center;
    background: var(--ivoire-2);
    border-radius: var(--radius);
    overflow: hidden;
  }
  .flower-thumb img{ width: 90%; height: 92%; object-fit: contain; }

  .flower-meta .name{ font-size: 16px; color: var(--encre); }
  .flower-meta .price{ font-size: 13px; color: var(--vert-mousse); margin-top: 2px; }

  .stepper{
    display:flex; align-items:center; gap: 10px;
    justify-self: end;
  }
  .stepper button{
    width: 32px; height: 32px;
    border-radius: 50%;
    border: 1px solid var(--vert-mousse);
    background: transparent;
    color: var(--vert-fonce);
    font-size: 16px;
    line-height: 1;
    cursor: pointer;
    display:flex; align-items:center; justify-content:center;
    transition: background 0.15s ease, color 0.15s ease;
  }
  .stepper button:hover{ background: var(--vert-fonce); color: var(--ivoire); }
  .stepper button:disabled{ opacity: 0.3; cursor: default; }
  .stepper button:disabled:hover{ background: transparent; color: var(--vert-fonce); }
  .stepper .qty{ width: 18px; text-align:center; font-size: 15px; }

  /* ---------- Aperçu ---------- */
  .preview-panel{ position: sticky; top: 24px; }
  .stage-frame{
    background: linear-gradient(180deg, #FFFFFF 0%, var(--ivoire-2) 100%);
    border: 1px solid var(--ligne);
    border-radius: var(--radius);
    padding: 18px 18px 0;
  }
  .stage-label{
    display:flex; justify-content: space-between; align-items:center;
    font-size: 13px; color: var(--vert-mousse); padding-bottom: 10px;
  }
  .stage-label .count{ color: var(--vert-fonce); }

  .bouquet-stage{
    position: relative;
    height: 460px;
    overflow: hidden;
  }
  .bouquet-empty{
    position:absolute; inset:0;
    display:flex; align-items:center; justify-content:center;
    flex-direction: column;
    color: var(--vert-sauge);
    text-align:center;
    font-size: 14px;
    gap: 6px;
  }
  .bouquet-empty .display{ font-size: 22px; color: var(--vert-sauge); font-style: italic; }

  .flower-instance{
    position:absolute;
    bottom: var(--grip-y);
    left: 50%;
    width: var(--w);
    height: var(--h);
    transform-origin: 50% 100%;
    transform: translateX(-50%) translateX(var(--jx)) rotate(var(--rot)) scale(var(--sc));
    transition: opacity 0.25s ease;
  }
  .flower-instance img{ width:100%; height:100%; object-fit: contain; object-position: bottom center; display:block; }

  .wrap-cone{
    position:absolute;
    left:50%; bottom: 6px;
    width: 190px; height: 130px;
    transform: translateX(-50%);
    border-radius: 50% 50% 4px 4px / 65% 65% 4px 4px;
    transition: background 0.25s ease;
    z-index: 40;
    box-shadow: 0 2px 6px rgba(0,0,0,0.08);
  }
  /* Le ruban est descendu plus bas sur le bouquet, vers le bas de l'emballage */
  .ribbon-band{
    position:absolute;
    left:50%; bottom: 40px;
    width: 130px; height: 22px;
    transform: translateX(-50%);
    z-index: 41;
    overflow: hidden;
    border-radius: 2px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.15);
  }
  .ribbon-bow{
    position:absolute; left:50%; bottom: 44px;
    width: 46px; height: 30px;
    transform: translateX(-50%);
    z-index: 42;
    overflow: hidden;
    border-radius: 50%;
    box-shadow: 0 1px 3px rgba(0,0,0,0.18);
  }
  .ribbon-band img, .ribbon-bow img{
    width: 100%; height: 100%;
    object-fit: cover;
    display: block;
  }

  /* ---------- Options ---------- */
  .options{ margin-top: 26px; }
  .option-block + .option-block{ margin-top: 22px; }
  .option-block h3{ font-size: 15px; font-weight: 500; color: var(--vert-fonce); margin-bottom: 10px; font-family:'Plus Jakarta Sans'; }
  .swatch-row{ display:flex; gap: 12px; flex-wrap: wrap; }
  .swatch{
    width: 40px; height: 40px;
    border-radius: 50%;
    border: 2px solid transparent;
    cursor: pointer;
    position: relative;
    background-size: cover;
    background-position: center;
    box-shadow: inset 0 0 0 1px rgba(0,0,0,0.08);
  }
  .swatch[data-selected="true"]{ border-color: var(--vert-fonce); }

  /* ---------- Récap prix ---------- */
  .summary{
    margin-top: 30px;
    border-top: 1px solid var(--ligne);
    padding-top: 18px;
  }
  .summary-line{
    display:flex; justify-content: space-between;
    font-size: 14px; color: var(--vert-mousse);
    padding: 3px 0;
  }
  .summary-total{
    display:flex; justify-content: space-between;
    align-items: baseline;
    padding-top: 10px;
    margin-top: 6px;
    border-top: 1px solid var(--ligne);
  }
  .summary-total .label{ font-size: 15px; color: var(--vert-fonce); }
  .summary-total .value{ font-family:'Playfair Display', serif; font-size: 30px; color: var(--vert-fonce); }

  .actions{ margin-top: 22px; display:flex; flex-direction: column; gap: 10px; }
  .btn{
    border: none;
    padding: 14px 26px;
    border-radius: 999px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    font-family: 'Plus Jakarta Sans', sans-serif;
    transition: opacity 0.15s ease, background 0.15s ease;
  }
  .btn-primary{ background: var(--vert-fonce); color: var(--ivoire); }
  .btn-primary:hover{ background: var(--vert-fonce-hover); }
  .btn-secondary{
    background: transparent; color: var(--vert-fonce);
    border: 1px solid var(--vert-mousse);
  }
  .btn-secondary:hover{ background: var(--ivoire-2); }
  .btn-whatsapp{
    background: var(--whatsapp); color: var(--ivoire);
    display:flex; align-items:center; justify-content:center; gap: 8px;
  }
  .btn-whatsapp:hover{ background: var(--whatsapp-hover); }
  .btn[disabled]{ opacity: 0.4; cursor: default; }

  .toast{
    position: fixed; bottom: 26px; left: 50%;
    transform: translateX(-50%) translateY(20px);
    background: var(--vert-fonce); color: var(--ivoire);
    padding: 12px 22px; border-radius: 3px; font-size: 14px;
    opacity: 0; pointer-events:none;
    transition: opacity 0.25s ease, transform 0.25s ease;
    z-index: 100;
  }
  .toast.visible{ opacity: 1; transform: translateX(-50%) translateY(0); }

  @media (max-width: 880px){
    .site-header{ padding: 14px 20px; }
    .site-header nav{ display:none; }
    .intro{ padding: 30px 20px 4px; }
    .intro h1{ font-size: 32px; }
    .builder{ grid-template-columns: 1fr; padding: 16px 20px 60px; gap: 30px; }
    .preview-panel{ position: static; order: -1; }
    .bouquet-stage{ height: 380px; }
  }
</style>
</head>
<body>

<header class="site-header">
  <a class="brand-block" href="index.html">
    <!-- LOGO : placez votre fichier logo (ex. logo.png) à la racine du site,
         ou changez le chemin ci-dessous. S'il est introuvable, il est
         simplement masqué et le nom "Jardin Agro" reste affiché seul. -->
    <img class="site-logo" id="siteLogo" src="images/logo.png" alt="Jardin Agro" onerror="this.classList.add('hidden')">
    <div class="brand">Jardin Agro</div>
  </a>
  <nav>
    <a href="index.html">Accueil</a>
    <a href="products.html">Catalogue &amp; Services</a>
    <a href="index.html#livraison">Livraison</a>
    <a href="index.html#contact">Contact</a>
  </nav>
  <div class="header-right">
    <button class="cart-btn" id="cartToggleBtn">
      🛍️ Panier <span class="cart-badge" id="cartBadge">0</span>
    </button>
  </div>
</header>

<!-- ================= PANNEAU PANIER ================= -->
<div class="cart-overlay" id="cartOverlay">
  <div class="cart-panel">
    <div class="cart-panel-header">
      <h2 style="font-size:22px;">Votre panier</h2>
      <button class="cart-close" id="cartCloseBtn">✕</button>
    </div>
    <div class="cart-items" id="cartItems"></div>
    <div class="cart-total">
      <span>Total</span>
      <span id="cartTotal">0,00 $</span>
    </div>
    <button class="btn btn-whatsapp" id="cartWhatsappBtn">📱 Commander sur WhatsApp</button>
  </div>
</div>

<section class="intro">
  <h1>Créez votre bouquet</h1>
  <p>Choisissez vos fleurs une à une, ajustez les quantités, et composez un bouquet qui vous ressemble. L'aperçu se construit sous vos yeux, tige après tige.</p>
</section>

<main class="builder">

  <!-- ================= CATALOGUE ================= -->
  <div class="catalog">
    <div class="catalog-group">
      <h2>Fleurs principales</h2>
      <div id="catalog-focale"></div>
    </div>
    <div class="catalog-group">
      <h2>Feuillages &amp; fleurs légères</h2>
      <div id="catalog-feuillage"></div>
    </div>
  </div>

  <!-- ================= APERÇU ================= -->
  <div class="preview-panel">
    <div class="stage-frame">
      <div class="stage-label">
        <span>Votre bouquet</span>
        <span class="count" id="stemCount">0 tige</span>
      </div>
      <div class="bouquet-stage" id="bouquetStage">
        <div class="bouquet-empty" id="bouquetEmpty">
          <div class="display">En attente de vos premières fleurs</div>
          <div>Ajoutez une fleur dans le catalogue à gauche</div>
        </div>
        <div class="wrap-cone" id="wrapCone" style="background: transparent;"></div>
        <!-- flower instances injected here -->
        <div class="ribbon-band" id="ribbonBand" style="display:none;"><img id="ribbonBandImg" alt="Ruban"></div>
        <div class="ribbon-bow" id="ribbonBow" style="display:none;"><img id="ribbonBowImg" alt=""></div>
      </div>
    </div>

    <div class="options">
      <div class="option-block">
        <h3>Emballage</h3>
        <div class="swatch-row" id="wrapSwatches"></div>
      </div>
      <div class="option-block">
        <h3>Ruban</h3>
        <div class="swatch-row" id="ribbonSwatches"></div>
      </div>
    </div>

    <div class="summary">
      <div class="summary-line" id="lineFlowers"><span>Fleurs</span><span>0,00 $</span></div>
      <div class="summary-line" id="lineWrap"><span>Emballage</span><span>0,00 $</span></div>
      <div class="summary-total">
        <span class="label">Total</span>
        <span class="value" id="totalPrice">0,00 $</span>
      </div>
    </div>

    <div class="actions">
      <button class="btn btn-primary" id="addToCartBtn" disabled>Ajouter mon bouquet au panier</button>
      <button class="btn btn-secondary" id="resetBtn">Réinitialiser mon bouquet</button>
      <button class="btn btn-whatsapp" id="orderWhatsappBtn" disabled>📱 Commander sur WhatsApp</button>
    </div>
  </div>

</main>

<div class="toast" id="toast"></div>

<script>
/* =========================================================================
   0. RÉGLAGES
   Remplacez le numéro ci-dessous par le vôtre, au format international
   SANS le "+" ni espaces : indicatif pays + numéro complet.
   Exemple Québec/Canada : 1 514 555 1234  ->  "15145551234"
   ========================================================================= */
const WHATSAPP_NUMBER = "15145551234"; // <-- À REMPLACER par votre numéro

/* =========================================================================
   1. DONNÉES DES FLEURS
   ========================================================================= */
const FLOWERS = [
  { id:'rose-rouge',   name:'Rose rouge',    price:2.0, category:'focale',    type:'rose',       color:'#A8394A', dark:'#7C2735', image:"image/rose-rouge.png" },
  { id:'rose-blanche', name:'Rose blanche',  price:2.0, category:'focale',    type:'rose',       color:'#FBF8F1', dark:'#E4D9C6', image:"image/rose12.png" },
  { id:'rose-rose',    name:'Rose rose',     price:2.2, category:'focale',    type:'rose',       color:'#E2A6B4', dark:'#C77E90', image:"image/rose-rose1.png" },
  { id:'tulipe',       name:'Tulipe',        price:1.8, category:'focale',    type:'tulip',      color:'#D85C77', dark:'#B03F58', image:"image/bryant2.png" },
  { id:'tournesol',    name:'Tournesol',     price:2.5, category:'focale',    type:'sunflower',  color:'#EFB93B', dark:'#6B4A2A', image:"image/nehemie.png" },
  { id:'lys',          name:'Lys',           price:3.0, category:'focale',    type:'lily',       color:'#FBF3E3', dark:'#D9A544', image:"image/david.png" },
  { id:'eucalyptus',   name:'Eucalyptus',    price:1.0, category:'feuillage', type:'eucalyptus', color:'#8FAE8C', dark:'#5C7A5C', image:"image/eucalyptus1.png" },
  { id:'gypsophile',   name:'Gypsophile',    price:0.8, category:'feuillage', type:'gypsophila', color:'#FFFFFF', dark:'#C9C2B4', image:null },
];

const WRAPPINGS = [
  { id:'blanc', name:'Papier blanc', price:2,   swatch:'#FBFAF7', image:"image/emballage 1.png" },
  { id:'rose',  name:'Papier rose',  price:2,   swatch:'#EBC9C3', image:"image/emballage2.png" },
  { id:'kraft', name:'Papier kraft', price:1.5, swatch:'#C7A579', image:"image/emballage3.png"},
  { id:'noir',  name:'Papier noir',  price:2.5, swatch:'#2B2A28', image: "image/emballage 4.png" },
];

const RIBBONS = [
  { id:'blanc', name:'Blanc', swatch:'#FBFAF7', image:"image/ruban2.jpg" },
  { id:'rouge', name:'Rouge', swatch:'#A8394A', image:null },
  { id:'rose',  name:'Rose',  swatch:'#D9A9A0', image:null },
  { id:'noir',  name:'Noir',  swatch:'#2B2A28', image:null },
  { id:'dore',  name:'Doré',  swatch:'#B08A4E', image:null },
];

/* Remarque : NOTE_IMAGES_CORRIGEES
   - Chemins remis en "images/..." (au pluriel) : vérifiez que votre dossier
     GitHub s'appelle bien "images" et pas "image". Renommez le dossier ou
     ajustez les chemins ci-dessus pour qu'ils correspondent exactement.
   - L'espace involontaire dans " image/eucalyptus1.png " a été supprimé :
     un espace dans un chemin empêche l'image de se charger.
   - Pour le ruban : ajoutez simplement une photo dans le champ "image" de
     chaque entrée de RIBBONS (comme pour "blanc" ci-dessus). Si aucune photo
     n'est fournie, un visuel de secours dans la bonne couleur est généré
     automatiquement, exactement comme pour les fleurs. */

/* =========================================================================
   2. ÉTAT
   ========================================================================= */
const state = {
  quantities: {},
  wrapping: null,
  ribbon: RIBBONS[0].id,
};
FLOWERS.forEach(f => state.quantities[f.id] = 0);

/* =========================================================================
   3. IMAGES DE DÉMONSTRATION (utilisées seulement si "image" est null)
   ========================================================================= */
function petalPath(cx, cy, angleDeg, length, width, color){
  const rad = angleDeg * Math.PI/180;
  const tipX = cx + Math.cos(rad)*length;
  const tipY = cy + Math.sin(rad)*length;
  const perpX = Math.cos(rad+Math.PI/2)*width;
  const perpY = Math.sin(rad+Math.PI/2)*width;
  return `<path d="M ${cx-perpX},${cy-perpY} Q ${(cx+tipX)/2},${(cy+tipY)/2 - width} ${tipX},${tipY} Q ${(cx+tipX)/2},${(cy+tipY)/2 + width} ${cx+perpX},${cy+perpY} Z" fill="${color}" opacity="0.96"/>`;
}

function buildFlowerSVG(f){
  const stemColor = '#5C6E4F';
  const cx = 60;
  let bloom = '';
  const topY = f.type === 'eucalyptus' || f.type === 'gypsophila' ? 40 : 78;

  if(f.type === 'rose'){
    for(let ring=0; ring<2; ring++){
      const count = ring===0 ? 7 : 5;
      const radius = ring===0 ? 26 : 14;
      for(let i=0;i<count;i++){
        const a = (360/count)*i + ring*22;
        bloom += petalPath(cx, topY, a, radius, 9 - ring*2, ring===0 ? f.color : f.dark);
      }
    }
    bloom += `<circle cx="${cx}" cy="${topY}" r="6" fill="${f.dark}"/>`;
  } else if(f.type === 'tulip'){
    bloom += `<path d="M ${cx-20},${topY+14} Q ${cx-22},${topY-24} ${cx},${topY-30} Q ${cx+22},${topY-24} ${cx+20},${topY+14} Q ${cx+10},${topY+2} ${cx},${topY+8} Q ${cx-10},${topY+2} ${cx-20},${topY+14} Z" fill="${f.color}"/>`;
    bloom += `<path d="M ${cx-10},${topY-6} Q ${cx},${topY-24} ${cx+10},${topY-6}" fill="none" stroke="${f.dark}" stroke-width="1.5" opacity="0.5"/>`;
  } else if(f.type === 'sunflower'){
    for(let i=0;i<14;i++){
      const a = (360/14)*i;
      bloom += petalPath(cx, topY, a, 24, 6, f.color);
    }
    bloom += `<circle cx="${cx}" cy="${topY}" r="13" fill="${f.dark}"/>`;
  } else if(f.type === 'lily'){
    for(let i=0;i<6;i++){
      const a = (360/6)*i - 90;
      bloom += petalPath(cx, topY, a, 28, 7, f.color);
    }
    for(let i=0;i<3;i++){
      const a = i*40 - 40;
      const rad = a*Math.PI/180;
      bloom += `<line x1="${cx}" y1="${topY}" x2="${cx+Math.cos(rad)*16}" y2="${topY+Math.sin(rad)*16}" stroke="${f.dark}" stroke-width="1.4"/>`;
      bloom += `<circle cx="${cx+Math.cos(rad)*16}" cy="${topY+Math.sin(rad)*16}" r="1.8" fill="${f.dark}"/>`;
    }
  } else if(f.type === 'eucalyptus'){
    for(let y=50; y<230; y+=22){
      const side = (y/22)%2===0 ? 1 : -1;
      bloom += `<ellipse cx="${cx + side*13}" cy="${y}" rx="9" ry="5.5" fill="${f.color}" transform="rotate(${side*35} ${cx+side*13} ${y})"/>`;
    }
  } else if(f.type === 'gypsophila'){
    for(let i=0;i<26;i++){
      const y = 30 + Math.random()*70;
      const x = cx + (Math.random()-0.5)*70;
      bloom += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3" fill="${f.color}" stroke="${f.dark}" stroke-width="0.5"/>`;
    }
  }

  const leaves = (f.type==='eucalyptus'||f.type==='gypsophila') ? '' : `
    <ellipse cx="${cx-14}" cy="150" rx="16" ry="6" fill="${stemColor}" transform="rotate(-30 ${cx-14} 150)"/>
    <ellipse cx="${cx+15}" cy="190" rx="17" ry="6.5" fill="${stemColor}" transform="rotate(28 ${cx+15} 190)"/>`;

  const stem = `<path d="M ${cx},260 Q ${cx+4},170 ${cx},${topY+18}" fill="none" stroke="${stemColor}" stroke-width="4.5" stroke-linecap="round"/>`;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 260">${stem}${leaves}${bloom}</svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

FLOWERS.forEach(f => { f.resolvedImage = f.image || buildFlowerSVG(f); });

/* ---- Visuels de secours pour le ruban (bande + noeud), même logique
   que pour les fleurs : une vraie photo si "image" est renseignée,
   sinon un visuel généré dans la bonne couleur. ---- */
function buildRibbonBandSVG(color){
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 30">
    <rect width="200" height="30" fill="${color}"/>
    <rect width="200" height="7" y="0" fill="rgba(255,255,255,0.28)"/>
    <rect width="200" height="7" y="23" fill="rgba(0,0,0,0.12)"/>
  </svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

function buildRibbonBowSVG(color){
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46 30">
    <rect width="46" height="30" fill="${color}"/>
    <path d="M23,15 L4,4 Q0,15 4,26 Z" fill="rgba(255,255,255,0.18)"/>
    <path d="M23,15 L42,4 Q46,15 42,26 Z" fill="rgba(0,0,0,0.12)"/>
    <circle cx="23" cy="15" r="4.5" fill="rgba(0,0,0,0.15)"/>
  </svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

RIBBONS.forEach(r => {
  r.resolvedImage = r.image || buildRibbonBandSVG(r.swatch);
  r.resolvedBow = r.image || buildRibbonBowSVG(r.swatch);
});

/* =========================================================================
   4. RENDU DU CATALOGUE
   ========================================================================= */
function renderCatalog(){
  const groups = { focale: document.getElementById('catalog-focale'), feuillage: document.getElementById('catalog-feuillage') };
  Object.values(groups).forEach(g => g.innerHTML = '');

  FLOWERS.forEach(f => {
    const row = document.createElement('div');
    row.className = 'flower-row';
    row.innerHTML = `
      <div class="flower-thumb"><img src="${f.resolvedImage}" alt="${f.name}"></div>
      <div class="flower-meta">
        <div class="name">${f.name}</div>
        <div class="price">${f.price.toFixed(2).replace('.',',')} $ / fleur</div>
      </div>
      <div class="stepper">
        <button data-action="minus" data-id="${f.id}" aria-label="Retirer une ${f.name}" disabled>−</button>
        <span class="qty" id="qty-${f.id}">0</span>
        <button data-action="plus" data-id="${f.id}" aria-label="Ajouter une ${f.name}">+</button>
      </div>
    `;
    groups[f.category].appendChild(row);
  });

  document.querySelectorAll('.stepper button').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const delta = btn.dataset.action === 'plus' ? 1 : -1;
      changeQuantity(id, delta);
    });
  });
}

function changeQuantity(id, delta){
  const next = Math.max(0, Math.min(30, state.quantities[id] + delta));
  state.quantities[id] = next;
  document.getElementById('qty-' + id).textContent = next;
  const minusBtn = document.querySelector(`button[data-action="minus"][data-id="${id}"]`);
  if(minusBtn) minusBtn.disabled = next === 0;
  renderBouquet();
  updateSummary();
}

/* =========================================================================
   5. COMPOSITION DU BOUQUET
   ========================================================================= */
const GRIP_Y = 68;

function renderBouquet(){
  const stage = document.getElementById('bouquetStage');
  stage.querySelectorAll('.flower-instance').forEach(el => el.remove());

  const totalStems = FLOWERS.reduce((sum,f) => sum + state.quantities[f.id], 0);
  document.getElementById('bouquetEmpty').style.display = totalStems === 0 ? 'flex' : 'none';
  document.getElementById('stemCount').textContent = totalStems + (totalStems > 1 ? ' tiges' : ' tige');

  const order = FLOWERS.filter(f => f.category === 'feuillage').concat(FLOWERS.filter(f => f.category === 'focale'));

  let seed = 1;
  function rand(){ seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }

  order.forEach(f => {
    const qty = state.quantities[f.id];
    if(qty === 0) return;
    const isFoliage = f.category === 'feuillage';
    const spread = isFoliage ? 76 : 46;
    const baseHeight = isFoliage ? 260 : 230;

    for(let i=0; i<qty; i++){
      const t = qty === 1 ? 0.5 : i/(qty-1);
      const angle = (t - 0.5) * 2 * spread + (rand()-0.5)*10;
      const jitterX = (rand()-0.5)*18;
      const scale = 0.86 + rand()*0.26;
      const h = baseHeight * (0.94 + rand()*0.12);

      const el = document.createElement('div');
      el.className = 'flower-instance';
      el.style.setProperty('--grip-y', GRIP_Y + 'px');
      el.style.setProperty('--w', (h*0.46) + 'px');
      el.style.setProperty('--h', h + 'px');
      el.style.setProperty('--jx', jitterX + 'px');
      el.style.setProperty('--rot', angle.toFixed(1) + 'deg');
      el.style.setProperty('--sc', scale.toFixed(2));
      el.style.zIndex = isFoliage ? 10 + i : 20 + i;
      el.innerHTML = `<img src="${f.resolvedImage}" alt="${f.name}">`;
      stage.insertBefore(el, document.getElementById('ribbonBand'));
    }
  });

  updateWrapping();
  updateRibbon();
}

/* =========================================================================
   6. EMBALLAGE & RUBAN (couleur OU photo, si "image" est renseignée)
   ========================================================================= */
function renderSwatches(){
  const wrapRow = document.getElementById('wrapSwatches');
  wrapRow.innerHTML = '';
  WRAPPINGS.forEach(w => {
    const el = document.createElement('div');
    el.className = 'swatch';
    el.style.background = w.image ? `url("${w.image}") center/cover, ${w.swatch}` : w.swatch;
    el.dataset.id = w.id;
    el.title = w.name + ' — ' + w.price.toFixed(2).replace('.',',') + ' $';
    el.addEventListener('click', () => { state.wrapping = w.id; renderSwatches(); renderBouquet(); updateSummary(); });
    wrapRow.appendChild(el);
  });

  const ribbonRow = document.getElementById('ribbonSwatches');
  ribbonRow.innerHTML = '';
  RIBBONS.forEach(r => {
    const el = document.createElement('div');
    el.className = 'swatch';
    el.style.background = `url("${r.resolvedImage}") center/cover, ${r.swatch}`;
    el.dataset.id = r.id;
    el.title = r.name;
    el.dataset.selected = state.ribbon === r.id;
    el.addEventListener('click', () => { state.ribbon = r.id; renderSwatches(); updateRibbon(); });
    ribbonRow.appendChild(el);
  });
  wrapRow.querySelectorAll('.swatch').forEach(s => s.dataset.selected = s.dataset.id === state.wrapping);
}

function updateWrapping(){
  const cone = document.getElementById('wrapCone');
  const totalStems = FLOWERS.reduce((sum,f) => sum + state.quantities[f.id], 0);
  if(!state.wrapping || totalStems === 0){ cone.style.background = 'transparent'; return; }
  const w = WRAPPINGS.find(x => x.id === state.wrapping);
  cone.style.background = w.image ? `url("${w.image}") center/cover` : w.swatch;
}

function updateRibbon(){
  const band = document.getElementById('ribbonBand');
  const bow = document.getElementById('ribbonBow');
  const bandImg = document.getElementById('ribbonBandImg');
  const bowImg = document.getElementById('ribbonBowImg');
  const totalStems = FLOWERS.reduce((sum,f) => sum + state.quantities[f.id], 0);
  const r = RIBBONS.find(x => x.id === state.ribbon);
  const show = totalStems > 0;

  band.style.display = show ? 'block' : 'none';
  bow.style.display = show ? 'block' : 'none';

  if(show){
    bandImg.src = r.resolvedImage;
    bandImg.alt = 'Ruban ' + r.name;
    bowImg.src = r.resolvedBow;
    bowImg.alt = '';
  }
}

/* =========================================================================
   7. PRIX
   ========================================================================= */
function updateSummary(){
  const flowersTotal = FLOWERS.reduce((sum,f) => sum + f.price * state.quantities[f.id], 0);
  const wrapPrice = state.wrapping ? WRAPPINGS.find(w => w.id === state.wrapping).price : 0;
  const total = flowersTotal + wrapPrice;
  const totalStems = FLOWERS.reduce((sum,f) => sum + state.quantities[f.id], 0);

  document.querySelector('#lineFlowers span:last-child').textContent = flowersTotal.toFixed(2).replace('.',',') + ' $';
  document.querySelector('#lineWrap span:last-child').textContent = wrapPrice.toFixed(2).replace('.',',') + ' $';
  document.getElementById('totalPrice').textContent = total.toFixed(2).replace('.',',') + ' $';

  const canAct = totalStems > 0;
  document.getElementById('addToCartBtn').disabled = !canAct;
  document.getElementById('orderWhatsappBtn').disabled = !canAct;
}

/* =========================================================================
   8. PANIER — persistant via localStorage (clé partagée : "jardinAgroCart")
   Toute autre page de votre site qui lit cette même clé localStorage peut
   afficher/gérer le même panier (badge, page panier dédiée, etc.).
   Ceci fonctionne uniquement sur un vrai site hébergé (pas dans un aperçu
   d'éditeur) et par navigateur — pas de synchronisation entre appareils
   sans un vrai backend.
   ========================================================================= */
const CART_KEY = 'jardinAgroCart';

function getCart(){
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch(e){ return []; }
}
function saveCart(cart){
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  renderCartBadge();
}
function renderCartBadge(){
  const cart = getCart();
  document.getElementById('cartBadge').textContent = cart.length;
}

function buildCurrentBouquetOrder(){
  const flowersTotal = FLOWERS.reduce((sum,f) => sum + f.price * state.quantities[f.id], 0);
  const wrapPrice = state.wrapping ? WRAPPINGS.find(w => w.id === state.wrapping).price : 0;
  return {
    flowers: FLOWERS.filter(f => state.quantities[f.id] > 0).map(f => ({ id:f.id, name:f.name, qty:state.quantities[f.id], price:f.price })),
    wrapping: state.wrapping ? WRAPPINGS.find(w => w.id === state.wrapping).name : null,
    ribbon: RIBBONS.find(r => r.id === state.ribbon).name,
    total: +(flowersTotal + wrapPrice).toFixed(2),
  };
}

function orderToText(order){
  const lines = order.flowers.map(f => `- ${f.qty} × ${f.name}`);
  let msg = `Bonjour ! Je souhaite commander ce bouquet :\n${lines.join('\n')}`;
  if(order.wrapping) msg += `\nEmballage : ${order.wrapping}`;
  msg += `\nRuban : ${order.ribbon}`;
  msg += `\nTotal : ${order.total.toFixed(2).replace('.',',')} $`;
  return msg;
}

function openWhatsappOrder(order){
  const text = encodeURIComponent(orderToText(order));
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
}

document.getElementById('addToCartBtn').addEventListener('click', () => {
  const order = buildCurrentBouquetOrder();
  const cart = getCart();
  cart.push(order);
  saveCart(cart);
  showToast('Votre bouquet a été ajouté au panier');
});

document.getElementById('orderWhatsappBtn').addEventListener('click', () => {
  openWhatsappOrder(buildCurrentBouquetOrder());
});

document.getElementById('resetBtn').addEventListener('click', () => {
  FLOWERS.forEach(f => { state.quantities[f.id] = 0; document.getElementById('qty-'+f.id).textContent = 0; });
  document.querySelectorAll('.stepper button[data-action="minus"]').forEach(b => b.disabled = true);
  state.wrapping = null;
  renderSwatches();
  renderBouquet();
  updateSummary();
  showToast('Bouquet réinitialisé');
});

/* ---- Panneau panier (ouverture / fermeture / contenu) ---- */
const cartOverlay = document.getElementById('cartOverlay');
document.getElementById('cartToggleBtn').addEventListener('click', () => { renderCartPanel(); cartOverlay.classList.add('open'); });
document.getElementById('cartCloseBtn').addEventListener('click', () => cartOverlay.classList.remove('open'));
cartOverlay.addEventListener('click', (e) => { if(e.target === cartOverlay) cartOverlay.classList.remove('open'); });

function renderCartPanel(){
  const cart = getCart();
  const itemsEl = document.getElementById('cartItems');
  itemsEl.innerHTML = '';
  if(cart.length === 0){
    itemsEl.innerHTML = '<div class="cart-empty">Votre panier est vide</div>';
  } else {
    cart.forEach((order, index) => {
      const div = document.createElement('div');
      div.className = 'cart-item';
      const flowerList = order.flowers.map(f => `${f.qty} × ${f.name}`).join(', ');
      div.innerHTML = `
        <div class="cart-item-top"><span>Bouquet ${index+1}</span><span>${order.total.toFixed(2).replace('.',',')} $</span></div>
        <div>${flowerList}</div>
        <div>${order.wrapping ? order.wrapping + ' · ' : ''}Ruban ${order.ribbon}</div>
        <button class="remove-item" data-index="${index}">Retirer</button>
      `;
      itemsEl.appendChild(div);
    });
    itemsEl.querySelectorAll('.remove-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const cart = getCart();
        cart.splice(+btn.dataset.index, 1);
        saveCart(cart);
        renderCartPanel();
      });
    });
  }
  const total = cart.reduce((sum,o) => sum + o.total, 0);
  document.getElementById('cartTotal').textContent = total.toFixed(2).replace('.',',') + ' $';
}

document.getElementById('cartWhatsappBtn').addEventListener('click', () => {
  const cart = getCart();
  if(cart.length === 0){ showToast('Votre panier est vide'); return; }
  let msg = 'Bonjour ! Je souhaite commander :\n\n';
  cart.forEach((order, i) => { msg += `Bouquet ${i+1} :\n${orderToText(order).split('\n').slice(1).join('\n')}\n\n`; });
  const total = cart.reduce((sum,o) => sum + o.total, 0);
  msg += `Total général : ${total.toFixed(2).replace('.',',')} $`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
});

let toastTimer;
function showToast(message){
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 2200);
}

/* =========================================================================
   9. INITIALISATION
   ========================================================================= */
renderCatalog();
renderSwatches();
renderBouquet();
updateSummary();
renderCartBadge();
</script>
</body>
</html>
