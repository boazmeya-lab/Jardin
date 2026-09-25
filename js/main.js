/* ===========================================================
   JARDIN AGRO — Interactions Globales (Panier)
   =========================================================== */

// GESTION DU TIROIR PANIER & SÉCURITÉ ANTI-404
document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href*="cart.html"], #cartToggle');
    if (link) {
      e.preventDefault();
      if (typeof openCart === 'function') {
        openCart();
      } else {
        console.error("La fonction openCart() est introuvable. Vérifiez que js/cart.js est bien chargé.");
      }
    }
  });
});
