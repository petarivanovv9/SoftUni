// Principles:
// YAGNI => you aren't gonna need it
// KISS => keep it simple, stupid

export function showView(section) {
  document
    .querySelectorAll(".view-section")
    .forEach((s) => (s.style.display = "none"));

  section.style.display = "block";
}

export function updateNavBar() {
  // Steps:
  // if loggedIn User
  // - update welcome msg
  // - hide login & register
  // - show logout
  // else:
  // - update welcome msg
  // - show login & register
  // - hide logout

  const user = JSON.parse(sessionStorage.getItem("user"));

  const msgWelcome = document.getElementById("welcome-msg");

  if (user) {
    document
      .querySelectorAll(".user")
      .forEach((elem) => (elem.style.display = "inline-block"));

    document
      .querySelectorAll(".guest")
      .forEach((elem) => (elem.style.display = "none"));

    msgWelcome.textContent = `Welcome, ${user.email}`;
  } else {
    document
      .querySelectorAll(".user")
      .forEach((elem) => (elem.style.display = "none"));

    document
      .querySelectorAll(".guest")
      .forEach((elem) => (elem.style.display = "inline-block"));

    msgWelcome.textContent = "";
  }
}
