class Cart {
    constructor() {
        this.productsInCart = JSON.parse(localStorage.getItem("productsInCart"));
        this.products;    
        this.initialize();
    }

    initialize() {
        if(localStorage.length > 0){
            for (let i = 0; i < this.productsInCart.length; i++) {
                        let ajaxResponse = new Ajax('http://localhost:3000/api/teddies/' + this.productsInCart[i][0]);

                        ajaxResponse.getResponse().then(data => {
                            cart.products = data;
                            cart.viewInCart();

                        }).then(function(){
                            cart.viewPrice();
                        }).then(function(){
                            let btnSupprProductInCart = document.getElementsByClassName("btn_delete");  
                            for (let y = 0; y < btnSupprProductInCart.length; y++) {
                                btnSupprProductInCart[y].addEventListener('click', function(e){
                                    e.preventDefault();
                                    let myProductId = this.getAttribute('data-id');
                                    let myProductName = this.getAttribute('data-name');

                                    cart.deleteProductInCart(myProductId, myProductName, y);
                                });
                            }
                        })
                        .catch(error => {
                            console.error(error);
                        })  
                } 
        }

        if(document.getElementById('empty-cart') && localStorage.productsInCart === '[]' || localStorage.length === 0){
            this.displayEmptyCart();
        }      
    }

    viewInCart(){
        let cartCode =  `<tr>
                            <td>
                            <figure class="itemside align-items-center">
                                <div class="aside col-lg-6"><img src="${cart.products.imageUrl}" class="card-img"></div>
                                <figcaption class="info">
                                    <a href="../pages/view-product.html?product_id="${cart.products._id}" class="title text-dark">${cart.products.name}</a>
                                    <p class="text-muted small" id="product_colors">Couleur: ${cart.products.colors}</p>
                                </figcaption>
                            </figure>
                            </td>
                            <td>
                                <input type="number" id="product_quantity_${cart.products._id}" min="1" max="10" value="1">
                            </td>
                            <td>
                            <div class="price-wrap"> 
                                <span id="product_price_${cart.products._id}" class="price">${cart.products.price}€</br></span>
                                <small class="text-muted">${cart.products.price}€/unité </small>
                            </div>
                            </td>
                            <td class="text-right">
                            <a href="" class="btn btn-danger btn_delete" data-id="${cart.products._id}" data-name="${cart.products.name}">Supprimer</a>
                            </td>
                        </tr>`;

        if(document.getElementById("display-cart") != null){
            let displayCart = document.getElementById('display-cart');
            displayCart.innerHTML += cartCode;   
        }
    }

    viewPrice(){
        let totalPrice = 0;
        if(document.getElementById("total_price") != null && document.getElementById("final_price") != null){
            let totalProductsPrice = document.getElementById("total_price");
            let finalProductsPrice = document.getElementById("final_price");

            if(localStorage.length > 0 && this.productsInCart){
                for(let y = 0; y < this.productsInCart.length; y++){
                    if(this.productsInCart[y][0] === cart.products._id && document.getElementById("product_quantity_" + this.productsInCart[y][0])){
                        let productQuantity = document.getElementById("product_quantity_" + this.productsInCart[y][0]);
                        productQuantity.addEventListener('input', function(e){
                            e.preventDefault();
                            let productPrice = cart.products.price;
                            productQuantity = document.getElementById('product_quantity_' + cart.productsInCart[y][0]).value;
                            productQuantity = parseInt(productQuantity);
                            productPrice *= productQuantity;
                            
                            let displayedProductPrice = document.getElementById('product_price_' + cart.productsInCart[y][0]);
                            displayedProductPrice.innerText = productPrice + "€";
                            displayedProductPrice = document.getElementById('product_price_' + cart.productsInCart[y][0]).textContent;
                            displayedProductPrice = displayedProductPrice.replace('€', '');
                            displayedProductPrice = parseInt(displayedProductPrice);
                            
                            totalPrice += displayedProductPrice;
                            console.log(totalPrice);


                            let priceReduction = document.getElementById("reduction_price").textContent;
                            priceReduction = priceReduction.replace('€', '').replace('-', '');
                            totalProductsPrice.innerText = totalPrice + "€";
                            totalPrice -= priceReduction;
                            finalProductsPrice.innerHTML = "<strong>"+ totalPrice +"€</strong>";
                        })
                    }
                }
            }
        }     
    }

    displayEmptyCart(){
        let emptyCart = document.getElementById('empty-cart');
        emptyCart.classList.add('d-flex', 'justify-content-center');
        emptyCart.innerHTML = '<h2 class="mt-3">Votre panier est vide</h2>';
    }

    deleteProductInCart(id, name, y){
        if(this.productsInCart[y][0] === id){
            cart.productsInCart.splice(y, 1);
            localStorage.setItem("productsInCart", JSON.stringify(cart.productsInCart));
        }
        alert(`Le produit ${name} est supprimé de votre panier`);
    }
}