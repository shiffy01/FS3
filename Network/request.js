/**
 * ready state:
 * 0 start
 * 1 opened
 * 2 sent
 * 3 loading
 * 4 done
 */
/**
 * Informational responses (100 – 199)
    Successful responses (200 – 299)
    Redirection messages (300 – 399)
    Client error responses (400 – 499)
    Server error responses (500 – 599)
 */
class FXMLHttpRequest {
    constructor() {
        this.url = null;
        this.method = "GET";
        this.data = null;
        this.response = null;
        this.readyState = 0;
        this.status = 0;
        this.onload = null;
        this.onerror = null;
    }

    open(method, url) {
        if(method!="GET" && method!="PUT" && method!="POST" && method!="DELETE"){
            prompt("error in method")
        }
        const urlPieces = request.url.split("/"); 
        if(urlPieces[0]!="url" && (urlPieces[1]!="task"|| urlPieces[1]!="user")){
            prompt("error in url syntax")
        }
        if(urlPieces[2]!=urlPieces[0].toLowerCase()){
            prompt("mismatch between url and method")
        }
        this.method = method;
        this.url = url;
        this.readyState = 1; // Opened
    }

    send(data = null) {
        if(data==null&& parts[3]?.length==0){
            prompt("no data sent!")
        }
        this.data = data;
        this.readyState = 2; // Sent
        
        Network.sendRequest(this, (response, status) => {
            this.status=3
            this.status = status;
            this.response = response;
            
            if (this.status >= 200 && this.status < 300) {
                if (this.onload) this.onload();
            } else {
                if (this.onerror) this.onerror();
            }
        });
    }
}
export default FXMLHttpRequest;