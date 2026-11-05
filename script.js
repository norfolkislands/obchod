(function () {
  const hits = Array.from(document.querySelectorAll(".floor-hit[data-floor]"));
  const tabs = hits.filter((el) => el.getAttribute("role") === "tab");
  const panels = Array.from(document.querySelectorAll(".panel"));
  const labels = Array.from(document.querySelectorAll(".label"));

  if (!tabs.length) return;

  function showFloor(id) {
    tabs.forEach((tab) => {
      const on = tab.dataset.floor === id;
      tab.classList.toggle("is-on", on);
      tab.setAttribute("aria-selected", on ? "true" : "false");
      tab.tabIndex = on ? 0 : -1;
    });

    hits.forEach((hit) => {
      hit.classList.toggle("is-on", hit.dataset.floor === id);
    });

    labels.forEach((label) => {
      label.classList.toggle("is-on", label.dataset.floor === id);
    });

    panels.forEach((panel) => {
      const on = panel.id === `panel-${id}`;
      panel.classList.toggle("is-on", on);
      panel.hidden = !on;
    });
  }

  function onActivate(event) {
    const floor = event.currentTarget.dataset.floor;
    if (!floor) return;
    showFloor(floor);
  }

  hits.forEach((hit) => {
    hit.addEventListener("click", onActivate);
  });

  tabs.forEach((tab, index) => {
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
      } else if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        showFloor(tab.dataset.floor);
        return;
      }
      if (!next) return;
      event.preventDefault();
      next.focus();
      showFloor(next.dataset.floor);
    });
  });

  labels.forEach((label) => label.classList.toggle("is-on", label.dataset.floor === "1"));
  showFloor("1");
})();
