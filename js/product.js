// NUMÉRO WHATSAPP OFFICIEL
const WHATSAPP_NUMBER = "243998096713"; 

document.addEventListener('DOMContentLoaded', () => {
    // 1. RÉCUPÉRATION DE L'ID DU PRODUIT DEPUIS L'URL (?id=1)
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    // On cherche le produit correspondant dans la liste "products" (définie dans data.js)
    const product = (typeof products !== 'undefined') 
        ? products.find(p => p.id == productId) || products[0] 
        : null;

    if (!product) return;

    // Variables d'état du produit sélectionné
    let currentQuantity = 1;
    let selectedSize = product.sizes ? product.sizes[0] : null;

    // 2. INJECTION DES DONNÉES DANS LA PAGE PRODUCT.HTML
    const titleEl = document.getElementById('product-title');
    const priceEl = document.getElementById('product-price');
    const descEl = document.getElementById('product-description');
    const mainImgEl = document.getElementById('product-main-img');

    if (titleEl) titleEl.textContent = product.name;
    if (priceEl) priceEl.textContent = `${product.price} $`;
    if (descEl) descEl.textContent = product.description;
    if (mainImgEl) mainImgEl.src = product.image;

    // 3. GALERIE DE PHOTOS (Changement de l'image principale au clic)
    const thumbnails = document.querySelectorAll('.product-thumb');
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', (e) => {
            if (mainImgEl) mainImgEl.src = e.target.src;
            // Mise à jour de la bordure active
            thumbnails.forEach(t => t.classList.remove('border-brand-primary'));
            e.target.classList.add('border-brand-primary');
        });
    });

    // 4. CHOIX DE LA TAILLE / TAILLE DU BOUQUET (Si disponible)
    const sizeButtons = document.querySelectorAll('.size-btn');
    sizeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            sizeButtons.forEach(b => b.classList.remove('bg-brand-primary', 'text-white'));
            btn.classList.add('bg-brand-primary', 'text-white');
            selectedSize = btn.dataset.size || btn.textContent.trim();
        });
    });

    // 5. BOUTONS QUANTITÉ (+ / -)
    const qtyMinus = document.getElementById('qty-minus');
    const qtyPlus = document.getElementById('qty-plus');
    const qtyDisplay = document.getElementById('qty-display');

    if (qtyMinus && qtyPlus && qtyDisplay) {
        qtyMinus.addEventListener('click', () => {
            if (currentQuantity > 1) {
                currentQuantity--;
                qtyDisplay.textContent = currentQuantity;
            }
        });

        qtyPlus.addEventListener('click', () => {
            currentQuantity++;
            qtyDisplay.textContent = currentQuantity;
        });
    }

    // 6. ENVOI DE LA COMMANDE PAR WHATSAPP
    const btnOrderWhatsApp = document.getElementById('btn-order-whatsapp');
    if (btnOrderWhatsApp) {
        btnOrderWhatsApp.addEventListener('click', () => {
            const totalPrice = product.price * currentQuantity;
            
            // Construction du message WhatsApp propre et détaillé
            let message = `Bonjour Jardin Agro ! 👋\nJe souhaite passer une commande :\n\n`;
            message += `🌸 *Produit :* ${product.name}\n`;
            if (selectedSize) {
                message += `📏 *Taille :* ${selectedSize}\n`;
            }
            message += `🔢 *Quantité :* ${currentQuantity}\n`;
            message += `💰 *Prix total :* ${totalPrice} $\n\n`;
            message += `Pouvez-vous me confirmer la disponibilité et la livraison ? Merci !`;

            // Encodage et ouverture de WhatsApp
            const encodedMessage = encodeURIComponent(message);
            window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
        });
    }
});
                       
