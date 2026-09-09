// Base de données des produits par univers
const products = [
  // HÔTEL
  { id: 1, title: "fleurs xxl", category: "hotels", price: "45 $", surMesure: false, image: "image/hôtel/maison1.jpg" },
  { id: 2, title: "------ ", category: "hotels", price: "0 $", surMesure: false, image: "image/hôtel/maison2.jpg" },
  { id: 3, title: "-----", category: "hotels", price: "0 $", surMesure: false, image: "image/hôtel/maison3.jpg" },
  { id: 4, title: "-----", category: "hotels", price: "0  $", surMesure: false, image: "image/hôtel/maison4.jpg" },
  { id: 5, title: "-----", category: "hotels", price: "0  $", surMesure: false, image: "image/hôtel/maison5.jpg" },
  { id: 6, title: "-----", category: "hotels", price: "0  $", surMesure: false, image: "image/hôtel/maison6.jpg" },
  { id: 7, title: "-----", category: "hotels", price: "0  $", surMesure: false, image: "image/hôtel/maison7.jpg" },
  { id: 8, title: "-----", category: "hotels", price: "0  $", surMesure: false, image: "image/hôtel/maison8.jpg" },
  { id: 9, title: "-----", category: "hotels", price: "0  $", surMesure: false, image: "image/hôtel/maison9.jpg" },
  { id: 10, title: "-----", category: "hotels", price: "0  $", surMesure: false, image: "image/hôtel/maison10.jpg" },
  { id: 11, title: "-----", category: "hotels", price: "0  $", surMesure: false, image: "image/hôtel/maison11.jpg" },
  { id: 12, title: "-----", category: "hotels", price: "0  $", surMesure: false, image: "image/hôtel/maison12.jpg" },
  { id: 13, title: "-----", category: "hotels", price: "0  $", surMesure: false, image: "image/hôtel/maison13.jpg" },
  { id: 14, title: "-----", category: "hotels", price: "0  $", surMesure: false, image: "image/hôtel/maison14.jpg" },


 

  // ENTREPRISES & BANQUES
  { id: 3, title: "-----", category: "entreprises", price: "0 ", surMesure: false, image: "image/entreprise/bureau1.jpg" },
  { id: 3, title: "-----", category: "entreprises", price: "0 ", surMesure: false, image: "image/entreprise/bureau2.jpg" },
  { id: 3, title: "-----", category: "entreprises", price: "0 ", surMesure: false, image: "image/entreprise/bureau3.jpg" },
  { id: 3, title: "-----", category: "entreprises", price: "0 ", surMesure: false, image: "image/entreprise/bureau4.jpg" },
  { id: 3, title: "-----", category: "entreprises", price: "0 ", surMesure: false, image: "image/entreprise/bureau5.jpg" },
  { id: 3, title: "-----", category: "entreprises", price: "0 ", surMesure: false, image: "image/entreprise/bureau6.jpg" },
  { id: 3, title: "-----", category: "entreprises", price: "0 ", surMesure: false, image: "image/entreprise/bureau7.jpg" },
  
  
  
  
  
  
  
  // CONFÉRENCES & CÉRÉMONIES
  { id: 4, title: "Décoration Pupitre & Scène", category: "conferences", price: "80 $", surMesure: true, image: "image/evenement.jpg" },
  
  // MARIAGE & FÊTES
  { id: 5, title: "-----", category: "mariage", price: "0 $", surMesure: false, image: "image/fete1.jpg" },
  
  // FUNÉRAIRE
  { id: 6, title: "------", category: "funeraire", price: "0 $", surMesure: false, image: "image/RIP/finerail1.jpg" },
  { id: 6, title: "------", category: "funeraire", price: "0 $", surMesure: false, image: "image/RIP/funerail2.jpg" },
  { id: 6, title: "------", category: "funeraire", price: "0 $", surMesure: false, image: "image/RIP/finerail.jpg" }

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

// Normalise un texte pour une recherche insensible à la casse et aux accents
function normalizeText(str) {
  return (str || '')
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

document.addEventListener('DOMContentLoaded', () => {
  const productsGrid = document.getElementById('productsGrid');
  const pageTitle = document.getElementById('pageTitle') || document.getElementById('categoryTitle');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const searchStatusWrap = document.getElementById('searchStatusWrap');
  const searchStatus = document.getElementById('searchStatus');

  // Widget de recherche dans le header (loupe)
  const searchWidget = document.getElementById('searchWidget');
  const searchToggle = document.getElementById('searchToggle');
  const searchForm = document.getElementById('searchForm');
  const searchInput = document.getElementById('searchInput');

  // Récupération des paramètres dans l'URL ('cat' OU 'category' pour la catégorie, 'search' pour la recherche)
  const urlParams = new URLSearchParams(window.location.search);
  const rawCategory = urlParams.get('cat') || urlParams.get('category') || 'all';
  let currentCategory = categoryMap[rawCategory.toLowerCase().trim()] || rawCategory;
  let currentSearch = urlParams.get('search') || '';

  // Pré-remplit le champ de recherche si on arrive avec ?search=...
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
      filtered = filtered.filter(p => normalizeText(p.title).includes(normalizedSearch));
    }

    // Affiche/masque l'indicateur de recherche active
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

    // Mise à jour du titre h1 (uniquement quand aucune recherche n'est active)
    if (pageTitle && categoryNames[category]) {
      pageTitle.textContent = normalizedSearch ? 'Résultats de recherche' : categoryNames[category];
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
  renderProducts(currentCategory, currentSearch);

  // Gestion du clic sur les boutons de filtre (la recherche en cours est conservée)
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currentCategory = btn.dataset.category;
      updateUrl();
      renderProducts(currentCategory, currentSearch);
    });
  });

  // Gestion du widget de recherche (loupe) dans le header
  if (searchWidget && searchToggle && searchForm && searchInput) {
    searchToggle.addEventListener('click', () => {
      searchWidget.classList.toggle('active');
      if (searchWidget.classList.contains('active')) {
        searchInput.focus();
      }
    });

    // Filtrage en direct pendant la frappe
    searchInput.addEventListener('input', () => {
      currentSearch = searchInput.value.trim();
      renderProducts(currentCategory, currentSearch);
      updateUrl();
    });

    // Validation (touche Entrée) : garde le focus, referme juste le clavier mobile
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      currentSearch = searchInput.value.trim();
      renderProducts(currentCategory, currentSearch);
      updateUrl();
      searchInput.blur();
    });

    // Ferme le champ si on clique en dehors (seulement s'il est vide)
    document.addEventListener('click', (e) => {
      if (!searchWidget.contains(e.target) && !searchInput.value.trim()) {
        searchWidget.classList.remove('active');
      }
    });

    // Si on arrive avec ?search=... dans l'URL, on ouvre le champ automatiquement
    if (currentSearch) {
      searchWidget.classList.add('active');
    }
  }
});
