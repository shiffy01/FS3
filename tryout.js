import { Task, User } from './DB/data.js';
import { FXMLHttpRequest } from './Network/request.js';


export function tryout(){
    const request_ = new FXMLHttpRequest();
    request_.open("GET", "url/user/get/10");
    
    request_.onload = function(data) {
        console.log("Server Response:", this.response);
        console.log(data)
    };
    
    request_.onerror = function() {
        console.log("Error: Request failed", this.response);
    };
    const task=new Task("shiffy", "hw", "qs 1 and 2", false, 3, "task")
    const user=new User("naftali", "pass7", "user")
    request_.send();
    
}
window.tryout = tryout;


//TODO
/**
 * V add type property to user and task
 * V add task properties
 * V do getall users
 * V check task functions
 * V figure out why it gives error when everything went well (timeout)
 * V fix status
 * V think what functions to add
 */ 
//Functions to add
/**
 * 1. get by certain property 
 */
//ERRORS to consider
/**
 * 1. when we are getting a task but give it an id of user
 * 2. when id for get doesnt exist
 * 3. when id for put doesnt exist
 * 4. when id for delete doesnt exist
 * 5. fix all the prompts
 */
