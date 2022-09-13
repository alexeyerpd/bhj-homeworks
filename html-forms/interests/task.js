const interestsMain = document.querySelector(".interests_main");

function getSelector(isChecked) {
    return `.interest__check${isChecked ? ":checked" : ""}`;
}

function getControlWrap(control) {
    return control?.parentElement?.closest(".interest");
}

function getControl(control, isChecked) {
    return control?.querySelector(getSelector(isChecked));
}

function getNearestNode(control) {
    return control.querySelector(".interest");
}

function getParentControl(control) {
    const currentControlWrap = getControlWrap(control);
    return getControl(getControlWrap(currentControlWrap));
}

function getParentControls(control, isChecked) {
    const controls = [];

    let findedControl;
    let next = getParentControl(control);
    while (next) {
        if (next.classList.contains("interest")) {
            findedControl = getControl(next, isChecked);
            findedControl && controls.push(findedControl);
        } else if (next.classList.contains("interest__check")) {
            controls.push(next);
        }
        next = getControlWrap(next);
    }

    return controls;
}

function getSiblingControls(control, isChecked) {
    const controls = [control];

    let findedControl;
    let next = getControlWrap(control)?.nextElementSibling;
    while (next) {
        if (next.classList.contains("interest")) {
            findedControl = getControl(next, isChecked);
            findedControl && controls.push(findedControl);
        }
        next = next.nextElementSibling;
    }

    let prev = getControlWrap(control)?.previousElementSibling;
    while (prev) {
        if (prev.classList.contains("interest")) {
            findedControl = getControl(prev, isChecked);
            findedControl && controls.push(findedControl);
        }
        prev = prev.previousElementSibling;
    }

    return controls;
}

function getChildrenControls(control, isChecked) {
    const selector = `.interest__check${isChecked ? ":checked" : ""}`;

    return [...getControlWrap(control).querySelectorAll(selector)].filter(
        (resControl) => resControl !== control
    );
}

function areEqualToValue(key, value, mode, ...controls) {
    let target = controls.flat().filter(Boolean);

    if (!mode || !['every', 'some'].includes(mode)) {
        throw new Error('Incorrect mode');
    }

    if (!target.length) {
        return false;
    }
    return target[mode]((control) => control[key] === value);
}
const areCheckboxEqualToValue = areEqualToValue.bind(null, 'checked');
const areIndeterminateEqualToValue = areEqualToValue.bind(null, 'indeterminate');

function setValue(key, value, ...controls) {
    let target = controls.flat().filter(Boolean);
    return target.map((item) => (item[key] = value));
}
const setCheckboxValue = setValue.bind(null, 'checked');
const setIndeterminateValue = setValue.bind(null, 'indeterminate');


function processingControl(control) {
    if (!control) {
        return;
    }

    const parent = getParentControl(control);
    const parents = getParentControls(control)
    const sibling = getSiblingControls(control)
    const children = getChildrenControls(control)

    const isChecked = control.checked;
    const isIndeterminate = control.indeterminate;
    if (isChecked) {
        setCheckboxValue(true, children);
        setIndeterminateValue(false, children);
        const isCheckedAllSiblings = areCheckboxEqualToValue(true, 'every', control, sibling);

        if (!isCheckedAllSiblings) {
            setIndeterminateValue(true, parents);
            return;
        }

        setCheckboxValue(true, parent);
        setIndeterminateValue(false, parent);
    } else {
        if (!isIndeterminate) {
            setCheckboxValue(false, children);
            setIndeterminateValue(false, children);
        }

        const isUnCheckedAllSiblings = areCheckboxEqualToValue(false, 'every', control, sibling);
        const hasCheckedSiblings = areCheckboxEqualToValue(false, 'some', control, sibling);
        const hasIndeterminateSiblings = areIndeterminateEqualToValue(true, 'some', control, sibling);
 
        if (isUnCheckedAllSiblings && !isIndeterminate && !hasIndeterminateSiblings) {
            setIndeterminateValue(false, sibling);
            setCheckboxValue(false, parent);
            setIndeterminateValue(false, parent);
        } else if (hasCheckedSiblings) {
            setCheckboxValue(false, parent);
            setIndeterminateValue(true, parent);
        }
    }
    processingControl(parent);
}

function onControlClick({ target: control }) {
    if (control.tagName !== "INPUT") {
        return;
    }
    processingControl(control);
}

function initCheckboxTree(root) {
    root.addEventListener("click", onControlClick);
}

initCheckboxTree(interestsMain);
