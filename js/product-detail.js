/* =========================================================================
   PRODUCT-DETAILS.JS — Jardin Agro
   ========================================================================= */

const WHATSAPP_NUMBER = "15551234567"; // Numéro WhatsApp (ex: 33612345678)

/* Génère un visuel SVG de remplacement pour les produits sans photo */
function placeholder(bg, accent, label) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="600">
      <defs>
        <radialGradient id="g" cx="50%" cy="35%" r="75%">
          <stop offset="0%" stop-color="${accent}"/>
          <stop offset="100%" stop-color="${bg}"/>
        </radialGradient>
      </defs>
      <rect width="600" height="600" fill="url(#g)"/>
      <text x="50%" y="52%" font-family="Georgia, serif" font-size="26" fill="#ffffffcc"
            text-anchor="middle" dominant-baseline="middle">${label}</text>
    </svg>`;
  return "data:image/svg+xml;base64," + btoa(svg);
}

/* -------------------------------------------------------------------------
   DONNÉES PRODUIT (Chaque modèle contient ses propres informations)
   ---------------------------------------------------------------------- */
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
      ],
    },
    {
      id: "printaniere",
      name: "Douceur Printanière",
      basePrice: 38.0,
      description: "Un mélange léger de fleurs de saison aux teintes pastel, pour une ambiance fraîche et lumineuse.",
      images: [
        placeholder("#2E4A33", "#F2CBD3", "Vue 1"),
        placeholder("#2E4A33", "#F2CBD3", "Vue 2"),
        placeholder("#2E4A33", "#F2CBD3", "Vue 3"),
      ],
    },
    {
      id: "prestige",
      name: "Bouquet Prestige",
      basePrice: 62.0,
      description: "Une composition ample et raffinée avec des fleurs premium, idéale pour les grandes occasions.",
      images: [
        placeholder("#3A2E23", "#D9A441", "Vue 1"),
        placeholder("#3A2E23", "#D9A441", "Vue 2"),
        placeholder("#3A2E23", "#D9A441", "Vue 3"),
      ],
    },
  ],

  colors: [
    { id: "rose",     name: "Rose",     image: placeholder("#E8B4BC", "#F6DEE2", "") },
    { id: "blanc",    name: "Blanc",    image: placeholder("#F7F4EE", "#FFFFFF", "") },
    { id: "bordeaux", name: "Bordeaux", image: placeholder("#7A2438", "#B5495B", "") },
    { id: "pastel",   name: "Pastel",   image: placeholder("#F0D9C4", "#F7E4D3", "") },
  ],

  vases: [
    { id: "none",      name: "Sans vase (bouquet seul)", price: 0,  included: true,  image: placeholder("#DCE5D6", "#B7C9AE", "Sans vase") },
    { id: "verre",     name: "Vase transparent",         price: 8,  included: false, image: placeholder("#CFE0E8", "#8FB4C4", "Verre") },
    { id: "ceramique", name: "Vase céramique blanc",     price: 14, included: false, image: placeholder("#EDE7DD", "#C9B99A", "Céramique") },
    { id: "noir",      name: "Vase noir mat",            price: 16, included: false, image: placeholder("#2A2A2A", "#5A5A5A", "Noir mat") },
  ],
};

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
