class Ajax{
    constructor(url){
        this.url = url;
    }

    getResponse = async function(){
        let response  = await fetch(this.url);
        return response.json();
    }
}