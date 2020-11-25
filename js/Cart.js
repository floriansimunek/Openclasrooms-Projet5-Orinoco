class Cart {
    constructor() {
        this.productsInCart = JSON.parse(localStorage.getItem("productsInCart"));
        this.products;
        this.totalPrice = 0;
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
                            let productQuantityInCart = document.getElementsByClassName("quantityInputs");
                            let productPriceInCart = document.getElementsByClassName("price");
                            for(let y = 0; y < productQuantityInCart.length; y++){
                                productQuantityInCart[y].addEventListener('input', function(e){
                                    let productPrice = productPriceInCart[y].getAttribute('data-price-price');
                                    cart.viewPrice(productQuantityInCart, productPrice, y);
                                })
                            }  
                        }).then(function(){
                            let btnSupprProductInCart = document.getElementsByClassName("btn_delete");  
                            for (let y = 0; y < btnSupprProductInCart.length; y++) {
                                btnSupprProductInCart[y].addEventListener('click', function(e){
                                    let myProductId = this.getAttribute('data-delete-id');
                                    let myProductName = this.getAttribute('data-delete-name');
                                    cart.deleteProductInCart(myProductId, myProductName, y);
                                });
                            }
                        }).then(function(){
                            if(document.getElementById("btn_purshase") != null){
                                cart.purshaseCart();
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
                                <input class="quantityInputs" type="number" id="product_quantity_${cart.products._id}" min="1" max="10" value="1">
                            </td>
                            <td>
                            <div class="price-wrap"> 
                                <span  class="price" data-price-price="${cart.products.price}" id="product_price_${cart.products._id}">${cart.products.price}€</br></span>
                                <small class="text-muted">${cart.products.price}€/unité </small>
                            </div>
                            </td>
                            <td class="text-right">
                            <a href="" class="btn btn-danger btn_delete" data-delete-id="${cart.products._id}" data-delete-name="${cart.products.name}">Supprimer</a>
                            </td>
                        </tr>`;

        if(document.getElementById("display-cart") != null){
            let displayCart = document.getElementById('display-cart');
            displayCart.innerHTML += cartCode;   
        }
    }

    viewPrice(quantity, price, y){
        /*let totalPrice = 0;
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
                            console.log(productPrice);
                        })
                    }
                }
            }
        }*/
        /*let productPriceInCart = document.getElementsByClassName("price");
        productPriceInCart = productPriceInCart[y].textContent.replace('€', '');
        console.log(productPriceInCart)

        let displayedProductPrice = document.getElementById('product_price_' + cart.productsInCart[y][0]);
        console.log(displayedProductPrice)
        
        displayedProductPrice.innerText = JSON.stringify(productPriceInCart * quantity[y].value);*/
        
        if(document.getElementById("total_price") != null && document.getElementById("final_price") != null){
            
            let totalProductsPrice = document.getElementById("total_price");
            let finalProductsPrice = document.getElementById("final_price");

            let productPrice = price * quantity[y].value;
            this.totalPrice += productPrice;
            
            let displayedProductPrice = document.getElementById('product_price_' + this.productsInCart[y][0]);
            displayedProductPrice.innerText = JSON.stringify(productPrice) + "€";  
            console.log(this.totalPrice);
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

    ////////////////////////////////////////ORDER///////////////////////////////////////////////////
    purshaseCart(){
        let btnPurshase = document.getElementById("btn_purshase");
        btnPurshase.addEventListener('click', function(e){
            //e.preventDefault();
            let formInputs = document.getElementsByClassName("contact-input");
            for(let i = 0; i < formInputs.length; i++){
                //localStorage.setItem(formInputs[i].name, formInputs[i].value);
                let contactInputsValues = formInputs[i].value;
                console.log(contactInputsValues)
            }
        })
    }
}