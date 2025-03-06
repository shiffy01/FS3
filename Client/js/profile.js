document.addEventListener("DOMContentLoaded", () => {
    const LOGGED_IN_USER_KEY = "loggedIn";
    const USER_STATS_KEY = "userStats";
    const loggedIn = JSON.parse(localStorage.getItem("loggedIn"));
    // Fetch logged-in user
    const username = loggedIn.username
    if (!username) {
        alert("Please log in first.");
        window.location.href = "login.html";
        return;
    }

    const userStats = JSON.parse(localStorage.getItem(USER_STATS_KEY)) || {};
    const user = JSON.parse(localStorage.getItem(username)) || {};

    // Update profile information
    document.getElementById("profileUsername").textContent = username;
    document.getElementById("profileEmail").textContent = loggedIn.email || "Not provided";

});

function logout() {
    localStorage.removeItem("loggedInUser");
    alert("Logged out successfully!");
    window.location.href = "login.html";
}
function goToToDoList() {
     window.location.href = "homepage.html"; // מעבר לדף המשימות
}

