// Promo code logic (copied)
function verifyPromoCode(code) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (code === 'SAVE10' || code === 'SAVE20') {
        resolve(code);
      } else {
        reject('Invalid promo code');
      }
    }, 2000);
  });
}

// Called when user clicks Apply in cart modal
async function handleApplyPromo() {
  const codeEl = document.getElementById('promo-code');
  if (!codeEl) return;
  const code = codeEl.value.trim().toUpperCase();
  const msg = document.getElementById('promo-message');
  if (msg) { msg.textContent = 'Verifying...'; msg.className = 'text-info'; }
  try {
    const result = await verifyPromoCode(code);
    appliedPromo = result;
    if (msg) { msg.textContent = `Promo code applied: ${result}`; msg.className = 'text-success'; }
    renderCart();
  } catch (err) {
    appliedPromo = null;
    if (msg) { msg.textContent = err; msg.className = 'text-danger'; }
    renderCart();
  }
}

// Wire up apply button if present (DOMContentLoaded wiring is in main.js but keep id-based hookup here as a fallback)
const _promoBtn = document.getElementById('apply-promo');
if (_promoBtn) _promoBtn.addEventListener('click', handleApplyPromo);