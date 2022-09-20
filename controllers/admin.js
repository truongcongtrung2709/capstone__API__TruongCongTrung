getProducts();

function getProducts() {
  apiGetProduct()
    .then((response) => {
      console.log("API products:", response.data);
      let products = response.data.map((product) => {
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

// ==========================================================================================
function addProduct(product) {
  apiAddProduct(product)
    .then(() => {
      getProducts();
    })
    .catch((error) => {
      console.log(error);
    });
}
function deleteProduct(productId) {
  apiDeleteProduct(productId)
    .then(() => {
      getProducts();
    })
    .catch((error) => {
      console.log(error);
    });
}
function updateProduct(productId, product) {
  apiUpdateProduct(productId, product)
    .then(() => {
      getProducts();
    })
    .catch((error) => {
      console.log(error);
    });
}
function display(products) {
  let output = products.reduce((result, product, index) => {
    return (
      result +
      `
      <tr>
        <td>${index + 1}</td>
        <td>${product.name}</td>
        <td>$${product.price}</td>
        <td>
          <img src="${product.img}" width="50px" height="50px" />
        </td>
        <td>${product.desc}</td>
        <td>${product.type}</td>
        <td>
        <button class="btn btn-success" data-id="${
          product.id
        }" data-type="edit" data-toggle="modal" data-target="#myModal">Sửa</button>
        <button class="btn btn-danger" data-id="${
          product.id
        }" data-type="delete">Xóa</button>
        </td>
      </tr>
    `
    );
  }, "");

  dom("#tblDanhSachSP").innerHTML = output;
}

function dom(selector) {
  return document.querySelector(selector);
}
function resetForm() {
  dom("#name").value = "";
  dom("#price").value = "";
  dom("#screen").value = "";
  dom("#backCamera").value = "";
  dom("#frontCamera").value = "";
  dom("#img").value = "";
  dom("#desc").value = "";
  dom("#type").value = "";
}
//=======================DOM======================
dom("#btnThemSP").addEventListener("click", () => {
  dom(".modal-title").innerHTML = "Thêm Sản Phẩm";
  dom(".modal-footer").innerHTML = `
  <button class = "btn btn-secondary" data-dismiss="modal">Hủy</button>
  <button class = "btn btn-primary" data-type ="add">Thêm</button>
  `;
  resetForm();
});
dom(".modal-footer").addEventListener("click", (evt) => {
  let elementType = evt.target.getAttribute("data-type");

  // Dom các inputs để lấy dữ liệu data
  let id = dom("#id").value;
  let name = dom("#name").value;
  let price = dom("#price").value;
  let screen = dom("#screen").value;
  let backCamera = dom("#backCamera").value;
  let frontCamera = dom("#frontCamera").value;
  let img = dom("#img").value;
  let desc = dom("#desc").value;
  let type = dom("#type").value;
  let isValid = validateForm();
  if (!isValid) {
    return;
  }
  let product = new Product(
    null,
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type
  );
  if (elementType === "add") {
    addProduct(product);
  } else if (elementType === "update") {
    updateProduct(id, product);
    let isValid = validateForm();
    if (!isValid) {
      return;
    }
  }
});
dom("#tblSanPham").addEventListener("click", (evt) => {
  let id = evt.target.getAttribute("data-id");
  let elType = evt.target.getAttribute("data-type");
  if (elType === "delete") {
    deleteProduct(id);
  } else if (elType === "edit") {
    dom(".modal-title").innerHTML = "Cập nhật sản phẩm";
    dom(".modal-footer").innerHTML = `
    <button class = "btn btn-secondary" data-dismiss="modal">Hủy</button>
    <button class = "btn btn-primary" data-type ="update">Cập Nhật</button>
    `;
    apiGetProductById(id)
      .then((response) => {
        let product = response.data;
        dom("#id").value = product.id; // hidden input
        dom("#name").value = product.name;
        dom("#price").value = product.price;
        dom("#screen").value = product.screen;
        dom("#backCamera").value = product.backCamera;
        dom("#frontCamera").value = product.frontCamera;
        dom("#img").value = product.img;
        dom("#desc").value = product.desc;
        dom("#type").value = product.type;
      })
      .catch((error) => {
        console.log(error);
      });
  }
});
// =====================validate============================
function validateName() {
  let name = dom("#name").value;
  let spanEl = dom("#spanName");
  apiGetProduct();
  if (!name) {
    spanEl.innerHTML = "Tên không được để trống";
    return false;
  }
}
function validatePrice() {
  let price = dom("#price").value;
  let spanEl = dom("#spanPrice");
  apiGetProduct();
  if (!price) {
    spanEl.innerHTML = "Giá không được để trống";
    return false;
  } else if (price <= 0) {
    spanEl.innerHTML = "Giá không Hợp lệ";
    return false;
  }
}
function validateScreen() {
  let screen = dom("#screen").value;
  let spanEl = dom("#spanScreen");
  apiGetProduct();
  if (!screen) {
    spanEl.innerHTML = "Màn hình không được để trống";
    return false;
  }
}
function validateBCamera() {
  let backCamera = dom("#backCamera").value;
  let spanEl = dom("#spanBackCamera");
  apiGetProduct();
  if (!backCamera) {
    spanEl.innerHTML = "Camera không được để trống";
    return false;
  }
}
function validateFCamera() {
  let frontCamera = dom("#frontCamera").value;
  let spanEl = dom("#spanFrontCamera");
  apiGetProduct();
  if (!frontCamera) {
    spanEl.innerHTML = "Camera không được để trống";
    return false;
  }
}
function validateImage() {
  let img = dom("#img").value;
  let spanEl = dom("#spanImg");
  apiGetProduct();
  if (!img) {
    spanEl.innerHTML = "Hình ảnh không được để trống";
    return false;
  }
}
function validateDesc() {
  let desc = dom("#desc").value;
  let spanEl = dom("#spanDesc");
  apiGetProduct();
  if (!desc) {
    spanEl.innerHTML = "Mô tả không được để trống";
    return false;
  }
}
function validateType() {
  let type = dom("#type").value;
  let spanEl = dom("#spanType");
  apiGetProduct();
  if (!type) {
    spanEl.innerHTML = "Mô tả không được để trống";
    return false;
  }
}
function validateForm() {
  let isValid = true;
  isValid =
    validateName() &
    validatePrice() &
    validateScreen() &
    validateBCamera() &
    validateFCamera() &
    validateImage() &
    validateDesc() &
    validateType();
  if (!isValid) {
    alert("Form không hợp lý");
    return false;
  }
  return true;
}
