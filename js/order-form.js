/*
  FRZN Alpine Fashion UI
  Step 10: checkout UI interactions.
  Front-end demo only — connect the submit event to your API later.
*/

(() => {
  const section = document.querySelector("#order-form");
  const form = document.querySelector("[data-order-form]");

  if (!section || !form) return;

  const money = (amount) => `৳ ${new Intl.NumberFormat("en-BD").format(amount)}`;
  const cartList = form.querySelector("[data-cart-list]");
  const emptyState = form.querySelector("[data-cart-empty]");
  const cartCount = form.querySelector("[data-cart-count]");
  const subtotalNode = form.querySelector("[data-order-subtotal]");
  const deliveryNode = form.querySelector("[data-order-delivery]");
  const discountRow = form.querySelector("[data-order-discount-row]");
  const discountNode = form.querySelector("[data-order-discount]");
  const totalNode = form.querySelector("[data-order-total]");
  const submitTotalNode = form.querySelector("[data-order-submit-total]");
  const promoInput = form.querySelector("[data-promo-input]");
  const promoButton = form.querySelector("[data-promo-apply]");
  const promoStatus = form.querySelector("[data-promo-status]");
  const orderStatus = form.querySelector("[data-order-status]");
  const district = form.querySelector("[data-order-district]");
  const deliveryOptions = form.querySelectorAll('input[name="delivery"]');
  const modal = section.querySelector("[data-invoice-modal]");
  const invoiceItems = section.querySelector("[data-invoice-items]");
  const invoiceCustomer = section.querySelector("[data-invoice-customer]");
  const invoiceTotal = section.querySelector("[data-invoice-total]");

  let activePromo = null;

  const getItems = () => [...form.querySelectorAll("[data-cart-item]")];

  const getSelectedDelivery = () =>
    form.querySelector('input[name="delivery"]:checked');

  const getDeliveryCharge = () => {
    const selected = getSelectedDelivery();
    return Number(selected?.dataset.deliveryCharge ?? 0);
  };

  const calculate = () => {
    const items = getItems();
    let subtotal = 0;
    let count = 0;

    items.forEach((item) => {
      const unitPrice = Number(item.dataset.unitPrice ?? 0);
      const quantityNode = item.querySelector("[data-cart-quantity]");
      const itemTotalNode = item.querySelector("[data-cart-item-total]");
      const quantity = Number(quantityNode?.textContent ?? 1);
      const itemTotal = unitPrice * quantity;

      subtotal += itemTotal;
      count += quantity;

      if (itemTotalNode) itemTotalNode.textContent = money(itemTotal);
    });

    const delivery = items.length ? getDeliveryCharge() : 0;
    const discount = activePromo === "FRZN10" ? Math.round(subtotal * 0.1) : 0;
    const grandTotal = Math.max(0, subtotal + delivery - discount);

    subtotalNode.textContent = money(subtotal);
    deliveryNode.textContent = money(delivery);
    discountNode.textContent = `− ${money(discount)}`;
    totalNode.textContent = money(grandTotal);
    submitTotalNode.textContent = money(grandTotal);
    cartCount.textContent = `${String(count).padStart(2, "0")} ${count === 1 ? "ITEM" : "ITEMS"}`;
    emptyState.hidden = items.length !== 0;
    discountRow.hidden = discount === 0;

    if (invoiceTotal) invoiceTotal.textContent = money(grandTotal);

    return { subtotal, delivery, discount, grandTotal, count, items };
  };

  const updateDeliveryCards = () => {
    deliveryOptions.forEach((input) => {
      input.closest(".order-delivery-card")?.classList.toggle("is-active", input.checked);
    });

    calculate();
  };

  form.addEventListener("click", (event) => {
    const button = event.target.closest("[data-cart-action]");

    if (!button) return;

    const item = button.closest("[data-cart-item]");
    const quantityNode = item?.querySelector("[data-cart-quantity]");

    if (!item || !quantityNode) return;

    const action = button.dataset.cartAction;
    const current = Number(quantityNode.textContent ?? 1);

    if (action === "increase") quantityNode.textContent = String(current + 1);
    if (action === "decrease") quantityNode.textContent = String(Math.max(1, current - 1));
    if (action === "remove") item.remove();

    calculate();
  });

  deliveryOptions.forEach((input) => {
    input.addEventListener("change", updateDeliveryCards);
  });

  district?.addEventListener("change", () => {
    const targetValue = district.value === "Dhaka" ? "inside_dhaka" : "outside_dhaka";
    const target = form.querySelector(`input[name="delivery"][value="${targetValue}"]`);

    if (target) {
      target.checked = true;
      updateDeliveryCards();
    }
  });

  promoButton?.addEventListener("click", () => {
    const code = promoInput?.value.trim().toUpperCase() ?? "";

    promoStatus.classList.remove("is-error", "is-success");

    if (code === "FRZN10") {
      activePromo = code;
      promoStatus.textContent = "ACCESS CODE ACCEPTED / 10% DISCOUNT APPLIED.";
      promoStatus.classList.add("is-success");
    } else {
      activePromo = null;
      promoStatus.textContent = code
        ? "ACCESS CODE NOT RECOGNIZED."
        : "ENTER AN ACCESS CODE.";
      promoStatus.classList.add("is-error");
    }

    calculate();
  });

  const renderInvoice = () => {
    const { items } = calculate();
    const fullName = form.elements.full_name.value.trim();
    const phone = form.elements.phone.value.trim();
    const districtValue = form.elements.district.value;
    const address = form.elements.address.value.trim();

    invoiceCustomer.innerHTML = [
      fullName || "CUSTOMER NAME / NOT PROVIDED",
      phone ? `+880 ${phone}` : "PHONE / NOT PROVIDED",
      districtValue || "DISTRICT / NOT PROVIDED",
      address || "ADDRESS / NOT PROVIDED",
    ]
      .map((value) => `<p>${value}</p>`)
      .join("");

    invoiceItems.innerHTML = items.length
      ? items
          .map((item) => {
            const name = item.querySelector("h4")?.textContent.trim() ?? "FIELD GEAR";
            const quantity = Number(item.querySelector("[data-cart-quantity]")?.textContent ?? 1);
            const unitPrice = Number(item.dataset.unitPrice ?? 0);

            return `
              <div class="order-invoice-item">
                <span>${name} × ${quantity}</span>
                <strong>${money(unitPrice * quantity)}</strong>
              </div>
            `;
          })
          .join("")
      : '<div class="order-invoice-item"><span>NO ITEMS SELECTED</span><strong>—</strong></div>';
  };

  const openModal = () => {
    renderInvoice();
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("has-order-modal");
  };

  const closeModal = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("has-order-modal");
  };

  section.querySelector("[data-invoice-open]")?.addEventListener("click", openModal);
  section.querySelectorAll("[data-invoice-close]").forEach((button) => {
    button.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });

  document.querySelectorAll("[data-order-scroll]").forEach((button) => {
    button.addEventListener("click", () => {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    orderStatus.classList.remove("is-error", "is-success");

    const { items } = calculate();

    if (!items.length) {
      orderStatus.textContent = "SELECT AT LEAST ONE FIELD GEAR ITEM.";
      orderStatus.classList.add("is-error");
      return;
    }

    if (!form.checkValidity()) {
      form.reportValidity();
      orderStatus.textContent = "COMPLETE THE REQUIRED CUSTOMER DATA.";
      orderStatus.classList.add("is-error");
      return;
    }

    orderStatus.textContent = "ORDER REQUEST RECEIVED / PHONE CONFIRMATION PENDING.";
    orderStatus.classList.add("is-success");
  });

  updateDeliveryCards();
})();
