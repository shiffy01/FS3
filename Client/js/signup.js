// מציאת האלמנטים מה-DOM
const form = document.getElementById("registrationForm");
const messageDiv = document.getElementById("message");

// פונקציה לבדיקת משתמשים קיימים
const isUserExists = (username) => {
    const request_ = new FXMLHttpRequest();
    request_.open("GET", "url/user/get/"+username);
    
    request_.onload = function(data) {
        return true
    };
    
    request_.onerror = function() {
        if(this.response=="timeout error"){
            request_.send()
        }
        else if(this.response=="user of this name not found"){
            return false
        }
        else(prompt(this.response))
    };
    request_.send();
}

// פונקציה לשמירת משתמש חדש
const saveUser = (user) => {
    const request_ = new FXMLHttpRequest();
    request_.open("POST", "url/user/post");    
    request_.onerror = function() {
        if(this.response=="timeout error"){
            request_.send()
        }
        else(prompt(this.response))
    };
    request_.send(user);
    
};

const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // תאריך תפוגה
    const expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value}; ${expires}; path=/`; // path=/ מאפשר גישה מכל העמודים בדומיין
}
// פונקציה להדפסת כל המשתמשים ב-localStorage
const printAllUsers = () => {
    const request_ = new FXMLHttpRequest();
    request_.open("GET", "url/user/get");
    request_.onload=function(data){
        for(let i=0; i<data.length; i++){
            print(data[i])
        }
    }    
    request_.onerror = function() {
        if(this.response=="timeout error"){
            request_.send()
        }
        else(prompt(this.response))
    };
    request_.send(user);
};

// פונקציה לאימות פורמט האימייל
//const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// מאזין לטופס
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
   // const email = document.getElementById("email").value.trim();

    // בדיקות
    if (isUserExists(username)) {
        showMessage("Username already exists. Please choose a different one.", "error");
        return;
    }

    if (password.length < 8) {
        showMessage("Password must be at least 8 characters long.", "error");
        return;
    }

    // בדיקה אם האימייל חוקי
   /* if (!validateEmail(email)) {
        showMessage("Invalid email format. Please enter a valid email.", "error");
        return;
    }*/

    // יצירת משתמש חדש ושמירתו ב-localStorage
    const newUser = { username, password, /*email*/};
    saveUser(newUser);
    localStorage.setItem("username", JSON.stringify(newUser));
    //console.log(localStorage.getItem("loggedInUser"))

    // הצגת הודעה והרשמה מוצלחת
    showMessage("Registration successful! Redirecting to the website...", "success");

    if (username && password /* &&email*/) {
        // שמירת שם משתמש וסיסמה ב-cookies
        setCookie("username", username, 7); // שמירה לשבעה ימים
        setCookie("password", password, 7);
        /*setCookie("email", email, 7);*/
        alert("Sign Up successful!");
    } else {
        alert("Please fill in all fields.");
    }

    // הדפסת כל המשתמשים אחרי שמירת המשתמש החדש
    printAllUsers();
    // הפניה ל-profile.html לאחר הרשמה
    setTimeout(() => {
        window.location.href = "homepage.html"; // הפניה לדף הבית
    }, 2000);
    // איפוס הטופס
    form.reset();
});


function showMessage(msg, type) {
    messageDiv.textContent = msg;
    messageDiv.className = type; // מוסיף מחלקה של 'error' או 'success'
}
