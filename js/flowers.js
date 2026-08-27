/* ===========================================================
   JARDIN AGRO — Catalogue "Créer mon bouquet"
   Fleurs à l'unité, feuillage, ruban, emballage, vase.
   =========================================================== */

const FLOWERS = [
  { id: "rose", name: "Roses", price: 3, image: "image/flower-rose.jpg", minQty: 3 },
  { id: "rose-spray", name: "Roses spray", price: 2.5, image: "image/flower-rose-spray.jpg", minQty: 3 },
  { id: "hortensia", name: "Hortensias", price: 6, image: "image/flower-hortensia.jpg", minQty: 1 },
  { id: "lys", name: "Lys", price: 4, image: "image/flower-lys.jpg", minQty: 1 },
  { id: "tournesol", name: "Tournesols", price: 3.5, image: "image/flower-tournesol.jpg", minQty: 1 },
  { id: "limonium", name: "Limonium", price: 2, image: "image/flower-limonium.jpg", minQty: 1 },
  { id: "hypericum", name: "Hypericum", price: 2, image: "image/flower-hypericum.jpg", minQty: 1 },
  { id: "oeillet", name: "Œillets", price: 2, image: "image/flower-oeillet.jpg", minQty: 3 },
  { id: "craspedie", name: "Craspédies", price: 2.5, image: "image/flower-craspedie.jpg", minQty: 1 },
  { id: "gypsophile", name: "Gypsophiles", price: 1.5, image: "image/flower-gypsophile.jpg", minQty: 1 }
];

const FOLIAGES = [
  { id: "none", name: "Sans feuillage", price: 0, included: true, image: "image/foliage-none.jpg" },
  { id: "eucalyptus", name: "Eucalyptus", price: 5, included: false, image: "image/foliage-eucalyptus.jpg" },
  { id: "ruscus", name: "Ruscus", price: 4, included: false, image: "image/foliage-ruscus.jpg" }
];

const RIBBONS = [
  { id: "none", name: "Sans ruban", price: 0, included: true, image: "image/ribbon-none.jpg" },
  { id: "satin", name: "Ruban satin", price: 3, included: false, image: "image/ribbon-satin.jpg" },
  { id: "jute", name: "Toile de jute", price: 2, included: false, image: "image/ribbon-jute.jpg" }
];

const WRAPS = [
  { id: "none", name: "Sans emballage", price: 0, included: true, image: "image/wrap-none.jpg" },
  { id: "kraft", name: "Papier kraft", price: 4, included: false, image: "image/wrap-kraft.jpg" },
  { id: "cadeau", name: "Papier cadeau", price: 6, included: false, image: "image/wrap-cadeau.jpg" }
];

const CUSTOM_VASES = [
  { id: "none", name: "Sans vase (bouquet seul)", price: 0, included: true, image: "image/vase-none.jpg" },
  { id: "verre", name: "Vase transparent", price: 8, included: false, image: "image/vase2.jpg" }
];
