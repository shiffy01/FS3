export class Task {
    constructor(userName, title, description,  completed, time, type_) {
        this.userName = userName;
        this.title = title;
        this.description = description;
        this.completed = completed;
        this.time = time;
        this.type_=type_
    }

    getTask(id) {
        const data = JSON.parse(localStorage.getItem(id));
        if (data) {
            const task = new Task(data.userName, data.title, data.description, data.completed,
                data.time, data.type_
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
            const user = new User(data.name, data.password, this.type_=this.type_);
            return user;
        }
        return null;
    }
  
}
  
export function saveToLocalStorage(id, data) {
    localStorage.setItem(id, JSON.stringify(data));
}
export function updateId(){
    const item=localStorage.getItem("nextId")
    if(item==null){ 
        localStorage.setItem("nextId", 2)
        return 1       
    }
    else{
        localStorage.setItem("nextId", Number(item)+1);
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
