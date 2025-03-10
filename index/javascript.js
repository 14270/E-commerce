const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const cartClose = document.querySelector("#cart-close");
const cartContent = document.querySelector(".cart-content");
const totalPriceDisplay = document.querySelector(".total-price");
const cartItemCountDisplay = document.querySelector(".cart-item-count");

let totalPrice = 0; // To keep track of the total price
let cartItemCount = 0; // To track the number of items in the cart

cartIcon.addEventListener("click", () => cart.classList.add("active"));
cartClose.addEventListener("click", () => cart.classList.remove("active"));

const addCartButtons = document.querySelectorAll(".add-cart");

addCartButtons.forEach(button => {
    button.addEventListener("click", event => {
        const productBox = event.target.closest(".product-box");
        addToCart(productBox);
    });
});

const addToCart = productBox => {
    const productImgSrc = productBox.querySelector("img").src;
    const productTitle = productBox.querySelector(".product-title").textContent;
    const productPrice = parseFloat(productBox.querySelector(".price").textContent.replace('$', ''));

    // Create the cart box for this product
    const cartBox = document.createElement("div");
    cartBox.classList.add("cart-box");

    cartBox.innerHTML = `
        <img src="${productImgSrc}" class="cart-img">
        <div class="cart-detail">
            <h2 class="cart-product-title">${productTitle}</h2>
            <span class="cart-price">$${productPrice}</span>
            <div class="cart-quantity">
                <button class="decrement">-</button>
                <span class="number">1</span>
                <button class="increment">+</button>
            </div>
        </div>
        <i class="ri-delete-bin-line cart-remove"></i>
    `;

    cartContent.appendChild(cartBox);

    // Update cart item count and total price
    cartItemCount++;
    totalPrice += productPrice;
    updateCartDisplay();
};

// Function to update the cart display
const updateCartDisplay = () => {
    cartItemCountDisplay.textContent = cartItemCount;
    totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
};

// Event delegation for updating quantity and removing items
cartContent.addEventListener("click", event => {
    if (event.target.classList.contains("increment") || event.target.classList.contains("decrement")) {
        const cartBox = event.target.closest(".cart-box");
        const quantityElement = cartBox.querySelector(".number");
        const priceElement = cartBox.querySelector(".cart-price");
        const price = parseFloat(priceElement.textContent.replace('$', ''));

        let quantity = parseInt(quantityElement.textContent);
        if (event.target.classList.contains("increment")) {
            quantity++;
        } else if (event.target.classList.contains("decrement") && quantity > 1) {
            quantity--;
        }

        quantityElement.textContent = quantity;
        priceElement.textContent = `$${(price * quantity).toFixed(2)}`;

        // Update the total price
        totalPrice = 0;
        document.querySelectorAll(".cart-box").forEach(cartBox => {
            const price = parseFloat(cartBox.querySelector(".cart-price").textContent.replace('$', ''));
            totalPrice += price;
        });
        updateCartDisplay();
    }

    if (event.target.classList.contains("cart-remove")) {
        const cartBox = event.target.closest(".cart-box");
        const price = parseFloat(cartBox.querySelector(".cart-price").textContent.replace('$', ''));
        cartItemCount--;
        totalPrice -= price;
        cartBox.remove();
        updateCartDisplay();
    }
});
