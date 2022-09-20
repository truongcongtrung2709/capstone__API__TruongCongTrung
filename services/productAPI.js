function apiGetProduct() {
  return axios({
    url: "https://630a0977f8a20183f77a7c18.mockapi.io/Products",
    method: "GET",
  });
}
function apiAddProduct(product) {
  return axios({
    url: "https://630a0977f8a20183f77a7c18.mockapi.io/Products",
    method: "POST",
    data: product,
  });
}
function apiDeleteProduct(productId) {
  return axios({
    url: `https://630a0977f8a20183f77a7c18.mockapi.io/Products/${productId}`,
    method: "DELETE",
  });
}
function apiGetProductById(productId) {
  return axios({
    url: `https://630a0977f8a20183f77a7c18.mockapi.io/Products/${productId}`,
    method: "GET",
  });
}
function apiUpdateProduct(productId, product) {
  return axios({
    url: `https://630a0977f8a20183f77a7c18.mockapi.io/Products/${productId}`,
    method: "PUT",
    data: product,
  });
}
