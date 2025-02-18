class Task {
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
    toStorage() {
        return {
            id: this.id,
            userId: this.userId,
            description: this.description
        };
    }
}

class User {
    constructor(id, name, tasks) {
        this.id = id;
        this.name = name;
    }

    toStorage() {
        return {
            id: this.id,
            name: this.name,
        };
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
  
function saveToLocalStorage(data) {
    localStorage.setItem(data.id, JSON.stringify(data));
}

function deleteFromLocalStorage(id){
    localStorage.removeItem(id)
}
//to prevent confusion, user ids are only text and task ids are stringified numbers