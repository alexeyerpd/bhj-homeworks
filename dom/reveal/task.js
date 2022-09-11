const ACTIVE_CLASS = "reveal_active";

const reveals = [...document.querySelectorAll(".reveal")];

function onScroll() {
    reveals.forEach(checkElement);
}

function checkElement(elem) {
    const elemData = elem.getBoundingClientRect();

    if (isVisible(elemData)) {
        if (!elem.classList.contains(ACTIVE_CLASS)) {
            elem.classList.add(ACTIVE_CLASS);
        }
        return;
    }

    if (elem.classList.contains(ACTIVE_CLASS)) {
        elem.classList.remove(ACTIVE_CLASS);
    }
}

function isVisible(elemData) {
    const { top, bottom } = elemData;

    if (bottom < 0) {
        return false;
    }
    if (top > window.innerHeight) {
        return false;
    }
    return true;
}

window.addEventListener("scroll", onScroll);
