class Cart{
    constructor(){
        this.initialize();
    }

    initialize(){
        if(document.getElementById("display-cart") != null){
            this.viewInCart();
        }
    }

    viewInCart(){
        let productsInCart = JSON.parse(localStorage.getItem("productsInCart"));

        for(let i = 0; i < productsInCart.length; i++){
            let cartCode =  '<tr>'
                                +'<td>'
                                +'<figure class="itemside align-items-center">'
                                    +'<div class="aside col-lg-6"><img src="' + productsInCart[i].imageUrl + '" class="card-img"></div>'
                                    +'<figcaption class="info">'
                                        +'<a href="../pages/view-product.html'+ "?product_id=" + productsInCart[i]._id +'" class="title text-dark">'+ productsInCart[i].name +'</a>'
                                        +'<p class="text-muted small" id="product_colors">Couleur: '+ productsInCart[i][1] +'</p>'
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
                                    +'<span class="price">'+ productsInCart[i].price +  "€" + '</br></span>' 
                                    +'<small class="text-muted">' + productsInCart[i].price + "€" + '/unité </small>'
                                +'</div>'
                                +'</td>'
                                +'<td class="text-right">' 
                                +'<a href="" class="btn btn-danger" id="btn_deleteProduct_'+ productsInCart[i][0] + '">Supprimer</a>'
                                +'</td>'
                            +'</tr>';


            let displayCart = document.getElementById('display-cart');
            displayCart.innerHTML += cartCode;   
        }  
    }

    /*supprInCart(){
        if(localStorage && localStorage.getItem(productsInCart.name)){
            console.log(productsInCart.name);
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