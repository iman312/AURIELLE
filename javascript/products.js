/* ============================================
   products.js — Product data + dynamic rendering + filtering
   ============================================ */

  // ── Search box toggle ───────────────────────────────────────────
  document.addEventListener("DOMContentLoaded", () => {
  const icon = document.getElementById("searchIcon");
  const box = document.getElementById("searchBox");
  const input = document.getElementById("searchInput");

  // Toggle search box
  icon.addEventListener("click", (e) => {
    e.stopPropagation(); // prevents immediate closing
    box.classList.toggle("active");
  });

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (!box.contains(e.target)) {
      box.classList.remove("active");
    }
  });

  // Prevent closing when clicking inside input
  box.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  // Search filtering
  input.addEventListener("keyup", () => {
    const value = input.value.toLowerCase();
    const items = document.querySelectorAll(".product");

    items.forEach(item => {
      const name = item.textContent.toLowerCase();
      item.style.display = name.includes(value) ? "block" : "none";
    });
  });
});
// ── Product Data (stored as JS array) ──────────────────────────
const PRODUCTS = [
  {
    id: 1,
    name: "Eternal Rose Ring",
    category: "rings",
    material: "Rose Gold",
    price: 320,
    badge: "New",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80",
    description: "Handcrafted 18k rose gold ring with diamond accents."
  },
  {
    id: 2,
    name: "Soleil Diamond Necklace",
    category: "necklaces",
    material: "Yellow Gold",
    price: 580,
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1573408301185-9519f94816b5?w=600&q=80",
    description: "Radiant sun pendant set with brilliant-cut diamonds."
  },
  {
    id: 3,
    name: "Cascade Pearl Earrings",
    category: "earrings",
    material: "Silver",
    price: 245,
    badge: null,
    image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=600&q=80",
    description: "Cascading freshwater pearls on sterling silver hooks."
  },
  {
    id: 4,
    name: "Aurora Gold Bracelet",
    category: "bracelets",
    material: "Yellow Gold",
    price: 410,
    badge: "Limited",
    image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=600&q=80",
    description: "Delicate 18k yellow gold chain bracelet with aurora motif."
  },
  {
    id: 5,
    name: "Midnight Sapphire Ring",
    category: "rings",
    material: "White Gold",
    price: 695,
    badge: null,
    image: "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=600&q=80",
    description: "Deep blue sapphire set in a white gold pavé band."
  },
  {
    id: 6,
    name: "Lumière Pendant",
    category: "necklaces",
    material: "Rose Gold",
    price: 185,
    badge: null,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80",
    description: "Minimalist rose gold pendant — effortless everyday elegance."
  },
  {
    id: 7,
    name: "Étoile Diamond Earrings",
    category: "earrings",
    material: "White Gold",
    price: 870,
    badge: "New",
    image: "https://images.unsplash.com/photo-1553691927-a04e6a24a1cc?w=600&q=80",
    description: "Star-shaped stud earrings with pavé diamond setting."
  },
  {
    id: 8,
    name: "Infinity Gold Bangle",
    category: "bracelets",
    material: "Yellow Gold",
    price: 290,
    badge: null,
    image: "https://images.unsplash.com/photo-1564173062-85f42423a44d?w=600&q=80",
    description: "Solid 14k gold bangle with brushed finish."
  },
  {
    id: 9,
    name: "Noir Onyx Ring",
    category: "rings",
    material: "Silver",
    price: 230,
    badge: "Sale",
    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=600&q=80",
    description: "Bold black onyx set in oxidised sterling silver."
  },
  {
    id: 10,
    name: "Celestial Choker",
    category: "necklaces",
    material: "Yellow Gold",
    price: 340,
    badge: null,
    image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&q=80",
    description: "Moon-and-stars choker in polished yellow gold."
  },
  {
    id: 11,
    name: "Vintage Cameo Brooch",
    category: "brooches",
    material: "Silver",
    price: 155,
    badge: null,
    image: "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=600&q=80",
    description: "Victorian-inspired cameo brooch in antique silver."
  },
  {
    id: 12,
    name: "Halo Engagement Ring",
    category: "rings",
    material: "White Gold",
    price: 1240,
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1608042314453-ae338d80c427?w=600&q=80",
    description: "Classic halo setting with centre diamond, 18k white gold."
  }
];

// ── State ───────────────────────────────────────────────────────
let activeCategory = "all";
let activeSort     = "featured";

// ── Render products into grid ───────────────────────────────────
function renderProducts(list) {
  const grid = document.getElementById("shopGrid");
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
            <span onclick="addToOrder(${p.id})">Add to Order &nbsp;→</span>
          </div>
        </div>
        <div class="product-info">
          <p class="product-category">${formatCategory(p.category)}</p>
          <h3 class="product-name">${p.name}</h3>
          <p class="product-price">$${p.price.toLocaleString()}</p>
        </div>
      </article>
    `).join("");
  }

  if (countEl) countEl.textContent = list.length;
}

// ── Filter + Sort pipeline ──────────────────────────────────────
function applyFilters() {
  let list = [...PRODUCTS];

  // Category filter
  if (activeCategory !== "all") {
    list = list.filter(p => p.category === activeCategory);
  }

  // Sidebar checkbox filters
  const checkedMaterials = getChecked("material");
  if (checkedMaterials.length) {
    list = list.filter(p => checkedMaterials.includes(p.material));
  }

  // Price range
  const minEl = document.getElementById("priceMin");
  const maxEl = document.getElementById("priceMax");
  if (minEl && minEl.value) list = list.filter(p => p.price >= +minEl.value);
  if (maxEl && maxEl.value) list = list.filter(p => p.price <= +maxEl.value);

  // Sort
  const sortEl = document.getElementById("sortSelect");
  if (sortEl) activeSort = sortEl.value;

  switch (activeSort) {
    case "price-asc":  list.sort((a,b) => a.price - b.price); break;
    case "price-desc": list.sort((a,b) => b.price - a.price); break;
    case "newest":     list.sort((a,b) => b.id - a.id); break;
    case "bestseller": list = list.filter(p => p.badge === "Bestseller").concat(list.filter(p => p.badge !== "Bestseller")); break;
    default: break; // featured = original order
  }

  renderProducts(list);
}

function getChecked(name) {
  return [...document.querySelectorAll(`input[data-filter="${name}"]:checked`)].map(el => el.value);
}

function formatCategory(cat) {
  return cat.charAt(0).toUpperCase() + cat.slice(1);
}

// ── Category filter buttons (top bar) ──────────────────────────
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

// ── Add to order (saves to localStorage) ───────────────────────
function addToOrder(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;

  let cart = JSON.parse(localStorage.getItem("aurielle_cart") || "[]");
  const exists = cart.find(item => item.id === id);
  if (!exists) cart.push({ ...product, qty: 1 });
  localStorage.setItem("aurielle_cart", JSON.stringify(cart));

  // Visual feedback
  const btn = event.target;
  const original = btn.textContent;
  btn.textContent = "✓ Added";
  setTimeout(() => { btn.textContent = original; }, 1800);

  updateCartCount();
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("aurielle_cart") || "[]");
  const badge = document.getElementById("cartCount");
  if (badge) badge.textContent = cart.length || "";
}

// ── Init ────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("shopGrid")) {
    applyFilters();
    initCategoryButtons();

    // Sort listener
    const sortEl = document.getElementById("sortSelect");
    if (sortEl) sortEl.addEventListener("change", applyFilters);

    // Sidebar filter listeners
    document.querySelectorAll(".sidebar-filter").forEach(el => {
      el.addEventListener("change", applyFilters);
    });

    // Price range
    ["priceMin","priceMax"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener("input", applyFilters);
    });

    // Apply filters button
    const applyBtn = document.getElementById("applyFilters");
    if (applyBtn) applyBtn.addEventListener("click", applyFilters);
  }

  updateCartCount();
});