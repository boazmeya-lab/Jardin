/* ===========================================================
   JARDIN AGRO — Données produits & configuration
   Modifier ici pour ajouter / changer des produits.
   =========================================================== */

const SHOP_CONFIG = {
  whatsappNumber: "243900000000", // Remplacer par le vrai numéro (format international, sans +)
  currency: "$"
};

const PRODUCTS = [
  {
    id: "rose-rouge",
    name: "Rose Rouge Passion",
    category: "Roses",
    price: 25,
    oldPrice: null,
    badge: "bestseller",
    image: "assets/images/rose-rouge.jpg",
    gallery: [
      "assets/images/rose-rouge.jpg",
      "assets/images/rose-rouge-1.jpg",
      "assets/images/rose-rouge-2.jpg",
      "assets/images/rose-rouge-3.jpg"
    ],
    description: "Un bouquet de roses rouges sélectionnées à la main, symbole intemporel de la passion et de l'amour sincère. Chaque tige est choisie pour sa fraîcheur et l'intensité de sa couleur.",
    rating: 5
  },
  {
    id: "bouquet-elegance",
    name: "Bouquet Élégance",
    category: "Bouquets",
    price: 42,
    oldPrice: 52,
    badge: "promo",
    image: "assets/images/bouquet-elegance.jpg",
    gallery: [
      "assets/images/bouquet-elegance.jpg",
      "assets/images/bouquet-elegance-1.jpg",
      "assets/images/bouquet-elegance-2.jpg",
      "assets/images/bouquet-elegance-3.jpg"
    ],
    description: "Une composition raffinée mêlant roses, pivoines et verdure noble, pensée pour illuminer n'importe quelle occasion avec beaucoup de caractère.",
    rating: 5
  },
  {
    id: "lys-blanc",
    name: "Lys Blanc Pureté",
    category: "Deuil",
    price: 30,
    oldPrice: null,
    badge: "new",
    image: "assets/images/lys-blanc.jpg",
    gallery: [
      "assets/images/lys-blanc.jpg",
      "assets/images/lys-blanc-1.jpg",
      "assets/images/lys-blanc-2.jpg",
      "assets/images/lys-blanc-3.jpg"
    ],
    description: "Des lys blancs immaculés, symbole de pureté et de respect, idéals pour accompagner un hommage ou une cérémonie avec dignité.",
    rating: 4
  },
  {
    id: "tulipes-pastel",
    name: "Tulipes Pastel",
    category: "Bouquets",
    price: 28,
    oldPrice: null,
    badge: null,
    image: "assets/images/tulipes-pastel.jpg",
    gallery: [
      "assets/images/tulipes-pastel.jpg",
      "assets/images/tulipes-pastel-1.jpg",
      "assets/images/tulipes-pastel-2.jpg",
      "assets/images/tulipes-pastel-3.jpg"
    ],
    description: "Un mélange doux de tulipes aux tons pastel, léger et printanier, parfait pour une attention délicate et pleine de douceur.",
    rating: 5
  },
  {
    id: "orchidee-blanche",
    name: "Orchidée Blanche",
    category: "Plantes",
    price: 55,
    oldPrice: null,
    badge: "new",
    image: "assets/images/orchidee-blanche.jpg",
    gallery: [
      "assets/images/orchidee-blanche.jpg",
      "assets/images/orchidee-blanche-1.jpg",
      "assets/images/orchidee-blanche-2.jpg",
      "assets/images/orchidee-blanche-3.jpg"
    ],
    description: "Une orchidée élégante en pot, à l'allure sculpturale, pour offrir la longévité et le raffinement d'une plante d'exception.",
    rating: 5
  },
  {
    id: "bouquet-mariage",
    name: "Bouquet Cérémonie",
    category: "Mariage",
    price: 75,
    oldPrice: null,
    badge: "bestseller",
    image: "assets/images/bouquet-mariage.jpg",
    gallery: [
      "assets/images/bouquet-mariage.jpg",
      "assets/images/bouquet-mariage-1.jpg",
      "assets/images/bouquet-mariage-2.jpg",
      "assets/images/bouquet-mariage-3.jpg"
    ],
    description: "Une création sur-mesure en blanc et vert tendre, taillée pour sublimer le plus beau jour de votre vie avec grâce et élégance.",
    rating: 5
  },
  {
    id: "coeur-de-roses",
    name: "Cœur de Roses",
    category: "Amour",
    price: 38,
    oldPrice: 45,
    badge: "promo",
    image: "assets/images/coeur-de-roses.jpg",
    gallery: [
      "assets/images/coeur-de-roses.jpg",
      "assets/images/coeur-de-roses-1.jpg",
      "assets/images/coeur-de-roses-2.jpg",
      "assets/images/coeur-de-roses-3.jpg"
    ],
    description: "Un arrangement en forme de cœur, tout en roses rouges et roses pâles, pour déclarer votre amour avec originalité.",
    rating: 5
  },
  {
    id: "panier-fleuri",
    name: "Panier Fleuri Fête",
    category: "Anniversaire",
    price: 34,
    oldPrice: null,
    badge: null,
    image: "assets/images/panier-fleuri.jpg",
    gallery: [
      "assets/images/panier-fleuri.jpg",
      "assets/images/panier-fleuri-1.jpg",
      "assets/images/panier-fleuri-2.jpg",
      "assets/images/panier-fleuri-3.jpg"
    ],
    description: "Un panier généreux et coloré rempli de fleurs de saison, pensé pour célébrer les anniversaires et les grands événements joyeux.",
    rating: 4
  }
];

function getProductById(id){
  return PRODUCTS.find(p => p.id === id);
}
