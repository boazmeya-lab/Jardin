document.addEventListener('DOMContentLoaded', () => {
  const detailContainer = document.querySelector('.product-page-container') || document.body;

  // Récupérer l'ID dans l'URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get('id'));

  // Liste de secours si products.js n'est pas chargé
  const allProducts = typeof products !== 'undefined' ? products : [
    { id: 101, title: 'Bouquet Élégance Royal', price: '$45.00', image: 'image/mariage.jpg' },
    { id: 102, title: 'Composition Prestige Bureau', price: '$65.00', image: 'image/bureau.jpg' }
  ];

  // Trouver le produit cliqué
  const currentProduct = allProducts.find(p => p.id === productId) || allProducts[0];

  // Extraire la valeur numérique du prix
  const basePriceNum = parseFloat(currentProduct.price.replace('$', '')) || 45;

  // Liste des vases disponibles
  const vases = [
    { id: 'v0', name: 'Sans vase (Bouquet seul)', price: 0, img: currentProduct.image },
    { id: 'v1', name: 'Vase Transparent', price: 10, img: 'image/hotel.jpg' },
    { id: 'v2', name: 'Vase Céramique Blanc', price: 15, img: 'image/bureau.jpg' },
    { id: 'v3', name: 'Vase Doré Premium', price: 20, img: 'image/couverture.jpg' }
  ];

  let selectedVase = vases[0];

  // Rendu de la page de détails du produit spécifique
  detailContainer.innerHTML = `
    <div class="customizer-wrapper" style="max-width:600px; margin:0 auto; padding:20px 15px;">
      <span class="stock-badge" style="background:#e8f5e9; color:#2e7d32; padding:4px 12px; border-radius:20px; font-weight:bold;">
        <i class="fa-solid fa-check"></i> En stock
      </span>
      
      <h1 style="font-size:1.8rem; margin:15px 0 5px 0;">${currentProduct.title}</h1>
      <p style="font-size:1.3rem; color:#2e5b38; font-weight:bold; margin-bottom:20px;">Prix de base : ${currentProduct.price}</p>

      <!-- IMAGE DU BOUQUET SÉLECTIONNÉ -->
      <div style="width:100%; height:320px; border-radius:16px; overflow:hidden; margin-bottom:25px;">
        <img src="${currentProduct.image}" alt="${currentProduct.title}" style="width:100%; height:100%; object-fit:cover;">
      </div>

      <!-- CHOIX DU VASE -->
      <h3 class="section-title">Choisissez votre Vase</h3>
      <div class="horizontal-slider" id="vaseSlider" style="display:flex; gap:15px; overflow-x:auto; padding-bottom:15px;">
        ${vases.map((v, i) => `
          <div class="slide-card ${i === 0 ? 'selected' : ''}" data-index="${i}" style="flex:0 0 75%; border:2px solid #eee; border-radius:12px; padding:10px; background:#fff; cursor:pointer;">
            <img src="${v.img}" alt="${v.name}" style="width:100%; height:180px; object-fit:cover; border-radius:8px;">
            <div style="display:flex; justify-content:space-between; margin:10px 0;">
              <strong>${v.name}</strong>
              <span style="color:#2e5b38; font-weight:bold;">${v.price > 0 ? `+$${v.price}` : 'Inclus'}</span>
            </div>
            <button class="btn-select" style="width:100%; padding:8px; border:none; border-radius:6px; background:${i === 0 ? '#2e5b38' : '#eef2ef'}; color:${i === 0 ? '#fff' : '#2e5b38'}; font-weight:bold;">
              ${i === 0 ? 'Sélectionné' : 'Je choisis ça'}
            </button>
          </div>
        `).join('')}
      </div>

      <!-- SECTION MESSAGE ET COMMANDE -->
      <div class="order-box" style="margin-top:25px; background:#fcfbf9; padding:20px; border-radius:16px; border:1px solid #eee;">
        <label for="cardMessage"><strong>Message sur la carte (Optionnel) :</strong></label>
        <textarea id="cardMessage" placeholder="Écrivez un mot doux à accompagner..." style="width:100%; height:80px; border-radius:8px; border:1px solid #ccc; padding:10px; margin-top:8px;"></textarea>

        <div style="display:flex; justify-content:space-between; font-size:1.3rem; margin:20px 0;">
          <span>Prix Total :</span>
          <strong id="totalPrice" style="color:#2e5b38;">$${basePriceNum + selectedVase.price}</strong>
        </div>

        <button id="btnOrderWhatsapp" style="width:100%; background:#25D366; color:white; border:none; padding:15px; border-radius:30px; font-size:1.1rem; font-weight:bold; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:10px;">
          <i class="fa-brands fa-whatsapp"></i> Commander sur WhatsApp
        </button>
      </div>
    </div>
  `;

  // Gestion dynamique du clic sur les vases
  document.querySelectorAll('#vaseSlider .slide-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('#vaseSlider .slide-card').forEach(c => {
        c.style.borderColor = '#eee';
        c.querySelector('.btn-select').style.background = '#eef2ef';
        c.querySelector('.btn-select').style.color = '#2e5b38';
        c.querySelector('.btn-select').textContent = 'Je choisis ça';
      });

      card.style.borderColor = '#2e5b38';
      const btn = card.querySelector('.btn-select');
      btn.style.background = '#2e5b38';
      btn.style.color = '#fff';
      btn.textContent = 'Sélectionné';

      const idx = parseInt(card.dataset.index);
      selectedVase = vases[idx];
      
      const total = basePriceNum + selectedVase.price;
      document.getElementById('totalPrice').textContent = `$${total}`;
    });
  });

  // Envoi WhatsApp dédié au bouquet sélectionné
  document.getElementById('btnOrderWhatsapp').addEventListener('click', () => {
    const note = document.getElementById('cardMessage').value.trim();
    const phone = "243810000000";
    const total = basePriceNum + selectedVase.price;

    const text = `Bonjour *Jardin Agro* !%0A%0AJe souhaite commander :%0A🌸 *Produit :* ${currentProduct.title}%0A🏺 *Vase :* ${selectedVase.name}%0A📝 *Message :* ${note || 'Aucun'}%0A%0A💰 *TOTAL :* $${total}`;

    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  });
});
