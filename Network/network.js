import { Task, User } from "../DB/data.js";
import { TaskServer } from "../Server/taskServer.js";
import { UserServer } from "../Server/userServer.js";
const userServer = new UserServer();
const taskServer = new TaskServer();
const servers = {
    task: taskServer,
    user: userServer
};



// Object map for dynamic method calling
//const classes = { user, task };
// // Example usage
// let className = "task"; // This can be "user" or "task"
// classes[className]?.get(); // Calls the correct `get` function dynamically

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
                callback(JSON.stringify({ success: false, message: "error has occured"}), 500);
                return;
            }
            const type_=request.url.split("/")[1]
            if(request.method=="GET"){
                if(request.url.split("/").length <4){//get all
                    if(type_=="task"){
                        data=taskServer.getAll()
                    }
                    if(type_=="user"){
                        data=userServer.getAll()
                    }
                }
                else{
                    if(type_=="task"){
                        data=taskServer.get(request.url.split("/")[3])
                    }
                    if(type_=="user"){
                        data=userServer.get(request.url.split("/")[3])
                    }
                }          
            }
            else if(request.method=="POST"){
                
                if(type_=="task"){
                    data=taskServer.post(request.data)
                }
                if(type_=="user"){
                    data=userServer.post(request.data)
                }
                
            }    
            else if(request.method=="PUT"){
                if(type_=="task"){
                    data=taskServer.put(request.url.split("/")[3], request.data)
                }
                if(type_=="user"){
                    data=userServer.put(request.url.split("/")[3], request.data)
                }
            }    
            else if(request.method=="DELETE"){
                data=servers[type_].delete(request.url.split("/")[3])                
            }  

            callback(JSON.stringify({ success: true, message: "Data received", data: data }), 200);
        }, delay);
    }
}

//things to do
/**
 * 6. see if can fix repetitiveness of calling servers
 **/
