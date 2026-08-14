/* ===========================================================
   JARDIN AGRO — Panier
   =========================================================== */

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
      list.innerHTML = `<div class="cart-empty">Votre panier est vide.<br>Ajoutez de belles fleurs 🌹</div>`;
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
      msg += `• ${item.qty} × ${item.name} (${item.size})\n`;
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

function openCart(){
  document.getElementById("cartOverlay").classList.add("open");
  document.getElementById("cartDrawer").classList.add("open");
  document.body.style.overflow = "hidden";
  Cart.renderDrawer();
}
function closeCart(){
  document.getElementById("cartOverlay").classList.remove("open");
  document.getElementById("cartDrawer").classList.remove("open");
  document.body.style.overflow = "";
}

document.addEventListener("DOMContentLoaded", () => {
  Cart.updateBadge();

  const cartBtn = document.getElementById("cartToggle");
  if(cartBtn) cartBtn.addEventListener("click", openCart);

  const closeBtn = document.getElementById("cartCloseBtn");
  if(closeBtn) closeBtn.addEventListener("click", closeCart);

  const overlay = document.getElementById("cartOverlay");
  if(overlay) overlay.addEventListener("click", closeCart);

  const whatsBtn = document.getElementById("cartWhatsappBtn");
  if(whatsBtn) whatsBtn.addEventListener("click", () => Cart.sendWhatsapp());
});
// NUMÉRO WHATSAPP OFFICIEL
const WHATSAPP_NUMBER = "243998096713"; 

// ÉCOUTE DE TOUS LES BOUTONS D'ACTION (Découvrir / Profiter / Réserver)
document.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;

    const text = btn.textContent.trim().toLowerCase();

    if (text.includes('découvrir') || text.includes('profiter') || text.includes('réserver')) {
        // Retrouve la carte du produit
        const card = btn.closest('.swiper-slide') || btn.closest('.group') || btn.closest('div');
        const titleElement = card ? card.querySelector('h3') : null;
        const productName = titleElement ? titleElement.textContent.trim() : "un de vos bouquets";

        // Message automatique
        const message = encodeURIComponent(`Bonjour Jardin Agro ! Je souhaite avoir plus d'informations ou commander : ${productName}`);
        
        // Redirection WhatsApp
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
    }
});

