document.addEventListener('DOMContentLoaded', () => {
  const detailContainer = document.querySelector('.product-page-container') || document.body;

  // Données des bouquets (images du haut)
  const bouquets = [
    { id: 'b1', name: 'Élégance Rose & Lys', price: 45, img: 'image/mariage.jpg' },
    { id: 'b2', name: 'Passion Roses Rouges', price: 50, img: 'image/couverture.jpg' },
    { id: 'b3', name: 'Sérénité Blanc & Pastel', price: 40, img: 'image/bureau.jpg' },
    { id: 'b4', name: 'Éclat VIP Multicolore', price: 60, img: 'image/hotel.jpg' }
  ];

  // Données des vases (images du bas)
  const vases = [
    { id: 'v0', name: 'Sans vase (Bouquet seul)', price: 0, img: 'image/mariage.jpg' },
    { id: 'v1', name: 'Vase Transparent', price: 10, img: 'image/hotel.jpg' },
    { id: 'v2', name: 'Vase Céramique Blanc', price: 15, img: 'image/bureau.jpg' },
    { id: 'v3', name: 'Vase Doré Premium', price: 20, img: 'image/couverture.jpg' }
  ];

  let selectedBouquet = bouquets[0];
  let selectedVase = vases[0];

  // Rendu de l'interface
  detailContainer.innerHTML = `
    <div class="customizer-wrapper">
      <span class="stock-badge"><i class="fa-solid fa-check"></i> En stock</span>
      
      <!-- SECTION 1 : CHOIX DU BOUQUET (CARROUSEL DÉFILANT) -->
      <h2 class="section-title">1. Choisissez votre Bouquet</h2>
      <div class="horizontal-slider" id="bouquetSlider">
        ${bouquets.map((b, i) => `
          <div class="slide-card ${i === 0 ? 'selected' : ''}" data-index="${i}">
            <div class="check-mark"><i class="fa-solid fa-circle-check"></i></div>
            <img src="${b.img}" alt="${b.name}">
            <div class="slide-info">
              <h4>${b.name}</h4>
              <p class="price">$${b.price}</p>
            </div>
            <button class="btn-select">${i === 0 ? 'Sélectionné' : 'Je choisis ça'}</button>
          </div>
        `).join('')}
      </div>

      <!-- SECTION 2 : CHOIX DU VASE (CARROUSEL DÉFILANT) -->
      <h2 class="section-title">2. Choisissez votre Vase</h2>
      <div class="horizontal-slider" id="vaseSlider">
        ${vases.map((v, i) => `
          <div class="slide-card ${i === 0 ? 'selected' : ''}" data-index="${i}">
            <div class="check-mark"><i class="fa-solid fa-circle-check"></i></div>
            <img src="${v.img}" alt="${v.name}">
            <div class="slide-info">
              <h4>${v.name}</h4>
              <p class="price">${v.price > 0 ? `+$${v.price}` : 'Inclus'}</p>
            </div>
            <button class="btn-select">${i === 0 ? 'Sélectionné' : 'Je choisis ça'}</button>
          </div>
        `).join('')}
      </div>

      <!-- SECTION 3 : MESSAGE & TOTAL -->
      <div class="order-box">
        <label for="cardMessage"><strong>Message sur la carte (Optionnel) :</strong></label>
        <textarea id="cardMessage" placeholder="Écrivez un mot doux à accompagner avec le bouquet..."></textarea>

        <div class="total-display">
          <span>Prix Total :</span>
          <strong id="totalPrice">$${selectedBouquet.price + selectedVase.price}</strong>
        </div>

        <button id="btnOrderWhatsapp" class="btn-whatsapp-large">
          <i class="fa-brands fa-whatsapp"></i> Commander sur WhatsApp
        </button>
      </div>
    </div>
  `;

  // Fonction de mise à jour du prix
  function updatePrice() {
    const total = selectedBouquet.price + selectedVase.price;
    document.getElementById('totalPrice').textContent = `$${total}`;
  }

  // Gestion de clic Bouquet
  document.querySelectorAll('#bouquetSlider .slide-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('#bouquetSlider .slide-card').forEach(c => {
        c.classList.remove('selected');
        c.querySelector('.btn-select').textContent = 'Je choisis ça';
      });
      card.classList.add('selected');
      card.querySelector('.btn-select').textContent = 'Sélectionné';
      
      const idx = parseInt(card.dataset.index);
      selectedBouquet = bouquets[idx];
      updatePrice();
    });
  });

  // Gestion de clic Vase
  document.querySelectorAll('#vaseSlider .slide-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('#vaseSlider .slide-card').forEach(c => {
        c.classList.remove('selected');
        c.querySelector('.btn-select').textContent = 'Je choisis ça';
      });
      card.classList.add('selected');
      card.querySelector('.btn-select').textContent = 'Sélectionné';

      const idx = parseInt(card.dataset.index);
      selectedVase = vases[idx];
      updatePrice();
    });
  });

  // Action WhatsApp
  document.getElementById('btnOrderWhatsapp').addEventListener('click', () => {
    const note = document.getElementById('cardMessage').value.trim();
    const phone = "243810000000"; // Ton numéro WhatsApp
    const total = selectedBouquet.price + selectedVase.price;

    const text = `Bonjour *Jardin Agro* !%0A%0AJe souhaite passer une commande :%0A🌸 *Bouquet :* ${selectedBouquet.name}%0A🏺 *Vase :* ${selectedVase.name}%0A📝 *Message :* ${note || 'Aucun'}%0A%0A💰 *TOTAL :* $${total}`;

    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  });
});
