// Gadget Store JS - Cart, Promo, Checkout
// Product catalog data (expanded categories)
const products = [];
let pid = 1;
function addProduct(name, price, image, category) {
  products.push({ id: pid++, name, price, image, category });
}

// Helper: generate image URLs from Unsplash with query
function unsplash(query, w = 500) {
  return `https://images.unsplash.com/photo-` + encodeURIComponent(query) + `?auto=format&fit=crop&w=${w}&q=80`;
}

// We'll add 20 items for Electronics, Fashion, Furniture, Flight Booking (as 'Flight') and Contact (as Services)
const electronics = [
  ['Wireless Headphones', 99.99, 'photo-1520170350707-b2da59970118'],
  ['Wristwatch', 149.99, 'photo-1622434641406-a158123450f9'],
  ['Laptop', 899.99, 'photo-1541807084-5c52b6b3adef'],
  ['Bluetooth Speaker', 59.99, 'photo-1507878566509-a0dbe19677a5'],
  ['Drone', 299.99, 'photo-1539213465191-6046fe072ade'],
  ['VR Headset', 199.99, 'photo-1736502408052-d97c63e04388'],
  ['Gaming Console', 399.99, 'photo-1683823362932-6f7599661d22'],
  ['4K Monitor', 249.99, 'photo-1527800792452-506aacb2101f'],
  ['Mechanical Keyboard', 89.99, 'photo-1707272037423-fa774b7d879c'],
  ['Wireless Mouse', 29.99, 'photo-1662323861979-0538474387e3'],
  ['Portable SSD', 129.99, 'photo-1719937050792-a6a15d899281'],
  ['Action Camera', 199.99, 'photo-1601305522520-0a63f0bef102'],
  ['Smart Home Hub', 79.99, 'photo-1655976797987-0fdbab9e7419'],
  ['Noise Cancelling Earbuds', 129.99, 'photo-1733641839241-6ae7a628971f'],
  ['Projector', 329.99, 'photo-1750994700092-19f94d4da5ff'],
  ['Router', 59.99, 'photo-1606904825846-647eb07f5be2'],
  ['Smart Light', 19.99, 'photo-1711006155490-ec01a0ecf0de'],
  ['Home Camera', 89.99, 'photo-1670278458296-00ff8a63141e'],
  ['E-reader', 119.99, 'photo-1611650933823-97a2a1922b7e'],
  ['Wireless Charger', 24.99, 'photo-1615526675159-e248c3021d3f']
];

const fashion = [
  ['Classic T-Shirt', 19.99, 'photo-1667729699384-aac3a128f18a'],
  ['Denim Jacket', 79.99, 'photo-1669554301637-4b6d64d9b1af'],
  ['Sneakers', 69.99, 'photo-1512374382149-233c42b6a83b'],
  ['Leather Belt', 29.99, 'photo-1666723043169-22e29545675c'],
  ['Sunglasses', 49.99, 'photo-1566421966482-ad8076104d8e'],
  ['Wristwatch', 149.99, 'photo-1587925358603-c2eea5305bbc'],
  ['Handbag', 129.99, 'photo-1682745230951-8a5aa9a474a0'],
  ['Dress', 89.99, 'photo-1623609163859-ca93c959b98a'],
  ['Formal Shoes', 99.99, 'photo-1531310197839-ccf54634509e'],
  ['Cap', 15.99, 'photo-1589831377283-33cb1cc6bd5d'],
  ['Scarf', 19.99, 'photo-1609803384069-19f3e5a70e75'],
  ['Jeans', 49.99, 'photo-1582552938357-32b906df40cb'],
  ['Hoodie', 39.99, 'photo-1704430705406-24fc29dfcccf'],
  ['Watch Strap', 9.99, 'photo-1679759022456-a7eae2257ba2'],
  ['Wallet', 24.99, 'photo-1531190260877-c8d11eb5afaf'],
  ['Bracelet', 19.99, 'photo-1744472457504-f99a96ecbd3e'],
  ['Perfume', 59.99, 'photo-1610461888750-10bfc601b874'],
  ['Leggings', 29.99, 'photo-1649318095230-b4dc06b1e1db'],
  ['Belt Bag', 34.99, 'photo-1671272980551-500bc76d336c'],
  ['Socks (5-pack)', 12.99, 'photo-1694690127800-68314991ee83']
];

const furniture = [
  ['Sofa', 499.99, 'photo-1698936061086-2bf99c7b9fc5'],
  ['Dining Table', 299.99, 'photo-1617850687361-a07b256ff259'],
  ['Office Chair', 149.99, 'photo-1688578735427-994ecdea3ea4'],
  ['Bookshelf', 129.99, 'photo-1699443817739-cf2f7cbcd18d'],
  ['Bed Frame', 399.99, 'photo-1691751579305-cfaee3b8ec2b'],
  ['Wardrobe', 599.99, 'photo-1722942626414-5775702d7a08'],
  ['TV Stand', 89.99, 'photo-1542487354-feaf93476caa'],
  ['Coffee Table', 79.99, 'photo-1542372147193-a7aca54189cd'],
  ['Nightstand', 49.99, 'photo-1593194632872-3d19dab6e278'],
  ['Dresser', 199.99, 'photo-1603112089080-3ef8f7bb9dcf'],
  ['Bar Stool', 59.99, 'photo-1622986339425-7f92e62dab42'],
  ['Accent Chair', 179.99, 'photo-1759264244744-4b0077534bfd'],
  ['TV Unit', 249.99, 'photo-1593361351718-6b853f7b3431'],
  ['Sectional Sofa', 899.99, 'photo-1759722665935-0967b4e0da93'],
  ['Patio Set', 349.99, 'photo-1667870703611-f966997e8c52'],
  ['Console Table', 129.99, 'photo-1609879938030-31acdeded104'],
  ['Futon', 219.99, 'photo-1555041469-a586c61ea9bc'],
  ['Bean Bag', 49.99, 'photo-1582582494709-3b3b8c71f8b7'],
  ['Loveseat', 399.99, 'photo-1600585154340-be6161a56a0c'],
  ['Cabinet', 159.99, 'photo-1578898882341-2cc6e6d0c8b3']
];

const flights = [
  ['Roundtrip: NYC - LAX', 299.99, 'photo-1504813184181-36a1d5c16a8f'],
  ['One-way: LHR - DXB', 199.99, 'photo-1493558103817-58b2924bce98'],
  ['Roundtrip: SFO - SEA', 149.99, 'photo-1473186505569-9c61870c11f9'],
  ['One-way: DEL - BOM', 99.99, 'photo-1508264165352-258a6bce4d5d'],
  ['Roundtrip: SYD - MEL', 129.99, 'photo-1482192505345-5655af888cc4'],
  ['Roundtrip: PAR - BCN', 89.99, 'photo-1496307042754-b4aa456c4a2d'],
  ['One-way: JFK - MIA', 79.99, 'photo-1507525428034-b723cf961d3e'],
  ['Roundtrip: TOR - YVR', 159.99, 'photo-1526772662000-3f88f10405ff'],
  ['Roundtrip: FRA - IST', 179.99, 'photo-1496307042754-b4aa456c4a2d'],
  ['One-way: NRT - HND', 69.99, 'photo-1473186505569-9c61870c11f9'],
  ['Roundtrip: HKG - SIN', 139.99, 'photo-1482192505345-5655af888cc4'],
  ['Roundtrip: MAD - LIS', 89.99, 'photo-1508264165352-258a6bce4d5d'],
  ['One-way: MEX - GDL', 59.99, 'photo-1507525428034-b723cf961d3e'],
  ['Roundtrip: BCN - ROM', 99.99, 'photo-1526772662000-3f88f10405ff'],
  ['One-way: ICN - KIX', 119.99, 'photo-1493558103817-58b2924bce98'],
  ['Roundtrip: JNB - CPT', 199.99, 'photo-1504813184181-36a1d5c16a8f'],
  ['One-way: BKK - CNX', 79.99, 'photo-1473186505569-9c61870c11f9'],
  ['Roundtrip: LAX - LAS', 49.99, 'photo-1507525428034-b723cf961d3e'],
  ['One-way: AMS - BRU', 69.99, 'photo-1496307042754-b4aa456c4a2d'],
  ['Roundtrip: BOS - DFW', 119.99, 'photo-1526772662000-3f88f10405ff']
];

const services = [
  ['Contact: Customer Support', 0.00, 'photo-1504384308090-c894fdcc538d'],
  ['Contact: Sales Inquiry', 0.00, 'photo-1529333166437-7750a6dd5a70'],
  ['Contact: Wholesale', 0.00, 'photo-1504384308090-c894fdcc538d'],
  ['Contact: Careers', 0.00, 'photo-1529333166437-7750a6dd5a70'],
  ['Contact: Partner', 0.00, 'photo-1504384308090-c894fdcc538d'],
  ['Contact: Media', 0.00, 'photo-1529333166437-7750a6dd5a70'],
  ['Contact: Events', 0.00, 'photo-1504384308090-c894fdcc538d'],
  ['Contact: Feedback', 0.00, 'photo-1529333166437-7750a6dd5a70'],
  ['Contact: Store Locator', 0.00, 'photo-1504384308090-c894fdcc538d'],
  ['Contact: Affiliate', 0.00, 'photo-1529333166437-7750a6dd5a70'],
  ['Contact: Returns', 0.00, 'photo-1504384308090-c894fdcc538d'],
  ['Contact: Refunds', 0.00, 'photo-1529333166437-7750a6dd5a70'],
  ['Contact: Policy', 0.00, 'photo-1504384308090-c894fdcc538d'],
  ['Contact: Partnerships', 0.00, 'photo-1529333166437-7750a6dd5a70'],
  ['Contact: Legal', 0.00, 'photo-1504384308090-c894fdcc538d'],
  ['Contact: Help Center', 0.00, 'photo-1529333166437-7750a6dd5a70'],
  ['Contact: Press', 0.00, 'photo-1504384308090-c894fdcc538d'],
  ['Contact: Investors', 0.00, 'photo-1529333166437-7750a6dd5a70'],
  ['Contact: Sustainability', 0.00, 'photo-1504384308090-c894fdcc538d'],
  ['Contact: Other', 0.00, 'photo-1529333166437-7750a6dd5a70']
];

electronics.forEach(([n,p,img]) => addProduct(n,p,`https://images.unsplash.com/${img}?auto=format&fit=crop&w=600&q=80`,'Electronics'));
fashion.forEach(([n,p,img]) => addProduct(n,p,`https://images.unsplash.com/${img}?auto=format&fit=crop&w=600&q=80`,'Fashion'));
furniture.forEach(([n,p,img]) => addProduct(n,p,`https://images.unsplash.com/${img}?auto=format&fit=crop&w=600&q=80`,'Furniture'));
flights.forEach(([n,p,img]) => addProduct(n,p,`https://images.unsplash.com/${img}?auto=format&fit=crop&w=600&q=80`,'Flight'));
services.forEach(([n,p,img]) => addProduct(n,p,`https://images.unsplash.com/${img}?auto=format&fit=crop&w=600&q=80`,'Contact'));

// Category filter
function filterCategory(cat) {
  const list = document.getElementById('product-list');
  list.innerHTML = '';
  let filtered;
  if (!cat || cat === 'all') {
    filtered = products;
  } else {
    filtered = products.filter(p => p.category === cat);
  }
  filtered.forEach(p => {
    const col = document.createElement('div');
    col.className = 'col-md-3 col-sm-6';
    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <a href="product.html?id=${p.id}" class="product-link">
          <img src="${p.image}" class="card-img-top" alt="${p.name}">
        </a>
        <div class="card-body d-flex flex-column">
          <h6 class="card-title">${p.name}</h6>
          <p class="card-text mb-2">$${p.price.toFixed(2)}</p>
          <div class="mt-auto d-flex gap-2">
            <button class="btn btn-sm btn-outline-secondary" onclick="addToCart(${p.id})">Add to Cart</button>
            <a class="btn btn-sm btn-primary" href="product.html?id=${p.id}">View Details</a>
          </div>
        </div>
      </div>
    `;
    list.appendChild(col);
  });
}


// Cart state
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let appliedPromo = null;

// Render product catalog
function renderProducts() {
  const list = document.getElementById('product-list');
  list.innerHTML = '';
  products.forEach(product => {
    const col = document.createElement('div');
    col.className = 'col-md-4 col-sm-6';
    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <a href="product.html?id=${product.id}" class="product-link">
          <img src="${product.image}" class="card-img-top" alt="${product.name}">
        </a>
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text mb-2">$${product.price.toFixed(2)}</p>
          <button class="btn btn-primary mt-auto" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
      </div>
    `;
    list.appendChild(col);
  });
}

// Add product to cart
function addToCart(id) {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty += 1;
  } else {
    const product = products.find(p => p.id === id);
    cart.push({ ...product, qty: 1 });
  }
  saveCart();
  updateCartBadge();
}

// Remove product from cart
function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  renderCart();
  updateCartBadge();
}

// Update cart badge in navbar
function updateCartBadge() {
  const count = cart.reduce((sum, i) => sum + i.qty, 0);
  document.getElementById('cart-count').textContent = count;
  document.getElementById('checkout-btn').disabled = count === 0;
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Render cart modal
function renderCart() {
  const container = document.getElementById('cart-items');
  container.innerHTML = '';
  if (cart.length === 0) {
    container.innerHTML = '<p class="text-muted">Your cart is empty.</p>';
    document.getElementById('cart-subtotal').textContent = '0.00';
    document.getElementById('cart-discount').textContent = '';
    return;
  }
  let subtotal = 0;
  cart.forEach(item => {
    subtotal += item.price * item.qty;
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <img src="${item.image}" class="cart-item-img" alt="${item.name}">
      <div class="flex-grow-1">
        <h6>${item.name}</h6>
        <div>Price: $${item.price.toFixed(2)}</div>
        <div>Qty: ${item.qty}</div>
        <div>Subtotal: $${(item.price * item.qty).toFixed(2)}</div>
      </div>
      <button class="btn btn-outline-danger btn-sm" onclick="removeFromCart(${item.id})">Remove</button>
    `;
    container.appendChild(div);
  });
  let discount = 0;
  if (appliedPromo === 'SAVE10') {
    discount = subtotal * 0.10;
    document.getElementById('cart-discount').textContent = `Promo Applied: -$${discount.toFixed(2)}`;
  } else if (appliedPromo === 'SAVE20') {
    discount = subtotal * 0.20;
    document.getElementById('cart-discount').textContent = `Promo Applied: -$${discount.toFixed(2)}`;
  } else {
    document.getElementById('cart-discount').textContent = '';
  }
  document.getElementById('cart-subtotal').textContent = (subtotal - discount).toFixed(2);
}

// Promo code verification (async)
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

// Apply promo code
async function handleApplyPromo() {
  const code = document.getElementById('promo-code').value.trim().toUpperCase();
  const msg = document.getElementById('promo-message');
  msg.textContent = 'Verifying...';
  msg.className = 'text-info';
  try {
    const result = await verifyPromoCode(code);
    appliedPromo = result;
    msg.textContent = `Promo code applied: ${result}`;
    msg.className = 'text-success';
    renderCart();
  } catch (err) {
    appliedPromo = null;
    msg.textContent = err;
    msg.className = 'text-danger';
    renderCart();
  }
}

// Checkout form validation
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
  document.getElementById('checkout-success').classList.remove('d-none');
  cart = [];
  appliedPromo = null;
  saveCart();
  updateCartBadge();
  renderCart();
  setTimeout(() => {
    document.getElementById('checkout-success').classList.add('d-none');
    document.getElementById('checkout-form').reset();
    const checkoutModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('checkoutModal'));
    checkoutModal.hide();
    const cartModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('cartModal'));
    cartModal.hide();
  }, 2000);
}

// Event listeners
window.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCartBadge();
  renderCart();
  document.getElementById('apply-promo').addEventListener('click', handleApplyPromo);
  document.getElementById('checkout-form').addEventListener('submit', handleCheckout);
  // Re-render cart when cart modal is opened
  document.getElementById('cartModal').addEventListener('show.bs.modal', renderCart);
});

// Expose for inline onclick
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;

/* ----------------- Product Detail Page Logic ----------------- */
// Helper: get query param
function getQueryParam(key) {
  return new URLSearchParams(window.location.search).get(key);
}

// Render product detail if on product.html
function renderProductDetail() {
  const id = parseInt(getQueryParam('id'), 10);
  if (!id) return;
  const product = products.find(p => p.id === id);
  if (!product) return;

  const container = document.getElementById('product-detail');
  container.innerHTML = `
    <div class="col-md-6">
      <img id="main-img" src="${product.image}" class="product-main-img img-fluid shadow-sm" alt="${product.name}">
      <div class="d-flex mt-3 product-gallery">
        <img src="${product.image}" class="product-thumb" alt="thumb1">
        <img src="${product.image}" class="product-thumb" alt="thumb2">
        <img src="${product.image}" class="product-thumb" alt="thumb3">
      </div>
    </div>
    <div class="col-md-6">
      <h2>${product.name}</h2>
      <p class="text-muted">A premium gadget for modern life. Sleek design, powerful performance, and great battery life.</p>
      <h3 class="text-primary">$${product.price.toFixed(2)}</h3>

      <div class="mb-3">
        <h5>Offers & Discounts</h5>
        <ul>
          <li>Use SAVE10 for 10% off (sitewide)</li>
          <li>Bank offer: 5% cashback with cards</li>
        </ul>
      </div>

      <div class="mb-3">
        <label for="pincode" class="form-label">Check Delivery</label>
        <div class="input-group">
          <input id="pincode" class="form-control" placeholder="Enter pincode">
          <button id="check-pincode" class="btn btn-outline-secondary">Check</button>
        </div>
        <div id="pincode-result" class="mt-2 text-muted"></div>
      </div>

      <div class="mb-3">
        <h6>Warranty & Service</h6>
        <p class="mb-0 text-muted">1 year manufacturer warranty. Free pickup & drop service within warranty period in select cities.</p>
      </div>

      <div class="d-flex gap-2 mb-3">
        <button class="btn btn-primary" id="detail-add">Add to Cart</button>
        <button class="btn btn-success" id="detail-buy">Buy Now</button>
      </div>

      <div class="product-specs">
        <h5>Highlights</h5>
        <dl>
          <dt>Battery</dt><dd>Up to 24 hours</dd>
          <dt>Connectivity</dt><dd>Bluetooth 5.2, Wi-Fi</dd>
          <dt>Colors</dt><dd>Black, Silver</dd>
        </dl>
      </div>
    </div>
  `;

  document.getElementById('detail-add').addEventListener('click', () => {
    addToCart(product.id);
    const badge = document.getElementById('cart-count');
    if (badge) badge.classList.add('bg-success');
    setTimeout(() => badge && badge.classList.remove('bg-success'), 600);
  });

  // Neon pulse on main image briefly
  const mainImg = document.getElementById('main-img');
  if (mainImg) {
    mainImg.classList.add('pulse');
    setTimeout(() => mainImg.classList.remove('pulse'), 2200);
  }

  // Thumbnail clicks update main image and pulse
  container.querySelectorAll('.product-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      mainImg.src = thumb.src;
      mainImg.classList.add('pulse');
      setTimeout(() => mainImg.classList.remove('pulse'), 1400);
    });
  });

  document.getElementById('check-pincode').addEventListener('click', () => {
    const p = document.getElementById('pincode').value.trim();
    const res = document.getElementById('pincode-result');
    if (!p || !/^\d{6}$/.test(p)) {
      res.textContent = 'Please enter a valid 6-digit pincode.';
      res.className = 'text-danger';
      return;
    }
    res.className = 'text-info';
    res.textContent = 'Checking delivery...';
    // Simulate async check
    setTimeout(() => {
      res.className = 'text-success';
      res.textContent = `Delivery available to ${p} within 3-5 business days.`;
    }, 1000);
  });

  document.getElementById('detail-buy').addEventListener('click', () => {
    // Create order skeleton and open checkout modal - do NOT show invoice here
    const order = createOrder(product);
    sessionStorage.setItem('lastOrder', JSON.stringify(order));
    const checkoutModal = new bootstrap.Modal(document.getElementById('checkoutModalDetail'));
    checkoutModal.show();
  });
}

// Create an order object and clear cart if buy now
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

// Generate PDF invoice using jsPDF
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

// If on product page, render detail
document.addEventListener('DOMContentLoaded', () => {
  renderProductDetail();
  // Hook invoice download button if present
  const dl = document.getElementById('download-invoice');
  if (dl) {
    dl.addEventListener('click', () => {
      const order = JSON.parse(sessionStorage.getItem('lastOrder'));
      if (order) generateInvoicePDF(order);
    });
  }
  // Navbar scroll shrink
  const nav = document.getElementById('mainNav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
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
          const title = col.querySelector('.card-title').textContent.toLowerCase();
          col.style.display = title.includes(q) ? '' : 'none';
        });
      });
    }
  }

  // Checkout form on detail page
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
      if (!name || !address || !phone || !email) {
        alert('Please fill required fields.');
        return;
      }
      const order = JSON.parse(sessionStorage.getItem('lastOrder')) || {};
      // augment order with customer details and payment mode
      order.billing = { name, address, phone, email };
      order.shipping = order.billing;
      order.payment = 'Cash on Delivery';
      order.promo = promo || null;
      sessionStorage.setItem('lastOrder', JSON.stringify(order));
      // show success message and invoice modal
      const msg = document.getElementById('checkout-message');
      if (msg) {
        msg.classList.remove('d-none');
        msg.textContent = '✅ Order Placed Successfully! Thank you for shopping with SHOPLINE.';
      }
      const checkoutModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('checkoutModalDetail'));
      checkoutModal.hide();
      const invModal = new bootstrap.Modal(document.getElementById('invoiceModal'));
      invModal.show();
      // If auto-download requested, immediately generate and download invoice
      if (auto) {
        setTimeout(() => {
          const saved = JSON.parse(sessionStorage.getItem('lastOrder'));
          if (saved) generateInvoicePDF(saved);
        }, 500);
      }
    });
  }

  // When checkout modal is shown, populate summary from lastOrder
  const checkoutModalEl = document.getElementById('checkoutModalDetail');
  if (checkoutModalEl) {
    checkoutModalEl.addEventListener('show.bs.modal', () => {
      const order = JSON.parse(sessionStorage.getItem('lastOrder')) || {};
      const itemPrice = (order.product && order.product.price) ? order.product.price : 0;
      document.getElementById('summary-item').textContent = `$${itemPrice.toFixed(2)}`;
      const tax = +(itemPrice * 0.18).toFixed(2);
      document.getElementById('summary-tax').textContent = `$${tax.toFixed(2)}`;
      document.getElementById('summary-discount').textContent = '-$0.00';
      document.getElementById('summary-total').textContent = `$${(itemPrice + tax).toFixed(2)}`;
      // clear promo messages
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
      const itemPrice = (order.product && order.product.price) ? order.product.price : 0;
      const tax = +(itemPrice * 0.18).toFixed(2);
      if (!code) {
        if (msg) { msg.textContent = 'Enter a promo code'; msg.className = 'text-danger'; }
        return;
      }
      // reuse verifyPromoCode
      msg.textContent = 'Verifying...'; msg.className = 'text-info';
      try {
        const result = await verifyPromoCode(code);
        let discount = 0;
        if (result === 'SAVE10') discount = +(itemPrice * 0.10).toFixed(2);
        if (result === 'SAVE20') discount = +(itemPrice * 0.20).toFixed(2);
        document.getElementById('summary-discount').textContent = `-$${discount.toFixed(2)}`;
        document.getElementById('summary-total').textContent = `$${(itemPrice + tax - discount).toFixed(2)}`;
        if (msg) { msg.textContent = `Promo applied: ${result}`; msg.className = 'text-success'; }
        // save promo into order
        order.promo = result;
        order.discount = discount;
        order.tax = tax;
        order.total = +(itemPrice + tax - discount).toFixed(2);
        sessionStorage.setItem('lastOrder', JSON.stringify(order));
      } catch (err) {
        if (msg) { msg.textContent = err; msg.className = 'text-danger'; }
        document.getElementById('summary-discount').textContent = '-$0.00';
        document.getElementById('summary-total').textContent = `$${(itemPrice + tax).toFixed(2)}`;
      }
    });
  }
});
