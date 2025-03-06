
// פונקציה לשמירת עוגייה עם זמן תפוגה
const setCookie = (name, value, seconds) => {
    const date = new Date();
    date.setTime(date.getTime() + seconds * 1000);
    const expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value}; ${expires}; path=/`; // העוגייה זמינה בכל הדומיין
};

// פונקציה לקריאת ערך עוגייה
const getCookie = (name) => {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
        const [key, value] = cookie.split("=");
        if (key === name) return value;
    }
    return null;
};

// פונקציה למחיקת עוגייה
const deleteCookie = (name) => {
    setCookie(name, "", -1); // הגדרת זמן תפוגה שלילי למחיקה מיידית
};

// פונקציה לעדכון מספר ניסיונות שגויים בעוגייה
const setAttemptCookie = (username) => {
    const attemptKey = `attempt_${username}`;
    let attempts = parseInt(getCookie(attemptKey)) || 0; // מקבל את מספר הניסיונות הנוכחיים
    attempts++;
    setCookie(attemptKey, attempts, 60); // שמירה למשך דקה
    return attempts;
};

// פונקציה לבדיקה אם המשתמש חסום
const checkIfBlocked = (username) => {
    const attemptKey = `attempt_${username}`;
    const attempts = parseInt(getCookie(attemptKey)) || 0;
    return attempts >= 3;
};

// פונקציה לניקוי ניסיונות שגויים (למשל לאחר התחברות מוצלחת)
const clearAttempts = (username) => {
    const attemptKey = `attempt_${username}`;
    deleteCookie(attemptKey);
};

// מציאת אלמנטים מה-DOM
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
        const attempts = setAttemptCookie(username);
        if (attempts >= 3) {
            showMessage("User is blocked for 1 minute due to multiple failed attempts.", "error");
        } else {
            showMessage(`Incorrect password. You have ${3 - attempts} attempts left.`, "error");
        }
        return;
    }

    // אם התחברות הצליחה
    if (username && password) {
        setCookie("username", username, 7 * 24 * 60 * 60); // שמירת שם המשתמש ל-7 ימים בעוגייה
        localStorage.setItem("username", username);
         // שמירת שם המשתמש המחובר ב-localStorage
        clearAttempts(username); // איפוס ניסיונות שגויים לאחר התחברות מוצלחת
        showMessage("Login successful! Redirecting to home page...", "success");

        setTimeout(() => {
            window.location.href = "homepage.html"; // הפניה לדף הבית
        }, 2000);
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
    const userString = localStorage.getItem(username);
    return userString ? JSON.parse(userString) : null;
};


// מילוי אוטומטי של שם המשתמש מהעוגייה בעת טעינת העמוד
window.onload = () => {
    const savedUsername = getCookie("username"); // קריאה של שם המשתמש מהעוגייה
    if (savedUsername) {
        document.getElementById("username").value = savedUsername; // מילוי שם המשתמש בשדה
    }
};

//localStorage.clear()
// פונקציה להדפסת כל המשתמשים (debugging)
// const printAllUsers = () => {
//     console.log("All Users in localStorage:");
//     for (let i = 0; i < localStorage.length; i++) {
//         const key = localStorage.key(i);
//         const userString = localStorage.getItem(key);
//         if (userString) {
//             const user = JSON.parse(userString);
//             console.log(`Username: ${user.username}, Email: ${user.email}`);
//         }
//     }
// };


