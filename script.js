document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const nombre = document.getElementById("nombre");
  const email = document.getElementById("email");
  const mensaje = document.getElementById("mensaje");
  const feedback = document.getElementById("form-feedback");

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

    feedback.textContent = "Gracias, nos contactaremos pronto .";
    form.reset();
  });
});