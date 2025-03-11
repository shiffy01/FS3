import { FXMLHttpRequest } from "../../Network/request.js";

document.addEventListener("DOMContentLoaded", function() {
    checkUserSession();
    loadTasksFromStorage();
    const username = localStorage.getItem("username");
    document.getElementById("profileUsername").textContent = username;

   
    document.getElementById("profilePic").src = "../Pics/Avatar.jpeg";

});


document.getElementById("taskTime").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        addTask();
    }
});

document.getElementById("taskInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        addTask();
    }
});



function checkUserSession() {
    const currentUser = localStorage.getItem("username");
    if (!currentUser) {
       alert("There is no connected user");
         window.location.href = "login.html"; // הפנייה לדף ההתחברות
    }

}
function addRequest(task) {
    return new Promise((resolve, reject) => {
        const request_ = new FXMLHttpRequest();
    request_.open("POST", "url/task/post");
    
    request_.onload = function(data) {
        console.log("Server Response:", this.response);
        resolve(data)
    };
    request_.onerror = function() {
        if(JSON.parse(this.response).message=="timeout error"){
            request_.send(task)
        }
        else(prompt(this.response))
    };
    
    request_.send(task);
    });
};

window.addTask = async function() {
    let input = document.getElementById("taskInput");
    let taskText = input.value.trim();
    if (taskText === "") return;

    let timeInput = document.getElementById("taskTime").value.trim() || "";
    //if (taskText === "" || timeInput === "") return; // לוודא ששני השדות מלאים

    const currentUser = localStorage.getItem("username");
    let task = { 
        id: 0, 
        userName: currentUser,
        title: taskText, 
        description: "",
        completed: false, // משימה חדשה = לא בוצעה עדיין
        time: timeInput, // הוספת משך הזמן למשימה
        type_: "task"
    };
    const id=await addRequest(task)
    document.getElementById("taskTime").value = "";
    renderTask(task);
    input.value = "";
};

function removeTask(taskId) {
    return new Promise((resolve, reject) => {
        const request_ = new FXMLHttpRequest();
        request_.open("DELETE", "url/task/delete/"+taskId);
        
        request_.onload = function(data) {
            console.log("Server Response:", this.response);
            resolve(data)
        };
        request_.onerror = function() {
            if(JSON.parse(this.response).message=="timeout error"){
                request_.send()
            }
            else(prompt(this.response))
        };
        
        request_.send();
    })

}
function loadTasksRequest(currentUser){
    return new Promise((resolve, reject) => {
        const request_ = new FXMLHttpRequest();
        request_.open("GET", "url/task/get/"+currentUser);
        request_.onload = function(data) {
            console.log("Server Response:", this.response);
            console.log(data)
            resolve(data)
        };
        request_.onerror = function() {
            if(JSON.parse(this.response).message=="timeout error"){
                request_.send()
            }
            else(prompt(this.response))
        };
        
        request_.send();
    });
}
async function loadTasksFromStorage() {
    const currentUser = localStorage.getItem("username");
    let tasks=await loadTasksRequest(currentUser)
    document.getElementById("taskList").innerHTML = ""; // ניקוי הרשימה
    tasks.forEach(task => renderTask(task));
}

document.addEventListener("change", function(event) {
    if (event.target.classList.contains("custom-checkbox")) {
        const checkbox = event.target;
        const li = checkbox.parentElement;
        const taskId = parseInt(checkbox.dataset.taskId); // ✅ ממירים למספר
        toggleTaskStatus(taskId, checkbox.checked);

        li.style.textDecoration = checkbox.checked ? "line-through" : "none";
        li.style.color = checkbox.checked ? "gray" : "black";
        li.style.backgroundColor = checkbox.checked ? "lightgray" : "white";
        
    }
});

function renderTask(task) {
    let li = document.createElement("li");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("custom-checkbox");
    checkbox.checked = task.completed; 
    checkbox.dataset.taskId = task.id; 

    li.appendChild(checkbox);

    // הוספת הטקסט של המשימה
    let taskText = document.createTextNode(` ${task.title}`);
    li.appendChild(taskText);
    

    let timeElement = document.createElement("span");
    timeElement.textContent = ` (${task.time})`;
    timeElement.style.fontSize = "12px";
    timeElement.style.color = "gray";

    li.appendChild(timeElement);



    // יצירת כפתור ה-X
    let removeButton = document.createElement("button");
    removeButton.textContent = "🗑️ X";
    removeButton.classList.add("x");
    removeButton.onclick = async function() {
        await removeTask(task.id);
        removeButton.parentElement.remove();

};
//הוספת X
li.appendChild(removeButton);

    if (task.completed) {
        li.style.textDecoration = "line-through";
        li.style.backgroundColor = "lightGray";
        li.style.color ="gray";
        
    }

    document.getElementById("taskList").appendChild(li);
}

function getTask(taskId){
    return new Promise((resolve, reject) => {
        const request = new FXMLHttpRequest();
        request.open("GET", "url/task/get/"+taskId);
        request.onload = function(data) {
            console.log("Server Response:", this.response);
            console.log(data)
            resolve(data)
        };
        request.onerror = function() {
            if(JSON.parse(this.response).message=="timeout error"){
                request.send()
            }
            else(prompt(this.response))
        };
        
        request.send();
    })
    
}

async function toggleTaskStatus(taskId, isCompleted) {
    let task= await getTask(taskId)
    task.completed=isCompleted
    const request_2 = new FXMLHttpRequest();
    request_2.open("PUT", "url/task/put/"+task.id);
    request_2.onload = function(data) {
        console.log("Server Response:", this.response);
        console.log(data)
    };
    request_2.onerror = function() {
        if(JSON.parse(this.response).message=="timeout error"){
            request_2.send(task)
        }
        else(prompt(this.response))
    };
    
    request_2.send(task);
    //loadTasksFromStorage()
}
window.logout =  function() {
    localStorage.removeItem("username");
    window.location.href = "login.html";
}




//TODO
/**
 * add pic
 * switch requests
 * run
 * continue
 */