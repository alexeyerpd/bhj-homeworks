const signin = document.getElementById("signin");
const form = document.getElementById("signin__form");
const welcomeEl = document.getElementById("welcome");
const userIdEl = document.getElementById("user_id");
const errorBlock = document.getElementById("error");
const logoutBtn = document.querySelector(".logout");

function setLoginInLS(value) {
    localStorage.setItem("login", value);
}

function getLoginFromLS() {
    return localStorage.getItem("login");
}

function hasEmptyValue(values = []) {
    return values.some((value) => !value);
}

function hasError() {
    return !!errorBlock.textContent;
}

function setError(text) {
    errorBlock.textContent = text;
}

function clearError() {
    errorBlock.textContent = "";
}

function showWelcome() {
    signin.classList.remove("signin_active");
    welcomeEl.classList.add("welcome_active");
    userIdEl.textContent = getLoginFromLS();
}

function onSuccess(userId) {
    setLoginInLS(userId);
    showWelcome();
}

function authController(e) {
    try {
        const response = JSON.parse(e.target.response);
        if (response.success) {
            onSuccess(response.user_id);
        } else {
            setError("Неверный логин/пароль");
        }
    } catch {
        setError("Ошибка сервера");
    }
}

function auth(fd, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://netology-slow-rest.herokuapp.com/auth.php");
    xhr.addEventListener("error", (e) => {
        setError("Error");
    });
    xhr.addEventListener("load", authController);
    xhr.addEventListener("loadend", () => cb());
    xhr.send(fd);
}

form.addEventListener("input", () => {
    if (hasError()) {
        clearError();
    }
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const values = [...fd.values()];

    if (hasEmptyValue(values)) {
        setError("Введите логин и пароль.");
        e.target.reset();
        return;
    }

    auth(fd, () => {
        e.target.reset();
    });
});

logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("login");
    welcomeEl.classList.remove("welcome_active");
    signin.classList.add("signin_active");
});

function init() {
    const login = getLoginFromLS();

    if (typeof login !== "undefined" && login !== null) {
        showWelcome();
    }
}

init();
