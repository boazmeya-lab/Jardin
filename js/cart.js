/* ===========================================================
   JARDIN AGRO — Panier, Notifications & Interactions
   =========================================================== */

// 1. CONFIGURATION GLOBALE DU SHOP
const SHOP_CONFIG = {
  currency: "$",
  whatsappNumber: "243998096713"
};

const Cart = {
  KEY: "jardinagro_cart",

  read(){
    try{
      return JSON.parse(localStorage.getItem(this.KEY)) || [];
    }catch(e){ return []; }
  },

  write(items){
    localStorage.setItem(this.KEY, JSON.stringify(items));
    this.updateBadge();
  },

  add(item){
    // item: {id, name, price, size, qty, image}
    const items = this.read();
    const existing = items.find(i => i.id === item.id && i.size === item.size);
    if(existing){
      existing.qty += item.qty;
    }else{
      items.push(item);
    }
    this.write(items);
    this.renderDrawer();
    
    // Notification visuelle d'ajout au panier
    showCartToast(`"<strong>${item.name}</strong>" a été ajouté au panier ! 🌹`);
    
    return items;
  },

  remove(index){
    const items = this.read();
    items.splice(index, 1);
    this.write(items);
    this.renderDrawer();
  },

  changeQty(index, delta){
    const items = this.read();
    if(!items[index]) return;
    items[index].qty = Math.max(1, items[index].qty + delta);
    this.write(items);
    this.renderDrawer();
  },

  count(){
    return this.read().reduce((sum, i) => sum + i.qty, 0);
  },

  total(){
    return this.read().reduce((sum, i) => sum + i.qty * i.price, 0);
  },

  clear(){
    this.write([]);
    this.renderDrawer();
  },

  updateBadge(){
    document.querySelectorAll(".cart-count").forEach(el => {
      const c = this.count();
      el.textContent = c;
      el.style.display = c > 0 ? "flex" : "none";
    });
  },

  renderDrawer(){
    const list = document.getElementById("cartItems");
    const totalEl = document.getElementById("cartTotal");
    const whatsBtn = document.getElementById("cartWhatsappBtn");
    if(!list) return;

    const items = this.read();

    if(items.length === 0){
      // Affichage quand le panier est vide avec illustration de l'ours
      list.innerHTML = `
        <div class="cart-empty" style="text-align: center; padding: 30px 10px;">
          <div style="font-size: 64px; margin-bottom: 10px;">🐻💤</div>
          <p style="font-weight: bold; font-size: 1.1rem; color: #4a5568; margin-bottom: 5px;">
            Oups ! L'ours du jardin trouve votre panier vide !
          </p>
          <p style="color: #718096; font-size: 0.9rem;">
            Ajoutez de magnifiques fleurs et bouquets 🌹
          </p>
        </div>
      `;
      if(whatsBtn) whatsBtn.setAttribute("disabled", "true");
    }else{
      list.innerHTML = items.map((item, idx) => `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}" loading="lazy">
          <div class="cart-item-info">
            <span class="cart-item-name">${item.name}</span>
            <span class="cart-item-meta">Taille : ${item.size} · ${SHOP_CONFIG.currency}${item.price}</span>
            <div class="cart-item-row">
              <div class="qty-mini">
                <button aria-label="Diminuer" onclick="Cart.changeQty(${idx}, -1)">−</button>
                <span>${item.qty}</span>
                <button aria-label="Augmenter" onclick="Cart.changeQty(${idx}, 1)">+</button>
              </div>
              <button class="cart-remove" onclick="Cart.remove(${idx})">Retirer</button>
            </div>
          </div>
        </div>
      `).join("");
      if(whatsBtn) whatsBtn.removeAttribute("disabled");
    }

    if(totalEl) totalEl.textContent = `${SHOP_CONFIG.currency}${this.total()}`;
  },

  whatsappMessage(){
    const items = this.read();
    if(items.length === 0) return "";
    let msg = "Bonjour Jardin Agro 🌹\n\nJe souhaite commander :\n\n";
    items.forEach(item => {
      msg += `• ${item.qty} × ${item.name} (${item.size}) - ${SHOP_CONFIG.currency}${item.price * item.qty}\n`;
    });
    msg += `\nTotal estimé : ${SHOP_CONFIG.currency}${this.total()}\n\nMerci.`;
    return msg;
  },

  sendWhatsapp(){
    const msg = this.whatsappMessage();
    if(!msg) return;
    const url = `https://wa.me/${SHOP_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  }
};

/* --- Fonctions d'ouverture / fermeture du panier --- */
function openCart(){
  const overlay = document.getElementById("cartOverlay");
  const drawer = document.getElementById("cartDrawer");
  if(overlay) overlay.classList.add("open");
  if(drawer) drawer.classList.add("open");
  document.body.style.overflow = "hidden";
  Cart.renderDrawer();
}

function closeCart(){
  const overlay = document.getElementById("cartOverlay");
  const drawer = document.getElementById("cartDrawer");
  if(overlay) overlay.classList.remove("open");
  if(drawer) drawer.classList.remove("open");
  document.body.style.overflow = "";
}

/* --- Notification Toast Visuelle --- */
function showCartToast(message) {
  let toast = document.getElementById("cartToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "cartToast";
    toast.style.cssText = `
      position: fixed;
      bottom: 25px;
      right: 25px;
      background-color: #2e7d32;
      color: #ffffff;
      padding: 14px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 10000;
      font-size: 14px;
      transition: all 0.3s ease;
      opacity: 0;
      transform: translateY(20px);
      pointer-events: none;
    `;
    document.body.appendChild(toast);
  }

  toast.innerHTML = message;
  toast.style.opacity = "1";
  toast.style.transform = "translateY(0)";

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(20px)";
  }, 3000);
}

/* --- Helper : Récupérer les données du produit sur clic --- */
function getProductDataFromElement(btnEl) {
  const card = btnEl.closest('.product-card') || btnEl.closest('.swiper-slide') || btnEl.closest('.group');
  if(!card) return null;

  return {
    id: card.dataset.id || "prod_" + Date.now(),
    name: card.dataset.name || card.querySelector('h3')?.textContent.trim() || "Bouquet Jardin Agro",
    price: parseFloat(card.dataset.price) || 0,
    size: card.dataset.size || "Standard",
    qty: 1,
    image: card.dataset.image || card.querySelector('img')?.src || ""
  };
}

/* --- Action 1 : Ajouter au Panier --- */
function addCurrentProductToCart(btnEl) {
  const item = getProductDataFromElement(btnEl);
  if(item) {
    Cart.add(item);
  }
}

/* --- Action 2 : Commander Tout de Suite via WhatsApp --- */
function buyCurrentProductNow(btnEl) {
  const item = getProductDataFromElement(btnEl);
  const name = item ? item.name : "un bouquet";
  const msg = encodeURIComponent(`Bonjour Jardin Agro ! Je souhaite commander directement : ${name}`);
  window.open(`https://wa.me/${SHOP_CONFIG.whatsappNumber}?text=${msg}`, '_blank');
}

/* --- Initialisation --- */
document.addEventListener("DOMContentLoaded", () => {
  Cart.updateBadge();

  const cartBtn = document.getElementById("cartToggle");
  if(cartBtn) {
    cartBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openCart();
    });
  }

  const closeBtn = document.getElementById("cartCloseBtn");
  if(closeBtn) closeBtn.addEventListener("click", closeCart);

  const overlay = document.getElementById("cartOverlay");
  if(overlay) overlay.addEventListener("click", closeCart);

  const whatsBtn = document.getElementById("cartWhatsappBtn");
  if(whatsBtn) whatsBtn.addEventListener("click", () => Cart.sendWhatsapp());
});
       
