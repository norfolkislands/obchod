(function () {
  const tabs = Array.from(document.querySelectorAll(".rail-btn"));
  const panels = Array.from(document.querySelectorAll(".panel"));
  const rings = {
    roof: document.querySelector(".r-roof"),
    5: document.querySelector(".r5"),
    4: document.querySelector(".r4"),
    3: document.querySelector(".r3"),
    2: document.querySelector(".r2"),
    1: document.querySelector(".r1"),
  };

  if (!tabs.length) return;

  function showFloor(id) {
    tabs.forEach((tab) => {
      const on = tab.dataset.floor === id;
      tab.classList.toggle("is-on", on);
      tab.setAttribute("aria-selected", on ? "true" : "false");
      tab.tabIndex = on ? 0 : -1;
    });

    panels.forEach((panel) => {
      const on = panel.id === `panel-${id}`;
      panel.classList.toggle("is-on", on);
      panel.hidden = !on;
    });

    Object.entries(rings).forEach(([key, el]) => {
      if (!el) return;
      el.style.transform = key === String(id) ? "scaleX(1.06)" : "scaleX(1)";
      el.style.filter = key === String(id) ? "brightness(1.08)" : "none";
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
      if (!next) return;
      event.preventDefault();
      next.focus();
      showFloor(next.dataset.floor);
    });
  });

  showFloor("3");
})();
