# Jardin Agro — Site e-commerce

Site vitrine + boutique pour "Jardin Agro", codé en **HTML / CSS / JavaScript pur** (aucun framework).

## Structure du projet

```
jardin-agro/
├── index.html          → Page d'accueil (hero, catégories, boutique, avis, livraison, footer)
├── product.html         → Page produit (galerie, zoom, taille, quantité, commande WhatsApp)
├── css/
│   └── style.css        → Tout le design (couleurs, typographie, animations, responsive)
├── js/
│   ├── data.js           → Liste des produits (nom, prix, images, description...)
│   ├── main.js            → Interactions générales (menu, scroll, slider, panier UI)
│   ├── cart.js             → Logique du panier (localStorage + WhatsApp)
│   └── product.js           → Logique spécifique à la page produit
└── assets/
    ├── images/           → Toutes les images (voir liste ci-dessous)
    └── videos/            → Vidéo de fond du Hero
```

## ⚠️ Fichiers à remplacer par les vrais médias

Aucune image ni vidéo réelle n'est encore disponible : des **fichiers de substitution** (placeholders générés automatiquement, couleur rouge Jardin Agro) ont été créés avec des noms clairs. Il suffit de **remplacer ces fichiers en gardant exactement le même nom et le même chemin** — aucune modification du code n'est nécessaire.

### 🎥 Vidéo (Hero)
| Fichier | Description | Format recommandé |
|---|---|---|
| `assets/videos/video-accueil.mp4` | Vidéo plein écran en arrière-plan du Hero : un homme offrant un bouquet à sa compagne, gros plans sur les fleurs, sourire de la femme, ambiance romantique. Autoplay / muet / boucle. | MP4 (H.264), 1920×1080, 15-30s, < 15 Mo, sans son nécessaire |

### 🖼️ Image d'appoint du Hero (poster affiché avant chargement de la vidéo)
| Fichier | Description |
|---|---|
| `assets/images/hero.jpg` | Image de secours affichée tant que la vidéo charge (`poster`) |

### 🏷️ Logo
| Fichier | Description |
|---|---|
| `assets/images/logo.png` | Logo Jardin Agro (fond transparent, PNG) — utilisé dans le header et le footer |
| `assets/images/favicon.png` | Icône de l'onglet du navigateur (carré, 64×64 minimum) |

### 🌸 Catégories (format portrait conseillé 4:5)
| Fichier | Catégorie |
|---|---|
| `assets/images/rose-rouge-cat.jpg` | Roses |
| `assets/images/bouquets-cat.jpg` | Bouquets |
| `assets/images/anniversaire-cat.jpg` | Anniversaire |
| `assets/images/amour-cat.jpg` | Amour |
| `assets/images/mariage-cat.jpg` | Mariage |
| `assets/images/evenement-cat.jpg` | Événement |
| `assets/images/deuil-cat.jpg` | Deuil |
| `assets/images/plantes-cat.jpg` | Plantes |

### 💐 Produits (format portrait 4:5, + 3 photos de galerie par produit)
Pour chaque produit, remplacer l'image principale ET les 3 images de galerie (`-1`, `-2`, `-3`) :

| Produit | Fichiers |
|---|---|
| Rose Rouge Passion | `rose-rouge.jpg`, `rose-rouge-1.jpg`, `rose-rouge-2.jpg`, `rose-rouge-3.jpg` |
| Bouquet Élégance | `bouquet-elegance.jpg` (+ -1, -2, -3) |
| Lys Blanc Pureté | `lys-blanc.jpg` (+ -1, -2, -3) |
| Tulipes Pastel | `tulipes-pastel.jpg` (+ -1, -2, -3) |
| Orchidée Blanche | `orchidee-blanche.jpg` (+ -1, -2, -3) |
| Bouquet Cérémonie | `bouquet-mariage.jpg` (+ -1, -2, -3) |
| Cœur de Roses | `coeur-de-roses.jpg` (+ -1, -2, -3) |
| Panier Fleuri Fête | `panier-fleuri.jpg` (+ -1, -2, -3) |

Tous ces fichiers se trouvent dans `assets/images/`.

**Pour ajouter un nouveau produit** : dupliquer une entrée dans `js/data.js` (tableau `PRODUCTS`), donner un nouvel `id` unique et référencer les nouvelles images — le produit apparaîtra automatiquement dans la boutique et sera accessible via `product.html?id=votre-id`.

### 🚚 Livraison
| Fichier | Description |
|---|---|
| `assets/images/livraison.jpg` | Image illustrant la livraison (format 4:3) |

### 📸 Galerie Instagram (format carré 1:1)
| Fichiers |
|---|
| `assets/images/instagram1.jpg` → `instagram8.jpg` |

### 👤 Avis clients (format carré 1:1, portrait rond)
| Fichiers |
|---|
| `assets/images/client1.jpg` → `client5.jpg` |

## ⚙️ Configuration à faire avant mise en ligne

Ouvrir `js/data.js` et modifier en haut du fichier :

```js
const SHOP_CONFIG = {
  whatsappNumber: "243900000000", // ⚠️ Remplacer par le vrai numéro WhatsApp (format international, sans le +)
  currency: "$"
};
```

Ce numéro est utilisé partout : bouton WhatsApp du header, du footer, du bouton flottant, de la section livraison et des commandes produits/panier.

Les coordonnées (adresse, téléphone, email) affichées dans le footer de `index.html` et `product.html` sont à mettre à jour manuellement (recherche/remplace du texte).

## 🛒 Fonctionnement du panier

- Le panier est stocké dans le `localStorage` du navigateur (persiste entre les pages et les visites).
- Le client peut ajouter plusieurs produits, tailles et quantités.
- Le bouton **"Commander sur WhatsApp"** du panier envoie un message pré-rempli listant tous les articles.
- Sur la page produit, le bouton **"Commander sur WhatsApp"** commande directement ce produit (sans passer par le panier), avec taille, quantité et prix.

## ✅ Bonnes pratiques déjà appliquées

- Toutes les images utilisent `loading="lazy"` (sauf le logo/header, chargé immédiatement).
- Polices chargées via Google Fonts avec `preconnect`.
- Animations basées sur `IntersectionObserver` (peu coûteuses) + `prefers-reduced-motion` respecté.
- CSS organisé par sections, variables CSS centralisées (`:root`) pour les couleurs et espacements.
- Un seul fichier CSS et JS par rôle, aucun framework, code lisible et commenté.
- Design responsive testé pour mobile / tablette / desktop (breakpoints principaux : 640px, 900px, 1080px).

## 🚀 Mise en ligne

Le site est 100% statique : il suffit d'héberger le dossier `jardin-agro/` tel quel sur n'importe quel hébergement (Netlify, Vercel, OVH, o2switch, GitHub Pages, etc.), sans build ni installation.
