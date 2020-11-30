class Ajax{
    constructor(url){
        this.url = url;
    }

    getResponse = async function(){
        let response  = await fetch(this.url);
        if(response.ok){
            return response.json();
        }else{
            console.error("Error : ", response.status);
        }        
    }

    sendOrder = async function(){
        let order = await fetch("http://localhost:3000/api/teddies/order", {method: "POST"});
        if(order.ok){
            console.log('ok')
        }else{
            console.error("Error : ", order.status);
        }
    }
}