const book = document.getElementById("book");

const state = {
    "book__control_font-size": "",
    book__control_color: "",
    book__control_background: "",
};

const settings = {
    "book__control_font-size": {
        attrName: "size",
        prefix: "book_fs-",
        activeClass: "font-size_active",
    },
    book__control_color: {
        attrName: "textColor",
        prefix: "book_color-",
        activeClass: "color_active",
    },
    book__control_background: {
        attrName: "bgColor",
        prefix: "book_bg-",
        activeClass: "color_active",
    },
};

function updateBookStyle(controlName, newValue) {
    console.log(state[controlName]);
    if (state[controlName]) {
        book.classList.remove(state[controlName]);
    }
    if (newValue) {
        book.classList.add(newValue);
    }
}

function removeActiveClass(activeClass, elem) {
    elem.classList.remove(activeClass);
}

function getAttrValue(elem, attrName, prefix) {
    const dsValue = elem.dataset[attrName];
    return dsValue ? `${prefix}${dsValue}` : "";
}

function setStateAndUpdateBook(elem, controlName, attrName, prefix) {
    const value = getAttrValue(elem, attrName, prefix);
    updateBookStyle(controlName, value);
    state[controlName] = value;
}

function action(elem, controlName, options, { attrName, prefix, activeClass }) {
    if (elem.tagName !== "A") {
        return;
    }

    if (elem.classList.contains(activeClass)) {
        return;
    }

    options.forEach(removeActiveClass.bind(null, activeClass));
    elem.classList.add(activeClass);

    setStateAndUpdateBook(elem, controlName, attrName, prefix);
}

function initialSetState(
    controlName,
    { attrName, prefix, activeClass },
    option
) {
    if (option.classList.contains(activeClass)) {
        setStateAndUpdateBook(option, controlName, attrName, prefix);
    }
}

function activateControl(controlEl) {
    const options = [...controlEl.querySelectorAll("a")];

    const controlName = controlEl.classList[1];

    const setting = settings[controlName];

    options.forEach(initialSetState.bind(null, controlName, setting));

    controlEl.addEventListener("click", function (e) {
        e.preventDefault();
        action(e.target, controlName, options, setting);
    });
}

function init() {
    const controls = [...document.querySelectorAll(".book__control")];
    controls.forEach(activateControl);
}

init();
