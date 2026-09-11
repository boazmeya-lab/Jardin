/* ===========================================================
   JARDIN AGRO — Affichage, filtres et recherche du catalogue
   =========================================================== */

// 1. Actions "Panier" / "Commander" sur une carte produit
function addCurrentProductToCart(button) {
  const card = button.closest('.product-card');
  if (!card) return;
  const id = Number(card.dataset.id);
  if (typeof addToCart === 'function') {
    addToCart(id, 1);
  }
}

function buyCurrentProductNow(button) {
  const card = button.closest('.product-card');
  if (!card) return;

  const name = card.dataset.name;
  const price = card.dataset.price;

  const message = `Bonjour Jardin Agro, je souhaite commander :\n\n• ${name} : ${SHOP_CONFIG.currency}${price}\n\nMerci de me confirmer la disponibilité et la livraison !`;
  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/${SHOP_CONFIG.whatsappNumber}?text=${encodedMessage}`, '_blank');
}

window.addCurrentProductToCart = addCurrentProductToCart;
window.buyCurrentProductNow = buyCurrentProductNow;

// 2. Affichage et filtrage du catalogue (page products.html)
document.addEventListener('DOMContentLoaded', () => {
  const productsGrid = document.getElementById('productsGrid');
  const pageTitle = document.getElementById('pageTitle') || document.getElementById('categoryTitle');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const searchStatusWrap = document.getElementById('searchStatusWrap');
  const searchStatus = document.getElementById('searchStatus');

  // Widget de recherche dans le header
  const searchWidget = document.getElementById('searchWidget');
  const searchToggle = document.getElementById('searchToggle');
  const searchForm = document.getElementById('searchForm');
  const searchInput = document.getElementById('searchInput');

  // URL Params
  const urlParams = new URLSearchParams(window.location.search);
  const rawCategory = urlParams.get('cat') || urlParams.get('category') || 'all';
  let currentCategory = categoryMap[rawCategory.toLowerCase().trim()] || rawCategory;
  let currentSearch = urlParams.get('search') || '';

  if (searchInput && currentSearch) {
    searchInput.value = currentSearch;
  }

  function updateUrl() {
    const params = new URLSearchParams();
    if (currentCategory && currentCategory !== 'all') params.set('cat', currentCategory);
    if (currentSearch) params.set('search', currentSearch);
    const query = params.toString();
    const newUrl = window.location.pathname + (query ? '?' + query : '');
    window.history.pushState({ path: newUrl }, '', newUrl);
  }

  function renderProducts(category, searchTerm) {
    if (!productsGrid) return;

    productsGrid.innerHTML = '';

    let filtered = category === 'all'
      ? products
      : products.filter(p => p.category === category);

    const normalizedSearch = normalizeText(searchTerm);
    if (normalizedSearch) {
      filtered = filtered.filter(p => normalizeText(p.name).includes(normalizedSearch));
    }

    if (searchStatusWrap && searchStatus) {
      if (normalizedSearch) {
        searchStatusWrap.style.display = 'block';
        searchStatus.textContent = `Résultats pour « ${searchTerm} » (${filtered.length})`;
      } else {
        searchStatusWrap.style.display = 'none';
      }
    }

    if (filtered.length === 0) {
      const message = normalizedSearch
        ? `Aucune fleur ne correspond à « ${searchTerm} ».`
        : 'Aucun produit disponible dans cette catégorie.';
      productsGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #777; padding: 40px;">${message}</p>`;
      return;
    }

    // Rendu des cartes produits avec boutons "Ajouter au panier" et "Commander"
    productsGrid.innerHTML = filtered.map(p => `
      <div class="product-card" data-id="${p.id}" data-name="${p.name}" data-price="${p.price}" data-size="Standard" data-image="${p.image}">
        <span class="badge-livrable ${p.surMesure ? 'sur-mesure' : ''}">
          <i class="fa-solid ${p.surMesure ? 'fa-pen-ruler' : 'fa-truck-fast'}"></i>
          ${p.surMesure ? 'Sur mesure' : 'Livrable'}
        </span>
        <img src="${p.image}" alt="${p.name}" onerror="this.src='image/logi.png'">
        <div class="product-details">
          <h3>${p.name}</h3>
          <p class="price">${p.price > 0 ? SHOP_CONFIG.currency + p.price : 'Sur devis'}</p>

          <div class="product-actions-group" style="display: flex; gap: 8px; margin-top: 10px;">
            <button type="button" class="btn-add-cart" onclick="addCurrentProductToCart(this)" style="flex: 1; padding: 8px; background: #2e7d32; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-size: 0.85rem;">
              <i class="fa-solid fa-cart-shopping"></i> Panier
            </button>
            <button type="button" class="btn-buy-now" onclick="buyCurrentProductNow(this)" style="flex: 1; padding: 8px; background: #25d366; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-size: 0.85rem;">
              <i class="fa-brands fa-whatsapp"></i> Commander
            </button>
          </div>
        </div>
      </div>
    `).join('');

    if (pageTitle && categoryNames[category]) {
      pageTitle.textContent = normalizedSearch ? 'Résultats de recherche' : categoryNames[category];
    }

    filterBtns.forEach(btn => {
      if (btn.dataset.category === category) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // Affichage initial
  renderProducts(currentCategory, currentSearch);

  // Écouteurs de clics sur les filtres
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currentCategory = btn.dataset.category;
      updateUrl();
      renderProducts(currentCategory, currentSearch);
    });
  });

  // Écouteurs sur la recherche
  if (searchWidget && searchToggle && searchForm && searchInput) {
    searchToggle.addEventListener('click', () => {
      searchWidget.classList.toggle('active');
      if (searchWidget.classList.contains('active')) {
        searchInput.focus();
      }
    });

    searchInput.addEventListener('input', () => {
      currentSearch = searchInput.value.trim();
      renderProducts(currentCategory, currentSearch);
      updateUrl();
    });

    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      currentSearch = searchInput.value.trim();
      renderProducts(currentCategory, currentSearch);
      updateUrl();
      searchInput.blur();
    });

    document.addEventListener('click', (e) => {
      if (!searchWidget.contains(e.target) && !searchInput.value.trim()) {
        searchWidget.classList.remove('active');
      }
    });

    if (currentSearch) {
      searchWidget.classList.add('active'
<script src="js/data.js?v=1.0"></script>
<script src="js/cart.js?v=1.0"></script>
<script src="js/products.js?v=4.0"></script>
<script src="js/main.js"></script>
    }
  }
});
