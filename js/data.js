/* ===========================================================
   JARDIN AGRO — Données produits & configuration
   =========================================================== */

// 1. Configuration boutique
if (typeof SHOP_CONFIG === 'undefined') {
  window.SHOP_CONFIG = {
    whatsappNumber: "243998096713",
    currency: "$"
  };
} else {
  SHOP_CONFIG.whatsappNumber = "243998096713";
  SHOP_CONFIG.currency = "$";
}

// 2. Base de données des produits par univers
const products = [
  // HÔTEL
  { id: 101, name: "Fleurs XXL Élégance", category: "hotels", price: 45, surMesure: false, image: "image/hôtel/maison1.jpg" },
  { id: 102, name: "Composition Prestige Hôtel", category: "hotels", price: 60, surMesure: false, image: "image/hôtel/maison2.jpg" },
  { id: 103, name: "Vase Réception Grand Luxe", category: "hotels", price: 75, surMesure: false, image: "image/hôtel/maison3.jpg" },
  { id: 104, name: "Bouquet Hall d'Accueil", category: "hotels", price: 50, surMesure: false, image: "image/hôtel/maison4.jpg" },
  { id: 105, name: "Arrangement Floral Suite", category: "hotels", price: 40, surMesure: false, image: "image/hôtel/maison5.jpg" },
  { id: 106, name: "Centre de Table Buffet", category: "hotels", price: 55, surMesure: false, image: "image/hôtel/maison6.jpg" },
  { id: 107, name: "Composition Exotique Hôtel", category: "hotels", price: 70, surMesure: false, image: "image/hôtel/maison7.jpg" },
  { id: 108, name: "Orchidées & Rameaux VIP", category: "hotels", price: 65, surMesure: false, image: "image/hôtel/maison8.jpg" },

  // ENTREPRISES & BANQUES
  { id: 201, name: "Décoration Bureau Direction", category: "entreprises", price: 50, surMesure: false, image: "image/entreprise/bureau1.jpg" },
  { id: 202, name: "Plantes & Fleurs Réception", category: "entreprises", price: 45, surMesure: false, image: "image/entreprise/bureau2.jpg" },
  { id: 203, name: "Arrangement Espace Attente", category: "entreprises", price: 40, surMesure: false, image: "image/entreprise/bureau3.jpg" },
  { id: 204, name: "Composition Salles de Réunion", category: "entreprises", price: 55, surMesure: false, image: "image/entreprise/bureau4.jpg" },

  // CONFÉRENCES & CÉRÉMONIES
  { id: 301, name: "Décoration Pupitre & Scène", category: "conferences", price: 80, surMesure: true, image: "image/evenement.jpg" },

  // MARIAGE & FÊTES
  { id: 401, name: "Arche Florale & Festivité", category: "mariage", price: 120, surMesure: true, image: "image/fete1.jpg" },

  // FUNÉRAIRE
  { id: 501, name: "Couronne d'Hommage Lys & Roses", category: "funeraire", price: 65, surMesure: false, image: "image/RIP/finerail1.jpg" },
  { id: 502, name: "Coussin Floral Serénité", category: "funeraire", price: 55, surMesure: false, image: "image/RIP/funerail2.jpg" },
  { id: 503, name: "Jetée de Fleurs de Deuil", category: "funeraire", price: 45, surMesure: false, image: "image/RIP/finerail.jpg" }
];

// ✅ Alias pour cart.js, qui cherche "PRODUCTS" (majuscules)
window.PRODUCTS = products;

// 3. Noms lisibles des catégories
const categoryNames = {
  all: "Tous nos Produits",
  hotels: "Compositions pour Hôtels",
  entreprises: "Fleurs pour Entreprises & Banques",
  conferences: "Décorations de Conférences",
  mariage: "Mariage & Célébrations",
  funeraire: "Hommages Funéraires"
};

// 4. Mapping pour harmoniser les variantes d'URL
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

// 5. Normalise un texte pour recherche insensible à la casse et aux accents
function normalizeText(str) {
  return (str || '')
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

// 6. Helper de recherche produit par id
function getProductById(id) {
  return products.find(p => p.id === id);
}
