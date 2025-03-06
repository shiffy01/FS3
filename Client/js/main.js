document.addEventListener("DOMContentLoaded", function() {
    checkUserSession();
    loadTasksFromStorage();
});

function checkUserSession() {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
        alert(((`${currentUser}`)));//מחזיר לי null
        //window.location.href = "login.html"; // אם אין משתמש מחובר, להפנות לדף התחברות
    }
}











/*function addTask() {
    let input = document.getElementById("taskInput");
    let taskText = input.value.trim();
    if (taskText === "") return;

    let li = document.createElement("li");
    li.innerHTML = `${taskText} <button onclick="removeTask(this) class="x">X</button> `;

    document.getElementById("taskList").appendChild(li);
    saveTaskToStorage(taskText); // שמירת המשימה ב-LocalStorage
    input.value = "";
}

function addTask() {
    let input = document.getElementById("taskInput");
    let taskText = input.value.trim();
    if (taskText === "") return;
    
    const currentUser = localStorage.getItem("currentUser");
    let tasks = JSON.parse(localStorage.getItem(`tasks_${currentUser}`)) || [];
    const taskId = Date.now();
    let task = { id: taskId, text: taskText };
    tasks.push(task);
    localStorage.setItem(`tasks_${currentUser}`, JSON.stringify(tasks));
    
    renderTask(task);
    input.value = "";
}
*/
function addTask() {
    let input = document.getElementById("taskInput");
    let taskText = input.value.trim();
    if (taskText === "") return;
    
    const currentUser = localStorage.getItem("currentUser");
    let tasks = JSON.parse(localStorage.getItem(`tasks_${currentUser}`)) || [];
    const taskId = Date.now();
    let task = { id: taskId, text: taskText };
    tasks.push(task);
    localStorage.setItem(`tasks_${currentUser}`, JSON.stringify(tasks));
    
   /* let li = document.createElement("li");
   li.innerHTML = `
        <input type="checkbox" onclick="toggleTaskStatus(this) ">
        ${taskText} 
        <button onclick="removeTask(this)" class="x">X</button>
        <button onclick="editTask(this)">edit</button>`;
    
    document.getElementById("taskList").appendChild(li);
    */
    renderTask(task);

    input.value = "";
}
function toggleTaskStatus(checkbox) {
    let li = checkbox.parentElement;
    if (checkbox.checked) {
        li.style.textDecoration = "line-through"; // מוסיף קו חוצה
        li.style.color = "gray"; // משנה גם את הצבע לאפור
        //לסמן בלוקאל סטורג' את מצב המשימה
    } else {
        li.style.textDecoration = "none"; // מבטל את הקו החוצה
        li.style.color = "black";
      //לסמן בלוקאל סטורג' את מצב המשימה

    }
}
/*function finishedTask(button) {
    let li = button.parentElement;
    button.remove(); // מסיר את כפתור הסימון
    document.getElementById("completedTasks").appendChild(li);
    saveCompletedTaskToStorage(li.innerText);
    // <button onclick="finishedTask()">V</button>
    // <button onclick="editTask()">edit</button>
}
function removeTask(button) {
    button.parentElement.remove();
}
*/
/*function saveTaskToStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}*/



function removeTask(button, taskId) {
    const currentUser = localStorage.getItem("currentUser");
    let tasks = JSON.parse(localStorage.getItem(`tasks_${currentUser}`)) || [];
    tasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem(`tasks_${currentUser}`, JSON.stringify(tasks)); 
    button.parentElement.remove();
}

function loadTasksFromStorage() {
    const currentUser = localStorage.getItem("currentUser");
    let tasks = JSON.parse(localStorage.getItem(`tasks_${currentUser}`)) || [];
    tasks.forEach(task => renderTask(task));
}

function renderTask(task) {
    let li = document.createElement("li");
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("custom-checkbox"); // הוספת class
    li.appendChild(checkbox);
    //checkbox.onclick = function () {

    //li.style.backgroundColor = checkbox.checked ? "grey" : "white";
         //   alert("hvgytrfbesdctfbyhjn");

   // }
        //alert("hvgytrfbesdctfbyhjn");
        //לקשר את הצ'ק בוקס למשימה שלו
        //לעדכן את המשימה אם היא בוצעה - בקוד
    
//לעשות לחצן עריכה.
   
    li.innerHTML += ` ${task.text} <button onclick="removeTask(this, ${task.id})" class="x">X</button>`;

    document.getElementById("taskList").appendChild(li);
}


/*function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    
    if (username && password) {
        const userData = JSON.parse(localStorage.getItem(username));
        if (userData && userData.password === password) {
            localStorage.setItem('currentUser', username);
            window.location.href = 'profile.html';
        } else {
            alert('Invalid username or password');
        }
    }
}

function signup() {
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
    
    if (username && password) {
        if (localStorage.getItem(username)) {
            alert('Username already exists!');
        } else {
            localStorage.setItem(username, JSON.stringify({ password: password }));
            alert('Signup successful, please log in.');
            showLogin();
        }
    }
}*/

function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}








/*



document.addEventListener("DOMContentLoaded", loadTasks);

function getCurrentUser() {
    return localStorage.getItem("currentUser") || "guest";
}

function addTask() {
    let input = document.getElementById("taskInput");
    let taskText = input.value.trim();
    let category = document.getElementById("taskCategory").value;
    let duration = document.getElementById("taskDuration").value;
    let difficulty = document.getElementById("taskDifficulty").value;
    let user = getCurrentUser();

    if (taskText === "") return;

    let task = {
        id: Date.now().toString(),
        text: taskText,
        category: category || "General",
        duration: duration || "Unknown",
        difficulty: difficulty || "Medium",
        completed: false,
        user: user
    };
    
    saveTaskToStorage(task);
    input.value = "";
    loadTasks();
}

function saveTaskToStorage(task) {
    let user = task.user;
    let tasks = JSON.parse(localStorage.getItem("tasks")) || {};
    if (!tasks[user]) tasks[user] = [];
    tasks[user].push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let user = getCurrentUser();
    let tasks = JSON.parse(localStorage.getItem("tasks")) || {};
    let userTasks = tasks[user] || [];
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    userTasks.forEach(task => {
        let li = document.createElement("li");
        li.innerHTML = `
            <span class="task-text ${task.completed ? 'completed' : ''}" onclick="toggleTask('${task.id}')">${task.text} (${task.category})</span>
            <button onclick="removeTask('${task.id}')">X</button>
        `;
        taskList.appendChild(li);
    });
}

function toggleTask(taskId) {
    let user = getCurrentUser();
    let tasks = JSON.parse(localStorage.getItem("tasks")) || {};
    let userTasks = tasks[user] || [];

    let task = userTasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();
    }
}

function removeTask(taskId) {
    let user = getCurrentUser();
    let tasks = JSON.parse(localStorage.getItem("tasks")) || {};
    tasks[user] = tasks[user].filter(task => task.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}
*/