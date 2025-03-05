export class Task {
    constructor(userId, title, description,  completed, time, type_) {
        this.userId = userId;
        this.title = title;
        this.description = description;
        this.completed = completed;
        this.time = time;
        this.type_=type_
    }

    getTask(id) {
        const data = JSON.parse(localStorage.getItem(id));
        if (data) {
            const task = new Task(data.userId, data.title, data.description, data.completed,
                this.time=this.time, this.type_=type_
            );
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
    constructor(name, password, type_) {
        this.name = name;
        this.password=password
        this.type_=type_
    }
    getUser(id) {
        const data = JSON.parse(localStorage.getItem(id));
        if (data) {
            const user = new User(data.id, data.name, data.password, this.type_=this.type_);
            return user;
        }
        return null;
    }
  
}
  
export function saveToLocalStorage(id, data) {
    localStorage.setItem(id, JSON.stringify(data));
}
export function updateId(type_,){
    const item=localStorage.getItem(type_)
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
        localStorage.setItem(type_, Number(item)+1);
        return item
    }
}

export function deleteFromLocalStorage(id){
    localStorage.removeItem(id)
}
export function getAllFromLocalStorage(){
    let items=[]
    for (let i = 0; i < localStorage.length; i++) {
        items.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
    }
    return items
}
