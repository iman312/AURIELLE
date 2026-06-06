/* ── Cart helpers ──────────────────────────────────────────── */
function getCart()       { return JSON.parse(localStorage.getItem("aurielle_cart") || "[]"); }
function saveCart(cart)  { localStorage.setItem("aurielle_cart", JSON.stringify(cart)); }

/* ── Re-render the entire summary panel ────────────────────── */
function renderSummary() {
  const cart     = getCart();
  const itemsEl  = document.getElementById("summaryItems");
  const totalsEl = document.getElementById("summaryTotals");

  if (cart.length === 0) {
    itemsEl.innerHTML = `
      <p style="color:rgba(250,248,244,0.35);font-size:0.85rem;">
        Your cart is empty.<br>
        <a href="products.html" style="color:var(--gold);">Browse the collection →</a>
      </p>`;
    totalsEl.style.display = "none";
    return;
  }

  let subtotal = 0;
  itemsEl.innerHTML = cart.map(item => {
    const lineTotal = item.price * (item.qty || 1);
    subtotal += lineTotal;
    return `
      <div class="summary-item">
        <img src="${item.image}" alt="${item.name}" />
        <div class="summary-item-info">
          <p class="summary-item-name">${item.name}</p>
          <p class="summary-item-cat">${item.category}</p>
        </div>
        <div class="summary-item-right">
          <span class="summary-item-price">${lineTotal.toLocaleString()} da</span>
          <div class="qty-controls">
            <button class="qty-btn" onclick="changeQty(${item.id}, -1)" aria-label="Decrease">−</button>
            <span class="qty-value">${item.qty || 1}</span>
            <button class="qty-btn" onclick="changeQty(${item.id}, +1)" aria-label="Increase">+</button>
          </div>
          <button class="remove-btn" onclick="removeItem(${item.id})">
            <i class="fa-solid fa-xmark"></i> Remove
          </button>
        </div>
      </div>`;
  }).join("");

  const shipping = 700;
  const total = subtotal + shipping;

  document.getElementById("subtotal").textContent = `${subtotal.toLocaleString()} da`;
  document.getElementById("shipping").textContent      = `${shipping.toLocaleString()} da`;
  document.getElementById("total").textContent    = `${total.toLocaleString()} da`;
  totalsEl.style.display = "block";
}

/* ── FIX: increase / decrease quantity ─────────────────────── */
function changeQty(id, delta) {
  let cart = getCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty = Math.max(1, (item.qty || 1) + delta);
  saveCart(cart);
  renderSummary();
}

/* ── FIX: remove an item entirely ──────────────────────────── */
function removeItem(id) {
  let cart = getCart().filter(i => i.id !== id);
  saveCart(cart);
  renderSummary();
}

/* ── Init ───────────────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  renderSummary();

  // Pre-fill delivery fields if logged in
  const session = JSON.parse(localStorage.getItem("aurielle_session") || "null");
  if (session) {
    const fn = document.getElementById("orderFirstName");
    const ln = document.getElementById("orderLastName");
    const em = document.getElementById("orderEmail");
    if (fn) fn.value = session.firstName;
    if (ln) ln.value = session.lastName;
    if (em) em.value = session.email;
  }
});