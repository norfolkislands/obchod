(function () {
  const tabs = Array.from(document.querySelectorAll(".tower-level"));
  const panels = Array.from(document.querySelectorAll(".floor-panel"));

  if (!tabs.length) return;

  function showFloor(id) {
    tabs.forEach((tab) => {
      const active = tab.dataset.floor === id;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
      tab.tabIndex = active ? 0 : -1;
    });

    panels.forEach((panel) => {
      const active = panel.id === `panel-${id}`;
      panel.classList.toggle("is-active", active);
      panel.hidden = !active;
    });
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => showFloor(tab.dataset.floor));

    tab.addEventListener("keydown", (event) => {
      let next = null;
      if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        next = tabs[(index + 1) % tabs.length];
      } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        next = tabs[(index - 1 + tabs.length) % tabs.length];
      } else if (event.key === "Home") {
        next = tabs[0];
      } else if (event.key === "End") {
        next = tabs[tabs.length - 1];
      }

      if (next) {
        event.preventDefault();
        next.focus();
        showFloor(next.dataset.floor);
      }
    });
  });
})();
