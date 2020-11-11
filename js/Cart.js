class Cart {
    constructor() {
        this.initialize();
        if(document.getElementById("display-cart") != null){
            this.viewInCart();
        }
    }

    initialize() {
        let productsInCart = JSON.parse(localStorage.getItem("productsInCart"));

        if(localStorage.length > 0){
            for (let i = 0; i < productsInCart.length; i++) {
                        let ajaxResponse = new Ajax('http://localhost:3000/api/teddies/' + productsInCart[i][0]);

                        ajaxResponse.getResponse().then(data => {
                            product._id = data._id;
                            product.imageUrl = data.imageUrl;
                            product.colors = data.colors;
                            product.price = data.price;
                            product.name = data.name;

                            let cartCode =  '<tr>'
                                            +'<td>'
                                            +'<figure class="itemside align-items-center">'
                                                +'<div class="aside col-lg-6"><img src="' + product.imageUrl + '" class="card-img"></div>'
                                                +'<figcaption class="info">'
                                                    +'<a href="../pages/view-product.html'+ "?product_id=" +  product._id +'" class="title text-dark">'+ product.name +'</a>'
                                                    +'<p class="text-muted small" id="product_colors">Couleur: '+ product.colors +'</p>'
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
                                                +'<span class="price">'+ product.price +  "€" + '</br></span>' 
                                                +'<small class="text-muted">' + product.price + "€" + '/unité </small>'
                                            +'</div>'
                                            +'</td>'
                                            +'<td class="text-right">' 
                                            +'<a href="" class="btn btn-danger" id="btn_deleteProduct_'+  product._id + '">Supprimer</a>'
                                            +'</td>'
                                        +'</tr>';


                            let displayCart = document.getElementById('display-cart');
                            displayCart.innerHTML += cartCode;   


                            //////////////////Supprimer/////////////////////
                            if(localStorage.length > 0 && productsInCart){
                                let btnSupprProductInCart = document.getElementById('btn_deleteProduct_' + productsInCart[i][0]);
                                btnSupprProductInCart.addEventListener('click', function(e){
                                    e.preventDefault();
                                    console.log('OK' + productsInCart[i][0]);
                                })
                            }

                        }).catch(error => {
                            console.error(error);
                        })  
                }            
        }

        //////////////////Empty Cart///////////////////
        if(document.getElementById('empty-cart') && localStorage.length === 0){
                    let emptyCart = document.getElementById('empty-cart');
                    emptyCart.classList.add('d-flex', 'justify-content-center');
                    emptyCart.innerHTML = '<h2 class="mt-3">Votre panier est vide</h2>';
        }
    }

    viewInCart(){
    }
}