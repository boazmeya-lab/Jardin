/* ===========================================================
   JARDIN AGRO — Logique "Créer mon bouquet"
   =========================================================== */

const CB_WHATSAPP_NUMBER = "15551234567"; // même numéro que product-detail.js

const state = {
  flowerQty: {},      // { rose: 5, hortensia: 3, ... }
  foliageId: FOLIAGES[0].id,
  ribbonId: RIBBONS[0].id,
  wrapId: WRAPS[0].id,
  vaseId: CUSTOM_VASES[0].id,
  message: ""
};

function money(n) { return "$" + n.toFixed(2); }

function currentFoliage() { return FOLIAGES.find(f => f.id === state.foliageId) || FOLIAGES[0]; }
function currentRibbon()  { return RIBBONS.find(r => r.id === state.ribbonId) || RIBBONS[0]; }
function currentWrap()    { return WRAPS.find(w => w.id === state.wrapId) || WRAPS[0]; }
function currentVase()    { return CUSTOM_VASES.find(v => v.id === state.vaseId) || CUSTOM_VASES[0]; }

function selectedFlowers() {
  return FLOWERS
    .filter(f => (state.flowerQty[f.id] || 0) > 0)
    .map(f => ({ ...f, qty: state.flowerQty[f.id] }));
}

function flowersTotal() {
  return selectedFlowers().reduce((sum, f) => sum + f.price * f.qty, 0);
}

function grandTotal() {
  return flowersTotal() + currentFoliage().price + currentRibbon().price + currentWrap().price + currentVase().price;
}

/* ---------- Rendu ---------- */

function renderFlowerList() {
  const wrap = document.getElementById("flowerList");
  wrap.innerHTML = "";
  FLOWERS.forEach(flower => {
    const qty = state.flowerQty[flower.id] || 0;
    const row = document.createElement("div");
    row.className = "flower-row";
    row.innerHTML = `
      <img src="${flower.image}" alt="${flower.name}">
      <span>${flower.name}</span>
      <span>${money(flower.price)} / tige</span>
      <button class="qty-minus" data-id="${flower.id}">−</button>
      <span class="qty-value">${qty}</span>
      <button class="qty-plus" data-id="${flower.id}">+</button>
    `;
    wrap.appendChild(row);
  });

  wrap.querySelectorAll(".qty-plus").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      state.flowerQty[id] = (state.flowerQty[id] || 0) + 1;
      renderAll();
    });
  });
  wrap.querySelectorAll(".qty-minus").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      state.flowerQty[id] = Math.max(0, (state.flowerQty[id] || 0) - 1);
      renderAll();
    });
  });
}

function renderOptionGrid(containerId, items, stateKey, onChange) {
  const grid = document.getElementById(containerId);
  grid.innerHTML = "";
  items.forEach(item => {
    const card = document.createElement("button");
    card.className = "option-card" + (item.id === state[stateKey] ? " active" : "");
    const priceLabel = item.included ? "Inclus" : "+" + money(item.price);
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div>${item.name}</div>
      <div>${priceLabel}</div>
    `;
    card.addEventListener("click", () => {
      state[stateKey] = item.id;
      onChange();
    });
    grid.appendChild(card);
  });
}

function renderPreview() {
  const flowers = selectedFlowers();
  const wrap = document.getElementById("previewFlowers");
  const empty = document.getElementById("previewEmpty");
  wrap.innerHTML = "";
  if (flowers.length === 0) {
    empty.style.display = "block";
  } else {
    empty.style.display = "none";
    flowers.forEach(f => {
      for (let i = 0; i < f.qty; i++) {
        const img = document.createElement("img");
        img.src = f.image;
        img.alt = f.name;
        img.className = "preview-flower";
        wrap.appendChild(img);
      }
    });
  }
}

function renderSummary() {
  const el = document.getElementById("summaryLines");
  el.innerHTML = "";

  selectedFlowers().forEach(f => {
    const line = document.createElement("div");
    line.textContent = `${f.qty} × ${f.name} — ${money(f.price * f.qty)}`;
    el.appendChild(line);
  });

  const extras = [
    ["Feuillage", currentFoliage()],
    ["Ruban", currentRibbon()],
    ["Emballage", currentWrap()],
    ["Vase", currentVase()]
  ];
  extras.forEach(([label, item]) => {
    const line = document.createElement("div");
    line.textContent = `${label} : ${item.name} — ${item.included ? "Inclus" : money(item.price)}`;
    el.appendChild(line);
  });

  document.getElementById("totalPrice").textContent = money(grandTotal());
}

function renderAll() {
  renderFlowerList();
  renderOptionGrid("foliageGrid", FOLIAGES, "foliageId", renderAll);
  renderOptionGrid("ribbonGrid", RIBBONS, "ribbonId", renderAll);
  renderOptionGrid("wrapGrid", WRAPS, "wrapId", renderAll);
  renderOptionGrid("vaseGrid", CUSTOM_VASES, "vaseId", renderAll);
  renderPreview();
  renderSummary();
}

/* ---------- Message + WhatsApp ---------- */

function bindMessage() {
  const textarea = document.getElementById("cardMessage");
  textarea.addEventListener("input", e => { state.message = e.target.value; });
}

function buildWhatsAppMessage() {
  const flowers = selectedFlowers();
  let lines = [`Bonjour Jardin Agro 🌸 je souhaite créer ce bouquet :`, ``];

  flowers.forEach(f => lines.push(`• ${f.qty} × ${f.name} (${money(f.price * f.qty)})`));
  lines.push(`• Feuillage : ${currentFoliage().name}`);
  lines.push(`• Ruban : ${currentRibbon().name}`);
  lines.push(`• Emballage : ${currentWrap().name}`);
  lines.push(`• Vase : ${currentVase().name}`);
  lines.push(``, `Total : ${money(grandTotal())}`);

  if (state.message.trim()) {
    lines.push(``, `Message pour la carte : "${state.message.trim()}"`);
  }

  return lines.join("\n");
}

function bindWhatsAppButton() {
  document.getElementById("whatsappBtn").addEventListener("click", () => {
    if (selectedFlowers().length === 0) {
      alert("Choisissez au moins une fleur avant de continuer.");
      return;
    }
    const text = encodeURIComponent(buildWhatsAppMessage());
    window.open(`https://wa.me/${CB_WHATSAPP_NUMBER}?text=${text}`, "_blank");
  });
}

/* ---------- Init ---------- */

function init() {
  renderAll();
  bindMessage();
  bindWhatsAppButton();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
