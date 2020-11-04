class Product {
    constructor() {
        this.colors;
        this._id;
        this.name;
        this.price;
        this.imageUrl;
        this.description;
        this.products;
        this.initialize();
    }

    initialize() {
        let getProducts = async function(){
            let response  = await fetch('http://localhost:3000/api/teddies');
            return response.json();
        }

        getProducts().then(data => {
            product.products = data;
            product.createProduct();
        }).catch(error => {
            console.error(error);
        })
    }

    createProduct() {
        for(let i = 0; i < this.products.length; i++) {
            this.colors = this.products[i].colors;
            this._id = this.products[i]._id;
            this.name = this.products[i].name;
            this.price = this.products[i].price;
            this.imageUrl = this.products[i].imageUrl;
            this.description = this.products[i].description;
            
            this.displayCard();
            if(this._id === productId){
                this.displayProduct();
                this.getProductColors();
                this.addToCart(this.name, this._id);
            }
        }
    }
    
    displayCard(){       
        let cardCode =  `<div class="col-lg-2 col-md-6 mb-4">
                            <div class="card h-100">
                                <a id="product_img--link" href="pages/view-product.html?product_id=${this._id}"><img id="product_img" class="card-img-top" src="${this.imageUrl}" alt="Ourson-  ${this.name}"></a>
                                <div class="card-body">
                                    <h4 class="card-title">
                                        <a id="product_name" href="pages/view-product.html?product_id=${this._id}">${this.name}</a>
                                    </h4>
                                    <h5 id="product_price">${this.price}€</h5>
                                    <p id="product_description" class="card-text">${this.description}</p>
                                </div>
                            </div>
                        </div>`;
        
        
        if(document.getElementById("products") != null){
            let productsDiv = document.getElementById("products");  
            productsDiv.innerHTML += cardCode;
        }
    }

    displayProduct(){
        let viewCode = '<div class="row">'
                            +'<aside class="col-lg-8 mb-4 mt-4">'
                                +'<article class="gallery-wrap">'
                                    +'<div class="card img-big-wrap">'
                                        +'<a href="#"> <img class="card-img" src="' + this.imageUrl + '"></a>'
                                    +'</div>'
                                +'</article>'
                            +'</aside>'
                            +'<div class="col-lg-4 mt-4 mb-4">'
                                +'<article>'
                                    +'<h3 class="title mb-4">'+ this.name +'</h3>'
                                    +'<div class="mb-3">'
                                        +'<h6>Description</h6>'
                                        +'<p>' + this.description + '</p>'
                                    +'</div>'
                                    +'<div class="form-group">'
                                        +'<label class="text-muted">Couleurs</label>'
                                        +'<div id="product_colors">'

                                        +'</div>'
                                    +'</div>'
                                    +'<div class="mb-3">'
                                        +'<p class="price h4">' + this.price + '€</p><br>'
                                    +'</div>'
                                    +'<div class="mb-4">'
                                        +'<a href="#" class="btn btn-primary">Acheter</a>'
                                        +'<a href="cart.html" id="btn_cart" class="btn btn-light">Ajouter au panier</a>'
                                    +'</div>'
                                +'</article>'
                            +'</div>'
                        +'</div>';

        if(document.getElementById('view_product') != null){
            let viewProduct = document.getElementById('view_product');
            viewProduct.innerHTML += viewCode;
        }
    }

    getProductColors(){
        document.head.innerHTML += '<title>'+ this.name + ' - Orinoco</title>';
        if(document.getElementById('product_colors') != null){
            let productColors = document.getElementById('product_colors');

            for(let y = 0; y < this.colors.length; y++){
                productColors.innerHTML +=  '</label>'
                                                +'<label class="js-check btn btn-check">'
                                                +'<input type="radio" name="option_size" value="'+ "option"+ y +'">'
                                                +'<span> ' + this.colors[y] +'</span>'
                                            +'</label>';
            }
        }     
    }

    addToCart(name, _id){
        if(document.getElementById('btn_cart') != null){
            let btnCart = document.getElementById('btn_cart');
            btnCart.addEventListener('click', function(e){
                localStorage.setItem(name, _id);
            });
        }
    }
}