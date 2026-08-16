// Base de données des produits par univers
const products = [
  // HÔTEL
  { id: 1, title: "Composition Reception VIP", category: "hotel", image: "image/hotel.jpg" },
  { id: 2, title: "Bouquet Hall d'Accueil", category: "hotel", image: "image/couverture.jpg" },
  
  // ENTREPRISES & BANQUES
  { id: 3, title: "Abonnement Bureau Exécutif", category: "entreprise", image: "image/bureau.jpg" },
  
  // CONFÉRENCES & CÉRÉMONIES
  { id: 4, title: "Décoration Pupitre & Scène", category: "conference", image: "image/evenement.jpg" },
  
  // MARIAGE & FÊTES
  { id: 5, title: "Bouquet Nuptial Élégance", category: "mariage", image: "image/mariage.jpg" },
  
  // FUNÉRAIRE
  { id: 6, title: "Couronne d'Hommage Royale", category: "funeraire", image: "image/finerail.jpg" }
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

  // 1. Récupérer la catégorie depuis l'URL (ex: products.html?category=hotel)
  const urlParams = new URLSearchParams(window.location.search);
  const currentCategory = urlParams.get('category') || 'all';

  // 2. Fonction d'affichage des articles
  function renderProducts(category) {
    productsGrid.innerHTML = '';
    
    const filtered = category === 'all' 
      ? products 
      : products.filter(p => p.category === category);

    if (filtered.length === 0) {
      productsGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #777;">Aucun produit disponible dans cette catégorie pour le moment.</p>`;
      return;
    }

    filtered.forEach(product => {
      const item = document.createElement('div');
      item.className = 'gallery-item';
      item.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <div class="gallery-overlay">
          <span>${product.title}</span>
        </div>
      `;
      productsGrid.appendChild(item);
    });

    // Mettre à jour le titre
    if (categoryTitle && categoryNames[category]) {
      categoryTitle.textContent = categoryNames[category];
    }

    // Activer le bon bouton de filtre
    filterBtns.forEach(btn => {
      if (btn.dataset.category === category) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // Initialisation
  renderProducts(currentCategory);

  // 3. Gestion du clic sur les boutons de filtre
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedCategory = btn.dataset.category;
      
      // Mettre à jour l'URL sans recharger la page
      const newUrl = window.location.pathname + '?category=' + selectedCategory;
      window.history.pushState({ path: newUrl }, '', newUrl);
      
      renderProducts(selectedCategory);
    });
  });
});
