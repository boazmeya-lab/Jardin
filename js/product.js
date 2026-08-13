/* ===========================================================
   JARDIN AGRO — Page produit
   =========================================================== */

(function(){
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id") || PRODUCTS[0].id;
  const product = getProductById(id) || PRODUCTS[0];

  let selectedSize = "Moyen";
  let qty = 1;

  const SIZE_MULTIPLIER = { "Petit": 0.85, "Moyen": 1, "Grand": 1.35 };

  function currentPrice(){
    return Math.round(product.price * SIZE_MULTIPLIER[selectedSize]);
  }

  function render(){
    document.title = `${product.name} — Jardin Agro`;

    document.getElementById("pdName").textContent = product.name;
    document.getElementById("pdCategory").textContent = product.category;
    document.getElementById("pdDesc").textContent = product.description;
    document.getElementById("pdStars").textContent = "★".repeat(product.rating) + "☆".repeat(5 - product.rating);
    document.getElementById("breadcrumbName").textContent = product.name;

    const mainImg = document.getElementById("pdMainImage");
    mainImg.src = product.gallery[0];
    mainImg.alt = product.name;

    const thumbsWrap = document.getElementById("pdThumbs");
    thumbsWrap.innerHTML = product.gallery.map((src, i) => `
      <button class="pd-thumb ${i === 0 ? "active" : ""}" data-src="${src}" aria-label="Image ${i + 1}">
        <img src="${src}" alt="${product.name} vue ${i + 1}" loading="lazy">
      </button>
    `).join("");

    thumbsWrap.querySelectorAll(".pd-thumb").forEach(btn => {
      btn.addEventListener("click", () => {
        thumbsWrap.querySelectorAll(".pd-thumb").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        mainImg.src = btn.dataset.src;
      });
    });

    updatePrice();
    renderRelated();
  }

  function updatePrice(){
    const priceEl = document.getElementById("pdPrice");
    const price = currentPrice();
    priceEl.innerHTML = product.oldPrice
      ? `<span class="old">${SHOP_CONFIG.currency}${product.oldPrice}</span>${SHOP_CONFIG.currency}${price}`
      : `${SHOP_CONFIG.currency}${price}`;
  }

  /* Zoom */
  const mainImageBox = document.getElementById("pdMainImageBox");
  if(mainImageBox){
    mainImageBox.addEventListener("click", () => mainImageBox.classList.toggle("zoomed"));
  }

  /* Size selector */
  document.querySelectorAll(".size-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".size-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      selectedSize = btn.dataset.size;
      updatePrice();
    });
  });

  /* Quantity */
  const qtyDisplay = document.getElementById("qtyDisplay");
  document.getElementById("qtyMinus").addEventListener("click", () => {
    qty = Math.max(1, qty - 1);
    qtyDisplay.textContent = qty;
  });
  document.getElementById("qtyPlus").addEventListener("click", () => {
    qty += 1;
    qtyDisplay.textContent = qty;
  });

  /* Add to cart */
  document.getElementById("addToCartBtn").addEventListener("click", () => {
    Cart.add({
      id: product.id,
      name: product.name,
      price: currentPrice(),
      size: selectedSize,
      qty: qty,
      image: product.gallery[0]
    });
    showToast(`${product.name} ajouté au panier`);
  });

  /* Order directly via WhatsApp */
  document.getElementById("orderWhatsappBtn").addEventListener("click", () => {
    const msg = `Bonjour Jardin Agro 🌹\nJe souhaite commander :\nProduit : ${product.name}\nTaille : ${selectedSize}\nQuantité : ${qty}\nPrix : ${SHOP_CONFIG.currency}${currentPrice() * qty}\nMerci.`;
    const url = `https://wa.me/${SHOP_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  });

  function renderRelated(){
    const wrap = document.getElementById("relatedGrid");
    if(!wrap) return;
    const related = PRODUCTS.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);
    const fallback = related.length ? related : PRODUCTS.filter(p => p.id !== product.id).slice(0, 4);
    wrap.innerHTML = fallback.map(renderProductCard).join("");
  }

  render();
})();
