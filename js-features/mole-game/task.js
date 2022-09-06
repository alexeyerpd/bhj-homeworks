const field = document.querySelector(".hole-game");
const message = document.querySelector(".message");
const games = document.getElementById("games");
const win = document.getElementById("win");
const lose = document.getElementById("lose");
const dead = document.getElementById("dead");
const lost = document.getElementById("lost");

const GAME_CONDITION = {
    dead: 10,
    lost: 5,
    maxLose: 5,
};

const state = {
    games: 0,
    win: 0,
    lose: 0,
};

function removeHolesId() {
    const holes = document.querySelectorAll(".hole");
    holes.forEach((item) => (item.id = ""));
}

function incElemValue(element) {
    element.textContent = Number(element.textContent) + 1;
}

function getElemNumValue(element) {
    return Number(element.textContent);
}

function resetRound() {
    dead.textContent = 0;
    lost.textContent = 0;
}

function checkIsWin(deadCount) {
    return deadCount === GAME_CONDITION.dead;
}

function getText(isWin) {
    return isWin ? "Вы победили!" : "Вы проиграли!";
}

function updateState(isWin) {
    state.games += 1;
    if (isWin) {
        state.win += 1;
    } else {
        state.lose += 1;
    }
}

function updateGameInfo() {
    games.textContent = state.games;
    win.textContent = state.win;
    lose.textContent = state.lose;
}

function showError() {
    message.classList.remove("message_hidden");
}

function checkClick() {
    const deadCount = getElemNumValue(dead);
    const lostCount = getElemNumValue(lost);

    if (deadCount < GAME_CONDITION.dead && lostCount < GAME_CONDITION.lost) {
        return;
    }

    const isWin = checkIsWin(deadCount);
    const text = getText(isWin);
    setTimeout(() => {
        alert(text);
        updateState(isWin);
        updateGameInfo();
        resetRound();

        if (checkIsTheLose()) {
            showError();
            removeHolesId();
        }
    }, 1);
}

function checkIsTheLose() {
    return state.lose >= GAME_CONDITION.maxLose;
}

field.onclick = function (e) {
    if (checkIsTheLose()) {
        return;
    }

    if (e.target.classList.contains("hole_has-mole")) {
        incElemValue(dead);
    } else {
        incElemValue(lost);
    }
    checkClick();
};
