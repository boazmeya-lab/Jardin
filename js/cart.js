/* ===========================================================
   JARDIN AGRO — Gestion du Panier (Cart Drawer)
   =========================================================== */

// 1. Initialisation de la configuration
if (typeof SHOP_CONFIG === 'undefined') {
  window.SHOP_CONFIG = {
    whatsappNumber: "243998096713",
    currency: "$"
  };
}

// 2. Variable globale du panier
let cart = JSON.parse(localStorage.getItem('jardin_agro_cart')) || [];

// 3. Sauvegarder dans LocalStorage
function saveCart() {
  localStorage.setItem('jardin_agro_cart', JSON.stringify(cart));
  updateCartUI();
}

// 4. Ajouter un produit au panier
function addToCart(productId, quantity = 1) {
  const product = typeof PRODUCTS !== 'undefined' ? PRODUCTS.find(p => p.id === productId) : null;
  
  if (!product) {
    console.error("Produit non trouvé :", productId);
    return;
  }

  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity
    });
  }

  saveCart();
  openCartDrawer();
}

// 5. Supprimer un produit du panier
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
}

// 6. Modifier la quantité
function updateQuantity(productId, change) {
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(productId);
    } else {
      saveCart();
    }
  }
}

// 7. Mettre à jour l'affichage du panier (Badge + Liste + Total)
function updateCartUI() {
  // Badges (Nombre total d'articles)
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badges = document.querySelectorAll('#cartBadge, .cart-count');
  badges.forEach(badge => {
    badge.textContent = totalCount;
  });

  // Liste des articles
  const cartItemsContainer = document.getElementById('cartItems');
  const cartTotalContainer = document.getElementById('cartTotal');

  if (cartItemsContainer) {
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div style="text-align: center; padding: 40px 20px; color: #777;">
          <i class="fa-solid fa-basket-shopping" style="font-size: 48px; margin-bottom: 15px; color: #ccc;"></i>
          <p>Votre panier est vide pour le moment.</p>
        </div>
      `;
    } else {
      cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item" style="display: flex; align-items: center; gap: 15px; padding: 12px 0; border-bottom: 1px solid #eee;">
          <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">
          <div style="flex: 1;">
            <h4 style="margin: 0 0 5px; font-size: 14px; font-weight: 600;">${item.name}</h4>
            <div style="font-size: 13px; color: #2e7d32; font-weight: bold;">
              ${SHOP_CONFIG.currency}${item.price}
            </div>
            <div style="display: flex; align-items: center; gap: 8px; margin-top: 6px;">
              <button onclick="updateQuantity('${item.id}', -1)" style="border:1px solid #ccc; background:#fff; width:22px; height:22px; border-radius:4px; cursor:pointer;">-</button>
              <span style="font-size: 13px; font-weight: 600;">${item.quantity}</span>
              <button onclick="updateQuantity('${item.id}', 1)" style="border:1px solid #ccc; background:#fff; width:22px; height:22px; border-radius:4px; cursor:pointer;">+</button>
            </div>
          </div>
          <button onclick="removeFromCart('${item.id}')" style="border:none; background:none; color:#d32f2f; cursor:pointer; font-size:16px;" aria-label="Supprimer">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      `).join('');
    }
  }

  // Total
  if (cartTotalContainer) {
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalContainer.textContent = `${SHOP_CONFIG.currency}${totalAmount}`;
  }
}

// 8. Fonctions Ouverture / Fermeture Tiroir
function openCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  if (drawer) drawer.classList.add('active');
  if (overlay) overlay.classList.add('active');
}

function closeCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  if (drawer) drawer.classList.remove('active');
  if (overlay) overlay.classList.remove('active');
}

// 9. Envoyer la commande WhatsApp
function sendWhatsAppOrder() {
  if (cart.length === 0) {
    alert("Votre panier est vide.");
    return;
  }

  let message = "Bonjour Jardin Agro, je souhaite passer une commande :\n\n";
  let total = 0;

  cart.forEach(item => {
    const subtotal = item.price * item.quantity;
    total += subtotal;
    message += `• ${item.name} (x${item.quantity}) : ${SHOP_CONFIG.currency}${subtotal}\n`;
  });

  message += `\n*Total : ${SHOP_CONFIG.currency}${total}*\n\nMerci de me confirmer la disponibilité et la livraison !`;

  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/${SHOP_CONFIG.whatsappNumber}?text=${encodedMessage}`, '_blank');
}

// 10. Attachement des événements au chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
  // Boutons pour ouvrir le panier
  const cartToggleBtn = document.getElementById('cartToggle');
  if (cartToggleBtn) {
    cartToggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openCartDrawer();
    });
  }

  // Boutons pour fermer le panier
  const cartCloseBtn = document.getElementById('cartCloseBtn');
  const cartOverlay = document.getElementById('cartOverlay');

  if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCartDrawer);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCartDrawer);

  // Bouton WhatsApp
  const whatsappBtn = document.getElementById('cartWhatsappBtn');
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', sendWhatsAppOrder);
  }

  // Mettre à jour l'affichage initial
  updateCartUI();
});
