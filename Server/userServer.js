import { deleteFromLocalStorage, saveToLocalStorage, getAllFromLocalStorage, User, updateId } from "../DB/data.js"

export class UserServer{
    constructor(){
        this.user= new User()
    }
    getAll(){
        let to_return=[]
        let users=getAllFromLocalStorage()
        for (let i = 0; i < users.length; i++) {
            if(users[i]?.propert=="user")
                to_return.push(users[i])
        }
        return to_return
    }
    get(id){
         return this.user.getUser(id)
    }
    post(user){//add new user
        saveToLocalStorage(updateId("user"), user)
    }
    put(id, user){//edit user
        saveToLocalStorage(id, user)
    }
    delete_(id){
        deleteFromLocalStorage(id)
    }
}
