/* =========================================================================
   PRODUCT-DETAILS.JS — Jardin Agro
   ========================================================================= */

const WHATSAPP_NUMBER = "15551234567"; // Remplacez par votre numéro

// 1. LIRE L'ID DANS L'URL (Ex: product-details.html?id=2)
const urlParams = new URLSearchParams(window.location.search);
const selectedProductId = parseInt(urlParams.get('id')) || 1; 

// 2. BASE DE DONNÉES SYNCHRONISÉE
// -> Chaque produit possède désormais ses PROPRES couleurs et vases.
const PRODUCT_DATA = {
  models: [
    {
      id: 1,
      name: "fleurs xxl",
      basePrice: 45.0,
      description: "Composition florale haut de gamme pour accueils de prestige.",
      images: ["image/hotel1.jpg", "image/hotel2.jpg", "image/logi.png"],
      colors: [
        { id: "rose", name: "rose", image: "image/hotel1.jpg" },
        { id: "blanc", name: "rouge-jaune", image: "image/hotel2.jpg" }
      ],
      vases: [
        { id: "none", name: "Sans vase (bouquet seul)", price: 0, included: true },
        { id: "verre", name: "Vase transparent", price: 8, included: false, image: "image/vase2.jpg" }
      ]
    },
    {
      id: 2,
      name: "coeur de boaz",
      basePrice: 05.0,
      description: "Roses, lys étoilés et gypsophile, composés à la main pour un rendu généreux.",
      images: ["image/boaz1.jpg", "image/Boaz2.jpg", "image/Boaz3.jpg"],
      colors: [
        { id: "rose", name: "verte", image: "image/boaz1.jpg" },
        { id: "blanc", name: "verte", image: "image/Boaz2.jpg" }
      ],
      vases: [
        { id: "none", name: "Sans vase (bouquet seul)", price: 0, included: true },
        { id: "verre", name: "Vase transparent", price: 8, included: false, image: "image/vase3.jpg" }
      ]
    },
    {
      id: 3,
      name: "Abonnement Bureau Exécutif",
      basePrice: 35.0,
      description: "Arrangement floral épuré conçu spécialement pour les espaces de travail.",
      images: ["image/bureau.jpg", "image/bureau-2.jpg", "image/bureau-3.jpg"],
      colors: [
        { id: "rose", name: "Rose", image: "image/bureau.jpg" },
        { id: "blanc", name: "Blanc", image: "image/bureau-2.jpg" }
      ],
      vases: [
        { id: "none", name: "Sans vase (bouquet seul)", price: 0, included: true },
        { id: "verre", name: "Vase transparent", price: 8, included: false, image: "image/vase4.jpg" }
      ]
    },
    {
      id: 4,
      name: "Décoration Pupitre & Scène",
      basePrice: 80.0,
      description: "Décoration florale sur-mesure pour scènes, conférences et séminaires.",
      images: ["image/evenement.jpg", "image/evenement-2.jpg", "image/evenement-3.jpg"],
      colors: [
        { id: "rose", name: "Rose", image: "image/evenement.jpg" },
        { id: "blanc", name: "Blanc", image: "image/evenement-2.jpg" }
      ],
      vases: [
        { id: "none", name: "Sans vase (bouquet seul)", price: 0, included: true },
        { id: "verre", name: "Vase transparent", price: 8, included: false, image: "image/vase1.jpg" }
      ]
    },
    {
      id: 5,
      name: "rose",
      basePrice: 50.0,
      description: "Bouquet de mariée élégant aux teintes douces et raffinées.",
      images: ["image/rose1", "image/rose2.jpg", "image/rose3.jpg"],
      colors: [
        { id: "rose", name: "Rose", image: "image/rose1.jpg" },
        { id: "blanc", name: "Blanc", image: "image/rose2.jpg" }
      ],
      vases: [
        { id: "none", name: "Sans vase (bouquet seul)", price: 0, included: true },
        { id: "verre", name: "Vase transparent", price: 8, included: false, image: "image/vase1.jpg" }
      ]
    },
    {
      id: 6,
      name: "Couronne d'Hommage Royale",
      basePrice: 70.0,
      description: "Composition solennelle pour exprimer vos condoléances avec respect.",
      images: ["image/finerail.jpg", "image/finerail-2.jpg", "image/finerail-3.jpg"],
      colors: [
        { id: "rose", name: "Rose", image: "image/finerail.jpg" },
        { id: "blanc", name: "Blanc", image: "image/finerail-2.jpg" }
      ],
      vases: [
        { id: "none", name: "Sans vase (bouquet seul)", price: 0, included: true },
        { id: "verre", name: "Vase transparent", price: 8, included: false, image: "image/vase1.jpg" }
      ]
    }
  ]
};

// 3. SÉLECTION DU PRODUIT DE L'URL
const initialModel = PRODUCT_DATA.models.find(m => m.id === selectedProductId) || PRODUCT_DATA.models[0];

// 4. ÉTAT DE LA SÉLECTION
const state = {
  modelId: initialModel.id, // Forcé sur le produit de l'URL
  colorId: initialModel.colors[0].id,
  vaseId: initialModel.vases[0].id,
  quantity: 1,
  activeImage: 0,
  message: "",
};

function currentModel() { 
  return PRODUCT_DATA.models.find(m => m.id === state.modelId) || PRODUCT_DATA.models[0]; 
}
function currentColor() { 
  const model = currentModel();
  return model.colors.find(c => c.id === state.colorId) || model.colors[0]; 
}
function currentVase()  { 
  const model = currentModel();
  return model.vases.find(v => v.id === state.vaseId) || model.vases[0]; 
}

/* -------------------------------------------------------------------------
   FONCTIONS D'AFFICHAGE DYNAMIQUE
   ---------------------------------------------------------------------- */
function money(n) { return "$" + n.toFixed(2); }

function refreshForSelectedModel() {
  renderHeader();
  renderGallery();
  // Les couleurs et vases changent d'un produit à l'autre : on les redessine aussi.
  renderColors();
  renderVases();
  renderPricing();
}

function renderHeader() {
  const model = currentModel();
  
  // Forcer l'écriture du titre et de la description
  const titleEl = document.getElementById("productTitle");
  const subEl = document.getElementById("productSubtitle");
  
  if (titleEl) titleEl.innerHTML = model.name;
  if (subEl) subEl.innerHTML = model.description;
}

function renderGallery() {
  const model = currentModel();
  if (!model || !model.images) return;

  // Image principale
  const mainImg = document.getElementById("galleryMain0") || document.getElementById("mainImage");
  if (mainImg) mainImg.src = model.images[0];

  model.images.forEach((src, i) => {
    const imgEl = document.getElementById("galleryMain" + i);
    if (imgEl) imgEl.src = src;
  });
  
  setActiveImage(0);

  const dots = document.getElementById("galleryDots");
  if (dots) {
    dots.innerHTML = "";
    model.images.forEach((_, i) => {
      const d = document.createElement("span");
      if (i === state.activeImage) d.classList.add("active");
      dots.appendChild(d);
    });
  }

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
    
    card.addEventListener("click", () => {
      state.modelId = model.id;
      // Nouveau produit -> on réinitialise couleur et vase sur ses propres options par défaut
      state.colorId = model.colors[0].id;
      state.vaseId = model.vases[0].id;
      renderModels();
      refreshForSelectedModel();
    });
    
    scroll.appendChild(card);
  });

  const label = document.getElementById("modelSelectedLabel");
  if (label) label.textContent = currentModel().name;
}

function renderColors() {
  const wrap = document.getElementById("swatches");
  if (!wrap) return;

  const model = currentModel();
  wrap.innerHTML = "";
  model.colors.forEach(color => {
    const el = document.createElement("button");
    el.className = "swatch" + (color.id === state.colorId ? " active" : "");
    el.innerHTML = `<span class="dot"><img src="${color.image}" alt="${color.name}"></span><span class="label">${color.name}</span>`;
    el.addEventListener("click", () => {
      state.colorId = color.id;
      renderColors();
    });
    wrap.appendChild(el);
  });
  
  const label = document.getElementById("colorSelectedLabel");
  if (label) label.textContent = currentColor().name;
}

function renderVases() {
  const grid = document.getElementById("vaseGrid");
  if (!grid) return;

  const model = currentModel();
  grid.innerHTML = "";
  model.vases.forEach(vase => {
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
  
  const label = document.getElementById("vaseSelectedLabel");
  if (label) label.textContent = currentVase().name;
}

function renderPricing() {
  const model = currentModel();
  const vase = currentVase();
  const unitPrice = model.basePrice + vase.price;
  const total = unitPrice * state.quantity;

  // Prix de base sous le titre
  const basePriceDisp = document.getElementById("basePriceDisplay");
  if (basePriceDisp) basePriceDisp.textContent = money(model.basePrice);

  // Lignes du tableau récapitulatif
  const brModelLabel = document.getElementById("brModelLabel");
  if (brModelLabel) brModelLabel.textContent = model.name;

  const brModelPrice = document.getElementById("brModelPrice");
  if (brModelPrice) brModelPrice.textContent = money(model.basePrice);

  const brVaseLabel = document.getElementById("brVaseLabel");
  if (brVaseLabel) brVaseLabel.textContent = vase.name;

  const brVasePrice = document.getElementById("brVasePrice");
  if (brVasePrice) brVasePrice.textContent = vase.included ? "Inclus" : "+" + money(vase.price);

  const brQtyValue = document.getElementById("brQtyValue");
  if (brQtyValue) brQtyValue.textContent = "× " + state.quantity;

  const brTotal = document.getElementById("brTotal");
  if (brTotal) brTotal.textContent = money(total);
  
  const stickyTotal = document.getElementById("stickyTotal");
  if (stickyTotal) stickyTotal.textContent = money(total);
}

/* -------------------------------------------------------------------------
   COMMANDE WHATSAPP ET FORMULAIRE
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
    `• Produit : ${model.name}`,
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
   INIT (Exécution ordonnée)
   ---------------------------------------------------------------------- */
function init() {
  // 1. Synchroniser le state avec l'ID sélectionné
  state.modelId = initialModel.id;
  state.colorId = initialModel.colors[0].id;
  state.vaseId = initialModel.vases[0].id;

  // 2. Mettre à jour l'en-tête, les photos, les couleurs, les vases et les prix tout de suite
  refreshForSelectedModel();

  // 3. Charger le reste des éléments UI
  renderModels();
  
  // 4. Activer les boutons
  bindQuantity();
  bindMessage();
  bindWhatsAppButton();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
