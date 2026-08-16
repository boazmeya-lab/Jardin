document.addEventListener('DOMContentLoaded', () => {
  const detailContainer = document.getElementById('productDetailContent');
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get('id'));

  // Recherche du produit sélectionné
  const product = products.find(p => p.id === productId);

  if (!product) {
    detailContainer.innerHTML = `<p>Produit introuvable. <a href="products.html">Retour au catalogue</a></p>`;
    return;
  }

  // Affichage des détails du produit
  detailContainer.innerHTML = `
    <div class="product-detail-img">
      <img src="${product.image}" alt="${product.title}">
    </div>
    <div class="product-detail-info">
      <h1>${product.title}</h1>
      <p class="price-tag">${product.price}</p>
      
      <form id="customizeForm" class="customize-form">
        <h3>Personnalisez votre commande</h3>
        
        <label>Taille du bouquet :</label>
        <select id="bouquetSize">
          <option value="Standard">Standard</option>
          <option value="Moyen (+15$)">Moyen (+15$)</option>
          <option value="Grand / Premium (+30$)">Grand / Premium (+30$)</option>
        </select>

        <label>Couleur dominante des fleurs :</label>
        <select id="flowerColor">
          <option value="Rouge & Blanc">Rouge & Blanc</option>
          <option value="Rose & Pastel">Rose & Pastel</option>
          <option value="Jaune & Doré">Jaune & Doré</option>
          <option value="Multicolore">Multicolore</option>
        </select>

        <label>Message pour la carte de voeux (Optionnel) :</label>
        <textarea id="cardMessage" placeholder="Écrivez votre mot doux ou instructions ici..."></textarea>

        <button type="submit" class="btn-order-whatsapp">
          <i class="fa-brands fa-whatsapp"></i> Commander sur WhatsApp
        </button>
      </form>
    </div>
  `;

  // Redirection WhatsApp avec les options choisies
  document.getElementById('customizeForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const size = document.getElementById('bouquetSize').value;
    const color = document.getElementById('flowerColor').value;
    const message = document.getElementById('cardMessage').value;

    const whatsappNum = "243000000000"; // Remplacez par le numéro Jardin Agro
    const textMessage = `Bonjour Jardin Agro,%0A%0AJe souhaite commander : *${product.title}*%0A- *Taille :* ${size}%0A- *Couleurs :* ${color}%0A- *Message :* ${message || 'Aucun'}%0A%0APrix de base : ${product.price}`;

    window.open(`https://wa.me/${whatsappNum}?text=${textMessage}`, '_blank');
  });
});
