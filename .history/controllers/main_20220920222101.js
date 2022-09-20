getProducts();
let products = [];
let cart = JSON.parse(localStorage.getItem("data")) || [];
function getProducts() {
  apiGetProduct()
    .then((response) => {
      console.log("API products:", response.data);
      products = response.data.map((product) => {
        return new Product(
          product.id,
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
      display(products);
    })
    .catch((error) => {
      console.log(error);
    });
}
//===========================================================

function display(products) {
  let output = products.reduce((result, product) => {
    let search = cart.find((item) => item.id === product.id) || [];
    return (
      result +
      `
      <div class="card">

      <div class="card-top">
      <div hidden >${product.id}</div>
      <i class="fa-brands fa-apple"></i>
      <p class="stock">in-stock</p>
      </div>

          <div class="card-body">
            <img class="img-product" src=${product.img}></img>
          </div>
          <div class="card-footer">
          <div class="name-heart">
          <h4>${product.name}</h4>
          <button class="heart">
          <i class="fas fa-heart"></i>
          </button>
          </div>
          <div class="desc-product">
          <p>${product.desc}, ${product.backCamera}, ${product.frontCamera}</p>
          </div>
          <div class="purchase">
          <p>$${product.price}</p>
          <div class="buttons" id="btn-add">
          <i onclick="decrementCart(${
            product.id
          })" class="fa-solid fa-angle-left" data-type="subtract"></i>
          <div id=${product.id} class="quantity">${
        search.item === undefined ? 0 : search.item
      }</div>
          <i onclick="incrementCart(${
            product.id
          })" class="fa-solid fa-angle-right" data-type="add"></i>
          </div>
          </div>
          </div>
        </div>
      `
    );
  }, "");

  dom("#tblproducts").innerHTML = output;
}
function dom(selector) {
  return document.querySelector(selector);
}
//=========================DOM=========================
dom("#select-type").addEventListener("change", (evt) => {
  let selectValue = evt.target.value;
  selectValue = selectValue.toLowerCase();
  if (selectValue === "iphone") {
    let searchByType = products.filter((product) => {
      return product.type.toLowerCase() === selectValue;
    });
    display(searchByType);
  } else if (selectValue === "samsung") {
    searchByType = products.filter((product) => {
      return product.type.toLowerCase() === selectValue;
    });
    display(searchByType);
  } else {
    display(products);
  }
});
//====================addCart=================
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
  updateCart(selectedItem);
  localStorage.setItem("data", JSON.stringify(cart));
}
function updateCart(id) {
  let search = cart.find((item) => item.id === id);
  document.getElementById(id).innerHTML = search.item;
  calcCart();
}
function calcCart() {
  let cartTotal = dom("#cart-amount");
  cartTotal.innerHTML = cart
    .map((cart) => cart.item)
    .reduce((a, b) => a + b, 0);
}
calcCart();
//=====================================
