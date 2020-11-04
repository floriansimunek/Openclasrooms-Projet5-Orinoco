class Cart{
    constructor(product){
        this.product = product;
        this.viewInCart();
    }

    viewInCart(){
        console.log(product);

        /*let cartCode =  '<tr>'
                            +'<td>'
                            +'<figure class="itemside align-items-center">'
                                +'<div class="aside col-lg-6"><img src="' + this.product.imageUrl + '" class="card-img"></div>'
                                +'<figcaption class="info">'
                                    +'<a href="../pages/view-product.html'+ "?product_id=" + this.product._id +'" class="title text-dark">'+ this.product.name +'</a>'
                                    +'<p class="text-muted small" id="product_colors">Couleur: rouge, bleu ou marron</p>'
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
                                +'<span class="price">'+ this.product.price +  "€" + '</br></span>' 
                                +'<small class="text-muted">' + this.product.price + "€" + '/unité </small>'
                            +'</div>'
                            +'</td>'
                            +'<td class="text-right">' 
                            +'<a href="" class="btn btn-danger" id="btn_deleteProduct_'+ this.product._id + '">Supprimer</a>'
                            +'</td>'
                        +'</tr>';
                        
        if(localStorage && localStorage.getItem(this.product.name)){
            if(document.getElementById('display-cart') != null){
                let displayCart = document.getElementById('display-cart');
                displayCart.innerHTML += cartCode;
            }            
        }*/
    }/*

    supprInCart(){
        if(localStorage && localStorage.getItem(this.product.name)){
            console.log(this.product.name);
        }      
    }

    emptyCart(){
        if(document.getElementById('empty-cart') != null){
            let emptyCart = document.getElementById('empty-cart');
            emptyCart.classList.add('d-flex', 'justify-content-center');
            emptyCart.innerHTML = '<h2 class="mt-3">Votre panier est vide</h2>';
        }
    }*/
}