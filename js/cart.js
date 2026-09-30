/* ===========================================================
   JARDIN AGRO — Panier unique du site
   (index.html, products.html, creer-bouquet.html)
   Utilise window.PRODUCTS défini dans js/data.js
   Clé localStorage : "jardinAgroProductCart"
   Un article du panier = produit du catalogue OU bouquet personnalisé
   (un bouquet a en plus un champ "details" : liste de lignes de texte)
   =========================================================== */

const PRODUCT_CART_KEY = 'jardinAgroProductCart';
const OLD_BOUQUET_CART_KEY = 'jardinAgroCart'; // ancien panier du configurateur

/* ---------- Stockage ---------- */
function getProductCart() {
  try {
    return JSON.parse(localStorage.getItem(PRODUCT_CART_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveProductCart(cart) {
  try { localStorage.setItem(PRODUCT_CART_KEY, JSON.stringify(cart)); } catch (e) {}
  updateCartBadge();
}

// Reprend les bouquets de l'ancien panier (une seule fois), puis le supprime
function migrateOldBouquetCart() {
  try {
    const old = JSON.parse(localStorage.getItem(OLD_BOUQUET_CART_KEY));
    if (Array.isArray(old) && old.length) {
      const cart = getProductCart();
      old.forEach((o, i) => {
        const details = (o.flowers || []).map(f => `${f.qty} × ${f.name}`);
        if (o.wrapping) details.push('Emballage : ' + o.wrapping);
        if (o.ribbon) details.push('Ruban : ' + o.ribbon);
        cart.push({ id: 'bouquet-old-' + Date.now() + '-' + i, name: 'Bouquet personnalisé',
                    price: o.total || 0, image: '', qty: 1, details });
      });
      localStorage.setItem(PRODUCT_CART_KEY, JSON.stringify(cart));
    }
    localStorage.removeItem(OLD_BOUQUET_CART_KEY);
  } catch (e) {}
}

/* ---------- Actions panier ---------- */
function addToCart(productId, qty = 1) {
  const product = (window.PRODUCTS || []).find(p => p.id == productId);
  if (!product) {
    console.error('Produit introuvable pour l\'id :', productId);
    return;
  }

  const cart = getProductCart();
  const existing = cart.find(item => item.id == productId);

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      qty: qty
    });
  }

  saveProductCart(cart);
  renderCartUI();
}

// Ajoute un article libre (ex. bouquet personnalisé) : {id, name, price, image, qty, details[]}
function addCustomItem(item) {
  const cart = getProductCart();
  cart.push(Object.assign({ qty: 1, image: '', details: [] }, item));
  saveProductCart(cart);
  renderCartUI();
}

function removeFromCart(index) {
  const cart = getProductCart();
  cart.splice(index, 1);
  saveProductCart(cart);
  renderCartUI();
}

function changeCartQty(index, delta) {
  const cart = getProductCart();
  if (!cart[index]) return;
  cart[index].qty = Math.max(1, cart[index].qty + delta);
  saveProductCart(cart);
  renderCartUI();
}

/* ---------- Affichage ---------- */
function updateCartBadge() {
  const badge = document.getElementById('cartBadge');
  if (!badge) return;
  const cart = getProductCart();
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  badge.textContent = totalQty;
}

function renderCartUI() {
  const itemsEl = document.getElementById('cartItems');
  const totalEl = document.getElementById('cartTotal');
  if (!itemsEl || !totalEl) return;

  const cart = getProductCart();

  if (cart.length === 0) {
    itemsEl.innerHTML = '<p style="text-align:center; padding:20px; color:#8FAE95;">Votre panier est vide</p>';
  } else {
    itemsEl.innerHTML = cart.map((item, index) => `
      <div class="cart-item" style="display:flex; gap:12px; padding:12px 0; border-bottom:1px solid #EAE6E2;">
        ${item.image ? `<img src="${item.image}" alt="${item.name}" style="width:56px; height:56px; object-fit:cover; border-radius:4px;" onerror="this.style.visibility='hidden'">` : ''}
        <div style="flex:1;">
          <div style="font-weight:600;">${item.name}</div>
          ${item.details && item.details.length ? `<div style="font-size:12px; color:#6E6865; margin-top:2px;">${item.details.join(' · ')}</div>` : ''}
          <div style="font-size:13px; color:#3F6E4A;">${item.price.toFixed(2)} $ x ${item.qty}</div>
          <div style="display:flex; align-items:center; gap:8px; margin-top:6px;">
            <button class="cart-qty-btn" data-action="minus" data-index="${index}" style="width:24px;height:24px;border:1px solid #3F6E4A;background:none;border-radius:50%;cursor:pointer;">−</button>
            <span>${item.qty}</span>
            <button class="cart-qty-btn" data-action="plus" data-index="${index}" style="width:24px;height:24px;border:1px solid #3F6E4A;background:none;border-radius:50%;cursor:pointer;">+</button>
            <button class="cart-remove-btn" data-index="${index}" style="margin-left:auto; background:none; border:none; color:#B11A29; font-size:12px; cursor:pointer;">Retirer</button>
          </div>
        </div>
      </div>
    `).join('');

    itemsEl.querySelectorAll('.cart-qty-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = +btn.dataset.index;
        const delta = btn.dataset.action === 'plus' ? 1 : -1;
        changeCartQty(index, delta);
      });
    });

    itemsEl.querySelectorAll('.cart-remove-btn').forEach(btn => {
      btn.addEventListener('click', () => removeFromCart(+btn.dataset.index));
    });
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  totalEl.textContent = `$${total.toFixed(2)}`;

  updateCartBadge();
}

/* ---------- Ouverture / fermeture du tiroir panier ---------- */
function openCart() {
  const overlay = document.getElementById('cartOverlay');
  const drawer = document.getElementById('cartDrawer');
  if (!overlay || !drawer) {
    console.error('cartOverlay ou cartDrawer introuvable dans le HTML.');
    return;
  }
  renderCartUI();
  overlay.classList.add('active');
  drawer.classList.add('active');
}

function closeCart() {
  const overlay = document.getElementById('cartOverlay');
  const drawer = document.getElementById('cartDrawer');
  if (overlay) overlay.classList.remove('active');
  if (drawer) drawer.classList.remove('active');
}

// Exposées globalement pour main.js et creer-bouquet.html
window.openCart = openCart;
window.closeCart = closeCart;
window.addToCart = addToCart;
window.addCustomItem = addCustomItem;

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', () => {
  migrateOldBouquetCart();
  updateCartBadge();

  const closeBtn = document.getElementById('cartCloseBtn');
  if (closeBtn) closeBtn.addEventListener('click', closeCart);

  const overlay = document.getElementById('cartOverlay');
  if (overlay) overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeCart();
  });

  // Délégation : tout bouton "Ajouter au panier" doit porter
  // class="add-to-cart" et data-id="ID_DU_PRODUIT"
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.add-to-cart');
    if (btn && btn.dataset.id) {
      addToCart(btn.dataset.id);
    }
  });

  // Bouton WhatsApp du panier
  const whatsappBtn = document.getElementById('cartWhatsappBtn');
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', () => {
      const cart = getProductCart();
      if (cart.length === 0) return;
      const number = (window.SHOP_CONFIG && window.SHOP_CONFIG.whatsappNumber) || '';
      let msg = 'Bonjour ! Je souhaite commander :\n\n';
      cart.forEach(item => {
        msg += `- ${item.qty} x ${item.name} (${(item.price * item.qty).toFixed(2)} $)\n`;
        (item.details || []).forEach(d => { msg += `    · ${d}\n`; });
      });
      const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
      msg += `\nTotal : ${total.toFixed(2)} $`;
      window.open(`https://wa.me/${number}?text=${encodeURIComponent(msg)}`, '_blank');
    });
  }
});
