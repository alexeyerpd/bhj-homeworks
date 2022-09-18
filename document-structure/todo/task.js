const form = document.getElementById("tasks__form");
const tasksList = document.getElementById("tasks__list");
const input = document.getElementById("task__input");
const btnSend = document.getElementById("tasks__add");

function createTaskHTML(text) {
    return `
        <div class="task">
            <div class="task__title">${text}</div>
            <a href="#" class="task__remove">&times;</a>
        </div>
    `;
}

function clearInputValue() {
    input.value = "";
}

function insertTask(text) {
    tasksList.insertAdjacentHTML("beforeend", createTaskHTML(text));
}

function getTasksFromLS() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function addTaskToLS(value) {
    const tasks = getTasksFromLS();
    tasks.push(value);

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTaskFromLS(value) {
    const newTasks = getTasksFromLS().filter((task) => task !== value);

    localStorage.setItem("tasks", JSON.stringify(newTasks));
}

function onCreateTask(input) {
    const value = input.value;
    if (value) {
        insertTask(value);
        clearInputValue();

        addTaskToLS(value);
    }
}

function onRemove(e) {
    if (e.target.classList.contains("task__remove")) {
        e.preventDefault();

        const task = e.target.closest(".task");
        const value = task.firstElementChild.textContent;

        removeTaskFromLS(value);
        task.remove();
    }
}

function initTaskList() {
    const tasksFromLS = getTasksFromLS();

    if (tasksFromLS?.length) {
        for (const task of tasksFromLS) {
            insertTask(task);
        }
    }
}

tasksList.addEventListener("click", onRemove);

btnSend.addEventListener("click", (e) => {
    e.preventDefault();
    onCreateTask(input);
});

form.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
        e.preventDefault();
        onCreateTask(e.target);
    }
});

initTaskList();
