let label = dom("#label");
let shoppingCart = dom("#shopping-cart");
let products = [];
let cart = JSON.parse(localStorage.getItem("data")) || [];
function calcCart() {
  let cartTotal = dom("#cart-amount");
  cartTotal.innerHTML = cart
    .map((cart) => cart.item)
    .reduce((a, b) => a + b, 0);
}
calcCart();

function getProducts() {
  apiGetProduct()
    .then((response) => {
      console.log("API products:", response.data);
      products = response.data.map((product) => {
        return new Product(
          +product.id,
          product.name,
          product.price,
          product.screen,
          product.backCamera,
          product.frontCamera,
          product.img,
          product.desc,
          product.type
        );
      });
      displayCartProducts();
      totalAmount();
    })
    .catch((error) => {
      console.log(error);
    });
}
getProducts();
function displayCartProducts() {
  if (cart.length !== 0) {
    return (shoppingCart.innerHTML = cart.map((productCart) => {
      let { id, item } = productCart;
      let search = products.find((product) => product.id === id) || [];
      return `     
      <div class="cart-item row">
  <div class="card-left col-6">
    <img width="100px" src="${search.img}" alt="" />
  </div>
  <div class="card-right">
    <div class="title-price-x">
      <h4 class="title-price">
        <p>${search.name}</p>
        <p class="cart-item-price">$${search.price}</p>
      </h4>
      <i onclick="removeItem(${id})" class="fa-thin fa-x"></i>
    </div>
    <div class="buttons-total">
      <div class="buttons" id="btn-add">
        <i onclick="decrementCart(${id})" class="fa-solid fa-angle-left" data-type="subtract"></i>
        <div id=${id} class="quantity">${item}</div>
        <i onclick="incrementCart(${id})" class="fa-solid fa-angle-right" data-type="add"></i>
      </div>
      <h3>$${item * search.price}</h3>
    </div>
  </div>
</div>
      `;
    }));
  } else {
    shoppingCart.innerHTML = ``;
    label.innerHTML = `
    <h2 class="text-center text-white">Cart is empty</h2>
    <a href="index.html">
    <button class="HomeBtn text-center btn-success">Return to Home</button>
    </a>
    `;
  }
}
//=================================================
function dom(selector) {
  return document.querySelector(selector);
}
function decrementCart(id) {
  let selectedItem = id;
  let search = cart.find((item) => item.id === selectedItem);
  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  updateCart(selectedItem);
  cart = cart.filter((product) => product.item !== 0);
  displayCartProducts();
  localStorage.setItem("data", JSON.stringify(cart));
}

function incrementCart(id) {
  let selectedItem = id;
  let search = cart.find((item) => item.id === selectedItem);
  if (search === undefined) {
    cart.push({
      id: selectedItem,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  displayCartProducts();
  updateCart(selectedItem);
  localStorage.setItem("data", JSON.stringify(cart));
}
function updateCart(id) {
  let search = cart.find((item) => item.id === id);
  document.getElementById(id).innerHTML = search.item;
  calcCart();
  totalAmount();
}
function removeItem(id) {
  let selectedItem = id;
  cart = cart.filter((x) => x.id !== selectedItem);
  displayCartProducts();
  calcCart();
  totalAmount();

  localStorage.setItem("data", JSON.stringify(cart));
}
function clearCart() {
  cart = [];
  displayCartProducts();
  calcCart();
  localStorage.setItem("data", JSON.stringify(cart));
}
function pay() {
  cart = [];
  displayCartProducts();
  calcCart();
  localStorage.setItem("data", JSON.stringify(cart));
  alert("Bạn đã thanh toán thành công");
}
function totalAmount() {
  if (cart.length !== 0) {
    let amount = cart
      .map((productCart) => {
        let { id, item } = productCart;
        let search = products.find((product) => product.id === id) || [];
        return item * search.price;
      })
      .reduce((sum, item) => sum + item, 0);
    label.innerHTML = `
      <h2>Total bill: $${amount}</h2>
      <button onclick="pay()" class="btn btn-success">Pay</button>
      <button onclick="clearCart()" class="btn btn-danger">Clear Cart</button>
      `;
  } else {
    return;
  }
}
