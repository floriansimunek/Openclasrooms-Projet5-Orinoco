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

    sendData = async function(){
        let message = await fetch(this.url);
    }
}