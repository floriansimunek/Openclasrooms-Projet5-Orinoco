const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get('product_id');

let product = new Product();
let cart = new Cart(product);

/*
fetch('http://localhost:3000/api/teddies')
.then(response => {
    if(response.ok){
        response.json().then(data => {
            Test.products = data;

            let products = [];
            for(let i = 0; i < data.length; i++){
                products[i] = new Product(data[i].colors, data[i]._id, data[i].name, data[i].price, data[i].imageUrl, data[i].description);
                products[i].displayCard();

                if(products[i]._id == productId){
                    products[i].displayProduct();
                    
                    document.head.innerHTML += '<title>'+ products[i].name + ' - Orinoco</title>';
                    if(document.getElementById('product_colors') != null){
                        let productColors = document.getElementById('product_colors');

                        for(let y = 0; y < products[i].colors.length; y++){
                            productColors.innerHTML +=  '</label>'
                                                            +'<label class="js-check btn btn-check">'
                                                            +'<input type="radio" name="option_size" value="'+ "option"+ y +'">'
                                                            +'<span> ' + products[i].colors[y] +'</span>'
                                                        +'</label>';
                        }
                    }

                if(document.getElementById('btn_cart') != null){
                        let btnCart = document.getElementById('btn_cart');
                        btnCart.addEventListener('click', function(e){
                            localStorage.setItem(products[i].name, products[i]._id);
                        });
                    }
                }
                
                if(document.getElementById('display-cart') != null){
                    let cart = new Cart(products[i]);
                    cart.viewInCart();

                    if(localStorage.length === 0){
                        cart.emptyCart();
                    }

                    const x = products.filter(p => p.name == products[i].name);
                    if(localStorage.getItem(products[i].name) === products[i]._id){
                        console.log(x[0]._id);
                    }

                    if(document.getElementById('btn_deleteProduct_'+ x[0]._id +'') != null && localStorage.getItem(products[i].name) === x[0]._id){
                        let btnSupprProduct = document.getElementById('btn_deleteProduct_'+ x[0]._id +'');
                        btnSupprProduct.addEventListener('click', function(e){
                            e.preventDefault();
                            if(x[0]._id === localStorage.getItem(products[i].name) && x[0]._id === products[i]._id){
                                cart.supprInCart();
                                //localStorage.removeItem(products[i].name);
                            }
                        })
                    }
                }
            }
        });
    }else{
        console.log("ERREUR");
    }
}) */