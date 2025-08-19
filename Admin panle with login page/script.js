

let currentUser = null;
const balanceElement = document.getElementById("balance");
const userNameElement = document.getElementById("user-name");
const accountNumberElement = document.getElementById("account-number");
const addressElement = document.getElementById("address");
const loginScreen = document.getElementById("login-screen");
const dashboardscreen = document.getElementById("dashboard-screen");
const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");
const loginError = document.getElementById("login-error");
const refresh = document.getElementById("refresh");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

const viewcontainer = document.querySelector(".view-container");


// Login function
function login(username, password) {
    if (users[username] && users[username].password === password) {
        currentUser = users[username];
        updateUserDetails();
        showdashboardscreen();
    } else {
        loginError.classList.remove("hidden");
    }
}

// Update user details on dashboard screen
function updateUserDetails() {
    userNameElement.textContent = currentUser.name;
    accountNumberElement.textContent = currentUser.accountNumber;
    balanceElement.textContent = currentUser.balance;
    addressElement.textContent = currentUser.address;
}

// Show dashboard screen after login
function showdashboardscreen() {
    loginScreen.classList.add("hidden");
    dashboardscreen.classList.remove("hidden");
}

// Logout function
function logout() {
    currentUser = null;
    loginScreen.classList.remove("hidden");
    dashboardscreen.classList.add("hidden");
    passwordInput.style.display = "none";
    loginBtn.style.display = "none";
    refresh.style.display = "block";
}

// Event Listeners
loginBtn.addEventListener("click", () => {
    const username = usernameInput.value;
    const password = passwordInput.value;
    login(username, password);
});

logoutBtn.addEventListener("click", logout);


//view-container
function onclick(){
    viewcontainer.style.display = "block";
}
function offclick(){
    viewcontainer.style.display = "none";
}