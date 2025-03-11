

import { Network } from "./network.js";


/**
 * Informational responses (100 – 199)
    Successful responses (200 – 299)
    Redirection messages (300 – 399)
    Client error responses (400 – 499)
    Server error responses (500 – 599)
 */
export class FXMLHttpRequest {
    constructor() {
        this.url = null;
        this.method = "GET";
        this.data = null;
        this.response = null;
        this.readyState = 0;
        this.status = 0;
        this.onload = null;
        this.onerror = null
        this.network=new Network()
    }
    
    open(method, url) {
        if(method!="GET" && method!="PUT" && method!="POST" && method!="DELETE"){
            this.response=JSON.stringify({ success: false, message: "unidentified method"})
            this.status=400
            if (this.onerror) this.onerror();
        }
        const urlPieces = url.split("/"); 
        if(urlPieces.length<3){
            this.response=JSON.stringify({ success: false, message: "error in url syntax"})
            this.status=400
            if (this.onerror) this.onerror();
        }
        if(urlPieces[0]!="url" && (urlPieces[1]!="task"|| urlPieces[1]!="user")){
            this.response=JSON.stringify({ success: false, message: "wrong data type"})
            this.status=400
            if (this.onerror) this.onerror();
        }
        if(urlPieces[2]!=method.toLowerCase()){
            this.response=JSON.stringify({ success: false, message: "mismatch between url and method"})
            this.status=400
            if (this.onerror) this.onerror();
        }
        this.method = method;
        this.url = url;
        this.readyState = 1; // opened
    }

    send(data = null) {
        const urlPieces = this.url.split("/"); 
        if(data==null&& urlPieces[3]?.length==undefined){
            this.response=JSON.stringify({ success: false, message: "expected data"})
            this.status=400
            if (this.onerror) this.onerror();
        }
        this.data = data;
        this.readyState = 2; //sent
        this.readyState=3 //loading
        Network.sendRequest(this, (response, status) => {
            this.status = status;
            this.response = response;
            this.readyState=4 //done
            if (this.status >= 200 && this.status < 300) {
                if (this.onload) this.onload(JSON.parse(this.response).data) 
            } else {
                if (this.onerror) this.onerror();
            }
        });
    }
  
    
}

