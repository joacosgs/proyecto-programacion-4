document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const nombre = document.getElementById("nombre");
  const email = document.getElementById("email");
  const mensaje = document.getElementById("mensaje");
  const feedback = document.getElementById("form-feedback");

  if (form && nombre && email && mensaje && feedback) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!nombre.value.trim() || !email.value.trim() || !mensaje.value.trim()) {
        feedback.textContent = "Completá todos los campos.";
        return;
      }

      if (!email.value.includes("@")) {
        feedback.textContent = "Ingresá un email válido.";
        return;
      }

      feedback.textContent = "Gracias, nos contactaremos pronto.";
      form.reset();
    });
  }

  const cartCountSummary = document.getElementById("cart-count-summary");
  const cartItemsElement = document.getElementById("cart-items");
  const cartSubtotalElement = document.getElementById("cart-subtotal");
  const cartShippingElement = document.getElementById("cart-shipping");
  const cartTotalElement = document.getElementById("cart-total");
  const clearCartButton = document.getElementById("clear-cart");
  const checkoutButton = document.getElementById("checkout-button");
  const cartFeedback = document.getElementById("cart-feedback");
  const cards = Array.from(document.querySelectorAll("#productos .card"));
  const formatPrice = (value) => value.toLocaleString("es-AR");
  let cart = {};

  const products = cards.map((card, index) => ({
    id: String(index),
    name: card.querySelector(".card-title").textContent.trim(),
    price: Number(card.querySelector(".product-price").textContent.replace(/\D/g, "")),
    image: card.querySelector(".card-img-top").src,
    quantityElement: card.querySelector(".product-quantity"),
  }));

  const updateCart = () => {
    const selectedProducts = products.filter((product) => cart[product.id]);
    const quantityTotal = selectedProducts.reduce((total, product) => total + cart[product.id], 0);
    const subtotal = selectedProducts.reduce(
      (total, product) => total + product.price * cart[product.id],
      0,
    );
    const shipping = subtotal === 0 || subtotal >= 150000 ? 0 : 8000;
    const total = subtotal + shipping;

    products.forEach((product) => {
      product.quantityElement.textContent = cart[product.id] || 0;
    });

    cartCountSummary.textContent = quantityTotal;
    cartSubtotalElement.textContent = formatPrice(subtotal);
    cartShippingElement.textContent = shipping ? `$${formatPrice(shipping)}` : "Gratis";
    cartTotalElement.textContent = formatPrice(total);
    checkoutButton.disabled = quantityTotal === 0;
    clearCartButton.disabled = quantityTotal === 0;

    if (selectedProducts.length === 0) {
      cartItemsElement.innerHTML = '<p class="cart-empty mb-0">Todavía no agregaste productos.</p>';
      return;
    }

    cartItemsElement.innerHTML = selectedProducts
      .map(
        (product) => `
          <div class="cart-item">
            <img src="${product.image}" alt="${product.name}" class="cart-item-image">
            <div class="cart-item-info">
              <strong>${product.name}</strong>
              <span>$${formatPrice(product.price)} por unidad</span>
              <div class="cart-item-controls">
                <button type="button" class="cart-quantity-button" data-action="decrease" data-id="${product.id}" aria-label="Restar una unidad">−</button>
                <span>${cart[product.id]}</span>
                <button type="button" class="cart-quantity-button" data-action="increase" data-id="${product.id}" aria-label="Sumar una unidad">+</button>
                <button type="button" class="cart-remove" data-action="remove" data-id="${product.id}">Quitar</button>
              </div>
            </div>
            <strong class="cart-item-total">$${formatPrice(product.price * cart[product.id])}</strong>
          </div>`,
      )
      .join("");
  };

  cards.forEach((card, index) => {
    const minus = card.querySelector(".minus");
    const plus = card.querySelector(".plus");

    const changeQuantity = (change) => {
      const currentQuantity = cart[String(index)] || 0;
      const nextQuantity = Math.max(0, Math.min(10, currentQuantity + change));

      if (nextQuantity === 0) {
        delete cart[String(index)];
      } else {
        cart[String(index)] = nextQuantity;
      }

      updateCart();
    };

    plus.addEventListener("click", () => changeQuantity(1));
    minus.addEventListener("click", () => changeQuantity(-1));
  });

  cartItemsElement.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;

    const productId = button.dataset.id;
    if (button.dataset.action === "remove") {
      delete cart[productId];
    } else {
      const change = button.dataset.action === "increase" ? 1 : -1;
      const nextQuantity = Math.max(0, Math.min(10, (cart[productId] || 0) + change));
      if (nextQuantity === 0) delete cart[productId];
      else cart[productId] = nextQuantity;
    }

    updateCart();
  });

  clearCartButton.addEventListener("click", () => {
    cart = {};
    updateCart();
    cartFeedback.textContent = "El carrito quedó vacío.";
  });

  checkoutButton.addEventListener("click", () => {
    cartFeedback.textContent = "¡Listo! Tu pedido fue preparado para finalizar la compra.";
  });

  updateCart();
});