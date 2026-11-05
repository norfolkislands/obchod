(function () {
  const tabs = Array.from(document.querySelectorAll(".cell[data-room]"));
  const panels = Array.from(document.querySelectorAll(".panel"));

  if (!tabs.length) return;

  function showRoom(id) {
    tabs.forEach((tab) => {
      const on = tab.dataset.room === id;
      tab.classList.toggle("is-on", on);
      tab.setAttribute("aria-selected", on ? "true" : "false");
      tab.tabIndex = on ? 0 : -1;
    });

    panels.forEach((panel) => {
      const on = panel.id === `panel-${id}`;
      panel.classList.toggle("is-on", on);
      panel.hidden = !on;
    });
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => showRoom(tab.dataset.room));

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
      showRoom(next.dataset.room);
    });
  });

  showRoom("oblecenie");
})();
