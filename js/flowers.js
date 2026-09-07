// ============================================
// Données du configurateur "Créer mon bouquet"
// Chaque élément a un champ "img" (chemin vers une vraie photo dans
// le dossier image/ du site) et un champ "color" utilisé en secours
// si l'image ne charge pas (mauvais chemin, fichier pas encore ajouté).
// Remplace les chemins "img" par les vrais noms de tes fichiers.
// ============================================

const FLOWERS = [
  { id: "rose_rouge",   name: "Rose rouge",   price: 2.50, color: "#c0392b", img: "image/rose1.jpg" },
  { id: "rose_blanche", name: "Rose blanche", price: 2.50, color: "#f5f5f5", img: "image/rose2.jpg" },
  { id: "tulipe",       name: "Tulipe",       price: 1.80, color: "#e67e22", img: "image/rose3.jpg" },
  { id: "lys",          name: "Lys",          price: 3.00, color: "#f9e79f", img: "image/rose4.jpg" },
  { id: "tournesol",    name: "Tournesol",    price: 2.20, color: "#f1c40f", img: "image/fleurs/tournesol.jpg" },
  { id: "orchidee",     name: "Orchidée",     price: 4.50, color: "#9b59b6", img: "image/fleurs/orchidee.jpg" },
];

const RIBBONS = [
  { id: "ruban_rouge", name: "Rouge",  price: 1.00, color: "#c0392b", img: "image/rubans/rouge.jpg" },
  { id: "ruban_or",    name: "Doré",   price: 1.50, color: "#d4af37", img: "image/rubans/dore.jpg" },
  { id: "ruban_blanc", name: "Blanc",  price: 1.00, color: "#ffffff", img: "image/rubans/blanc.jpg" },
  { id: "ruban_rose",  name: "Rose",   price: 1.00, color: "#f8b6c8", img: "image/rubans/rose.jpg" },
];

const WRAPS = [
  { id: "kraft",       name: "Papier kraft",          price: 2.00, color: "#c19a6b", img: "image/emballages/kraft.jpg" },
  { id: "cellophane",  name: "Cellophane transparent", price: 1.50, color: "#eaf2f8", img: "image/emballages/cellophane.jpg" },
  { id: "jute",        name: "Toile de jute",          price: 3.00, color: "#8b7355", img: "image/emballages/jute.jpg" },
];

const VASES = [
  { id: "aucun",     name: "Sans vase",       price: 0.00,  color: "transparent", img: null },
  { id: "verre",     name: "Vase en verre",   price: 8.00,  color: "#d6eaf8", img: "image/vases/verre.jpg" },
  { id: "ceramique", name: "Vase en céramique", price: 12.00, color: "#eaeded", img: "image/vases/ceramique.jpg" },
];
