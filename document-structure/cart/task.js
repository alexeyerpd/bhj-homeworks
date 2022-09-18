const products = document.querySelector(".products");
const cartProducts = document.querySelector(".cart__products");

const state = {
    products: {},
    cart: {},
};

function updateCartInLS() {
    localStorage.setItem("cart", JSON.stringify(state.cart));
}

function getCartFromLS() {
    return JSON.parse(localStorage.getItem("cart")) || {};
}

function incrementProduct(elem) {
    const productEl = elem.closest(".product");
    const productId = productEl.dataset.id;

    const quantityEl = elem.previousElementSibling;

    const quantity = state.products[productId] + 1;

    quantityEl.textContent = state.products[productId] = quantity;
}

function decrementProduct(elem) {
    const productEl = elem.closest(".product");
    const productId = productEl.dataset.id;

    const quantityEl = elem.nextElementSibling;

    const quantity = state.products[productId] - 1;

    quantityEl.textContent = state.products[productId] =
        quantity < 1 ? 1 : quantity;
}

function decrementCartProduct(elem) {
    const cartProduct = elem.closest(".cart__product");
    const id = cartProduct.dataset.id;

    state.cart[id] -= 1;

    if (state.cart[id] < 1) {
        cartProduct.remove();
        delete state.cart[id];
    } else {
        updateProductCart(id, state.cart[id]);
    }
}

function hasCart(id) {
    return !!cartProducts.querySelector(`.cart__product[data-id="${id}"]`);
}

function createProductCart(id, src, quantity) {
    return `
    <div class="cart__product" data-id="${id}">
        <img class="cart__product-image" src="${src}">
        <div class="cart__product-count">${quantity}</div>
        <div class="cart__count-controls">
            <div class="cart__count-control cart__count-control_dec">
                -
            </div>
            <div class="cart__count-value">
                1
            </div>
        </div>
    </div>
    `;
}

function updateProductCart(id, quantity) {
    const cartProduct = cartProducts.querySelector(
        `.cart__product[data-id="${id}"]`
    );
    const quantityEl = cartProduct.querySelector(".cart__product-count");

    quantityEl.textContent = quantity;
}

function addCartProduct(productEl, id, quantity) {
    const src = productEl.querySelector(".product__image").src;

    cartProducts.insertAdjacentHTML(
        "beforeend",
        createProductCart(id, src, quantity)
    );
}

function addProductInCart(elem) {
    const productEl = elem.closest(".product");
    const productId = productEl.dataset.id;

    if (hasCart(productId)) {
        const quantity = (state.cart[productId] =
            state.cart[productId] + state.products[productId]);
        updateProductCart(productId, quantity);
    } else {
        const quantity = (state.cart[productId] = state.products[productId]);
        addCartProduct(productEl, productId, quantity);
    }
}

function productsController(e) {
    const elem = e.target;

    if (elem.classList.contains("product__quantity-control_inc")) {
        incrementProduct(elem);
    }

    if (elem.classList.contains("product__quantity-control_dec")) {
        decrementProduct(elem);
    }

    if (elem.classList.contains("product__add")) {
        addProductInCart(elem);
        updateCartInLS();
    }
}

function cartController(e) {
    const elem = e.target;
    if (elem.classList.contains("cart__count-control_dec")) {
        decrementCartProduct(elem);
        updateCartInLS();
    }
}

function initState() {
    const productList = [...products.querySelectorAll(".product")];
    const cart = getCartFromLS();

    for (const product of productList) {
        const quantity = product.querySelector(
            ".product__quantity-value"
        ).textContent;
        state.products[product.dataset.id] = Number(quantity);
    }

    state.cart = cart;
}

function renderCartProduct() {
    const cart = state.cart;
    const cartProductsData = Object.entries(cart);
    if (cartProductsData.length) {
        for (const [id, quantity] of cartProductsData) {
            const productEl = products.querySelector(
                `.product[data-id="${id}"]`
            );
            const productId = productEl.dataset.id;

            addCartProduct(productEl, productId, quantity);
        }
    }
}

function init() {
    renderCartProduct();
    products.addEventListener("click", productsController);
    cartProducts.addEventListener("click", cartController);
}

initState();
init();
