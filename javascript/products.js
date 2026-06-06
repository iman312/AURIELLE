/* ============================================
   products.js — Product data + dynamic rendering + filtering
   ============================================ */

// ── Product Data ────────────────────────────────────────────────
const PRODUCTS = [
  {
    id: 1,
    name: "Infinito",
    category: "rings",
    material: "Yellow Gold",
    price: 400,
    badge: "New",
    image: "../images/ring1.png",
    
  },
  {
    id: 2,
    name: "Five-petal Hibiscus Flower",
    category: "earrings",
    material: "White Gold",
    price: 380,
    badge: "New",
    image: "../images/earring1.png",

  },
  {
    id: 3,
    name: "Infinito",
    category: "necklaces",
    material: "Yellow Gold",
    price: 920,
    badge: "limited",
    image: "../images/collier1.png",
    
  },
  {
    id: 4,
    name: "Lucky Clover Braclet ",
    category: "bracelets",
    material: "Yellow Gold",
    price: 1200,
    badge: "sale",
    image: "../images/braclet1.png",
    
  },
  {
    id: 5,
    name: "Piranha Flora",
    category: "brooches",
    material: "Rose Gold",
    price: 40,
    badge: "Sale",
    image: "../images/brooche1.png",
   
  },
  {
    id: 6,
    name: "Gold wedding ring",
    category: "rings",
    material: "Yellow Gold",
    price: 3900,
    badge: "new",
    image: "../images/ring2.png",
    
  },
  {
    id: 7,
    name: "Bow Earrings",
    category: "earrings",
    material: "Yellow Gold",
    price: 170,
    badge: "New",
    image: "../images/earring2.png",
   
  },
  {
    id: 8,
    name: "Ocean Carle",
    category: "necklaces",
    material: "Yellow Gold",
    price: 500,
    badge: "bestsaller",
    image: "../images/collier2.png",
  },
  {
    id: 9,
    name: "Elegant Gold Bracelet Collection",
    category: "bracelets",
    material: "Yellow Gold",
    price: 150,
    badge: "limited",
    image: "../images/braclet2.png",
    
  },
  {
    id: 10,
    name: "Floral Elegance",
    category: "brooches",
    material: "White Gold",
    price: 80,
    badge: null,
    image: "../images/brooche2.png",
   
  },
  {
    id: 11,
    name: "Bague Fleur d'Or Élégance",
    category: "rings",
    material: "Yellow Gold",
    price: 300,
    badge: "sale",
    image: "../images/ring3.png",
     
  },
  {
    id: 12,
    name: "Pearl Starfish Chic",
    category: "earrings",
    material: "Yellow Gold",
    price: 240,
    badge: "Bestseller",
    image: "../images/earring3.png",
    
  },
  {
    id: 13,
    name: "Gold Star Layer Necklace",
    category: "necklaces",
    material: "Yellow Gold",
    price: 240,
    badge: "limited",
    image: "../images/collier3.png",
    
  },
  {
    id: 14,
    name: "Broche Rose Chic Strass",
    category: "brooches",
    material: "Rose Gold",
    price: 40,
    badge: null,
    image: "../images/brooche3.png",

  },
  {
    id: 15,
    name: "Louis Vuitton",
    category: "bracelets",
    material: "Yellow Gold",
    price: 500,
    badge: "bestseller",
    image: "../images/braclet3.png",
   
  },
  {
    id: 16,
    name: "Pandora",
    category: "rings",
    material: "Rose Gold",
    price: 500,
    badge: "bestseller",
    image: "../images/ring4.png",
   
  },
  {
    id: 17,
    name: "Tears",
    category: "earrings",
    material: "Yellow Gold",
    price: 99,
    badge: "bestseller",
    image: "../images/earring4.png",
    
  },
  {
    id: 18,
    name: "Swan",
    category: "necklaces",
    material: "Rose Gold",
    price: 220,
    badge: "bestseller",
    image: "../images/collier4.png",
 
  },
  {
    id: 19,
    name: "Leaf",
    category: "brooches",
    material: "White Gold",
    price: 45,
    badge: null,
    image: "../images/brooche4.png",
    
  },
  {
    id: 20,
    name: "Flowers",
    category: "bracelets",
    material: "Yellow Gold",
    price: 500,
    badge: "bestseller",
    image: "../images/braclet4.png",
    
  },
  {
    id: 21,
    name: "Rosalie",
    category: "rings",
    material: "Rose Gold",
    price: 370,
    badge: "sale",
    image: "../images/ring5.png",

  },
  {
    id: 22,
    name: "Eternal Rose",
    category: "rings",
    material: "Rose Gold",
    price: 230,
    badge: "bestseller",
    image: "../images/ring6.png",
   
  },
  {
    id: 23,
    name: "Pandora",
    category: "necklaces",
    material: "Yellow Gold",
    price: 420,
    badge: "bestseller",
    image: "../images/collier5.png",

  },
  {
    id: 24,
    name: "Sparkling Bloom",
    category: "brooches",
    material: "White Gold",
    price: 500,
    badge: "sale",
    image: "../images/brooche7.png",
    
  },
  {
    id: 25,
    name: "Dior",
    category: "bracelets",
    material: "Yellow Gold",
    price: 500,
    badge: "bestseller",
    image: "../images/braclet5.png",
   
  },
  {
    id: 26,
    name: "dior",
    category: "bracelets",
    material: "Yellow Gold",
    price: 500,
    badge: "bestseller",
    image: "../images/braclet6.png",
    
  },
  {
    id: 27,
    name: "Feuilles",
    category: "brooches",
    material: "White Gold",
    price: 600,
    badge: "New",
    image: "../images/brooche5.png",
  
  },
  {
    id: 28,
    name: "Plume",
    category: "brooches",
    material: "Yellow Gold",
    price: 500,
    badge: "bestseller",
    image: "../images/brooche6.png",
   
  },
  {
    id: 29,
    name: "Princesse",
    category: "necklaces",
    material: "Rose Gold",
    price: 700,
    badge: "new",
    image: "../images/collier6.png",
  },
  {
    id: 30,
    name: "Floral Star Ring",
    category: "rings",
    material: "White Gold",
    price: 500,
    badge: "bestseller",
    image: "../images/ring7.png",
   
  },
  {
    id: 31,
    name: "Pandora",
    category: "rings",
    material: "White Gold",
    price: 500,
    badge: "bestseller",
    image: "../images/ring8.png",
   
  },
   {
    id: 32,
    name: "Secret Garden Ring",
    category: "earrings",
    material: "Silver",
    price: 85,
    badge: "bestseller",
    image: "../images/earring5.png",
   
  },
  {
    id: 33,
    name: "Moonlight Shine Earrings",
    category: "rings",
    material: "Platinum",
    price: 2340,
    badge: "New",
    image: "../images/ring9.png",
    
  },
  {
    id: 34,
    name: "Moonlit Drop",
    category: "necklaces",
    material: "Platinum",
    price: 700,
    badge: "sale",
    image: "../images/collier7.png",
  },
  {
    id: 35,
    name: "Royal Sparkle",
    category: "bracelets",
    material: "Silver",
    price: 500,
    badge: "New",
    image: "../images/braclet8.png",

  },
  {
    id: 36,
    name: "Crystal Crown",
    category: "bracelets",
    material: "Platinum",
    price: 330,
    badge: null,
    image: "../images/braclet9.png",
    
  },
  {
    id: 37,
    name: "Frost Flower",
    category: "rings",
    material: "Silver",
    price: 7800,
    badge: "New",
    image: "../images/ring10.png",
   
  },
  {
    id: 38,
    name: "Starlight Cascade",
    category: "necklaces",
    material: "Silver",
    price: 220,
    badge: null,
    image: "../images/collier8.png",
   
  },
  {
    id: 39,
    name: "Cystal Rain",
    category: "earrings",
    material: "Platinum",
    price: 130,
    badge: null,
    image: "../images/earring6.png",
    
  },
  {
    id: 40,
    name: "Daimond Aurora",
    category: "rings",
    material: "Silver",
    price: 6100,
    badge: "NEW",
    image: "../images/ring11.png",

  },

];

// ── State ───────────────────────────────────────────────────────
let activeCategory = "all";
let activeSort     = "featured";

// ── Render products into grid ───────────────────────────────────
function renderProducts(list) {
  const grid    = document.getElementById("shopGrid");
  const countEl = document.getElementById("productCount");
  if (!grid) return;

  if (list.length === 0) {
    grid.innerHTML = `<p style="grid-column:1/-1;text-align:center;color:var(--gray);padding:3rem 0;">No products found in this category.</p>`;
  } else {
    grid.innerHTML = list.map(p => `
      <article class="product-card" data-id="${p.id}" data-category="${p.category}">
        <div class="product-img">
          ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ""}
          <img src="${p.image}" alt="${p.name}" loading="lazy" />
          <div class="product-overlay">
            <span onclick="addToOrder(${p.id}, event)">Add to Order &nbsp;→</span>
          </div>
        </div>
        <div class="product-info">
          <p class="product-category">${formatCategory(p.category)}</p>
          <h3 class="product-name">${p.name}</h3>
          <p class="product-description">
           ${p.description || ""}
          </p>
         <p class="product-price">${p.price.toLocaleString()} da</p>
        </div>
      </article>
    `).join("");
  }

  if (countEl) countEl.textContent = list.length;
}

// ── Filter + Sort pipeline ──────────────────────────────────────
function applyFilters() {
  let list = [...PRODUCTS];

  if (activeCategory !== "all") {
    list = list.filter(p => p.category === activeCategory);
  }

  const checkedMaterials = getChecked("material");
  if (checkedMaterials.length) {
    list = list.filter(p => checkedMaterials.includes(p.material));
  }

  const minEl = document.getElementById("priceMin");
  const maxEl = document.getElementById("priceMax");
  if (minEl && minEl.value) list = list.filter(p => p.price >= +minEl.value);
  if (maxEl && maxEl.value) list = list.filter(p => p.price <= +maxEl.value);

  const sortEl = document.getElementById("sortSelect");
  if (sortEl) activeSort = sortEl.value;

  switch (activeSort) {
    case "price-asc":  list.sort((a,b) => a.price - b.price); break;
    case "price-desc": list.sort((a,b) => b.price - a.price); break;
    case "newest":     list.sort((a,b) => b.id - a.id); break;
    case "bestseller": list = list.filter(p => p.badge === "Bestseller").concat(list.filter(p => p.badge !== "Bestseller")); break;
    default: break;
  }

  renderProducts(list);
}

function getChecked(name) {
  return [...document.querySelectorAll(`input[data-filter="${name}"]:checked`)].map(el => el.value);
}

function formatCategory(cat) {
  return cat.charAt(0).toUpperCase() + cat.slice(1);
}

// ── Category filter buttons ─────────────────────────────────────
function initCategoryButtons() {
  document.querySelectorAll(".filter-btn[data-cat]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn[data-cat]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeCategory = btn.dataset.cat;
      applyFilters();
    });
  });
}

// ── Cart helpers ─────────────────────────────────────────────────
function getCart() {
  return JSON.parse(localStorage.getItem("aurielle_cart") || "[]");
}

function saveCart(cart) {
  localStorage.setItem("aurielle_cart", JSON.stringify(cart));
}

// ── Add to order (FIX: increments qty if item already in cart) ──
function addToOrder(id, event) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;

  let cart = getCart();
  const existing = cart.find(item => item.id === id);

  if (existing) {
    // FIX: was silently ignoring duplicates — now increments quantity
    existing.qty = (existing.qty || 1) + 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart(cart);

  // Visual feedback
  const btn = event ? event.target : null;
  if (btn) {
    const original = btn.textContent;
    btn.textContent = "✓ Added";
    setTimeout(() => { btn.textContent = original; }, 1800);
  }

  updateCartCount();
}

// ── FIX: count total quantity, not just unique items ─────────────
function updateCartCount() {
  const cart  = getCart();
  const total = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
  const badge = document.getElementById("cartCount");
  if (badge) badge.textContent = total || "";
}

// ── Search box toggle (only on pages that have the search UI) ───
function initSearch() {
  const icon  = document.getElementById("searchIcon");
  const box   = document.getElementById("searchBox");
  const input = document.getElementById("searchInput");
  if (!icon || !box || !input) return;

  icon.addEventListener("click", (e) => {
    e.stopPropagation();
    box.classList.toggle("active");
    if (box.classList.contains("active")) input.focus();
  });

  document.addEventListener("click", (e) => {
    if (!box.contains(e.target) && e.target !== icon) {
      box.classList.remove("active");
    }
  });

  box.addEventListener("click", (e) => e.stopPropagation());

  input.addEventListener("keyup", () => {
    const value = input.value.toLowerCase();
    // FIX: use .product-card on shop page, .product-card on index page
    document.querySelectorAll(".product-card").forEach(item => {
      item.style.display = item.textContent.toLowerCase().includes(value) ? "" : "none";
    });
  });
}

// ── Init ────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  initSearch();

  if (document.getElementById("shopGrid")) {
    applyFilters();
    initCategoryButtons();

    const sortEl = document.getElementById("sortSelect");
    if (sortEl) sortEl.addEventListener("change", applyFilters);

    document.querySelectorAll(".sidebar-filter").forEach(el => {
      el.addEventListener("change", applyFilters);
    });

    ["priceMin", "priceMax"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener("input", applyFilters);
    });

    const applyBtn = document.getElementById("applyFilters");
    if (applyBtn) applyBtn.addEventListener("click", applyFilters);
  }

  updateCartCount();
});