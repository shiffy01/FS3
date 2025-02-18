//get, post, put, delete
function get(){
    users=[]
    //not finished
}
function get(id){
     return User.getUser(id)
}
function post(user){//add new user
    saveToLocalStorage(user.id, user)
}
function put(user){//edit user
    deleteFromLocalStorage(user.id)
    saveToLocalStorage(user.id, user)
}
function delete_(id){
    deleteFromLocalStorage(id)
}
//TO DO
// check its all in the right format before sending
// send request status?? what does that mean?
//  