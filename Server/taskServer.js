//get, post, put, delete
function get(){
    tasks=[]
    //not finished
}
function get(id){
     return Task.getTask(String(id))

function post(task) { //add new task
    if (!task.id || !task.description) return { success: false, message: "Invalid task" };
    if (localStorage.getItem(task.id)) return { success: false, message: "Task already exists" };
    saveToLocalStorage(String(task.id), task);
    return { success: true, message: "Task added" };
}

}
function put(task) {
    if (!localStorage.getItem(String(task.id))) return { success: false, message: "Task not found" };
    deleteFromLocalStorage(String(task.id));
    saveToLocalStorage(String(task.id), task);
    return { success: true, message: "Task updated" };
}

function delete_(id) {
    if (!localStorage.getItem(String(id))) return { success: false, message: "Task not found" };
    deleteFromLocalStorage(String(id));
    return { success: true, message: "Task deleted" };
}
//TO DO
// check its all in the right format before sending
// send request status?? what does that mean?
//  