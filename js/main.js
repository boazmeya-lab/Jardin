/* ===========================================================
   JARDIN AGRO — Script principal
   =========================================================== */

/* ---------- Loader ---------- */
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if(loader){
    setTimeout(() => loader.classList.add("hide"), 400);
  }
});

/* ---------- Header scroll state ---------- */
const header = document.getElementById("siteHeader");
const hasHero = !!document.querySelector(".hero");
function handleHeaderScroll(){
  if(!header) return;
  if(!hasHero || window.scrollY > 40) header.classList.add("scrolled");
  else header.classList.remove("scrolled");
}
document.addEventListener("scroll", handleHeaderScroll, { passive: true });
handleHeaderScroll();

/* ---------- Mobile nav ---------- */
const burger = document.getElementById("burgerBtn");
const mobileNav = document.getElementById("mobileNav");
const mobileClose = document.getElementById("mobileCloseBtn");

function toggleMobileNav(open){
  if(!mobileNav) return;
  mobileNav.classList.toggle("open", open);
  document.body.style.overflow = open ? "hidden" : "";
}
if(burger) burger.addEventListener("click", () => toggleMobileNav(true));
if(mobileClose) mobileClose.addEventListener("click", () => toggleMobileNav(false));
if(mobileNav){
  mobileNav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => toggleMobileNav(false)));
}

/* ---------- Active nav link on current page ---------- */
(function markActiveNav(){
  const page = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-desktop a, .mobile-nav a").forEach(a => {
    const href = a.getAttribute("href");
    if(href === page || (page === "" && href === "index.html")){
      a.classList.add("active");
    }
  });
})();

/* ---------- Scroll reveal (IntersectionObserver) ---------- */
const revealItems = document.querySelectorAll(".reveal, .reveal-scale");
if("IntersectionObserver" in window){
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
  revealItems.forEach(el => io.observe(el));
}else{
  revealItems.forEach(el => el.classList.add("in"));
}

/* ---------- Back to top ---------- */
const backToTop = document.getElementById("backToTop");
function handleBackToTop(){
  if(!backToTop) return;
  backToTop.classList.toggle("show", window.scrollY > 600);
}
document.addEventListener("scroll", handleBackToTop, { passive: true });
if(backToTop){
  backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

/* ---------- Hero petals (discret) ---------- */
(function petals(){
  const wrap = document.getElementById("petals");
  if(!wrap) return;
  const total = window.innerWidth < 640 ? 8 : 14;
  for(let i = 0; i < total; i++){
    const p = document.createElement("span");
    p.className = "petal";
    const left = Math.random() * 100;
    const size = 8 + Math.random() * 10;
    const duration = 9 + Math.random() * 8;
    const delay = Math.random() * 10;
    p.style.left = left + "%";
    p.style.width = size + "px";
    p.style.height = size + "px";
    p.style.animationDuration = duration + "s";
    p.style.animationDelay = delay + "s";
    p.style.opacity = (0.3 + Math.random() * 0.35).toFixed(2);
    wrap.appendChild(p);
  }
})();

/* ---------- Toast helper ---------- */
function showToast(message){
  const toast = document.getElementById("toast");
  if(!toast) return;
  toast.querySelector(".toast-text").textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove("show"), 2600);
}

/* ---------- Star rating helper ---------- */
function starString(rating){
  return "★★★★★☆☆☆☆☆".slice(5 - rating, 10 - rating);
}

/* ---------- Product grid rendering (home) ---------- */
const CATEGORY_META = {
  "Roses": "🌹", "Bouquets": "💐", "Anniversaire": "🎂", "Amour": "❤️",
  "Mariage": "💍", "Événement": "🎉", "Deuil": "🤍", "Plantes": "🌿"
};

function badgeLabel(badge){
  if(badge === "new") return "Nouveau";
  if(badge === "promo") return "Promo";
  if(badge === "best") return "Bestseller";
  if(badge === "bestseller") return "Bestseller";
  return "";
}

function renderProductCard(p){
  const badgeHtml = p.badge ? `<span class="badge ${p.badge === "bestseller" ? "best" : p.badge}">${badgeLabel(p.badge)}</span>` : "";
  const priceHtml = p.oldPrice
    ? `<span class="old">${SHOP_CONFIG.currency}${p.oldPrice}</span>${SHOP_CONFIG.currency}${p.price}`
    : `${SHOP_CONFIG.currency}${p.price}`;
  return `
    <article class="product-card reveal">
      <div class="product-media">
        <a href="product.html?id=${p.id}">
          <img src="${p.image}" alt="${p.name}" loading="lazy" width="600" height="750">
        </a>
        ${badgeHtml}
        <a href="product.html?id=${p.id}" class="product-quick" aria-label="Voir ${p.name}">
          <svg viewBox="0 0 24 24" fill="none" width="18" height="18"><path d="M4 12s3.5-6 8-6 8 6 8 6-3.5 6-8 6-8-6-8-6Z" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="2.6" stroke="currentColor" stroke-width="1.6"/></svg>
        </a>
      </div>
      <div class="product-info">
        <span class="product-cat">${p.category}</span>
        <h3 class="product-name">${p.name}</h3>
        <div class="product-price-row">
          <span class="product-price">${priceHtml}</span>
          <a href="product.html?id=${p.id}" class="product-view">Voir</a>
        </div>
      </div>
    </article>
  `;
}

function initProductGrid(){
  const grid = document.getElementById("productGrid");
  if(!grid) return;

  const filterBar = document.getElementById("filterBar");
  let activeFilter = "Tous";

  function renderList(){
    const list = activeFilter === "Tous" ? PRODUCTS : PRODUCTS.filter(p => p.category === activeFilter);
    grid.innerHTML = list.map(renderProductCard).join("");
    // re-observe reveal
    grid.querySelectorAll(".reveal").forEach((el, i) => {
      el.style.setProperty("--i", i % 8);
      if("IntersectionObserver" in window){
        const io2 = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if(entry.isIntersecting){ entry.target.classList.add("in"); io2.unobserve(entry.target); }
          });
        }, { threshold: 0.1 });
        io2.observe(el);
      }else{
        el.classList.add("in");
      }
    });
  }

  if(filterBar){
    filterBar.addEventListener("click", (e) => {
      const chip = e.target.closest(".filter-chip");
      if(!chip) return;
      filterBar.querySelectorAll(".filter-chip").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      activeFilter = chip.dataset.filter;
      renderList();
    });
  }

  renderList();
}
initProductGrid();

/* ---------- Testimonials slider ---------- */
function initTestimonials(){
  const track = document.getElementById("testiSlides");
  if(!track) return;
  const slides = track.querySelectorAll(".testi-slide");
  const dotsWrap = document.getElementById("testiDots");
  let index = 0;
  let timer;

  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    if(i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  function goTo(i){
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    dotsWrap.querySelectorAll("button").forEach((d, di) => d.classList.toggle("active", di === index));
    resetTimer();
  }

  function resetTimer(){
    clearInterval(timer);
    timer = setInterval(() => goTo(index + 1), 5000);
  }

  const prevBtn = document.getElementById("testiPrev");
  const nextBtn = document.getElementById("testiNext");
  if(prevBtn) prevBtn.addEventListener("click", () => goTo(index - 1));
  if(nextBtn) nextBtn.addEventListener("click", () => goTo(index + 1));

  resetTimer();
}
initTestimonials();

/* ---------- Newsletter form ---------- */
const newsletterForm = document.getElementById("newsletterForm");
if(newsletterForm){
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    showToast("Merci pour votre inscription 🌸");
    newsletterForm.reset();
  });
}

/* ---------- Footer year ---------- */
document.querySelectorAll(".current-year").forEach(el => {
  el.textContent = new Date().getFullYear();
});

/* ---------- Generic delivery / info WhatsApp buttons ---------- */
document.querySelectorAll("[data-whatsapp-generic]").forEach(btn => {
  btn.addEventListener("click", () => {
    const msg = btn.getAttribute("data-whatsapp-generic");
    const url = `https://wa.me/${SHOP_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  });
});
// --- MENU MOBILE ---
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// --- HEADER SCROLL EFFECT ---
const header = document.getElementById('main-header');
if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('bg-brand-dark/90', 'shadow-lg');
            header.classList.remove('bg-brand-dark/30');
        } else {
            header.classList.add('bg-brand-dark/30');
            header.classList.remove('bg-brand-dark/90', 'shadow-lg');
        }
    });
}

// --- CARROUSEL CRÉATIONS (SWIPER) ---
if (document.querySelector('.creationsSlider')) {
    new Swiper('.creationsSlider', {
        slidesPerView: 1,
        spaceBetween: 24,
        loop: true,
        autoplay: { delay: 3500, disableOnInteraction: false },
        pagination: { el: '.creationsSlider .swiper-pagination', clickable: true },
        navigation: { nextEl: '.creationsSlider .swiper-button-next', prevEl: '.creationsSlider .swiper-button-prev' },
        breakpoints: {
            640: { slidesPerView: 2, spaceBetween: 24 },
            1024: { slidesPerView: 3, spaceBetween: 32 },
        },
    });
}
