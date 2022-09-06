const tabs = document.querySelectorAll(".tabs");

const activeClasses = {
    tab: "tab_active",
    tabContent: "tab__content_active",
};

function checkIsActive(element, className) {
    return element.classList.contains(className);
}

function setActive(element, className) {
    element.classList.add(className);
}

function resetActive(element, className) {
    element.classList.remove(className);
}

function resetAllActive(elements, className) {
    elements.forEach((element) => {
        resetActive(element, className);
    });
}

function handleTabClick(navigationTabs, contentTabs) {
    const target = this;
    const index = target.dataset.index;

    if (checkIsActive(target, activeClasses.tab)) {
        return;
    }

    resetAllActive(navigationTabs, activeClasses.tab);
    resetAllActive(contentTabs, activeClasses.tabContent);
    setActive(target, activeClasses.tab);
    setActive(contentTabs[index], activeClasses.tabContent);
}

function registerTab(navigationTabs, contentTabs, tab, i) {
    tab.dataset.index = i;
    tab.addEventListener(
        "click",
        handleTabClick.bind(tab, navigationTabs, contentTabs)
    );
}

function initTab(tab) {
    const navigationTabs = Array.from(tab.querySelectorAll(".tab"));
    const contentTabs = Array.from(tab.querySelectorAll(".tab__content"));

    navigationTabs.forEach(registerTab.bind(null, navigationTabs, contentTabs));
}

function run(tabs) {
    [...tabs].forEach(initTab);
}

run(tabs);
