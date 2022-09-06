const DROPDOWN_ACTIVE = "dropdown__list_active";

function checkIsActive(element, className) {
    return element.classList.contains(className);
}

function setActive(element, className) {
    element.classList.add(className);
}

function resetActive(element, className) {
    element.classList.remove(className);
}

function setValue(toElem, fromElem) {
    if (!fromElem || !toElem) {
        return;
    }
    toElem.textContent = fromElem.textContent.trim();
}

function initDropdown(dropdown) {
    const dropdownValue = dropdown.querySelector(".dropdown__value");
    const dropdownList = dropdown.querySelector(".dropdown__list");

    dropdownList.addEventListener("click", function (e) {
        e.preventDefault();
        setValue(dropdownValue, e.target);
        resetActive(dropdownList, DROPDOWN_ACTIVE);
    });

    dropdownValue.addEventListener("click", function (e) {
        if (checkIsActive(dropdownList, DROPDOWN_ACTIVE)) {
            resetActive(dropdownList, DROPDOWN_ACTIVE);
        } else {
            setActive(dropdownList, DROPDOWN_ACTIVE);
        }
    });
}

function run() {
    const dropdowns = document.querySelectorAll(".dropdown");
    [...dropdowns].forEach(initDropdown);
}

run();
