const modal = document.getElementById("subscribe-modal");
const modalClose = document.querySelector(".modal__close ");

function setCookie(name, value, expires = 2 * 60 * 1000) {
    document.cookie = `${name}=${encodeURIComponent(value)}; Expires=${new Date(
        Date.now() + expires
    ).toUTCString()}`;
}

function getCookie(name) {
    const pairs = document.cookie.split('; ');
    const pair = pairs.find(pair => pair.startsWith(`${name}=`)) || '';
    return pair.substring(name.length + 1);
}

modalClose.addEventListener("click", () => {
    modal.classList.remove("modal_active");
    setCookie('wasShowModal', true)
});

function init() {
    if (!getCookie('wasShowModal')) {
        modal.classList.add("modal_active");
    }
}

init();
