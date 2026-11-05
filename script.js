(function () {
  const bands = Array.from(document.querySelectorAll(".band[data-floor]"));
  const tabs = Array.from(document.querySelectorAll(".callout"));
  const panels = Array.from(document.querySelectorAll(".panel"));

  if (!tabs.length) return;

  function showFloor(id) {
    tabs.forEach((tab) => {
      const on = tab.dataset.floor === id;
      tab.classList.toggle("is-on", on);
      tab.setAttribute("aria-selected", on ? "true" : "false");
      tab.tabIndex = on ? 0 : -1;
    });

    bands.forEach((band) => {
      band.classList.toggle("is-on", band.dataset.floor === id);
    });

    panels.forEach((panel) => {
      const on = panel.id === `panel-${id}`;
      panel.classList.toggle("is-on", on);
      panel.hidden = !on;
    });
  }

  bands.forEach((band) => {
    band.addEventListener("click", () => showFloor(band.dataset.floor));
  });

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
