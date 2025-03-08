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
        //check that id exists and is user!
        const item=this.user.getUser(id)
        if(item==null){
            return false
        }
        saveToLocalStorage(id, user)
        return true

    }
    delete_(id){
        const item=this.user.getUser(id)
        if(item==null){
            return false
        }
        deleteFromLocalStorage(id)
        return true
    }
    getByUserName(name){
        let items=this.getAll()
        for (let i = 0; i < items.length; i++) {
            if(items[i]?.name==name)
                return items[i]
        }
        return null
    }
}
