/* =========================================================================
   PRODUCT-DETAILS.JS — Jardin Agro
   -------------------------------------------------------------------------
   Toutes les données produit sont dans PRODUCT_DATA en bas de ce bloc.
   Remplace les "images" par tes vraies photos (chemins ou URLs) et
   WHATSAPP_NUMBER par ton numéro réel (format international, sans +).
   ========================================================================= */

const WHATSAPP_NUMBER = "15551234567"; // <-- remplace par ton numéro (format: indicatif+numéro, sans +, sans espace)

/* Génère une image de remplacement en SVG (à retirer quand tu as tes vraies photos).
   Utilise `images: ["photo1.jpg","photo2.jpg","photo3.jpg"]` dans un modèle pour tes vraies images. */
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
   DONNÉES PRODUIT
   Remplace "images" par tes vraies photos. Chaque modèle a ses 3 vues.
   ---------------------------------------------------------------------- */
const PRODUCT_DATA = {
  title: "Bouquet Élégance Royal",
  subtitle: "Roses, lys étoilés et gypsophile, composés à la main pour un rendu généreux et romantique.",

  models: [
    {
      id: "royal",
      name: "Élégance Royal",
      basePrice: 45.0,
      images: [
        placeholder("#1F3D2B", "#E8B4BC", "Vue 1"),
        placeholder("#1F3D2B", "#B5495B", "Vue 2"),
        placeholder("#1F3D2B", "#DCE5D6", "Vue 3"),
      ],
    },
    {
      id: "printaniere",
      name: "Douceur Printanière",
      basePrice: 38.0,
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
      images: [
        placeholder("#3A2E23", "#D9A441", "Vue 1"),
        placeholder("#3A2E23", "#D9A441", "Vue 2"),
        placeholder("#3A2E23", "#D9A441", "Vue 3"),
      ],
    },
  ],

  colors: [
    // "image" = petite photo de la couleur (remplace par tes vraies photos, ex: "images/couleur-rose.jpg")
    { id: "rose",     name: "Rose",     image: placeholder("#E8B4BC", "#F6DEE2", "") },
    { id: "blanc",    name: "Blanc",    image: placeholder("#F7F4EE", "#FFFFFF", "") },
    { id: "bordeaux", name: "Bordeaux", image: placeholder("#7A2438", "#B5495B", "") },
    { id: "pastel",   name: "Pastel",   image: placeholder("#F0D9C4", "#F7E4D3", "") },
  ],

  vases: [
    { id: "none",  name: "Sans vase (bouquet seul)", price: 0,  included: true,
      image: placeholder("#DCE5D6", "#B7C9AE", "Sans vase") },
    { id: "verre", name: "Vase transparent",         price: 8,  included: false,
      image: placeholder("#CFE0E8", "#8FB4C4", "Verre") },
    { id: "ceramique", name: "Vase céramique blanc", price: 14, included: false,
      image: placeholder("#EDE7DD", "#C9B99A", "Céramique") },
    { id: "noir",  name: "Vase noir mat",            price: 16, included: false,
      image: placeholder("#2A2A2A", "#5A5A5A", "Noir mat") },
  ],
};

/* -------------------------------------------------------------------------
   ÉTAT
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
   RENDU
   ---------------------------------------------------------------------- */
function money(n) { return "$" + n.toFixed(2); }

function renderHeader() {
  document.getElementById("productTitle").textContent = PRODUCT_DATA.title;
  document.getElementById("productSubtitle").textContent = PRODUCT_DATA.subtitle;
}

function renderGallery() {
  const model = currentModel();
  model.images.forEach((src, i) => {
    document.getElementById("galleryMain" + i).src = src;
  });
  setActiveImage(0);

  // dots
  const dots = document.getElementById("galleryDots");
  dots.innerHTML = "";
  model.images.forEach((_, i) => {
    const d = document.createElement("span");
    if (i === state.activeImage) d.classList.add("active");
    dots.appendChild(d);
  });

  // thumbnails
  const thumbs = document.getElementById("thumbs");
  thumbs.innerHTML = "";
  model.images.forEach((src, i) => {
    const b = document.createElement("button");
    b.className = i === state.activeImage ? "active" : "";
    b.innerHTML = `<img src="${src}" alt="Miniature ${i + 1}">`;
    b.addEventListener("click", () => setActiveImage(i));
    thumbs.appendChild(b);
  });
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
      renderModels();
      renderGallery();
      renderPricing();
    });
    scroll.appendChild(card);
  });
  document.getElementById("modelSelectedLabel").textContent = currentModel().name;
  document.getElementById("modelEyebrow").textContent = "Modèle sélectionné";
}

function renderColors() {
  const wrap = document.getElementById("swatches");
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

  document.getElementById("basePriceDisplay").textContent = money(model.basePrice);

  document.getElementById("brModelLabel").textContent = model.name;
  document.getElementById("brModelPrice").textContent = money(model.basePrice);

  document.getElementById("brVaseLabel").textContent = vase.name;
  document.getElementById("brVasePrice").textContent = vase.included ? "Inclus" : "+" + money(vase.price);

  document.getElementById("brQtyLabel").textContent = "Quantité";
  document.getElementById("brQtyValue").textContent = "× " + state.quantity;

  document.getElementById("brTotal").textContent = money(total);
  document.getElementById("stickyTotal").textContent = money(total);
}

/* -------------------------------------------------------------------------
   QUANTITÉ
   ---------------------------------------------------------------------- */
function bindQuantity() {
  const input = document.getElementById("qtyInput");
  document.getElementById("qtyMinus").addEventListener("click", () => {
    if (state.quantity > 1) {
      state.quantity--;
      input.value = state.quantity;
      renderPricing();
    }
  });
  document.getElementById("qtyPlus").addEventListener("click", () => {
    if (state.quantity < 99) {
      state.quantity++;
      input.value = state.quantity;
      renderPricing();
    }
  });
}

/* -------------------------------------------------------------------------
   MESSAGE SUR LA CARTE
   ---------------------------------------------------------------------- */
function bindMessage() {
  const textarea = document.getElementById("cardMessage");
  textarea.addEventListener("input", (e) => {
    state.message = e.target.value;
  });
}

/* -------------------------------------------------------------------------
   COMMANDE WHATSAPP
   ---------------------------------------------------------------------- */
function buildWhatsAppMessage() {
  const model = currentModel();
  const color = currentColor();
  const vase = currentVase();
  const unitPrice = model.basePrice + vase.price;
  const total = unitPrice * state.quantity;

  let lines = [
    `Bonjour Jardin Agro 🌸 je souhaite commander :`,
    ``,
    `• Produit : ${PRODUCT_DATA.title}`,
    `• Modèle : ${model.name}`,
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
  document.getElementById("whatsappBtn").addEventListener("click", () => {
    const text = encodeURIComponent(buildWhatsAppMessage());
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
    window.open(url, "_blank");
  });
}

/* -------------------------------------------------------------------------
   INIT
   ---------------------------------------------------------------------- */
function init() {
  renderHeader();
  renderModels();
  renderGallery();
  renderColors();
  renderVases();
  renderPricing();
  bindQuantity();
  bindMessage();
  bindWhatsAppButton();
}

/* Lance init() immédiatement si le DOM est déjà prêt (évite un écran vide
   si ce script se charge après coup sur certains hébergeurs), sinon
   attend l'événement normal. */
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
