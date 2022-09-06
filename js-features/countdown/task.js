const timer = document.getElementById("timer");
const download = document.getElementById("download");

const initialTimerValue = timer.textContent;
timer.textContent = getFormattedValue(Number(initialTimerValue) || 0);

function runTimer() {
    const calcValue = parseString(timer.textContent) - 1;

    if (calcValue >= 0) {
        timer.textContent = getFormattedValue(calcValue);
    }

    if (calcValue <= 0) {
        // setTimeout(() => {
        //     // alert('Вы победили в конкурсе!');
        // }, 1);
        window.open("./task.css", "_blank");
        clearInterval(intervalId);

        // Пробовал window.location.assign() с разными урлами, несуществующими типами расширейний, просто открывается урл и все
        // через <a> пробовал, открывается ссылка, но скачивания не происходит
    }
}

const intervalId = setInterval(runTimer, 1000);

function parseString(str = "00:00:00") {
    const [hh, mm, ss] = str.split(":").map(Number);
    return ss + mm * 60 + hh * 60 * 60;
}

function getFormattedValue(seconds = 0) {
    const date = new Date(2022, 0, 0, 0, 0, seconds);
    return date.toLocaleTimeString();
}
