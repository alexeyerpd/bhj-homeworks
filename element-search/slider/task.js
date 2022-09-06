const utils = {
    inc: (v) => v + 1,
    dec: (v) => v - 1,
    activeClasses: {
        slide: "slider__item_active",
        dot: "slider__dot_active",
    },
};

class Slider {
    constructor(slider) {
        this.slider = slider;
        this.sliderItemsElem = slider.querySelector(".slider__items");
        this.sliderArrowsElem = slider.querySelector(".slider__arrows");
        this.sliderDotsElem = slider.querySelector(".slider__dots");

        this.sliderItems = Array.from(
            this.sliderItemsElem.querySelectorAll(".slider__item")
        );
        this.sliderDots = Array.from(
            this.sliderDotsElem.querySelectorAll(".slider__dot")
        );

        this.btnPrev = this.sliderArrowsElem.querySelector(
            ".slider__arrow_prev"
        );
        this.btnNext = this.sliderArrowsElem.querySelector(
            ".slider__arrow_next"
        );
        this.onPrevSlide = this.onPrevSlide.bind(this);
        this.onNextSlide = this.onNextSlide.bind(this);
        this.setSlide = this.setSlide.bind(this);

        this.state = {
            current: 0,
            prev: null,
            slidesLength: this.sliderItems.length,
        };
    }

    setActive(item, className) {
        item.classList.add(className);
    }

    resetActive(item, className) {
        item.classList.remove(className);
    }

    checkIsActive(item, className) {
        return item.classList.contains(className);
    }

    getInitialIndex(items) {
        const index = items.findIndex((item) =>
            this.checkIsActive(item, utils.activeClasses.slide)
        );
        return index !== -1 ? index : 0;
    }

    calculateNextIndex(fn) {
        let index = fn(this.state.current);
        const maxIndex = this.state.slidesLength - 1;
        if (index < 0) {
            index = maxIndex;
        } else if (index > maxIndex) {
            index = 0;
        }
        return index;
    }

    setSlide(e) {
        const state = this.state;

        const newIndex = Number(e.target.dataset.index);

        if (state.current === newIndex) {
            return;
        }

        [state.prev, state.current] = [state.current, newIndex];
        this.update();
    }

    onPrevSlide() {
        const state = this.state;
        const nextIndex = this.calculateNextIndex(utils.dec);

        [state.prev, state.current] = [state.current, nextIndex];
        this.update();
    }

    onNextSlide() {
        const state = this.state;
        const nextIndex = this.calculateNextIndex(utils.inc);

        [state.prev, state.current] = [state.current, nextIndex];
        this.update();
    }

    setBtnsHander() {
        this.btnPrev.addEventListener("click", this.onPrevSlide);
        this.btnNext.addEventListener("click", this.onNextSlide);
    }

    setDotsHandler() {
        this.sliderDots.forEach((dot, index) => {
            dot.dataset.index = index;
            dot.addEventListener("click", this.setSlide);
        });
    }

    updateElements(elements, className) {
        const { current } = this.state;
        elements.forEach((item, index) => {
            if (current !== index) {
                if (this.checkIsActive(item, className)) {
                    this.resetActive(item, className);
                }
                return;
            }

            if (!this.checkIsActive(item, className)) {
                this.setActive(item, className);
                return;
            }
        });
    }

    update() {
        this.updateElements(this.sliderItems, utils.activeClasses.slide);
        this.updateElements(this.sliderDots, utils.activeClasses.dot);
    }

    init() {
        this.state.current = this.getInitialIndex(this.sliderItems);
        this.setBtnsHander();
        this.setDotsHandler();
        this.update();
    }
}

const slider = new Slider(document.querySelector(".slider"));
slider.init();
