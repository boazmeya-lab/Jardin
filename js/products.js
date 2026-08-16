// Base de données des produits par univers
const products = [
  // HÔTEL
  { id: 1, title: "Composition Reception VIP", category: "hotel", price: "45 $", deliverable: true, image: "image/hotel.jpg" },
  { id: 2, title: "Bouquet Hall d'Accueil", category: "hotel", price: "60 $", deliverable: true, image: "image/couverture.jpg" },
  
  // ENTREPRISES & BANQUES
  { id: 3, title: "Abonnement Bureau Exécutif", category: "entreprise", price: "35 $", deliverable: true, image: "image/bureau.jpg" },
  
  // CONFÉRENCES & CÉRÉMONIES
  { id: 4, title: "Décoration Pupitre & Scène", category: "conference", price: "80 $", deliverable: false, image: "image/evenement.jpg" },
  
  // MARIAGE & FÊTES
  { id: 5, title: "Bouquet Nuptial Élégance", category: "mariage", price: "50 $", deliverable: true, image: "image/mariage.jpg" },
  
  // FUNÉRAIRE
  { id: 6, title: "Couronne d'Hommage Royale", category: "funeraire", price: "70 $", deliverable: true, image: "image/finerail.jpg" }
];

const categoryNames = {
  all: "Tous nos Produits",
  hotel: "Fleurs pour Hôtels",
  entreprise: "Entreprises & Banques",
  conference: "Conférences & Cérémonies",
  mariage: "Mariage & Fêtes",
  funeraire: "Cérémonies Funéraires"
};

document.addEventListener('DOMContentLoaded', () => {
  const productsGrid = document.getElementById('productsGrid');
  const categoryTitle = document.getElementById('categoryTitle');
  const filterBtns = document.querySelectorAll('.filter-btn');

  const urlParams = new URLSearchParams(window.location.search);
  const currentCategory = urlParams.get('category') || 'all';

  function renderProducts(category) {
    productsGrid.innerHTML = '';
    
    const filtered = category === 'all' 
      ? products 
      : products.filter(p => p.category === category);

    if (filtered.length === 0) {
      productsGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #777;">Aucun produit disponible dans cette catégorie.</p>`;
      return;
    }

    filtered.forEach(product => {
      const item = document.createElement('div');
      item.className = 'gallery-item';
      
      // Badge livrable ou sur-mesure
      const deliverableBadge = product.deliverable 
        ? `<span class="badge-livrable"><i class="fa-solid fa-truck-fast"></i> Livrable</span>` 
        : `<span class="badge-livrable sur-mesure"><i class="fa-solid fa-location-dot"></i> Sur place</span>`;

      item.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        ${deliverableBadge}
        <div class="gallery-overlay">
          <div class="product-details">
            <span class="product-title">${product.title}</span>
            <span class="product-price">${product.price}</span>
          </div>
        </div>
      `;
      productsGrid.appendChild(item);
    });

    if (categoryTitle && categoryNames[category]) {
      categoryTitle.textContent = categoryNames[category];
    }

    filterBtns.forEach(btn => {
      if (btn.dataset.category === category) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  renderProducts(currentCategory);

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedCategory = btn.dataset.category;
      const newUrl = window.location.pathname + '?category=' + selectedCategory;
      window.history.pushState({ path: newUrl }, '', newUrl);
      renderProducts(selectedCategory);
    });
  });
});
// Dans js/products.js (à l'intérieur du foreach)
filtered.forEach(product => {
  const item = document.createElement('div');
  item.className = 'gallery-item';
  
  const deliverableBadge = product.deliverable 
    ? `<span class="badge-livrable"><i class="fa-solid fa-truck-fast"></i> Livrable</span>` 
    : `<span class="badge-livrable sur-mesure"><i class="fa-solid fa-location-dot"></i> Sur place</span>`;

  item.innerHTML = `
    <a href="product-detail.html?id=${product.id}" class="product-card-link">
      <img src="${product.image}" alt="${product.title}">
      ${deliverableBadge}
      <div class="gallery-overlay">
        <div class="product-details">
          <span class="product-title">${product.title}</span>
          <span class="product-price">${product.price}</span>
          <span class="btn-customize"><i class="fa-solid fa-sliders"></i> Personnaliser</span>
        </div>
      </div>
    </a>
  `;
  productsGrid.appendChild(item);
});
function renderProducts(category) {
  productsGrid.innerHTML = '';
  
  const filtered = category === 'all' 
    ? products 
    : products.filter(p => p.category === category);

  if (filtered.length === 0) {
    productsGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #777;">Aucun produit disponible dans cette catégorie.</p>`;
    return;
  }

  filtered.forEach(product => {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    
    const deliverableBadge = product.deliverable 
      ? `<span class="badge-livrable"><i class="fa-solid fa-truck-fast"></i> Livrable</span>` 
      : `<span class="badge-livrable sur-mesure"><i class="fa-solid fa-location-dot"></i> Sur place</span>`;

    // Le lien englobe toute la carte pour rendre la zone cliquable entièrement
    item.innerHTML = `
      <a href="product-detail.html?id=${product.id}" class="gallery-card-link">
        <img src="${product.image}" alt="${product.title}">
        ${deliverableBadge}
        <div class="gallery-overlay">
          <div class="product-details">
            <span class="product-title">${product.title}</span>
            <span class="product-price">${product.price}</span>
            <span class="btn-customize-tag"><i class="fa-solid fa-sliders"></i> Personnaliser</span>
          </div>
        </div>
      </a>
    `;
    productsGrid.appendChild(item);
  });

  if (categoryTitle && categoryNames[category]) {
    categoryTitle.textContent = categoryNames[category];
  }

  filterBtns.forEach(btn => {
    if (btn.dataset.category === category) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
        }
