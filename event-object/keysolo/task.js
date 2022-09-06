const systemCodes = [
    "ShiftLeft",
    "ShiftRight",
    "ControlLeft",
    "ControlRight",
    "AltLeft",
    "AltRight",
    "Meta",
];

const valideSymbols = ["Period", "Backquote", "Space", "Comma"];

const regExp = /[a-zа-яё ]/i;

class Game {
    constructor(container) {
        this.container = container;
        this.wordElement = container.querySelector(".word");
        this.winsElement = container.querySelector(".status__wins");
        this.lossElement = container.querySelector(".status__loss");
        this.timerElement = container.querySelector(".status__timer");

        this.handleKeyDown = this.handleKeyDown.bind(this);

        this.intervalId = null;
        this.state = {
            maxTime: 0,
        };

        this.reset();

        this.registerEvents();
    }

    reset() {
        this.resetTimer();
        this.setNewWord();
        this.winsElement.textContent = 0;
        this.lossElement.textContent = 0;
        this.state.maxTime = 0;
    }

    checkIsValidSymbolByKey(key) {
        return regExp.test(key);
    }

    checkIsSystemCode(code) {
        return systemCodes.includes(code);
    }

    getCurrentSymbol() {
        return this.currentSymbol.textContent.toLowerCase();
    }

    handleKeyDown({ code, key }) {
        if (this.checkIsSystemCode(code)) {
            return;
        }

        if (!this.checkIsValidSymbolByKey(key)) {
            this.fail();
            return;
        }

        const currentSymbol = this.getCurrentSymbol();
        const comparedValue = key.toLowerCase();
        if (currentSymbol === comparedValue) {
            this.success();
        } else {
            this.fail();
        }
    }

    registerEvents() {
        window.addEventListener("keydown", this.handleKeyDown);
    }

    success() {
        this.currentSymbol.classList.add("symbol_correct");
        this.currentSymbol = this.currentSymbol.nextElementSibling;
        if (this.currentSymbol !== null) {
            return;
        }

        if (++this.winsElement.textContent === 10) {
            alert("Победа!");
            this.reset();
        }
        this.setNewWord();
    }

    fail() {
        if (++this.lossElement.textContent === 5) {
            alert("Вы проиграли!");
            this.reset();
        }
        this.setNewWord();
    }

    setNewWord() {
        const word = this.getWord();

        this.setTime(word);
        this.renderWord(word);
        this.startTimer();
    }

    getWord() {
        const words = [
                "bob",
                "awesome",
                "netology",
                "hello",
                "kitty",
                "rock",
                "youtube",
                "popcorn",
                "cinema",
                "друг",
                "love",
                "javascript",
                "я люблю kitkat",
            ],
            index = Math.floor(Math.random() * words.length);

        return words[index];
    }

    renderWord(word) {
        const html = [...word]
            .map(
                (s, i) =>
                    `<span class="symbol ${
                        i === 0 ? "symbol_current" : ""
                    }">${s}</span>`
            )
            .join("");
        this.wordElement.innerHTML = html;

        this.currentSymbol = this.wordElement.querySelector(".symbol_current");
    }

    setTime(word = "") {
        this.timerElement.textContent = this.state.maxTime =
            word.length - 1 || 0;
    }

    resetTimer() {
        this.timerElement.textContent = 0;
    }

    startTimer() {
        clearInterval(this.intervalId);
        this.intervalId = setInterval(this.tick.bind(this), 1000);
    }

    tick() {
        const time = --this.timerElement.textContent;
        this.timerElement.textContent = time >= 0 ? time : 0;
        if (time < 0) {
            this.fail();
        }
    }
}

new Game(document.getElementById("game"));
