function apiGetProduct() {
  return axios({
    url: "https://630a0977f8a20183f77a7c18.mockapi.io/Products",
    method: "GET",
  });
}
