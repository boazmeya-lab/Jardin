// ============================================
// Données du configurateur "Créer mon bouquet"
// À adapter : remplace les prix et noms par les vrais
// produits de Jardin Agro. "color" sert juste à
// dessiner l'aperçu tant que tu n'as pas de vraies photos.
// Si tu as des images, remplace "color" par "img: 'image/xxx.jpg'"
// et adapte creer-bouquet.js en conséquence.
// ============================================

const FLOWERS = [
  { id: "rose_rouge",   name: "Rose rouge",   price: 2.50, color: "#c0392b" },
  { id: "rose_blanche", name: "Rose blanche", price: 2.50, color: "#f5f5f5" },
  { id: "tulipe",       name: "Tulipe",       price: 1.80, color: "#e67e22" },
  { id: "lys",          name: "Lys",          price: 3.00, color: "#f9e79f" },
  { id: "tournesol",    name: "Tournesol",    price: 2.20, color: "#f1c40f" },
  { id: "orchidee",     name: "Orchidée",     price: 4.50, color: "#9b59b6" },
];

const RIBBONS = [
  { id: "ruban_rouge", name: "Rouge",  price: 1.00, color: "#c0392b" },
  { id: "ruban_or",    name: "Doré",   price: 1.50, color: "#d4af37" },
  { id: "ruban_blanc", name: "Blanc",  price: 1.00, color: "#ffffff" },
  { id: "ruban_rose",  name: "Rose",   price: 1.00, color: "#f8b6c8" },
];

const WRAPS = [
  { id: "kraft",       name: "Papier kraft",          price: 2.00, color: "#c19a6b" },
  { id: "cellophane",  name: "Cellophane transparent", price: 1.50, color: "#eaf2f8" },
  { id: "jute",        name: "Toile de jute",          price: 3.00, color: "#8b7355" },
];

const VASES = [
  { id: "aucun",     name: "Sans vase",       price: 0.00,  color: "transparent" },
  { id: "verre",     name: "Vase en verre",   price: 8.00,  color: "#d6eaf8" },
  { id: "ceramique", name: "Vase en céramique", price: 12.00, color: "#eaeded" },
];
