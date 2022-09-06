const modalMain = document.getElementById("modal_main");
const modalSuccess = document.getElementById("modal_success");

const btnsClose = document.getElementsByClassName("modal__close");

const btnDanger = document.querySelector(".btn_danger");
const btnSuccess = document.querySelector(".btn_success");

const modals = {
    main: modalMain,
    success: modalSuccess,
};

function hideModal(element) {
    element.classList.remove("modal_active");
}

function showModal(element) {
    element.classList.add("modal_active");
}

function onBtnDangerClick(e) {
    e.preventDefault();
    hideModal(modals.main);
    showModal(modals.success);
}

function onBtnSuccessClick(e) {
    e.preventDefault();
    onBtnClose(e);
}

function onBtnClose({ target }) {
    const modal = target.closest(".modal");
    hideModal(modal);
}

btnDanger.addEventListener("click", onBtnDangerClick);
btnSuccess.addEventListener("click", onBtnSuccessClick);
Array.from(btnsClose).forEach((elem) =>
    elem.addEventListener("click", onBtnClose)
);

showModal(modals.main);
