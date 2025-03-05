import { Task, User } from './DB/data.js';
import { FXMLHttpRequest } from './Network/request.js';


export function tryout(){
    const request_ = new FXMLHttpRequest();
    request_.open("GET", "url/user/get/10");
    
    request_.onload = function() {
        console.log("Server Response:", this.response);
    };
    
    request_.onerror = function() {
        console.log("Error: Request failed");
    };
    //const task=new Task()
    request_.send();
    
}
window.tryout = tryout;


//TODO
/**
 * V add type property to user and task
 * V add task properties
 * 3. do getall users
 * 4. check task functions
 * 5. figure out why it gives error when everything went well (timeout)
 * 6. fix status
 */
