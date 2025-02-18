//get, post, put, delete
function get(){
    tasks=[]
    //not finished
}
function get(id){
     return getTask(String(id))
}
function post(task){//add new task
    saveToLocalStorage(String(task.id), task)
}
function put(task){//edit task
    deleteFromLocalStorage(String(task.id))
    saveToLocalStorage(String(task.id), task)
}
function delete_(id){
    deleteFromLocalStorage(String(id))
}
//TO DO
// check its all in the right format before sending
// send request status?? what does that mean?
//  