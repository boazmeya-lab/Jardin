// ============================================
// Bouquets prédéfinis affichés dans la galerie
// Remplace "img" par le vrai chemin de chaque photo,
// et "fleurs" par la vraie composition de chaque bouquet.
// ============================================

const BOUQUETS = [
  {
    id: "rouge_classique",
    name: "Bouquet de roses rouges",
    img: "image/bouquets/roses-rouges.jpg",
    fleurs: { rose_rouge: 6 },
  },
  {
    id: "blanc_elegant",
    name: "Bouquet de roses blanches",
    img: "image/bouquets/roses-blanches.jpg",
    fleurs: { rose_blanche: 6 },
  },
  {
    id: "rouge_blanc",
    name: "Bouquet rouge & blanc",
    img: "image/bouquets/rouge-blanc.jpg",
    fleurs: { rose_rouge: 3, rose_blanche: 3 },
  },
  {
    id: "tournesols",
    name: "Bouquet de tournesols",
    img: "image/bouquets/tournesols.jpg",
    fleurs: { tournesol: 6 },
  },
  {
    id: "tulipes",
    name: "Bouquet de tulipes",
    img: "image/bouquets/tulipes.jpg",
    fleurs: { tulipe: 8 },
  },
  {
    id: "multicolore",
    name: "Bouquet multicolore",
    img: "image/bouquets/multicolore.jpg",
    fleurs: { rose_rouge: 2, tulipe: 2, tournesol: 2, orchidee: 1 },
  },
];
