import { Task, User } from "../DB/data.js";
import { TaskServer } from "../Server/taskServer.js";
import { UserServer } from "../Server/userServer.js";
const userServer = new UserServer();
const taskServer = new TaskServer();
const servers = {
    task: taskServer,
    user: userServer
};


export class Network {
    static sendRequest(request, callback) {
        const delay = Math.floor(Math.random() * 2000) + 1000; // השהיה בין 1 ל-3 שניות
        const dropChance = Math.random(); // הסתברות להשמטה
        let data=null
        if (request.data !== null && !(request.data instanceof User|| Task)) {
            callback(JSON.stringify({ success: false, message: "data is of wrong type"}), 400);

        }
        
           
        console.log(`Sending request to ${request.url} with ${delay}ms delay...`);

        setTimeout(() => {
            if (dropChance < 0.3) { // לדוגמה, השמטה בהסתברות של 30%
                callback(JSON.stringify({ success: false, message: "timeout error"}), 500);
                return;
            }
            const type_=request.url.split("/")[1]
            let message="data recieved"
            if(request.method=="GET"){
                if(request.url.split("/").length <4){//get all                  
                    data=data=servers[type_].getAll()                  
                }     
                else if(!isNaN(request.url.split("/")[3])){//get by id                   
                    data=servers[type_].get(request.url.split("/")[3])
                    if(data==null)
                    {
                        callback(JSON.stringify({ success: false, message: type_+" of this id not found"}), 404);
                        return
                    }                   
                }  
                else{//get by property
                    data=servers[type_].getByUserName(request.url.split("/")[3])
                    if(data==null)
                        {
                            callback(JSON.stringify({ success: false, message: type_+" of this name not found"}), 404);
                            return
                        }   
                }        
            }
            else if(request.method=="POST"){
                data=servers[type_].post(request.data)
                message="data sent successfully"
            }    
            else if(request.method=="PUT"){                
                data=data=servers[type_].put(request.url.split("/")[3], request.data)
                if(!data){
                    callback(JSON.stringify({ success: false, message: type_+" of this id not found"}), 404);
                    return
                }
                message="data sent"
            }    
            else if(request.method=="DELETE"){
                data=servers[type_].delete_(request.url.split("/")[3])   
                if(!data){
                    callback(JSON.stringify({ success: false, message: type_+" of this id not found"}), 404);
                    return
                }   
                message=type_+" deleted"          
            }  
            callback(JSON.stringify({ success: true, message: message, data: data }), 200);
        }, delay);
    }
}

