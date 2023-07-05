// step 1.
// show/hide requested content (login, register, etc.)

// NAVIGATION - routes mapping
// - /login (login action) => login page
// - /register (register action) => register page

import { updateNavBar } from "./utils.js";
import { homePage } from "./home.js";
import { loginPage } from "./login.js";
import { registerPage } from "./register.js";
import { logout } from "./logout.js";

// nav configuration
const routes = {
  "/": homePage,
  "/login": loginPage,
  "/register": registerPage,
  "/logout": logout,
};

document.querySelector("nav").addEventListener("click", onNavigate);

function onNavigate(event) {
  if (event.target.tagName === "A" && event.target.href) {
    event.preventDefault();

    console.log("...event.target", event.target.text);

    // if (event.target.text === "Login") {
    //   loginPage();
    // } else if (event.target.text === "Register") {
    //   registerPage();
    // } else if (event.target.text === "Movies") {
    //   homePage();
    // }

    const url = new URL(event.target.href);

    const view = routes[url.pathname];

    view();
  }
}

updateNavBar();
homePage();
