
const loginForm = document.getElementById("loginForm");
const messageDiv = document.getElementById("message");
const usernameInput = document.getElementById("username");

loginForm.addEventListener("submit", function (event) {
    event.preventDefault(); // מניעת רענון הדף

    const username = usernameInput.value.trim();
    const password = document.getElementById("password").value.trim();

    // בדיקת אם המשתמש חסום
    if (checkIfBlocked(username)) {
        showMessage("User is blocked for 1 minute due to multiple failed attempts.", "error");
        return;
    }

    // בדיקת פרטי המשתמש
    const user = getUser(username);
    if (!user) {
        showMessage("User does not exist. Please sign up.", "error");
        return;
    }

    if (user.password !== password) {      
        showMessage(`Incorrect password.`, "error");       
        return;
    }

    // אם התחברות הצליחה
    if (username && password){
        localStorage.setItem("username", user.username);
        showMessage("Login successful! Redirecting to home page...", "success");
        setTimeout(() => {
            window.location.href = "homepage.html"; // הפניה לדף הבית
        }, 1000);
    } else {
        showMessage("Please fill in all fields.", "error");
    }
});




// פונקציה להצגת הודעות למשתמש
function showMessage(msg, type) {
    messageDiv.textContent = msg;
    messageDiv.className = `message ${type}`;
}

// פונקציה לקבלת נתוני משתמש מ-localStorage
const getUser = (username) => {
    const request_ = new FXMLHttpRequest();
    request_.open("GET", "url/user/get/"+username);
    
    request_.onload = function(data) {
        return data
    };
    
    request_.onerror = function() {
        if(this.response=="timeout error"){
            request_.send()
        }
        else(prompt(this.response))
    };
    request_.send();
};
