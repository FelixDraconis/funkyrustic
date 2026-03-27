const tabButtons = document.querySelectorAll("[data-tab]");
const tabPanels = document.querySelectorAll("[data-panel]");

for (const button of tabButtons) {
  button.addEventListener("click", () => {
    const target = button.dataset.tab;

    for (const currentButton of tabButtons) {
      const isActive = currentButton === button;
      currentButton.classList.toggle("is-active", isActive);
      currentButton.setAttribute("aria-selected", String(isActive));
    }

    for (const panel of tabPanels) {
      const isActive = panel.dataset.panel === target;
      panel.classList.toggle("is-active", isActive);
      panel.hidden = !isActive;
    }
  });
}
