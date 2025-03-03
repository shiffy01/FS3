

class Network {
    static sendRequest(request, callback) {//משמשת כשרת מדומה
        const delay = Math.floor(Math.random() * 2000) + 1000; // השהיה בין 1 ל-3 שניות
        const dropChance = Math.random(); // הסתברות להשמטה
        //get, post, put, delete
        //url/task/get/4"
        const type_ = request.url.split("/")[1]; 
        //check url, maybe somewhere else?
        //check method
        //check method matches data
        if(request.method=="GET"){
            if(request.data == null){//get all
                if(type_=="task"){
                    TaskServer.get()
                }
                if(type_=="user"){
                    UserServer.get()
                }
            }
            else if(typeof request.data === Number){
                if(type_=="task"){
                    TaskServer.get(request.url.split("/")[3])
                }
                if(type_=="user"){
                    UserServer.get(request.url.split("/")[3])
                }
            }          
        }
        else if(request.method=="POST"){
            
            if(type_=="task"){
                TaskServer.post(request.data)
            }
            if(type_=="user"){
                UserServer.post(request.data)
            }
            
        }    
        else if(request.method=="PUT"){
            if(type_=="task"){
                TaskServer.put(request.data)
            }
            if(type_=="user"){
                UserServer.put(request.data)
            }
        }    
        else if(request.method=="DELETE"){
            if(type_=="task"){
                TaskServer.delete(request.url.split("/")[3])
            }
            if(type_=="user"){
                UserServer.delete(request.url.split("/")[3])
            }
        }  
           
        console.log(`Sending request to ${request.url} with ${delay}ms delay...`);

        setTimeout(() => {
            if (dropChance < 0.3) { // לדוגמה, השמטה בהסתברות של 30%
                console.log(`Request to ${request.url} was dropped!`);
                callback(null, 0);
                return;
            }

            // תגובת JSON מדומה מהשרת
            const mockResponse = JSON.stringify({ success: true, message: "Data received" });
            callback(mockResponse, 200);
        }, delay);
    }
}

//things to do
/**
 * 3. error checking in messeges
 * 4. clean up
 * 5. deal with status
 * 6. see if can fix repetitiveness of calling servers
 **/
