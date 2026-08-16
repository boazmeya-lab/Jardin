/**
 * Jardin Agro - Module de Personnalisation de Bouquet
 */

// 1. CONFIGURATION DU PRODUIT ET DES VARIANTES
const productData = {
  id: 101,
  title: "Bouquet Élégance Royal",
  basePrice: 45.00,
  whatsappNumber: "243810000000", // Remplacer par votre numéro
  gallery: [
    "image/mariage.jpg",
    "image/hotel.jpg",
    "image/bureau.jpg",
    "image/couverture.jpg"
  ],
  flowers: [
    { id: 'f1', name: 'Roses Rouges', price: 0, img: 'image/mariage.jpg' },
    { id: 'f2', name: 'Roses Blanches', price: 0, img: 'image/hotel.jpg' },
    { id: 'f3', name: 'Roses Roses', price: 0, img: 'image/couverture.jpg' },
    { id: 'f4', name: 'Roses Jaunes', price: 2, img: 'image/bureau.jpg' },
    { id: 'f5', name: 'Mélange Pastel', price: 5, img: 'image/mariage.jpg' },
    { id: 'f6', name: 'Composition VIP', price: 10, img: 'image/hotel.jpg' }
  ],
  vases: [
    { id: 'v0', name: 'Sans vase (Bouquet seul)', price: 0, img: 'image/mariage.jpg' },
    { id: 'v1', name: 'Vase Transparent', price: 10, img: 'image/hotel.jpg' },
    { id: 'v2', name: 'Vase Cristal', price: 15, img: 'image/hotel.jpg' },
    { id: 'v3', name: 'Céramique Blanche', price: 18, img: 'image/bureau.jpg' },
    { id: 'v4', name: 'Vase Doré Premium', price: 20, img: 'image/couverture.jpg' }
  ],
  ribbons: [
    { id: 'r1', name: 'Blanc', price: 0, colorHex: '#FFFFFF' },
    { id: 'r2', name: 'Rouge', price: 0, colorHex: '#B11A29' },
    { id: 'r3', name: 'Rose', price: 0, colorHex: '#FFC0CB' },
    { id: 'r4', name: 'Doré Premium', price: 3, colorHex: '#D4AF37' },
    { id: 'r5', name: 'Bleu', price: 0, colorHex: '#1E3A8A' },
    { id: 'r6', name: 'Vert Imperial', price: 2, colorHex: '#2E5B38' }
  ]
};

// 2. ÉTAT DE SÉLECTION DU CLIENT
const userSelection = {
  flower: productData.flowers[0],
  vase: productData.vases[0],
  ribbon: productData.ribbons[0],
  message: ""
};

// 3. INITIALISATION AU CHARGEMENT DE LA PAGE
document.addEventListener('DOMContentLoaded', () => {
  renderGallery();
  renderOptions('flowersGrid', productData.flowers, 'flower');
  renderOptions('vasesGrid', productData.vases, 'vase');
  renderRibbonOptions('ribbonsGrid', productData.ribbons);
  setupMessageCounter();
  updateTotalPrice();
  setupEventListeners();
});

// 4. RENDU DE LA GALERIE PHOTO
function renderGallery() {
  const mainImg = document.getElementById('mainImage');
  const thumbsContainer = document.getElementById('thumbnailsGrid');
  
  mainImg.src = productData.gallery[0];
  thumbsContainer.innerHTML = '';

  productData.gallery.forEach((src, idx) => {
    const thumb = document.createElement('div');
    thumb.className = `thumb-item ${idx === 0 ? 'active' : ''}`;
    thumb.innerHTML = `<img src="${src}" alt="Miniature ${idx + 1}">`;
    
    thumb.addEventListener('click', () => {
      document.querySelectorAll('.thumb-item').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      
      // Animation de changement d'image
      mainImg.style.opacity = '0.3';
      setTimeout(() => {
        mainImg.src = src;
        mainImg.style.opacity = '1';
      }, 150);
    });

    thumbsContainer.appendChild(thumb);
  });
}

// 5. RENDU DYNAMIQUE DES OPTIONS (FLEURS & VASES)
function renderOptions(containerId, items, selectionCategory) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  items.forEach((item, index) => {
    const isSelected = index === 0;
    const card = document.createElement('div');
    card.className = `opt-card ${isSelected ? 'selected' : ''}`;
    card.dataset.id = item.id;

    card.innerHTML = `
      <div class="check-icon"><i class="fa-solid fa-check"></i></div>
      <img src="${item.img}" class="opt-card-img" alt="${item.name}">
      <span class="opt-card-name">${item.name}</span>
      <span class="opt-card-price">${item.price > 0 ? `+$${item.price}` : 'Inclus'}</span>
    `;

    card.addEventListener('click', () => {
      container.querySelectorAll('.opt-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      userSelection[selectionCategory] = item;
      updateTotalPrice();
    });

    container.appendChild(card);
  });
}

// 6. RENDU DYNAMIQUE DES RUBANS
function renderRibbonOptions(containerId, items) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  items.forEach((item, index) => {
    const isSelected = index === 0;
    const card = document.createElement('div');
    card.className = `opt-card ${isSelected ? 'selected' : ''}`;
    card.dataset.id = item.id;

    card.innerHTML = `
      <div class="check-icon"><i class="fa-solid fa-check"></i></div>
      <div class="ribbon-swatch" style="background-color: ${item.colorHex};"></div>
      <span class="opt-card-name">${item.name}</span>
      <span class="opt-card-price">${item.price > 0 ? `+$${item.price}` : 'Inclus'}</span>
    `;

    card.addEventListener('click', () => {
      container.querySelectorAll('.opt-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      userSelection.ribbon = item;
      updateTotalPrice();
    });

    container.appendChild(card);
  });
}

// 7. COMPTEUR DE CARACTÈRES
function setupMessageCounter() {
  const textarea = document.getElementById('customMessage');
  const counter = document.getElementById('charCount');

  textarea.addEventListener('input', (e) => {
    const currentLength = e.target.value.length;
    counter.textContent = currentLength;
    userSelection.message = e.target.value.trim();
  });
}

// 8. CALCUL ET MISE À JOUR DU PRIX TOTAL
function updateTotalPrice() {
  const total = productData.basePrice + 
                userSelection.flower.price + 
                userSelection.vase.price + 
                userSelection.ribbon.price;

  const priceDisplay = document.getElementById('totalPriceDisplay');
  priceDisplay.textContent = `$${total.toFixed(2)}`;

  // Petit effet visuel d'animation
  priceDisplay.classList.add('updated');
  setTimeout(() => priceDisplay.classList.remove('updated'), 200);
}

// 9. EVENT LISTENERS POUR COMMANDER SUR WHATSAPP ET PANIER
function setupEventListeners() {
  // Envoi vers WhatsApp
  document.getElementById('btnWhatsApp').addEventListener('click', () => {
    const total = (productData.basePrice + userSelection.flower.price + userSelection.vase.price + userSelection.ribbon.price).toFixed(2);

    const messageText = `Bonjour *Jardin Agro* !%0A` +
      `Je souhaite commander une composition :%0A%0A` +
      `🌸 *Produit :* ${productData.title}%0A` +
      `💐 *Fleurs :* ${userSelection.flower.name}%0A` +
      `🏺 *Vase :* ${userSelection.vase.name}%0A` +
      `🎀 *Ruban :* ${userSelection.ribbon.name}%0A` +
      `📝 *Message personnalisé :* ${userSelection.message || 'Aucun'}%0A%0A` +
      `💰 *PRIX TOTAL :* $${total}`;

    const url = `https://wa.me/${productData.whatsappNumber}?text=${messageText}`;
    window.open(url, '_blank');
  });

  // Action Ajouter au Panier (exemple console/alert)
  document.getElementById('btnAddToCart').addEventListener('click', () => {
    alert(`Votre ${productData.title} à été ajouté au panier !`);
  });
}
