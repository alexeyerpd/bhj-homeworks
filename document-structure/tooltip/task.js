const links = [...document.querySelectorAll(".has-tooltip")];

function createTooltip(elem) {
    const title = elem.getAttribute("title");
    const tooltip = document.createElement("div");
    tooltip.classList.add("tooltip", "tooltip_active");
    tooltip.textContent = title;

    return tooltip;
}

function deleteTooltips() {
    const tooltips = [...document.querySelectorAll(".tooltip")];
    const links = [...document.querySelectorAll("a[data-active]")];
    tooltips.forEach((tooltip) => tooltip.remove());
    links.forEach((link) => delete link.dataset.active);
}

function getValidDirection(refData, tooltipData, position) {
    const tH = tooltipData.height;
    const tW = tooltipData.width;
    const strict = {
        height: window.outerHeight,
        width: document.body.clientWidth,
    };

    if (position === "top" || position === "bottom") {
        return {
            top: refData.top - tH > 0,
            left: refData.left - tW > 0,
            right: refData.right + tW < strict.width,
            bottom: refData.bottom + tH < strict.height,
        };
    } else {
        return {
            top: refData.top + tH < strict.height,
            left: refData.left - tW > 0,
            right: refData.right + tW < strict.width,
            bottom: refData.bottom - tH > 0,
        };
    }
}

function getSecondPosition(mainPosition) {
    if (mainPosition === "top" || mainPosition === "bottom") {
        return "left";
    }
    return "top";
}

const reverse = {
    top: "bottom",
    bottom: "top",
    left: "right",
    right: "left",
};

function getResultPosition(validDirection, position) {
    return validDirection[position] ? position : reverse[position];
}

function getTopCoord(position, refData, tooltipData) {
    const tH = tooltipData.height;
    const tW = tooltipData.width;
    switch (position) {
        case "top":
            return refData.top - tH;
        case "bottom":
            return refData.bottom;
        case "left":
            return refData.left - tW;
        case "right":
            return refData.right;
        default:
            return 0;
    }
}

function getLeftCoord(position, refData, tooltipData) {
    const tH = tooltipData.height;
    const tW = tooltipData.width;
    switch (position) {
        case "top":
            return refData.top;
        case "bottom":
            return refData.bottom - tH;
        case "left":
            return refData.left;
        case "right":
            return refData.right - tW;
        default:
            return 0;
    }
}

function getPosition(mainPosition, validDirection, refData, tooltipData) {
    const result = [];
    const secondPosition = getSecondPosition(mainPosition);

    const resMainPosition = getResultPosition(validDirection, mainPosition);
    const resSecondPosition = getResultPosition(validDirection, secondPosition);

    if (mainPosition === "top" || mainPosition === "bottom") {
        result.push(getTopCoord(resMainPosition, refData, tooltipData));
        result.push(getLeftCoord(resSecondPosition, refData, tooltipData));
    } else {
        result.push(getLeftCoord(resSecondPosition, refData, tooltipData));
        result.push(getTopCoord(resMainPosition, refData, tooltipData));
    }

    return result;
}

function setPosition(ref, tooltip) {
    const refData = ref.getBoundingClientRect();
    const tooltipData = tooltip.getBoundingClientRect();
    const position = ref.dataset.position;

    const validDirection = getValidDirection(refData, tooltipData, position);

    const [top, left] = getPosition(
        position,
        validDirection,
        refData,
        tooltipData
    );

    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;
}

function insert(target) {
    const tooltip = createTooltip(target);
    document.body.appendChild(tooltip);

    setPosition(target, tooltip);
}

links.forEach((link) => {
    link.addEventListener("click", function (event) {
        event.preventDefault();

        if (this.dataset.active) {
            deleteTooltips();
            return;
        }
        deleteTooltips();

        insert(this);
        this.dataset.active = true;
    });
});
