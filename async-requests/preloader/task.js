const currenciesEl = document.getElementById("items");

function setResponseInLS(response) {
    localStorage.setItem("data", response);
}

function getResponseFromLS() {
    try {
        return JSON.parse(localStorage.getItem("data"));
    } catch {
        return {};
    }
}

function createСurrency(valute) {
    return `
    <div class="item">
        <div class="item__code">${valute.CharCode}</div>
        <div class="item__value">${valute.Value}</div>
        <div class="item__currency">руб.</div>
    </div>
    `;
}

function renderCurrencies(valutes) {
    let result = "";

    Object.values(valutes).forEach((valute) => {
        result += createСurrency(valute);
    });

    const wrap = currenciesEl.cloneNode();
    wrap.insertAdjacentHTML("beforeend", result);
    currenciesEl.replaceWith(wrap);
}

function getCurrencies() {
    const xhr = new XMLHttpRequest();

    // xhr.withCredentials = true;

    xhr.open("GET", "https://netology-slow-rest.herokuapp.com");

    xhr.addEventListener("error", (e) => {
        console.error(e);
    });

    xhr.addEventListener("load", ({ target }) => {
        setResponseInLS(target.response);
        const data = JSON.parse(target.response);

        renderCurrencies(data.response.Valute);
    });

    xhr.addEventListener("loadend", () => {
        document.getElementById("loader").classList.remove("loader_active");
    });

    xhr.send();
}

function init() {
    const lsData = getResponseFromLS();
    if (lsData.response) {
        renderCurrencies(lsData.response.Valute);
        document.getElementById("loader").classList.remove("loader_active");
    }

    getCurrencies();
}

init();
