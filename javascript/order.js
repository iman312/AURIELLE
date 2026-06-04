

document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("aurielle_cart") || "[]");

  const itemsEl  = document.getElementById("summaryItems");
  const totalsEl = document.getElementById("summaryTotals");

  if (cart.length === 0) return;

  let subtotal = 0;

  itemsEl.innerHTML = cart.map(item => {
    subtotal += item.price * (item.qty || 1);
    return `
      <div class="summary-item">
        <img src="${item.image}" alt="${item.name}" />
        <div class="summary-item-info">
          <p class="summary-item-name">${item.name}</p>
          <p class="summary-item-cat">${item.category}</p>
        </div>
        <span class="summary-item-price">$${item.price.toLocaleString()}</span>
      </div>
    `;
  }).join("");

  const tax   = Math.round(subtotal * 0.08);
  const total = subtotal + tax;

  document.getElementById("subtotal").textContent = `$${subtotal.toLocaleString()}`;
  document.getElementById("tax").textContent      = `$${tax.toLocaleString()}`;
  document.getElementById("total").textContent    = `$${total.toLocaleString()}`;

  totalsEl.style.display = "block";

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