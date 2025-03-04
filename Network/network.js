import { Task, User } from "../DB/data";
import { TaskServer } from "../Server/taskServer";
import { UserServer } from "../Server/userServer";
const userServer = new UserServer();
const taskServer = new TaskServer();

// Object map for dynamic method calling
//const classes = { user, task };
// // Example usage
// let className = "task"; // This can be "user" or "task"
// classes[className]?.get(); // Calls the correct `get` function dynamically

export class Network {
    static sendRequest(request, callback) {
        const delay = Math.floor(Math.random() * 2000) + 1000; // השהיה בין 1 ל-3 שניות
        const dropChance = Math.random(); // הסתברות להשמטה
        //get, post, put, delete
        if(typeof request.data!=(null|| User|| Task)){
            callback(JSON.stringify({ success: false, message: "data is of wrong type" }), 400);

        }
        if(request.method=="GET"){
            if(request.data == null){//get all
                if(type_=="task"){
                    taskServer.get()
                }
                if(type_=="user"){
                    userServer.get()
                }
            }
            else{
                if(type_=="task"){
                    taskServer.get(request.url.split("/")[3])
                }
                if(type_=="user"){
                    userServer.get(request.url.split("/")[3])
                }
            }          
        }
        else if(request.method=="POST"){
            
            if(type_=="task"){
                taskServer.post(request.data)
            }
            if(type_=="user"){
                userServer.post(request.data)
            }
            
        }    
        else if(request.method=="PUT"){
            if(type_=="task"){
                taskServer.put(request.data)
            }
            if(type_=="user"){
                userServer.put(request.data)
            }
        }    
        else if(request.method=="DELETE"){
            if(type_=="task"){
                taskServer.delete_(request.url.split("/")[3])
            }
            if(type_=="user"){
                userServer.delete_(request.url.split("/")[3])
            }
        }  
           
        console.log(`Sending request to ${request.url} with ${delay}ms delay...`);

        setTimeout(() => {
            if (dropChance < 0.3) { // לדוגמה, השמטה בהסתברות של 30%
                console.log(`Request to ${request.url} was dropped!`);
                callback(JSON.stringify({ success: false, message: "error has occured" }), 500);
                return;
            }

            // תגובת JSON מדומה מהשרת
            callback(JSON.stringify({ success: true, message: "Data received" }), 200);
        }, delay);
    }
}

//things to do
/**
 * 4. clean up
 * 6. see if can fix repetitiveness of calling servers
 * 8. send back response
 **/
