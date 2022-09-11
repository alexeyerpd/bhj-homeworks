const ACTIVE_CLASS = "rotator__case_active";
const rotators = [...document.querySelectorAll(".rotator")];

function getNormalizedCase(elem) {
    return {
        element: elem,
        speed: Number(elem.dataset.speed) || 0,
        color: elem.dataset.color,
    };
}

function next(state) {
    state.currentIndex += 1;
}

function tick(cases, state) {
    const { currentIndex, maxIndex } = state;
    cases[currentIndex - 1]?.element.classList.remove(ACTIVE_CLASS);

    if (currentIndex > maxIndex) {
        return;
    }

    const { element, speed } = cases[currentIndex];

    element.classList.add(ACTIVE_CLASS);

    next(state);
    setTimeout(tick, speed, cases, state);
}

function runInterval(normalizedCases, maxIndex) {
    const state = { currentIndex: 0, maxIndex };
    tick(normalizedCases, state);
}

function removeActiveClass({ element }) {
    if (element.classList.contains(ACTIVE_CLASS)) {
        element.classList.remove(ACTIVE_CLASS);
    }
}

function setDataColor({ element, color }) {
    element.style.color = color;
}

function runRotator(rotator) {
    const cases = [...rotator.querySelectorAll(".rotator__case")];

    const normalizedCases = cases.map(getNormalizedCase);

    normalizedCases.map((item) => {
        removeActiveClass(item);
        setDataColor(item);
    });

    // +100мс = +- задержка на выпонление кода
    const fullDelay = normalizedCases.reduce(
        (acc, item) => item.speed + acc,
        100
    );

    const maxIndex = cases.length - 1;

    setTimeout(runInterval, 0, normalizedCases, maxIndex);
    setInterval(runInterval, fullDelay, normalizedCases, maxIndex);
}

rotators.forEach(runRotator);
