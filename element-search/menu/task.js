const menuList = document.querySelectorAll(".menu.menu_main");

function showSubMenu(element) {
    element.classList.add("menu_active");
}

function hideSubMenu(element) {
    element.classList.remove("menu_active");
}

function getLinks(rootElement) {
    return Array.from(rootElement.querySelectorAll(".menu__link"));
}

function getSubMenus(rootElement) {
    return Array.from(rootElement.querySelectorAll(".menu_sub"));
}

function checkIsActiveSubMenu(element) {
    return element.classList.contains("menu_active");
}

function closeAnothersSubMenu(mainMenu, currentSubMenu) {
    const subMenus = getSubMenus(mainMenu);
    subMenus.forEach((subMenu) => {
        if (subMenu === currentSubMenu) {
            return;
        }

        if (checkIsActiveSubMenu(subMenu)) {
            hideSubMenu(subMenu);
        }
    });
}

function setLinkHandler(menu, link) {
    const subMenu = link.nextElementSibling;
    if (subMenu) {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            if (checkIsActiveSubMenu(subMenu)) {
                hideSubMenu(subMenu);
            } else {
                showSubMenu(subMenu);
            }
            closeAnothersSubMenu(menu, subMenu);
        });
    }
}

function initMenu(menu) {
    const links = getLinks(menu);
    console.log({ links });
    links.forEach(setLinkHandler.bind(null, menu));

    menu.addEventListener("click", function (e) {
        console.log(this);
    });
}

// init
Array.from(menuList).forEach(initMenu);
