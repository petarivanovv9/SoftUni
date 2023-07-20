console.log("HERE");

import page from "../node_modules/page/page.mjs";
import { render, html } from "../node_modules/lit-html/lit-html.js";

import { showHome } from "./views/home.js";
import { showDashboard } from "./views/dashboard.js";
import { showCreate } from "./views/create.js";
import { showLogin } from "./views/login.js";
import { showRegister } from "./views/register.js";
import { getUserData } from "./utils.js";
import { showDetails } from "./views/details.js";
import { showEdit } from "./views/edit.js";
import { logout } from "./api/auth.js";

const navTemplate = (user) => html`
  <div>
    <a href="/dashboard">Dashboard</a>
  </div>

  ${user
    ? html`
        <div class="user">
          <a href="/create">Add Album</a>
          <a href="" @click=${onLogout}>Logout</a>
        </div>
      `
    : html`
        <div class="guest">
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </div>
      `}
`;

function updateNav(ctx, next) {
  render(navTemplate(ctx.user), document.querySelector("nav"));

  next();
}

function session(ctx, next) {
  const user = getUserData();

  if (user) {
    ctx.user = user;
  }

  next();
}

function decorateContext(ctx, next) {
  ctx.render = function (content) {
    render(content, document.querySelector("main"));
  };

  next();
}

function onLogout() {
  logout();

  page.redirect("/");
}

page(decorateContext);
page(session);
page(updateNav);

page("/", showHome);
page("/dashboard", showDashboard);
page("/create", showCreate);
page("/details/:id", showDetails);
page("/edit/:id", showEdit);

page("/login", showLogin);
page("/register", showRegister);

page.start();
