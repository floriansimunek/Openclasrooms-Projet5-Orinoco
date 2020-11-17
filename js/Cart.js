class Cart {
    constructor() {
        this.productsInCart = JSON.parse(localStorage.getItem("productsInCart"));
        this.product;    
        this.initialize();
    }

    initialize() {
        if(localStorage.length > 0){
            for (let i = 0; i < this.productsInCart.length; i++) {
                        let ajaxResponse = new Ajax('http://localhost:3000/api/teddies/' + this.productsInCart[i][0]);

                        ajaxResponse.getResponse().then(data => {
                            cart.product = data;
                            cart.viewInCart();

                        }).then(function(){
                            cart.viewPrice();
                        }).then(function(){
                            if(localStorage.length > 0 && cart.productsInCart){
                                cart.deleteProductsInCart();  
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
                                <div class="aside col-lg-6"><img src="${cart.product.imageUrl}" class="card-img"></div>
                                <figcaption class="info">
                                    <a href="../pages/view-product.html?product_id="${cart.product._id}" class="title text-dark">${cart.product.name}</a>
                                    <p class="text-muted small" id="product_colors">Couleur: ${cart.product.colors}</p>
                                </figcaption>
                            </figure>
                            </td>
                            <td>
                                <input type="number" id="product_quantity_${cart.product._id}" min="1" max="10" value="1">
                            </td>
                            <td>
                            <div class="price-wrap"> 
                                <span id="product_price_${cart.product._id}" class="price">${cart.product.price}€</br></span>
                                <small class="text-muted">${cart.product.price}€/unité </small>
                            </div>
                            </td>
                            <td class="text-right">
                            <a href="" class="btn btn-danger" id="btn_deleteProduct_${cart.product._id}">Supprimer</a>
                            </td>
                        </tr>`;

        if(document.getElementById("display-cart") != null){
            let displayCart = document.getElementById('display-cart');
            displayCart.innerHTML += cartCode;   
        }
    }

    viewPrice(){
        let totalPrice = 0;
        if(document.getElementById("total_price") != null){
            let totalProductsPrice = document.getElementById("total_price");
            let finalProductsPrice = document.getElementById("final_price");

            if(localStorage.length > 0 && this.productsInCart){
                for(let y = 0; y < this.productsInCart.length; y++){
                    if(this.productsInCart[y][0] === product._id){
                        if(document.getElementById('product_quantity_' + this.productsInCart[y][0])){
                            let productQuantity = document.getElementById('product_quantity_' + this.productsInCart[y][0])
                            //productQuantity.value = 1;
                            productQuantity.addEventListener('change', function(e){
                                productQuantity = document.getElementById('product_quantity_' + this.productsInCart[y][0]).value;
                                productQuantity = parseInt(productQuantity);

                                /*let productPrice = document.getElementById('product_price_' + this.productsInCart[y][0]).textContent;
                                productPrice = productPrice.replace('€', '');
                                productPrice = parseInt(productPrice);    
                                
                                let totalProductPrice = productPrice * productQuantity;
                                
                                totalPrice += totalProductPrice;
                                console.log(totalPrice);

                                let priceReduction = document.getElementById("reduction_price").textContent;
                                priceReduction = priceReduction.replace('€', '').replace('-', '');

                                if(e){
                                    console.log("event")
                                }
                                console.log("coucou1");

                                if(i === (this.productsInCart.length -1)){
                                    console.log("coucou2");
                                    totalProductsPrice.innerText = totalPrice + "€";
                                    totalPrice -= priceReduction;
                                    finalProductsPrice.innerHTML = "<strong>"+ totalPrice +"€</strong>";
                                }*/

                                /*let productPrice = document.getElementById('product_price_' + this.productsInCart[y][0]).textContent;
                                productPrice = productPrice.replace('€', '');
                                productPrice = parseInt(productPrice);
                                //productPrice *= productQuantity;

                                let priceReduction = document.getElementById("reduction_price").textContent;
                                priceReduction = priceReduction.replace('€', '').replace('-', '');       
                                
                                if(y === (this.productsInCart.length -1)){
                                    totalPrice += productPrice; 
                                    totalProductsPrice.innerText = totalPrice + "€";
                                    totalPrice -= priceReduction;
                                    finalProductsPrice.innerHTML = "<strong>"+ totalPrice +"€</strong>";
                                } */
                            })
                        }
                    }
                }
            }
                                    
            let productPrice = document.getElementById('product_price_' + this.productsInCart[0][0]).textContent;
            productPrice = productPrice.replace('€', '');
            productPrice = parseInt(productPrice);
            //console.log(productPrice)

            totalPrice += productPrice;

            let priceReduction = document.getElementById("reduction_price").textContent;
            priceReduction = priceReduction.replace('€', '').replace('-', '');
                            totalProductsPrice.innerText = totalPrice + "€";
                totalPrice -= priceReduction;
                finalProductsPrice.innerHTML = "<strong>"+ totalPrice +"€</strong>";
           /* if(i === (this.productsInCart.length -1)){
                totalProductsPrice.innerText = totalPrice + "€";
                totalPrice -= priceReduction;
                finalProductsPrice.innerHTML = "<strong>"+ totalPrice +"€</strong>";
            }  */        
        }     
    }

    displayEmptyCart(){
        let emptyCart = document.getElementById('empty-cart');
        emptyCart.classList.add('d-flex', 'justify-content-center');
        emptyCart.innerHTML = '<h2 class="mt-3">Votre panier est vide</h2>';
    }

    deleteProductsInCart(){
        for(let y = 0; y < cart.productsInCart.length; y++){
            //console.log(y);
            //console.log(this.productsInCart[y][0])
            //console.log(product._id);
            
            if(cart.product._id === product._id){
                if(document.getElementById('btn_deleteProduct_' + this.productsInCart[y][0])){
                    let btnSupprProductInCart = document.getElementById('btn_deleteProduct_' + this.productsInCart[y][0]);
                    btnSupprProductInCart.addEventListener('click', function(e){
                        e.preventDefault();
                        cart.productsInCart.splice(y, 1);
                        localStorage.setItem("productsInCart", JSON.stringify(cart.productsInCart));
                        alert(`Le produit ${product.name} est supprimé de votre panier`);
                    })
                }
            }
        }

        if(document.getElementById("btn_SupprAll") != null){
                let supprAll = document.getElementById("btn_SupprAll");
                supprAll.addEventListener('click', function(e){
                    localStorage.setItem("productsInCart",'[]');
                })
        }
    }
}