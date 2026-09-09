/* ===========================================================
   JARDIN AGRO — Menu mobile & Interactions Globales
   =========================================================== */

// 1. MENU MOBILE
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Ferme le menu mobile lors du clic sur un lien
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
}

// 2. GESTION DU TIROIR PANIER & SÉCURITÉ ANTI-404
document.addEventListener('DOMContentLoaded', () => {
  // Capture tous les clics sur des éléments pointant vers cart.html pour éviter l'erreur 404 Vercel
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
