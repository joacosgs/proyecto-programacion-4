document.addEventListener("DOMContentLoaded", () => {
  const STORAGE_KEY = "sportingUserProfile";
  const $ = (id) => document.getElementById(id);
  const hasValue = (field) => !!field && field.value.trim() !== "";

  const sucursalesPorProvincia = {
    Tucumán: [
      {
        nombre: "Sporting Tucumán Centro",
        direccion: "Idelfonso de las Muñecas 155, San Miguel de Tucumán, Tucumán, Argentina",
      },
      {
        nombre: "Sporting Outlet",
        direccion: "Avenida Siria 2345, San Miguel de Tucumán, Tucumán, Argentina",
      }
    ],
    Salta: [
      {
        nombre: "Sporting Salta",
        direccion: "Avenida Belgrano 890, Salta, Argentina",
      },
      {
        nombre: "Sporting Barrio San Martín",
        direccion: "San Martín 220, Salta, Argentina",
      }
    ],
    Jujuy: [
      {
        nombre: "Sporting Jujuy",
        direccion: "Avenida Sarmiento 700, San Salvador de Jujuy, Jujuy, Argentina",
      }
    ],
    Mendoza: [
      {
        nombre: "Sporting Mendoza",
        direccion: "Avenida San Martín 1230, Mendoza, Argentina",
      },
      {
        nombre: "Sporting Godoy Cruz",
        direccion: "Avenida Colón 980, Godoy Cruz, Mendoza, Argentina",
      }
    ],
    "Santiago del Estero": [
      {
        nombre: "Sporting Santiago del Estero",
        direccion: "Avenida Belgrano 1450, Santiago del Estero, Argentina",
      }
    ],
    "Buenos Aires": [
      {
        nombre: "Sporting Buenos Aires",
        direccion: "Avenida Corrientes 2345, CABA, Argentina",
      },
      {
        nombre: "Sporting La Plata",
        direccion: "Calle 7 320, La Plata, Buenos Aires, Argentina",
      }
    ]
  };

  const centroProvincia = {
    Tucumán: "San Miguel de Tucumán, Tucumán, Argentina",
    Salta: "Salta, Argentina",
    Jujuy: "San Salvador de Jujuy, Jujuy, Argentina",
    Mendoza: "Mendoza, Argentina",
    "Santiago del Estero": "Santiago del Estero, Argentina",
    "Buenos Aires": "Buenos Aires, Argentina"
  };

  const actualizarMapa = (direccion, provincia = "") => {
    const mapa = document.getElementById("mapa-google");
    if (!mapa) return;

    const query = direccion || centroProvincia[provincia] || provincia || "Argentina";
    mapa.src = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
  };

  const cargarProvincia = (provincia) => {
    const sucursales = provincia ? sucursalesPorProvincia[provincia] || [] : [];
    const lista = document.getElementById("sucursales-lista");
    const botones = document.querySelectorAll(".tienda-fisica-btn");

    botones.forEach((boton) => {
      boton.classList.toggle("active", boton.dataset.provincia === provincia);
    });

    if (!lista) return;

    if (!provincia) {
      lista.innerHTML = "";
      actualizarMapa("Argentina");
      return;
    }

    lista.innerHTML = sucursales
      .map((sucursal) => {
        const calle = sucursal.direccion.split(",")[0];
        return `
          <button type="button" class="sucursal-item" data-direccion="${sucursal.direccion}">
            ${sucursal.nombre}
            <span class="sucursal-calle">Calle: ${calle}</span>
            <small>${sucursal.direccion}</small>
          </button>
        `;
      })
      .join("");

    if (sucursales.length > 0) {
      actualizarMapa(centroProvincia[provincia] || sucursales[0].direccion, provincia);
    }

    lista.querySelectorAll(".sucursal-item").forEach((boton) => {
      boton.addEventListener("click", () => {
        actualizarMapa(boton.dataset.direccion, provincia);
      });
    });
  };

  const getSavedProfile = () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    } catch {
      return null;
    }
  };

  const saveProfile = (profile) => localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  const removeProfile = () => localStorage.removeItem(STORAGE_KEY);

  const showProfileAddress = () => {
    const profileAddress = $("cart-profile-address");
    const profile = getSavedProfile();
    if (!profileAddress) return;
    if (!profile || !profile.direccion) {
      profileAddress.textContent = "Todavía no creaste un perfil.";
      return;
    }
    profileAddress.textContent = [profile.direccion, profile.localidad, profile.provincia, profile.pais].filter(Boolean).join(", ");
  };

  const renderProfileState = () => {
    const profile = getSavedProfile();
    const registerForm = $("registerForm");
    const profileSummary = $("profileSummary");
    const registerFeedback = $("registerFeedback");
    if (!registerForm || !profileSummary) return;

    if (profile) {
      registerForm.classList.add("d-none");
      profileSummary.classList.remove("d-none");
      const profileFields = {
        nombre: $("summaryNombre"),
        apellido: $("summaryApellido"),
        telefono: $("summaryTelefono"),
        email: $("summaryEmail"),
        documento: $("summaryDocumento"),
        pais: $("summaryPais"),
        provincia: $("summaryProvincia"),
        localidad: $("summaryLocalidad"),
        direccion: $("summaryDireccion"),
      };
      Object.entries(profileFields).forEach(([key, element]) => {
        if (element) element.textContent = profile[key] || "-";
      });
      if (registerFeedback) registerFeedback.classList.add("d-none");
    } else {
      registerForm.classList.remove("d-none");
      profileSummary.classList.add("d-none");
      registerForm.reset();
    }
  };

  const fillFormFromProfile = (profile) => {
    if (!profile) return;
    const fieldMap = {
      registerNombre: "nombre",
      registerApellido: "apellido",
      registerTelefono: "telefono",
      registerEmail: "email",
      registerDocumento: "documento",
      registerPais: "pais",
      registerLocalidad: "localidad",
      registerDireccion: "direccion",
    };
    Object.entries(fieldMap).forEach(([fieldId, profileKey]) => {
      const field = $(fieldId);
      if (field) field.value = profile[profileKey] || "";
    });
    const provinceInput = $("registerProvincia");
    const provinceButtonText = $("provinceSelectedText");
    if (provinceInput) provinceInput.value = profile.provincia || "";
    if (provinceButtonText) provinceButtonText.textContent = profile.provincia || "Seleccioná tu provincia";
  };

  document.querySelectorAll(".tienda-fisica-btn").forEach((boton) => {
    boton.addEventListener("click", () => {
      cargarProvincia(boton.dataset.provincia);
    });
  });

  cargarProvincia("");

  const form = $("contactForm");
  const nombre = $("nombre");
  const email = $("email");
  const mensaje = $("mensaje");
  const feedback = $("form-feedback");

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

  const registerForm = $("registerForm");
  const registerFeedback = $("registerFeedback");
  const editProfileButton = $("editProfileButton");
  const logoutProfileButton = $("logoutProfileButton");
  const registerModal = $("registerModal");
  const provinceToggle = $("provinceToggle");
  const provinceMenu = $("provinceMenu");
  const provinceInput = $("registerProvincia");
  const provinceSelectedText = $("provinceSelectedText");

  const syncProvinceSelection = (value) => {
    if (!provinceInput || !provinceSelectedText) return;
    provinceInput.value = value || "";
    provinceSelectedText.textContent = value || "Seleccioná tu provincia";
    if (provinceToggle) provinceToggle.setAttribute("aria-expanded", "false");
    if (provinceMenu) provinceMenu.classList.add("d-none");
  };

  if (provinceToggle && provinceMenu) {
    provinceToggle.addEventListener("click", () => {
      const isOpen = !provinceMenu.classList.contains("d-none");
      provinceMenu.classList.toggle("d-none", isOpen);
      provinceToggle.setAttribute("aria-expanded", String(!isOpen));
    });

    provinceMenu.addEventListener("click", (event) => {
      const option = event.target.closest(".province-option");
      if (!option) return;
      syncProvinceSelection(option.dataset.value || "");
    });

    document.addEventListener("click", (event) => {
      if (!provinceToggle || !provinceMenu) return;
      if (!provinceToggle.contains(event.target) && !provinceMenu.contains(event.target)) {
        provinceMenu.classList.add("d-none");
        provinceToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  if (registerForm && registerFeedback) {
    registerForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const requiredFields = [
        $("registerNombre"), $("registerApellido"), $("registerTelefono"), $("registerEmail"),
        $("registerDocumento"), $("registerPais"), $("registerProvincia"), $("registerLocalidad"), $("registerDireccion")
      ];

      requiredFields.forEach((field) => {
        if (field) field.classList.remove("input-invalid");
      });

      const hasEmptyField = requiredFields.some((field) => !hasValue(field));
      const emailField = $("registerEmail");

      if (hasEmptyField) {
        requiredFields.forEach((field) => {
          if (field && !hasValue(field)) field.classList.add("input-invalid");
        });
        registerFeedback.textContent = "Falta completar esos campos.";
        registerFeedback.classList.remove("d-none", "alert-success");
        registerFeedback.classList.add("alert-danger");
        return;
      }

      if (emailField && !emailField.value.includes("@")) {
        emailField.classList.add("input-invalid");
        registerFeedback.textContent = "Ingresá un email válido.";
        registerFeedback.classList.remove("d-none", "alert-danger");
        registerFeedback.classList.add("alert-success");
        return;
      }

      const profile = {
        nombre: $("registerNombre").value.trim(),
        apellido: $("registerApellido").value.trim(),
        telefono: $("registerTelefono").value.trim(),
        email: $("registerEmail").value.trim(),
        documento: $("registerDocumento").value.trim(),
        pais: $("registerPais").value.trim(),
        provincia: $("registerProvincia").value.trim(),
        localidad: $("registerLocalidad").value.trim(),
        direccion: $("registerDireccion").value.trim(),
      };

      saveProfile(profile);
      registerFeedback.textContent = `Datos guardados correctamente. Cliente ${profile.nombre} ${profile.apellido} registrado.`;
      registerFeedback.classList.remove("d-none", "alert-danger");
      registerFeedback.classList.add("alert-success");
      renderProfileState();
      showProfileAddress();
      updateCart();
    });
  }

  if (editProfileButton) {
    editProfileButton.addEventListener("click", () => {
      const profile = getSavedProfile();
      fillFormFromProfile(profile);
      renderProfileState();
      registerForm.classList.remove("d-none");
      const summary = $("profileSummary");
      if (summary) summary.classList.add("d-none");
      registerForm.querySelector("button[type='submit']").textContent = "Guardar cambios";
    });
  }

  if (logoutProfileButton) {
    logoutProfileButton.addEventListener("click", () => {
      removeProfile();
      renderProfileState();
      updateCart();
    });
  }

  if (registerModal) {
    registerModal.addEventListener("show.bs.modal", () => {
      renderProfileState();
      updateCart();
    });
  }

  const cartCountSummary = $("cart-count-summary");
  const cartItemsElement = $("cart-items");
  const cartSubtotalElement = $("cart-subtotal");
  const cartShippingElement = $("cart-shipping");
  const cartTotalElement = $("cart-total");
  const clearCartButton = $("clear-cart");
  const checkoutButton = $("checkout-button");
  const cartFeedback = $("cart-feedback");
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
    const subtotal = selectedProducts.reduce((total, product) => total + product.price * cart[product.id], 0);
    const shipping = subtotal === 0 || subtotal >= 150000 ? 0 : 8000;
    const total = subtotal + shipping;

    products.forEach((product) => {
      product.quantityElement.textContent = cart[product.id] || 0;
    });

    cartCountSummary.textContent = quantityTotal;
    cartSubtotalElement.textContent = formatPrice(subtotal);
    cartShippingElement.textContent = shipping ? `$${formatPrice(shipping)}` : "Gratis";
    cartTotalElement.textContent = formatPrice(total);

    const hasProfile = Boolean(getSavedProfile());
    checkoutButton.disabled = quantityTotal === 0 || !hasProfile;
    clearCartButton.disabled = quantityTotal === 0;

    if (!hasProfile) {
      cartFeedback.textContent = "Necesitás crear un perfil antes de finalizar la compra.";
    } else if (quantityTotal === 0) {
      cartFeedback.textContent = "Agregá productos para continuar.";
    } else {
      cartFeedback.textContent = "Perfil listo para completar la compra.";
    }

    showProfileAddress();

    if (!selectedProducts.length) {
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
          </div>`
      )
      .join("");
  };

  cards.forEach((card, index) => {
    const minus = card.querySelector(".minus");
    const plus = card.querySelector(".plus");

    const changeQuantity = (change) => {
      const currentQuantity = cart[String(index)] || 0;
      const nextQuantity = Math.max(0, Math.min(10, currentQuantity + change));
      if (nextQuantity === 0) delete cart[String(index)];
      else cart[String(index)] = nextQuantity;
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
    const savedProfile = getSavedProfile();
    if (!savedProfile || !savedProfile.direccion) {
      cartFeedback.textContent = "Necesitás crear un perfil antes de finalizar la compra.";
      return;
    }

    const deliveryAddress = [savedProfile.direccion, savedProfile.localidad, savedProfile.provincia, savedProfile.pais].filter(Boolean).join(", ");
    const previousCartMessage = cartFeedback.textContent;
    cartFeedback.textContent = `Gracias ${savedProfile.nombre}. Tu pedido será enviado a ${deliveryAddress}.`;
    cart = {};
    updateCart();
    cartFeedback.textContent = `Gracias ${savedProfile.nombre}. Tu pedido será enviado a ${deliveryAddress}.`;

    if (previousCartMessage === "El carrito quedó vacío." || previousCartMessage === "Agregá productos para continuar.") {
      cartFeedback.textContent = `Gracias ${savedProfile.nombre}. Tu pedido será enviado a ${deliveryAddress}.`;
    }
  });

  renderProfileState();
  showProfileAddress();
  updateCart();
});
