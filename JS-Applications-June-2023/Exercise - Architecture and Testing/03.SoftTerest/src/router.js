export function initialize(routes) {
  const nav = document.querySelector("nav");
  nav.addEventListener("click", onNavigate);

  const context = {
    goTo,
    showSection,
    updateNav,
  };

  function showSection(section) {
    document.getElementById("root").replaceChildren(section);
  }

  function onNavigate(event) {
    const target = event.target;

    if (target.tagName === "A") {
      event.preventDefault();

      const url = new URL(target.href);

      goTo(url.pathname);
    }
  }

  function goTo(name, ...params) {
    const handler = routes[name];

    if (typeof handler === "function") {
      handler(context, ...params);
    }
  }

  function updateNav() {
    const user = sessionStorage.getItem("user");

    if (user) {
      nav.querySelectorAll(".user").forEach((e) => (e.style.display = "block"));
      nav.querySelectorAll(".guest").forEach((e) => (e.style.display = "none"));
    } else {
      nav.querySelectorAll(".user").forEach((e) => (e.style.display = "none"));
      nav
        .querySelectorAll(".guest")
        .forEach((e) => (e.style.display = "block"));
    }
  }

  return context;
}
