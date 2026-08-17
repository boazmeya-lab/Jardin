// Base de données des produits par univers
const products = [
  // HÔTEL
  { id: 1, title: "Composition Reception VIP", category: "hotels", price: "45 $", surMesure: false, image: "image/hotel.jpg" },
  { id: 2, title: "Bouquet Hall d'Accueil", category: "hotels", price: "60 $", surMesure: false, image: "image/couverture.jpg" },
  
  // ENTREPRISES & BANQUES
  { id: 3, title: "Abonnement Bureau Exécutif", category: "entreprises", price: "35 $", surMesure: false, image: "image/bureau.jpg" },
  
  // CONFÉRENCES & CÉRÉMONIES
  { id: 4, title: "Décoration Pupitre & Scène", category: "conferences", price: "80 $", surMesure: true, image: "image/evenement.jpg" },
  
  // MARIAGE & FÊTES
  { id: 5, title: "Bouquet Nuptial Élégance", category: "mariage", price: "50 $", surMesure: false, image: "image/mariage.jpg" },
  
  // FUNÉRAIRE
  { id: 6, title: "Couronne d'Hommage Royale", category: "funeraire", price: "70 $", surMesure: false, image: "image/finerail.jpg" }
];

const categoryNames = {
  all: "Tous nos Produits",
  hotels: "Compositions pour Hôtels",
  entreprises: "Fleurs pour Entreprises & Banques",
  conferences: "Décorations de Conférences",
  mariage: "Mariage & Célébrations",
  funeraire: "Hommages Funéraires"
};

// Mapping pour harmoniser les variantes d'URL (ex: ?cat=hotel ou ?cat=hotels)
const categoryMap = {
  'hotel': 'hotels',
  'hotels': 'hotels',
  'entreprise': 'entreprises',
  'entreprises': 'entreprises',
  'banque': 'entreprises',
  'banques': 'entreprises',
  'conference': 'conferences',
  'conferences': 'conferences',
  'mariage': 'mariage',
  'mariages': 'mariage',
  'fete': 'mariage',
  'fetes': 'mariage',
  'funeraire': 'funeraire',
  'funeraires': 'funeraire',
  'deuil': 'funeraire'
};

document.addEventListener('DOMContentLoaded', () => {
  const productsGrid = document.getElementById('productsGrid');
  const pageTitle = document.getElementById('pageTitle') || document.getElementById('categoryTitle');
  const filterBtns = document.querySelectorAll('.filter-btn');

  // Récupération de 'cat' OU 'category' dans l'URL pour éviter tout bug
  const urlParams = new URLSearchParams(window.location.search);
  const rawCategory = urlParams.get('cat') || urlParams.get('category') || 'all';
  const currentCategory = categoryMap[rawCategory.toLowerCase().trim()] || rawCategory;

  function renderProducts(category) {
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    
    const filtered = category === 'all' 
      ? products 
      : products.filter(p => p.category === category);

    if (filtered.length === 0) {
      productsGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #777; padding: 40px;">Aucun produit disponible dans cette catégorie.</p>`;
      return;
    }

    // Rendu HTML identique aux cartes de ton HTML principal
    productsGrid.innerHTML = filtered.map(p => `
      <div class="product-card">
        <span class="badge-livrable ${p.surMesure ? 'sur-mesure' : ''}">
          <i class="fa-solid ${p.surMesure ? 'fa-pen-ruler' : 'fa-truck-fast'}"></i> 
          ${p.surMesure ? 'Sur mesure' : 'Livrable'}
        </span>
        <img src="${p.image}" alt="${p.title}" onerror="this.src='image/logi.png'">
        <div class="product-details">
          <h3>${p.title}</h3>
          <p class="price">${p.price}</p>
          <a href="product-detail.html?id=${p.id}" class="btn-discover">
            Découvrir <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      </div>
    `).join('');

    // Mise à jour du titre h1
    if (pageTitle && categoryNames[category]) {
      pageTitle.textContent = categoryNames[category];
    }

    // Activation du bouton correspondant
    filterBtns.forEach(btn => {
      if (btn.dataset.category === category) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // Affichage initial
  renderProducts(currentCategory);

  // Gestion du clic sur les boutons de filtre
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedCategory = btn.dataset.category;
      const newUrl = window.location.pathname + '?cat=' + selectedCategory;
      window.history.pushState({ path: newUrl }, '', newUrl);
      renderProducts(selectedCategory);
    });
  });
});
