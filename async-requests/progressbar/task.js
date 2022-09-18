const progress = document.getElementById("progress");
const form = document.getElementById("form");

function sendFormData(data) {
    const xhr = new XMLHttpRequest();

    xhr.open("POST", "https://netology-slow-rest.herokuapp.com/upload.php");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.addEventListener("error", (e) => {
        console.error(e);
    });

    xhr.addEventListener("progress", (e) => {
        progress.value = e.loaded / 100e6; // по идее total не должен = 0
    });

    xhr.send(data);
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fd = new FormData(e.target);
    sendFormData(fd);
});
