# SHOPLINE — Evaluation Guide

This document helps you explain the ShopLine project to your professor. It summarizes the architecture, core files, data flow (cart → checkout), key code snippets, front-end concepts used (HTML/CSS/JS), common questions you may be asked, and how to demo the app.

## Quick overview
- Purpose: A small client-side e-commerce demo showing product catalog, cart modal, checkout flow and invoice download (pdf).
- Tech: Plain HTML, CSS, vanilla JavaScript, Bootstrap 5, jsPDF for invoice generation.
- Storage: `localStorage` for cart persistence, `sessionStorage` for single-order details.

## Project structure (important files)
- `html/index.html` — Home page, product catalog, cart modal and cart-based checkout modal.
- `html/product.html` — Product detail page with "Buy Now" (checkout for single product) and add-to-cart.
- `css/` — styles (global, navbar, modal, product components).
- `js/products.js` — Product data, rendering catalog and product detail, helpers like `renderProducts()` and `renderProductDetail()`.
- `js/cart.js` — Cart state (in-memory + localStorage), rendering the cart modal, quantity controls, subtotal & promo UI.
- `js/promo.js` — Promo verification (simulated) and handler to apply promo to cart.
- `js/main.js` — App wiring: event listeners, hooking checkout modal show events, promo apply in checkout, invoice download wiring.
- `js/checkout.js` — Checkout form submission helper and PDF order creation helpers (used for invoice generation in product checkout flow).

## Data shapes and storage
- Product object (from `products.js`) — { id: number, name: string, price: number, image: string, category: string }
- Cart item — product object extended with `qty` (number). The cart is stored as an array in `localStorage` under key `cart`.
- Order (for buy-now flow) — created by `createOrder(product)` and stored to `sessionStorage` under `lastOrder` for the product-checkout flow.

Examples:
```
// Cart (localStorage)
[ { id: 1, name: 'Wireless Headphones', price: 99.99, image: '...', category: 'Electronics', qty: 2 }, ... ]

// Order (sessionStorage)
{
  orderId: 'ORD1616161616',
  date: '...'
  product: { name: 'Headphones', price: 99.99 },
  billing: { ... },
  shipping: { ... },
  payment: 'Credit Card',
  tax: 17.99,
  total: 117.98
}
```

## Core flows (explain step-by-step)

1) Add to cart
  - `addToCart(id)` in `js/cart.js` finds product from `products` and either increments `qty` or pushes a new item with `qty:1`.
  - `saveCart()` writes `localStorage.setItem('cart', JSON.stringify(cart))`.
  - UI: `renderCart()` repopulates the cart modal, shows per-item subtotal, and updates the cart badge.

2) Change quantity in cart
  - The +/- buttons in the cart modal call handlers that update the in-memory `cart` and call `saveCart()` + `renderCart()`.
  - This ensures localStorage and UI reflect current quantities immediately.

3) Checkout (two cases)
  - Product-detail checkout (Buy Now): When user clicks `Buy Now`, `createOrder(product)` builds an order and stores it in `sessionStorage.lastOrder`, then opens `checkoutModalDetail`. `js/main.js` reads `lastOrder` and populates the checkout summary.
  - Cart checkout (Cart modal -> Checkout): When user clicks Checkout in the cart modal, `checkoutModal` is opened. `js/main.js` listens for `show.bs.modal` and computes subtotal.

Important note (bug & fix):
- Original bug: the cart-based checkout summary sometimes showed stale totals after increasing quantity because the checkout code read an in-memory `cart` variable that could be out-of-sync. I updated `js/main.js` so the checkout compute logic reads the cart fresh from `localStorage` (and coerces quantities/prices to Number) — this ensures accurate totals.

4) Promo application
  - In the cart modal, `handleApplyPromo()` reads the promo input and uses `verifyPromoCode(code)` (simulated async) to either set `appliedPromo` to `SAVE10`/`SAVE20` or reject.
  - `renderCart()` computes discount based on `appliedPromo` and updates `#cart-discount` and `#cart-subtotal`.
  - Checkout modal promo: `apply-checkout-promo` in `js/main.js` also re-computes item price (now reading localStorage) and applies the discount, updating `summary-discount` and `summary-total`. This was also updated to use localStorage so promo values match the cart.

5) Place order and invoice
  - Checkout form submission triggers `handleCheckout`/`createOrder` which may clear the cart, show a success message and optionally generate a PDF invoice using jsPDF.

## Key code pointers (what to show the professor)
- Cart saving and rendering (cart.js): show `addToCart`, `saveCart`, `renderCart`, and how + and - buttons update qty and call `saveCart()`.
- Promo verification (promo.js): `verifyPromoCode` (simulated Promise), `handleApplyPromo` and how `appliedPromo` affects subtotal.
- Checkout summary wiring (main.js): `checkoutModal` show handler — demonstrates DOM events, reading from storage, computing tax/discount, and updating modal elements.
- Product detail and buy-now (products.js): `renderProductDetail`, `detail-buy` handler which calls `createOrder()` and uses `sessionStorage`.
- Invoice generation (`js/checkout.js`): `generateInvoicePDF(order)` showing usage of jsPDF to create a downloadable PDF.

## Front-end concepts used (and brief explanations)
- DOM manipulation: creating nodes with `document.createElement`, `.innerHTML`, and event listeners.
- Event delegation: the cart modal uses event listeners attached at container-level for + / - buttons.
- Browser storage: `localStorage` (persistent cart) and `sessionStorage` (single-order details). Explain differences (lifetime, scope).
- Asynchronous JS: `Promise`, `async/await` for `verifyPromoCode` (simulated delay to mimic server verification).
- Templating: simple string template literals for injecting product cards and cart rows.
- Third-party libs: Bootstrap for UI components and modals; jsPDF to generate invoice PDFs client-side.
- Accessibility basics: modal aria attributes, form required fields, and semantic markup where present.

## Likely professor questions and suggested answers
- Q: How is cart state persisted across reloads?
  - A: We store the cart as JSON in `localStorage` under the `cart` key. On page load, code reads `JSON.parse(localStorage.getItem('cart')) || []` to initialize the in-memory cart.

- Q: How do you ensure the checkout total is accurate after changing quantities?
  - A: We compute subtotal by reading the up-to-date cart from `localStorage` and summing `price * qty` for each item. Previously code read an in-memory variable that could be stale; I updated the checkout handler to read localStorage and coerce types so totals are accurate.

- Q: How are promo codes implemented? Are they validated securely?
  - A: For this demo, promo validation is simulated in `js/promo.js` by `verifyPromoCode(code)` which resolves for `SAVE10`/`SAVE20` and rejects otherwise (with a delay to mimic a network call). In a real app, validation would happen server-side and the server would return a discount amount or error.

- Q: How is the invoice PDF generated?
  - A: Using jsPDF library. `generateInvoicePDF(order)` composes text lines and calls `doc.save(fileName)` to prompt download.

- Q: Why both `localStorage` and `sessionStorage`?
  - A: `localStorage` keeps the cart persistent across sessions until cleared — good for cart persistence. `sessionStorage` is used for a single order object (`lastOrder`) used immediately during the product-detail buy flow and wiped when the tab is closed.

- Q: What are edge cases you handled (or would handle)?
  - A: Handled empty cart, disabled checkout button when cart is empty, validated checkout form fields, and sanitized/validated promo input. Missing: robust error handling for storage failures (e.g., quotas) and race conditions if multiple tabs modify the cart simultaneously.

## Demo script (what to show during evaluation)
1. Home page: show product grid and the cart badge updating when adding items.
2. Add a product twice, open cart, increase quantity, show subtotal updates.
3. Click Checkout from cart — show that Item Price, Tax, and Total update correctly (explain fix to professor: reading from localStorage).
4. Apply promo code `SAVE10` and show discount applied in cart modal and in checkout summary.
5. Go to a product detail and click "Buy Now" — show product-checkout dialog populated from `sessionStorage.lastOrder`, then generate invoice PDF.

## Manual verification steps (quick checklist)
- [ ] Add item(s) to cart; confirm `localStorage.cart` contains correct items and `qty`.
- [ ] Increase/decrease qty; confirm `localStorage.cart` updated and cart subtotal in modal updates.
- [ ] Open Cart -> Checkout: confirm summary reads the correct subtotal & tax.
- [ ] Apply promo codes `SAVE10` / `SAVE20` and confirm discount and totals update.
- [ ] On product page, click Buy Now: confirm the product checkout modal shows the product price and the generated invoice has correct values.

## Notes for answering deeper JS/HTML/CSS questions
- Be ready to explain event propagation and how `show.bs.modal` is a Bootstrap-triggered DOM event. Explain how you attach listeners in `DOMContentLoaded` to ensure elements exist.
- Be ready to explain JSON serialization (`JSON.stringify`/`JSON.parse`) and why coercion (`Number(...)`) is necessary when reading values from storage (they might be strings).
- CSS: point to modular CSS files (navbar, modal, product) and explain how Bootstrap classes are used for layout and quick responsive design.
