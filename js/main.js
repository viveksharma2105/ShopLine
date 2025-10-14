// Page initialization and event wiring (from original script.js)

function animateCounters() {
  const counters = document.querySelectorAll('.counter');
  if (!counters || counters.length === 0) return;
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'), 10) || 0;
    const duration = 1400; // ms
    const start = 0;
    const startTime = performance.now();
    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.floor(progress * (target - start) + start);
      counter.textContent = value.toLocaleString();
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  });
}

function setupAboutUsAnimation() {
  const about = document.getElementById('aboutus');
  if (!about) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        io.disconnect();
      }
    });
  }, { threshold: 0.4 });
  io.observe(about);

  const aboutLinks = document.querySelectorAll('a[href$="#aboutus"], a[href*="#aboutus"]');
  aboutLinks.forEach(a => {
    a.addEventListener('click', () => { setTimeout(() => animateCounters(), 600); });
  });
}

// Navbar scroll event listener
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('nav');
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 0);
});

// DOM ready wiring
window.addEventListener('DOMContentLoaded', () => {
  // About Us animation
  setupAboutUsAnimation();
  animateCounters();

  // Initialize products on homepage
  if (document.getElementById('product-list')) {
    renderProducts();
  }

  // Update cart badge and render cart
  updateCartBadge();
  renderCart();

  // Wire promo apply button
  const promoBtn = document.getElementById('apply-promo');
  if (promoBtn) promoBtn.onclick = handleApplyPromo;

  // Delegate cart modal open to always work
  document.body.addEventListener('click', function(e) {
    const cartBtn = e.target.closest('a[data-bs-target="#cartModal"]');
    if (cartBtn) {
      e.preventDefault();
      renderCart();
      const cartModal = document.getElementById('cartModal');
      if (cartModal) {
        const modalInstance = bootstrap.Modal.getOrCreateInstance(cartModal);
        modalInstance.show();
      }
    }
  });

  // Hook invoice download button if present
  const dl = document.getElementById('download-invoice');
  if (dl) {
    dl.addEventListener('click', () => {
      const order = JSON.parse(sessionStorage.getItem('lastOrder'));
      if (order) generateInvoicePDF(order);
    });
  }

  // Search form simple filter (client-side)
  const searchForm = document.getElementById('search-form');
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => e.preventDefault());
    const input = document.getElementById('search-input');
    if (input) {
      input.addEventListener('input', (e) => {
        const q = e.target.value.trim().toLowerCase();
        const list = document.getElementById('product-list');
        if (!list) return;
        Array.from(list.children).forEach(col => {
          const titleEl = col.querySelector('.card-title');
          const title = titleEl ? titleEl.textContent.toLowerCase() : '';
          col.style.display = title.includes(q) ? '' : 'none';
        });
      });
    }
  }

  // Checkout detail page wiring
  const checkoutDetailForm = document.getElementById('checkout-detail-form');
  if (checkoutDetailForm) {
    checkoutDetailForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('custName').value.trim();
      const address = document.getElementById('custAddress').value.trim();
      const phone = document.getElementById('custPhone').value.trim();
      const email = document.getElementById('custEmail').value.trim();
      const promo = document.getElementById('custPromo').value.trim();
      const auto = document.getElementById('autoInvoice').checked;
      if (!name || !address || !phone || !email) { alert('Please fill required fields.'); return; }
      const order = JSON.parse(sessionStorage.getItem('lastOrder')) || {};
      order.billing = { name, address, phone, email };
      order.shipping = order.billing;
      order.payment = 'Cash on Delivery';
      order.promo = promo || null;
      sessionStorage.setItem('lastOrder', JSON.stringify(order));
      const msg = document.getElementById('checkout-message');
      if (msg) { msg.classList.remove('d-none'); msg.textContent = '✅ Order Placed Successfully! Thank you for shopping with SHOPLINE.'; }
      const checkoutModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('checkoutModalDetail'));
      if (checkoutModal) checkoutModal.hide();
      const invModal = new bootstrap.Modal(document.getElementById('invoiceModal'));
      invModal.show();
      if (auto) {
        setTimeout(() => {
          const saved = JSON.parse(sessionStorage.getItem('lastOrder'));
          if (saved) generateInvoicePDF(saved);
        }, 500);
      }
    });
  }

  // Populate checkout summary when modal shown
  const checkoutModalEl = document.getElementById('checkoutModalDetail');
  if (checkoutModalEl) {
    checkoutModalEl.addEventListener('show.bs.modal', () => {
      const order = JSON.parse(sessionStorage.getItem('lastOrder')) || {};
      const itemPrice = (order.product && order.product.price) ? order.product.price : 0;
      const summaryItem = document.getElementById('summary-item'); if (summaryItem) summaryItem.textContent = `$${itemPrice.toFixed(2)}`;
      const tax = +(itemPrice * 0.18).toFixed(2);
      const summaryTax = document.getElementById('summary-tax'); if (summaryTax) summaryTax.textContent = `$${tax.toFixed(2)}`;
      const summaryDisc = document.getElementById('summary-discount'); if (summaryDisc) summaryDisc.textContent = '-$0.00';
      const summaryTotal = document.getElementById('summary-total'); if (summaryTotal) summaryTotal.textContent = `$${(itemPrice + tax).toFixed(2)}`;
      const msg = document.getElementById('checkout-promo-msg'); if (msg) { msg.textContent = ''; msg.className = ''; }
    });
  }

  // Populate cart-based checkout modal summary
  const checkoutModalCartEl = document.getElementById('checkoutModal');
  if (checkoutModalCartEl) {
    checkoutModalCartEl.addEventListener('show.bs.modal', () => {
      // compute subtotal from cart
      let subtotal = 0;
      if (Array.isArray(cart) && cart.length > 0) {
        subtotal = cart.reduce((s, it) => s + (it.price * (it.qty || it.quantity || 0)), 0);
      }
      const itemPrice = subtotal;
      const summaryItem = document.getElementById('summary-item'); if (summaryItem) summaryItem.textContent = `$${itemPrice.toFixed(2)}`;
      const tax = +(itemPrice * 0.18).toFixed(2);
      const summaryTax = document.getElementById('summary-tax'); if (summaryTax) summaryTax.textContent = `$${tax.toFixed(2)}`;
      const summaryDisc = document.getElementById('summary-discount'); if (summaryDisc) summaryDisc.textContent = '-$0.00';
      const summaryTotal = document.getElementById('summary-total'); if (summaryTotal) summaryTotal.textContent = `$${(itemPrice + tax).toFixed(2)}`;
      const msg = document.getElementById('checkout-promo-msg'); if (msg) { msg.textContent = ''; msg.className = ''; }
    });
  }

  // Apply promo in checkout modal
  const applyCheckoutPromoBtn = document.getElementById('apply-checkout-promo');
  if (applyCheckoutPromoBtn) {
    applyCheckoutPromoBtn.addEventListener('click', async () => {
      const code = document.getElementById('custPromo').value.trim().toUpperCase();
      const msg = document.getElementById('checkout-promo-msg');
      const order = JSON.parse(sessionStorage.getItem('lastOrder')) || {};
      // determine itemPrice: prefer order.product.price (buy now), otherwise compute from cart
      let itemPrice = 0;
      if (order.product && order.product.price) itemPrice = order.product.price;
      else if (Array.isArray(cart) && cart.length > 0) itemPrice = cart.reduce((s, it) => s + (it.price * (it.qty || it.quantity || 0)), 0);
      const tax = +(itemPrice * 0.18).toFixed(2);
      if (!code) { if (msg) { msg.textContent = 'Enter a promo code'; msg.className = 'text-danger'; } return; }
      if (msg) { msg.textContent = 'Verifying...'; msg.className = 'text-info'; }
      try {
        const result = await verifyPromoCode(code);
        let discount = 0;
        if (result === 'SAVE10') discount = +(itemPrice * 0.10).toFixed(2);
        if (result === 'SAVE20') discount = +(itemPrice * 0.20).toFixed(2);
        const summaryDiscEl = document.getElementById('summary-discount'); if (summaryDiscEl) summaryDiscEl.textContent = `-$${discount.toFixed(2)}`;
        const summaryTotalEl = document.getElementById('summary-total'); if (summaryTotalEl) summaryTotalEl.textContent = `$${(itemPrice + tax - discount).toFixed(2)}`;
        if (msg) { msg.textContent = `Promo applied: ${result}`; msg.className = 'text-success'; }
        order.promo = result; order.discount = discount; order.tax = tax; order.total = +(itemPrice + tax - discount).toFixed(2);
        sessionStorage.setItem('lastOrder', JSON.stringify(order));
      } catch (err) {
        if (msg) { msg.textContent = err; msg.className = 'text-danger'; }
        const summaryDiscEl = document.getElementById('summary-discount'); if (summaryDiscEl) summaryDiscEl.textContent = '-$0.00';
        const summaryTotalEl = document.getElementById('summary-total'); if (summaryTotalEl) summaryTotalEl.textContent = `$${(itemPrice + tax).toFixed(2)}`;
      }
    });
  }

  // Render product detail if on product page
  renderProductDetail();
});