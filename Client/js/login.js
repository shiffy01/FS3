import { FXMLHttpRequest } from "../../Network/request.js";

const loginForm = document.getElementById("loginForm");
const messageDiv = document.getElementById("message");
const usernameInput = document.getElementById("username");


    

loginForm.addEventListener("submit", async function (event) {
    event.preventDefault(); // מניעת רענון הדף

    const username = usernameInput.value.trim();
    const password = document.getElementById("password").value.trim();
      
    // בדיקת פרטי המשתמש  
    const user =  await getUser(username);
    console.log("uuuuuuuuuuuuuuser")
    

    
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

// פונקציה לקבלת נתוני משתמש מ-localStorage
//  function getUser(username){
   
//         const request_ = new FXMLHttpRequest();
//         request_.open("GET", "url/user/get/"+username);
//         let to_return;
//         request_.onload = function(data) {
//             console.log(this.response, data)
//             myuser= data
//         };
        
//         request_.onerror = function() {
//             if(JSON.parse(this.response).message=="timeout error"){
//                 console.log(this.response)
//                 request_.send()
//             }
//             else(prompt(this.response))
//         };
//         request_.send();
//         return to_return
    
// };

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



