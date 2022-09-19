const textarea = document.getElementById("editor");
const btnClear = document.getElementById("clear");

function setEditorValueInLS(value) {
    localStorage.setItem("editor", value);
}

function getEditorValueFromLS() {
    return localStorage.getItem("editor");
}

textarea.addEventListener("input", (e) => {
    setEditorValueInLS(e.target.value);
});

btnClear.addEventListener("click", () => {
    textarea.value = "";
    setEditorValueInLS("");
});

function init() {
    const storedValue = getEditorValueFromLS();
    if (storedValue) {
        textarea.value = storedValue;
    }
}

init();
