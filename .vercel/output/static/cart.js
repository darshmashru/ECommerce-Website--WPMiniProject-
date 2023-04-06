let cartItems = [];

function addToCart(productName, productPrice) {
  let item = {
    name: productName,
    price: productPrice
  };
  cartItems.push(item);
  updateCart();
}

function updateCart() {
  let cart = document.querySelector('.cart-items');
  cart.innerHTML = '';
  cartItems.forEach(function(item) {
    let itemHtml = `
      <div class="cart-item">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
      </div>
    `;
    cart.innerHTML += itemHtml;
  });
}

function getTotal() {
  let total = 0;
  cartItems.forEach(function(item) {
    total += item.price;
  });
  return total;
}

function updateTotal() {
  let total = getTotal();
  let totalHtml = `
    <div class="cart-total">
      Total: $${total.toFixed(2)}
    </div>
  `;
  let cart = document.querySelector('.cart');
  cart.innerHTML += totalHtml;
}

// Usage example
addToCart('Candle 1', 10.99);
addToCart('Candle 2', 12.99);
updateTotal();
