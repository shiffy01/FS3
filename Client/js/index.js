



// /**
//  * Validates and signs up a new user by storing their username and password in localStorage and cookies.
//  * Redirects to the homepage upon successful signup.
//  */
// function signup() {
//     const username = document.getElementById('signup-username').value;
//     const password = document.getElementById('signup-password').value;

//     if (username && password) {
//         if (localStorage.getItem(username)) {
//             displayMessage('Username already exists!', 'red');
//         } else {
//             localStorage.setItem(username, JSON.stringify({ password: password, score: 0 }));
//             console.log(JSON.parse(localStorage.getItem(username)));
//             localStorage.setItem('current', username);
//             setCookie(username, JSON.stringify({ password, score: 0 }), 30); // Save user data for 30 days
//             setCookie('current', username, 5); // Save current user for 5 days
//             window.location.href = '../html/homepage.html';
//         }
//     } else {
//         displayMessage('Please fill in both fields.', 'red');
//     }
// }

// /**
//  * Updates the score of an existing user in localStorage.
//  * @param {string} username - The username of the player.
//  * @param {number} score - The new score to update.
//  */
// function updateScore(username, score) {
//     let user = JSON.parse(localStorage.getItem(username));
//     if (user) {
//         user.score = score;
//         localStorage.setItem(username, JSON.stringify(user));
//     }
// }

// /**
//  * Retrieves the score of a specified user.
//  * @param {string} username - The username of the player.
//  * @returns {number} The score of the user, or 0 if the user does not exist.
//  */
// function getScore(username) {
//     let user = JSON.parse(localStorage.getItem(username));
//     return user ? user.score : 0;
// }

// /**
//  * Logs in a user by validating their credentials against localStorage or cookies.
//  * Redirects to the homepage upon successful login.
//  * Locks the user after 3 failed attempts for 5 minutes.
//  */
// function login() {
//     const username = document.getElementById('login-username').value;
//     const password = document.getElementById('login-password').value;

//     if (username && password) {
//         const userKey = `attempts_${username}`;
//         const lockKey = `lock_${username}`;

//         // Check if the user is locked
//         const lockTime = localStorage.getItem(lockKey);
//         if (lockTime && Date.now() < parseInt(lockTime, 10)) {
//             displayMessage('User is locked. Try again later.', 'red');
//             return;
//         }

//         const userData = JSON.parse(getCookie(username)) || JSON.parse(localStorage.getItem(username));
//         if (userData && userData.password === password) {
//             localStorage.setItem('current', username);
//             document.cookie = `current=${encodeURIComponent(username)}; path=/;`;
//             localStorage.removeItem(userKey); // Reset failed attempts
//             window.location.href = '../html/homepage.html';
//         } else {
//             // Increment failed attempts
//             const attempts = parseInt(localStorage.getItem(userKey) || '0', 10) + 1;
//             localStorage.setItem(userKey, attempts);

//             if (attempts >= 3) {
//                 // Lock user for 3 minutes
//                 const lockUntil = Date.now() + 3 * 60 * 1000;
//                 localStorage.setItem(lockKey, lockUntil);
//                 displayMessage('Too many failed attempts. User locked for 3 minutes.', 'red');
//             } else {
//                 displayMessage(`Invalid username or password. Attempts left: ${3 - attempts}`, 'red');
//             }
//         }
//     } else {
//         displayMessage('Please fill in both fields.', 'red');
//     }
// }


// /**
//  * Displays a message to the user in a specified color.
//  * @param {string} message - The message to display.
//  * @param {string} color - The color of the message text.
//  */
// function displayMessage(message, color) {
//     const messageDiv = document.getElementById('message');
//     messageDiv.textContent = message;
//     messageDiv.style.color = color;
// }

// /**
//  * Shows the login form and hides the signup form.
//  */
// function showLogin() {
//     document.getElementById('signup-container').style.display = 'none';
//     document.getElementById('login-container').style.display = 'block';
// }

// /**
//  * Shows the signup form and hides the login form.
//  */
// function showSignup() {
//     document.getElementById('login-container').style.display = 'none';
//     document.getElementById('signup-container').style.display = 'block';
// }

// /**
//  * Retrieves all players stored in localStorage, excluding the current user.
//  * @returns {Array} An array of player objects with name and score properties.
//  */
// function getAllPlayers() {
//     let players = [];
//     for (let i = 0; i < localStorage.length; i++) {
//         let key = localStorage.key(i);
//         if (key !== 'current') {
//             let playerData = JSON.parse(localStorage.getItem(key));
//             if (playerData && playerData.password && playerData.score !== undefined) {
//                 players.push({ name: key, score: playerData.score });
//             }
//         }
//     }
//     return players;
// }

// /**
//  * Retrieves the value of a specific cookie by name.
//  * @param {string} name - The name of the cookie.
//  * @returns {string|null} The value of the cookie, or null if not found.
//  */
// function getCookie(name) {
//     const nameEQ = name + "=";
//     const cookiesArray = document.cookie.split(';');
//     for (let i = 0; i < cookiesArray.length; i++) {
//         let cookie = cookiesArray[i].trim();
//         if (cookie.indexOf(nameEQ) === 0) {
//             return decodeURIComponent(cookie.substring(nameEQ.length));
//         }
//     }
//     return null;
// }

// /**
//  * Sets a cookie with a specified name, value, and expiration time in days.
//  * @param {string} name - The name of the cookie.
//  * @param {string} value - The value to store in the cookie.
//  * @param {number} days - The number of days until the cookie expires.
//  */
// function setCookie(name, value, days) {
//     const date = new Date();
//     date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
//     const expires = "expires=" + date.toUTCString();
//     document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/";
// }

// /**
//  * Deletes a cookie by setting its expiration date to a past date.
//  * @param {string} name - The name of the cookie to delete.
//  */
// function deleteCookie(name) {
//     document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
// }
