class Order {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem("productsInCart"));
        this.product;
        this.userInfosArray = [];
        this.productArray = [];
        this.totalPrice = 0;
        this.initialize();
    }

    initialize(){
        if(localStorage.length > 0){
            for(let i = 0; i < this.cart.length; i++){
                let ajaxResponse = new Ajax('http://localhost:3000/api/teddies/' + this.cart[i][0]);

                ajaxResponse.getResponse().then(data => {
                    order.product = data;
                }).then(function(){
                    order.displayCart(i);
                }).then(function(){
                    if(document.getElementById('recap-order') != null){
                        order.recapOrder(i);
                        setTimeout(() => {
                            order.clearCart();
                        }, 1000);
                    }
                }).catch(error => {
                    console.error(error);  
                }) 
            }

            if(document.getElementById('btn_purshase') != null){
                let purshaseBtn = document.getElementById('btn_purshase');
                purshaseBtn.addEventListener('click', function(e){
                    e.preventDefault();
                    order.retrieveUserInfos();
                    setTimeout(() =>{
                        document.location.replace('recap-order.html');
                    }, 100)
                });
            } 
        }
    }

    displayCart(i){
        let cartToOrderCode =  `<div class="col-lg-5 product-card my-2">
                                    <div class="card">
                                        <a id="" href="../pages/view-product.html?product_id=${order.product._id}"><img src="${order.product.imageUrl}" class="card-img-top" alt="Ourson ${order.product.name}"></a>
                                        <div class="card-body">
                                            <h4 class="card-title d-flex justify-content-center">
                                                <a id="product_name" class="text-info" href="../pages/view-product.html?product_id=${order.product._id}""><strong>${order.product.name}</strong></a>
                                            </h4>
                                            <span class="price text-muted h5 d-flex justify-content-center">${this.cart[i][1]} x ${order.product.price}€ = ${this.cart[i][1]*order.product.price}€</span>
                                        </div>
                                    </div>
                                </div>`;

        if(document.getElementById('cart-to-order') != null){
            let displayCart = document.getElementById('cart-to-order');
            displayCart.innerHTML += cartToOrderCode;
            this.productArray.push(order.product._id);

            let totalPriceDisplay = document.getElementById('totalCartPrice');
            let priceToDisplay = localStorage.getItem('totalCartPrice');
            totalPriceDisplay.innerHTML = `<span class="h3 text-info"><strong>${priceToDisplay}</strong></span>`;
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
        let orderDatas = {
            contact: {
                firstName: userInfo[0],
                lastName: userInfo[1],
                address: userInfo[2],
                city: userInfo[3],
                email: userInfo[4]
            },
            products: this.productArray
        }
        let ajaxOrder = new Ajax();
        ajaxOrder.sendOrder(JSON.stringify(orderDatas)).then(response => {
            console.log(response);
            localStorage.setItem('order', JSON.stringify(response));
        });
        return order;
    }

    recapOrder(i){
        let orderInfosRecapDisplay = document.getElementById('recap-order');
        let productsInfoRecapDisplay = document.getElementById('products-recap-order');
        
        let productNumberDisplay = document.getElementById('product-number');
        productNumberDisplay.innerHTML = `<span class="h4 text-info"><strong>${this.cart.length}</strong></span>`;

        let productsTotalPriceDisplay = document.getElementById('totalCartPrice');
        let productsTotalPriceLS = localStorage.getItem('totalCartPrice');
        productsTotalPriceDisplay.innerHTML = `<span class="h3 text-info"><strong>${productsTotalPriceLS}</strong></span>`;

        let orderInfos = JSON.parse(localStorage.getItem('order'));
        let orderIdDisplay = document.getElementById('orderId-display');
        orderIdDisplay.innerText = `Votre commande (${orderInfos.orderId})`;

        let recapCode = `<div class="alert alert-warning d-flex justify-content-center my-5 w-50" role="alert">
                            ${orderInfos.contact.firstName} ${orderInfos.contact.lastName.toUpperCase()}, Merci pour votre commande !<br>
                        </div>`;
        orderInfosRecapDisplay.innerHTML = recapCode;

        let productsRecapCode =     `<div class="col-lg-5 product-card my-2">
                                        <div class="card">
                                            <a id="" href="view-product.html?product_id=${orderInfos.products[i]._id}"><img src="${orderInfos.products[i].imageUrl}" class="card-img-top" alt="Ourson ${orderInfos.products[i].name}"></a>
                                            <div class="card-body">
                                                <h4 class="card-title d-flex justify-content-center">
                                                    <a id="product_name" class="text-info" href="../pages/view-product.html?product_id=${orderInfos.products[i]._id}""><strong>${orderInfos.products[i].name}</strong></a>
                                                </h4>
                                                <span class="price text-muted h5 d-flex justify-content-center">${this.cart[i][1]} x ${order.product.price}€ = ${this.cart[i][1]*order.product.price}€</span>
                                            </div>
                                        </div>
                                    </div>`;
        productsInfoRecapDisplay.innerHTML += productsRecapCode;
    }

    clearCart(){
        localStorage.clear();
    }
}