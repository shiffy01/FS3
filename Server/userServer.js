import { deleteFromLocalStorage, saveToLocalStorage, getAllFromLocalStorage, User, updateId } from "../DB/data.js"

export class UserServer{
    constructor(){
        this.user= new User()
    }
    getAll(){
        let users=[]
        let items=getAllFromLocalStorage()
        for (let i = 0; i < items.length; i++) {
            if(items[i]?.type_=="user")
                users.push(items[i])
        }
        return users
    }
    get(id){
         return this.user.getUser(id)
    }
    post(user){//add new user
        saveToLocalStorage(updateId(), user)
    }
    put(id, user){//edit user
        saveToLocalStorage(id, user)
    }
    delete_(id){
        deleteFromLocalStorage(id)
    }
}
