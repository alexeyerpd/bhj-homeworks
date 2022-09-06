const cookie = document.getElementById('cookie');
const counter = document.getElementById('clicker__counter');
const speed = document.getElementById('clicker__speed');

const DELTA = 10;

const sum = (a, b) => a + b;
const sub = (a, b) => a - b;

const operations = {
    'inc': sum,
    'dec': sub,
}

function toggleDirection(state) {
    state.direction = state.direction === 'inc' ? 'dec' : 'inc';
}

function getCounterValue() {
    return Number(counter.textContent) || 0;
}

function setElementSize(element, value, direction) {
    element.width = operations[direction](Number(element.width), value);
    element.height = operations[direction](Number(element.height), value);
}

function setSpeed(value, digits = 2) {
    speed.textContent = value.toFixed(digits);
}

const state = {
    direction: 'inc',
    startAt: Date.now(),
    endAt: null,
}

function updateSpeed() {
    state.endAt = Date.now();
    const deltaTime = state.endAt - state.startAt;

    if (deltaTime === 0) {
        return;
    }

    const speed = getCounterValue() / (deltaTime) * 1000; // в секунду
    setSpeed(speed);
}

cookie.onclick = function() {
    counter.textContent = getCounterValue() + 1;
    
    setElementSize(cookie, DELTA, state.direction);
    toggleDirection(state);
    updateSpeed();
}
