const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get('product_id');

let product = new Product();
let cart = new Cart();
let order = new Order();