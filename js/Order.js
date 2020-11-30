class Order {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem("productsInCart"));
        this.product;
        this.userInfosArray = [];
        this.productArray = [];
        this.initialize();
    }

    initialize(){
        for(let i = 0; i < this.cart.length; i++){
            let ajaxResponse = new Ajax('http://localhost:3000/api/teddies/' + this.cart[i][0]);

            ajaxResponse.getResponse().then(data => {
                order.product = data;
            }).then(function(){
                order.displayCart(i);
            }).catch(error => {
                console.error(error);  
            }) 
        }

        if(document.getElementById('btn_purshase') != null){
            let purshaseBtn = document.getElementById('btn_purshase');
            purshaseBtn.addEventListener('click', function(e){
                e.preventDefault();
                order.retrieveUserInfos();
            });
        }      
    }

    displayCart(i){
        let cartToOrderCode =  `<div class="col-lg-6">
                                    <figure class="itemside mb-4">
                                    <div class="aside"><img src="${order.product.imageUrl}" class="border card-img" alt="Ourson ${order.product.name}"></div>
                                        <figcaption class="info">
                                            <a href="../pages/view-product.html?product_id=${order.product._id}"><p class="text-primary h3">${order.product.name}</p></a>
                                            <span class="price text-muted h4">${this.cart[i][1]} x ${order.product.price}€ = ${this.cart[i][1]*order.product.price}€</span>
                                        </figcaption>
                                    </figure>
                                </div>`;

        if(document.getElementById('cart-to-order') != null){
            let displayCart = document.getElementById('cart-to-order');
            displayCart.innerHTML += cartToOrderCode;
            this.productArray.push(order.product._id);
        }
    }

    retrieveUserInfos(){
        let formInputs = document.getElementsByTagName('input');
        for(let i = 1; i < formInputs.length; i++){
            if(this.userInfosArray.length === 0 || this.userInfosArray.length > 0){
                this.userInfosArray.push(formInputs[i].value)
            }
        }    
        this.createOrder(this.userInfosArray);   
    }

    createOrder(userInfo){      
        let order = {
            contact: {
                firstName: userInfo[0],
                lastName: userInfo[1],
                address: userInfo[2],
                city: userInfo[3],
                email: userInfo[4]
            },
            products: this.productArray
        }
        return order;
    }
}