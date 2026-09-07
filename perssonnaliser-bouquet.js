// ============================================
// Logique de la page "Personnaliser mon bouquet"
// Dépend de flowers.js et bouquets.js (chargés avant ce fichier)
// ============================================

const NUMERO_WHATSAPP = "22900000000"; // ⚠️ remplace par le vrai numéro de Jardin Agro (format international, sans +)

let bouquetBase = null; // le bouquet prédéfini choisi dans la galerie

// État courant (base + modifications de l'utilisateur)
const bouquet = {
  fleurs: {},      // { id_fleur: quantite }
  ruban: null,
  emballage: null,
  vase: null,
};

function formatPrix(n) {
  return "$" + n.toFixed(2);
}

function styleVisuel(item) {
  const couleur = `background-color:${item.color || "#eee"};`;
  const image = item.img ? `background-image:url('${item.img}');background-size:cover;background-position:center;` : "";
  return couleur + image;
}

// ---------- Chargement du bouquet choisi dans la galerie ----------

function chargerBouquetDepuisUrl() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  bouquetBase = BOUQUETS.find((b) => b.id === id) || BOUQUETS[0];

  bouquet.fleurs = { ...bouquetBase.fleurs };

  document.getElementById("baseImage").src = bouquetBase.img;
  document.getElementById("baseImage").alt = bouquetBase.name;
  document.getElementById("baseName").textContent = bouquetBase.name;
}

// ---------- Construction des pickers ----------

function construireFlowerPicker() {
  const container = document.getElementById("flowerPicker");
  if (!container) return;
  container.innerHTML = "";

  FLOWERS.forEach((fleur) => {
    const qteInitiale = bouquet.fleurs[fleur.id] || 0;
    const card = document.createElement("div");
    card.className = "flower-card";
    card.innerHTML = `
      <div class="flower-swatch" style="${styleVisuel(fleur)}"></div>
      <div class="flower-name">${fleur.name}</div>
      <div class="flower-price">${formatPrix(fleur.price)}</div>
      <div class="flower-qty">
        <button type="button" class="qty-btn" data-action="moins" data-id="${fleur.id}">−</button>
        <span class="qty-value" id="qty-${fleur.id}">${qteInitiale}</span>
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
    mettreAJourBadges();
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
      <span class="swatch-color" style="${styleVisuel(item)}"></span>
      <span class="swatch-name">${item.name}</span>
      <span class="swatch-price">${item.price ? "+" + formatPrix(item.price) : "Gratuit"}</span>
    `;
    swatch.addEventListener("click", () => {
      bouquet[cle] = item.id;
      container.querySelectorAll(".swatch-btn").forEach((b) => b.classList.remove("selected"));
      swatch.classList.add("selected");
      mettreAJourBadges();
      mettreAJourRecap();
    });
    container.appendChild(swatch);
  });
}

// ---------- Badges d'ajouts (différence avec le bouquet de base) ----------

function mettreAJourBadges() {
  const badgesContainer = document.getElementById("badges");
  const badgesEmpty = document.getElementById("badgesEmpty");
  if (!badgesContainer) return;

  const badges = [];

  // Fleurs ajoutées ou retirées par rapport à la base
  const tousLesIdsFleurs = new Set([...Object.keys(bouquetBase.fleurs), ...Object.keys(bouquet.fleurs)]);
  tousLesIdsFleurs.forEach((id) => {
    const qteBase = bouquetBase.fleurs[id] || 0;
    const qteActuelle = bouquet.fleurs[id] || 0;
    const diff = qteActuelle - qteBase;
    if (diff !== 0) {
      const fleur = FLOWERS.find((f) => f.id === id);
      if (fleur) badges.push(`${diff > 0 ? "+" : ""}${diff} ${fleur.name}`);
    }
  });

  const ruban = RIBBONS.find((r) => r.id === bouquet.ruban);
  if (ruban) badges.push(`Ruban ${ruban.name}`);

  const emballage = WRAPS.find((w) => w.id === bouquet.emballage);
  if (emballage) badges.push(`Emballage ${emballage.name}`);

  const vase = VASES.find((v) => v.id === bouquet.vase);
  if (vase && vase.price > 0) badges.push(vase.name);

  badgesContainer.innerHTML = badges.length
    ? badges.map((b) => `<span class="badge">${b}</span>`).join("")
    : `<span id="badgesEmpty">Aucune modification pour le moment — c'est le bouquet original</span>`;
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
  let message = `Bonjour Jardin Agro, je souhaite commander ce bouquet personnalisé (base : ${bouquetBase.name}) :%0A%0A`;

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
  chargerBouquetDepuisUrl();
  construireFlowerPicker();
  construireSwatchPicker("ribbonPicker", RIBBONS, "ruban");
  construireSwatchPicker("wrapPicker", WRAPS, "emballage");
  construireSwatchPicker("vasePicker", VASES, "vase");
  initWhatsappBtn();
  mettreAJourBadges();
  mettreAJourRecap();
});
