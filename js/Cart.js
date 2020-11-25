class Cart {
    //Constructor de la class qui nous permet de récupérer les produits dans le panier (localStorage)
    constructor() {
        this.productsInCart = JSON.parse(localStorage.getItem("productsInCart"));
        this.products;
        this.totalPrice = 0;
        this.initialize();
    }

    //Méthode initialize() qui se "lance" à la déclaration de la class Cart (let cart = new Cart())
    initialize() {
        if(localStorage.length > 0){
            for (let i = 0; i < this.productsInCart.length; i++) {
                        //Appel de la class Ajax qui permet de fetch() les informations de chaque "teddy" présent dans le panier depuis l'API
                        let ajaxResponse = new Ajax('http://localhost:3000/api/teddies/' + this.productsInCart[i][0]);

                        //Méthode getResponse() qui permet de récuperer les datas des teddies du panier
                        ajaxResponse.getResponse().then(data => {
                            cart.products = data;
                            cart.viewInCart(i);

                        }).then(function(){
                            //Partie qui nous permet d'afficher le prix des produits présent dans le panier après avoir afficher ces derniers
                            let productQuantityInCart = document.getElementsByClassName("quantityInputs");
                            let productPriceInCart = document.getElementsByClassName("price");
                            //On boucle sur le nombre de produits dans le panier pour afficher les prix de tous les produits présents dans le panier uniquement
                            for(let y = 0; y < productQuantityInCart.length; y++){
                                let productPrice = productPriceInCart[y].getAttribute('data-price-price');
                                cart.modifyPrice(productQuantityInCart, productPrice, y);
                                productQuantityInCart[y].addEventListener('input', function(e){
                                })
                            }  
                        }).then(function(){
                            //Partie qui nous permet de supprimer un élément du panier depuis le button correspondant
                            let btnSupprProductInCart = document.getElementsByClassName("btn_delete");
                            for (let y = 0; y < btnSupprProductInCart.length; y++) {
                                btnSupprProductInCart[y].addEventListener('click', function(e){
                                    let myProductId = this.getAttribute('data-delete-id');
                                    let myProductName = this.getAttribute('data-delete-name');
                                    cart.deleteProductInCart(myProductId, myProductName, y);
                                });
                            }
                        })
                        .catch(error => {
                            //Récupération des messages d'erreurs en cas de problèmes(s)
                            console.error(error);
                        })  
            } 
        }

        //On signale à l'utilisateur, par un message, que son panier est vide si le localStorage est vide
        if(document.getElementById('empty-cart') && localStorage.productsInCart === '[]' || localStorage.length === 0){
            this.displayEmptyCart();
        }      
    }

    //Méthode qui nous permet d'afficher chaque produit présent dans le panier
    viewInCart(i){
        //Code HTML permettant d'afficher chaque produit individuellement avec Bootstrap
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
                                <input class="quantityInputs" type="number" id="product_quantity_${cart.products._id}" min="1" max="10" value="${cart.productsInCart[i][1]}">
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

        //On affiche les produits présent dans le panier seulement sur la page dédiée
        if(document.getElementById("display-cart") != null){
            let displayCart = document.getElementById('display-cart');
            displayCart.innerHTML += cartCode;   
        }
    }

    //Méthode qui permet d'afficher le prix des produits à l'unité et d'afficher le prix final du panier
    /*viewPrice(quantity, price, y){
        if(document.getElementById("total_price") != null && document.getElementById("final_price") != null){
            let productPrice = price * quantity[y].value;
            console.log(productPrice);
        }
    }*/

    //Méthode qui de modifier le prix du produit en fonction de sa quantité ce qui modifie la valeur finale du panier
    modifyPrice(quantity, price, y){  
        if(document.getElementById("total_price") != null && document.getElementById("final_price") != null){
            //On multiplie le prix unitaire du produit par sa quantité dans le panier pour avoir le prix total du produit
            let productPrice = price * quantity[y].value;
            //On multiplie le prix unitaire du produit par sa quantité dans le panier pour avoir le prix total du produit
            let displayedProductPrice = document.getElementById('product_price_' + this.productsInCart[y][0]);
            displayedProductPrice.innerText = JSON.stringify(productPrice) + "€";  
        /*    
            let totalProductsPrice = document.getElementById("total_price");
            let finalProductsPrice = document.getElementById("final_price");

            //On multiplie le prix unitaire du produit par sa quantité dans le panier pour avoir le prix total du produit
            let productPrice = price * quantity[y].value;
            //Puis on additionne chaque prix final de chaque produit pour avoir le prix total du panier
            this.totalPrice += productPrice;
            
            //On multiplie le prix unitaire du produit par sa quantité dans le panier pour avoir le prix total du produit
            let displayedProductPrice = document.getElementById('product_price_' + this.productsInCart[y][0]);
            displayedProductPrice.innerText = JSON.stringify(productPrice) + "€";  
            console.log(this.totalPrice);
        */
        }
    }

    //Méthode qui nous permet d'afficher un message pour signaler à l'utilisateur que son panier est vide
    displayEmptyCart(){
        let emptyCart = document.getElementById('empty-cart');
        emptyCart.classList.add('d-flex', 'justify-content-center');
        emptyCart.innerHTML = '<h2 class="mt-3">Votre panier est vide</h2>';
    }

    //Méthode qui nous permet de supprimer un produit du panier en cliquant sur un button grâce à son ID
    deleteProductInCart(id, name, y){
        if(this.productsInCart[y][0] === id){
            cart.productsInCart.splice(y, 1);
            localStorage.setItem("productsInCart", JSON.stringify(cart.productsInCart));
        }
        alert(`Le produit ${name} est supprimé de votre panier`);
    }
}