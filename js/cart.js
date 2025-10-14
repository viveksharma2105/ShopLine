// Cart state and logic (from original script.js)
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let appliedPromo = null;

function addToCart(id) {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty += 1;
  } else {
    const product = products.find(p => p.id === id);
    if (!product) return;
    cart.push({ ...product, qty: 1 });
  }
  saveCart();
  updateCartBadge();
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  renderCart();
  updateCartBadge();
}

function updateCartBadge() {
  const count = cart.reduce((sum, i) => sum + i.qty, 0);
  const el = document.getElementById('cart-count');
  if (el) el.textContent = count;
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) checkoutBtn.disabled = count === 0;
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function renderCart() {
  const container = document.getElementById('cart-items');
  if (!container) return;
  container.innerHTML = '';
  if (cart.length === 0) {
    container.innerHTML = '<p class="text-muted">Your cart is empty.</p>';
    const subEl = document.getElementById('cart-subtotal'); if (subEl) subEl.textContent = '0.00';
    const discEl = document.getElementById('cart-discount'); if (discEl) discEl.textContent = '';
    return;
  }
  let subtotal = 0;
  cart.forEach(item => {
    subtotal += item.price * item.qty;
    const div = document.createElement('div');
    div.className = 'cart-item d-flex align-items-center gap-2';
    div.innerHTML = `
      <img src="${item.image}" class="cart-item-img" alt="${item.name}">
      <div class="flex-grow-1">
        <h6>${item.name}</h6>
        <div>Price: $${item.price.toFixed(2)}</div>
        <div class="d-flex align-items-center gap-2">
          <button class="btn btn-outline-secondary btn-sm" data-action="decrease" data-id="${item.id}">-</button>
          <span>Qty: ${item.qty}</span>
          <button class="btn btn-outline-secondary btn-sm" data-action="increase" data-id="${item.id}">+</button>
        </div>
        <div>Subtotal: $${(item.price * item.qty).toFixed(2)}</div>
      </div>
      <button class="btn btn-outline-danger btn-sm" onclick="removeFromCart(${item.id})">Remove</button>
    `;
    container.appendChild(div);
  });

  // Add event listeners for + and - buttons
  container.querySelectorAll('button[data-action="increase"]').forEach(btn => {
    btn.onclick = function() {
      const id = parseInt(btn.getAttribute('data-id'));
      const item = cart.find(i => i.id === id);
      if (item) { item.qty += 1; saveCart(); renderCart(); updateCartBadge(); }
      if (typeof handleApplyPromo === 'function' && appliedPromo) { renderCart(); }
    };
  });
  container.querySelectorAll('button[data-action="decrease"]').forEach(btn => {
    btn.onclick = function() {
      const id = parseInt(btn.getAttribute('data-id'));
      const item = cart.find(i => i.id === id);
      if (item && item.qty > 1) { item.qty -= 1; saveCart(); renderCart(); updateCartBadge(); }
      else if (item && item.qty === 1) { removeFromCart(id); }
      if (typeof handleApplyPromo === 'function' && appliedPromo) { renderCart(); }
    };
  });

  let discount = 0;
  const discEl = document.getElementById('cart-discount');
  if (appliedPromo === 'SAVE10') {
    discount = subtotal * 0.10;
    if (discEl) discEl.textContent = `Promo Applied: -$${discount.toFixed(2)}`;
  } else if (appliedPromo === 'SAVE20') {
    discount = subtotal * 0.20;
    if (discEl) discEl.textContent = `Promo Applied: -$${discount.toFixed(2)}`;
  } else {
    if (discEl) discEl.textContent = '';
  }
  const subEl = document.getElementById('cart-subtotal'); if (subEl) subEl.textContent = (subtotal - discount).toFixed(2);
}

// Expose for inline onclick
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;

// Initial render and badge update
renderCart();
updateCartBadge();