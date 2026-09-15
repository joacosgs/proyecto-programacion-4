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
  const cartTotalElement = document.getElementById("cart-total");
  const cards = Array.from(document.querySelectorAll(".card"));
  let cartQuantityTotal = 0;
  let cartPriceTotal = 0;

  cards.forEach((card) => {
    const quantity = card.querySelector(".product-quantity");
    const minus = card.querySelector(".minus");
    const plus = card.querySelector(".plus");
    const priceElement = card.querySelector(".product-price");

    if (!quantity || !minus || !plus || !priceElement) {
      return;
    }

    const price = Number(priceElement.textContent.replace(/\D/g, ""));

    let quantityValue = 0;

    plus.addEventListener("click", () => {
      if (quantityValue >= 10) {
        return;
      }

      quantityValue++;
      quantity.textContent = quantityValue;
      cartQuantityTotal++;
      cartPriceTotal += price;

      if (cartCountSummary) {
        cartCountSummary.textContent = cartQuantityTotal;
      }

      if (cartTotalElement) {
        cartTotalElement.textContent = cartPriceTotal.toLocaleString("es-AR");
      }
    });

    minus.addEventListener("click", () => {
      if (quantityValue > 0) {
        quantityValue--;
        quantity.textContent = quantityValue;
        cartQuantityTotal--;
        cartPriceTotal -= price;

        if (cartCountSummary) {
          cartCountSummary.textContent = cartQuantityTotal;
        }

        if (cartTotalElement) {
          cartTotalElement.textContent = cartPriceTotal.toLocaleString("es-AR");
        }
      }
    });
  });
});