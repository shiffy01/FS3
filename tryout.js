import { User } from './DB/data.js';
import { FXMLHttpRequest } from './Network/request.js';


export function tryout(){
    const request_ = new FXMLHttpRequest();
    request_.open("DELETE", "url/user/delete/4");
    
    request_.onload = function() {
        console.log("Server Response:", this.response);
    };
    
    request_.onerror = function() {
        console.log("Error: Request failed");
    };
    request_.send();
    
}
window.tryout = tryout;


//TODO
/**
 * 1. check both gets work
 * 2. check task functions
 * 3. figure out why it gives error when everything went well (timeout)
 * 4. fix status
 * 5. think about passwords! why do they need separate ones, and how will we find user 
 * based on passwords?? maybe password should be id
 */