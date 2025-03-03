export class Task {
    constructor(id, userId, description) {
        this.id = id;
        this.userId = userId;
        this.description = description;
    }

    getTask(id) {
        const data = JSON.parse(localStorage.getItem(id));
        if (data) {
            const task = new Task(data.id, data.userId, data.description);
            return task;
        }
        return null;
    }
    // toStorage() {
    //     return {
    //         id: this.id,
    //         userId: this.userId,
    //         description: this.description
    //     };
    // }
}

export class User {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }


    getUser(id) {
        const data = JSON.parse(localStorage.getItem(id));
        if (data) {
            const user = new User(data.id, data.name);
            return user;
        }
        return null;
    }
}
  
export function saveToLocalStorage(data) {
    localStorage.setItem(data.id, JSON.stringify(data));
}
export function updateId(type_,){
    item=getItem(type_)
    if(item==null){
        if(type_=="user"){
            localStorage.setItem(type_, 2)
            return 1
        }
        else{//="task"
            localStorage.setItem(type_, 1002)
            return 1002
        }
    }
    else{
        localStorage.setItem(type_, item+1);
        return item
    }
}

export function deleteFromLocalStorage(id){
    localStorage.removeItem(id)
}
export function getAllFromLocalStorage(){
    items=[]
    for (let i = 0; i < localStorage.length; i++) {
        items.push(localStorage.getItem(localStorage.key(i)));
    }
    return items
}
