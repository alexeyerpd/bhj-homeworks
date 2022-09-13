const ACTIVE_CLASS = "chat-widget_active";

const chatWidget = document.querySelector(".chat-widget");
const chatWidgetSide = document.querySelector(".chat-widget__side");
const chatWidgetInput = document.getElementById("chat-widget__input");
const chatWidgetMessages = document.getElementById("chat-widget__messages");
const chatWidgetMessagesContainer = document.querySelector(
    ".chat-widget__messages-container"
);

let timeoutId;
let isChatOpen = false;

const state = {
    messagesCount: 0,
    timeoutMessagesCount: 0,
};

const timeoutMessages = ["Прием", "Вы тут?", "А сейчас?", "Хотите денег?"];

const messages = [
    "А не пойти ли вам убрать за мной?!",
    "Добрый день!",
    "Добрый день, мы ещё не проснулись. Позвоните через 10 лет",
    "К сожалению все операторы заняты",
];

function getRobotMsg(type) {
    let { messagesCount, timeoutMessagesCount } = state;
    if (type === "timeout") {
        state.timeoutMessagesCount =
            ++timeoutMessagesCount >= timeoutMessages.length
                ? 0
                : timeoutMessagesCount;
        return timeoutMessages[state.timeoutMessagesCount];
    }

    state.messagesCount =
        ++messagesCount >= messages.length ? 0 : messagesCount;
    return messages[state.messagesCount];
}

function getCurrentTime() {
    return new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });
}

function getTemplate(value, type) {
    const className = type === "client" ? " message_client" : "";
    return `
        <div class="message${className}">
            <div class="message__time">${getCurrentTime()}</div>
            <div class="message__text">${value}</div>
        </div>
    `;
}

function addMessage(type, value) {
    chatWidgetMessages.innerHTML += getTemplate(value, type);
}

const addClientMessage = addMessage.bind(null, "client");
const addRobotMessage = addMessage.bind(null, "");

chatWidgetSide.addEventListener("click", (e) => {
    if (!chatWidget.classList.contains(ACTIVE_CLASS)) {
        chatWidget.classList.add(ACTIVE_CLASS);
        isChatOpen = true;
        startTimer();
    }
});

chatWidgetInput.addEventListener("keydown", ({ target, code }) => {
    if (code === "Enter" && target.value) {
        addClientMessage(target.value);
        scrollToLastComment();
        target.value = "";

        setTimeout(() => {
            addRobotMessage(getRobotMsg());
            scrollToLastComment();
        }, 500);
    }
});

function startTimer() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
        if (!isChatOpen) {
            return;
        }

        addRobotMessage(getRobotMsg("timeout"));
        scrollToLastComment();
        startTimer();
    }, 30 * 1000);
}

function scrollToLastComment() {
    chatWidgetMessagesContainer.scrollTop =
        chatWidgetMessagesContainer.scrollHeight;
}

chatWidgetInput.addEventListener("input", () => {
    startTimer();
});
