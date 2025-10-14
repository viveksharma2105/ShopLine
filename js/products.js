// Product catalog data (copied from original script.js)
const products = [];
let pid = 1;
function addProduct(name, price, image, category) {
  products.push({ id: pid++, name, price, image, category });
}

// Helper: generate image URLs from Unsplash with query
function unsplash(query, w = 500) {
  return `https://images.unsplash.com/photo-` + encodeURIComponent(query) + `?auto=format&fit=crop&w=${w}&q=80`;
}

// Pre-populate product lists (Electronics, Fashion, Furniture, SkinCare)
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
  ['Futon', 219.99, 'photo-1567538096630-e0c55bd6374c'],
  ['Bean Bag', 49.99, 'photo-1701854957177-99ec55ad574e'],
  ['Loveseat', 399.99, 'photo-1595436790404-ae5494edcf00'],
  ['Cabinet', 159.99, 'photo-1661830402547-fbaf3fb6d40a']
];

const skinCare = [
  ['Hyaluronic Mask', 29.99, 'photo-1743926959711-73960c2a7b4e'],
  ['Vitamin C Brightening Cream', 24.99, 'photo-1556228720-195a672e8a03'],
  ['Aloe Vera Moisturizer', 19.99, 'photo-1748390359572-8e7a47bf5cb5'],
  ['Anti-Aging Night Cream', 39.99, 'photo-1742033193400-45dab682c989'],
  ['SPF 50 Sunscreen Lotion', 22.99, 'photo-1698912269897-c9325da81afc'],
  ['Moisturizing Shampoo', 18.99, 'photo-1747098393451-6b985f62a2c2'],
  ['Fabric-Shine Spray', 14.99, 'photo-1749394043410-7acc39b5fbea'],
  ['Rose Water Toner', 16.99, 'photo-1630422528609-e2f076a2ef37'],
  ['Green Tea Face Mask', 12.99, 'photo-1681376657924-cad3ce49a9a2'],
  ['Hydratic Tonic', 17.99, 'photo-1700709678003-01941f72fb92'],
  ['Sephora Eye Cream', 27.99, 'photo-1656147961292-a3fd00ac95ac'],
  ['Coconut Hair Oil', 15.99, 'photo-1690228987673-f6e104fa653c'],
  ['Vitamin C Serum', 34.99, 'photo-1618120508902-c8d05e7985ee'],
  ['Lip Mask', 13.99, 'photo-1731287035690-9a26bda17b74'],
  ['Turmeric Face Wash', 21.99, 'photo-1564594218151-a67498fb2922'],
  ['Body Lotion', 32.99, 'photo-1632221522866-bf40bad1db53'],
  ['Hair Shampoo', 14.49, 'photo-1660090455998-1395e8298f62'],
  ['Acne Treatment lotion', 9.99, 'photo-1630398917451-1a409990fbc5'],
  ['Hand Wash Bottle', 8.99, 'photo-1705155726507-8e1b9119349b'],
  ['Body soap', 19.49, 'photo-1622374297904-a5c3e8ccf780']
];


electronics.forEach(([n,p,img]) => addProduct(n,p,`https://images.unsplash.com/${img}?auto=format&fit=crop&w=600&q=80`,'Electronics'));
fashion.forEach(([n,p,img]) => addProduct(n,p,`https://images.unsplash.com/${img}?auto=format&fit=crop&w=600&q=80`,'Fashion'));
furniture.forEach(([n,p,img]) => addProduct(n,p,`https://images.unsplash.com/${img}?auto=format&fit=crop&w=600&q=80`,'Furniture'));
skinCare.forEach(([n,p,img]) => addProduct(n,p,`https://images.unsplash.com/${img}?auto=format&fit=crop&w=600&q=80`,'SkinCare'));


// Category filter
function filterCategory(cat) {
  const list = document.getElementById('product-list');
  if (!list) return;
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

// Render product catalog (used on homepage)
function renderProducts() {
  const list = document.getElementById('product-list');
  if (!list) return;
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
  if (!container) return;
  container.innerHTML = `
    <div class="col-md-6">
      <img id="main-img" src="${product.image}" class="product-main-img img-fluid shadow-sm" alt="${product.name}">
      
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

  const detailAdd = document.getElementById('detail-add');
  if (detailAdd) {
    detailAdd.addEventListener('click', () => {
      addToCart(product.id);
      const badge = document.getElementById('cart-count');
      if (badge) badge.classList.add('bg-success');
      setTimeout(() => badge && badge.classList.remove('bg-success'), 600);
    });
  }

  // Neon pulse on main image briefly
  const mainImg = document.getElementById('main-img');
  if (mainImg) {
    mainImg.classList.add('pulse');
    setTimeout(() => mainImg.classList.remove('pulse'), 2200);
  }

  // Check pincode
  const checkPin = document.getElementById('check-pincode');
  if (checkPin) {
    checkPin.addEventListener('click', () => {
      const p = document.getElementById('pincode').value.trim();
      const res = document.getElementById('pincode-result');
      if (!p || !/^\d{6}$/.test(p)) {
        res.textContent = 'Please enter a valid 6-digit pincode.';
        res.className = 'text-danger';
        return;
      }
      res.className = 'text-info';
      res.textContent = 'Checking delivery...';
      setTimeout(() => {
        res.className = 'text-success';
        res.textContent = `Delivery available to ${p} within 3-5 business days.`;
      }, 1000);
    });
  }

  const detailBuy = document.getElementById('detail-buy');
  if (detailBuy) {
    detailBuy.addEventListener('click', () => {
      const order = createOrder(product);
      sessionStorage.setItem('lastOrder', JSON.stringify(order));
      const checkoutModal = new bootstrap.Modal(document.getElementById('checkoutModalDetail'));
      checkoutModal.show();
    });
  }
}