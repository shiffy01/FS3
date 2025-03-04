import { deleteFromLocalStorage, saveToLocalStorage, getAllFromLocalStorage, User, updateId } from "../DB/data"

export class UserServer{
    get(){
        to_return=[]
        users=getAllFromLocalStorage()
        for (let i = 0; i < users.length; i++) {
            if(typeof users[i]===User)
                to_return.push(users[i])
        }
        return to_return
        //this loops through everything twice... fix????
    }
    get(id){
         return User.getUser(id)
    }
    post(user){//add new user
        saveToLocalStorage(updateId("user"), user)
    }
    put(user){//edit user
        saveToLocalStorage(user.id, user)
    }
    delete_(id){
        deleteFromLocalStorage(id)
    }
}
