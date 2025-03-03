//push new user
import FXMLHttpRequest from '../Network/request'; 
//import FXMLHttpRequest from '../request.js';
import { User } from '../DB/data.js';

//import User from '../DB/data'; 

function tryout(){
    const request = new FXMLHttpRequest();
    request.open("POST", "hello");
    
    request.onload = function() {
        console.log("Server Response:", this.response);
    };
    
    request.onerror = function() {
        console.log("Error: Request failed");
    };
    user=new User("password1", "shiffy")
    request.send(user);
    
}
//NOT WORKING!!!!!!!!!!!!!!!!!!!!!!11
