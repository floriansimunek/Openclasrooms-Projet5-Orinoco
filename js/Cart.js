class Cart{
    constructor(products){
        this.products = products;
    }
    viewInCart(){
        let cartCode =  '<tr>'
                            +'<td>'
                            +'<figure class="itemside align-items-center">'
                                +'<div class="aside col-lg-6"><img src="' + this.products.imageUrl + '" class="card-img"></div>'
                                +'<figcaption class="info">'
                                    +'<a href="../pages/view-product.html'+ "?product_id=" + this.products._id +'" class="title text-dark">'+ this.products.name +'</a>'
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
                                +'<span class="price">'+ this.products.price +  "€" + '</br></span>' 
                                +'<small class="text-muted">' + this.products.price + "€" + '/unité </small>'
                            +'</div>'
                            +'</td>'
                            +'<td class="text-right">' 
                            +'<a href="" class="btn btn-danger" id="btn_deleteProduct_'+ this.products._id + '">Supprimer</a>'
                            +'</td>'
                        +'</tr>';
                        
        if(localStorage && localStorage.getItem(this.products.name)){
            if(document.getElementById('display-cart') != null){
                let displayCart = document.getElementById('display-cart');
                displayCart.innerHTML += cartCode;
            }            
        }
    }

    supprInCart(){
        if(localStorage && localStorage.getItem(this.products.name)){
            console.log(this.products.name);
        }      
    }

    emptyCart(){
        if(document.getElementById('empty-cart') != null){
            let emptyCart = document.getElementById('empty-cart');
            emptyCart.classList.add('d-flex', 'justify-content-center');
            emptyCart.innerHTML = '<h2 class="mt-3">Votre panier est vide</h2>';
        }
    }
}