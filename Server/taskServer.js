import { getAllFromLocalStorage, saveToLocalStorage, deleteFromLocalStorage, Task, updateId} from "../DB/data.js"

export class TaskServer{
    constructor(){
        this.task=new Task()
    }
    getAll(){
        let tasks=[]
        let items=getAllFromLocalStorage()
        for (let i = 0; i < items.length; i++) {
            if(items[i]?.type_=="task")
                tasks.push(items[i])
        }
        return tasks
        //this loops through everything twice... fix????
    }
    get(id){
         return this.task.getTask(id)
    }
    post(task){//add new task
        saveToLocalStorage(updateId(), task)
    }
    put(id, task){//edit task
        const item=this.task.getTask(id)
        if(item==null){
            return false
        }
        saveToLocalStorage(id, task)
        return true
    }
    delete_(id){
        const item=this.task.getTask(id)
        if(item==null){
            return false
        }
        deleteFromLocalStorage(id)
        return true    }
}

