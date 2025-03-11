document.addEventListener("DOMContentLoaded", function() {
    checkUserSession();
    loadTasksFromStorage();
    const username = localStorage.getItem("username");
    document.getElementById("profileUsername").textContent = username;

    const profilePic = localStorage.getItem("profilePic");
    if (profilePic) {
        document.getElementById("profilePic").src = profilePic;
    }
    //FIX/?///////////////////////// add pic to files and get from there
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

function addTask() {
    let input = document.getElementById("taskInput");
    let taskText = input.value.trim();
    if (taskText === "") return;

    let timeInput = document.getElementById("taskTime").value.trim() || "";
    //if (taskText === "" || timeInput === "") return; // לוודא ששני השדות מלאים


    const currentUser = localStorage.getItem("username");

    let tasks = JSON.parse(localStorage.getItem(`tasks_${currentUser}`)) || [];
    const taskId = Date.now();
    
    let task = { 
        id: taskId, 
        text: taskText, 
        completed: false, // משימה חדשה = לא בוצעה עדיין
        time: timeInput // הוספת משך הזמן למשימה

    };
    
    tasks.push(task);
    localStorage.setItem(`tasks_${currentUser}`, JSON.stringify(tasks));
    document.getElementById("taskTime").value = "";
    renderTask(task);
    input.value = "";
}

function removeTask(button, taskId) {
    const currentUser = localStorage.getItem("username");
    let tasks = JSON.parse(localStorage.getItem(`tasks_${currentUser}`)) || [];

    tasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem(`tasks_${currentUser}`, JSON.stringify(tasks));

    button.parentElement.remove();
}

function loadTasksFromStorage() {
    const currentUser = localStorage.getItem("username");
    let tasks = JSON.parse(localStorage.getItem(`tasks_${currentUser}`)) || [];
    //switch with request
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
    let taskText = document.createTextNode(` ${task.text}`);
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
    removeButton.onclick = function() {
        removeTask(removeButton, task.id);
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


function toggleTaskStatus(taskId, isCompleted) {
    const currentUser = localStorage.getItem("username");
    let tasks = JSON.parse(localStorage.getItem(`tasks_${currentUser}`)) || [];
    //switch with request//////////////////////
    tasks.forEach(task => {
        if (task.id === taskId) {
            task.completed = isCompleted; 
        }
    });
    localStorage.setItem(`tasks_${currentUser}`, JSON.stringify(tasks));
        //switch with request//////////////////////

}


function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
}