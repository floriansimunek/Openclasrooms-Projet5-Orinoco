class Product {
    //Constructor de la class qui nous permet de stocker les données de chaque produit fetch() depuis l'API
    constructor() {
        this.colors;
        this._id;
        this.name;
        this.price;
        this.imageUrl;
        this.description;
        this.initialize();
    }

    //Méthode initialize() qui se "lance" à la déclaration de la class Product (let product = new Product())
    initialize() {
        //Appel de la class Ajax qui permet de fetch() les informations de tous les "teddy" depuis l'API
        let ajaxResponse = new Ajax('http://localhost:3000/api/teddies');

        //Méthode getResponse() qui permet de récuperer les datas des teddies
        ajaxResponse.getResponse().then(data => {
            product.products = data;
            product.createProduct();
            //product.createProduct();product.createProduct();product.createProduct();product.createProduct();product.createProduct();
        }).catch(error => {
            //Récupération des messages d'erreurs en cas de problèmes(s)
            console.error(error);
        })  
    }
    
    //Méthode qui nous permet de créer un produit depuis le constructor
    createProduct() {
        for(let i = 0; i < this.products.length; i++) {
            this.colors = this.products[i].colors;
            this._id = this.products[i]._id;
            this.name = this.products[i].name;
            this.price = this.products[i].price;
            this.imageUrl = this.products[i].imageUrl;
            this.description = this.products[i].description;
            
            //Appel de la méthode qui nous permet d'afficher les produits sous formes de cards
            this.displayCard();
            //Méthode qui affiche le produit en fonction de son ID quand on clique dessus
            if(this._id === productId){
                this.displayProduct();
                //Méthode qui nous permet d'ajouter des produits dans notre panier grâce à un bouton. Les produits sont stockés dans le localStorage
                if(document.getElementById('btn_cart') != null) {
                    this.addToCart(this._id, this.name);
                }
            }
        }
    }
    
    //Méthode qui nous permet d'afficher les cards de chaque produit grâce à des variables
    displayCard(){       
        //Code HTML de la card avec Bootstrap
        let cardCode = `<div class="col-lg-2 col-md-6 mb-4 product-card">
                            <div class="card h-100">
                                <a id="" href="pages/view-product.html?product_id=${this._id}"><img id="product_img" class="card-img-top" src="${this.imageUrl}" alt="Ourson ${this.name}"></a>
                                <div class="card-body">
                                    <h4 class="card-title">
                                        <a id="product_name" class="text-info" href="pages/view-product.html?product_id=${this._id}"">${this.name}</a>
                                    </h4>
                                    <h5 id="product_price">${this.price}€</h5>
                                    <p id="product_description" class="card-text">${this.description}</p>
                                    <hr>
                                    <a href="pages/view-product.html?product_id=${this._id}" class="btn btn-info col-lg-8 d-flex mx-auto">Voir le produit</a>
                                </div>
                            </div>
                        </div>`;
        
        //On affiche seulement les cards sur le menu principal du site (index), on vérifie donc que l'élément "products" soit présent
        if(document.getElementById("products") != null){
            let productsDiv = document.getElementById("products");  
            productsDiv.innerHTML += cardCode;
        }
    }

    //Méthode qui affiche le produit en fonction de son ID quand on clique dessus
    displayProduct(){
        //Code HTML de la card de chaque produit avec Bootstrap
        let viewCode =  `<div class="row">
                            <aside class="col-lg-8 mb-4 mt-4">
                                <article class="gallery-wrap">
                                    <div class="card img-big-wrap">
                                        <a href="#"> <img class="card-img" src="${this.imageUrl}"></a>
                                    </div>
                                </article>
                            </aside>
                            <div class="col-lg-4 mt-4 mb-4">
                                <article>
                                    <h3 class="title mb-4">${this.name}</h3>
                                    <div class="mb-3">
                                        <h6>Description</h6>
                                        <p>${this.description}</p>
                                    </div>
                                    <div class="form-group">
                                        <label class="text-muted">Couleurs</label>
                                        <div id="product_colors"></div>
                                    </div>
                                    <div class="form-group">
                                        <label class="text-muted">Quantité</label><br>
                                        <input class="productQuantityInput" type="number" id="product_quantity_${this._id}" min="1" max="10" value="1">
                                    </div>
                                    <div class="mb-3">
                                        <p class="price h4">${this.price}€</p><br>
                                    </div>
                                    <div class="mb-4">
                                        <a href="#" class="btn btn-primary">Acheter</a>
                                        <a href="cart.html" id="btn_cart" class="btn btn-light">Ajouter au panier</a>
                                    </div>
                                </article>
                            </div>
                        </div>`;

        //On affiche seulement la card du produit sur lequel on a cliqué grâce à l'id que l'on passe en paramètre dans l'URL
        if(document.getElementById('view_product') != null){
            let viewProduct = document.getElementById('view_product');
            viewProduct.innerHTML += viewCode;
            this.getProductColors();
        }
    }

    //Méthode qui permet de récupérer les couleurs de chaque produit et de les afficher dans la card du produit unique
    getProductColors(){
        document.head.innerHTML += '<title>'+ this.name + ' - Orinoco</title>';
        if(document.getElementById('product_colors') != null){
            let productColors = document.getElementById('product_colors');

            //On récupère toutes les couleurs de chaque produit que l'on affiche
            for(let y = 0; y < this.colors.length; y++){
                //Code HTML pour les couleurs (boutons radios selectionnables)
                productColors.innerHTML +=  `<label class="js-check btn btn-check">
                                                <input type="radio" name="option_size" value="option${y}">
                                                <span>${this.colors[y]}</span>
                                            </label>`;
            }
        }     
    }

    //Méthode qui nous permet d'ajouter un produit dans le panier dans le localStorage avec l'id, le nom et la quantité du produit
    addToCart(id, name){
        let btnAddCart = document.getElementById('btn_cart');

        //On défini la valeur de la quantité du produit sur 1 avant que l'utilisateur ne le change (ou pas)
        let productQuantity = "1";
        //On récupère la valeur de l'input (de 1 à 10)
        document.getElementsByClassName('productQuantityInput')[0].addEventListener('input', function(){
            productQuantity = document.getElementById(`product_quantity_${id}`).value;
        })

        btnAddCart.addEventListener('click', function(e){
            //On créé un tableau de tableau (id + quantité)
            let productArray = [id, productQuantity];
            let productsInCartArray = [productArray];

            //Quand le panier est vide on ajoute un produit
            if(localStorage.length === 0){
                localStorage.setItem("productsInCart", JSON.stringify(productsInCartArray));
                alert(`Le produit ${name} est ajouté à votre panier !`)
            //Et sinon on récupère la liste de produit pour voir si il n'est pas déjà dans le panier
            }else{
                let productsInCartArray = JSON.parse(localStorage.getItem("productsInCart"));

                //Ajout panier
                if(JSON.stringify(productsInCartArray).indexOf(JSON.stringify(productArray)) === -1){
                    productsInCartArray.push(productArray);
                    localStorage.setItem("productsInCart", JSON.stringify(productsInCartArray));
                    alert(`Le produit ${name} est ajouté à votre panier !`);
                //Produit déjà dans le panier
                } else {
                    alert(`Le produit ${name} est déjà dans votre panier !`);
                }
            }        
        });
    }
}