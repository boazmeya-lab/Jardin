// ============================================
// Logique du configurateur "Créer mon bouquet"
// Dépend de flowers.js (doit être chargé avant ce fichier)
// ============================================

const NUMERO_WHATSAPP = "22900000000"; // ⚠️ remplace par le vrai numéro de Jardin Agro (format international, sans +)

// État du bouquet en cours de création
const bouquet = {
  fleurs: {},      // { id_fleur: quantite }
  ruban: null,     // id du ruban choisi
  emballage: null, // id de l'emballage choisi
  vase: null,      // id du vase choisi
};

function formatPrix(n) {
  return "$" + n.toFixed(2);
}

// ---------- Construction des pickers ----------

function construireFlowerPicker() {
  const container = document.getElementById("flowerPicker");
  if (!container) return;
  container.innerHTML = "";

  FLOWERS.forEach((fleur) => {
    const card = document.createElement("div");
    card.className = "flower-card";
    card.innerHTML = `
      <div class="flower-swatch" style="background:${fleur.color}"></div>
      <div class="flower-name">${fleur.name}</div>
      <div class="flower-price">${formatPrix(fleur.price)}</div>
      <div class="flower-qty">
        <button type="button" class="qty-btn" data-action="moins" data-id="${fleur.id}">−</button>
        <span class="qty-value" id="qty-${fleur.id}">0</span>
        <button type="button" class="qty-btn" data-action="plus" data-id="${fleur.id}">+</button>
      </div>
    `;
    container.appendChild(card);
  });

  container.addEventListener("click", (e) => {
    const btn = e.target.closest(".qty-btn");
    if (!btn) return;
    const id = btn.dataset.id;
    const delta = btn.dataset.action === "plus" ? 1 : -1;
    const nouvelleQte = Math.max(0, (bouquet.fleurs[id] || 0) + delta);
    if (nouvelleQte === 0) {
      delete bouquet.fleurs[id];
    } else {
      bouquet.fleurs[id] = nouvelleQte;
    }
    document.getElementById(`qty-${id}`).textContent = nouvelleQte;
    mettreAJourApercu();
    mettreAJourRecap();
  });
}

function construireSwatchPicker(containerId, items, cle) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = "";

  items.forEach((item) => {
    const swatch = document.createElement("button");
    swatch.type = "button";
    swatch.className = "swatch-btn";
    swatch.dataset.id = item.id;
    swatch.innerHTML = `
      <span class="swatch-color" style="background:${item.color}"></span>
      <span class="swatch-name">${item.name}</span>
      <span class="swatch-price">${item.price ? "+" + formatPrix(item.price) : "Gratuit"}</span>
    `;
    swatch.addEventListener("click", () => {
      bouquet[cle] = item.id;
      container.querySelectorAll(".swatch-btn").forEach((b) => b.classList.remove("selected"));
      swatch.classList.add("selected");
      mettreAJourApercu();
      mettreAJourRecap();
    });
    container.appendChild(swatch);
  });
}

// ---------- Aperçu en direct ----------

function mettreAJourApercu() {
  const previewEmpty = document.getElementById("previewEmpty");
  const stageFlowers = document.getElementById("stageFlowers");
  const stageRibbon = document.getElementById("stageRibbon");
  const stageWrap = document.getElementById("stageWrap");
  const stageHint = document.getElementById("stageHint");

  const idsFleurs = Object.keys(bouquet.fleurs);

  if (idsFleurs.length === 0) {
    if (previewEmpty) previewEmpty.style.display = "block";
    if (stageFlowers) stageFlowers.innerHTML = "";
  } else {
    if (previewEmpty) previewEmpty.style.display = "none";

    // Une "fleur" (tige + tête colorée) par unité, positionnée en éventail.
    // Chaque fleur ajoutée apparaît immédiatement dans l'éventail.
    let html = "";
    let index = 0;
    const total = idsFleurs.reduce((acc, id) => acc + bouquet.fleurs[id], 0);

    idsFleurs.forEach((id) => {
      const fleur = FLOWERS.find((f) => f.id === id);
      for (let i = 0; i < bouquet.fleurs[id]; i++) {
        const angle = (index / Math.max(total - 1, 1)) * 70 - 35; // éventail -35° à +35°
        html += `
          <div class="flower-unit" style="transform: rotate(${angle}deg) translateY(-${index % 3 * 4}px)">
            <div class="stem"></div>
            <div class="head" style="background:${fleur.color}" title="${fleur.name}"></div>
          </div>`;
        index++;
      }
    });

    if (stageFlowers) stageFlowers.innerHTML = html;
  }

  if (stageRibbon) {
    const ruban = RIBBONS.find((r) => r.id === bouquet.ruban);
    stageRibbon.style.background = ruban ? ruban.color : "transparent";
    stageRibbon.style.display = ruban ? "block" : "none";
  }

  if (stageWrap) {
    const emballage = WRAPS.find((w) => w.id === bouquet.emballage);
    stageWrap.style.background = emballage ? emballage.color : "transparent";
    stageWrap.style.display = emballage ? "block" : "none";
  }

  if (stageHint) {
    stageHint.style.display = (bouquet.ruban || bouquet.emballage) ? "none" : "block";
  }
}

// ---------- Récapitulatif et total ----------

function calculerTotal() {
  let total = 0;
  Object.entries(bouquet.fleurs).forEach(([id, qte]) => {
    const fleur = FLOWERS.find((f) => f.id === id);
    if (fleur) total += fleur.price * qte;
  });
  const ruban = RIBBONS.find((r) => r.id === bouquet.ruban);
  if (ruban) total += ruban.price;
  const emballage = WRAPS.find((w) => w.id === bouquet.emballage);
  if (emballage) total += emballage.price;
  const vase = VASES.find((v) => v.id === bouquet.vase);
  if (vase) total += vase.price;
  return total;
}

function mettreAJourRecap() {
  const summaryLines = document.getElementById("summaryLines");
  const totalPrice = document.getElementById("totalPrice");
  if (!summaryLines || !totalPrice) return;

  let lignes = [];

  Object.entries(bouquet.fleurs).forEach(([id, qte]) => {
    const fleur = FLOWERS.find((f) => f.id === id);
    if (fleur) lignes.push(`${qte} × ${fleur.name} — ${formatPrix(fleur.price * qte)}`);
  });

  const ruban = RIBBONS.find((r) => r.id === bouquet.ruban);
  if (ruban) lignes.push(`Ruban ${ruban.name} — ${formatPrix(ruban.price)}`);

  const emballage = WRAPS.find((w) => w.id === bouquet.emballage);
  if (emballage) lignes.push(`Emballage ${emballage.name} — ${formatPrix(emballage.price)}`);

  const vase = VASES.find((v) => v.id === bouquet.vase);
  if (vase && vase.price > 0) lignes.push(`${vase.name} — ${formatPrix(vase.price)}`);

  summaryLines.innerHTML = lignes.length
    ? lignes.map((l) => `<p>${l}</p>`).join("")
    : "<p>Aucune sélection pour le moment</p>";

  totalPrice.textContent = formatPrix(calculerTotal());
}

// ---------- Envoi WhatsApp ----------

function construireMessageWhatsapp() {
  let message = "Bonjour Jardin Agro, je souhaite commander ce bouquet personnalisé :%0A%0A";

  Object.entries(bouquet.fleurs).forEach(([id, qte]) => {
    const fleur = FLOWERS.find((f) => f.id === id);
    if (fleur) message += `- ${qte} × ${fleur.name}%0A`;
  });

  const ruban = RIBBONS.find((r) => r.id === bouquet.ruban);
  if (ruban) message += `- Ruban : ${ruban.name}%0A`;

  const emballage = WRAPS.find((w) => w.id === bouquet.emballage);
  if (emballage) message += `- Emballage : ${emballage.name}%0A`;

  const vase = VASES.find((v) => v.id === bouquet.vase);
  if (vase) message += `- ${vase.name}%0A`;

  message += `%0ATotal estimé : ${formatPrix(calculerTotal())}`;

  return message;
}

function initWhatsappBtn() {
  const btn = document.getElementById("whatsappBtn");
  if (!btn) return;
  btn.addEventListener("click", () => {
    if (Object.keys(bouquet.fleurs).length === 0) {
      alert("Choisissez au moins une fleur avant de valider votre bouquet.");
      return;
    }
    const message = construireMessageWhatsapp();
    const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${message}`;
    window.open(url, "_blank");
  });
}

// ---------- Initialisation ----------

document.addEventListener("DOMContentLoaded", () => {
  construireFlowerPicker();
  construireSwatchPicker("ribbonPicker", RIBBONS, "ruban");
  construireSwatchPicker("wrapPicker", WRAPS, "emballage");
  construireSwatchPicker("vasePicker", VASES, "vase");
  initWhatsappBtn();
  mettreAJourApercu();
  mettreAJourRecap();
});
