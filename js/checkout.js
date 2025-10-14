// Checkout and order summary logic (copied from original script.js)
function handleCheckout(e) {
  e.preventDefault();
  const name = document.getElementById('fullName').value.trim();
  const address = document.getElementById('address').value.trim();
  const email = document.getElementById('email').value.trim();
  const payment = document.getElementById('payment').value;
  if (!name || !address || !email || !payment) {
    alert('Please fill all fields.');
    return;
  }
  const successEl = document.getElementById('checkout-success');
  if (successEl) successEl.classList.remove('d-none');
  cart = [];
  appliedPromo = null;
  saveCart();
  updateCartBadge();
  renderCart();
  setTimeout(() => {
    if (successEl) successEl.classList.add('d-none');
    const checkoutForm = document.getElementById('checkout-form'); if (checkoutForm) checkoutForm.reset();
    const checkoutModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('checkoutModal'));
    if (checkoutModal) checkoutModal.hide();
    const cartModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('cartModal'));
    if (cartModal) cartModal.hide();
  }, 2000);
}

function createOrder(product) {
  const orderId = 'ORD' + Date.now();
  const date = new Date().toLocaleString();
  const billing = { name: 'John Doe', address: '123 Main St, City', email: 'johndoe@example.com' };
  const shipping = billing;
  const payment = 'Credit Card';
  const tax = +(product.price * 0.18).toFixed(2);
  const total = +(product.price + tax).toFixed(2);
  return { orderId, date, product: { name: product.name, price: product.price }, billing, shipping, payment, tax, total };
}

async function generateInvoicePDF(order) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text('Invoice', 14, 20);
  doc.setFontSize(11);
  doc.text(`Order ID: ${order.orderId}`, 14, 32);
  doc.text(`Date: ${order.date}`, 14, 40);
  doc.text(`Product: ${order.product.name}`, 14, 52);
  doc.text(`Price: $${order.product.price.toFixed(2)}`, 14, 60);
  doc.text(`Tax: $${order.tax.toFixed(2)}`, 14, 68);
  doc.text(`Total: $${order.total.toFixed(2)}`, 14, 78);
  doc.text('Billing Address:', 14, 92);
  doc.text(order.billing.name, 14, 100);
  doc.text(order.billing.address, 14, 108);
  doc.text(order.billing.email, 14, 116);
  doc.text(`Payment Method: ${order.payment}`, 14, 132);
  const fileName = `invoice_${order.orderId}.pdf`;
  doc.save(fileName);
}

// Hook checkout detail form submission (if present) — DOMContentLoaded wiring in main.js will initialize listeners