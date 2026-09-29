// ============================================
// Données du configurateur "Créer mon bouquet"
// Chaque élément a un champ "img" (chemin vers une vraie photo dans
// le dossier image/ du site) et un champ "color" utilisé en secours
// si l'image ne charge pas (mauvais chemin, fichier pas encore ajouté).
// Remplace les chemins "img" par les vrais noms de tes fichiers.
// ============================================

const FAMILIES = [
 {id:'roses', name:'Roses', price:3, v:[
  ['jaune','#F2C94C'],['blanche','#FBF8F1','image/rose12.png'],
  ['rouge','#A8394A','image/rose-rouge.png'],['rose','#E2A6B4','image/rose-rose1.png'],
  ['orange','#F08A3C'],['bicolore','#E8B4B8']]},
 {id:'spray', name:'Roses spray', price:3, v:[
  ['rouge','#A8394A'],['blanche','#FBF8F1'],['orange','#F08A3C'],
  ['bicolore rouge','#E8B4B8'],['feu d’artifice','#F5A65B']]},
 {id:'lys', name:'Lys', price:5, v:[
  ['rose','#F2B6C6'],['blanche','#FBF3E3','image/david.png']]},
 {id:'hortensias', name:'Hortensias', price:5, v:[
  ['rose','#E8A9C0'],['blanche','#FBF8F1'],['mauve','#A98BC7']]},
 {id:'marguerites', name:'Marguerites', price:3, v:[
  ['blanche','#FFFFFF'],['rose','#F2B6C6'],['jaune','#F6D55C'],['mauve','#C3A6E0']]},
];
const slug = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-');
const FLOWERS = FAMILIES.flatMap(fam => fam.v.map(([label, color, img]) => ({
  id: fam.id + '-' + slug(label),
  name: fam.name + ' ' + label,
  price: fam.price,
  color: color,
  img: img || null,
  family: fam.id,
  familyName: fam.name,
})));

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
