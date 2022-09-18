const pollTitle = document.getElementById("poll__title");
const pollAnswers = document.getElementById("poll__answers");

function createAnswer(text, id, idx) {
    const btn = document.createElement("button");
    btn.className = "poll__answer";
    btn.textContent = text;

    btn.dataset.id = id;
    btn.dataset.idx = idx;

    return btn;
}

function insertAnswers(answers, id) {
    answers.forEach((answer, idx) => {
        pollAnswers.appendChild(createAnswer(answer, id, idx));
    });
}

function insertPoll(response) {
    pollTitle.textContent = response.data.title;
    insertAnswers(response.data.answers, response.id);
}

function prepareData(stats) {
    const allVotes = stats.reduce((sum, item) => item.votes + sum, 0);
    return stats.map((stat) => ({
        ...stat,
        fraction: ((stat.votes / allVotes) * 100).toFixed(2),
    }));
}

function createPollResultItem(data) {
    const div = document.createElement("div");
    const span = document.createElement("span");
    const b = document.createElement("b");

    span.textContent = `${data.answer}: `;
    b.textContent = `${data.fraction}%`;

    div.appendChild(span);
    div.appendChild(b);

    return div;
}

function insertPollResult(stats) {
    const preparedData = prepareData(stats);
    const div = document.createElement("div");

    for (const data of preparedData) {
        div.appendChild(createPollResultItem(data));
    }

    pollAnswers.replaceChildren(div);
}

function getPoll() {
    const xhr = new XMLHttpRequest();

    // xhr.withCredentials = true;

    xhr.open("GET", "https://netology-slow-rest.herokuapp.com/poll.php");

    xhr.addEventListener("error", (e) => {
        console.error(e);
    });

    xhr.addEventListener("load", ({ target }) => {
        const response = JSON.parse(target.response);
        insertPoll(response);
    });

    xhr.send();
}

function sendAnswer(id, idx) {
    const xhr = new XMLHttpRequest();

    // xhr.withCredentials = true;

    xhr.open("POST", "https://netology-slow-rest.herokuapp.com/poll.php");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.addEventListener("error", (e) => {
        console.error(e);
    });

    xhr.addEventListener("load", ({ target }) => {
        const response = JSON.parse(target.response);
        insertPollResult(response.stat);
    });

    xhr.send(`vote=${id}&answer=${idx}`);
}

function pollAnswersController(e) {
    const elem = e.target;
    if (elem.classList.contains("poll__answer")) {
        sendAnswer(elem.dataset.id, elem.dataset.idx);
        alert("Спасибо, ваш голос засчитан!");
    }
}

function init() {
    pollAnswers.addEventListener("click", pollAnswersController);
    getPoll();
}

init();
