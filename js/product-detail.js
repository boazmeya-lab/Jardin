document.addEventListener('DOMContentLoaded', () => {
  const detailContainer = document.getElementById('productDetailContent');
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get('id'));

  // Récupération du produit depuis products.js
  const product = typeof products !== 'undefined' ? products.find(p => p.id === productId) : null;

  if (!product) {
    detailContainer.innerHTML = `
      <p style="padding: 40px; text-align: center;">
        Produit introuvable. <br><br>
        <a href="products.html" class="btn-back"><i class="fa-solid fa-arrow-left"></i> Retour au catalogue</a>
      </p>`;
    return;
  }

  // 4 Options de Couleurs
  const colorOptions = [
    { id: 'rouge', name: 'Rouge & Blanc', img: 'image/mariage.jpg' },
    { id: 'rose', name: 'Rose & Pastel', img: 'image/couverture.jpg' },
    { id: 'jaune', name: 'Jaune & Doré', img: 'image/bureau.jpg' },
    { id: 'multi', name: 'Multicolore VIP', img: 'image/hotel.jpg' }
  ];

  // 4 Options de Vases
  const vaseOptions = [
    { id: 'sans', name: 'Sans Vase (Bouquet)', img: 'image/mariage.jpg', price: 0 },
    { id: 'verre', name: 'Vase Cristal Clear (+10$)', img: 'image/hotel.jpg', price: 10 },
    { id: 'ceramique', name: 'Vase Céramique Blanc (+15$)', img: 'image/bureau.jpg', price: 15 },
    { id: 'dore', name: 'Vase Doré Premium (+20$)', img: 'image/couverture.jpg', price: 20 }
  ];

  // Injection du HTML
  detailContainer.innerHTML = `
    <div class="product-detail-img">
      <img src="${product.image}" alt="${product.title}" id="mainProductImg">
    </div>

    <div class="product-detail-info">
      <h1>${product.title}</h1>
      <p class="price-tag">${product.price}</p>
      
      <form id="customizeForm" class="customize-form">
        <h3>1. Choisissez la couleur</h3>
        <div class="options-grid" id="colorGrid">
          ${colorOptions.map((c, i) => `
            <div class="option-card ${i === 0 ? 'selected' : ''}" data-type="color" data-value="${c.name}">
              <img src="${c.img}" alt="${c.name}">
              <span>${c.name}</span>
            </div>
          `).join('')}
        </div>

        <h3>2. Choisissez le vase</h3>
        <div class="options-grid" id="vaseGrid">
          ${vaseOptions.map((v, i) => `
            <div class="option-card ${i === 0 ? 'selected' : ''}" data-type="vase" data-value="${v.name}">
              <img src="${v.img}" alt="${v.name}">
              <span>${v.name}</span>
            </div>
          `).join('')}
        </div>

        <h3>3. Instructions / Message (Optionnel)</h3>
        <textarea id="cardMessage" placeholder="Rédigez ici le mot pour la carte ou une précision sur la livraison..."></textarea>

        <button type="submit" class="btn-order-whatsapp">
          <i class="fa-brands fa-whatsapp"></i> Commander sur WhatsApp
        </button>
      </form>
    </div>
  `;

  // Variables pour stocker les sélections
  let selectedColor = colorOptions[0].name;
  let selectedVase = vaseOptions[0].name;

  // Gestion de la sélection visuelle (Couleur & Vase)
  document.querySelectorAll('.option-card').forEach(card => {
    card.addEventListener('click', function() {
      const type = this.dataset.type;
      const value = this.dataset.value;

      // Retirer la sélection active du groupe
      const parentGrid = this.parentElement;
      parentGrid.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));

      // Activer la carte cliquée
      this.classList.add('selected');

      if (type === 'color') selectedColor = value;
      if (type === 'vase') selectedVase = value;
    });
  });

  // Envoi vers WhatsApp
  document.getElementById('customizeForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const message = document.getElementById('cardMessage').value;
    const whatsappNum = "243000000000"; // <-- Mets ton numéro WhatsApp ici (ex: 243810000000)

    const textMessage = `Bonjour Jardin Agro !%0A%0AJe souhaite commander le produit suivant :%0A🌸 *${product.title}*%0A💰 *Prix :* ${product.price}%0A%0A*Personnalisation :*%0A🎨 *Couleur :* ${selectedColor}%0A🏺 *Vase :* ${selectedVase}%0A📝 *Message / Note :* ${message || 'Aucun'}`;

    window.open(`https://wa.me/${whatsappNum}?text=${textMessage}`, '_blank');
  });
});
