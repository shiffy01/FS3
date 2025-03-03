import { getAllFromLocalStorage, saveToLocalStorage, deleteFromLocalStorage, Task, getIdFromLocalStorage, updateId} from "../DB/data"

export class TaskServer{
    get(){
        to_return=[]
        tasks=getAllFromLocalStorage()
        for (let i = 0; i < tasks.length; i++) {
            if(typeof tasks[i]===Task)
                to_return.push(tasks[i])
        }
        return to_return
        //this loops through everything twice... fix????
    }
    get(id){
         return Task.getTask(id)
    }
    post(task){//add new task
        saveToLocalStorage(updateId("task"), task)
    }
    put(task){//edit task
        saveToLocalStorage(task.id, task)
    }
    delete_(id){
        deleteFromLocalStorage(id)
    }
}

