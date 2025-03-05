import { Task, User } from './DB/data.js';
import { FXMLHttpRequest } from './Network/request.js';


export function tryout(){
    const request_ = new FXMLHttpRequest();
    request_.open("GET", "url/task/get");
    
    request_.onload = function() {
        console.log("Server Response:", this.response);
    };
    
    request_.onerror = function() {
        console.log("Error: Request failed");
    };
    const task=new Task("shiffy", "hw", "qs 1 and 2", false, 3, "task")
    const user=new User("benzion", "pass5", "user")
    request_.send();
    
}
window.tryout = tryout;


//TODO
/**
 * V add type property to user and task
 * V add task properties
 * V do getall users
 * V check task functions
 * 5. figure out why it gives error when everything went well (timeout)
 * 6. fix status
 * 7.think what functions to add
 */
