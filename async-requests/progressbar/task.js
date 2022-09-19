const progress = document.getElementById("progress");
const form = document.getElementById("form");
const statusEl = document.querySelector(".status");
const inputEl = document.getElementById("file");

function setStatus(text, type = "success") {
    statusEl.classList.add(`status_${type}`);
    statusEl.textContent = text;
}

function clearStatus() {
    statusEl.classList.remove("status_success", "status__error");
    statusEl.textContent = "";
}

function sendFormData(data) {
    const xhr = new XMLHttpRequest();

    xhr.open("POST", "https://netology-slow-rest.herokuapp.com/upload.php");

    xhr.addEventListener("error", (e) => {
        console.error(e);
    });

    xhr.upload.addEventListener("progress", (e) => {
        progress.value = e.loaded / e.total;
    });

    xhr.upload.addEventListener("loadend", (e) => {
        setStatus("Файл успешно отправлен");
    });

    xhr.upload.addEventListener("error", (e) => {
        setStatus("Не удалось отправить файл");
    });

    xhr.send(data);
}

inputEl.addEventListener("change", () => {
    clearStatus();
    progress.value = 0;
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const file = inputEl.files[0];
    if (!file) {
        return;
    }
    sendFormData(file);
});
