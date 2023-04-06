let products = [
  {
    name: "Lavender candle",
    price: 15.99,
    imageUrl: "/Users/yash/Documents/GitHub/merkaba/assets/Reva-304'22(2)-LR002.jpg"
  },
  {
    name: "Vanilla candle",
    price: 12.99,
    imageUrl: "https://example.com/vanilla-candle.jpg"
  },
  {
    name: "Sandalwood candle",
    price: 18.99,
    imageUrl: "https://example.com/sandalwood-candle.jpg"
  },
  {
    name: "Jasmine candle",
    price: 14.99,
    imageUrl: "https://example.com/jasmine-candle.jpg"
  },
  {
    name: "yaes candle",
    price: 14.99,
    imageUrl: "https://example.com/jasmine-candle.jpg"
  }
];

function renderProduct(product) {
  let productCard = document.createElement("div");
  productCard.classList.add("product-card");
  productCard.innerHTML = `
    <img src="${product.imageUrl}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p>${product.price}</p>
    <button>Add to cart</button>
  `;
  document.getElementById("product-list").appendChild(productCard);
}

function renderProducts(products) {
  document.getElementById("product-list").innerHTML = "";
  products.forEach(product => {
    renderProduct(product);
  });
}

function sortProducts() {
  products.sort((a, b) => a.price - b.price);
  renderProducts(products);
}

function showAddProductForm() {
  document.getElementById("add-product-form").style.display = "block";
}

function addProduct(event) {
  event.preventDefault();
  let name = document.getElementById("name").value;
  let price = parseFloat(document.getElementById("price").value);
  let product = {
    name: name,
    price: price,
    imageUrl: "https://example.com/default-product-image.jpg"
  };
  products.push(product);
  renderProduct(product);
  document.getElementById("add-product-form").style.display = "none";
}
