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
function renderPicker(containerId, items, stateKey, stageElId, styleProp) {
  const wrap = document.getElementById(containerId);
  wrap.innerHTML = "";
  items.forEach(item => {
    const chip = document.createElement("button");
    chip.className = "picker-chip" + (item.id === state[stateKey] ? " active" : "");
    const priceLabel = item.included ? "Inclus" : "+" + money(item.price);
    chip.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <span>${item.name}</span>
      <span class="picker-price">${priceLabel}</span>
    `;
    chip.addEventListener("click", () => {
      state[stateKey] = item.id;
      applyToStage(stageElId, item.image);
      renderPicker(containerId, items, stateKey, stageElId, styleProp);
      renderSummary();
    });
    wrap.appendChild(chip);
  });
}

function applyToStage(stageElId, imageUrl) {
  const el = document.getElementById(stageElId);
  el.style.backgroundImage = `url('${imageUrl}')`;
  el.classList.remove("stage-pop");
  void el.offsetWidth; // relance l'animation
  el.classList.add("stage-pop");
  document.getElementById("stageHint").style.display = "none";
}

function renderAll() {
  renderFlowerList();
  renderPicker("ribbonPicker", RIBBONS, "ribbonId", "stageRibbon");
  renderPicker("wrapPicker", WRAPS, "wrapId", "stageWrap");
  renderPicker("vasePicker", CUSTOM_VASES, "vaseId", "stageWrap");
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
