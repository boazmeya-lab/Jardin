/* =========================================================================
   PRODUCT-DETAILS.JS — Jardin Agro
   ========================================================================= */
// 1. Récupération de l'ID depuis l'URL (ex: product-detail.html?id=2)
const urlParams = new URLSearchParams(window.location.search);
const selectedProductId = parseInt(urlParams.get('id')) || 1; // 1 par défaut si pas d'id

// 2. Base de données synchronisée avec les identifiants de products.js
const PRODUCT_DATA = {
  models: [
    {
      id: 1,
      name: "Composition Reception VIP",
      basePrice: 45.0,
      description: "Composition florale haut de gamme pour accueils de prestige.",
      images: ["image/hotel.jpg", "image/hotel-2.jpg", "image/hotel-3.jpg"]
    },
    {
      id: 2,
      name: "Bouquet Hall d'Accueil",
      basePrice: 60.0,
      description: "Roses, lys étoilés et gypsophile, composés à la main pour un rendu généreux.",
      images: ["image/couverture.jpg", "image/rose2.jpg", "image/rose3.jpg"]
    },
    {
      id: 3,
      name: "Abonnement Bureau Exécutif",
      basePrice: 35.0,
      description: "Arrangement floral épuré conçu spécialement pour les espaces de travail.",
      images: ["image/bureau.jpg", "image/bureau-2.jpg", "image/bureau-3.jpg"]
    },
    {
      id: 4,
      name: "Décoration Pupitre & Scène",
      basePrice: 80.0,
      description: "Décoration florale sur-mesure pour scènes, conférences et séminaires.",
      images: ["image/evenement.jpg", "image/evenement-2.jpg", "image/evenement-3.jpg"]
    },
    {
      id: 5,
      name: "Bouquet Nuptial Élégance",
      basePrice: 50.0,
      description: "Bouquet de mariée élégant aux teintes douces et raffinées.",
      images: ["image/mariage.jpg", "image/mariage-2.jpg", "image/mariage-3.jpg"]
    },
    {
      id: 6,
      name: "Couronne d'Hommage Royale",
      basePrice: 70.0,
      description: "Composition solennelle pour exprimer vos condoléances avec respect.",
      images: ["image/finerail.jpg", "image/finerail-2.jpg", "image/finerail-3.jpg"]
    }
  ],

  colors: [
    { id: "rose", name: "Rose", image: "image/color-rose.jpg" },
    { id: "blanc", name: "Blanc", image: "image/color-blanc.jpg" }
  ],

  vases: [
    { id: "none", name: "Sans vase (bouquet seul)", price: 0, included: true },
    { id: "verre", name: "Vase transparent", price: 8, included: false }
  ]
};

// 3. Sélection automatique du produit selon l'URL
const initialModel = PRODUCT_DATA.models.find(m => m.id === selectedProductId) || PRODUCT_DATA.models[0];

// 4. Initialisation de l'état avec le bon produit
const state = {
  modelId: initialModel.id,
  colorId: PRODUCT_DATA.colors[0].id,
  vaseId: PRODUCT_DATA.vases[0].id,
  quantity: 1,
  activeImage: 0,
  message: ""
};

const WHATSAPP_NUMBER = "15551234567";

// 1. LIRE L'ID DANS L'URL (Ex: product-details.html?id=printaniere)
const urlParams = new URLSearchParams(window.location.search);
const selectedProductId = urlParams.get('id'); 

// 2. BASE DE DONNÉES DE TOUS VOS PRODUITS
const PRODUCT_DATA = {
  models: [
    {
      id: "hall-accueil",
      name: "Bouquet Hall d'Accueil",
      basePrice: 45.0,
      description: "Composition majestueuse de roses, lys étoilés et gypsophile, idéal pour marquer les esprits dès l'entrée.",
      images: [
        "image/rose1.jpg",
        "image/rose2.jpg",
        "image/rose3.jpg"
      ]
    },
    {
      id: "printaniere",
      name: "Douceur Printanière",
      basePrice: 38.0,
      description: "Un mélange léger de fleurs de saison aux teintes pastel, pour une ambiance fraîche et lumineuse.",
      images: [
        "image/printemps1.jpg",
        "image/printemps2.jpg",
        "image/printemps3.jpg"
      ]
    },
    {
      id: "prestige",
      name: "Bouquet Prestige",
      basePrice: 62.0,
      description: "Une composition ample et raffinée avec des fleurs premium, idéale pour les grandes occasions.",
      images: [
        "image/prestige1.jpg",
        "image/prestige2.jpg",
        "image/prestige3.jpg"
      ]
    }
  ],

  colors: [
    { id: "rose", name: "Rose", image: "image/color-rose.jpg" },
    { id: "blanc", name: "Blanc", image: "image/color-blanc.jpg" }
  ],

  vases: [
    { id: "none", name: "Sans vase (bouquet seul)", price: 0, included: true },
    { id: "verre", name: "Vase transparent", price: 8, included: false }
  ]
};

// 3. SELECTIONNER LE BON PRODUIT (si l'ID existe dans l'URL, sinon prends le premier par défaut)
const initialModel = PRODUCT_DATA.models.find(m => m.id === selectedProductId) || PRODUCT_DATA.models[0];

/* -------------------------------------------------------------------------
   ÉTAT INITIAL
   ---------------------------------------------------------------------- */
const state = {
  modelId: initialModel.id, // Sélectionne le produit de l'URL
  colorId: PRODUCT_DATA.colors[0].id,
  vaseId: PRODUCT_DATA.vases[0].id,
  quantity: 1,
  activeImage: 0,
  message: ""
};

// ... Gardez le reste de votre code (fonctions currentModel, renderHeader, init, etc.)


/* -------------------------------------------------------------------------
   ÉTAT DE LA SÉLECTION
   ---------------------------------------------------------------------- */
const state = {
  modelId: PRODUCT_DATA.models[0].id,
  colorId: PRODUCT_DATA.colors[0].id,
  vaseId: PRODUCT_DATA.vases[0].id,
  quantity: 1,
  activeImage: 0,
  message: "",
};

function currentModel() { return PRODUCT_DATA.models.find(m => m.id === state.modelId); }
function currentColor() { return PRODUCT_DATA.colors.find(c => c.id === state.colorId); }
function currentVase()  { return PRODUCT_DATA.vases.find(v => v.id === state.vaseId); }

/* -------------------------------------------------------------------------
   FONCTIONS DE RAFRAÎCHISSEMENT D'AFFICHAGE
   ---------------------------------------------------------------------- */
function money(n) { return "$" + n.toFixed(2); }

function refreshForSelectedModel() {
  renderHeader();
  renderGallery();
  renderPricing();
}

function renderHeader() {
  const model = currentModel();
  // Mise à jour stricte du nom et de la description spécifiques au modèle cliqué
  document.getElementById("productTitle").textContent = model.name;
  document.getElementById("productSubtitle").textContent = model.description;
}

function renderGallery() {
  const model = currentModel();
  
  // Galerie principale
  model.images.forEach((src, i) => {
    const mainImg = document.getElementById("galleryMain" + i);
    if (mainImg) mainImg.src = src;
  });
  
  setActiveImage(0);

  // Indicators / Points de navigation
  const dots = document.getElementById("galleryDots");
  if (dots) {
    dots.innerHTML = "";
    model.images.forEach((_, i) => {
      const d = document.createElement("span");
      if (i === state.activeImage) d.classList.add("active");
      dots.appendChild(d);
    });
  }

  // Miniatures
  const thumbs = document.getElementById("thumbs");
  if (thumbs) {
    thumbs.innerHTML = "";
    model.images.forEach((src, i) => {
      const b = document.createElement("button");
      b.className = i === state.activeImage ? "active" : "";
      b.innerHTML = `<img src="${src}" alt="Miniature ${i + 1}">`;
      b.addEventListener("click", () => setActiveImage(i));
      thumbs.appendChild(b);
    });
  }
}

function setActiveImage(index) {
  state.activeImage = index;
  document.querySelectorAll(".gallery-img").forEach((img, i) => {
    img.classList.toggle("active", i === index);
  });
  document.querySelectorAll("#galleryDots span").forEach((d, i) => {
    d.classList.toggle("active", i === index);
  });
  document.querySelectorAll("#thumbs button").forEach((b, i) => {
    b.classList.toggle("active", i === index);
  });
}

function renderModels() {
  const scroll = document.getElementById("modelScroll");
  if (!scroll) return;
  
  scroll.innerHTML = "";
  PRODUCT_DATA.models.forEach(model => {
    const card = document.createElement("button");
    card.className = "model-card" + (model.id === state.modelId ? " active" : "");
    card.innerHTML = `
      <img src="${model.images[0]}" alt="${model.name}">
      <div class="mc-info">
        <div class="mc-name">${model.name}</div>
        <div class="mc-price">${money(model.basePrice)}</div>
      </div>`;
    
    // Clic sur un modèle : Mise à jour de l'état + Rafraîchissement complet
    card.addEventListener("click", () => {
      state.modelId = model.id;
      renderModels();
      refreshForSelectedModel();
    });
    
    scroll.appendChild(card);
  });

  document.getElementById("modelSelectedLabel").textContent = currentModel().name;
}

function renderColors() {
  const wrap = document.getElementById("swatches");
  if (!wrap) return;
  
  wrap.innerHTML = "";
  PRODUCT_DATA.colors.forEach(color => {
    const el = document.createElement("button");
    el.className = "swatch" + (color.id === state.colorId ? " active" : "");
    el.innerHTML = `<span class="dot"><img src="${color.image}" alt="${color.name}"></span><span class="label">${color.name}</span>`;
    el.addEventListener("click", () => {
      state.colorId = color.id;
      renderColors();
    });
    wrap.appendChild(el);
  });
  document.getElementById("colorSelectedLabel").textContent = currentColor().name;
}

function renderVases() {
  const grid = document.getElementById("vaseGrid");
  if (!grid) return;

  grid.innerHTML = "";
  PRODUCT_DATA.vases.forEach(vase => {
    const card = document.createElement("button");
    card.className = "vase-card" + (vase.id === state.vaseId ? " active" : "");
    const priceLabel = vase.included ? "Inclus" : "+" + money(vase.price);
    card.innerHTML = `
      <img src="${vase.image}" alt="${vase.name}">
      <div class="vc-info">
        <div class="vc-name">${vase.name}</div>
        <div class="vc-price ${vase.included ? "included" : ""}">${priceLabel}</div>
      </div>`;
    card.addEventListener("click", () => {
      state.vaseId = vase.id;
      renderVases();
      renderPricing();
    });
    grid.appendChild(card);
  });
  document.getElementById("vaseSelectedLabel").textContent = currentVase().name;
}

function renderPricing() {
  const model = currentModel();
  const vase = currentVase();
  const unitPrice = model.basePrice + vase.price;
  const total = unitPrice * state.quantity;

  const basePriceDisp = document.getElementById("basePriceDisplay");
  if (basePriceDisp) basePriceDisp.textContent = money(model.basePrice);

  document.getElementById("brModelLabel").textContent = model.name;
  document.getElementById("brModelPrice").textContent = money(model.basePrice);

  document.getElementById("brVaseLabel").textContent = vase.name;
  document.getElementById("brVasePrice").textContent = vase.included ? "Inclus" : "+" + money(vase.price);

  document.getElementById("brQtyLabel").textContent = "Quantité";
  document.getElementById("brQtyValue").textContent = "× " + state.quantity;

  document.getElementById("brTotal").textContent = money(total);
  
  const stickyTotal = document.getElementById("stickyTotal");
  if (stickyTotal) stickyTotal.textContent = money(total);
}

/* -------------------------------------------------------------------------
   ÉVÉNEMENTS (QUANTITÉ / MESSAGE / WHATSAPP)
   ---------------------------------------------------------------------- */
function bindQuantity() {
  const input = document.getElementById("qtyInput");
  const minus = document.getElementById("qtyMinus");
  const plus = document.getElementById("qtyPlus");

  if (minus && input) {
    minus.addEventListener("click", () => {
      if (state.quantity > 1) {
        state.quantity--;
        input.value = state.quantity;
        renderPricing();
      }
    });
  }

  if (plus && input) {
    plus.addEventListener("click", () => {
      if (state.quantity < 99) {
        state.quantity++;
        input.value = state.quantity;
        renderPricing();
      }
    });
  }
}

function bindMessage() {
  const textarea = document.getElementById("cardMessage");
  if (textarea) {
    textarea.addEventListener("input", (e) => {
      state.message = e.target.value;
    });
  }
}

function buildWhatsAppMessage() {
  const model = currentModel();
  const color = currentColor();
  const vase = currentVase();
  const unitPrice = model.basePrice + vase.price;
  const total = unitPrice * state.quantity;

  let lines = [
    `Bonjour Jardin Agro 🌸 je souhaite commander :`,
    ``,
    `• Produit : ${model.name}`, // Affiche uniquement le nom du produit sélectionné
    `• Couleur : ${color.name}`,
    `• Vase : ${vase.name}${vase.included ? "" : " (+" + money(vase.price) + ")"}`,
    `• Quantité : ${state.quantity}`,
    `• Total : ${money(total)}`,
  ];

  if (state.message.trim()) {
    lines.push(``, `Message pour la carte : "${state.message.trim()}"`);
  }

  return lines.join("\n");
}

function bindWhatsAppButton() {
  const btn = document.getElementById("whatsappBtn");
  if (btn) {
    btn.addEventListener("click", () => {
      const text = encodeURIComponent(buildWhatsAppMessage());
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
      window.open(url, "_blank");
    });
  }
}

/* -------------------------------------------------------------------------
   INITIALISATION
   ---------------------------------------------------------------------- */
function init() {
  renderModels();
  refreshForSelectedModel();
  renderColors();
  renderVases();
  bindQuantity();
  bindMessage();
  bindWhatsAppButton();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
