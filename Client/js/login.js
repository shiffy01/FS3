import { FXMLHttpRequest } from "../../Network/request.js";

const loginForm = document.getElementById("loginForm");
const messageDiv = document.getElementById("message");
const usernameInput = document.getElementById("username");


    

loginForm.addEventListener("submit", async function (event) {
    event.preventDefault(); // מניעת רענון הדף

    const username = usernameInput.value.trim();
    const password = document.getElementById("password").value.trim();
      
    // בדיקת פרטי המשתמש  
    try{
        const user =  await getUser(username);

    }
    catch{
        showMessage("User does not exist. Please sign up.", "error");
        return;
    }    

    
    // if (!user) {
    //     showMessage("User does not exist. Please sign up.", "error");
    //     return;
    // }

    if (user.password !== password) {      
        showMessage(`Incorrect password.`, "error");       
        return;
    }

    // אם התחברות הצליחה
    if (username && password){
        localStorage.setItem("username", user.name);
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



function getUser(username) {
    return new Promise((resolve, reject) => {
        const request_ = new FXMLHttpRequest();
        request_.open("GET", "url/user/get/" + username);
        
        request_.onload = function(data) {
            resolve(data); // resolve the promise with the data
        };
        
        request_.onerror = function() {
            if(JSON.parse(this.response).message=="timeout error"){
                request_.send()
            }
            else reject(new Error(this.response)); // reject the promise with the error response
        };

        request_.send();
    });
};



