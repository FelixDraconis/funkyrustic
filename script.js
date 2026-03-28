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

const sortableTables = document.querySelectorAll("[data-sort-table]");

for (const table of sortableTables) {
  const tbody = table.querySelector("tbody");
  const sortButtons = table.querySelectorAll("[data-sort-column]");

  if (!tbody || sortButtons.length === 0) {
    continue;
  }

  const sortTable = (columnIndex, direction) => {
    const rows = Array.from(tbody.querySelectorAll("tr"));

    rows.sort((rowA, rowB) => {
      const valueA = rowA.children[columnIndex]?.textContent?.trim().toLowerCase() ?? "";
      const valueB = rowB.children[columnIndex]?.textContent?.trim().toLowerCase() ?? "";
      return valueA.localeCompare(valueB, undefined, { numeric: true }) * direction;
    });

    tbody.replaceChildren(...rows);
  };

  for (const button of sortButtons) {
    button.addEventListener("click", () => {
      const columnIndex = Number(button.dataset.sortColumn);
      const nextDirection = button.dataset.sortDirection === "asc" ? "desc" : "asc";
      const direction = nextDirection === "asc" ? 1 : -1;

      for (const currentButton of sortButtons) {
        currentButton.dataset.sortDirection = "";
        currentButton.removeAttribute("aria-sort");
        currentButton.classList.remove("is-active");
      }

      button.dataset.sortDirection = nextDirection;
      button.setAttribute("aria-sort", nextDirection === "asc" ? "ascending" : "descending");
      button.classList.add("is-active");
      sortTable(columnIndex, direction);
    });
  }

  const defaultButton = table.querySelector("[data-sort-default]") || sortButtons[0];
  if (defaultButton instanceof HTMLElement) {
    defaultButton.dataset.sortDirection = "desc";
    defaultButton.click();
  }
}
