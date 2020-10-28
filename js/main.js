const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get('product_id');

if(productId != null){
    //console.log(queryString);
    //console.log(productId);
}


class Product {
    constructor(colors, _id, name, price, imageUrl, description) {
        this.colors = colors;
        this._id = _id;
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
        this.description = description;
    }

    DisplayCard(){
        var cardCode =  '<div class="col-lg-2 col-md-6 mb-4 ">'
                            +'<div class="card h-100">'
                                +'<a href="pages/view-product.html'+ "?product_id=" + this._id +'"><img class="card-img-top" src="' + this.imageUrl + '" alt="'+ "Ourson " + this.name +'"></a>'
                                +'<div class="card-body">'
                                    +'<h4 class="card-title">'
                                        +'<a id="product_name" href="pages/view-product.html'+ "?product_id=" + this._id +'">' + this.name +'</a>'
                                    +'</h4>'
                                    +'<h5>' + this.price + " €" +' </h5>'
                                    +'<p class="card-text">' + this.description + '</p>'
                                +'</div>'
                            +'</div>'
                        +'</div>';

        if(document.getElementById("products") != null){
            var productsDiv = document.getElementById("products");  
            productsDiv.innerHTML += cardCode;
            //console.log(this.name);
        }
    }

    DisplayProduct(){
        var viewCode = '<div class="row">'
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
                                        +'<var class="price h4">' + this.price + " €" + '</var> <br>'
                                    +'</div>'
                                    +'<div class="mb-4">'
                                        +'<a href="#" class="btn btn-primary">Acheter</a>'
                                        +'<a href="cart.html" class="btn btn-light">Ajouter au panier</a>'
                                    +'</div>'
                                +'</article>'
                            +'</div>'
                        +'</div>';

        if(document.getElementById('view_product') != null){
            var viewProduct = document.getElementById('view_product');
            viewProduct.innerHTML += viewCode;
        }
    }

    addToCart(){
        var cartCode =  '<tr>'
                            +'<td>'
                            +'<figure class="itemside align-items-center">'
                                +'<div class="aside col-lg-6"><img src="' + this.imageUrl + '" class="card-img"></div>'
                                +'<figcaption class="info">'
                                    +'<a href="../pages/view-product.html'+ "?product_id=" + this._id +'" class="title text-dark">'+ this.name +'</a>'
                                    +'<p class="text-muted small">Couleur: rouge, bleu ou marron</p>'
                                +'</figcaption>'
                            +'</figure>'
                            +'</td>'
                            +'<td>'
                            +'<select class="form-control">'
                                +'<option>1</option>'
                                +'<option>2</option>'
                                +'<option>3</option>'
                                +'<option>4</option>'
                            +'</select>'
                            +'</td>'
                            +'<td>'
                            +'<div class="price-wrap">' 
                                +'<span class="price">1€</br></span>' 
                                +'<small class="text-muted">' + this.price + " €" + '/unité </small>'
                            +'</div>'
                            +'</td>'
                            +'<td class="text-right">' 
                            +'<a data-original-title="Save to Wishlist" title="" href="" class="btn btn-light" data-toggle="tooltip"> <i class="fa fa-heart"></i></a>'
                            +'<a href="" class="btn btn-danger"> Supprimer</a>'
                            +'</td>'
                        +'</tr>';

        if(document.getElementById('display-cart') != null){
            var displayCart = document.getElementById('display-cart');
            displayCart.innerHTML += cartCode;
        }
    }
}

var request = new XMLHttpRequest();

request.onreadystatechange = function() {
    if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        //console.log(response);

        var Teddies = [];
        for(var i = 0; i < response.length; i++){
            Teddies[i] = new Product(response[i].colors, response[i]._id, response[i].name, response[i].price, response[i].imageUrl, response[i].description);
            Teddies[i].DisplayCard();
            Teddies[i].addToCart();

            if(Teddies[i]._id == productId){
                Teddies[i].DisplayProduct();
                document.head.innerHTML += '<title>'+ Teddies[i].name + " - Orinoco" +'</title>';

                if(document.getElementById('product_colors') != null){
                    var productColors = document.getElementById('product_colors');

                    for(var y = 0; y < Teddies[i].colors.length; y++){
                        productColors.innerHTML +=  '</label>'
                                                        +'<label class="js-check btn btn-check">'
                                                        +'<input type="radio" name="option_size" value="'+ "option"+ y +'">'
                                                        +'<span> ' + Teddies[i].colors[y] +'</span>'
                                                    +'</label>';
                    }
                }
            }
        }
    }
};
request.open("GET", "http://localhost:3000/api/teddies");
request.send();